// ============================================================
//  CONFIGURACION DE DEPLOY — edita solo esto
// ============================================================
//
//  Para encontrar tus datos FTP en Hostinger:
//  hPanel → Hosting → tu dominio → FTP Accounts
//
//  Cada sitio puede tener sus propias credenciales FTP
//  si estan en planes de hosting distintos.
// ============================================================

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
      host: "PONER_HOST_FTP",
      user: "PONER_USUARIO_FTP",
      password: "PONER_PASSWORD_FTP",
      remote: "/public_html",
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
    name: "Dra Luisa Cedeno",
    // Este es un proyecto Vite — se sube solo la carpeta dist
    local: "../web-luisa/dist",
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
  }
];
