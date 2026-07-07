const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const newProjects = [
    { name: "alejandro-severo-electricista-autorizado-x-ute", port: 3018 },
    { name: "electricista-pocitos", port: 3020 },
    { name: "electricistas-electricista-urgencias-habilitaciones-ute", port: 3021 },
    { name: "urgencias-electricas", port: 3023 }
];

const processes = [];

newProjects.forEach(proj => {
    const projDir = path.join(__dirname, proj.name);

    if (fs.existsSync(projDir)) {
        console.log(`Starting ${proj.name} on port ${proj.port}...`);
        
        // Spawn the Vite dev server and pipe outputs so they print in this process
        const server = spawn('cmd.exe', [
            '/c', 
            `cd /d ${projDir} && npx vite --port ${proj.port} --host 127.0.0.1`
        ], {
            stdio: 'inherit' // Inheriting stdio keeps the parent process alive and routes logs
        });

        processes.push(server);
    } else {
        console.log(`Directory ${proj.name} not found!`);
    }
});

// Prevent script from exiting
setInterval(() => {}, 10000);

process.on('SIGINT', () => {
    processes.forEach(p => p.kill());
    process.exit();
});
process.on('SIGTERM', () => {
    processes.forEach(p => p.kill());
    process.exit();
});
