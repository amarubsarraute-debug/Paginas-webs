export const GOOGLE_REVIEW_LINK = "https://www.google.com/maps/search/?api=1&query=dra-adriana-galleno%20Canelones";
export const WHATSAPP_NUMBER_1 = "59892722058";
export const WHATSAPP_NUMBER_2 = "59899669936";
export const WHATSAPP_MESSAGE = "Hola Dra. Adriana, quiero agendar una consulta.";

export const FAQS = [
  {
    question: "¿Los resultados se ven naturales?",
    answer: "El enfoque de la Dra. Adriana Galleno prioriza la naturalidad, la armonía y la conservación de la expresión. Cada tratamiento se indica según evaluación médica."
  },
  {
    question: "¿Voy a perder la expresión con Botox?",
    answer: "El objetivo del Botox bien indicado no es congelar el rostro, sino suavizar líneas y lograr una apariencia más descansada conservando gestos naturales."
  },
  {
    question: "¿Necesito consulta previa?",
    answer: "Sí. La evaluación médica permite entender tu caso, tus expectativas y qué tratamiento es realmente adecuado."
  },
  {
    question: "¿Atienden en Montevideo?",
    answer: "Sí, la atención en Buceo, Montevideo, es los martes de 9:00 a 18:00 hs."
  },
  {
    question: "¿Atienden en Punta del Este?",
    answer: "Sí, la atención en Punta del Este / Maldonado es los miércoles de 9:00 a 18:00 hs."
  },
  {
    question: "¿Atienden en Ciudad de la Costa?",
    answer: "Sí, la atención en Ciudad de la Costa es los jueves de 9:00 a 18:00 hs."
  },
  {
    question: "¿Qué tratamientos realizan para labios?",
    answer: "Se realizan tratamientos con ácido hialurónico orientados a hidratación profunda, volumen sutil y corrección de asimetrías, según evaluación."
  },
  {
    question: "¿Tratan manchas y melasma?",
    answer: "Sí, se pueden evaluar protocolos para manchas y melasma, adaptados al tipo de piel y al caso de cada paciente."
  },
  {
    question: "¿Qué es la ginecología regenerativa y funcional?",
    answer: "Es un enfoque médico orientado a mejorar el bienestar íntimo femenino, especialmente en situaciones como sequedad íntima, molestias, perimenopausia, menopausia o incontinencia urinaria leve."
  },
  {
    question: "¿Todos los pacientes obtienen el mismo resultado?",
    answer: "No. Los resultados varían según cada paciente. Todo tratamiento requiere evaluación médica y expectativas realistas."
  }
];

export const REVIEW_SLOTS = [
  {
    title: "Reseña real de Google",
    text: "Espacio reservado para cargar una reseña verificada con autorización o fuente pública confirmada."
  },
  {
    title: "Experiencia de paciente",
    text: "Agregar texto real, nombre visible y tratamiento solo cuando esté confirmado."
  },
  {
    title: "Testimonio autorizado",
    text: "No se muestran valoraciones exactas hasta verificar la ficha pública correspondiente."
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
    treatments: "Hilos tensores, bioestimulación de colágeno, Ultracol, Ultracol 200."
  },
  {
    id: "caida",
    title: "Caída capilar",
    treatments: "Alopecia androgenética y medicina regenerativa capilar."
  },
  {
    id: "bienestar",
    title: "Bienestar íntimo femenino",
    treatments: "Ginecología regenerativa y funcional, sequedad íntima, incontinencia urinaria leve, perimenopausia y menopausia."
  },
  {
    id: "menopausia",
    title: "Menopausia y perimenopausia",
    treatments: "Evaluación funcional, bienestar íntimo femenino, sequedad íntima y acompañamiento médico."
  },
  {
    id: "piel",
    title: "Calidad de piel",
    treatments: "Peelings, bioestimulación, hidratación profunda y protocolos regenerativos."
  },
  {
    id: "armonizacion",
    title: "Armonización facial",
    treatments: "Evaluación médica, ácido hialurónico, bioestimulación, hilos tensores y plan facial personalizado."
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
  },
  {
    title: "Ginecología regenerativa y funcional",
    items: [
      { name: "Bienestar íntimo femenino", desc: "Abordaje médico para mejorar calidad de vida íntima, comodidad y bienestar en distintas etapas." },
      { name: "Perimenopausia y menopausia", desc: "Acompañamiento en cambios íntimos, funcionales y hormonales que pueden afectar el bienestar femenino." },
      { name: "Sequedad íntima", desc: "Tratamientos orientados a mejorar molestias, incomodidad y calidad de vida íntima." },
      { name: "Incontinencia urinaria leve", desc: "Evaluación y alternativas funcionales para mujeres con síntomas leves." }
    ]
  }
];

export const LOCATIONS = [
  {
    id: "montevideo",
    name: "Montevideo / Buceo",
    day: "Martes",
    time: "9:00 a 18:00 hs",
    address: "Av. José Batlle y Ordóñez 2406, Apto 601, entre Mateo Cabral y Azara, Montevideo, Uruguay",
    button: "Agendar en Montevideo",
    mapUrl: "https://maps.app.goo.gl/mM2sfFJeLtq42QPU6",
    mapEmbedUrl: "https://www.google.com/maps?q=-34.8849556,-56.1396412&z=17&output=embed"
  },
  {
    id: "punta",
    name: "Punta del Este / Maldonado",
    day: "Miércoles",
    time: "9:00 a 18:00 hs",
    address: "José Enrique Rodó y Naciones Unidas",
    button: "Agendar en Punta del Este"
  },
  {
    id: "ciudad-costa",
    name: "Ciudad de la Costa",
    day: "Jueves",
    time: "9:00 a 18:00 hs",
    address: "Bahía Blanca esquina, 15005 Ciudad de la Costa",
    button: "Agendar en Ciudad de la Costa",
    mapUrl: "https://maps.app.goo.gl/VcuCKYQnBpmbzqqd6",
    mapEmbedUrl: "https://www.google.com/maps?q=-34.8357265,-55.9580107&z=17&output=embed"
  }
];
