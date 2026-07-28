import { buildWhatsAppUrl } from './data';

export type TreatmentVisualKey =
  | 'grasa-localizada'
  | 'flacidez-corporal'
  | 'contorno'
  | 'papada'
  | 'botox'
  | 'labios';

export type TreatmentPageContent = {
  slug: TreatmentVisualKey;
  path: string;
  category: string;
  shortTitle: string;
  title: string;
  cardText: string;
  intro: string;
  metaDescription: string;
  improves: string[];
  indicatedFor: string[];
  procedure: Array<{ title: string; text: string }>;
  resultGoals: string[];
  recovery: string[];
  proofTitle: string;
  proofText: string;
  faqs: Array<{ question: string; answer: string }>;
  ctaMessage: string;
  testimonialIds: string[];
};

export type TestimonialMessage = {
  id: string;
  area: string;
  quote: string;
  context: string;
};

export const TESTIMONIAL_MESSAGES: TestimonialMessage[] = [
  {
    id: 'ojeras-cambio',
    area: 'Mirada',
    quote: 'Estoy encantada con el resultado. Ahora con menos ojeras se lucen más.',
    context: 'Mensaje posterior a tratamiento periocular.'
  },
  {
    id: 'abdomen-cambio',
    area: 'Corporal',
    quote: 'Espectacular. Excelente, me alegra tu cambio.',
    context: 'Respuesta luego de revisar fotos de avance.'
  },
  {
    id: 'labios-natural',
    area: 'Labios',
    quote: 'Hinchados y todo, divinos; se ven naturales. Me encanta. Gracias.',
    context: 'Mensaje recibido luego del procedimiento.'
  },
  {
    id: 'botox-notorio',
    area: 'Botox facial',
    quote: 'La verdad es muy notorio el cambio, quedé muy contenta.',
    context: 'Feedback de resultado en líneas de expresión.'
  },
  {
    id: 'laser-peel-brillo',
    area: 'Hollywood Láser peel',
    quote: 'La piel súper suave y con brillo hermoso. No quedé roja ni sensible.',
    context: 'Primera sesión de peel láser.'
  },
  {
    id: 'laser-peel-firmeza',
    area: 'Hollywood Láser peel',
    quote: 'Me dejó la piel suave y firme.',
    context: 'Sensación posterior al tratamiento.'
  },
  {
    id: 'piel-confianza',
    area: 'Piel',
    quote: 'Me siento súper linda y segura de estar sin maquillaje. Muchísimas gracias de corazón.',
    context: 'Mensaje de paciente sobre calidad de piel.'
  },
  {
    id: 'post-tratamiento',
    area: 'Seguimiento',
    quote: 'Estamos en cada paso del proceso.',
    context: 'Acompañamiento post tratamiento.'
  }
];

export const TREATMENT_PAGES: TreatmentPageContent[] = [
  {
    slug: 'grasa-localizada',
    path: '/tratamientos/grasa-localizada',
    category: 'Corporal',
    shortTitle: 'Grasa localizada',
    title: 'Grasa localizada',
    cardText: 'Abdomen, cintura y zonas donde cuesta definir.',
    intro:
      'Un plan por zona para trabajar volumen localizado cuando el objetivo no es bajar de peso, sino mejorar definición y proporción corporal con evaluación previa.',
    metaDescription:
      'Tratamiento para grasa localizada en Aura Clinic: qué mejora, para quién puede estar indicado, cómo se realiza, cuidados, antes y después y CTA de valoración.',
    improves: [
      'Volumen puntual en abdomen, cintura, espalda, brazos o piernas.',
      'Definición visual de zonas que no responden como se espera a rutina o alimentación.',
      'Proporción corporal y comodidad con la ropa.',
      'Calidad de piel cuando el caso también necesita firmeza.'
    ],
    indicatedFor: [
      'Personas con zonas localizadas y expectativas realistas.',
      'Casos donde se busca una alternativa no quirúrgica o mínimamente invasiva según indicación.',
      'Pacientes que pueden sostener seguimiento y cuidados posteriores.',
      'Personas que quieren una evaluación antes de elegir tecnología.'
    ],
    procedure: [
      {
        title: 'Valoración de la zona',
        text: 'Se observa el punto de partida, distribución del tejido, calidad de piel y objetivo real.'
      },
      {
        title: 'Indicación del protocolo',
        text: 'El equipo define si corresponde MELA Láser TriActiva, endolaser u otro abordaje según el caso.'
      },
      {
        title: 'Trabajo focalizado',
        text: 'La sesión se realiza por zona, con parámetros y tiempos adaptados a la indicación profesional.'
      },
      {
        title: 'Seguimiento',
        text: 'Se registra evolución, se explican cuidados y se ajustan expectativas durante el proceso.'
      }
    ],
    resultGoals: [
      'Mejorar contorno sin buscar un cambio artificial.',
      'Reducir visualmente volumen localizado cuando el caso lo permite.',
      'Acompañar una silueta más definida.',
      'Ordenar el proceso con fotos, controles y criterio profesional.'
    ],
    recovery: [
      'Puede haber inflamación o sensibilidad temporal según el protocolo indicado.',
      'El uso de faja o compresión se indica solo si corresponde al caso.',
      'Se explican actividad, hidratación y cuidados posteriores antes de retirarte.',
      'Los controles ayudan a acompañar el resultado y resolver dudas.'
    ],
    proofTitle: 'Abdomen y cintura',
    proofText:
      'Caso real de trabajo corporal por zona. Las fotos son orientativas: cada cuerpo responde distinto y requiere evaluación.',
    faqs: [
      {
        question: 'Sirve para bajar de peso?',
        answer:
          'No se presenta como tratamiento para bajar de peso. Se evalúa cuando hay una zona localizada y un objetivo de definición corporal.'
      },
      {
        question: 'Cuántas sesiones necesito?',
        answer:
          'Depende de la zona, el punto de partida y la tecnología indicada. La cantidad se define en valoración.'
      },
      {
        question: 'Puedo tratar abdomen y cintura juntos?',
        answer:
          'A veces sí, pero depende de la evaluación y de cómo convenga ordenar el plan por zonas.'
      },
      {
        question: 'Cuándo se ve el resultado?',
        answer:
          'La evolución es progresiva y se revisa en seguimiento. Aura evita prometer tiempos iguales para todos.'
      }
    ],
    ctaMessage: 'Hola Aura Clinic, quiero consultar por una valoración de grasa localizada.',
    testimonialIds: ['abdomen-cambio', 'post-tratamiento']
  },
  {
    slug: 'flacidez-corporal',
    path: '/tratamientos/flacidez-corporal',
    category: 'Corporal',
    shortTitle: 'Flacidez corporal',
    title: 'Flacidez corporal',
    cardText: 'Firmeza, textura y calidad de piel según evaluación.',
    intro:
      'Un abordaje para zonas donde la piel perdió firmeza o textura, especialmente cuando el objetivo es mejorar calidad de piel sin plantear una cirugía como primera respuesta.',
    metaDescription:
      'Página de flacidez corporal de Aura Clinic: qué mejora, para quién puede estar indicada, procedimiento, resultados buscados, cuidados y valoración.',
    improves: [
      'Sensación de piel más laxa en abdomen, brazos, piernas o cintura.',
      'Textura y calidad visual de la piel.',
      'Firmeza en zonas que perdieron tensión con el tiempo o cambios corporales.',
      'Definición cuando la flacidez aparece junto a grasa localizada.'
    ],
    indicatedFor: [
      'Personas que notan piel menos firme y quieren evaluar opciones.',
      'Casos leves o moderados donde puede tener sentido tecnología no quirúrgica.',
      'Pacientes que entienden que la indicación depende de calidad de piel y tejido.',
      'Personas que buscan un plan gradual, no un cambio inmediato exagerado.'
    ],
    procedure: [
      {
        title: 'Evaluación de calidad de piel',
        text: 'Se revisa firmeza, textura, zona y expectativa para decidir si el caso es tratable.'
      },
      {
        title: 'Elección de tecnología',
        text: 'La indicación puede combinar estímulo de firmeza, contorno o protocolos corporales según necesidad.'
      },
      {
        title: 'Sesiones por zona',
        text: 'Se trabaja con parámetros definidos y se evita tratar por moda sin diagnóstico previo.'
      },
      {
        title: 'Control de evolución',
        text: 'El seguimiento permite observar cambios reales y ajustar el plan si hace falta.'
      }
    ],
    resultGoals: [
      'Buscar una piel visualmente más firme.',
      'Mejorar textura y soporte de la zona tratada.',
      'Acompañar un contorno más prolijo.',
      'Mantener un resultado natural y coherente con el cuerpo.'
    ],
    recovery: [
      'Los cuidados dependen de la tecnología indicada.',
      'Puede indicarse hidratación, evitar calor intenso o cuidados locales por un periodo corto.',
      'Si se combina con tratamiento de contorno, el seguimiento define tiempos y pautas.',
      'La respuesta no es igual en todos los casos.'
    ],
    proofTitle: 'Firmeza y calidad de piel',
    proofText:
      'Registro corporal usado como referencia visual de evolución. La valoración define si flacidez, grasa localizada o contorno deben trabajarse juntos.',
    faqs: [
      {
        question: 'La flacidez se corrige completamente?',
        answer:
          'No se promete corrección total. Se busca mejorar firmeza y calidad de piel cuando el caso tiene indicación.'
      },
      {
        question: 'Es lo mismo que tratar grasa localizada?',
        answer:
          'No. A veces se combinan, pero flacidez y grasa localizada se evalúan con criterios distintos.'
      },
      {
        question: 'Sirve después de adelgazar?',
        answer:
          'Puede evaluarse, pero depende de cuánta laxitud haya, calidad de piel y expectativas.'
      },
      {
        question: 'Necesito reposo?',
        answer:
          'Depende del protocolo. En la valoración se explican tiempos, cuidados y posibles sensaciones.'
      }
    ],
    ctaMessage: 'Hola Aura Clinic, quiero consultar por una valoración de flacidez corporal.',
    testimonialIds: ['post-tratamiento', 'abdomen-cambio']
  },
  {
    slug: 'contorno',
    path: '/tratamientos/contorno',
    category: 'Corporal',
    shortTitle: 'Contorno',
    title: 'Contorno corporal',
    cardText: 'Plan para mejorar proporción y silueta sin cirugía.',
    intro:
      'Una página para quienes no consultan por una única zona, sino por una silueta: cintura, abdomen, espalda, piernas o perfil corporal completo.',
    metaDescription:
      'Contorno corporal en Aura Clinic: qué mejora, indicaciones posibles, cómo se realiza, resultados buscados, cuidados, antes y después y valoración.',
    improves: [
      'Proporción entre abdomen, cintura, espalda y piernas.',
      'Definición de zonas que hacen que la silueta se vea menos ordenada.',
      'Sensación de volumen o falta de forma en áreas puntuales.',
      'Continuidad visual entre zonas tratadas.'
    ],
    indicatedFor: [
      'Personas que quieren evaluar más de una zona.',
      'Pacientes que buscan una lectura integral del cuerpo antes de decidir.',
      'Casos donde conviene priorizar y ordenar etapas.',
      'Personas que prefieren un plan realista antes que tratamientos aislados.'
    ],
    procedure: [
      {
        title: 'Lectura corporal',
        text: 'Se define qué zona pesa más visualmente y qué conviene priorizar.'
      },
      {
        title: 'Plan por etapas',
        text: 'No siempre se trata todo a la vez. El protocolo puede ordenarse por zonas y tiempos.'
      },
      {
        title: 'Tecnología indicada',
        text: 'Se decide si corresponde MELA Láser TriActiva, endolaser u otro recurso disponible.'
      },
      {
        title: 'Registro del proceso',
        text: 'Las fotos de avance ayudan a ver cambios que a veces en el día a día pasan desapercibidos.'
      }
    ],
    resultGoals: [
      'Mejorar la lectura general de la silueta.',
      'Trabajar definición sin perder naturalidad.',
      'Evitar decisiones impulsivas por una sola foto o tendencia.',
      'Alinear expectativas, tecnología y seguimiento.'
    ],
    recovery: [
      'Las pautas varían según las zonas tratadas.',
      'Puede recomendarse compresión, hidratación o cuidados de actividad.',
      'El seguimiento es parte del resultado, no un extra.',
      'Si hay varias etapas, se explican los tiempos entre una y otra.'
    ],
    proofTitle: 'Cintura, espalda y silueta',
    proofText:
      'Caso real de evolución corporal. Se muestra como prueba visual, no como promesa de resultado idéntico.',
    faqs: [
      {
        question: 'Puedo consultar sin saber qué zona tratar?',
        answer:
          'Sí. Justamente la valoración ayuda a definir si conviene abdomen, cintura, espalda, piernas o una combinación.'
      },
      {
        question: 'Contorno es lo mismo que lipo?',
        answer:
          'No. Aura evalúa opciones estéticas no quirúrgicas o mínimamente invasivas según el caso y explica límites reales.'
      },
      {
        question: 'Se puede hacer por etapas?',
        answer:
          'Sí. Muchas veces es lo más ordenado para cuidar indicación, tiempos y seguimiento.'
      },
      {
        question: 'Qué llevo a la consulta?',
        answer:
          'Alcanza con contar que te gustaría mejorar. El equipo te orienta sobre fotos, antecedentes o cuidados si hicieran falta.'
      }
    ],
    ctaMessage: 'Hola Aura Clinic, quiero consultar por una valoración de contorno corporal.',
    testimonialIds: ['abdomen-cambio', 'post-tratamiento']
  },
  {
    slug: 'papada',
    path: '/tratamientos/papada',
    category: 'Facial',
    shortTitle: 'Papada',
    title: 'Papada y perfil facial',
    cardText: 'Perfil facial y zona submentoniana cuando el caso lo permite.',
    intro:
      'Un abordaje para evaluar volumen o flacidez bajo el mentón y ordenar qué tratamiento tiene sentido para mejorar el perfil sin forzar el rostro.',
    metaDescription:
      'Tratamiento de papada en Aura Clinic: qué mejora, para quién puede estar indicado, cómo se realiza, resultados, cuidados, antes y después y CTA.',
    improves: [
      'Volumen bajo el mentón.',
      'Definición del ángulo mandibular y perfil.',
      'Aspecto de cuello o zona submentoniana según el caso.',
      'Proporción visual entre rostro, mentón y cuello.'
    ],
    indicatedFor: [
      'Personas que notan papada en fotos de perfil o frente.',
      'Casos donde la zona submentoniana tiene grasa localizada, laxitud o una combinación.',
      'Pacientes que buscan una mejora natural sin exagerar facciones.',
      'Personas que necesitan saber si el caso es de piel, grasa o estructura.'
    ],
    procedure: [
      {
        title: 'Análisis de perfil',
        text: 'Se observa mentón, cuello, piel y proporción facial antes de indicar.'
      },
      {
        title: 'Definición de abordaje',
        text: 'Según el caso, puede evaluarse tecnología para grasa localizada, retracción o calidad de piel.'
      },
      {
        title: 'Tratamiento focal',
        text: 'La zona se trabaja con criterio conservador para cuidar el equilibrio del rostro.'
      },
      {
        title: 'Control posterior',
        text: 'Se acompañan inflamación, evolución y cuidados necesarios.'
      }
    ],
    resultGoals: [
      'Buscar un perfil más definido.',
      'Mejorar la continuidad visual entre mentón y cuello.',
      'Evitar un resultado duro o poco natural.',
      'Entender si la papada puede tratarse sin cirugía o requiere otra indicación.'
    ],
    recovery: [
      'Puede haber inflamación temporal según el protocolo.',
      'Los cuidados de masaje, compresión o actividad se indican solo si corresponden.',
      'La evolución se controla con fotos y consulta.',
      'La respuesta depende de piel, tejido y estructura facial.'
    ],
    proofTitle: 'Perfil y zona submentoniana',
    proofText:
      'Referencia visual de antes y después en perfil. La evaluación define si la papada puede abordarse con tecnología estética.',
    faqs: [
      {
        question: 'La papada siempre es grasa?',
        answer:
          'No. Puede influir grasa localizada, flacidez, estructura facial o postura. Por eso se evalúa antes.'
      },
      {
        question: 'Sirve si tengo flacidez en el cuello?',
        answer:
          'Puede evaluarse, pero la indicación cambia si predomina piel laxa en lugar de volumen.'
      },
      {
        question: 'El resultado cambia mi cara?',
        answer:
          'El objetivo es mejorar perfil y proporción, no transformar rasgos ni endurecer el rostro.'
      },
      {
        question: 'Puedo consultar solo por fotos?',
        answer:
          'WhatsApp sirve para orientar el primer paso, pero la indicación se define con valoración profesional.'
      }
    ],
    ctaMessage: 'Hola Aura Clinic, quiero consultar por una valoración de papada y perfil facial.',
    testimonialIds: ['post-tratamiento']
  },
  {
    slug: 'botox',
    path: '/tratamientos/botox',
    category: 'Facial',
    shortTitle: 'Botox',
    title: 'Botox facial',
    cardText: 'Tratamiento para líneas de expresión con criterio médico.',
    intro:
      'Botox indicado con criterio médico para suavizar líneas de expresión y cuidar una gestualidad natural, sin borrar la identidad del rostro.',
    metaDescription:
      'Botox facial en Aura Clinic: qué mejora, indicaciones, cómo se realiza, resultados buscados, cuidados, antes y después, preguntas y valoración.',
    improves: [
      'Líneas de expresión en frente, entrecejo o patas de gallo según evaluación.',
      'Gestos que hacen que el rostro se vea cansado o tenso.',
      'Prevención estética cuando hay indicación profesional.',
      'Armonía facial sin buscar rigidez.'
    ],
    indicatedFor: [
      'Personas que quieren suavizar expresión sin perder naturalidad.',
      'Pacientes que nunca se hicieron Botox y necesitan una explicación clara.',
      'Casos donde hay líneas dinámicas por contracción muscular.',
      'Personas que valoran dosis, zonas y expectativas conservadoras.'
    ],
    procedure: [
      {
        title: 'Evaluación gestual',
        text: 'Se observa cómo se mueve el rostro: frente, entrecejo, ojos y asimetrías.'
      },
      {
        title: 'Marcación de puntos',
        text: 'Se definen zonas y dosis con criterio médico, no como una aplicación estándar.'
      },
      {
        title: 'Aplicación',
        text: 'El procedimiento es puntual y se explican sensaciones esperables antes de comenzar.'
      },
      {
        title: 'Control de evolución',
        text: 'Se indica cuándo revisar el resultado y qué cuidados seguir.'
      }
    ],
    resultGoals: [
      'Suavizar líneas sin congelar la expresión.',
      'Mejorar una mirada o frente que se percibe cansada.',
      'Mantener naturalidad y equilibrio facial.',
      'Trabajar con dosis e indicación adaptadas a cada rostro.'
    ],
    recovery: [
      'Generalmente no requiere reposo importante, pero se dan cuidados puntuales.',
      'Se explican actividades a evitar en las primeras horas según indicación.',
      'La evolución no se juzga apenas termina la sesión.',
      'Cualquier duda posterior se canaliza por seguimiento.'
    ],
    proofTitle: 'Líneas de expresión',
    proofText:
      'Antes y después de tratamiento en líneas faciales. La naturalidad depende de evaluación, dosis y respuesta individual.',
    faqs: [
      {
        question: 'Me va a quedar la cara dura?',
        answer:
          'El objetivo de Aura es suavizar líneas cuidando expresión. La dosis y zonas se definen en evaluación.'
      },
      {
        question: 'Es para primera vez?',
        answer:
          'Si estás considerando Botox por primera vez, la consulta sirve para entender indicación, límites y cuidados.'
      },
      {
        question: 'Qué zonas se tratan?',
        answer:
          'Frente, entrecejo y zona periocular pueden evaluarse, pero no todas las zonas se indican en todos los rostros.'
      },
      {
        question: 'Cuándo consulto si tengo dudas después?',
        answer:
          'Aura mantiene seguimiento por el canal oficial para orientar dudas posteriores al tratamiento.'
      }
    ],
    ctaMessage: 'Hola Aura Clinic, quiero consultar por una valoración de Botox facial.',
    testimonialIds: ['botox-notorio', 'ojeras-cambio']
  },
  {
    slug: 'labios',
    path: '/tratamientos/labios',
    category: 'Facial',
    shortTitle: 'Labios',
    title: 'Labios con ácido hialurónico',
    cardText: 'Ácido hialurónico para definición y armonía labial.',
    intro:
      'Un tratamiento para definir, hidratar visualmente o armonizar labios con una búsqueda clara: que el resultado se vea integrado al rostro.',
    metaDescription:
      'Labios con ácido hialurónico en Aura Clinic: qué mejora, indicaciones, procedimiento, resultados, cuidados, antes y después, preguntas y CTA.',
    improves: [
      'Definición del borde y forma labial.',
      'hidratación visual y aspecto más prolijo.',
      'Asimetrías leves o falta de proporción según evaluación.',
      'Armonía entre labios y resto del rostro.'
    ],
    indicatedFor: [
      'Personas que quieren labios más definidos sin exagerar volumen.',
      'Pacientes que buscan naturalidad y tienen miedo a un resultado artificial.',
      'Casos donde se quiere mejorar forma, proporción o hidratación visual.',
      'Personas que necesitan entender inflamación inicial y cuidados.'
    ],
    procedure: [
      {
        title: 'Análisis de proporción',
        text: 'Se observa forma, volumen, sonrisa, perfil y equilibrio con el rostro.'
      },
      {
        title: 'Definición del objetivo',
        text: 'Se acuerda si se busca perfilado, hidratación visual, volumen sutil o corrección de asimetría.'
      },
      {
        title: 'Aplicación de ácido hialurónico',
        text: 'La técnica y cantidad se ajustan al labio real, evitando resultados desproporcionados.'
      },
      {
        title: 'Cuidados y seguimiento',
        text: 'Se explica inflamación esperable, cuidados y cuándo consultar.'
      }
    ],
    resultGoals: [
      'Lograr labios más definidos y proporcionados.',
      'Mantener un resultado natural al hablar y sonreír.',
      'Evitar volumen innecesario si el rostro no lo pide.',
      'Acompañar la evolución posterior al procedimiento.'
    ],
    recovery: [
      'Puede aparecer inflamación o sensibilidad inicial.',
      'Se indican cuidados de presión, calor, actividad y productos según criterio profesional.',
      'El resultado no se evalúa solo por cómo se ve el primer día.',
      'El seguimiento ayuda a resolver dudas durante la evolución.'
    ],
    proofTitle: 'Definición labial',
    proofText:
      'Antes y después de labios con ácido hialurónico. El objetivo es armonía, no volumen automático.',
    faqs: [
      {
        question: 'Se pueden ver naturales?',
        answer:
          'Si el caso lo permite, se puede buscar definición y proporción sin exagerar volumen.'
      },
      {
        question: 'Es normal que se hinchen?',
        answer:
          'Puede haber inflamación inicial. En la consulta se explican cuidados y evolución esperable.'
      },
      {
        question: 'Puedo pedir solo perfilado?',
        answer:
          'Sí. Se evalúa si conviene perfilado, hidratación visual, volumen sutil o una combinación.'
      },
      {
        question: 'Qué pasa si tengo miedo de que quede artificial?',
        answer:
          'Ese miedo se trabaja en la valoración: se define un objetivo conservador y adaptado al rostro.'
      }
    ],
    ctaMessage: 'Hola Aura Clinic, quiero consultar por una valoración de labios con ácido hialurónico.',
    testimonialIds: ['labios-natural']
  }
];

export function getTreatmentBySlug(slug: string | undefined) {
  return TREATMENT_PAGES.find((treatment) => treatment.slug === slug);
}

export function getTreatmentWhatsAppUrl(treatment: TreatmentPageContent) {
  return buildWhatsAppUrl(treatment.ctaMessage);
}

export function getTestimonialsForTreatment(treatment: TreatmentPageContent) {
  return TESTIMONIAL_MESSAGES.filter((message) => treatment.testimonialIds.includes(message.id));
}
