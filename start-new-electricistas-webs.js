const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const projects = [
    { name: "rh-electricista-autorizado-por-ute", port: 3030 },
    { name: "nelson-bergero-electricista", port: 3031 },
    { name: "voltio-electromecanica", port: 3032 },
    { name: "jhonatan-b-electricista", port: 3033 },
    { name: "hernandez-electricista", port: 3034 },
    { name: "romero-servicios", port: 3035 }
];

const processes = [];

projects.forEach(proj => {
    const projDir = path.join(__dirname, proj.name);

    if (fs.existsSync(projDir)) {
        console.log(`Starting ${proj.name} on port ${proj.port}...`);
        
        const server = spawn('cmd.exe', [
            '/c', 
            `cd /d ${projDir} && npx vite --port ${proj.port} --host 127.0.0.1`
        ], {
            stdio: 'inherit'
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
