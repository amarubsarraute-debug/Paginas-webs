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
    extraFiles: ['hero-poster.jpg', 'hero-scrub.mp4', 'robots.txt', 'logo-trujillo.png']
  },
  {
    name: 'Dra. Luisa Cedeño',
    dirName: 'web-luisa',
    projectPath: path.join(ROOT, 'web-luisa'),
    buildDir: path.join(ROOT, 'web-luisa', 'dist', 'client'),
    runDir: path.join(ROOT, 'web-luisa'),
    outputDir: path.join(ROOT, 'web-luisa'),
    defaultPort: 4174,
    extraFiles: ['robots.txt', 'lifting-8p-antes.png', 'lifting-8p-despues.png']
  },
  {
    name: 'Odontología Maldonado',
    dirName: 'odontologia-maldonado',
    projectPath: path.join(ROOT, 'odontologia-maldonado'),
    buildDir: path.join(ROOT, 'odontologia-maldonado', 'dist'),
    runDir: path.join(ROOT, 'odontologia-maldonado'),
    outputDir: path.join(ROOT, 'odontologia-maldonado'),
    defaultPort: 4175,
    extraFiles: ['robots.txt']
  },
  {
    name: 'Silvera Electricidad',
    dirName: 'silvera-electricidad',
    projectPath: path.join(ROOT, 'silvera-electricidad'),
    buildDir: path.join(ROOT, 'silvera-electricidad', 'dist'),
    runDir: path.join(ROOT, 'silvera-electricidad'),
    outputDir: path.join(ROOT, 'silvera-electricidad'),
    defaultPort: 4176,
    extraFiles: ['robots.txt']
  },
  {
    name: 'Dra. Adriana Galleno',
    dirName: 'dra-adriana-galleno',
    projectPath: path.join(ROOT, 'dra-adriana-galleno'),
    buildDir: path.join(ROOT, 'dra-adriana-galleno', 'dist'),
    runDir: path.join(ROOT, 'dra-adriana-galleno'),
    outputDir: path.join(ROOT, 'dra-adriana-galleno'),
    defaultPort: 4177,
    extraFiles: ['robots.txt']
  },
  {
    name: 'Milton Sardella',
    dirName: 'electricista-milton-sardella',
    projectPath: path.join(ROOT, 'electricista-milton-sardella'),
    buildDir: path.join(ROOT, 'electricista-milton-sardella', 'dist'),
    runDir: path.join(ROOT, 'electricista-milton-sardella'),
    outputDir: path.join(ROOT, 'electricista-milton-sardella'),
    defaultPort: 4178,
    extraFiles: ['robots.txt']
  },
  {
    name: 'Electricidad Ocean Park',
    dirName: 'electricidad-ocean-park-electricista-facundo-azcurra',
    projectPath: path.join(ROOT, 'electricidad-ocean-park-electricista-facundo-azcurra'),
    buildDir: path.join(ROOT, 'electricidad-ocean-park-electricista-facundo-azcurra', 'dist'),
    runDir: path.join(ROOT, 'electricidad-ocean-park-electricista-facundo-azcurra'),
    outputDir: path.join(ROOT, 'electricidad-ocean-park-electricista-facundo-azcurra'),
    defaultPort: 4179,
    extraFiles: ['robots.txt']
  },
  {
    name: 'Noguera Electricista',
    dirName: 'noguera-electricista-autorizado-por-ute',
    projectPath: path.join(ROOT, 'noguera-electricista-autorizado-por-ute'),
    buildDir: path.join(ROOT, 'noguera-electricista-autorizado-por-ute', 'dist'),
    runDir: path.join(ROOT, 'noguera-electricista-autorizado-por-ute'),
    outputDir: path.join(ROOT, 'noguera-electricista-autorizado-por-ute'),
    defaultPort: 4180,
    extraFiles: ['robots.txt']
  },
  {
    name: 'Barcelo Instalaciones',
    dirName: 'barcelo-instalaciones-electricas',
    projectPath: path.join(ROOT, 'barcelo-instalaciones-electricas'),
    buildDir: path.join(ROOT, 'barcelo-instalaciones-electricas', 'dist'),
    runDir: path.join(ROOT, 'barcelo-instalaciones-electricas'),
    outputDir: path.join(ROOT, 'barcelo-instalaciones-electricas'),
    defaultPort: 4181,
    extraFiles: ['robots.txt']
  },
  {
    name: 'Prolighting',
    dirName: 'prolighting',
    projectPath: path.join(ROOT, 'prolighting'),
    buildDir: path.join(ROOT, 'prolighting', 'dist'),
    runDir: path.join(ROOT, 'prolighting'),
    outputDir: path.join(ROOT, 'prolighting'),
    defaultPort: 4182,
    extraFiles: ['robots.txt']
  },
  {
    name: 'Juan Carlos Martinez',
    dirName: 'juan-carlos-martinez-electricidad',
    projectPath: path.join(ROOT, 'juan-carlos-martinez-electricidad'),
    buildDir: path.join(ROOT, 'juan-carlos-martinez-electricidad', 'dist'),
    runDir: path.join(ROOT, 'juan-carlos-martinez-electricidad'),
    outputDir: path.join(ROOT, 'juan-carlos-martinez-electricidad'),
    defaultPort: 4183,
    extraFiles: ['robots.txt']
  },
  {
    name: 'Alejandro Severo UTE',
    dirName: 'alejandro-severo-electricista-autorizado-x-ute',
    projectPath: path.join(ROOT, 'alejandro-severo-electricista-autorizado-x-ute'),
    buildDir: path.join(ROOT, 'alejandro-severo-electricista-autorizado-x-ute', 'dist'),
    runDir: path.join(ROOT, 'alejandro-severo-electricista-autorizado-x-ute'),
    outputDir: path.join(ROOT, 'alejandro-severo-electricista-autorizado-x-ute'),
    defaultPort: 4184,
    extraFiles: ['robots.txt']
  },
  {
    name: 'RH Electricista',
    dirName: 'rh-electricista-autorizado-por-ute',
    projectPath: path.join(ROOT, 'rh-electricista-autorizado-por-ute'),
    buildDir: path.join(ROOT, 'rh-electricista-autorizado-por-ute', 'dist'),
    runDir: path.join(ROOT, 'rh-electricista-autorizado-por-ute'),
    outputDir: path.join(ROOT, 'rh-electricista-autorizado-por-ute'),
    defaultPort: 4185,
    extraFiles: ['robots.txt']
  },
  {
    name: 'Nelson Berger',
    dirName: 'nelson-bergero-electricista',
    projectPath: path.join(ROOT, 'nelson-bergero-electricista'),
    buildDir: path.join(ROOT, 'nelson-bergero-electricista', 'dist'),
    runDir: path.join(ROOT, 'nelson-bergero-electricista'),
    outputDir: path.join(ROOT, 'nelson-bergero-electricista'),
    defaultPort: 4186,
    extraFiles: ['robots.txt']
  },
  {
    name: 'Electricista Cabrera',
    dirName: 'electricista-cabrera',
    projectPath: path.join(ROOT, 'electricista-cabrera'),
    buildDir: path.join(ROOT, 'electricista-cabrera', 'dist'),
    runDir: path.join(ROOT, 'electricista-cabrera'),
    outputDir: path.join(ROOT, 'electricista-cabrera'),
    defaultPort: 4187,
    extraFiles: ['robots.txt']
  },
  {
    name: 'Romero Servicios',
    dirName: 'romero-servicios',
    projectPath: path.join(ROOT, 'romero-servicios'),
    buildDir: path.join(ROOT, 'romero-servicios', 'dist'),
    runDir: path.join(ROOT, 'romero-servicios'),
    outputDir: path.join(ROOT, 'romero-servicios'),
    defaultPort: 4188,
    extraFiles: ['robots.txt']
  },
  {
    name: 'Hernandez Electricista',
    dirName: 'hernandez-electricista',
    projectPath: path.join(ROOT, 'hernandez-electricista'),
    buildDir: path.join(ROOT, 'hernandez-electricista', 'dist'),
    runDir: path.join(ROOT, 'hernandez-electricista'),
    outputDir: path.join(ROOT, 'hernandez-electricista'),
    defaultPort: 4190,
    extraFiles: ['robots.txt']
  },
  {
    name: 'Peter Montes de Oca',
    dirName: 'peter-montes-de-oca-electricista-24hs-aire-acondicionado',
    projectPath: path.join(ROOT, 'peter-montes-de-oca-electricista-24hs-aire-acondicionado'),
    buildDir: path.join(ROOT, 'peter-montes-de-oca-electricista-24hs-aire-acondicionado', 'dist'),
    runDir: path.join(ROOT, 'peter-montes-de-oca-electricista-24hs-aire-acondicionado'),
    outputDir: path.join(ROOT, 'peter-montes-de-oca-electricista-24hs-aire-acondicionado'),
    defaultPort: 4191,
    extraFiles: ['robots.txt']
  },
  {
    name: 'Bazzanos Instalaciones',
    dirName: 'bazzanos-instalaciones-electricas-firma-instaladora-autorizada-por-ute',
    projectPath: path.join(ROOT, 'bazzanos-instalaciones-electricas-firma-instaladora-autorizada-por-ute'),
    buildDir: path.join(ROOT, 'bazzanos-instalaciones-electricas-firma-instaladora-autorizada-por-ute', 'dist'),
    runDir: path.join(ROOT, 'bazzanos-instalaciones-electricas-firma-instaladora-autorizada-por-ute'),
    outputDir: path.join(ROOT, 'bazzanos-instalaciones-electricas-firma-instaladora-autorizada-por-ute'),
    defaultPort: 4192,
    extraFiles: ['robots.txt']
  },
  {
    name: 'Electricista Andres',
    dirName: 'electricista-andres',
    projectPath: path.join(ROOT, 'electricista-andres'),
    buildDir: path.join(ROOT, 'electricista-andres', 'dist'),
    runDir: path.join(ROOT, 'electricista-andres'),
    outputDir: path.join(ROOT, 'electricista-andres'),
    defaultPort: 4193,
    extraFiles: ['robots.txt']
  },
  {
    name: 'Marcelo UY',
    dirName: 'marcelo-tu-electricista-uy-habilitado-por-ute-categoria-c',
    projectPath: path.join(ROOT, 'marcelo-tu-electricista-uy-habilitado-por-ute-categoria-c'),
    buildDir: path.join(ROOT, 'marcelo-tu-electricista-uy-habilitado-por-ute-categoria-c', 'dist'),
    runDir: path.join(ROOT, 'marcelo-tu-electricista-uy-habilitado-por-ute-categoria-c'),
    outputDir: path.join(ROOT, 'marcelo-tu-electricista-uy-habilitado-por-ute-categoria-c'),
    defaultPort: 4194,
    extraFiles: ['robots.txt']
  },
  {
    name: 'Tecnico Electricista Amaral',
    dirName: 'tecnico-electricista-electricidad-amaral',
    projectPath: path.join(ROOT, 'tecnico-electricista-electricidad-amaral'),
    buildDir: path.join(ROOT, 'tecnico-electricista-electricidad-amaral', 'dist'),
    runDir: path.join(ROOT, 'tecnico-electricista-electricidad-amaral'),
    outputDir: path.join(ROOT, 'tecnico-electricista-electricidad-amaral'),
    defaultPort: 4195,
    extraFiles: ['robots.txt']
  },
  {
    name: 'Soluciones Electricas EP',
    dirName: 'soluciones-electricas-ep',
    projectPath: path.join(ROOT, 'soluciones-electricas-ep'),
    buildDir: path.join(ROOT, 'soluciones-electricas-ep', 'dist'),
    runDir: path.join(ROOT, 'soluciones-electricas-ep'),
    outputDir: path.join(ROOT, 'soluciones-electricas-ep'),
    defaultPort: 4196,
    extraFiles: ['robots.txt']
  },
  {
    name: 'Electropunta',
    dirName: 'electropunta',
    projectPath: path.join(ROOT, 'electropunta'),
    buildDir: path.join(ROOT, 'electropunta', 'dist'),
    runDir: path.join(ROOT, 'electropunta'),
    outputDir: path.join(ROOT, 'electropunta'),
    defaultPort: 4197,
    extraFiles: ['robots.txt']
  },
  {
    name: 'Voltio Electromecanica',
    dirName: 'voltio-electromecanica',
    projectPath: path.join(ROOT, 'voltio-electromecanica'),
    buildDir: path.join(ROOT, 'voltio-electromecanica', 'dist'),
    runDir: path.join(ROOT, 'voltio-electromecanica'),
    outputDir: path.join(ROOT, 'voltio-electromecanica'),
    defaultPort: 4198,
    extraFiles: ['robots.txt']
  },
  {
    name: 'Dr. Matías Alcaraz',
    dirName: 'dr-matias-alcaraz',
    projectPath: path.join(ROOT, 'dr-matias-alcaraz'),
    buildDir: path.join(ROOT, 'dr-matias-alcaraz', 'dist'),
    runDir: path.join(ROOT, 'dr-matias-alcaraz'),
    outputDir: path.join(ROOT, 'dr-matias-alcaraz'),
    defaultPort: 4199,
    extraFiles: []
  },
  {
    name: 'Clínica Magali Chaparro',
    dirName: 'clinica-magali-chaparro',
    projectPath: path.join(ROOT, 'clinica-magali-chaparro'),
    buildDir: path.join(ROOT, 'clinica-magali-chaparro', 'dist'),
    runDir: path.join(ROOT, 'clinica-magali-chaparro'),
    outputDir: path.join(ROOT, 'clinica-magali-chaparro'),
    defaultPort: 4200,
    extraFiles: []
  },
  {
    name: 'La Clinique Punta del Este',
    dirName: 'la-clinique-puntadeleste',
    projectPath: path.join(ROOT, 'la-clinique-puntadeleste'),
    buildDir: path.join(ROOT, 'la-clinique-puntadeleste', 'dist'),
    runDir: path.join(ROOT, 'la-clinique-puntadeleste'),
    outputDir: path.join(ROOT, 'la-clinique-puntadeleste'),
    defaultPort: 4201,
    extraFiles: []
  },
  {
    name: 'Mint Clínica Orofacial',
    dirName: 'mint-clinica-orofacial',
    projectPath: path.join(ROOT, 'mint-clinica-orofacial'),
    buildDir: path.join(ROOT, 'mint-clinica-orofacial', 'dist'),
    runDir: path.join(ROOT, 'mint-clinica-orofacial'),
    outputDir: path.join(ROOT, 'mint-clinica-orofacial'),
    defaultPort: 4202,
    extraFiles: []
  },
  {
    name: 'Aura Clinic Estética Láser',
    dirName: 'aura-clinic-estetica-laser',
    projectPath: path.join(ROOT, 'aura-clinic-estetica-laser'),
    buildDir: path.join(ROOT, 'aura-clinic-estetica-laser', 'dist'),
    runDir: path.join(ROOT, 'aura-clinic-estetica-laser'),
    outputDir: path.join(ROOT, 'aura-clinic-estetica-laser'),
    defaultPort: 4203,
    extraFiles: ['favicon.svg']
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

  // 1.5. Copiar index.src.html si existe
  const srcHtmlPath = path.join(project.runDir, 'index.src.html');
  const indexHtmlPath = path.join(project.runDir, 'index.html');
  if (fs.existsSync(srcHtmlPath)) {
    console.log(`📄 Copiando index.src.html a index.html para compilar desde fuente...`);
    fs.copyFileSync(srcHtmlPath, indexHtmlPath);
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
            // background-image: url(/assets/...) en estilos inline (zonas del "después", etc.)
            // — necesario para que carguen cuando el sitio se sirve en una subcarpeta.
            .replace(/url\(\/assets\//g, 'url(assets/')
            .replace(/url\('\/assets\//g, "url('assets/")
            .replace(/url\("\/assets\//g, 'url("assets/')
            .replace(/url\(&quot;\/assets\//g, 'url(&quot;assets/')
            .replace(/href="\/robots.txt"/g, 'href="robots.txt"');

          // Reemplazar archivos extra específicos si es necesario (src= o href=,
          // p.ej. favicon.svg queda como href="/favicon.svg" en el build de Vite)
          project.extraFiles.forEach(file => {
            const escaped = file.replace('.', '\\.');
            processedHtml = processedHtml
              .replace(new RegExp(`src="\\/${escaped}"`, 'g'), `src="${file}"`)
              .replace(new RegExp(`href="\\/${escaped}"`, 'g'), `href="${file}"`);
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

            // Post-procesar archivos JS para convertir "/assets/" absoluto a "assets/" relativo
            fs.readdirSync(destAssets).forEach(file => {
              if (file.endsWith('.js')) {
                const jsPath = path.join(destAssets, file);
                let content = fs.readFileSync(jsPath, 'utf8');
                if (content.includes('"/assets/')) {
                  content = content.replace(/"\/assets\//g, '"assets/');
                  fs.writeFileSync(jsPath, content, 'utf8');
                  console.log(`  └─ Rutas relativas aplicadas a JS: ${file}`);
                }
              }
            });
          }

          // Copiar carpeta de imágenes (dist/img) si existe
          const srcImg = path.join(project.buildDir, 'img');
          const destImg = path.join(project.outputDir, 'img');
          if (fs.existsSync(srcImg)) {
            console.log(`⚡ Copiando imágenes a ${path.relative(ROOT, destImg)}...`);
            copyRecursiveSync(srcImg, destImg);
            console.log(`✓ Imágenes copiadas.`);
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
  const filterArg = process.argv[2] ? process.argv[2].toLowerCase() : null;
  const projectsToProcess = filterArg 
    ? projects.filter(p => p.dirName.toLowerCase().includes(filterArg) || p.name.toLowerCase().includes(filterArg))
    : projects;

  if (filterArg) {
    if (projectsToProcess.length === 0) {
      console.warn(`⚠ No se encontró ningún proyecto que coincida con "${filterArg}". Se procesarán todos.`);
    } else {
      console.log(`🎯 Filtrando para procesar únicamente: ${projectsToProcess.map(p => p.name).join(', ')}`);
    }
  }

  for (const project of (projectsToProcess.length ? projectsToProcess : projects)) {
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
