// ═══════════════════════════════════════════
// NOTIFICACIONES (Fase C)
// Sin backend. Disparan de forma fiable mientras el navegador corre.
// Mejora progresiva con TimestampTrigger donde el navegador lo soporte.
// ═══════════════════════════════════════════

let notifLoop = null;

function getNotif() {
  if (!state.notifications) {
    state.notifications = {
      enabled: false, daily: true, dailyTime: '09:00',
      streak: true, streakTime: '22:00', timer: true,
      lastDaily: null, lastStreak: null,
    };
  }
  return state.notifications;
}

function initNotifications() {
  getNotif();
  renderNotifSettings();
  if (notifLoop) clearInterval(notifLoop);
  notifLoop = setInterval(notifTick, 30000); // chequea cada 30s mientras está abierta
  notifTick();
  scheduleTriggers();
}

// ── Permiso ──────────────────────────────────
async function requestNotifPermission() {
  if (!('Notification' in window)) { alert('Tu navegador no soporta notificaciones.'); return false; }
  let perm = Notification.permission;
  if (perm === 'default') {
    try { perm = await Notification.requestPermission(); } catch(e) { perm = Notification.permission; }
  }
  const n = getNotif();
  n.enabled = (perm === 'granted');
  saveState();
  renderNotifSettings();
  if (n.enabled) {
    scheduleTriggers();
    showNotif('POLARIS activado', 'Te voy a recordar abrir y construir. No desaparezcas de vos. 💪', 'welcome');
  } else if (perm === 'denied') {
    alert('Las notificaciones están bloqueadas. Activalas desde el candado 🔒 de la barra de direcciones.');
  }
  return n.enabled;
}

// ── Mostrar una notificación ─────────────────
async function showNotif(title, body, tag) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  const opts = {
    body,
    icon: 'assets/icons/icon-192.png',
    badge: 'assets/icons/icon-192.png',
    tag: tag || 'polaris',
    renotify: true,
    silent: false,
  };
  try {
    const reg = ('serviceWorker' in navigator) ? await navigator.serviceWorker.getRegistration() : null;
    if (reg) { reg.showNotification(title, opts); return; }
  } catch(e) {}
  try { new Notification(title, opts); } catch(e) {}
}

// ── Loop in-app (fallback fiable con la app/Chrome abiertos) ──
function notifTick() {
  const n = getNotif();
  if (!n.enabled || !('Notification' in window) || Notification.permission !== 'granted') return;
  const now = new Date();
  const hhmm = pad2(now.getHours()) + ':' + pad2(now.getMinutes());
  const today = now.toDateString();

  if (n.daily && n.lastDaily !== today && hhmm >= n.dailyTime) {
    showNotif('POLARIS — tu norte te espera', dailyMsg(), 'daily');
    n.lastDaily = today; saveState();
  }

  if (n.streak && n.lastStreak !== today && hhmm >= n.streakTime && dayIncomplete()) {
    showNotif('⚠️ No rompas la racha', streakMsg(), 'streak');
    n.lastStreak = today; saveState();
  }
}

function pad2(x) { return String(x).padStart(2, '0'); }

function dayIncomplete() {
  const done = HABITS.filter(h => state.habits[h.id]).length;
  return done < HABITS.length || !state.mission;
}

function dailyMsg() {
  const phrase = (typeof pickPhrase === 'function') ? pickPhrase() : '';
  if (state.mission) return 'Tu misión: ' + state.mission + (phrase ? ' — ' + phrase : '');
  return phrase || 'Definí tu misión de hoy. Una acción rompe la evitación.';
}

function streakMsg() {
  const done = HABITS.filter(h => state.habits[h.id]).length;
  return 'Te faltan ' + (HABITS.length - done) + ' hábitos hoy. 10 minutos y mantenés la racha (' + state.streak + ').';
}

// ── Disparo desde el timer (Fase C) ──────────
function notifyTimerDone(mode) {
  const n = getNotif();
  if (!n.enabled || !n.timer) return;
  if (mode === 'shadow') {
    showNotif('🔥 Bloque terminado', 'Convertiste evitación en evidencia. Marcá "¡Completé!" y sumá XP.', 'timer');
  } else {
    showNotif('✅ Bloque de enfoque terminado', '25 minutos de construcción. Marcá "¡Completé!" y seguí.', 'timer');
  }
}

// ── Mejora progresiva: notificación programada a nivel SO ──
async function scheduleTriggers() {
  const n = getNotif();
  if (!n.enabled || !('serviceWorker' in navigator)) return;
  if (!('Notification' in window) || !('showTrigger' in Notification.prototype) || typeof TimestampTrigger === 'undefined') return;
  try {
    const reg = await navigator.serviceWorker.getRegistration();
    if (!reg) return;
    const pending = await reg.getNotifications({ includeTriggered: true, tag: 'daily-os' });
    pending.forEach(no => no.close());
    if (n.daily) {
      reg.showNotification('POLARIS — tu norte te espera', {
        tag: 'daily-os',
        body: 'Definí tu misión y leé tu identidad. No desaparezcas de vos.',
        icon: 'assets/icons/icon-192.png',
        badge: 'assets/icons/icon-192.png',
        showTrigger: new TimestampTrigger(nextOccurrence(n.dailyTime)),
      });
    }
  } catch(e) { /* no soportado: el loop in-app cubre */ }
}

function nextOccurrence(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const now = new Date();
  const t = new Date();
  t.setHours(h, m, 0, 0);
  if (t.getTime() <= now.getTime()) t.setDate(t.getDate() + 1);
  return t.getTime();
}

// ── UI de ajustes (en pantalla Progreso) ─────
function renderNotifSettings() {
  const box = document.getElementById('notif-settings');
  if (!box) return;
  const n = getNotif();
  const supported = ('Notification' in window);
  const perm = supported ? Notification.permission : 'unsupported';

  const statusEl = document.getElementById('notif-status');
  const controls = document.getElementById('notif-controls');
  const btn = document.getElementById('notif-enable-btn');

  if (!supported) {
    if (statusEl) statusEl.textContent = 'Este navegador no soporta notificaciones.';
    if (btn) btn.style.display = 'none';
    if (controls) controls.style.display = 'none';
    return;
  }

  if (perm === 'granted' && n.enabled) {
    if (statusEl) statusEl.textContent = 'Activadas ✅';
    if (btn) btn.style.display = 'none';
    if (controls) controls.style.display = 'block';
  } else {
    if (statusEl) statusEl.textContent = perm === 'denied' ? 'Bloqueadas 🔒 (activalas desde el candado del navegador)' : 'Desactivadas';
    if (btn) { btn.style.display = 'flex'; btn.textContent = '🔔 Activar notificaciones'; }
    if (controls) controls.style.display = 'none';
  }

  // reflejar valores
  setVal('notif-daily', n.daily);
  setVal('notif-daily-time', n.dailyTime);
  setVal('notif-streak', n.streak);
  setVal('notif-streak-time', n.streakTime);
  setVal('notif-timer', n.timer);
}

function setVal(id, val) {
  const el = document.getElementById(id);
  if (!el) return;
  if (el.type === 'checkbox') el.checked = !!val;
  else el.value = val;
}

function updateNotifSetting(key, value) {
  const n = getNotif();
  n[key] = value;
  saveState();
  scheduleTriggers();
}

function testNotif() {
  if (Notification.permission !== 'granted') { requestNotifPermission(); return; }
  showNotif('POLARIS — prueba', 'Si ves esto, las notificaciones funcionan. 🚀', 'test');
}
