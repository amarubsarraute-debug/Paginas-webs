/**
 * Script para armar las webs de prospección de electricistas en lote.
 * Lee los datos.json de cada prospecto, copia la plantilla silvera-electricidad,
 * personaliza textos, UTE, imágenes, testimonios y orden de secciones (Variantes A, B, C),
 * y compila el proyecto con "npm run build".
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const WORKSPACE_DIR = "c:\\Users\\amaru\\OneDrive\\Escritorio\\PAGINAS WEB";
const TEMPLATE_DIR = path.join(WORKSPACE_DIR, "silvera-electricidad");
const PROSPECTOS_DIR = path.join(WORKSPACE_DIR, "prospectos");
const REGISTRO_FILE = path.join(PROSPECTOS_DIR, "registro.json");

const LISTA_PROSPECTOS = [
  "electricidad-ocean-park-electricista-facundo-azcurra",
  "electropunta",
  "noguera-electricista-autorizado-por-ute",
  "nicolas-electricista-habilitado-por-ute",
  "prolighting",
  "juan-carlos-martinez-electricidad",
  "barcelo-instalaciones-electricas"
];

// Helper para copiar directorios de manera recursiva de forma rápida (excluyendo dist, .git, etc.)
async function copiarCarpeta(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === "dist" || entry.name === ".git" || entry.name === "node_modules") {
        continue; // No copiar estas carpetas directamente, node_modules se copia optimizado o linkeado
      }
      await copiarCarpeta(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

// Copiar node_modules de forma masiva (muy rápido si usamos robocopy en Windows)
function copiarNodeModules(src, dest) {
  try {
    const srcModules = path.join(src, "node_modules");
    const destModules = path.join(dest, "node_modules");
    console.log(`Copiando node_modules de forma optimizada a ${dest}...`);
    execSync(`robocopy "${srcModules}" "${destModules}" /xd .vite /e /ndl /nfl /njh /njs /np /mt:8`, { stdio: "ignore" });
    // Limpiar caché de vite en la copia si quedó algo
    const viteCache = path.join(destModules, ".vite");
    fs.rm(viteCache, { recursive: true, force: true }).catch(() => {});
  } catch (err) {
    console.log("Error al copiar node_modules de forma optimizada, intentando Copy-Item de Powershell...");
    try {
      execSync(`powershell -Command "Copy-Item -Path '${path.join(src, "node_modules")}' -Destination '${dest}' -Recurse -Container"`, { stdio: "inherit" });
    } catch (e) {
      console.error("Fallo definitivo al copiar node_modules:", e);
    }
  }
}

// Función principal del lote
async function main() {
  console.log("Iniciando generación de webs de prospección en lote...");

  // Leer registro actual
  let registro = { electricista: [], medicina_estetica: [], dentista: [] };
  try {
    const data = await fs.readFile(REGISTRO_FILE, "utf8");
    registro = JSON.parse(data);
  } catch (err) {
    console.log("No se pudo leer registro.json, creando uno nuevo...");
  }

  // Determinar última variante usada
  let ultimaVariante = "C"; // Fallback por defecto si no hay registro
  if (registro.electricista.length > 0) {
    ultimaVariante = registro.electricista[registro.electricista.length - 1].variante || "C";
  }

  const variantesDisponibles = ["A", "B", "C"];

  for (const slug of LISTA_PROSPECTOS) {
    console.log(`\n==================================================`);
    console.log(`Procesando prospecto: ${slug}`);
    console.log(`==================================================`);

    const prospectoPath = path.join(PROSPECTOS_DIR, slug);
    const datosPath = path.join(prospectoPath, "datos.json");

    let datos;
    try {
      const datosRaw = await fs.readFile(datosPath, "utf8");
      datos = JSON.parse(datosRaw);
    } catch (err) {
      console.error(`Error: No se pudo leer datos.json para ${slug}. Saltando...`);
      continue;
    }

    const destPath = path.join(WORKSPACE_DIR, slug);

    // 1. Alternar variante en la rotación (round-robin)
    const indexVariante = (variantesDisponibles.indexOf(ultimaVariante) + 1) % variantesDisponibles.length;
    const varianteElegida = variantesDisponibles[indexVariante];
    ultimaVariante = varianteElegida;

    console.log(`- Variante elegida: ${varianteElegida}`);

    // 2. Copiar estructura de plantilla (sin node_modules ni dist)
    console.log(`- Copiando archivos de la plantilla a: ${destPath}`);
    await fs.rm(destPath, { recursive: true, force: true }).catch(() => {});
    await copiarCarpeta(TEMPLATE_DIR, destPath);

    // 3. Copiar node_modules de forma rápida
    copiarNodeModules(TEMPLATE_DIR, destPath);

    // 4. Copiar fotos del negocio
    console.log(`- Copiando fotos del negocio...`);
    const fotosSrcPath = path.join(prospectoPath, "fotos");
    const imgDestPath = path.join(destPath, "public", "img");
    const imgRootDestPath = path.join(destPath, "img");

    await fs.mkdir(imgDestPath, { recursive: true });
    await fs.mkdir(imgRootDestPath, { recursive: true });

    let fotosCopiadas = [];
    let tieneLogo = false;
    let tieneAntesDespues = false;

    try {
      const files = await fs.readdir(fotosSrcPath);
      
      // Si hay logo
      const logoFile = files.find(f => f.startsWith("logo."));
      if (logoFile) {
        const logoExt = path.extname(logoFile);
        const logoSrc = path.join(fotosSrcPath, logoFile);
        
        // Copiar sobre 07_retrato_electricista.png (o .jpg si es el caso)
        // Guardaremos en public/img/07_retrato_electricista.jpg
        await fs.copyFile(logoSrc, path.join(imgDestPath, "07_retrato_electricista.jpg"));
        await fs.copyFile(logoSrc, path.join(imgRootDestPath, "07_retrato_electricista.jpg"));
        tieneLogo = true;
      }

      // Si hay antes/despues (antes.jpg y despues.jpg si existieran, o foto1/foto2 si son antes/despues)
      // Miremos si en datos.json se listan antes y despues. Si no, no usamos before-after.
      const antesFile = files.find(f => f.toLowerCase().includes("antes"));
      const despuesFile = files.find(f => f.toLowerCase().includes("despues"));
      if (antesFile && despuesFile) {
        await fs.copyFile(path.join(fotosSrcPath, antesFile), path.join(imgDestPath, "01_tablero_antes_limpio.jpg"));
        await fs.copyFile(path.join(fotosSrcPath, antesFile), path.join(imgRootDestPath, "01_tablero_antes_limpio.jpg"));
        await fs.copyFile(path.join(fotosSrcPath, despuesFile), path.join(imgDestPath, "02_tablero_despues_limpio.jpg"));
        await fs.copyFile(path.join(fotosSrcPath, despuesFile), path.join(imgRootDestPath, "02_tablero_despues_limpio.jpg"));
        tieneAntesDespues = true;
      }

      // Fotos de galería (foto1, foto2, foto3, etc.)
      const galeriaFiles = files.filter(f => f.startsWith("foto") && !f.toLowerCase().includes("antes") && !f.toLowerCase().includes("despues"));
      
      // Mapear fotos a los slots de la plantilla: 03, 04, 05, 06
      const slots = [
        "03_electricista_trabajando.jpg",
        "04_iluminacion_led_mueble.jpg",
        "05_instalacion_exterior_cerca.jpg",
        "06_instalacion_exterior_poste.jpg"
      ];

      for (let i = 0; i < slots.length; i++) {
        if (galeriaFiles[i]) {
          const fileSrc = path.join(fotosSrcPath, galeriaFiles[i]);
          await fs.copyFile(fileSrc, path.join(imgDestPath, slots[i]));
          await fs.copyFile(fileSrc, path.join(imgRootDestPath, slots[i]));
          fotosCopiadas.push(slots[i]);
        } else {
          // Dejar una de stock si no hay suficientes
          console.log(`- Nota: No hay foto para el slot ${slots[i]}, se usará la de stock original.`);
          // Como ya copiamos toda la plantilla, las imágenes de stock originales ya están allí como .png.
        }
      }

    } catch (err) {
      console.log(`- Advertencia al procesar fotos para ${slug}:`, err.message);
    }

    // 5. Personalización del código
    console.log(`- Personalizando archivos de código...`);

    // UTE Habilitación: verificar si el negocio es habilitado UTE
    // Se considera habilitado si tiene "ute" en el slug, nombre, servicios o notas.
    const tieneUte = slug.toLowerCase().includes("ute") || 
                     datos.negocio.toLowerCase().includes("ute") || 
                     (datos.servicios && datos.servicios.some(s => s.toLowerCase().includes("ute"))) ||
                     (datos.notas && datos.notas.toLowerCase().includes("ute"));

    console.log(`- ¿Tiene habilitación UTE?: ${tieneUte}`);

    // Reemplazos de texto
    const nombreNegocio = datos.negocio;
    const telefono = datos.telefono || "";
    const telefonoFormateado = telefono.replace(/\s+/g, "");
    const telefonoConCodigo = telefonoFormateado.startsWith("0") ? "598" + telefonoFormateado.slice(1) : (telefonoFormateado.startsWith("+") ? telefonoFormateado.replace("+", "") : "598" + telefonoFormateado);
    const ubicacion = `${datos.zona || "Maldonado"}${datos.barrio ? ", " + datos.barrio : ""}, Uruguay`;
    const email = datos.email || "";

    // A) constants.ts
    const constFile = path.join(destPath, "src", "lib", "constants.ts");
    let constContent = `export const WHATSAPP_NUMBER = "${telefono}";
export const WHATSAPP_LINK = "https://wa.me/${telefonoConCodigo}?text=Hola%20${encodeURIComponent(nombreNegocio)},%20quiero%20hacer%20una%20consulta%20por%20un%20trabajo%20el%C3%A9ctrico.";
export const EMAIL = "${email}";
export const LOCATION = "${ubicacion}";
export const SCHEDULE = "lunes a sábado de 7:00 a 20:00";
`;
    await fs.writeFile(constFile, constContent, "utf8");

    // B) Reemplazar en todos los componentes y archivos HTML el nombre, teléfono y UTE
    const archivosAProcesar = [
      path.join(destPath, "index.html"),
      path.join(destPath, "metadata.json"),
      path.join(destPath, "src", "components", "Hero.tsx"),
      path.join(destPath, "src", "components", "Problem.tsx"),
      path.join(destPath, "src", "components", "Services.tsx"),
      path.join(destPath, "src", "components", "BeforeAfterSection.tsx"),
      path.join(destPath, "src", "components", "Differentiator.tsx"),
      path.join(destPath, "src", "components", "Clients.tsx"),
      path.join(destPath, "src", "components", "Process.tsx"),
      path.join(destPath, "src", "components", "Trust.tsx"),
      path.join(destPath, "src", "components", "Gallery.tsx"),
      path.join(destPath, "src", "components", "FAQ.tsx"),
      path.join(destPath, "src", "components", "FinalCTA.tsx"),
      path.join(destPath, "src", "components", "Footer.tsx"),
    ];

    for (const filePath of archivosAProcesar) {
      try {
        let content = await fs.readFile(filePath, "utf8");

        // Cambiar extensiones de imágenes a JPG para las fotos copiadas
        // Hero
        if (tieneLogo) {
          content = content.replace(/\.\/img\/07_retrato_electricista\.png/g, "./img/07_retrato_electricista.jpg");
        }
        // Before/After
        if (tieneAntesDespues) {
          content = content.replace(/01_tablero_antes_limpio\.png/g, "01_tablero_antes_limpio.jpg");
          content = content.replace(/02_tablero_despues_limpio\.png/g, "02_tablero_despues_limpio.jpg");
        }
        // Gallery slots
        fotosCopiadas.forEach(slot => {
          const slotName = slot.split(".")[0]; // "03_electricista_trabajando"
          const regex = new RegExp(slotName + "\\.png", "g");
          content = content.replace(regex, slotName + ".jpg");
        });

        // Reemplazar nombre de marca
        content = content.replace(/Silvera Electricidad/g, nombreNegocio);
        content = content.replace(/Silvera\./g, `${nombreNegocio.split(" ")[0]}.`); // Primer palabra para el logo del footer
        content = content.replace(/Silvera/g, nombreNegocio.split(" ")[0]); // Reemplazar menciones sueltas
        
        // Reemplazar teléfono
        content = content.replace(/091 267 369/g, telefono);
        content = content.replace(/091267369/g, telefonoFormateado);
        content = content.replace(/59891267369/g, telefonoConCodigo);

        // Reemplazar UTE si el negocio no tiene habilitación UTE
        if (!tieneUte) {
          content = content.replace(/Firma Autorizada UTE/g, "Electricista Certificado");
          content = content.replace(/Firma autorizada por UTE hasta 50 kW/g, "Instalaciones Eléctricas Garantizadas");
          content = content.replace(/Firma autorizada técnica por UTE hasta 50 kW/g, "Servicio Técnico Autorizado");
          content = content.replace(/Firma técnica autorizada ante UTE hasta 50 kW para habilitaciones comerciales e industriales sin demoras\./g, "Armado y normalización de tableros eléctricos bajo normas de seguridad vigentes.");
          content = content.replace(/Firma técnica autorizada ante UTE hasta 50 kW/g, "Técnico Electricista Profesional");
          content = content.replace(/Firma UTE/g, "Tableros");
          content = content.replace(/Firma técnica ante UTE/g, "Servicio Certificado");
          content = content.replace(/Tableros y Habilitación UTE/g, "Tableros y Normalización");
          content = content.replace(/Tableros y Firma de UTE/g, "Tableros y Normalización");
          content = content.replace(/Trabajo bajo norma UTE/g, "Trabajo bajo normativas de seguridad");
          content = content.replace(/Habilitación de UTE firmadas al día/g, "Certificados de seguridad al día");
          content = content.replace(/Trámites UTE o aumento de carga/g, "Mantenimiento preventivo y reformas");
          content = content.replace(/¿Qué alcance tiene su firma técnica de UTE\?/g, "¿Qué tipo de trabajos y garantías ofrecen?");
          content = content.replace(/Silvera Electricidad posee firma autorizada técnica por UTE hasta 50 kW\. Esto incluye el armado, presentación y aprobación de carpetas técnicas residenciales, comerciales e industriales medianas\./g, "Realizamos todo tipo de trabajos eléctricos residenciales y comerciales de mantenimiento general, garantizando calidad, seguridad y cumplimiento estricto de las normativas de seguridad vigentes.");
          content = content.replace(/firmadas ante UTE/g, "certificadas");
          content = content.replace(/bajo normas UTE/g, "bajo normativas de seguridad");
          content = content.replace(/normas UTE/g, "normas de seguridad");
        }

        // C) Escribir testimonios en Clients.tsx
        if (filePath.endsWith("Clients.tsx")) {
          // Si el prospecto tiene testimonios en datos.json, usarlos
          if (datos.testimonios && datos.testimonios.length > 0) {
            const testimoniosFormateados = datos.testimonios.slice(0, 3).map(t => ({
              quote: t.texto,
              author: t.autor,
              service: "Servicio Recomendado"
            }));
            
            // Reemplazar mainReviews
            const mainReviewsRegex = /const mainReviews = \[\s*\{[\s\S]*?\}\s*\];/;
            content = content.replace(mainReviewsRegex, `const mainReviews = ${JSON.stringify(testimoniosFormateados, null, 2)};`);

            // Vaciar secondaryReviews en el JS
            content = content.replace(/const secondaryReviews = \[\s*\{[\s\S]*?\}\s*\];/, "const secondaryReviews = [];");

            // Ocultar sección de secondaryReviews en el JSX
            content = content.replace(
              /<div className="grid sm:grid-cols-3 gap-6 mt-12 pt-12 border-t border-border-subtle">[\s\S]*?<\/div>/,
              `{secondaryReviews.length > 0 && <div className="grid sm:grid-cols-3 gap-6 mt-12 pt-12 border-t border-border-subtle">
          {secondaryReviews.map((rev, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-paper border border-border-subtle p-5 rounded-2xl shadow-sm flex flex-col justify-between hover:border-gold/30 transition-colors"
            >
              <div className="flex text-gold text-xs tracking-wider mb-3">
                ★★★★★
              </div>
              <p className="text-ink font-light text-sm leading-relaxed mb-4">
                "{rev.quote}"
              </p>
              <div className="font-mono text-[10px] text-muted uppercase font-bold tracking-wider">
                Cliente • {rev.author}
              </div>
            </motion.div>
          ))}
        </div>}`
            );

            // Ajustar el rating gigante si figura en datos.json
            if (datos.rating) {
              content = content.replace(/5\.0\s*<\/div>/g, `${datos.rating.toFixed(1)}</div>`);
              const stars = "★".repeat(Math.round(datos.rating)) + "☆".repeat(5 - Math.round(datos.rating));
              content = content.replace(/★★★★★/g, stars);
            }
          } else {
            // Si no tiene testimonios, inyectar un return null al inicio del componente para que no renderice nada
            content = content.replace(/export function Clients\(\) \{/, "export function Clients() {\n  return null; // Oculto por falta de testimonios");
          }
        }

        // D) Ocultar BeforeAfterSection en App.tsx si no hay fotos antes/despues
        if (filePath.endsWith("BeforeAfterSection.tsx") && !tieneAntesDespues) {
          // Si no tiene antes/despues, inyectamos un return null
          content = content.replace(/export function BeforeAfterSection\(\) \{/, "export function BeforeAfterSection() {\n  return null; // Oculto por falta de fotos antes/después");
        }

        // E) Quitar email en el footer si no tiene
        if (filePath.endsWith("Footer.tsx") && !email) {
          content = content.replace(/<a href={`mailto:\${EMAIL}`} className="flex items-center gap-3 text-muted hover:text-gold transition-colors font-semibold">[\s\S]*?<\/a>/, "");
        }

        await fs.writeFile(filePath, content, "utf8");
      } catch (err) {
        console.log(`- Advertencia al procesar archivo ${filePath}: ${err.message}`);
      }
    }

    // 6. Aplicar orden de secciones de la variante elegida en App.tsx
    console.log(`- Aplicando orden de componentes en App.tsx para Variante ${varianteElegida}...`);
    const appFile = path.join(destPath, "src", "App.tsx");
    let appContent = `import { Hero } from './components/Hero';
import { Problem } from './components/Problem';
import { Services } from './components/Services';
import { ClientTypes } from './components/ClientTypes';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { Differentiator } from './components/Differentiator';
import { Clients } from './components/Clients';
import { Process } from './components/Process';
import { Trust } from './components/Trust';
import { CTA } from './components/CTA';
import { Gallery } from './components/Gallery';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  return (
    <div className="min-h-screen bg-transparent font-sans selection:bg-gold selection:text-navy relative z-10">
`;

    // Ordenar componentes según la variante
    if (varianteElegida === "A") {
      appContent += `      <Hero />
      <Problem />
      <Services />
      <ClientTypes />
      <BeforeAfterSection />
      <Differentiator />
      <Clients />
      <Process />
      <Trust />
      <CTA />
      <Gallery />
      <FAQ />
      <FinalCTA />
`;
    } else if (varianteElegida === "B") {
      appContent += `      <Hero />
      <Services />
      <Problem />
      <Clients />
      <BeforeAfterSection />
      <ClientTypes />
      <Gallery />
      <Differentiator />
      <Process />
      <Trust />
      <CTA />
      <FAQ />
      <FinalCTA />
`;
    } else if (varianteElegida === "C") {
      appContent += `      <Hero />
      <Differentiator />
      <Gallery />
      <Services />
      <Problem />
      <BeforeAfterSection />
      <ClientTypes />
      <Clients />
      <Trust />
      <Process />
      <CTA />
      <FAQ />
      <FinalCTA />
`;
    }

    appContent += `      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
`;
    await fs.writeFile(appFile, appContent, "utf8");

    // 7. Compilar el proyecto en producción
    console.log(`- Compilando proyecto con npm run build...`);
    try {
      execSync(`npm run build`, { cwd: destPath, stdio: "inherit" });
      console.log(`- Compilación exitosa para ${slug}.`);
    } catch (buildErr) {
      console.error(`- Error al compilar el proyecto ${slug}:`, buildErr.message);
    }

    // 8. Borrar node_modules del destino para ahorrar espacio y optimizar sync de OneDrive
    console.log(`- Limpiando node_modules de ${destPath}...`);
    try {
      await fs.rm(path.join(destPath, "node_modules"), { recursive: true, force: true });
      console.log(`- node_modules eliminado correctamente.`);
    } catch (rmErr) {
      console.log(`- No se pudo borrar node_modules automáticamente:`, rmErr.message);
    }

    // 9. Registrar en registro.json
    const nuevoRegistro = {
      negocio: nombreNegocio,
      carpeta_salida: slug,
      plantilla: "silvera-electricidad",
      variante: varianteElegida,
      fecha: new Date().toISOString().split("T")[0],
      notas: `Habilitación UTE: ${tieneUte}. Antes/después: ${tieneAntesDespues}. Testimonios: ${datos.testimonios ? datos.testimonios.length : 0}.`
    };

    const indexExistente = registro.electricista.findIndex(item => item.carpeta_salida === slug);
    if (indexExistente !== -1) {
      registro.electricista[indexExistente] = nuevoRegistro;
    } else {
      registro.electricista.push(nuevoRegistro);
    }

    // Escribir registro actualizado
    await fs.writeFile(REGISTRO_FILE, JSON.stringify(registro, null, 2), "utf8");
    console.log(`- Registro actualizado para ${slug}.`);
  }

  console.log("\nProceso de lote finalizado con éxito.");
}

main().catch(err => {
  console.error("Error crítico en el proceso de lote:", err);
});
