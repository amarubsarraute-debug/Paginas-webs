const fs = require('fs');
const path = require('path');

// Proyectos a escanear (carpetas en el directorio actual)
const baseDir = __dirname;
const directories = fs.readdirSync(baseDir).filter(file => {
    const fullPath = path.join(baseDir, file);
    return fs.statSync(fullPath).isDirectory() 
        && fs.existsSync(path.join(fullPath, 'package.json'))
        && !file.startsWith('.')
        && file !== 'node_modules';
});

console.log(`Detectados ${directories.length} proyectos con package.json para analizar...\n`);

let dryRun = false; // Cambiar a true para simulación sin escribir cambios

directories.forEach(dirName => {
    const projectPath = path.join(baseDir, dirName);
    console.log(`----------------------------------------------------------------`);
    console.log(`📂 Procesando proyecto: ${dirName}`);

    // 1. Procesar Gallery.tsx si existe
    const galleryPath = path.join(projectPath, 'src', 'components', 'Gallery.tsx');
    if (fs.existsSync(galleryPath)) {
        let content = fs.readFileSync(galleryPath, 'utf8');
        let originalContent = content;

        // Reemplazar las extensiones de imágenes genéricas .jpg por .png
        // Esto corrige las imágenes cruzadas de la plantilla
        const replacements = [
            { from: /03_electricista_trabajando\.jpg/g, to: '03_electricista_trabajando.png' },
            { from: /04_iluminacion_led_mueble\.jpg/g, to: '04_iluminacion_led_mueble.png' },
            { from: /05_instalacion_exterior_cerca\.jpg/g, to: '05_instalacion_exterior_cerca.png' },
            { from: /06_instalacion_exterior_poste\.jpg/g, to: '06_instalacion_exterior_poste.png' }
        ];

        replacements.forEach(rep => {
            content = content.replace(rep.from, rep.to);
        });

        if (content !== originalContent) {
            console.log(`  [Gallery.tsx] -> Encontradas referencias .jpg de plantilla. Corrigiendo a .png...`);
            if (!dryRun) {
                fs.writeFileSync(galleryPath, content, 'utf8');
                console.log(`  [Gallery.tsx] -> ¡Cambios guardados con éxito!`);
            } else {
                console.log(`  [Gallery.tsx] -> [SIMULACIÓN] Cambios no guardados.`);
            }
        } else {
            console.log(`  [Gallery.tsx] -> No requiere correcciones de imágenes de plantilla.`);
        }
    } else {
        console.log(`  [Gallery.tsx] -> Archivo no encontrado. Saltando.`);
    }

    // 2. Procesar Clients.tsx si existe
    const clientsPath = path.join(projectPath, 'src', 'components', 'Clients.tsx');
    if (fs.existsSync(clientsPath)) {
        let content = fs.readFileSync(clientsPath, 'utf8');
        let originalContent = content;

        // Excluir de la sustitución masiva a los sitios que tienen testimonios reales confirmados específicos
        const excludedSlugs = [
            'silvera-electricidad',
            'electricidad-ocean-park-electricista-facundo-azcurra',
            'electropunta'
        ];

        if (!excludedSlugs.includes(dirName)) {
            // Si el componente está oculto con 'return null;' o no contiene ya el bloque de satisfacción 100%
            const isHidden = content.includes('return null;');
            const hasSatisfaction = content.includes('Calidad respaldada') || content.includes('Compromisos de Calidad');

            if (isHidden || !hasSatisfaction) {
                content = `import { Star, ShieldCheck, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { GOOGLE_REVIEW_LINK } from "../lib/constants";

export function Clients() {
  const commitments = [
    {
      title: "Instalaciones seguras y prolijas",
      desc: "Evitamos cableados sueltos y desordenados que generan recalentamientos. Cada llave térmica y disyuntor queda correctamente calibrado y rotulado."
    },
    {
      title: "Materiales homologados",
      desc: "Trabajamos únicamente con materiales normalizados y marcas líderes para asegurar que tu instalación cumpla con todas las medidas de seguridad."
    },
    {
      title: "Garantía de firma autorizada UTE",
      desc: "Realizamos certificaciones, firmas de carpetas, aumentos de potencia y trámites ante UTE con el aval de técnico registrado y matriculado."
    }
  ];

  return (
    <section id="resenas" className="py-24 border-y border-border-subtle relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tighter mb-16">
          Calidad respaldada,<br />trabajos garantizados.
        </h2>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Left: Satisfaction Badge */}
          <div className="md:col-span-5 space-y-6 text-left md:border-r border-border-subtle md:pr-12">
            <div className="text-7xl sm:text-8xl font-black text-ink leading-none tracking-tighter flex items-baseline">
              100%
            </div>
            <div className="flex text-gold text-xl tracking-widest">
              ★★★★★
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-ink font-bold uppercase tracking-wider">
                <ShieldCheck className="w-5 h-5 text-gold shrink-0" />
                <span>Satisfacción Asegurada</span>
              </div>
              <p className="text-muted text-sm font-light leading-relaxed">
                Nuestra prioridad es la conformidad absoluta en cada servicio. Si algo no queda según lo conversado, nos comprometemos a solucionarlo sin costo extra.
              </p>
            </div>

            {/* Google Review Button */}
            <div className="pt-2">
              <a 
                href={GOOGLE_REVIEW_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-border-subtle rounded-xl text-xs font-semibold text-ink bg-bg-tint hover:bg-gold/10 hover:border-gold transition-all duration-200"
              >
                <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                Opinar en Google
              </a>
            </div>
          </div>

          {/* Right: Commitments / Benefits */}
          <div className="md:col-span-7 space-y-8 pl-0 md:pl-6">
            <h3 className="text-ink font-mono text-xs font-bold uppercase tracking-wider mb-6">Nuestros Compromisos de Calidad</h3>
            {commitments.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-ink text-base sm:text-lg tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-muted text-sm sm:text-base font-light leading-relaxed mt-1">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
`;
            }
        }

        // Si no se reemplazó el componente entero, procesar reemplazo del contador si es que quedara
        if (content === originalContent) {
            const reviewCountRegex = /<span>\d+\+?\s+Reseñas de Google<\/span>/g;
            content = content.replace(reviewCountRegex, '<span>Reseñas de Google</span>');
        }

        if (content !== originalContent) {
            console.log(`  [Clients.tsx] -> Aplicando módulo de '100% Satisfacción' institucional...`);
            if (!dryRun) {
                fs.writeFileSync(clientsPath, content, 'utf8');
                console.log(`  [Clients.tsx] -> ¡Cambios guardados con éxito!`);
            } else {
                console.log(`  [Clients.tsx] -> [SIMULACIÓN] Cambios no guardados.`);
            }
        } else {
            console.log(`  [Clients.tsx] -> No requiere cambios de testimonios o ya tiene satisfacción.`);
        }
    } else {
        console.log(`  [Clients.tsx] -> Archivo no encontrado. Saltando.`);
    }

    // 3. Procesar Hero.tsx si existe para destacar nombre en negrita
    const heroPath = path.join(projectPath, 'src', 'components', 'Hero.tsx');
    if (fs.existsSync(heroPath)) {
        let content = fs.readFileSync(heroPath, 'utf8');
        let originalContent = content;

        // Expresión regular para buscar el nombre comercial antes de "realiza trabajos residenciales"
        const heroRegex = />\s*([A-Za-zÀ-ÿ0-9\s&°#'\-./\(\)]+?)\s+realiza\s+trabajos\s+residenciales/g;

        content = content.replace(heroRegex, (match, name) => {
            if (name.includes('<strong>') || name.includes('<b>') || name.includes('strong>')) {
                return match; // Ya está modificado
            }
            return `>\n              <strong>${name.trim()}</strong> realiza trabajos residenciales`;
        });

        if (content !== originalContent) {
            console.log(`  [Hero.tsx] -> Encontrado nombre del electricista. Aplicando negrita...`);
            if (!dryRun) {
                fs.writeFileSync(heroPath, content, 'utf8');
                console.log(`  [Hero.tsx] -> ¡Cambios guardados con éxito!`);
            } else {
                console.log(`  [Hero.tsx] -> [SIMULACIÓN] Cambios no guardados.`);
            }
        } else {
            console.log(`  [Hero.tsx] -> El nombre ya está en negrita o no requiere cambios.`);
        }
    } else {
        console.log(`  [Hero.tsx] -> Archivo no encontrado. Saltando.`);
    }
});

console.log(`\n================================================================`);
console.log(`🏁 ¡Proceso finalizado con éxito!`);
console.log(`================================================================`);
