const { spawn, execSync, exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const readline = require('readline');
const http = require('http');

const projects = [
    { id: '1', name: "hernandez-electricista", displayName: "Hernández Electricista", port: 3050, type: 'vite' },
    { id: '2', name: "peter-montes-de-oca-electricista-24hs-aire-acondicionado", displayName: "Peter Montes de Oca", port: 3051, type: 'vite' },
    { id: '3', name: "bazzanos-instalaciones-electricas-firma-instaladora-autorizada-por-ute", displayName: "Bazzanos Instalaciones", port: 3052, type: 'vite' },
    { id: '4', name: "electricista-andres", displayName: "Electricista Andrés", port: 3053, type: 'vite' },
    { id: '5', name: "marcelo-tu-electricista-uy-habilitado-por-ute-categoria-c", displayName: "Marcelo (Tu Electricista UY)", port: 3054, type: 'vite' },
    { id: '6', name: "tecnico-electricista-electricidad-amaral", displayName: "Técnico Electricista Amaral", port: 3055, type: 'vite' }
];

const processes = [];
let staticServer = null;

console.log('Verificando dependencias de proyectos (esto puede demorar un momento)...');

// Iniciar servidor estático nativo para electromecanica-del-este
function startStaticServer(dir, port) {
    const MIME_TYPES = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
        '.ttf': 'font/ttf',
        '.otf': 'font/otf'
    };

    const server = http.createServer((req, res) => {
        let filePath = path.join(dir, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
        const extname = String(path.extname(filePath)).toLowerCase();
        const contentType = MIME_TYPES[extname] || 'application/octet-stream';

        fs.readFile(filePath, (error, content) => {
            if (error) {
                if (error.code === 'ENOENT') {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end('<h1>404 Not Found</h1>', 'utf-8');
                } else {
                    res.writeHead(500);
                    res.end(`Server Error: ${error.code}`);
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    });

    server.listen(port, '127.0.0.1');
    return server;
}

projects.forEach((project) => {
    const projectPath = path.join(__dirname, project.name);
    
    if (!fs.existsSync(projectPath)) {
        console.log(`[${project.displayName}] Directorio no encontrado en: ${projectPath}. Saltando.`);
        return;
    }

    if (project.type === 'static') {
        console.log(`[${project.displayName}] Levantando servidor estático nativo en puerto ${project.port}...`);
        try {
            staticServer = startStaticServer(projectPath, project.port);
        } catch (err) {
            console.error(`[${project.displayName}] Error al iniciar servidor estático:`, err.message);
        }
        return;
    }
    
    // Proyectos Vite
    if (!fs.existsSync(path.join(projectPath, 'package.json'))) {
        console.log(`[${project.displayName}] No se encontró package.json. Saltando.`);
        return;
    }
    
    if (!fs.existsSync(path.join(projectPath, 'node_modules'))) {
        console.log(`[${project.displayName}] Instalando dependencias (node_modules)...`);
        try {
            execSync('npm install', { cwd: projectPath, stdio: 'inherit' });
        } catch (err) {
            console.error(`[${project.displayName}] Error al instalar dependencias.`);
        }
    }

    console.log(`[${project.displayName}] Iniciando servidor Vite en puerto ${project.port}...`);

    const child = spawn('npx', ['vite', '--port', project.port.toString(), '--host', '127.0.0.1', '--force'], {
        cwd: projectPath,
        shell: true
    });

    child.stdout.on('data', data => {
        const output = data.toString();
    });

    child.stderr.on('data', data => {
        const err = data.toString();
    });

    processes.push(child);
});

// Configurar escucha de teclado
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}

function printMenu() {
    console.clear();
    console.log('================================================================');
    console.log('       \x1b[33m🔥 AMARU WEB STUDIO - LOTE SOLICITADO ACTIVO 🔥\x1b[0m         ');
    console.log('================================================================');
    console.log('Presiona el número para abrir esa web directamente en Chrome:\n');
    
    projects.forEach(p => {
        console.log(`  [\x1b[36m${p.id}\x1b[0m] -> ${p.displayName.padEnd(35)} (Puerto ${p.port})`);
    });
    
    console.log('\n  [\x1b[32ma\x1b[0m] -> ABRIR TODAS las 8 webs en Chrome');
    console.log('  [\x1b[32mp\x1b[0m] -> ABRIR EL PANEL de control (dashboard)');
    console.log('  [Ctrl+C] -> Apagar todos los servidores y salir');
    console.log('================================================================\n');
}

// Mostrar menú después de iniciar los servidores
setTimeout(() => {
    printMenu();
    console.log('Abriendo panel de control en Google Chrome...');
    const panelPath = path.join(__dirname, 'ver-webs-lote.html').replace(/\\/g, '/');
    exec(`start chrome "file:///${panelPath}"`);
}, 3000);

process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
        console.log('\nApagando todos los servidores...');
        processes.forEach(p => p.kill());
        if (staticServer) {
            staticServer.close();
        }
        process.exit();
    }

    const matchedProject = projects.find(p => p.id === str);
    if (matchedProject) {
        console.log(`Abriendo ${matchedProject.displayName} (http://localhost:${matchedProject.port}) en Google Chrome...`);
        exec(`start chrome http://localhost:${matchedProject.port}`);
    } else if (str === 'a' || str === 'A') {
        console.log('Abriendo todas las webs en Google Chrome...');
        projects.forEach(p => {
            exec(`start chrome http://localhost:${p.port}`);
        });
    } else if (str === 'p' || str === 'P') {
        console.log('Abriendo el panel de control...');
        const panelPath = path.join(__dirname, 'ver-webs-lote.html').replace(/\\/g, '/');
        exec(`start chrome "file:///${panelPath}"`);
    }
});
