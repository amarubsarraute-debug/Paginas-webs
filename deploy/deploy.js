const ftp = require("basic-ftp");
const path = require("path");
const fs = require("fs");

const sites = require("./config.js");

// Colores simples sin chalk para mayor compatibilidad
const c = {
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
};

// Filtro por argumento --site "Nombre"
const args = process.argv.slice(2);
const siteFilter = args.includes("--site") ? args[args.indexOf("--site") + 1] : null;
const sitesToDeploy = siteFilter
  ? sites.filter((s) => s.name.toLowerCase().includes(siteFilter.toLowerCase()))
  : sites;

function validate() {
  let ok = true;
  for (const site of sitesToDeploy) {
    if (site.ftp.host.startsWith("PONER_")) {
      console.log(c.red(`\n  ERROR: ${site.name} — falta configurar el host FTP en config.js`));
      ok = false;
    }
    const localPath = path.resolve(__dirname, site.local);
    if (!fs.existsSync(localPath)) {
      console.log(c.red(`  ERROR: ${site.name} — carpeta no encontrada: ${localPath}`));
      ok = false;
    }
  }
  return ok;
}

async function uploadDir(client, localDir, remoteDir, exclude = []) {
  await client.ensureDir(remoteDir);
  const entries = fs.readdirSync(localDir);
  let uploaded = 0;

  for (const entry of entries) {
    if (exclude.includes(entry)) continue;

    const localEntry = path.join(localDir, entry);
    const remoteEntry = remoteDir.replace(/\/$/, "") + "/" + entry;
    const stat = fs.statSync(localEntry);

    if (stat.isDirectory()) {
      const count = await uploadDir(client, localEntry, remoteEntry, exclude);
      uploaded += count;
    } else {
      process.stdout.write(c.dim(`    → ${entry}\n`));
      await client.uploadFrom(localEntry, remoteEntry);
      uploaded++;
    }
  }
  return uploaded;
}

async function deploySite(site) {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  console.log(c.bold(`\n  ${site.name}`));
  console.log(c.dim(`  ${site.ftp.host} → ${site.ftp.remote}`));

  try {
    await client.access({
      host: site.ftp.host,
      user: site.ftp.user,
      password: site.ftp.password,
      port: site.ftp.port || 21,
      secure: site.ftp.secure || false,
    });

    const localPath = path.resolve(__dirname, site.local);
    const count = await uploadDir(client, localPath, site.ftp.remote, site.exclude || []);
    console.log(c.green(`  OK — ${count} archivos subidos`));
    return { name: site.name, ok: true, count };
  } catch (err) {
    console.log(c.red(`  FALLO — ${err.message}`));
    return { name: site.name, ok: false, error: err.message };
  } finally {
    client.close();
  }
}

async function main() {
  console.log(c.bold(c.cyan("\n================================================")));
  console.log(c.bold(c.cyan("   DEPLOY AUTOMATICO — PAGINAS WEB DE AMARU")));
  console.log(c.bold(c.cyan("================================================")));

  if (!validate()) {
    console.log(c.yellow("\n  Abre deploy/config.js y completa los datos FTP.\n"));
    process.exit(1);
  }

  console.log(`\n  Subiendo ${sitesToDeploy.length} sitio(s)...\n`);

  const results = [];
  for (const site of sitesToDeploy) {
    const result = await deploySite(site);
    results.push(result);
  }

  console.log(c.bold("\n================================================"));
  console.log(c.bold("  RESUMEN"));
  console.log(c.bold("================================================"));

  for (const r of results) {
    if (r.ok) {
      console.log(c.green(`  ✓ ${r.name} — ${r.count} archivos`));
    } else {
      console.log(c.red(`  ✗ ${r.name} — ${r.error}`));
    }
  }

  const failed = results.filter((r) => !r.ok);
  if (failed.length === 0) {
    console.log(c.bold(c.green("\n  Todos los sitios subidos correctamente.\n")));
  } else {
    console.log(c.yellow(`\n  ${failed.length} sitio(s) fallaron. Revisa las credenciales.\n`));
  }
}

main().catch((err) => {
  console.error(c.red("\nError inesperado: " + err.message));
  process.exit(1);
});
