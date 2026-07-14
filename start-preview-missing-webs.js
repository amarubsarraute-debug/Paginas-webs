const { spawn, execSync, exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const readline = require('readline');

const projects = [
    { id: '1', name: "electropunta", displayName: "Electropunta", port: 3070 },
    { id: '2', name: "gonzalo-chacon-electricista-urgencias-24-horas", displayName: "Gonzalo Chacón", port: 3071 },
    { id: '3', name: "urgencias-electricas", displayName: "Urgencias Eléctricas", port: 3072 },
    { id: '4', name: "voltio-electromecanica", displayName: "Voltio Electromecánica", port: 3073 },
    { id: '5', name: "jhonatan-b-electricista", displayName: "Jhonatan B. Electricista", port: 3074 },
    { id: '6', name: "soluciones-electricas-ep", displayName: "Soluciones Eléctricas EP", port: 3075 }
];

const processes = [];

console.log('Verificando dependencias de proyectos (esto puede demorar un momento si faltan)...');

projects.forEach((project) => {
    const projectPath = path.join(__dirname, project.name);
    
    if (!fs.existsSync(projectPath)) {
        console.log(`[${project.displayName}] Directorio no encontrado en: ${projectPath}. Saltando.`);
        return;
    }
    
    if (!fs.existsSync(path.join(projectPath, 'package.json'))) {
        console.log(`[${project.displayName}] No se encontró package.json. Saltando.`);
        return;
    }
    
    if (!fs.existsSync(path.join(projectPath, 'node_modules'))) {
        console.log(`[${project.displayName}] Instalando dependencias (node_modules)...`);
        try {
            execSync('npm install', { cwd: projectPath, stdio: 'inherit' });
        } catch (err) {
            console.error(`[${project.displayName}] Error al instalar dependencias:`, err.message);
        }
    }

    console.log(`[${project.displayName}] Iniciando servidor Vite en puerto ${project.port}...`);

    const child = spawn('npx', ['vite', '--port', project.port.toString(), '--host', '127.0.0.1'], {
        cwd: projectPath,
        shell: true
    });

    child.stdout.on('data', data => {
        // Opcional: registrar salida relevante
    });

    child.stderr.on('data', data => {
        const err = data.toString();
        if (!err.includes('DeprecationWarning')) {
            // console.error(`[${project.displayName}] ERROR: ${err.trim()}`);
        }
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
    console.log('    \x1b[33m🔥 PREVISUALIZAR WEBS DE ELECTRICISTAS FALTANTES 🔥\x1b[0m       ');
    console.log('================================================================');
    console.log('Presiona el número para abrir esa web directamente en Chrome:\n');
    
    projects.forEach(p => {
        console.log(`  [\x1b[36m${p.id}\x1b[0m] -> ${p.displayName.padEnd(35)} (Puerto ${p.port})`);
    });
    
    console.log('\n  [\x1b[32ma\x1b[0m] -> ABRIR TODAS las 6 webs en Chrome');
    console.log('  [\x1b[32mp\x1b[0m] -> ABRIR EL PANEL de control (ver-webs-faltantes.html)');
    console.log('  [Ctrl+C] -> Apagar todos los servidores y salir');
    console.log('================================================================\n');
}

// Mostrar menú después de iniciar los servidores
setTimeout(() => {
    printMenu();
    console.log('Abriendo panel de control en Google Chrome...');
    const panelPath = path.join(__dirname, 'ver-webs-faltantes.html').replace(/\\/g, '/');
    exec(`start chrome "file:///${panelPath}"`);
}, 3000);

process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
        console.log('\nApagando todos los servidores locales...');
        processes.forEach(p => p.kill());
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
        const panelPath = path.join(__dirname, 'ver-webs-faltantes.html').replace(/\\/g, '/');
        exec(`start chrome "file:///${panelPath}"`);
    }
});
