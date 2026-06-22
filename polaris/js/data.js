// ═══════════════════════════════════════════
// DATA — constantes de configuración y contenido
// ═══════════════════════════════════════════

const HABITS = [
  { id: 'wake', name: 'Levantarme a horario', xp: 10, attr: 'disciplina' },
  { id: 'write', name: 'Escribir', xp: 10, attr: 'mente' },
  { id: 'biz', name: 'Negocio', xp: 25, attr: 'negocio' },
  { id: 'body', name: 'Cuerpo / Entrenamiento', xp: 20, attr: 'cuerpo' },
  { id: 'noweed', name: 'No weed', xp: 20, attr: 'autocontrol' },
  { id: 'nofap', name: 'No fap', xp: 20, attr: 'autocontrol' },
  { id: 'sleep', name: 'Acostarme a horario', xp: 10, attr: 'disciplina' },
];

const LEVELS = [
  { name: 'Despierto', icon: '😤', xp: 0 },
  { name: 'En Construcción', icon: '🔨', xp: 500 },
  { name: 'Disciplinado', icon: '⚔️', xp: 1000 },
  { name: 'Guerrero', icon: '🔥', xp: 1500 },
  { name: 'Imparable', icon: '⚡', xp: 2000 },
  { name: 'Constructor', icon: '🏗️', xp: 2500 },
  { name: 'Dominante', icon: '👑', xp: 3000 },
  { name: 'Polaris', icon: '⭐', xp: 3500 },
];

const IDENTITY_PHRASES = [
  "No necesitás certeza. Necesitás empezar.",
  "Tu yo ideal no negocia con la duda.",
  "Hoy se gana con una prueba, no con motivación.",
  "La acción pequeña crea certeza.",
  "No falles dos días seguidos.",
  "La certeza aparece después de actuar, no antes.",
  "Convertí la evitación en XP.",
  "El objetivo no es terminar. Es romper la evitación.",
  "Tu yo del futuro te lo va a agradecer.",
  "Ese ticket de lotería no se raspa solo.",
  "Volvé a Polaris.",
  "No desaparezcas de vos.",
  "Cada acción es un mensaje a tu yo futuro: estoy construyendo.",
  "El dolor de hoy es el orgullo de mañana.",
  "No hay momento ideal. Hay decisión.",
];

const SHADOW_RESPONSES = {
  fear: {
    'Rechazo': 'Estás confundiendo rechazo con identidad. Que alguien no responda no significa que no servís. Significa que estás jugando el juego comercial. Tu trabajo ahora no es conseguir aprobación. Tu trabajo es hacer una repetición de valentía.',
    'Fracaso': 'No necesitás garantizar que salga perfecto. Necesitás generar evidencia. La certeza aparece después de actuar, no antes. Cada intento que terminas es una repetición que construye identidad.',
    'Exposición': 'La exposición es el precio de existir en el juego. Quedarte invisible no te protege — te mata lentamente. El miedo a que te vean es el miedo a importar.',
    'No ser suficiente': 'Eso no es un hecho, es una historia que te estás contando. La única forma de probar que sos suficiente es actuando. No pensando. Actuando.',
    'Perder tiempo': 'Estás perdiendo más tiempo pensando que si simplemente lo hicieras. 10 minutos de acción imperfecta siempre valen más que 2 horas de preparación mental.',
    'Confirmar que estoy atrasado': 'Ya estás atrasado. La pregunta es si dentro de una semana vas a estar más atrasado o no. La acción de ahora es la única respuesta posible.',
    'Comprometerme de verdad': 'El compromiso real se construye con acción pequeña repetida. No tenés que comprometerte con todo. Comprometete con los próximos 10 minutos.',
    'Compararme con otros': 'La comparación es una trampa de ego. Ellos no tienen tu camino. Vos no tenés el de ellos. La única carrera que importa es la de quien eras ayer contra quien sos hoy.',
  },
  certainty: {
    'No sé si va a funcionar': 'Nadie sabe. Nunca. La certeza no aparece antes de actuar — aparece después. Cada vez que actuaste sin certeza y algo funcionó, lo olvidaste. Recordás lo que salió mal. Sesgás hacia el miedo.',
    'No sé cómo empezar': 'El problema no es capacidad, es falta de siguiente paso. Reducí la tarea hasta que sea imposible no empezar. ¿Cuál es la acción más pequeña posible? Hacé solo eso.',
    'No sé si soy capaz': 'No lo vas a saber hasta que lo hagas. Y aunque no salga perfecto, vas a saber más que antes. La capacidad no precede a la acción. La acompaña.',
    'No sé si va a salir bien': 'Probablemente no salga perfecto. Eso está bien. El objetivo no es perfección — es progreso. Una versión mala entregada vale infinitamente más que una perfecta que nunca existió.',
    'No sé si vale la pena': 'Si no lo hacés, definitivamente no vale la pena. Si lo hacés, al menos tenés información real. La única forma de saber si vale la pena es hacer el trabajo.',
    'No sé si me van a responder': 'Puede que no. Y puede que sí. Pero si no mandás, la respuesta ya es no. La peor respuesta posible ya la tenés garantizada si no actuás.',
    'No sé si tengo energía': 'La energía aparece con el movimiento, no antes. Empezá 5 minutos. Si de verdad no tenés energía, vas a poder parar. Pero la mayoría de las veces el cuerpo se activa.',
    'No sé si lo voy a hacer perfecto': 'Perfecto es el enemigo de hecho. Hecho gana siempre. Tu yo ideal no es perfecto — es consistente.',
  },
  emotion: {
    'Confusión': 'La confusión baja cuando convertís la nube mental en una acción física de 10 minutos. No pensés — hacé. La claridad viene del movimiento, no del análisis.',
    'Ansiedad': 'La ansiedad es energía sin dirección. Dásela. Convertí ese estado en combustible para una sola acción pequeña. El cuerpo no sabe distinguir ansiedad de emoción — vos podés reencuadrarlo.',
    'Duda': 'La duda es normal. Actuar con duda es valentía. La certeza es para los que esperan — vos estás construyendo. Esas dos cosas no se pueden hacer al mismo tiempo.',
    'Miedo': 'El miedo confirma que esto importa. Si no te importara, no tendrías miedo. Usá eso. El miedo señala la dirección de crecimiento.',
    'Vergüenza': 'La vergüenza vive en la cabeza, no en la realidad. Hacé la cosa vergonzosa. Después mirá si era tan grave. Casi nunca lo es.',
    'Pereza': 'La pereza es el cuerpo tratando de conservar energía para algo "más seguro". Decile al cuerpo que esto es seguro. Empezá con 5 minutos y dejá que el sistema arranque solo.',
    'Frustración': 'La frustración aparece cuando tenés expectativas altas y avance lento. Bajá el foco al proceso, no al resultado. ¿Qué podés hacer bien en los próximos 10 minutos?',
    'Presión': 'La presión es real. Y también es energía. Canalizala. Un paso a la vez. No tenés que resolver todo — tenés que hacer lo siguiente.',
  }
};
