const { spawn, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const projects = [
    "prolighting",
    "noguera-electricista-autorizado-por-ute",
    "nicolas-electricista-habilitado-por-ute",
    "juan-carlos-martinez-electricidad",
    "electropunta",
    "electricidad-ocean-park-electricista-facundo-azcurra",
    "barcelo-instalaciones-electricas"
];

let basePort = 3010;
const processes = [];

console.log('Verifying dependencies (this might take a minute if they are missing)...');

projects.forEach((project, index) => {
    const port = basePort + index;
    const projectPath = path.join(__dirname, project);
    
    if (!fs.existsSync(path.join(projectPath, 'package.json'))) {
        console.log(`[${project}] No package.json found. Skipping.`);
        return;
    }
    
    if (!fs.existsSync(path.join(projectPath, 'node_modules'))) {
        console.log(`[${project}] Installing dependencies...`);
        try {
            execSync('npm install', { cwd: projectPath, stdio: 'inherit' });
        } catch (err) {
            console.error(`[${project}] Failed to install dependencies.`);
        }
    }

    console.log(`[${project}] Starting on port ${port}...`);

    const child = spawn('npx', ['vite', '--port', port.toString(), '--host', '127.0.0.1'], {
        cwd: projectPath,
        shell: true
    });

    child.stdout.on('data', data => {
        const output = data.toString();
        if (output.includes('ready in') || output.includes('Local:')) {
            console.log(`[${project}] READY: http://localhost:${port}`);
        }
    });

    child.stderr.on('data', data => {
        const err = data.toString();
        if (!err.includes('DeprecationWarning')) {
           console.error(`[${project}] ERROR: ${err.trim()}`);
        }
    });

    processes.push(child);
});

process.on('SIGINT', () => {
    console.log('\nStopping all servers...');
    processes.forEach(p => p.kill());
    process.exit();
});

console.log('\n--- Web Servers Starting ---');
console.log('Press Ctrl+C in the terminal to stop all servers.\n');
