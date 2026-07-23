export const WHATSAPP_NUMBER = "59892870728";
export const WHATSAPP_MESSAGE = "Hola La Clinique, quiero coordinar una consulta de evaluación.";

export const FAQS = [
  {
    question: "¿Qué diferencia a sus programas de una sesión común?",
    answer: "Trabajamos por objetivos específicos. Diseñamos un proceso continuo que combina fisioterapia, osteopatía y fortalecimiento muscular activo en lugar de vender sesiones sueltas sin seguimiento."
  },
  {
    question: "¿Necesito derivación o pase médico para agendar?",
    answer: "No es obligatorio. En la primera consulta de evaluación inicial, nuestro equipo examina tu caso y define el plan de tratamiento adecuado. Si traes una orden médica, la incorporamos."
  },
  {
    question: "¿Cómo sé cuál es el programa indicado para mí?",
    answer: "Tras una consulta de evaluación donde analizamos tus síntomas, historial clínico y metas físicas, te recomendamos el abordaje interdisciplinario ideal para tu caso."
  },
  {
    question: "¿Qué especialidades integran en el centro?",
    answer: "Combinamos fisioterapia y kinesiología deportiva, osteopatía (de adultos y pediátrica), acupuntura, RPG, nutrición, sexología, deportología y cámara hiperbárica (Vitalbaric)."
  },
  {
    question: "¿Los programas contemplan trabajos en casa?",
    answer: "Sí. Te enseñamos a entender tu cuerpo y te entregamos pautas sencillas y ejercicios de movilidad para que los realices en tu hogar y mantengas tu autonomía."
  },
  {
    question: "¿Dónde están ubicados sus consultorios?",
    answer: "Contamos con dos sucursales: en Punta del Este (Edificio Surfside, Playa Brava Parada 33) y en Montevideo (Carrasco, Puntas de Santiago 1521)."
  }
];

export const REVIEWS = [
  {
    text: "Además de contar con un equipo de profesionales de primer nivel, el lugar es increíble y la vista aún mejor. Nos atendemos todos los integrantes de la familia, incluso nuestros niños de tres y seis años. Ugo los atiende con muchísimo amor. Recomiendo 100%.",
    author: "Guadalupe Argerich",
    source: "Google"
  },
  {
    text: "Clínica nueva en Punta del Este, con varias terapias. Para algunos terapeutas hay lista de espera y con otros podés conseguir turno.",
    author: "Antonella Della Valle",
    source: "Google"
  },
  {
    text: "¡Espectacular! Súper recomendado. Ugo, un genio.",
    author: "Paula Segura",
    source: "Google"
  },
  {
    text: "Recomendable 100%. Excelentes profesionales de la salud que te acompañan en la recuperación y seguimiento de tu lesión o dolor. Apto para todas las edades, ya que también ayudan a prevenir.",
    author: "Yésica Graña",
    source: "Google"
  },
  {
    text: "¡Me encanta! Tienen tremendo equipo. Voy con el osteópata, que es increíble, me dejó súper bien, y también con el masajista.",
    author: "Cecilia Iriarte",
    source: "Google"
  },
  {
    text: "Lo mejor en Punta del Este, sin dudas. Un muy buen equipo multidisciplinario de profesionales que ayudarán a tu bienestar. Muy recomendable.",
    author: "Fernanda Rodriguez",
    source: "Google"
  },
  {
    text: "Muy recomendable. Diferentes terapias complementarias en un mismo lugar. Excelente atención, un grupo humano y profesional de otro nivel.",
    author: "Soledad Larrosa",
    source: "Google"
  },
  {
    text: "La atención es increíble y súper amorosa. El lugar es impecable y armonioso. 100% recomendable.",
    author: "Mariana Velazquez",
    source: "Google"
  }
];

export const GOALS = [
  {
    id: "dolor",
    title: "Tengo dolor o molestias",
    treatments: "Espalda, cuello, articulaciones o tensión muscular persistente."
  },
  {
    id: "lesion",
    title: "Estoy recuperándome de una lesión",
    treatments: "Rehabilitación deportiva, postoperatoria o funcional."
  },
  {
    id: "rendimiento",
    title: "Quiero mejorar mi rendimiento",
    treatments: "Evaluación biomecánica y prevención para entrenar sin límites."
  },
  {
    id: "preventivo",
    title: "Quiero cuidar mi salud antes de que aparezca un problema",
    treatments: "Medicina integrativa, nutrición y acompañamiento preventivo."
  },
  {
    id: "pediatria",
    title: "Busco atención para mi hijo/a",
    treatments: "Osteopatía y fisioterapia pediátrica adaptada al desarrollo infantil."
  },
  {
    id: "dudas",
    title: "No sé con quién consultar",
    treatments: "Te orientamos sin costo para encontrar el profesional adecuado."
  }
];

export const TREATMENT_CATEGORIES = [
  {
    title: "Rehabilitación y Movimiento",
    items: [
      {
        name: "Recuperación de lesiones",
        desc: "Tratamiento activo y terapia manual para volver a moverte sin dolor y recuperar la fuerza. Integra Fisioterapia, RPG y Osteopatía."
      },
      {
        name: "Volver al deporte",
        desc: "Progresión planificada para recuperar confianza y capacidad física competitiva. Integra Deportología, Fisioterapia y Prevención de recaídas."
      },
      {
        name: "Dolor persistente",
        desc: "Abordaje neuromuscular y postural para molestias crónicas de columna, cuello o articulaciones que afectan tu descanso."
      }
    ]
  },
  {
    title: "Salud Integral y Prevención",
    items: [
      {
        name: "Salud preventiva",
        desc: "Evaluación de movilidad y hábitos para optimizar tu bienestar físico a largo plazo, antes de que aparezcan las limitaciones."
      },
      {
        name: "Bienestar y masoterapia",
        desc: "Masajes terapéuticos, deportivos y acupuntura médica para reducir tensión muscular profunda y bajar niveles de estrés."
      },
      {
        name: "Atención pediátrica",
        desc: "Acompañamiento especializado en desarrollo motor y fisioterapia respiratoria para bebés y niños en un entorno cálido."
      }
    ]
  }
];

export const LOCATIONS = [
  {
    id: "punta-del-este",
    name: "La Clinique - Punta del Este",
    day: "Lunes a Sábado",
    time: "9:00 a 19:00 hs",
    address: "Edificio Surfside, Playa Brava Parada 33, Punta del Este, Uruguay",
    button: "Agendar en Punta del Este",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3257.0673898114674!2d-54.8988523!3d-34.9298715!2m3!1f0!2f0!3f0!2m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95791bc5a828cb0f%3A0x6b09335f606ca5a!2sSurfside!5e0!3m2!1ses!2suy!4v1700000000000!5m2!1ses!2suy"
  },
  {
    id: "montevideo",
    name: "La Clinique - Montevideo",
    day: "Lunes a Viernes",
    time: "9:00 a 18:00 hs",
    address: "Puntas de Santiago 1521, Carrasco, Montevideo, Uruguay",
    button: "Agendar en Montevideo",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3272.766782800185!2d-56.059231!3d-34.887893!2m3!1f0!2f0!3f0!2m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f80b91e92d847%3A0xe54ef98e1cd59e00!2sPuntas%20de%20Santiago%201521%2C%2011500%20Montevideo%2C%20Departamento%20de%20Montevideo!5e0!3m2!1ses!2suy!4v1700000000000!5m2!1ses!2suy"
  }
];

export const RECOVERY_STORIES = [
  {
    id: "rodilla",
    patient: "Martín (Corredor amateur)",
    condition: "Dolor de rodilla al correr",
    goal: "Correr 10k sin molestias",
    approach: "Evaluación biomecánica de pisada, fortalecimiento de cadera y fisioterapia activa.",
    evolution: [
      "Fase 1: Alivio de inflamación y recuperación de rango de movimiento.",
      "Fase 2: Fortalecimiento específico (glúteo medio y rodilla).",
      "Fase 3: Carrera progresiva combinada sobre superficies controladas.",
      "Fase 4: Retorno completo a entrenamientos de 10k y pautas de prevención."
    ],
    testimonial: "“Volví a entrenar entendiendo qué necesitaba corregir, no solo tapando el dolor con analgésicos.”"
  },
  {
    id: "lumbar",
    patient: "Laura (Trabajo administrativo)",
    condition: "Dolor lumbar persistente",
    goal: "Trabajar y descansar sin dolor de espalda",
    approach: "Terapia manual osteopática, reeducación postural y fortalecimiento del core.",
    evolution: [
      "Fase 1: Liberación de tensiones y reducción de la rigidez de columna.",
      "Fase 2: Activación profunda del core y movilidad de cadera.",
      "Fase 3: Posturas ergonómicas y pausas activas para el trabajo.",
      "Fase 4: Autonomía total con rutinas breves de movilidad diaria."
    ],
    testimonial: "“El dolor diario me quitaba energía. Aprender a moverme y fortalecer mi espalda me cambió la vida.”"
  },
  {
    id: "esguince",
    patient: "Sofía (Jugadora de Hockey)",
    condition: "Esguince de tobillo grado II",
    goal: "Retornar al juego competitivo en 4 semanas",
    approach: "Drenaje del edema, terapia manual y propiocepción en superficies inestables.",
    evolution: [
      "Fase 1: Control del dolor, reducción de edema y apoyo del pie.",
      "Fase 2: Ejercicios de equilibrio y estabilidad de tobillo.",
      "Fase 3: Agilidad, giros y gestos específicos sobre el terreno de juego.",
      "Fase 4: Alta médica y retorno al juego seguro con vendaje preventivo."
    ],
    testimonial: "“Con la rehabilitación enfocada en mi deporte y el trabajo de estabilidad volví a jugar con total confianza.”"
  }
];
