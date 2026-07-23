const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const readline = require('readline');

// Configuración de proyectos y puertos
const projects = [
    { name: "romero-servicios", displayName: "Romero Servicios", port: 3035 },
    { name: "tecnico-electricista-electricidad-amaral", displayName: "Técnico Electricista Amaral", port: 3065 },
    { name: "soluciones-electricas-ep", displayName: "Soluciones Eléctricas EP", port: 3075 }
];

const servers = [];

// Tipos MIME para servir los recursos estáticos correctamente
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp',
    '.mp4': 'video/mp4',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.otf': 'font/otf'
};

// Función para crear un servidor estático nativo ultra liviano
function startStaticServer(dir, port, displayName) {
    const server = http.createServer((req, res) => {
        try {
            // Limpiar query params y decodificar la URL
            const urlPath = decodeURIComponent(req.url.split('?')[0]);
            let filePath = path.join(dir, urlPath === '/' ? 'index.html' : urlPath);
            
            // Seguridad: evitar navegación fuera del directorio raíz del proyecto
            const normalizedPath = path.normalize(filePath);
            if (!normalizedPath.startsWith(path.normalize(dir))) {
                res.writeHead(403);
                res.end('403 Forbidden');
                return;
            }

            // Si es un directorio, servir index.html adentro
            if (fs.existsSync(normalizedPath) && fs.statSync(normalizedPath).isDirectory()) {
                filePath = path.join(normalizedPath, 'index.html');
            }

            if (!fs.existsSync(filePath)) {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<h1>404 Not Found</h1>', 'utf-8');
                return;
            }

            const extname = String(path.extname(filePath)).toLowerCase();
            const contentType = MIME_TYPES[extname] || 'application/octet-stream';

            res.writeHead(200, { 
                'Content-Type': contentType,
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
                'Surrogate-Control': 'no-store'
            });
            fs.createReadStream(filePath).pipe(res);
        } catch (error) {
            console.error(`[${displayName}] Error al procesar petición:`, error.message);
            res.writeHead(500);
            res.end('500 Internal Server Error');
        }
    });

    server.listen(port, '127.0.0.1', () => {
        console.log(`[${displayName}] Servidor estático activo en http://localhost:${port}`);
    });
    
    return server;
}

console.log('Iniciando servidores estáticos locales...');

// 1. Levantar servidor estático para cada proyecto de electricistas/servicios
projects.forEach((proj) => {
    const projectPath = path.join(__dirname, proj.name);
    if (fs.existsSync(projectPath)) {
        const srv = startStaticServer(projectPath, proj.port, proj.displayName);
        servers.push(srv);
    } else {
        console.error(`Error: Carpeta del proyecto "${proj.name}" no encontrada en ${projectPath}`);
    }
});

// 2. Levantar servidor para el panel de abogados (sirve Caubarrere, Biaturi, Cairo Duaso, Bermar Calcerrada, Rodríguez La Cruz)
const abogadosPath = __dirname;
console.log('Iniciando servidor de Abogados (Puerto 4177)...');
const abogadosServer = http.createServer((req, res) => {
    try {
        let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
        if (pathname === '/') pathname = '/ver-webs-abogados.html';
        
        let file = path.normalize(path.join(abogadosPath, pathname));
        if (!file.startsWith(abogadosPath)) {
            res.writeHead(403);
            res.end('Forbidden');
            return;
        }

        if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
            file = path.join(file, 'index.html');
        }

        if (!fs.existsSync(file)) {
            res.writeHead(404);
            res.end('Not found');
            return;
        }

        const extname = String(path.extname(file)).toLowerCase();
        const contentType = MIME_TYPES[extname] || 'application/octet-stream';

        res.writeHead(200, {
            'Content-Type': contentType,
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
        });
        fs.createReadStream(file).pipe(res);
    } catch (error) {
        console.error('[Abogados] Error:', error.message);
        res.writeHead(500);
        res.end('Server error');
    }
});

abogadosServer.listen(4177, '127.0.0.1', () => {
    console.log('[Abogados] Servidor de abogados activo en http://localhost:4177 (Panel ver-webs-abogados.html)');
});
servers.push(abogadosServer);

// Configurar escucha de teclado para abrir en navegador
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}

function printMenu() {
    console.clear();
    console.log('================================================================');
    console.log('   \x1b[33m🔥 AMARU WEB STUDIO - SERVIDORES DE PREVISUALIZACIÓN 🔥\x1b[0m   ');
    console.log('================================================================');
    console.log('Presiona una tecla para abrir la web correspondiente en Chrome:\n');
    
    console.log(`  [\x1b[36m1\x1b[0m] -> Romero Servicios                 (Puerto 3035)`);
    console.log(`  [\x1b[36m2\x1b[0m] -> Técnico Electricista Amaral      (Puerto 3065)`);
    console.log(`  [\x1b[36m3\x1b[0m] -> Soluciones Eléctricas EP          (Puerto 3075)`);
    console.log(`  [\x1b[36m4\x1b[0m] -> Panel de Estudios Jurídicos      (Puerto 4177)`);
    console.log(`         - Estudio Jurídico Caubarrere & Asoc`);
    console.log(`         - Abogada Biaturi - Estudio Jurídico`);
    console.log(`         - Estudio Jurídico Cairo Duaso`);
    console.log(`         - Abogado Bermar Calcerrada`);
    console.log(`         - Estudio Dr. Claudio Rodríguez La Cruz`);
    
    console.log('\n  [\x1b[32ma\x1b[0m] -> ABRIR TODAS las webs en Chrome');
    console.log('  [Ctrl+C] -> Apagar todos los servidores locales y salir');
    console.log('================================================================\n');
}

// Mostrar menú
setTimeout(() => {
    printMenu();
}, 1000);

process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
        console.log('\nApagando todos los servidores locales...');
        servers.forEach(s => s.close());
        process.exit();
    }

    if (str === '1') {
        exec('start chrome http://localhost:3035');
    } else if (str === '2') {
        exec('start chrome http://localhost:3065');
    } else if (str === '3') {
        exec('start chrome http://localhost:3075');
    } else if (str === '4') {
        exec('start chrome http://localhost:4177');
    } else if (str === 'a' || str === 'A') {
        console.log('Abriendo todas las webs...');
        exec('start chrome http://localhost:3035');
        exec('start chrome http://localhost:3065');
        exec('start chrome http://localhost:3075');
        exec('start chrome http://localhost:4177');
    }
});

// Evitar que el proceso termine
setInterval(() => {}, 10000);
