/* ============================================================
   FORJA · data.js
   Contenido semilla (editable desde Ajustes). Todo esto sale
   de las notas de la clase + el documento de reinvención.
   ============================================================ */

const FORJA_NAME = "FORJA"; // cambiá esto si querés otro nombre
const FORJA_TOTAL_DAYS = 90;

// Identidad: la frase ancla que se ve al abrir
const SEED_IDENTITY =
  "Soy CEO de Sexólogos UP, experto en infoproductos, campeón de MMA y el proveedor de mi familia.";

// Declaración larga de identidad (se muestra en Creencias / Ajustes)
const SEED_IDENTITY_LONG = [
  "Super trabajador. Empresario, CEO de Sexólogos UP.",
  "Experto en marketing, ventas y sistemas sobre infoproductos. Gano más de 10k todos los meses.",
  "El mejor peleador de MMA de las 125 y 135 lb. Un finalizador espectacular.",
  "La persona a la que mi familia acude cuando tiene un problema, porque sabe que lo voy a resolver.",
  "El protector y proveedor de mi familia. Una inspiración para los que vienen atrás y admirado por los que están adelante."
];

// Qué haría mi yo ideal
const SEED_IDEAL = [
  "FE absoluta de que el trabajo que estoy haciendo me va a llevar a la vida que quiero. Por eso no procrastino.",
  "Tomarme el diario extremadamente en serio. Leerlo una y otra y otra vez hasta cambiar todas y cada una de mis creencias.",
  "Evitar distracciones y construir.",
  "Visualizar, estar agradecido y ser optimista."
];

// Creencias — "Soy el tipo de persona que..." y declaraciones de poder.
// Estas son las que vas a escuchar/leer cada mañana.
const SEED_BELIEFS = [
  "Soy dios creador. El reino de los cielos está dentro de mí. Lo que tengo en la mente es un plano para llevarlo a la realidad: todo lo que imagino lo puedo crear en el mundo físico. Por eso dios me dio la imaginación.",
  "Trabajo sabiendo que ese trabajo me va a llevar a ganar 10-15k al mes. Trabajo en estado de FE.",
  "Ganar dinero es súper fácil. Está lleno de oportunidades y tengo todo para lograrlo súper rápido. En 3 meses puedo estar ganando más de 5 mil USD limpios con los infoproductos.",
  "Mi plan me lo dio dios: hacer páginas web para solventar mis gastos mientras formo el negocio de infoproductos. En 3 meses ya está hecho. Es todo lo que necesito.",
  "Puedo hacer todo con la IA. Todo mi equipo y todo lo que necesito lo puede hacer la IA. Construyo sistemas para todo.",
  "Soy una persona que hace lo que dice que va a hacer. Prefiero la muerte a no hacer lo que dije.",
  "Funciono bien bajo presión y tomo riesgos. El riesgo más grande para mí es ser normal, promedio, mediocre. Quedarme en la vieja versión de mí. Ese riesgo es enormemente más grande que cualquier otro.",
  "Hago las cosas difíciles, porque todo lo bueno está al otro lado del dolor.",
  "Puedo cambiar mi realidad simplemente cambiando la forma en que la veo. Si pude crear esta realidad, puedo crear otra mejor. Todo es mi responsabilidad, y eso es genial.",
  "Que algunas veces le dé al sueño y duerma 4h no está mal cuando persigo algo más grande. No es el fin del mundo. No me voy a morir."
];

// El self-talk que aparece al terminar el deep work (Momento 2)
const SEED_SELFTALK =
  "Ese soy yo. Acabo de hacer lo que cada célula de mi cuerpo no quería hacer y lo hice igual. Soy el hombre que trabaja en su negocio. Soy un ganador.";

// El Buzón: meta sellada + inputs que sí controlo
const SEED_GOAL = {
  sealed: "12-15k USD/mes facturado · 5-7k limpios a mi bolsillo",
  // El razonamiento del buzón (la matemática que lo hace irracional fallar)
  math: "50 compradores a $297 = meta cubierta. Si meto 500 personas a un grupo con mi marca personal y mis sistemas de marketing y ventas, sería irracional no vender 50.",
  // Inputs que SÍ controlo (la pregunta es: ¿cuánto input para que sea irrazonable fallar?)
  inputs: [
    { label: "Grabar y mandar Looms", target: 5, unit: "por día" },
    { label: "Páginas web avanzadas", target: 1, unit: "por semana" },
    { label: "Contenido marca personal", target: 1, unit: "por día" }
  ]
};

// Rutina del día (orden de importancia + bloques)
const SEED_ROUTINE = {
  priority: ["Dormir", "Deep work (tarea más importante)", "Entrenar", "Trabajo ligero y todo lo demás"],
  blocks: [
    { from: "06:00", to: "11:00", what: "DEEP WORK — la tarea más difícil. Despiadado: nada de celular, YouTube ni nada que no sea esa tarea." },
    { from: "11:00", to: "13:00", what: "Entrenar y comer." },
    { from: "13:00", to: "21:00", what: "Trabajo más ligero." },
    { from: "21:00", to: "06:00", what: "Dormir. Llegar mentalmente y físicamente reventado: eso es el indicador de que lo hice bien." }
  ]
};

// Emociones para el Momento 3
const SEED_EMOTIONS = [
  { name: "Frustración", serves: false, advice: "No te sirve. Sentila, soltala por completo y volvé al trabajo." },
  { name: "Ira", serves: true, advice: "Puede ser increíblemente productiva. Canalizála en terminar lo que postergaste. Después soltala." },
  { name: "Miedo", serves: false, advice: "El miedo no es real. Solo hay incomodidad y peligro físico. No estás en peligro: es incomodidad, y la incomodidad significa que vas a crecer." },
  { name: "Vergüenza / asco de dónde estoy", serves: true, advice: "Usá ese asco para impulsarte hacia adelante, antes de acostumbrarte a la mediocridad." },
  { name: "Ganas de distraerme", serves: false, advice: "Es dopamina barata pidiendo pista. No la alimentes. Volvé al input." }
];

// Recordatorio de cómo tomar los fracasos (se muestra en Emociones/90 días)
const SEED_FAILURE = [
  "No existe el fracaso. Solo sumé más XP. Acabo de subir de nivel.",
  "Dame más. Si lancé el negocio y falló, no es nada: le digo al universo DAME MÁS. No hay algo mal, son pruebas que me da dios para que logre mi objetivo."
];

// DECISIÓN — mapa de transformación: vieja → presente → futuro.
// La vieja sale de la pizarra de Miro (rasgos del Amaru que dejo atrás).
// El futuro sale del "Yo ideal" + creencias. El presente lo escribe él.
const SEED_DECISION = {
  intro:
    "Lo que vivo en mi presente es el reflejo de las creencias y acciones de mi versión pasada. Hoy soy las decisiones de mi yo del pasado. Mi trabajo en el presente es pensar y actuar como mi yo ideal, para que en el futuro se refleje en mi mundo físico lo que ya tengo adentro. Ser él hasta serlo — como si un genio me hubiera mostrado mi futuro, 100% garantizado.",
  vieja: [
    "Acciono según cómo me siento: si no tengo ganas, no trabajo.",
    "Nada de fe, miedo en todo.",
    "Veo la abundancia como algo complicado; ganar online casi imposible.",
    "Mis amigos son NPC que fuman weed. Fumo weed.",
    "Inseguro de mí mismo, de mis habilidades y mi apariencia.",
    "Creo que mucho no depende de mí: si la suerte no entra, ya la cagué."
  ],
  presente: [],
  futuro: [
    "Tengo fe absoluta de que mi trabajo me lleva a la vida que quiero. Por eso no procrastino.",
    "Trabajo en estado de fe y construyo sistemas con IA para todo.",
    "Gano 10-15k al mes con infoproductos. La abundancia es fácil.",
    "Hago lo que digo. Prefiero la muerte a no cumplir mi palabra.",
    "Entreno y soy el mejor peleador. Paciencia, resiliencia, sacrificio."
  ]
};

// ROADMAP — los hitos de Amaru en orden (de las notas)
const SEED_ROADMAP = [
  { text: "Hacer +500 USD con páginas web" },
  { text: "Cerrar a Patricio" },
  { text: "Hacer 1.000 USD con páginas web" },
  { text: "Comprarme una moto" },
  { text: "Empezar a entrenar" },
  { text: "Facturar 5.000 USD con Patricio" },
  { text: "Pagar para escalar el negocio" },
  { text: "Peleas amateur" },
  { text: "Escalar a 10k todos los meses y 3.000 para mi bolsillo" },
  { text: "Pasarme a profesional" },
  { text: "Cerrar otros clientes y consolidar Sexólogos UP" },
  { text: "Título de SFH" }
];

// Export global
window.FORJA_DATA = {
  name: FORJA_NAME,
  totalDays: FORJA_TOTAL_DAYS,
  identity: SEED_IDENTITY,
  identityLong: SEED_IDENTITY_LONG,
  ideal: SEED_IDEAL,
  beliefs: SEED_BELIEFS,
  selfTalk: SEED_SELFTALK,
  goal: SEED_GOAL,
  routine: SEED_ROUTINE,
  emotions: SEED_EMOTIONS,
  failure: SEED_FAILURE,
  decision: SEED_DECISION,
  roadmap: SEED_ROADMAP
};
