// ============================================================
//  CONFIGURACION DE DEPLOY — edita solo esto
// ============================================================
//
//  Para encontrar tus datos FTP en Hostinger:
//  hPanel → Hosting → tu dominio → FTP Accounts
//
//  Cada sitio puede tener sus propias credenciales FTP
//  si estan en planes de hosting distintos.
//
//  Las contraseñas reales NO viven acá — viven en
//  deploy/credentials.local.js (gitignoreado, nunca se sube).
//  Si ese archivo no existe, se usa el placeholder de abajo
//  y el deploy de ese sitio falla con un aviso claro.
// ============================================================

let creds = {};
try {
  creds = require("./credentials.local.js");
} catch {
  // No existe credentials.local.js — se usan los placeholders "PONER_..."
}

function pass(key) {
  return (creds[key] && creds[key].password) || "PONER_PASSWORD_FTP";
}

module.exports = [
  {
    name: "Fede Desal",
    local: "../fede-desal-web",
    exclude: ["README.md", "stock-ejemplo.csv", ".git", ".claude", "node_modules"],
    ftp: {
      host: "PONER_HOST_FTP",        // ej: files.hostinger.com
      user: "PONER_USUARIO_FTP",     // ej: u123456789
      password: "PONER_PASSWORD_FTP",
      remote: "/public_html",
      port: 21,
      secure: false
    }
  },
  {
    name: "Basil Sanitario",
    local: "../basil-sanitario",
    exclude: [".git", ".claude", "node_modules"],
    ftp: {
      host: "147.93.39.62",
      user: "u726588504.Amarubelline",
      password: pass("basil"),
      remote: "/",
      port: 21,
      secure: false
    }
  },
  {
    name: "Electricidad La Barra",
    local: "../electricidad-la-barra",
    exclude: [".git", ".claude", "node_modules"],
    ftp: {
      host: "PONER_HOST_FTP",
      user: "PONER_USUARIO_FTP",
      password: "PONER_PASSWORD_FTP",
      remote: "/public_html",
      port: 21,
      secure: false
    }
  },
  {
    name: "Trujillo Abogadas",
    // Este es un proyecto Vite — se sube solo la carpeta dist
    local: "../web-trujillo/legal-zen-build-main/dist",
    exclude: [],
    ftp: {
      host: "PONER_HOST_FTP",
      user: "PONER_USUARIO_FTP",
      password: "PONER_PASSWORD_FTP",
      remote: "/public_html",
      port: 21,
      secure: false
    }
  },
  {
    name: "Calor Charrua",
    local: "../calorcharrua",
    exclude: [".git", ".claude", "node_modules", "index.src.html"],
    ftp: {
      host: "PONER_HOST_FTP",
      user: "PONER_USUARIO_FTP",
      password: "PONER_PASSWORD_FTP",
      remote: "/public_html",
      port: 21,
      secure: false
    }
  },
  {
    name: "Luana Escudero",
    local: "../luana-escudero-hostinger",
    exclude: [".git", ".claude", "node_modules", "luana_web_imagenes_v2.zip"],
    ftp: {
      host: "147.93.39.62",
      user: "u726588504.Amaru",
      password: pass("luana"),
      remote: "/",
      port: 21,
      secure: false
    }
  },
  {
    name: "Negocio Patricio",
    local: "../negocio-patricio/dist",
    exclude: [],
    ftp: {
      host: "147.93.39.62",
      user: "u726588504.Amarubellinee",
      password: pass("negocioPatricio"),
      remote: "/",
      port: 21,
      secure: false
    }
  },

  // ── Hosting compartido "darkgreen-echidna" (public_html con subcarpetas) ──
  // Estos sitios NO se suben con "local: carpeta entera" porque son proyectos
  // de desarrollo (con src/, node_modules, etc.). "stageFiles" indica
  // exactamente qué copiar (deploy.js arma una carpeta temporal limpia antes
  // de subir por FTP) — siempre despues de correr:
  //   node build-and-scrape-all.js <sitio>
  {
    name: "Dra Luisa Cedeno",
    local: "../web-luisa",
    stageFiles: ["index.html", "assets", "robots.txt", "lifting-8p-antes.png", "lifting-8p-despues.png"],
    ftp: {
      host: creds.darkgreenEchidna?.host || "PONER_HOST_FTP",
      user: creds.darkgreenEchidna?.user || "PONER_USUARIO_FTP",
      password: pass("darkgreenEchidna"),
      remote: "/web-luisa",
      port: 21,
      secure: false
    }
  },
  {
    name: "Mint Clinica Orofacial",
    local: "../mint-clinica-orofacial",
    stageFiles: ["index.html", "assets"],
    ftp: {
      host: creds.darkgreenEchidna?.host || "PONER_HOST_FTP",
      user: creds.darkgreenEchidna?.user || "PONER_USUARIO_FTP",
      password: pass("darkgreenEchidna"),
      remote: "/mint-clinica-orofacial",
      port: 21,
      secure: false
    }
  },
  {
    name: "Aura Clinic Estetica Laser",
    local: "../aura-clinic-estetica-laser",
    stageFiles: ["index.html", "assets", "favicon.svg"],
    ftp: {
      host: creds.darkgreenEchidna?.host || "PONER_HOST_FTP",
      user: creds.darkgreenEchidna?.user || "PONER_USUARIO_FTP",
      password: pass("darkgreenEchidna"),
      remote: "/aura-clinic-estetica-laser",
      port: 21,
      secure: false
    }
  },
  {
    name: "Clinica Magali Chaparro",
    local: "../clinica-magali-chaparro",
    stageFiles: ["index.html", "assets"],
    ftp: {
      host: creds.darkgreenEchidna?.host || "PONER_HOST_FTP",
      user: creds.darkgreenEchidna?.user || "PONER_USUARIO_FTP",
      password: pass("darkgreenEchidna"),
      remote: "/clinica-magali-chaparro",
      port: 21,
      secure: false
    }
  },
  {
    name: "La Clinique Punta del Este",
    local: "../la-clinique-puntadeleste",
    stageFiles: ["index.html", "assets"],
    ftp: {
      host: creds.darkgreenEchidna?.host || "PONER_HOST_FTP",
      user: creds.darkgreenEchidna?.user || "PONER_USUARIO_FTP",
      password: pass("darkgreenEchidna"),
      remote: "/la-clinique-puntadeleste",
      port: 21,
      secure: false
    }
  }
];
