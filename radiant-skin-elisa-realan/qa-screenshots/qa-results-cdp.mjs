import {spawn} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const port = 9351;
const cwd = process.cwd();
const outDir = path.join(cwd, 'qa-screenshots');
const profile = path.join(process.env.TEMP || cwd, `radiant-results-${Date.now()}`);

fs.mkdirSync(outDir, {recursive: true});

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function connect(wsUrl) {
  let id = 0;
  const pending = new Map();
  const listeners = new Map();
  const ws = new WebSocket(wsUrl);

  ws.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const {resolve, reject} = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
      return;
    }
    for (const listener of listeners.get(msg.method) || []) listener(msg.params);
  });

  return {
    ready: new Promise((resolve, reject) => {
      ws.addEventListener('open', resolve, {once: true});
      ws.addEventListener('error', reject, {once: true});
    }),
    send(method, params = {}) {
      const callId = ++id;
      ws.send(JSON.stringify({id: callId, method, params}));
      return new Promise((resolve, reject) => pending.set(callId, {resolve, reject}));
    },
    once(method, timeoutMs = 15000) {
      return new Promise((resolve) => {
        const timer = setTimeout(() => resolve(null), timeoutMs);
        function handler(params) {
          clearTimeout(timer);
          listeners.set(
            method,
            (listeners.get(method) || []).filter((item) => item !== handler),
          );
          resolve(params);
        }
        listeners.set(method, [...(listeners.get(method) || []), handler]);
      });
    },
    close() {
      ws.close();
    },
  };
}

async function waitForChrome() {
  for (let i = 0; i < 40; i += 1) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (res.ok) return;
    } catch {
      // keep retrying
    }
    await delay(250);
  }
  throw new Error('Chrome CDP did not start');
}

async function capture(mode) {
  const target = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, {
    method: 'PUT',
  }).then((res) => res.json());
  const client = connect(target.webSocketDebuggerUrl);
  await client.ready;
  await client.send('Page.enable');
  await client.send('Runtime.enable');
  await client.send('Emulation.setDeviceMetricsOverride', {
    width: mode === 'mobile' ? 390 : 1440,
    height: mode === 'mobile' ? 1100 : 1400,
    deviceScaleFactor: 1,
    mobile: mode === 'mobile',
  });
  const loaded = client.once('Page.loadEventFired');
  await client.send('Page.navigate', {url: 'http://127.0.0.1:4216/'});
  await loaded;
  await delay(800);
  await client.send('Runtime.evaluate', {
    expression:
      "document.querySelector('#resultados')?.scrollIntoView({block:'start'}); document.documentElement.style.scrollBehavior='auto';",
  });
  await delay(1000);
  const shot = await client.send('Page.captureScreenshot', {
    format: 'png',
    fromSurface: true,
  });
  fs.writeFileSync(
    path.join(outDir, `before-after-${mode}.png`),
    Buffer.from(shot.data, 'base64'),
  );
  client.close();
}

async function main() {
  const chrome = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank',
  ]);
  try {
    await waitForChrome();
    await capture('desktop');
    await capture('mobile');
  } finally {
    chrome.kill();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
