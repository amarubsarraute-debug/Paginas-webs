export type Category = "Facial" | "Piel" | "Corporal" | "Capilar";

export type Objective =
  | "Rejuvenecer rostro"
  | "Mejorar calidad de piel"
  | "Armonización facial"
  | "Flacidez"
  | "Manchas"
  | "Acné"
  | "Corporal"
  | "Capilar";

export interface Treatment {
  name: string;
  category: Category;
  objectives: Objective[];
  /** 1–2 líneas, visible en el encabezado del acordeón */
  short: string;
  /** Dato rápido: para quién o qué preocupación resuelve */
  idealFor: string;
  /** Dato rápido: zonas anatómicas, versión corta */
  zones: string;
  /** Dato rápido: el resultado que busca */
  objective: string;
  /** Desplegable */
  improves: string;
  recommendedFor: string;
  frequentZones: string;
  howDefined: string;
}

/** Filtros por objetivo. "Capilar" se agrega porque la consulta lo incluye. */
export const objectives: Objective[] = [
  "Rejuvenecer rostro",
  "Mejorar calidad de piel",
  "Armonización facial",
  "Flacidez",
  "Manchas",
  "Acné",
  "Corporal",
  "Capilar",
];

export const medicalNote =
  "Toda indicación se define en consulta, después de evaluar tu historia clínica, tus antecedentes y el resultado que buscás. Ningún tratamiento se realiza sin una valoración médica previa.";

export const treatments: Treatment[] = [
  {
    name: "Toxina botulínica / Botox",
    category: "Facial",
    objectives: ["Rejuvenecer rostro"],
    short:
      "Suaviza arrugas de expresión y relaja gestos marcados sin apagar la naturalidad del rostro.",
    idealFor: "Líneas de expresión y gestos marcados",
    zones: "Frente, entrecejo y patas de gallo",
    objective: "Un rostro más descansado y fresco",
    improves:
      "Disminuye la fuerza de los músculos responsables de las arrugas dinámicas, suaviza las líneas de expresión y ayuda a prevenir marcas más profundas con el tiempo.",
    recommendedFor:
      "Personas que notan líneas al gesticular y buscan un resultado natural, sin perder expresividad.",
    frequentZones:
      "Frente, entrecejo, patas de gallo, sonrisa gingival, cuello y bandas del platisma.",
    howDefined:
      "Se evalúa la forma de gesticular, la simetría facial y el resultado que querés lograr. La idea no es congelar el rostro, sino lograr una apariencia más relajada y equilibrada.",
  },
  {
    name: "Rellenos con ácido hialurónico",
    category: "Facial",
    objectives: ["Armonización facial", "Rejuvenecer rostro"],
    short:
      "Recupera soporte y volumen en puntos precisos, con cantidades medidas y resultado natural.",
    idealFor: "Pérdida de soporte o volumen facial",
    zones: "Pómulos, mentón, surcos y ojeras",
    objective: "Equilibrio y descanso del rostro",
    improves:
      "Repone el volumen que se pierde con el tiempo y redefine contornos, mejorando la proporción y el soporte de la piel.",
    recommendedFor:
      "Quienes notan el rostro cansado, surcos marcados o falta de definición en el contorno.",
    frequentZones:
      "Mentón, pómulos, surcos nasogenianos, ojeras, código de barras y líneas de marioneta.",
    howDefined:
      "Se estudian las proporciones del rostro y los puntos que conviene tratar. Se prioriza un cambio sutil, sin sobrecargar ninguna zona.",
  },
  {
    name: "Labios",
    category: "Facial",
    objectives: ["Armonización facial"],
    short:
      "Define el contorno e hidrata los labios cuidando la proporción con el resto del rostro.",
    idealFor: "Labios deshidratados o sin definición",
    zones: "Labios y contorno labial",
    objective: "Contorno definido y natural",
    improves:
      "Mejora la hidratación, el contorno y la armonía del labio, respetando su forma original.",
    recommendedFor:
      "Personas que buscan definición o hidratación, sin un cambio evidente de tamaño.",
    frequentZones: "Cuerpo del labio, borde bermellón y comisuras.",
    howDefined:
      "Se conversa el resultado deseado y se trabaja con volúmenes pequeños para mantener la naturalidad y la proporción facial.",
  },
  {
    name: "Rinomodelación",
    category: "Facial",
    objectives: ["Armonización facial"],
    short:
      "Ajusta el perfil nasal con ácido hialurónico, sin cirugía y con control médico.",
    idealFor: "Pequeñas irregularidades del perfil nasal",
    zones: "Dorso y punta nasal",
    objective: "Un perfil más armónico",
    improves:
      "Disimula irregularidades del dorso, mejora la proyección de la punta y equilibra el perfil sin pasar por quirófano.",
    recommendedFor:
      "Quienes desean corregir detalles del perfil de forma no quirúrgica y reversible.",
    frequentZones: "Dorso nasal, punta y ángulo nasolabial.",
    howDefined:
      "Se evalúa la estructura de la nariz y su relación con el resto del rostro para definir si es el procedimiento adecuado para tu caso.",
  },
  {
    name: "Armonización facial",
    category: "Facial",
    objectives: ["Armonización facial"],
    short:
      "Trabaja varios puntos del rostro en conjunto, según lo que cada cara necesita.",
    idealFor: "Quienes buscan equilibrio facial global",
    zones: "Tercios superior, medio e inferior",
    objective: "Proporción y armonía del rostro",
    improves:
      "Integra distintos procedimientos para mejorar la proporción y el equilibrio del rostro de manera coherente.",
    recommendedFor:
      "Personas que buscan un resultado integral, más que un retoque puntual.",
    frequentZones: "Mentón, pómulos, surcos, ojeras y líneas de marioneta.",
    howDefined:
      "Se realiza un análisis facial completo y se planifica por etapas, priorizando los cambios que más aportan a tu armonía.",
  },
  {
    name: "Bioestimuladores",
    category: "Piel",
    objectives: ["Flacidez", "Mejorar calidad de piel"],
    short:
      "Activan la producción de colágeno para mejorar firmeza y calidad de piel de forma progresiva.",
    idealFor: "Piel que empieza a perder firmeza",
    zones: "Rostro, cuello y escote",
    objective: "Más firmeza y mejor calidad de piel",
    improves:
      "Estimulan el colágeno propio y mejoran la firmeza, el grosor y la textura de la piel con el paso de las semanas.",
    recommendedFor:
      "Quienes notan flacidez leve o piel apagada y prefieren un cambio gradual y natural.",
    frequentZones: "Rostro, cuello, escote y manos.",
    howDefined:
      "Se evalúa el grado de flacidez y la calidad de la piel para elegir el bioestimulador y el número de sesiones (Profhilo, Facetem, hidroxiapatita de calcio).",
  },
  {
    name: "Skinboosters / NCTF / PDRN",
    category: "Piel",
    objectives: ["Mejorar calidad de piel", "Rejuvenecer rostro"],
    short:
      "Mejoran hidratación, textura y luminosidad cuando la piel se ve cansada.",
    idealFor: "Piel deshidratada, apagada o cansada",
    zones: "Rostro, cuello y escote",
    objective: "Piel hidratada y luminosa",
    improves:
      "Hidratan en profundidad y aportan luminosidad, mejorando la textura y la calidad general de la piel.",
    recommendedFor:
      "Personas con piel deshidratada o sin brillo que buscan revitalizarla sin cambiar sus rasgos.",
    frequentZones: "Rostro, cuello, escote y contorno de ojos.",
    howDefined:
      "Se analiza el estado de la piel para definir el activo y el plan de sesiones (NCTF, PDRN, Skinbooster).",
  },
  {
    name: "Endoláser / Endolifting",
    category: "Corporal",
    objectives: ["Flacidez", "Corporal"],
    short:
      "Busca tensado facial o corporal con una técnica mínimamente invasiva.",
    idealFor: "Flacidez leve a moderada",
    zones: "Cuello, papada y zonas corporales",
    objective: "Tensado progresivo de la piel",
    improves:
      "Aplica calor controlado bajo la piel para estimular colágeno y favorecer un efecto de tensado.",
    recommendedFor:
      "Quienes tienen flacidez leve a moderada y buscan una alternativa menos invasiva que la cirugía.",
    frequentZones: "Cuello, papada, brazos, abdomen y rodillas.",
    howDefined:
      "Se evalúa el tipo y grado de flacidez para confirmar si sos buen candidato y planificar la zona a tratar.",
  },
  {
    name: "Hilos tensores",
    category: "Facial",
    objectives: ["Flacidez"],
    short:
      "Ayudan a reposicionar tejidos cuando hay flacidez leve o moderada.",
    idealFor: "Descenso leve de los tejidos",
    zones: "Tercio medio e inferior del rostro",
    objective: "Reposicionar y sostener",
    improves:
      "Reposicionan suavemente los tejidos y estimulan colágeno en el trayecto del hilo.",
    recommendedFor:
      "Personas con flacidez leve a moderada que buscan un efecto de sostén sin cirugía.",
    frequentZones: "Pómulos, mandíbula, cuello y cejas.",
    howDefined:
      "Se valora la calidad de la piel y el grado de descenso para definir el tipo y la cantidad de hilos.",
  },
  {
    name: "Peeling químico",
    category: "Piel",
    objectives: ["Mejorar calidad de piel", "Manchas", "Acné"],
    short:
      "Renueva las capas superficiales para mejorar textura, manchas y luminosidad.",
    idealFor: "Manchas, textura irregular o marcas de acné",
    zones: "Rostro, cuello y escote",
    objective: "Piel más uniforme y renovada",
    improves:
      "Renueva la piel de forma controlada, mejorando manchas, textura, poros y marcas superficiales.",
    recommendedFor:
      "Quienes tienen manchas, secuelas de acné o una piel con textura irregular.",
    frequentZones: "Rostro, cuello, escote, manos y espalda.",
    howDefined:
      "Se evalúa el tipo de piel y el objetivo para elegir la profundidad del peeling y la cantidad de sesiones.",
  },
  {
    name: "Tratamientos capilares",
    category: "Capilar",
    objectives: ["Capilar"],
    short:
      "Evalúan la caída y la densidad para definir el plan capilar más adecuado.",
    idealFor: "Caída, debilitamiento o pérdida de densidad",
    zones: "Cuero cabelludo",
    objective: "Frenar la caída y mejorar densidad",
    improves:
      "Buscan frenar la caída, fortalecer el folículo y estimular la densidad capilar según el diagnóstico.",
    recommendedFor:
      "Personas que notan más caída, afinamiento del cabello o menor densidad.",
    frequentZones: "Cuero cabelludo, líneas frontales y coronilla.",
    howDefined:
      "Se estudia la causa de la caída para definir entre medicina capilar, plasma o tratamientos de estímulo (plasma capilar, PRP, medicina capilar).",
  },
  {
    name: "Medicina corporal",
    category: "Corporal",
    objectives: ["Corporal", "Flacidez"],
    short:
      "Trabaja tensado, textura o calidad de piel en distintas zonas del cuerpo.",
    idealFor: "Flacidez o textura corporal",
    zones: "Abdomen, brazos, piernas y glúteos",
    objective: "Mejorar firmeza y calidad de piel",
    improves:
      "Mejora la firmeza, la textura y la calidad de la piel en las zonas del cuerpo que más lo necesitan.",
    recommendedFor:
      "Quienes buscan trabajar flacidez o calidad de piel corporal con indicación médica.",
    frequentZones: "Abdomen, brazos, piernas, glúteos y rodillas.",
    howDefined:
      "Se evalúa la zona y el objetivo para indicar la técnica corporal más adecuada para tu caso.",
  },
  {
    name: "Procedimientos puntuales",
    category: "Facial",
    objectives: ["Armonización facial"],
    short:
      "Resuelve detalles puntuales después de una evaluación médica previa.",
    idealFor: "Lunares, orejas rasgadas o sonrisa gingival",
    zones: "Rostro y zonas específicas",
    objective: "Resolver un detalle concreto",
    improves:
      "Aborda situaciones puntuales que afectan la estética o la comodidad, siempre tras evaluarlas.",
    recommendedFor:
      "Personas con una consulta concreta que requiere un procedimiento específico.",
    frequentZones:
      "Lunares, orejas rasgadas y sonrisa gingival (incluye Plasma Pen).",
    howDefined:
      "Se evalúa cada caso de forma individual para confirmar el procedimiento más seguro y adecuado.",
  },
];
