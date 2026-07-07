const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const aestheticProjects = [
    { name: "aura-clinic-estetica-laser", port: 3024 },
    { name: "clinica-dra-magali-chaparro", port: 3025 },
    { name: "dr-matias-alcaraz", port: 3026 },
    { name: "dra-fernanda-rolan", port: 3027 },
    { name: "la-clinique-uy", port: 3028 },
    { name: "mint-clinica-orofacial", port: 3029 }
];

const processes = [];

aestheticProjects.forEach(proj => {
    const projDir = path.join(__dirname, proj.name);

    if (fs.existsSync(projDir)) {
        console.log(`Starting ${proj.name} on port ${proj.port}...`);
        
        // Spawn the Vite dev server and pipe outputs so they print in this process
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
