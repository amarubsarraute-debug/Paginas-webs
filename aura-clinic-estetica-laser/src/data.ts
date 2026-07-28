export const BRAND_NAME = "Aura Clinic";
export const BRAND_DESCRIPTOR = "Estética Láser";
export const INSTAGRAM_URL = "https://www.instagram.com/auraclinic.uy/";
export const WHATSAPP_NUMBER = "094 741 902";
export const WHATSAPP_PHONE = "59894741902";
export const DEFAULT_WHATSAPP_MESSAGE =
  "Hola, vi la web de Aura Clinic y quiero consultar por una evaluación.";
export const CONTACT_LABEL = "Agendar evaluación";

export function buildWhatsAppUrl(message = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0&utm_source=web`;
}

export const CONTACT_URL = buildWhatsAppUrl();
export const GOOGLE_REVIEW_LINK =
  "https://www.google.com/maps/search/?api=1&query=Aura%20Clinic%20Est%C3%A9tica%20L%C3%A1ser%20Montevideo";
export const MONTEVIDEO_ADDRESS = "Avenida Libertador 743, Local 13, 1er piso, Galería Punto.";
export const PUNTA_DEL_ESTE_ADDRESS = "Edificio Place Lafayette, Torre II.";

export const TRUST_ITEMS = [
  "Evaluación profesional",
  "Plan por zona",
  "Casos reales",
  "Seguimiento"
];

export const CONCERNS = [
  {
    title: "Grasa localizada",
    text: "Abdomen, cintura y zonas donde cuesta definir."
  },
  {
    title: "Flacidez corporal",
    text: "Firmeza, textura y calidad de piel según evaluación."
  },
  {
    title: "Contorno",
    text: "Plan para mejorar proporción y silueta sin cirugía."
  },
  {
    title: "Papada",
    text: "Perfil facial y zona submentoniana cuando el caso lo permite."
  },
  {
    title: "Botox",
    text: "Tratamiento para líneas de expresión con criterio médico."
  },
  {
    title: "Labios",
    text: "Ácido hialurónico para definición y armonía labial."
  }
];

export const METHOD_STEPS = [
  {
    title: "Consulta inicial",
    text: "Contás qué zona querés mejorar y elegís la sede."
  },
  {
    title: "Evaluación",
    text: "Se observa el punto de partida real del cuerpo o rostro."
  },
  {
    title: "Plan",
    text: "Se define tratamiento, zona y seguimiento."
  },
  {
    title: "Evolución",
    text: "Se acompaña el proceso con criterio profesional."
  }
];

export const TECHNOLOGY_POINTS = [
  {
    title: "MELA Láser TriActiva",
    text: "Tecnología orientada a grasa localizada, firmeza, contorno y calidad de piel según evaluación previa."
  },
  {
    title: "Endoláser",
    text: "Tecnología con indicación médica para zonas puntuales donde se busca definición y retracción."
  },
  {
    title: "Botox",
    text: "Aplicación médica para líneas de expresión y armonización del rostro."
  },
  {
    title: "Labios con ácido hialurónico",
    text: "Tratamiento orientado a definición, hidratación visual y armonía labial."
  }
];

export const PROFESSIONALS = [
  {
    name: "Dr. Arlet Pereira Santos",
    role: "Cirujano plástico",
    initials: "AP",
    text: "Más de 26 años de experiencia realizando cirugías plásticas. En Aura, su criterio ordena evaluación, indicación y expectativas.",
    proof: ["26+ años de experiencia", "Cirugía plástica", "Evaluación médica"]
  }
];

export const FEATURED_CASE = {
  eyebrow: "Caso destacado",
  title: "Laura llegó con un objetivo claro: volver a sentirse cómoda con su cuerpo.",
  patient: "Caso Laura",
  protocol: "MELA Láser TriActiva",
  quote: "Estoy súper bien, contenta con el resultado. Ahora ya se nota el cambio.",
  disclaimer:
    "Fotos y testimonio publicados únicamente con autorización expresa de la paciente.",
  summary:
    "Primero se marcaron áreas clave, luego se trabajó con un plan y seguimiento."
};

export const LOCATIONS = [
  {
    id: "montevideo",
    name: "Montevideo",
    day: "Atención con agenda previa",
    time: "Coordinación por WhatsApp",
    address: MONTEVIDEO_ADDRESS,
    note: "Avenida Libertador, Galería Punto.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Avenida%20Libertador%20743%20Local%2013%20Galer%C3%ADa%20Punto%20Montevideo",
    whatsappUrl: buildWhatsAppUrl(
      "Hola, quiero consultar por una evaluación en la sede de Montevideo."
    )
  },
  {
    id: "pde",
    name: "Punta del Este",
    day: "Atención con agenda previa",
    time: "Coordinación por WhatsApp",
    address: PUNTA_DEL_ESTE_ADDRESS,
    note: "Edificio Place Lafayette.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Edificio%20Place%20Lafayette%20Torre%20II%20Punta%20del%20Este",
    whatsappUrl: buildWhatsAppUrl(
      "Hola, quiero consultar por una evaluación en la sede de Punta del Este."
    )
  }
];

export const FAQS = [
  {
    question: "¿Necesito evaluación antes de comenzar?",
    answer:
      "Sí. La evaluación define zona, objetivo y expectativas antes de indicar cualquier tratamiento."
  },
  {
    question: "¿Tengo que saber qué tratamiento pedir?",
    answer:
      "No. Podés consultar por lo que querés mejorar y el equipo te orienta."
  },
  {
    question: "¿Qué zonas corporales se pueden tratar?",
    answer:
      "Aura trabaja abdomen, cintura, brazos, espalda, piernas, papada y otras zonas según evaluación."
  },
  {
    question: "¿También realizan tratamientos faciales?",
    answer:
      "Sí. Aura también trabaja Botox y labios con ácido hialurónico, siempre con evaluación previa."
  },
  {
    question: "¿Qué trabaja MELA Láser TriActiva?",
    answer:
      "Contorno corporal, grasa localizada, firmeza y calidad de piel. La indicación depende de cada caso."
  },
  {
    question: "¿Hay seguimiento?",
    answer:
      "Sí. El proceso se acompaña con registro, expectativas claras y orientación."
  },
  {
    question: "¿Dónde atienden?",
    answer:
      "Montevideo: Avenida Libertador 743, Local 13, 1er piso, Galería Punto. Punta del Este: Edificio Place Lafayette, Torre II."
  },
  {
    question: "¿Cómo agendo?",
    answer:
      "Por WhatsApp al 094 741 902."
  }
];

export const REVIEW_SLOTS: Array<{ title?: string; text: string }> = [];

export const GOALS = CONCERNS.map((concern, index) => ({
  id: `goal-${index + 1}`,
  title: concern.title,
  treatments: concern.text
}));

export const TREATMENT_CATEGORIES = [
  {
    title: "Corporales",
    items: CONCERNS.slice(0, 4).map((concern) => ({
      name: concern.title,
      desc: concern.text
    }))
  },
  {
    title: "Faciales",
    items: CONCERNS.slice(4).map((concern) => ({
      name: concern.title,
      desc: concern.text
    }))
  }
];
