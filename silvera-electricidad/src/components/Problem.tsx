import { AlertTriangle, ShieldCheck, Zap } from "lucide-react";
import { motion } from "motion/react";

export function Problem() {
  const blocks = [
    {
      icon: <Zap className="w-6 h-6 text-gold" />,
      title: "Evitá cortocircuitos y fallas inesperadas"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-gold" />,
      title: "Protegé tu propiedad y tus electrodomésticos"
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-gold" />,
      title: "Trabajá con firma autorizada UTE y responsable"
    }
  ];

  return (
    <section className="py-24 border-b border-border-subtle relative z-10">
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-block font-mono text-xs font-bold tracking-widest text-gold uppercase">
              Seguridad Eléctrica
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink leading-tight tracking-tighter">
              En instalaciones eléctricas, no alcanza con que funcione:{" "}
              <span className="text-gold">tiene que ser seguro.</span>
            </h2>
            <p className="text-base sm:text-lg text-muted font-light leading-relaxed max-w-[50ch]">
              Una instalación improvisada o fuera de norma genera riesgos de incendio, daños en electrodomésticos y cortes continuos. Elegir un servicio técnico autorizado no es un costo adicional: es asegurar la tranquilidad de tu hogar y comercio.
            </p>
          </div>
          
          {/* Right Blocks */}
          <div className="lg:col-span-6 space-y-4">
            {blocks.map((block, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-5 p-5 rounded-2xl bg-paper border border-border-subtle hover:border-gold/30 hover:shadow-md transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/10">
                  {block.icon}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-ink tracking-tight">
                  {block.title}
                </h3>
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
