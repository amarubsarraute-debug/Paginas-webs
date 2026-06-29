import {
  Briefcase, FileText, FileSignature, Gavel,
  type LucideIcon,
} from "lucide-react";
import alexandra from "@/assets/team/alexandra.jpg";
import paula from "@/assets/team/paula.jpg";
import gabriela from "@/assets/team/gabriela.jpg";
import ximena from "@/assets/team/ximena.jpg";

/* ---------------- Contact / WhatsApp ---------------- */
export const WA1 = "59895797084";
export const WA2 = "59892446792";
export const PHONE1_LABEL = "+598 95 797 084";
export const PHONE2_LABEL = "+598 92 44 67 92";
export const ADDRESS = "Rafael Pérez del Puerto 627, entre San Carlos y Rincón";
export const CITY = "Maldonado, Uruguay";
export const HOURS = "Lunes a viernes, de 9:00 a 19:00";
export const IG = "https://www.instagram.com/trujilloyasociadas";
export const FB = "https://www.facebook.com/Trujilloyasociadas";
export const MAPS_LINK =
  "https://maps.google.com/?q=Rafael+P%C3%A9rez+del+Puerto+627+Maldonado";
export const MAPS_EMBED =
  "https://www.google.com/maps?q=Rafael+P%C3%A9rez+del+Puerto+627+Maldonado&output=embed";

export const waLink = (n: string, msg = "Hola, quisiera agendar una consulta.") =>
  `https://wa.me/${n}?text=${encodeURIComponent(msg)}`;

/* ---------------- Navigation ---------------- */
export const NAV = [
  { href: "#servicios", label: "Servicios" },
  { href: "#escribania", label: "Escribanía" },
  { href: "#proceso", label: "Cómo trabajamos" },
  { href: "#equipo", label: "Equipo" },
  { href: "#resenas", label: "Reseñas" },
  { href: "#contacto", label: "Contacto" },
];

/* ---------------- Legal services ---------------- */
export type Service = {
  icon: LucideIcon;
  title: string;
  desc: string;
  bullets: string[];
};

export const services: Service[] = [
  {
    icon: Briefcase,
    title: "Consultas y asesoramiento legal",
    desc: "Analizamos tu situación y te damos recomendaciones claras antes de actuar.",
    bullets: ["Diagnóstico honesto", "Opciones explicadas", "Próximos pasos definidos"],
  },
  {
    icon: FileText,
    title: "Redacción y revisión de documentos",
    desc: "Contratos, acuerdos y documentación redactados o revisados con criterio jurídico.",
    bullets: ["Lenguaje claro", "Cláusulas seguras", "Revisión de riesgos"],
  },
  {
    icon: FileSignature,
    title: "Gestiones y trámites",
    desc: "Te acompañamos en gestiones administrativas y trámites con seguimiento real.",
    bullets: ["Plazos cuidados", "Reporte periódico", "Coordinación integral"],
  },
  {
    icon: Gavel,
    title: "Representación en procesos",
    desc: "Defendemos tus intereses con dedicación y comunicación constante.",
    bullets: ["Estrategia personalizada", "Trato humano", "Información en cada etapa"],
  },
];

/* ---------------- Notarial services ---------------- */
export const notaryServices: { t: string; d: string }[] = [
  { t: "Bienes raíces", d: "Gestiones notariales en operaciones inmobiliarias." },
  { t: "Escrituraciones", d: "Redacción y otorgamiento de escrituras con seguimiento completo." },
  { t: "Cartas poder", d: "Otorgamiento y asesoramiento para poderes según tu necesidad." },
  { t: "Certificaciones notariales", d: "Certificación de firmas, copias y documentación." },
  { t: "Sucesiones", d: "Acompañamiento notarial en trámites sucesorios." },
  { t: "Actas y notificaciones", d: "Actas de constatación y notificaciones notariales." },
  { t: "Personerías jurídicas", d: "Constitución y modificación de entidades." },
  { t: "Fideicomisos", d: "Asesoramiento y documentación para fideicomisos." },
  { t: "Inscripción RUPE", d: "Orientación y gestión para la inscripción en RUPE." },
];

/* ---------------- Process ---------------- */
export const processSteps: { n: string; t: string; d: string }[] = [
  { n: "01", t: "Primer contacto", d: "WhatsApp, llamada o formulario. Te respondemos con claridad." },
  { n: "02", t: "Revisión inicial", d: "Analizamos tu situación y te pedimos la documentación necesaria." },
  { n: "03", t: "Opciones y pasos", d: "Te explicamos las alternativas con palabras simples." },
  { n: "04", t: "Gestión y seguimiento", d: "Llevamos adelante el trabajo con reportes en cada etapa." },
  { n: "05", t: "Cierre y entrega", d: "Documentación completa, dudas resueltas y trato cercano." },
];

/* ---------------- Team (real portraits) ---------------- */
export type Member = { name: string; role: string; line: string; photo: string; areas?: string[] };

export const team: Member[] = [
  {
    name: "Alexandra Trujillo",
    role: "Abogada | Derecho Laboral, Penal y Administrativo",
    line: "Egresada de la Universidad de la República en 2006. Brinda asesoramiento en materia laboral, penal y administrativa, con una mirada comprometida y actualizada.",
    photo: alexandra,
    areas: ["Laboral", "Penal", "Administrativo"],
  },
  {
    name: "Paula Ancheta Bertoche",
    role: "Abogada | Derecho Penal y Familia Especializada",
    line: "Egresada de la Universidad de la República en 2019. Trabaja en Derecho Penal, familia especializada, violencia doméstica y derechos humanos.",
    photo: paula,
    areas: ["Penal", "Familia Especializada", "Violencia Doméstica", "DD.HH."],
  },
  {
    name: "Gabriela Sanguinet Rodríguez",
    role: "Abogada y Escribana",
    line: "Egresada de la Universidad de la República en 2007. Se especializa en asesoramiento jurídico-notarial, compraventas, sucesiones y certificaciones.",
    photo: gabriela,
    areas: ["Escribanía", "Compraventas", "Sucesiones", "Certificaciones"],
  },
  {
    name: "Ximena González Sanguinetti",
    role: "Abogada | Derecho del Trabajo y Seguridad Social",
    line: "Doctora en Derecho y Ciencias Sociales, egresada de la Universidad de la República en 2003. Su trayectoria se centra en Derecho del Trabajo y Seguridad Social.",
    photo: ximena,
    areas: ["Laboral", "Seguridad Social", "Relaciones Laborales"],
  },
];

/* ---------------- Testimonials (real Google reviews) ---------------- */
export const testimonials: { name: string; title: string; q: string }[] = [
  {
    name: "Jerome Pasteur",
    title: "Servicio y total confianza",
    q: "Tuvimos el contacto de Gabriela Sanguinet casi por casualidad, y desde entonces le confiamos todo sin dudar un segundo. Es una profesional con un gran sentido común, humilde, que domina a la perfección los trámites y los entresijos de la administración uruguaya. Además, es razonable en sus honorarios, rápida y eficiente. ¿Qué más se puede pedir? Totalmente recomendable.",
  },
  {
    name: "Dominique Pasteur",
    title: "Excelente experiencia",
    q: "Quiero felicitar calurosamente al estudio Trujillo por su profesionalismo ejemplar. El equipo demuestra una gran experiencia y una disponibilidad notable. Aprecié particularmente su enfoque humano: siempre amables, sonrientes y positivas, saben crear un clima de confianza muy tranquilizador. Agradezco especialmente a Gabriela Sanguinet por su acompañamiento durante nuestra instalación en Uruguay. Recomiendo ampliamente sus servicios, particularmente a los expatriados.",
  },
  {
    name: "Brian De los Santos",
    title: "Muy profesional y comprometida",
    q: "Excelente abogada, muy profesional y comprometida con su trabajo. Me ayudó durante todo mi proceso judicial y obtuvimos un gran resultado. Siempre estuvo disponible para aclarar mis dudas y me hizo sentir acompañado en todo momento. La recomiendo 100%.",
  },
  {
    name: "Maria Fleitas",
    title: "Atención clara y eficiente",
    q: "Necesitaba una escribana con urgencia por la compra de un vehículo y me recomendaron a Gabriela Sanguinet del Estudio Trujillo. Quedé súper conforme con la atención: muy profesional, clara y eficiente. Me solucionó todo enseguida. Totalmente recomendable ella y todo el equipo. También destaco a la abogada Paula Ancheta, a quien conozco y recomiendo.",
  },
  {
    name: "Álvaro Berrueta",
    title: "Compromiso y claridad",
    q: "Excelente profesional. Me acompañó con compromiso y claridad durante todo el proceso legal tras mi accidente en moto. Siempre fue responsable, atenta y eficiente. Totalmente recomendable por su ética y dedicación.",
  },
  {
    name: "Brisa Victoria Nuñez Otton",
    title: "Una lucha que ganamos juntas",
    q: "Tenía una situación complicada: me despidieron en post parto y no me querían pagar. La abogada me ayudó muchísimo. Fue una lucha de casi 2 años, pero en todo momento se encargó de la situación buscando lo mejor para mi caso. Le estaré siempre agradecida. Siempre recomendable.",
  },
  {
    name: "Jorge Gustavo Lembo",
    title: "Siempre responden tus dudas",
    q: "Su servicio es excelente, muy responsable y dedicado al trabajo de abogadas y escribana. Fundamentalmente, siempre te responden todas tus dudas. Trujillo 100% al obrero.",
  },
];

/* ---------------- FAQ ---------------- */
export const faqs: { q: string; a: string }[] = [
  { q: "¿Cómo agendo una consulta?", a: "Podés escribirnos por WhatsApp, llamarnos o completar el formulario de contacto. Te respondemos a la brevedad para coordinar." },
  { q: "¿Dónde están ubicadas?", a: "Nuestro estudio está en Rafael Pérez del Puerto 627, entre San Carlos y Rincón, Maldonado centro." },
  { q: "¿Qué horarios manejan?", a: "Atendemos de lunes a viernes, de 9:00 a 19:00." },
  { q: "¿Puedo consultar por WhatsApp?", a: "Sí, es el canal más rápido. Tenemos dos líneas disponibles para tu comodidad." },
  { q: "¿Qué documentación debo llevar?", a: "Depende de tu caso. En el primer contacto te indicamos exactamente qué necesitamos para avanzar." },
  { q: "¿Cómo informan los costos y los pasos?", a: "Con total transparencia: te explicamos el alcance del trabajo y los costos antes de comenzar." },
  { q: "¿También realizan trámites notariales?", a: "Sí, somos abogadas y escribanas. Cubrimos asesoramiento jurídico y servicios notariales." },
  { q: "¿Atienden Maldonado y alrededores?", a: "Sí, trabajamos con foco en Maldonado y zonas cercanas del departamento." },
];
