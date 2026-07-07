const { spawn, execSync, exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const readline = require('readline');

const projects = [
    { id: '1', name: "prolighting", port: 3010 },
    { id: '2', name: "noguera-electricista-autorizado-por-ute", port: 3011 },
    { id: '3', name: "nicolas-electricista-habilitado-por-ute", port: 3012 },
    { id: '4', name: "juan-carlos-martinez-electricidad", port: 3013 },
    { id: '5', name: "electropunta", port: 3014 },
    { id: '6', name: "electricidad-ocean-park-electricista-facundo-azcurra", port: 3025 },
    { id: '7', name: "barcelo-instalaciones-electricas", port: 3016 },
    { id: '8', name: "alejandro-severo-electricista-autorizado-x-ute", port: 3017 },
    { id: '0', name: "electricista-pocitos", port: 3019 }
];

const processes = [];

console.log('Verifying dependencies (this might take a minute if node_modules are missing)...');

projects.forEach((project) => {
    const projectPath = path.join(__dirname, project.name);
    
    if (!fs.existsSync(projectPath)) {
        console.log(`[${project.name}] Directory not found. Skipping.`);
        return;
    }
    
    if (!fs.existsSync(path.join(projectPath, 'package.json'))) {
        console.log(`[${project.name}] No package.json found. Skipping.`);
        return;
    }
    
    if (!fs.existsSync(path.join(projectPath, 'node_modules'))) {
        console.log(`[${project.name}] Installing dependencies...`);
        try {
            execSync('npm install', { cwd: projectPath, stdio: 'inherit' });
        } catch (err) {
            console.error(`[${project.name}] Failed to install dependencies.`);
        }
    }

    console.log(`[${project.name}] Starting on port ${project.port}...`);

    const child = spawn('npx', ['vite', '--port', project.port.toString(), '--host', '127.0.0.1', '--force'], {
        cwd: projectPath,
        shell: true
    });

    child.stdout.on('data', data => {
        const output = data.toString();
        if (output.includes('ready in') || output.includes('Local:')) {
            // Project is ready, we print it
        }
    });

    child.stderr.on('data', data => {
        const err = data.toString();
        if (!err.includes('DeprecationWarning')) {
            // Ignore normal vite warnings
        }
    });

    processes.push(child);
});

// Configure keyboard listening
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}

function printMenu() {
    console.clear();
    console.log('================================================================');
    console.log('       🔥 AMARU WEB STUDIO - 10 WEBS EN LOCAL LISTAS 🔥       ');
    console.log('================================================================');
    console.log('Presiona el número/tecla para abrir esa web directamente en Chrome:\n');
    
    projects.forEach(p => {
        console.log(`  [${p.id}] -> ${p.name.padEnd(55)} (Puerto ${p.port})`);
    });
    
    console.log('\n  [a] -> ABRIR TODAS las 10 webs en Chrome');
    console.log('  [Ctrl+C] -> Apagar todos los servidores y salir');
    console.log('================================================================\n');
}

// Show menu after starting servers
setTimeout(() => {
    printMenu();
    console.log('Abriendo panel de control en Google Chrome...');
    const panelPath = path.join(__dirname, 'ver-webs.html').replace(/\\/g, '/');
    exec(`start chrome "file:///${panelPath}"`);
}, 2000);

process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
        console.log('\nApagando todos los servidores...');
        processes.forEach(p => p.kill());
        process.exit();
    }

    const matchedProject = projects.find(p => p.id === str);
    if (matchedProject) {
        console.log(`Abriendo ${matchedProject.name} (http://localhost:${matchedProject.port}) en Google Chrome...`);
        exec(`start chrome http://localhost:${matchedProject.port}`);
    } else if (str === 'a' || str === 'A') {
        console.log('Abriendo todas las webs en Google Chrome...');
        projects.forEach(p => {
            exec(`start chrome http://localhost:${p.port}`);
        });
    }
});
