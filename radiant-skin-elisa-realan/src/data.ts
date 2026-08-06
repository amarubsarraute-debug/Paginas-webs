import rejuvenecimientoFrontalAntes from './assets/before-after-enhanced/01_rejuvenecimiento_frontal_antes.jpg';
import rejuvenecimientoFrontalDespues from './assets/before-after-enhanced/01_rejuvenecimiento_frontal_despues.jpg';
import calidadPielPerfilAntes from './assets/before-after-enhanced/02_calidad_piel_perfil_antes.jpg';
import calidadPielPerfilDespues from './assets/before-after-enhanced/02_calidad_piel_perfil_despues.jpg';
import acnePerioralAntes from './assets/before-after-enhanced/03_tratamiento_acne_perioral_antes.jpg';
import acnePerioralDespues from './assets/before-after-enhanced/03_tratamiento_acne_perioral_despues.jpg';
import rejuvenecimientoPerfilAntes from './assets/before-after-enhanced/04_rejuvenecimiento_perfil_antes.jpg';
import rejuvenecimientoPerfilDespues from './assets/before-after-enhanced/04_rejuvenecimiento_perfil_despues.jpg';
import calidadPielFacialAntes from './assets/before-after-enhanced/05_calidad_piel_facial_antes.jpg';
import calidadPielFacialDespues from './assets/before-after-enhanced/05_calidad_piel_facial_despues.jpg';
import elisaPortrait from './assets/home/elisa-realan-profesional.jpg';
import hifuHero from './assets/home/radiantskin-hifu-facial-home.jpg';
import goalFlacidez from './assets/generated/radiant-objectives/01-flacidez-ovalo.jpg';
import goalManchas from './assets/generated/radiant-objectives/02-manchas-tono.jpg';
import goalBarrera from './assets/generated/radiant-objectives/03-barrera-reactiva.jpg';
import goalTextura from './assets/generated/radiant-objectives/04-textura-poros-v2.jpg';
import goalAcne from './assets/generated/radiant-objectives/05-marcas-acne.jpg';
import goalOpacidad from './assets/generated/radiant-objectives/06-piel-apagada.jpg';
import goalPapada from './assets/generated/radiant-objectives/07-papada-mandibula-v2.jpg';
import goalLineas from './assets/generated/radiant-objectives/08-cansancio-periocular.jpg';

/**
 * CONTENIDO EDITABLE
 * ------------------
 * Todo el texto, los datos de contacto y las fotos del sitio viven acá.
 * Para cambiar el sitio no hace falta tocar ningún componente.
 *
 * ⚠️ PENDIENTES DE ELISA (marcados con TODO):
 *   1. Número de WhatsApp real.
 *   2. Fotos reales (retratos, consultorio, antes/después). Las de abajo son
 *      de stock y están sólo para que se vea el diseño terminado.
 *   3. Confirmar direcciones y días de cada consultorio.
 *   4. Testimonios reales (los actuales son representativos, no publicables).
 */

export const brand = {
  name: 'Radiant Skin',
  tagline: 'Piel Radiante',
  professional: 'Elisa Realan',
  role: 'Cosmiatra · Esteticista',
  instagram: 'https://www.instagram.com/radiantskin_pielradiante/',
  instagramHandle: '@radiantskin_pielradiante',
  // TODO: reemplazar por el número real (formato internacional, sin +)
  whatsapp: '59899000000',
  whatsappMessage:
    'Hola Elisa, vengo de la web. Quiero agendar una valoración de piel.',
  email: 'hola@radiantskin.uy', // TODO: confirmar
};

/** Link de WhatsApp con mensaje propio: la charla arranca con contexto. */
export const waFor = (message: string) =>
  `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(message)}`;

export const waLink = waFor(brand.whatsappMessage);

export const nav = [
  {label: 'Elisa', href: '#elisa'},
  {label: 'Objetivos', href: '#objetivos'},
  {label: 'Tratamientos', href: '#tratamientos'},
  {label: 'Resultados', href: '#resultados'},
  {label: 'Consultorios', href: '#consultorios'},
];

export const hero = {
  eyebrow: 'Salinas · Canelones · Montevideo',
  headline: 'Tu piel no necesita más productos.',
  headlineAccent: 'Necesita un plan.',
  lead: 'Elisa Realan lee tu piel antes de tocarla: fototipo, barrera, hidratación, marcas y tiempos reales. Recién ahí se decide la tecnología. HIFU, exosomas, PDRN, mesoterapia o luz pulsada — lo que corresponda, en el orden que corresponda.',
  ctaPrimary: 'Agendar valoración',
  ctaSecondary: 'Ver el método',
  // TODO: reemplazar por retrato real de Elisa en consultorio
  portrait:
    'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=80',
  portraitAlt:
    'Elisa Realan durante una sesión de tratamiento facial en consultorio',
  // TODO: reemplazar por detalle real (cabezal HIFU, aparatología, textura de piel)
  detail:
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80',
  detailAlt: 'Detalle de aparatología facial en el consultorio',
};

export const stats = [
  {value: '10.4K', label: 'Siguen el trabajo en Instagram'},
  {value: '3', label: 'Consultorios: Salinas, Canelones, Montevideo'},
  {value: '6', label: 'Tecnologías faciales activas'},
  {value: '1ª', label: 'Sesión siempre empieza con diagnóstico'},
];

export const partners = ['Dermur', 'ISDIN', 'Medihealth', 'Exosomas', 'PDRN'];

export const insight = {
  label: 'Lectura de piel',
  title: 'Una piel radiante se construye con lectura, ritmo y seguimiento.',
  body: [
    'Cada piel llega con una historia distinta: hábitos, sensibilidad, exposición solar, descanso, rutina actual y objetivos. La primera parte es ordenar esa información para elegir un camino realista.',
    'El plan combina cabina y casa: qué preparar, qué tratar, cuánto esperar entre sesiones y cuándo medir avances. Menos improvisación, más continuidad.',
  ],
  pains: [
    {
      k: '01',
      t: 'Lectura inicial',
      d: 'Se observa fototipo, barrera, textura, manchas, brotes y tolerancia antes de elegir tecnología.',
    },
    {
      k: '02',
      t: 'Ruta de tratamiento',
      d: 'Se define qué va primero, qué se deja para después y qué necesita sostén domiciliario.',
    },
    {
      k: '03',
      t: 'Seguimiento visible',
      d: 'Cada control compara evolución, ajusta frecuencia y mantiene el resultado con una rutina posible.',
    },
  ],
};

/** Perfil de la profesional — autoridad con nombre y cara. */
export const profile = {
  label: 'Quién te atiende',
  name: 'Elisa Realan',
  role: 'Cosmiatra · Esteticista',
  title: 'La misma persona que te diagnostica es la que te trata.',
  body: [
    'No hay derivaciones internas ni un equipo rotativo. La piel que se evalúa el primer día es la que Elisa sigue viendo sesión tras sesión, y eso es lo que permite corregir a tiempo cuando algo no responde como se esperaba.',
    'Formación continua en aparatología facial y en las escuelas francesa y coreana de mesoterapia, con actualización permanente en regeneración celular — exosomas y PDRN — que es donde más se mueve el campo hoy.',
  ],
  credentials: [
    'Cosmiatría — habilitación vigente',
    'Aparatología facial: HIFU e IPL',
    'Mesoterapia francesa y coreana',
    'Regeneración con exosomas y PDRN',
  ],
  portrait: elisaPortrait,
  portraitAlt: 'Retrato de Elisa Realan, cosmiatra',
};

/**
 * Selector de objetivos: el visitante entra por lo que le molesta, no por el
 * nombre técnico del tratamiento. Cada objetivo arma su propio mensaje de
 * WhatsApp, así la conversación empieza con contexto.
 */
export const goals = [
  {
    id: 'flacidez',
    title: 'Se me cayó el óvalo facial',
    treatments:
      'Suele trabajarse con HIFU para estimular colágeno en profundidad, acompañado de mesoterapia francesa para densificar. La indicación final sale de la consulta.',
    image: goalFlacidez,
  },
  {
    id: 'manchas',
    title: 'Tengo manchas y el tono disparejo',
    treatments:
      'Luz pulsada intensa sobre la melanina superficial, más un despigmentante domiciliario y fotoprotección estricta. Sin eso último, las manchas vuelven.',
    image: goalManchas,
  },
  {
    id: 'barrera',
    title: 'Mi piel está irritada y reactiva',
    treatments:
      'Primero se para todo lo agresivo. Exosomas y PDRN para reparar la barrera, rutina reducida a tres pasos y recién después se evalúa cualquier tecnología.',
    image: goalBarrera,
  },
  {
    id: 'textura',
    title: 'Se me notan los poros y la textura',
    treatments:
      'Peeling formulado para tu fototipo y mesoterapia coreana para luminosidad. Es un trabajo de constancia: se mide en meses, no en sesiones sueltas.',
    image: goalTextura,
  },
  {
    id: 'acne',
    title: 'Arrastro marcas de acné',
    treatments:
      'Se separa lo activo de la secuela. Control del brote primero; después regeneración con PDRN y peelings progresivos sobre la marca.',
    image: goalAcne,
  },
  {
    id: 'opacidad',
    title: 'La veo apagada y sin luz',
    treatments:
      'Limpieza profunda para ordenar, mesoterapia coreana para luminosidad y una rutina domiciliaria corta que sostenga el resultado entre sesiones.',
    image: goalOpacidad,
  },
  {
    id: 'papada',
    title: 'Quiero marcar más la mandíbula',
    treatments:
      'Cuando el problema es papada o pérdida de contorno, se evalúa HIFU en línea mandibular y cuello. Si hay grasa, flacidez o retención, el plan cambia.',
    image: goalPapada,
  },
  {
    id: 'lineas',
    title: 'Me veo cansada aunque duerma',
    treatments:
      'Se revisa hidratación, textura fina, frente, periocular y rutina. Puede combinar mesoterapia, regeneración y ajustes domiciliarios antes de pensar en algo más invasivo.',
    image: goalLineas,
  },
];

/** Caso destacado con comparador arrastrable antes/después. */
export const featuredCase = {
  label: 'Caso destacado',
  name: 'Flacidez de óvalo facial',
  protocol: 'HIFU + 3 sesiones de mesoterapia francesa',
  duration: '90 días',
  note: 'Misma luz, mismo encuadre y sin retoque. Publicado con consentimiento firmado.',
  // TODO: reemplazar por el antes/después real de una paciente
  before:
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
  after:
    'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=900&q=80',
};

/** Casos reales para comparador antes/despues. */
export const beforeAfterCases = [
  {
    id: 'calidad-piel-facial',
    label: 'Caso destacado',
    name: 'Calidad de piel facial',
    protocol: 'Tratamiento facial para luminosidad y textura',
    duration: 'Rostro completo',
    aspectRatio: '1 / 1',
    note: 'Caso cuadrado ideal para mostrar el cambio global de tono, textura y frescura.',
    before: calidadPielFacialAntes,
    after: calidadPielFacialDespues,
  },
  {
    id: 'rejuvenecimiento-frontal',
    label: 'Lectura de detalle',
    name: 'Rejuvenecimiento frontal',
    protocol: 'Plan facial regenerativo y trabajo de textura',
    duration: 'Registro frontal',
    aspectRatio: '3200 / 3806',
    note: 'Comparacion con el mismo encuadre para ver textura, luminosidad y descanso visual.',
    before: rejuvenecimientoFrontalAntes,
    after: rejuvenecimientoFrontalDespues,
  },
  {
    id: 'calidad-piel-perfil',
    label: 'Calidad de piel',
    name: 'Calidad de piel en perfil',
    protocol: 'Trabajo progresivo de piel y firmeza',
    duration: 'Perfil',
    aspectRatio: '3200 / 3734',
    note: 'Caso pensado para mostrar cambios de textura, tono y lectura lateral del rostro.',
    before: calidadPielPerfilAntes,
    after: calidadPielPerfilDespues,
  },
  {
    id: 'acne-perioral',
    label: 'Marcas y brotes',
    name: 'Tratamiento de acne perioral',
    protocol: 'Control de brote, reparacion y seguimiento',
    duration: 'Zona perioral',
    aspectRatio: '3200 / 3490',
    note: 'Se observa la evolucion de inflamacion, marcas y calidad de barrera cutanea.',
    before: acnePerioralAntes,
    after: acnePerioralDespues,
  },
  {
    id: 'rejuvenecimiento-perfil',
    label: 'Rejuvenecimiento',
    name: 'Rejuvenecimiento en perfil',
    protocol: 'Plan combinado para piel, firmeza y contorno',
    duration: 'Perfil extendido',
    aspectRatio: '3200 / 4800',
    note: 'Comparacion lateral para entender contorno, soporte y calidad general de piel.',
    before: rejuvenecimientoPerfilAntes,
    after: rejuvenecimientoPerfilDespues,
  },
];

export const faq = [
  {
    q: '¿Cuánto sale la valoración?',
    a: 'Se cobra como consulta y se descuenta del primer tratamiento si decidís avanzar. El monto te lo paso por WhatsApp antes de agendar, así no hay sorpresas.',
  },
  {
    q: '¿Duele el HIFU?',
    a: 'Se siente calor y algún pinchazo puntual en las zonas de hueso. Es tolerable sin anestesia en la mayoría de los casos, y se ajusta la potencia según cómo lo lleves durante la sesión.',
  },
  {
    q: '¿Cuándo se ven los resultados?',
    a: 'Depende del tratamiento. La mesoterapia y la limpieza se notan a los días. El HIFU trabaja sobre colágeno propio: el pico está entre los 60 y 90 días. La luz pulsada necesita la serie completa.',
  },
  {
    q: '¿Puedo hacerme tratamientos en verano?',
    a: 'Casi todos sí, con fotoprotección estricta. La luz pulsada es la excepción: no se hace sobre piel bronceada, hay que esperar. Te lo voy a decir aunque signifique postergar la sesión.',
  },
  {
    q: '¿Tengo que cambiar todos mis productos?',
    a: 'No. Lo primero es revisar qué de lo que ya tenés sirve. En general se saca más de lo que se agrega, y se compra sólo lo que falta de verdad.',
  },
  {
    q: '¿Atendés en los tres consultorios todas las semanas?',
    a: 'Sí, con días fijos en cada uno: Salinas, Canelones y Montevideo. Coordinamos por WhatsApp según cuál te queda mejor.',
  },
];

export const method = {
  label: 'El método',
  title: 'La tecnología no manda. Manda lo que tu piel tolera.',
  lead: 'La consulta baja a tierra qué conviene hacer ahora, qué conviene preparar y qué no tiene sentido forzar. Salís con un orden claro antes de comprar sesiones.',
  points: [
    {
      t: 'Se separa deseo de indicación',
      d: 'Mandíbula, manchas, textura, brote o cansancio visual no se resuelven igual. Primero se define qué cambio querés ver y qué lo está frenando.',
    },
    {
      t: 'Se prepara la piel si hace falta',
      d: 'Si la barrera está reactiva o hay inflamación activa, el plan empieza por ordenar eso. La aparatología entra cuando suma, no cuando apura.',
    },
    {
      t: 'Se agenda con objetivo y control',
      d: 'Cada sesión queda asociada a una intención concreta, un plazo razonable y una rutina mínima para sostener lo que se hace en cabina.',
    },
  ],
  image: hifuHero,
  imageAlt: 'Elisa Realan realizando un tratamiento HIFU facial',
};

export const treatments = [
  {
    n: '01',
    name: 'HIFU',
    claim: 'Tensado en profundidad, sin cirugía',
    body: 'Ultrasonido focalizado que trabaja sobre el SMAS y estimula colágeno propio. Para óvalo facial, papada y flacidez leve a moderada. Resultado progresivo entre los 60 y 90 días.',
    tag: 'Firmeza',
  },
  {
    n: '02',
    name: 'Exosomas + PDRN',
    claim: 'Regeneración celular de nueva generación',
    body: 'Señalización celular y polinucleótidos para reparar barrera, calmar rojeces y mejorar calidad de piel. Ideal después de láser, en piel reactiva o post-acné.',
    tag: 'Regeneración',
  },
  {
    n: '03',
    name: 'Mesoterapia francesa y coreana',
    claim: 'Activos donde realmente hacen falta',
    body: 'Microinyecciones de vitaminas, aminoácidos y ácido hialurónico no reticulado. La escuela francesa nutre y densifica; la coreana busca luminosidad y textura.',
    tag: 'Luminosidad',
  },
  {
    n: '04',
    name: 'Luz pulsada intensa (IPL)',
    claim: 'Manchas, rojeces y tono disparejo',
    body: 'Trabaja sobre melanina y vasos superficiales. Unifica el tono, atenúa daño solar y mejora la piel con rosácea leve. Requiere protocolo de fotoprotección estricto.',
    tag: 'Tono',
  },
  {
    n: '05',
    name: 'Limpieza profunda + peeling',
    claim: 'La base sobre la que se construye todo',
    body: 'Extracción, exfoliación química a medida y calma posterior. Es la sesión que ordena la piel antes de cualquier tecnología. Casi nunca es opcional.',
    tag: 'Base',
  },
  {
    n: '06',
    name: 'Rutina domiciliaria',
    claim: 'El 70% del resultado pasa en tu baño',
    body: 'Selección corta de productos con marcas de respaldo clínico —ISDIN, Dermur, Medihealth— ajustada a tu piel, tu presupuesto y el tiempo real que tenés.',
    tag: 'Sostén',
  },
];

export const process = [
  {
    n: '01',
    t: 'Valoración',
    d: 'Cuarenta minutos de lectura de piel y conversación honesta. Salís sabiendo qué tenés, qué se puede mejorar y qué no.',
    time: '40 min',
  },
  {
    n: '02',
    t: 'Plan escrito',
    d: 'Tratamientos, cantidad de sesiones, intervalos, costo total y rutina de casa. Te lo llevás por escrito antes de decidir.',
    time: 'Mismo día',
  },
  {
    n: '03',
    t: 'Sesiones',
    d: 'Se ejecuta la secuencia. Registro fotográfico en cada visita, con la misma luz y el mismo encuadre.',
    time: 'Según plan',
  },
  {
    n: '04',
    t: 'Mantenimiento',
    d: 'Cuando llegamos al objetivo, bajamos la frecuencia. El plan de sostén es más barato que el de corrección.',
    time: 'Cada 3–6 meses',
  },
];

export const results = [
  {
    title: 'Flacidez de óvalo facial',
    protocol: 'HIFU + mesoterapia francesa',
    duration: '90 días · 1 sesión de HIFU + 3 de meso',
    // TODO: reemplazar por antes/después reales con consentimiento firmado
    image:
      'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Manchas por daño solar',
    protocol: 'IPL + despigmentante domiciliario',
    duration: '120 días · 4 sesiones',
    image:
      'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Barrera dañada post-ácidos',
    protocol: 'Exosomas + PDRN, rutina reducida a 3 pasos',
    duration: '45 días · 3 sesiones',
    image:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Textura y poros dilatados',
    protocol: 'Peeling a medida + mesoterapia coreana',
    duration: '60 días · 4 sesiones',
    image:
      'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&w=900&q=80',
  },
];

export const session = {
  label: 'Cómo se decide',
  title: 'No venís a comprar una sesión.',
  steps: [
    {
      k: 'Paso 01',
      t: 'Primero se entiende qué querés ver distinto',
      d: 'No alcanza con decir "quiero mejorar la piel". Se separa flacidez, textura, manchas, acné, cansancio visual y hábitos que están sosteniendo el problema.',
    },
    {
      k: 'Paso 02',
      t: 'Después se mira si la piel está lista',
      d: 'Si la barrera está irritada, si hay brote activo o si venís usando ácidos de más, no se fuerza aparatología. Primero se ordena la base.',
    },
    {
      k: 'Paso 03',
      t: 'La tecnología entra con una razón',
      d: 'HIFU para soporte, IPL para tono, mesoterapia para luminosidad o PDRN para reparar. Cada indicación tiene un objetivo y una fecha de control.',
    },
    {
      k: 'Paso 04',
      t: 'Te llevás una ruta, no una promesa',
      d: 'Qué se hace primero, cuántas sesiones tendría sentido probar, cuándo medir resultado y qué rutina mínima sostiene lo que se consiga en cabina.',
    },
  ],
};

export const marquee = [
  'HIFU',
  'Exosomas',
  'PDRN',
  'Mesoterapia francesa',
  'Luz pulsada',
  'Mesoterapia coreana',
  'Peeling a medida',
];

// TODO: reemplazar por testimonios reales autorizados por las pacientes.
export const testimonials = [
  {
    quote:
      'Llegué con ocho productos y me fui con tres. En dos meses la piel se me calmó más que en dos años comprando cosas por Instagram.',
    name: 'Valentina R.',
    detail: 'Barrera dañada · Montevideo',
  },
  {
    quote:
      'Lo que más valoro es que me dijo qué no se podía arreglar con estética. Nunca nadie me había dicho que no.',
    name: 'Carolina M.',
    detail: 'HIFU · Canelones',
  },
  {
    quote:
      'Me pasó el plan por escrito con las cuatro sesiones y el precio total desde el primer día. Sin sorpresas después.',
    name: 'Fernanda L.',
    detail: 'IPL · Salinas',
  },
];

export const locations = [
  {
    city: 'Salinas',
    detail: 'Costa de Oro, Canelones', // TODO: dirección exacta
    days: 'Lunes y miércoles',
  },
  {
    city: 'Canelones',
    detail: 'Ciudad de Canelones', // TODO: dirección exacta
    days: 'Martes y jueves',
  },
  {
    city: 'Montevideo',
    detail: 'Zona centro', // TODO: dirección exacta
    days: 'Viernes y sábados',
  },
];

export const finalCta = {
  label: 'Agenda',
  title: 'Empecemos por saber qué piel tenés.',
  body: 'La valoración dura cuarenta minutos y termina con un plan escrito. Si no hay nada que hacer con estética, también te lo voy a decir.',
  cta: 'Escribir por WhatsApp',
  // TODO: reemplazar por foto real
  image:
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1400&q=80',
};

export const legal = [
  {label: 'Política de privacidad', href: '#privacidad'},
  {label: 'Términos', href: '#terminos'},
];
