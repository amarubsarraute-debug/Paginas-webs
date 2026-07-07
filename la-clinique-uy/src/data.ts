export const GOOGLE_REVIEW_LINK = "https://www.google.com/maps/search/?api=1&query=La%20Clinique%20-%20Salud%20%26%20Bienestar%20Punta%20del%20Este";
export const WHATSAPP_NUMBER_1 = "59892870728";
export const WHATSAPP_NUMBER_2 = "59892870728";
export const WHATSAPP_MESSAGE = "Hola La Clinique, quiero agendar una consulta.";

export const FAQS = [
  {
    question: "¿Los resultados se ven naturales?",
    answer: "El enfoque de La Clinique prioriza la naturalidad, la armonía y la conservación de la expresión. Cada tratamiento se indica según evaluación personalizada."
  },
  {
    question: "¿Voy a perder la expresión con Botox?",
    answer: "El objetivo del Botox bien indicado no es congelar el rostro, sino suavizar líneas y lograr una apariencia más descansada conservando gestos naturales."
  },
  {
    question: "¿Necesito consulta previa?",
    answer: "Sí. La evaluación permite entender tu caso, tus expectativas y qué tratamiento es realmente adecuado."
  },
  {
    question: "¿Realizan tratamientos para labios?",
    answer: "Se realizan tratamientos con ácido hialurónico orientados a hidratación profunda, volumen sutil y corrección de asimetrías, según evaluación."
  },
  {
    question: "¿Tratan manchas y melasma?",
    answer: "Sí, se pueden evaluar protocolos para manchas y melasma, adaptados al tipo de piel y al caso de cada paciente."
  },
  {
    question: "¿Todos los pacientes obtienen el mismo resultado?",
    answer: "No. Los resultados varían según cada paciente. Todo tratamiento requiere evaluación profesional y expectativas realistas."
  }
];

export const REVIEW_SLOTS = [
  {
    "title": "Testimonio",
    "text": ""
  }
];

export const GOALS = [
  {
    id: "arrugas",
    title: "Arrugas y líneas de expresión",
    treatments: "Botox / toxina botulínica, bioestimulación de colágeno, calidad de piel."
  },
  {
    id: "labios",
    title: "Labios",
    treatments: "Ácido hialurónico, hidratación profunda, volumen sutil, corrección de asimetrías."
  },
  {
    id: "manchas",
    title: "Manchas y melasma",
    treatments: "Tratamiento de manchas, melasma, peelings, protocolos personalizados."
  },
  {
    id: "parpados",
    title: "Párpados y mirada",
    treatments: "Blefaroplastia no quirúrgica, xantelasma, tratamiento periocular, flacidez de párpados, calidad de piel periocular."
  },
  {
    id: "flacidez",
    title: "Flacidez facial",
    treatments: "Hilos tensores, bioestimulación de colágeno, Ultracol."
  },
  {
    id: "caida",
    title: "Caída capilar",
    treatments: "Alopecia androgenética y medicina regenerativa capilar."
  },
  {
    id: "piel",
    title: "Calidad de piel",
    treatments: "Peelings, bioestimulación, hidratación profunda y protocolos regenerativos."
  },
  {
    id: "armonizacion",
    title: "Armonización facial",
    treatments: "Evaluación profesional, ácido hialurónico, bioestimulación, hilos tensores y plan facial personalizado."
  }
];

export const TREATMENT_CATEGORIES = [
  {
    title: "Medicina estética facial",
    items: [
      { name: "Botox / toxina botulínica", desc: "Ideal para suavizar líneas de expresión y lograr un aspecto descansado, luminoso y natural, sin perder expresividad." },
      { name: "Ácido hialurónico", desc: "Tratamiento para armonizar, hidratar o recuperar volumen de forma sutil, según la necesidad de cada rostro." },
      { name: "Labios con ácido hialurónico", desc: "Hidratación profunda, volumen inmediato y sutil, y corrección de asimetrías respetando la naturalidad." },
      { name: "Hilos tensores", desc: "Tratamiento orientado a mejorar la flacidez y aportar efecto tensor sin cirugía." },
      { name: "Bioestimulación de colágeno", desc: "Estimulación progresiva para mejorar firmeza, textura y calidad de piel." },
      { name: "Ultracol / Ultracol 200", desc: "Tratamiento regenerativo orientado a mejorar calidad de piel, firmeza y estimulación de colágeno." }
    ]
  },
  {
    title: "Mirada y región periocular",
    items: [
      { name: "Párpados caídos", desc: "Evaluación y tratamiento de la flacidez de párpados para mejorar la apariencia de la mirada." },
      { name: "Blefaroplastia no quirúrgica", desc: "Alternativa no quirúrgica para trabajar el aspecto de párpados caídos y mejorar la región periocular." },
      { name: "Tratamiento periocular", desc: "Protocolos combinados para mejorar calidad de piel, flacidez y aspecto cansado de la mirada." },
      { name: "Xantelasma", desc: "Tratamiento de pequeñas acumulaciones de grasa en párpados, buscando que la lesión se vuelva imperceptible o más fácil de cubrir." }
    ]
  },
  {
    title: "Piel, manchas y melasma",
    items: [
      { name: "Tratamiento de manchas", desc: "Protocolos personalizados para mejorar la apariencia de manchas y unificar el tono de la piel." },
      { name: "Tratamiento de melasma", desc: "Abordaje médico-estético para pieles con melasma, adaptado a cada caso." },
      { name: "Peelings", desc: "Tratamientos para renovar la piel, mejorar textura, luminosidad y aspecto general." }
    ]
  },
  {
    title: "Medicina estética corporal",
    items: [
      { name: "Tratamientos corporales personalizados", desc: "Protocolos orientados a mejorar contorno, firmeza, textura de piel y bienestar corporal según evaluación." }
    ]
  },
  {
    title: "Medicina regenerativa capilar",
    items: [
      { name: "Alopecia androgenética", desc: "Evaluación y tratamientos regenerativos orientados a mejorar la salud capilar según cada caso." },
      { name: "Medicina regenerativa capilar", desc: "Protocolos personalizados para estimular y acompañar la recuperación capilar." }
    ]
  }
];

export const LOCATIONS = [
  {
    id: "consultorio",
    name: "La Clinique - Playa Mansa",
    day: "Lunes a Viernes",
    time: "9:00 a 18:00 hs",
    address: "Playa Mansa, Punta del Este, Uruguay",
    button: "Agendar Consulta",
    mapEmbedUrl: "https://www.google.com/maps?q=Playa%20Mansa%2C%20Punta%20del%20Este%2C%20Uruguay&output=embed"
  }
];
