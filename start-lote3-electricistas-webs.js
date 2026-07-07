const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const projects = [
    { name: "peter-montes-de-oca-electricista-24hs-aire-acondicionado", port: 3036 },
    { name: "electricista-cabrera", port: 3037 },
    { name: "electricista-andres", port: 3038 },
    { name: "tecnico-electricista-electricidad-amaral", port: 3039 },
    { name: "soluciones-electricas-ep", port: 3040 },
    { name: "marcelo-tu-electricista-uy-habilitado-por-ute-categoria-c", port: 3041 },
    { name: "bazzanos-instalaciones-electricas-firma-instaladora-autorizada-por-ute", port: 3042 }
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
