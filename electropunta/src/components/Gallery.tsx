import { motion } from "motion/react";

export function Gallery() {
  const images = [
    {
      src: "./img/electropunta-tablero-industrial-abierto.jpg",
      alt: "Tablero industrial abierto con canaletas, rieles y espacio preparado para protecciones electricas.",
      tag: "Tableros"
    },
    {
      src: "./img/electropunta-tablero-control-capacitores.jpg",
      alt: "Tablero de control con protecciones, cableado identificado y banco de capacitores instalado.",
      tag: "Control"
    },
    {
      src: "./img/electropunta-panel-control-senalizacion.jpg",
      alt: "Panel de comando electrico con selectoras y luces de senalizacion en funcionamiento.",
      tag: "Comando"
    },
    {
      src: "./img/electropunta-iluminacion-local-comercial.jpg",
      alt: "Iluminacion instalada en local comercial de gran superficie, con sectores de venta correctamente iluminados.",
      tag: "Comercial"
    },
    {
      src: "./img/electropunta-tablero-distribucion-armado.jpg",
      alt: "Armado de tablero de distribucion con protecciones alineadas, cableado ordenado y barras de conexion.",
      tag: "Tableros"
    },
    {
      src: "./img/electropunta-iluminacion-fachada-comercial.jpg",
      alt: "Iluminacion exterior de fachada comercial y estacionamiento terminada para operacion nocturna.",
      tag: "Exteriores"
    }
  ];

  return (
    <section id="trabajos" className="py-24 border-t border-border-subtle relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="max-w-2xl mb-16 space-y-4">
          <div className="inline-block font-mono text-xs font-bold tracking-widest text-gold uppercase">
            Galeria de Trabajos
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink leading-none tracking-tighter">
            Trabajos electricos reales de Electropunta.
          </h2>
          <p className="text-muted text-base sm:text-lg font-light leading-relaxed max-w-[65ch]">
            Una seleccion de tableros, paneles de control e iluminacion comercial realizados para instalaciones exigentes en Maldonado y Punta del Este.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {images.map((img, index) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-bg-tint border border-border-subtle shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                <span className="text-white font-bold text-sm leading-tight tracking-tight">
                  {img.alt}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-gold border border-gold/30 px-2 py-0.5 rounded-md w-fit mt-2">
                  {img.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
