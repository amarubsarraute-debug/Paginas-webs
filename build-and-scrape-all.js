const { execSync, spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

// Función para copiar recursivamente
function copyRecursiveSync(src, dest) {
  if (fs.existsSync(src) && fs.statSync(src).isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

// Configuración de los proyectos
const projects = [
  {
    name: 'Trujillo Abogadas',
    dirName: 'web-trujillo',
    projectPath: path.join(ROOT, 'web-trujillo'),
    buildDir: path.join(ROOT, 'web-trujillo', 'legal-zen-build-main', 'dist', 'client'),
    runDir: path.join(ROOT, 'web-trujillo', 'legal-zen-build-main'),
    outputDir: path.join(ROOT, 'web-trujillo'),
    defaultPort: 4173,
    extraFiles: ['hero-poster.jpg', 'hero-scrub.mp4', 'robots.txt']
  },
  {
    name: 'Dra. Luisa Cedeño',
    dirName: 'web-luisa',
    projectPath: path.join(ROOT, 'web-luisa'),
    buildDir: path.join(ROOT, 'web-luisa', 'dist', 'client'),
    runDir: path.join(ROOT, 'web-luisa'),
    outputDir: path.join(ROOT, 'web-luisa'),
    defaultPort: 4174,
    extraFiles: ['robots.txt']
  }
];

function killProcessTree(childProcess) {
  if (!childProcess || !childProcess.pid) return;
  try {
    if (process.platform === 'win32') {
      execSync(`taskkill /pid ${childProcess.pid} /T /F`, { stdio: 'ignore' });
      console.log(`✓ Servidor temporal finalizado (Windows taskkill).`);
    } else {
      childProcess.kill();
      console.log(`✓ Servidor temporal finalizado.`);
    }
  } catch (e) {
    console.warn(`⚠ Advertencia al cerrar servidor temporal (PID ${childProcess.pid}):`, e.message);
  }
}

async function processProject(project) {
  console.log(`\n==================================================`);
  console.log(`  PROCESANDO: ${project.name}`);
  console.log(`==================================================\n`);

  if (!fs.existsSync(project.runDir)) {
    console.error(`⚠ No existe el directorio de ejecución: ${project.runDir}`);
    return;
  }

  // 1. Instalar dependencias si no existen
  const nodeModulesPath = path.join(project.runDir, 'node_modules');
  if (!fs.existsSync(nodeModulesPath)) {
    console.log(`📦 Instalando dependencias en ${project.name}...`);
    execSync('npm.cmd install --silent', { cwd: project.runDir, stdio: 'inherit' });
  }

  // 2. Compilar
  console.log(`🔨 Compilando ${project.name}...`);
  execSync('npm.cmd run build', { cwd: project.runDir, stdio: 'inherit' });

  // 3. Levantar servidor temporal de previsualización
  console.log(`⚡ Iniciando servidor temporal...`);
  
  const previewProcess = spawn('npm.cmd', ['run', 'preview'], {
    cwd: project.runDir,
    shell: true,
    env: {
      ...process.env,
      PORT: project.defaultPort
    }
  });

  let port = project.defaultPort;

  // Escuchar salida para detectar el puerto real que use Vite/Vinxi
  await new Promise((resolve) => {
    const onData = (data) => {
      const output = data.toString();
      console.log(`[Vite Output] ${output.trim()}`);
      
      // Limpiar códigos de escape ANSI que puedan interferir en la expresión regular
      const cleanOutput = output.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
      
      const match = cleanOutput.match(/localhost:(\d+)/i) || cleanOutput.match(/127\.0\.0\.1:(\d+)/) || cleanOutput.match(/:(\d+)\//);
      if (match) {
        port = parseInt(match[1], 10);
        console.log(`🎯 Servidor detectado en puerto ${port}!`);
        previewProcess.stdout.off('data', onData);
        resolve();
      }
    };

    previewProcess.stdout.on('data', onData);
    previewProcess.stderr.on('data', (data) => {
      console.error(`[Vite Error] ${data.toString().trim()}`);
    });

    // Timeout de 15 segundos por si no logramos capturar la salida
    setTimeout(() => {
      previewProcess.stdout.off('data', onData);
      console.log(`⌛ Timeout de detección: usando puerto por defecto ${port}`);
      resolve();
    }, 15000);
  });

  // Esperar 2 segundos adicionales para asegurar que el server esté listo para responder peticiones
  await new Promise(resolve => setTimeout(resolve, 2000));

  let success = false;
  // 4. Scrape del HTML
  try {
    await new Promise((resolve, reject) => {
      console.log(`🔍 Scraping http://localhost:${port}/ ...`);
      const req = http.get(`http://localhost:${port}/`, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          if (res.statusCode !== 200) {
            reject(new Error(`Respuesta HTTP no-200: ${res.statusCode}`));
            return;
          }

          // Hacer las rutas relativas
          let processedHtml = body
            .replace(/href="\/assets\//g, 'href="assets/')
            .replace(/src="\/assets\//g, 'src="assets/')
            .replace(/href="\/robots.txt"/g, 'href="robots.txt"');

          // Reemplazar archivos extra específicos si es necesario
          project.extraFiles.forEach(file => {
            const regexStr = `src="\\/${file.replace('.', '\\.')}"`;
            const regex = new RegExp(regexStr, 'g');
            processedHtml = processedHtml.replace(regex, `src="${file}"`);
          });

          // Guardar index.html en el outputDir
          const outputPath = path.join(project.outputDir, 'index.html');
          fs.writeFileSync(outputPath, processedHtml, 'utf8');
          console.log(`✓ HTML guardado en ${path.relative(ROOT, outputPath)}`);

          // Copiar assets
          const srcAssets = path.join(project.buildDir, 'assets');
          const destAssets = path.join(project.outputDir, 'assets');
          if (fs.existsSync(srcAssets)) {
            console.log(`⚡ Copiando assets a ${path.relative(ROOT, destAssets)}...`);
            copyRecursiveSync(srcAssets, destAssets);
            console.log(`✓ Assets copiados.`);
          }

          // Copiar archivos extra
          project.extraFiles.forEach(file => {
            const srcFile = path.join(project.buildDir, file);
            const destFile = path.join(project.outputDir, file);
            if (fs.existsSync(srcFile)) {
              fs.copyFileSync(srcFile, destFile);
              console.log(`✓ Copiado archivo extra: ${file}`);
            }
          });

          success = true;
          resolve();
        });
      });

      req.on('error', (err) => {
        reject(err);
      });

      // Timeout del request de 10 segundos
      req.setTimeout(10000, () => {
        req.destroy();
        reject(new Error('Timeout al intentar conectar con el servidor temporal.'));
      });
    });
  } catch (err) {
    console.error(`❌ Error durante el scraping:`, err.message);
  } finally {
    // 5. Apagar servidor temporal
    console.log(`🔌 Deteniendo servidor temporal...`);
    killProcessTree(previewProcess);
  }

  if (!success) {
    throw new Error(`El procesamiento del proyecto ${project.name} no se completó.`);
  }
}

async function main() {
  for (const project of projects) {
    try {
      await processProject(project);
    } catch (e) {
      console.error(`❌ Error fatal en proyecto ${project.name}:`, e.message);
    }
  }
  console.log(`\n==================================================`);
  console.log(`✨ ¡PROCESO DE GENERACIÓN COMPLETADO CON ÉXITO!`);
  console.log(`==================================================\n`);
}

main();
