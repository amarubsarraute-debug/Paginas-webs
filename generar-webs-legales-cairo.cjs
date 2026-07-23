const fs = require('fs');
const path = require('path');

const root = __dirname;
const reference = path.join(root, 'estudio-juridico-cairo-duaso');
const cache = '20260712z';

const sites = [
  {
    slug: 'estudio-dr-claudio-rodriguez-la-cruz',
    title: 'Dr. Claudio Rodriguez La Cruz | Abogado penal en Maldonado',
    description: 'Defensa penal, accidentes de transito, derecho laboral y urgencias legales 24 horas en Maldonado. Mas de 20 anos de trayectoria.',
    fullName: 'Dr. Claudio Rodriguez La Cruz',
    brandStrong: 'Dr. Claudio',
    brandSmall: 'Rodriguez La Cruz',
    legalType: 'Estudio Juridico',
    images: {
      og: 'assets/img/claudio-rodriguez.webp',
      practice: 'assets/img/legal-office-neutral.png',
      review: 'assets/img/claudio-rodriguez.webp',
      contact: 'assets/img/contact-justice.webp',
    },
    locationLabel: 'Maldonado Centro',
    address: 'Roman Guerra, Maldonado',
    mapQuery: 'Estudio Dr. Claudio Rodriguez La Cruz Maldonado',
    primaryPhone: { display: '099 813 012', e164: '+59899813012' },
    email: 'crodriguezlacruz@gmail.com',
    socials: [
      { label: 'LinkedIn', url: 'https://uy.linkedin.com/in/rodriguezlacruz', icon: 'linkedin' },
    ],
    hours: 'Urgencias legales 24 horas',
    whatsappNumber: '59899813012',
    whatsappText: 'Hola, necesito realizar una consulta legal con el Dr. Claudio Rodriguez La Cruz.',
    heroKicker: 'Mas de 20 anos de trayectoria',
    heroTitle: ['Defensa legal clara,', 'cuando mas importa'],
    heroLead: 'Defensa penal, accidentes de transito, derecho laboral y urgencias legales con atencion directa en Maldonado.',
    practiceCtaTitle: 'Necesitas asistencia legal inmediata?',
    practiceCtaText: 'Comunicate directamente, las 24 horas.',
    actionLabel: 'Consultar ahora',
    services: [
      ['Defensa penal', 'Asistencia para situaciones que requieren respuesta juridica inmediata.', 'scale'],
      ['Accidentes de transito', 'Orientacion y acompanamiento para ordenar los pasos posteriores.', 'car-front'],
      ['Derecho laboral', 'Analisis de conflictos laborales y alternativas posibles.', 'briefcase-business'],
      ['Urgencias 24 horas', 'Contacto directo ante asuntos que no pueden esperar.', 'phone-call'],
      ['Asesoramiento juridico', 'Explicacion clara antes de tomar decisiones relevantes.', 'book-open-check'],
      ['Seguimiento del caso', 'Comunicacion responsable durante cada etapa.', 'shield-check'],
    ],
    situationsIntro: 'En una urgencia legal, lo importante es explicar que ocurrio y recibir una orientacion inicial clara.',
    situations: [
      'Necesitas asistencia por una situacion penal o una citacion urgente.',
      'Tuviste un accidente de transito y queres saber como avanzar.',
      'Tenes un conflicto laboral y necesitas evaluar alternativas.',
      'Recibiste documentacion legal y queres entender su alcance.',
      'Buscas representacion para gestionar o resolver un asunto juridico.',
      'Necesitas comunicarte con un abogado fuera del horario habitual.',
    ],
    situationsAction: 'Las urgencias legales se atienden durante las 24 horas.',
    aboutTitle: 'Experiencia penal y asesoramiento juridico con atencion directa',
    aboutText: 'El Dr. Claudio Rodriguez La Cruz trabaja con un enfoque claro, responsable y cercano para acompanar situaciones legales sensibles. La prioridad es ordenar la informacion, explicar los proximos pasos y sostener una comunicacion directa durante la gestion.',
    values: [
      ['Atencion directa', 'Contacto claro con el profesional que analiza la situacion.', 'user-round'],
      ['Respuesta inmediata', 'Disponibilidad para urgencias legales y consultas prioritarias.', 'phone-call'],
      ['Criterio profesional', 'Analisis responsable para avanzar con mayor seguridad.', 'badge-check'],
    ],
    ratingNumber: '20+',
    ratingLabel: 'anos de<br />trayectoria',
    ratingTitle: 'Experiencia dedicada al derecho penal',
    reviewKicker: 'Experiencias reales',
    reviewTitle: 'Lo que destacan quienes consultaron al estudio',
    reviewsLayout: 'grid',
    reviews: [
      ['Altamente recomendado. Muy amable y con asesoramiento completo 24 horas.', 'Diego Lopez'],
      ['Es un placer visitar el estudio del Dr. Rodriguez. Un apoyo de 10 puntos, muy recomendable. Maldonado cuenta con un abogado muy profesional.', 'A G'],
      ['Excelente profesional y mejor consejero. Muy recomendable.', 'Ademir Gonzalez'],
      ['Muy buena atencion y disposicion.', 'Cecilio Daniel Scarpa Rocha'],
      ['Excelente atencion y muy dispuesto a solucionar todos los problemas.', 'Williams Ferreira'],
      ['Excelente profesional.', 'Fernanda Gonzalez'],
      ['Muy eficiente y humano.', 'Eduardo Cuadrado'],
      ['Muy comprometido con su trabajo.', 'Migue Fernandez'],
    ],
    faqs: [
      ['Como puedo coordinar una consulta?', 'Podes llamar o escribir por WhatsApp al 099 813 012. Si es una urgencia, indica brevemente que ocurrio.'],
      ['Atiende urgencias?', 'Si. La comunicacion del estudio informa atencion para urgencias legales las 24 horas.'],
      ['Que documentacion conviene tener a mano?', 'Toda citacion, denuncia, constancia, contrato, mensaje o documento vinculado al asunto.'],
      ['Trabaja solamente derecho penal?', 'Su comunicacion destaca defensa penal, accidentes de transito, derecho laboral y asesoramiento juridico general.'],
      ['Donde esta ubicado?', 'En Roman Guerra, Maldonado. Conviene coordinar previamente la consulta.'],
      ['La primera comunicacion sustituye una consulta legal?', 'No. La informacion inicial ayuda a coordinar; el analisis del caso requiere una consulta profesional.'],
    ],
    footerText: 'Defensa penal y asesoramiento juridico con atencion directa en Maldonado.',
    footerServices: ['Defensa penal', 'Accidentes de transito', 'Derecho laboral', 'Urgencias legales'],
    seal: { line1: 'Claudio', line2: 'Rodriguez', meta: 'DEFENSA LEGAL' },
  },
  {
    slug: 'abogado-bermar-calcerrada',
    title: 'Abogado Bermar Calcerrada | Derecho laboral en Maldonado',
    description: 'Asesoramiento juridico en derecho laboral, derecho de familia, tramites y conflictos laborales en Maldonado Centro.',
    fullName: 'Abogado Bermar Calcerrada',
    brandStrong: 'Bermar',
    brandSmall: 'Calcerrada',
    legalType: 'Abogado',
    images: {
      og: 'assets/img/bermar-calcerrada.webp',
      practice: 'assets/img/hero.webp',
      review: 'assets/img/bermar-calcerrada.webp',
      contact: 'assets/img/contact-justice.webp',
    },
    locationLabel: 'Maldonado Centro',
    address: 'Ventura Alegre, Maldonado',
    mapQuery: 'Abogado Bermar Calcerrada Ventura Alegre, 20000 Maldonado',
    primaryPhone: { display: '099 595 615', e164: '+59899595615' },
    socials: [
      { label: 'YouTube', url: 'https://www.youtube.com/channel/UCGLWp9qlZ6xAF4kpKRuewjg/videos', icon: 'youtube' },
    ],
    hours: 'Consultas con coordinacion previa',
    whatsappNumber: '59899595615',
    whatsappText: 'Hola, quisiera coordinar una consulta legal con Bermar Calcerrada.',
    heroKicker: 'Atencion juridica personalizada',
    heroTitle: ['Asesoramiento laboral,', 'claro y responsable'],
    heroLead: 'Derecho laboral, derecho de familia y consultas juridicas con explicaciones claras y seguimiento cercano.',
    practiceCtaTitle: 'Necesitas orientacion para resolver una situacion legal?',
    practiceCtaText: 'Coordina una consulta y conta brevemente tu situacion.',
    actionLabel: 'Consultar ahora',
    services: [
      ['Derecho laboral', 'Consultas por conflictos, despidos, seguros y situaciones de trabajo.', 'briefcase-business'],
      ['Derecho de familia', 'Orientacion para asuntos personales que requieren apoyo juridico.', 'users-round'],
      ['Tramites legales', 'Acompanamiento para ordenar documentacion y pasos necesarios.', 'file-check-2'],
      ['Conflictos laborales', 'Analisis de alternativas antes de tomar decisiones.', 'scale'],
      ['Asesoramiento juridico', 'Explicaciones claras y trato personalizado.', 'book-open-check'],
      ['Representacion legal', 'Gestion responsable durante cada etapa del asunto.', 'shield-check'],
    ],
    situationsIntro: 'No hace falta llegar con el problema perfectamente definido. El primer paso es explicar la situacion y ordenar opciones.',
    situations: [
      'Tenes una consulta laboral y queres entender tus derechos.',
      'Necesitas orientacion por seguro de desempleo, BPS o una gestion vinculada al trabajo.',
      'Existe un conflicto familiar que requiere criterio juridico.',
      'Recibiste documentacion y queres saber como responder.',
      'Buscas un abogado que explique el proceso con claridad.',
      'Necesitas coordinar una consulta en Maldonado Centro.',
    ],
    situationsAction: 'Podes coordinar la consulta por telefono o WhatsApp.',
    aboutTitle: 'Asesoramiento juridico con claridad, cercania y responsabilidad',
    aboutText: 'Bermar Calcerrada trabaja con una atencion personalizada, enfocada en escuchar la situacion, explicar alternativas y acompanar al cliente con comunicacion clara durante el proceso.',
    values: [
      ['Claridad', 'Explicaciones simples para tomar decisiones informadas.', 'messages-square'],
      ['Cercania', 'Trato personalizado y disposicion para resolver dudas.', 'user-round-check'],
      ['Responsabilidad', 'Seguimiento serio y profesional de cada asunto.', 'shield-check'],
    ],
    team: {
      kicker: 'Profesional a cargo',
      title: 'Atencion personalizada con Bermar Calcerrada',
      intro: 'La atencion se centra en escuchar la situacion, explicar alternativas y acompanar cada paso con trato cercano.',
      groups: [
        { label: 'Direccion juridica', icon: 'briefcase-business', members: [['Bermar Calcerrada', 'Abogado']] },
      ],
    },
    ratingNumber: '4.9',
    ratingLabel: 'calificacion<br />en Google',
    ratingTitle: '',
    reviewKicker: 'Experiencias reales',
    reviewTitle: 'Lo que dicen quienes recibieron asesoramiento',
    reviews: [
      ['Excelente asesoramiento y profesionalismo. Me ayudo con una situacion sobre mi seguro de desempleo ante BPS. Le agradezco y destaco especialmente su disposicion, claridad y compromiso para que yo estuviera bien informado. Lo recomiendo totalmente a quienes necesiten asesoramiento juridico serio y responsable. Gracias, Dr. Calcerrada.', 'Sebas Coru'],
      ['Excelente profesional. Mas alla de eso, destaco la calidez humana y el compromiso con que atiende de forma tan personalizada. Muchas gracias, doctor.', 'Alejandra Medina'],
      ['Un profesional serio. Destaco que siempre brinda una atencion responsable y busca primero atender al ser humano, aconsejando y analizando los factores favorables para cada cliente. Transmite mucha responsabilidad y seriedad. De los mejores profesionales que me ha tocado consultar.', 'Miguel Corbo'],
      ['Excelente profesional y persona. Super recomendable. Siempre atento y con la mejor disposicion para solucionar los inconvenientes.', 'Belen Pirotto'],
      ['Me lo recomendaron por la excelente atencion, informacion y trato al cliente, y la verdad que fue excelente. Brinda explicaciones muy claras y soluciones a todas las preguntas. Muchas gracias por su atencion.', 'Fonvic Distribuidora'],
      ['Un gran profesional, dotado de una excelente capacidad a la hora de evacuar cualquier duda que le he planteado. Siempre agradecido por su tiempo, su puntualidad y su calidez humana. Altamente recomendable.', 'Sebastian Caballero'],
      ['Consulte al Dr. Calcerrada por una situacion legal conflictiva que llevaba muchos anos sin poder resolver. El doctor inspira confianza para expresar temas delicados. Manifiesto mi gratitud ante tan buen profesional, con gran calidad para escuchar, honestidad y capacidad para resolver.', 'Patricia Larrea'],
      ['Excelente profesional, responsable y comprometido. Se toma todo el tiempo necesario para responder cada pregunta y cada duda. Ademas de excelente profesional, es un gran ser humano. Ampliamente recomendable.', 'Jorgelina Migueles'],
    ],
    faqs: [
      ['Como puedo coordinar una consulta?', 'Podes llamar o escribir por WhatsApp al 099 595 615 y explicar brevemente el motivo.'],
      ['Trabaja derecho laboral?', 'Si. La comunicacion del estudio destaca asesoramiento en derecho laboral y conflictos vinculados al trabajo.'],
      ['Tambien atiende derecho de familia?', 'Si. El sitio presenta consultas vinculadas a derecho de familia y situaciones personales.'],
      ['Donde atiende?', 'En Maldonado Centro, con coordinacion previa.'],
      ['Que informacion conviene enviar?', 'Una descripcion breve del problema y los documentos principales si ya los tenes.'],
      ['La informacion del sitio reemplaza una consulta?', 'No. Es informacion general para facilitar el contacto y no sustituye asesoramiento legal personalizado.'],
    ],
    footerText: 'Asesoramiento en derecho laboral y de familia con atencion personalizada en Maldonado.',
    footerServices: ['Derecho laboral', 'Derecho de familia', 'Tramites legales', 'Conflictos laborales'],
    seal: { line1: 'Bermar', line2: 'Calcerrada', meta: 'ORIENTACION LEGAL' },
  },
  {
    slug: 'estudio-juridico-dra-ana-audiffred-asoc',
    title: 'Estudio Juridico Dra. Ana Audiffred & Asociados | Maldonado Centro',
    description: 'Estudio Juridico Dra. Ana Audiffred & Asociados: mas de 18 anos de trayectoria, consultas en Maldonado y asesoramiento para personas de todo el pais.',
    fullName: 'Estudio Juridico Dra. Ana Audiffred & Asociados',
    brandStrong: 'Ana Audiffred',
    brandSmall: 'Asociados',
    legalType: 'Estudio Juridico Notarial',
    brandLogo: 'assets/img/logo-ana-audiffred.png',
    images: {
      og: 'assets/img/logo-ana-audiffred.png',
      practice: 'assets/img/logo-ana-audiffred.png',
      review: 'assets/img/logo-ana-audiffred.png',
      contact: 'assets/img/contact-justice.webp',
    },
    locationLabel: 'Maldonado Centro',
    address: 'Galeria Torre Maldonado, Sarandi esq. Ventura Alegre 108, Maldonado',
    mapQuery: 'Estudio Juridico Dra. Ana Audiffred & Asociados Galeria Torre Maldonado, Sarandi esq. Ventura Alegre 108, Maldonado',
    primaryPhone: { display: '099 934 004', e164: '+59899934004' },
    altPhones: [{ display: '+598 4223 7209', e164: '+59842237209', label: 'Telefono alternativo' }],
    email: 'est.juridicoaudiffred@gmail.com',
    socials: [
      { label: 'Instagram', url: 'https://www.instagram.com/estudioanaaudiffred/', icon: 'instagram' },
      { label: 'Facebook', url: 'https://www.facebook.com/p/Estudio-Juridico-Ana-Audiffred-100065712750755/', icon: 'facebook' },
    ],
    hours: 'Consultas con coordinacion previa',
    whatsappNumber: '59899934004',
    whatsappText: 'Hola, quisiera hacer una consulta con Ana Audiffred & Asociados.',
    heroKicker: 'Mas de 18 anos de trayectoria',
    heroTitle: ['Asesoria juridica y notarial,', 'con atencion personalizada'],
    heroLead: 'Atencion juridica y notarial desde Maldonado, con alcance para consultas de personas de todo el pais.',
    practiceCtaTitle: 'Necesitas orientacion juridica o notarial?',
    practiceCtaText: 'Conta brevemente tu situacion y coordina una consulta.',
    actionLabel: 'Consultar ahora',
    services: [
      ['Asesoria juridica', 'Orientacion para evaluar consultas y organizar los proximos pasos.', 'scale'],
      ['Asesoria notarial', 'Atencion de documentacion y gestiones dentro del area notarial.', 'file-signature'],
      ['Resolucion de conflictos', 'Evaluacion profesional de situaciones que requieren una via legal.', 'landmark'],
      ['Representacion legal', 'Acompanamiento y representacion para la gestion del asunto.', 'briefcase-business'],
      ['Documentacion', 'Revision y organizacion de documentos necesarios para avanzar.', 'file-search'],
      ['Atencion nacional', 'Asesoramiento informado para personas de distintos puntos del pais.', 'map-pinned'],
    ],
    situationsIntro: 'Una consulta juridica o notarial permite identificar que documentacion necesitas y cual es la via adecuada para avanzar.',
    situations: [
      'Necesitas entender tus opciones antes de tomar una decision legal.',
      'Buscas apoyo para una gestion o documentacion notarial.',
      'Recibiste documentacion y queres saber que significa o como responder.',
      'Tenes una situacion personal o patrimonial que requiere criterio profesional.',
      'Necesitas representacion o seguimiento para una gestion legal.',
      'Queres coordinar una consulta desde Maldonado o desde otro punto del pais.',
    ],
    situationsAction: 'Podes contar tu situacion por WhatsApp y coordinar una consulta.',
    aboutTitle: 'Experiencia juridica y notarial dentro de un mismo estudio',
    aboutText: 'El estudio combina trayectoria, asesoria juridica y servicios notariales con una atencion personalizada. La consulta inicial ayuda a ordenar la informacion, definir la documentacion necesaria y avanzar con mayor claridad.',
    values: [
      ['Atencion personalizada', 'Cada consulta se aborda segun su contexto y documentacion.', 'user-round-check'],
      ['Area juridica y notarial', 'Dos lineas de trabajo para resolver gestiones conectadas.', 'file-badge'],
      ['Alcance nacional', 'Asesoramiento para personas de Maldonado y del resto del pais.', 'map-pinned'],
    ],
    team: {
      kicker: 'Equipo del estudio',
      title: 'Dra. Ana Audiffred y asociados',
      intro: 'El estudio combina direccion profesional, asociados y un enfoque juridico notarial para abordar cada consulta con criterio.',
      groups: [
        { label: 'Direccion', icon: 'scale', members: [['Dra. Ana Audiffred', 'Direccion del estudio']] },
        { label: 'Asociados', icon: 'users-round', members: [['Equipo asociado', 'Area juridica y notarial']] },
      ],
    },
    ratingNumber: '18+',
    ratingLabel: 'anos de<br />trayectoria',
    ratingTitle: 'Experiencia juridica y notarial en Maldonado',
    reviewKicker: 'Confianza del estudio',
    reviewTitle: 'Trayectoria, presencia y atencion personalizada',
    reviews: [
      ['El estudio comunica mas de 18 anos de trayectoria y una practica que integra asesoramiento juridico y notarial.', 'Comunicacion publica'],
      ['Su presencia en redes destaca asesoria confiable y atencion personalizada para quienes necesitan ordenar una consulta.', 'Instagram y Facebook'],
      ['La atencion se coordina desde Maldonado Centro, con canales directos por telefono, correo, WhatsApp y redes sociales.', 'Canales oficiales'],
    ],
    faqs: [
      ['El estudio tambien brinda servicios notariales?', 'Si. Se presenta publicamente como estudio juridico notarial.'],
      ['Atienden consultas fuera de Maldonado?', 'Si. El estudio informa asesoramiento para personas de todo el pais.'],
      ['Donde esta la oficina?', 'En Galeria Torre Maldonado, Sarandi esquina Ventura Alegre 108.'],
      ['Como puedo agendar una consulta?', 'Podes comunicarte por WhatsApp, telefono o correo electronico.'],
      ['Que documentacion debo enviar?', 'Depende del asunto. Es util compartir una descripcion breve y los documentos principales disponibles.'],
      ['La informacion del sitio reemplaza asesoramiento legal?', 'No. La informacion es general y no sustituye una consulta profesional personalizada.'],
    ],
    footerText: 'Asesoria juridica y notarial con atencion personalizada.',
    footerServices: ['Asesoria juridica', 'Asesoria notarial', 'Representacion legal', 'Documentacion'],
    seal: { line1: 'Ana', line2: 'Audiffred', meta: 'JURIDICO NOTARIAL' },
  },
  {
    slug: 'estudio-tellechea-valladarez-asociados',
    title: 'Estudio Tellechea Valladarez & Asociados | Maldonado Centro',
    description: 'Estudio Tellechea Valladarez & Asociados: consultas, representacion y tramites legales desde un estudio con practica juridica y notarial.',
    fullName: 'Estudio Tellechea Valladarez & Asociados',
    brandStrong: 'Tellechea',
    brandSmall: 'Valladarez',
    legalType: 'Estudio Juridico Notarial',
    images: {
      og: 'assets/img/hero.webp',
      practice: 'assets/img/hero.webp',
      review: 'assets/img/hero.webp',
      contact: 'assets/img/contact-justice.webp',
    },
    locationLabel: 'Maldonado Centro',
    address: '3 de Febrero, 20000 Maldonado',
    mapQuery: 'Estudio Tellechea Valladarez & Asociados 3 de Febrero, 20000 Maldonado',
    primaryPhone: { display: '099 385 888', e164: '+59899385888' },
    hours: 'Consultas con coordinacion previa',
    whatsappNumber: '59899385888',
    whatsappText: 'Hola, quisiera hacer una consulta con Tellechea Valladarez.',
    heroKicker: 'Practica juridica y notarial',
    heroTitle: ['Servicios juridicos y notariales,', 'con proceso claro'],
    heroLead: 'Consultas, representacion, tramites legales y servicios notariales desde Maldonado Centro.',
    practiceCtaTitle: 'Necesitas ordenar una consulta legal o notarial?',
    practiceCtaText: 'Conta el motivo y coordina el canal mas adecuado.',
    actionLabel: 'Consultar ahora',
    services: [
      ['Asesoramiento juridico', 'Orientacion para entender opciones y documentacion necesaria.', 'scale'],
      ['Representacion legal', 'Acompanamiento profesional para gestionar el asunto.', 'briefcase-business'],
      ['Servicios notariales', 'Gestiones y documentacion dentro del area notarial.', 'file-signature'],
      ['Tramites legales', 'Organizacion de pasos, requisitos y seguimiento.', 'file-check-2'],
      ['Consultas personales', 'Atencion de situaciones privadas que requieren criterio legal.', 'users-round'],
      ['Seguimiento', 'Comunicacion para avanzar con mayor orden y claridad.', 'shield-check'],
    ],
    situationsIntro: 'El primer paso es explicar el asunto. El estudio puede orientar si corresponde un tramite, una gestion notarial o representacion legal.',
    situations: [
      'Necesitas asesoramiento juridico antes de firmar o responder documentacion.',
      'Buscas representacion para una situacion legal concreta.',
      'Tenes una gestion notarial o documentacion pendiente.',
      'Queres resolver un tramite legal con acompanamiento profesional.',
      'No sabes que documentos llevar a la primera consulta.',
      'Necesitas coordinar una consulta en Maldonado Centro.',
    ],
    situationsAction: 'Podes escribir por WhatsApp o llamar al estudio.',
    aboutTitle: 'Dos areas de trabajo, una consulta mas ordenada',
    aboutText: 'Tellechea Valladarez & Asociados concentra practica juridica y notarial para que cada consulta se aborde con documentacion, criterio y pasos claros desde el inicio.',
    values: [
      ['Juridico', 'Asesoramiento y representacion para asuntos legales.', 'scale'],
      ['Notarial', 'Gestiones documentales dentro del area notarial.', 'file-signature'],
      ['Orden', 'Proceso claro para pasar de la consulta a los proximos pasos.', 'list-checks'],
    ],
    team: {
      kicker: 'Equipo del estudio',
      title: 'Estructura juridica y notarial asociada',
      intro: 'La atencion se organiza entre area juridica y area notarial para responder consultas, gestiones y documentacion con mayor orden.',
      groups: [
        { label: 'Area juridica', icon: 'scale', members: [['Equipo juridico', 'Asesoramiento y representacion']] },
        { label: 'Area notarial', icon: 'file-signature', members: [['Equipo notarial', 'Servicios y gestiones documentales']] },
      ],
    },
    ratingNumber: 'Juridico',
    ratingLabel: 'y<br />notarial',
    ratingTitle: 'Atencion integral desde Maldonado Centro',
    reviewKicker: 'Datos del estudio',
    reviewTitle: 'Consulta, documentacion y seguimiento profesional',
    reviews: [
      ['El estudio comunica practica juridica y notarial para consultas, representacion, tramites y gestiones documentales.', 'Informacion publica'],
      ['La oficina se ubica en 3 de Febrero, Maldonado Centro, con contacto directo al 099 385 888.', 'Ubicacion y contacto'],
      ['La consulta inicial permite identificar si corresponde asesoramiento, representacion, tramite o servicio notarial.', 'Proceso de atencion'],
    ],
    faqs: [
      ['El estudio brinda servicios notariales?', 'Si. La informacion publica confirma actividad juridica y notarial.'],
      ['Que gestiones puedo consultar?', 'Asesoramiento, representacion, tramites y consultas legales, ademas de servicios notariales.'],
      ['Donde esta ubicado?', 'En la calle 3 de Febrero, Maldonado Centro.'],
      ['Como puedo comunicarme?', 'Podes escribir por WhatsApp o llamar al 099 385 888.'],
      ['Tengo que saber el area juridica antes de consultar?', 'No. Podes explicar la situacion y el estudio orientara el area correspondiente.'],
      ['La informacion del sitio sustituye asesoramiento legal?', 'No. Es informacion general para facilitar el contacto inicial.'],
    ],
    footerText: 'Servicios juridicos y notariales en Maldonado.',
    footerServices: ['Asesoramiento juridico', 'Representacion legal', 'Servicios notariales', 'Tramites legales'],
    seal: { line1: 'Tellechea', line2: 'Valladarez', meta: 'JURIDICO NOTARIAL' },
  },
  {
    slug: 'estudio-juridico-caubarrere-asoc',
    title: 'Estudio Juridico Caubarrere & Asociados | Punta del Este',
    description: 'Estudio Juridico Caubarrere & Asociados: desde 1975, abogados, escribanos y contadores brindan asistencia integral en Punta del Este y Montevideo.',
    fullName: 'Estudio Juridico Caubarrere & Asociados',
    brandStrong: 'Caubarrere',
    brandSmall: 'Asociados',
    legalType: 'Estudio Juridico Integral',
    brandLogo: 'assets/img/logo-caubarrere.png',
    images: {
      og: 'assets/img/logo-caubarrere.png',
      practice: 'assets/img/hero.webp',
      review: 'assets/img/logo-caubarrere.png',
      contact: 'assets/img/contact-justice.webp',
    },
    locationLabel: 'Punta del Este',
    address: 'Design District, Av. Italia esquina, 20100 Punta del Este',
    mapQuery: 'Estudio Juridico Caubarrere & Asociados Design District, Av. Italia esquina, 20100 Punta del Este',
    primaryPhone: { display: '4249 2709', e164: '+59842492709' },
    altPhones: [{ display: '099 903 534', e164: '+59899903534', label: 'Telefono alternativo' }],
    email: 'estudio@estudiocaubarrere.com',
    socials: [
      { label: 'Facebook', url: 'https://www.facebook.com/estudiocaubarrere/', icon: 'facebook' },
      { label: 'LinkedIn', url: 'https://uy.linkedin.com/company/estudio-jur%C3%ADdico-caubarr%C3%A8re-%26-asoc-', icon: 'linkedin' },
    ],
    hours: 'Consultas con coordinacion previa',
    whatsappNumber: null,
    whatsappText: '',
    heroKicker: 'Desde 1975',
    heroTitle: ['Asistencia juridica integral,', 'con mirada profesional'],
    heroLead: 'Abogados, escribanos y contadores para asuntos juridicos, notariales, comerciales, bancarios y contables.',
    practiceCtaTitle: 'Necesitas una vision integral del asunto?',
    practiceCtaText: 'Coordina una consulta con el estudio y presenta la documentacion disponible.',
    actionLabel: 'Llamar al estudio',
    services: [
      ['Derecho civil', 'Asesoramiento y representacion en asuntos civiles.', 'scale'],
      ['Derecho laboral', 'Orientacion para situaciones vinculadas al trabajo.', 'briefcase-business'],
      ['Derecho comercial', 'Apoyo juridico para actividad empresarial y acuerdos.', 'building-2'],
      ['Derecho bancario', 'Analisis de asuntos financieros y bancarios.', 'landmark'],
      ['Servicios notariales', 'Documentacion y gestiones con escribanos del equipo.', 'file-signature'],
      ['Asesoria contable', 'Acompanamiento contable y financiero cuando el asunto lo requiere.', 'calculator'],
    ],
    situationsIntro: 'Cuando un asunto involucra documentos, contratos, bienes o empresas, una mirada multidisciplinaria ayuda a ordenar el camino.',
    situations: [
      'Necesitas asesoramiento juridico, notarial o contable conectado.',
      'Tu caso involucra contratos, bienes, empresa o documentacion compleja.',
      'Buscas abogados, escribanos y contadores dentro de una misma estructura.',
      'Requeris asistencia en ingles o aleman para una gestion.',
      'Necesitas revisar alternativas antes de tomar una decision patrimonial.',
      'Queres coordinar una consulta en Punta del Este o Montevideo.',
    ],
    situationsAction: 'Podes llamar al estudio o enviar un correo con el motivo de consulta.',
    aboutTitle: 'Cinco decadas de practica juridica, notarial y contable',
    aboutText: 'Desde 1975, Caubarrere & Asociados reune abogados, escribanos y contadores para abordar asuntos que requieren criterio legal, documentacion, gestion y seguimiento profesional.',
    values: [
      ['Equipo integral', 'Abogados, escribanos y contadores dentro de una misma estructura.', 'users-round'],
      ['Trayectoria', 'Practica sostenida desde 1975 en Punta del Este.', 'badge-check'],
      ['Idiomas', 'Asistencia informada en ingles y aleman mediante contacto movil.', 'languages'],
    ],
    team: {
      kicker: 'Staff profesional',
      title: 'Abogados, escribanos y contadores dentro de un mismo estudio',
      intro: 'Un staff multidisciplinario organizado por areas para abordar asuntos juridicos, notariales y contables con una mirada integral.',
      groups: [
        {
          label: 'Abogacía',
          icon: 'scale',
          members: [
            ['Jorge Alberto Caubarrere', 'Abogacia'],
            ['Martín Caubarrere', 'Abogacía'],
            ['Sebastián Silvera', 'Abogacía'],
            ['Enzo Pittamiglio', 'Abogacía'],
          ],
        },
        {
          label: 'Departamento notarial',
          icon: 'file-signature',
          members: [
            ['Juan Caubarrere', 'Departamento notarial'],
            ['Javier Parga', 'Departamento notarial'],
            ['María Angelina Wohlwend', 'Departamento notarial'],
            ['María Pía Maidana', 'Departamento notarial'],
          ],
        },
        {
          label: 'Departamento contable',
          icon: 'calculator',
          members: [
            ['Natalia Zabalza', 'Departamento contable'],
          ],
        },
      ],
    },
    ratingNumber: '5.0',
    ratingLabel: 'reseñas<br />de clientes',
    ratingTitle: 'Valoraciones reales sobre su atencion profesional',
    reviewKicker: 'Testimonios reales',
    reviewTitle: 'Confianza, tranquilidad y asesoramiento de calidad',
    reviewsLayout: 'grid',
    reviews: [
      ['Excelentes profesionales. Recibí buen asesoramiento, lo que me proporcionó tranquilidad. Muy recomendable.', 'Ignacio Maina'],
      ['Felicitaciones. Muy cómodas las nuevas instalaciones. Éxitos. Asesoramiento jurídico de calidad.', 'Dayana Nuñez'],
      ['Excelentes profesionales.', 'Mario Stefanoli'],
      ['Excelente atención.', 'Cristian Ivan Federik'],
    ],
    faqs: [
      ['Que profesionales integran el estudio?', 'El equipo reune abogados, escribanos y contadores.'],
      ['Atienden en otros idiomas?', 'Si. El estudio informa asistencia en ingles y aleman mediante el 099 903 534.'],
      ['Que areas cubren?', 'Derecho civil, laboral, comercial y bancario; servicios notariales; mediacion; certificados y asesoramiento contable y financiero.'],
      ['Donde se encuentra la oficina?', 'En Design District, avenida Italia, Punta del Este.'],
      ['Como puedo iniciar el contacto?', 'Podes llamar al 4249 2709 o escribir a estudio@estudiocaubarrere.com.'],
      ['La informacion del sitio reemplaza una consulta?', 'No. Es informacion general para orientar el primer contacto.'],
    ],
    footerText: 'Cinco decadas de practica juridica, notarial y contable.',
    footerServices: ['Derecho civil', 'Derecho comercial', 'Servicios notariales', 'Asesoria contable'],
    seal: { line1: 'Caubarrere', line2: 'Asociados', meta: 'DESDE 1975' },
  },
  {
    slug: 'abogada-biaturi-estudio-juridico',
    title: 'Abogada Biaturi - Estudio Juridico | Punta del Este',
    description: 'Abogada Biaturi - Estudio Juridico: consultas en distintas areas del Derecho, con atencion en Maldonado, San Carlos y Punta del Este.',
    fullName: 'Abogada Biaturi - Estudio Juridico',
    brandStrong: 'Florencia',
    brandSmall: 'Biaturi',
    legalType: 'Abogada y asesoria legal',
    brandLogo: 'assets/img/logo-biaturi.png',
    images: {
      og: 'assets/img/logo-biaturi.png',
      practice: 'assets/img/hero.webp',
      review: 'assets/img/logo-biaturi.png',
      contact: 'assets/img/contact-justice.webp',
    },
    locationLabel: 'Punta del Este',
    address: 'Abraham Lincoln casi Av. Roosevelt, parada 15, Punta del Este',
    mapQuery: 'Abogada Biaturi Estudio Juridico Abraham Lincoln casi Av. Roosevelt parada 15 Punta del Este',
    primaryPhone: { display: '091 079 716', e164: '+59891079716' },
    email: 'dra.f.biaturi@gmail.com',
    socials: [
      { label: 'Instagram', url: 'https://www.instagram.com/fba_serviciosjuridicos/', icon: 'instagram' },
    ],
    hours: 'Consultas con agenda previa',
    whatsappNumber: '59891079716',
    whatsappText: 'Hola, quisiera hacer una consulta con Florencia Biaturi.',
    heroKicker: 'Atencion en Maldonado, San Carlos y Punta del Este',
    heroTitle: ['Asesoria legal cercana,', 'con consulta directa'],
    heroLead: 'Consultas en distintas areas del Derecho, con coordinacion por WhatsApp y atencion local en Punta del Este.',
    practiceCtaTitle: 'Necesitas hacer una consulta legal?',
    practiceCtaText: 'Explica la situacion y coordina la ciudad o el canal de atencion.',
    actionLabel: 'Consultar ahora',
    services: [
      ['Consultas legales', 'Primera orientacion para ordenar la situacion y los documentos.', 'messages-square'],
      ['Asesoria juridica', 'Acompanamiento en distintas areas del Derecho.', 'scale'],
      ['Gestiones', 'Organizacion de pasos y documentacion necesaria.', 'file-check-2'],
      ['Coordinacion local', 'Atencion en Maldonado, San Carlos y Punta del Este.', 'map-pinned'],
      ['Seguimiento', 'Comunicacion para avanzar con mayor claridad.', 'shield-check'],
      ['Orientacion preventiva', 'Analisis antes de tomar decisiones o responder documentacion.', 'book-open-check'],
    ],
    situationsIntro: 'No necesitas identificar de antemano el area juridica. Podes explicar la situacion y coordinar una consulta.',
    situations: [
      'Tenes una consulta legal y no sabes por donde empezar.',
      'Necesitas asesoramiento antes de firmar o responder documentacion.',
      'Queres coordinar atencion en Maldonado, San Carlos o Punta del Este.',
      'Buscas una comunicacion directa por WhatsApp.',
      'Tenes documentos que requieren revision profesional.',
      'Necesitas entender los proximos pasos posibles.',
    ],
    situationsAction: 'Podes coordinar directamente por WhatsApp.',
    aboutTitle: 'Una consulta directa, en la ciudad que te quede mas cerca',
    aboutText: 'Florencia Biaturi comunica asesoria legal cercana para personas de Maldonado, San Carlos y Punta del Este. El foco esta en escuchar la situacion, ordenar la informacion inicial y coordinar el camino de atencion.',
    values: [
      ['Atencion local', 'Consultas coordinadas en Maldonado, San Carlos y Punta del Este.', 'map-pinned'],
      ['Comunicacion directa', 'Contacto por WhatsApp para iniciar la consulta.', 'message-circle'],
      ['Claridad inicial', 'Orden de la informacion y proximos pasos posibles.', 'list-checks'],
    ],
    team: {
      kicker: 'Profesional a cargo',
      title: 'Consulta directa con Florencia Biaturi',
      intro: 'La consulta se inicia con contacto directo para ordenar la situacion y definir los proximos pasos posibles.',
      groups: [
        { label: 'Asesoria legal', icon: 'scale', members: [['Florencia Biaturi', 'Abogada']] },
      ],
    },
    ratingNumber: '4',
    ratingLabel: 'textos<br />modelo',
    ratingTitle: 'Textos modelo para reemplazar por reseñas reales',
    reviewKicker: 'Testimonios modelo',
    reviewTitle: 'Claridad, cercanía y seguimiento legal',
    reviewsLayout: 'grid',
    reviews: [
      ['Me ayudó a ordenar la situación y entender qué documentación tenía que presentar antes de avanzar.', 'Cliente particular'],
      ['La atención fue clara, directa y cercana. Pude coordinar la consulta por WhatsApp sin vueltas.', 'Consulta familiar'],
      ['Valoré el seguimiento y la explicación simple de los próximos pasos.', 'Cliente en Punta del Este'],
      ['Encontré una respuesta profesional para revisar el tema antes de tomar una decisión.', 'Consulta preventiva'],
    ],
    faqs: [
      ['En que ciudades atiende?', 'En Maldonado, San Carlos y Punta del Este.'],
      ['Como puedo agendar una consulta?', 'Podes coordinar directamente por WhatsApp al 091 079 716.'],
      ['Donde esta la oficina de Punta del Este?', 'En Abraham Lincoln casi avenida Roosevelt, parada 15.'],
      ['Que tipo de consultas recibe?', 'La informacion publica indica asesoria legal en distintas areas del Derecho.'],
      ['Tengo que llevar documentacion?', 'Si tenes documentos vinculados al asunto, conviene mencionarlos al coordinar.'],
      ['La informacion del sitio sustituye una consulta legal?', 'No. Es informacion general y no reemplaza asesoramiento profesional personalizado.'],
    ],
    footerText: 'Asesoria legal cercana en Maldonado y Punta del Este.',
    footerServices: ['Consultas legales', 'Asesoria juridica', 'Gestiones', 'Coordinacion local'],
    seal: { line1: 'Florencia', line2: 'Biaturi', meta: 'ASESORIA LEGAL' },
  },
];

const sharedAssets = [
  ['assets-neutrales-legales/legal-hero-justice.webp', 'assets/img/legal-hero-justice.webp'],
  ['estudio-juridico-cairo-duaso/assets/img/contact-justice.webp', 'assets/img/contact-justice.webp'],
  ['assets-neutrales-legales/lucide.min.js', 'assets/js/lucide.min.js'],
  ['assets-neutrales-legales/legal-hero-cinematic.mp4', 'assets/video/legal-hero-cinematic.mp4'],
];

function spanish(value) {
  const replacements = [
    [/\bJuridico\b/g, 'Jurídico'],
    [/\bJuridica\b/g, 'Jurídica'],
    [/\bjuridico\b/g, 'jurídico'],
    [/\bjuridica\b/g, 'jurídica'],
    [/\bjuridicos\b/g, 'jurídicos'],
    [/\bjuridicas\b/g, 'jurídicas'],
    [/\bAsesoria\b/g, 'Asesoría'],
    [/\basesoria\b/g, 'asesoría'],
    [/\bAtencion\b/g, 'Atención'],
    [/\batencion\b/g, 'atención'],
    [/\bcomunicacion\b/g, 'comunicación'],
    [/\bComunicacion\b/g, 'Comunicación'],
    [/\bcoordinacion\b/g, 'coordinación'],
    [/\bCoordinacion\b/g, 'Coordinación'],
    [/\binformacion\b/g, 'información'],
    [/\bInformacion\b/g, 'Información'],
    [/\bdocumentacion\b/g, 'documentación'],
    [/\bDocumentacion\b/g, 'Documentación'],
    [/\borientacion\b/g, 'orientación'],
    [/\bOrientacion\b/g, 'Orientación'],
    [/\brepresentacion\b/g, 'representación'],
    [/\bRepresentacion\b/g, 'Representación'],
    [/\bgestion\b/g, 'gestión'],
    [/\bGestion\b/g, 'Gestión'],
    [/\bproximos\b/g, 'próximos'],
    [/\bProximos\b/g, 'Próximos'],
    [/\bsituacion\b/g, 'situación'],
    [/\bSituacion\b/g, 'Situación'],
    [/\bsituaciones\b/g, 'situaciones'],
    [/\bdecision\b/g, 'decisión'],
    [/\bdecisiones\b/g, 'decisiones'],
    [/\brevision\b/g, 'revisión'],
    [/\bRevision\b/g, 'Revisión'],
    [/\btransito\b/g, 'tránsito'],
    [/\banos\b/g, 'años'],
    [/\bano\b/g, 'año'],
    [/\bMas\b/g, 'Más'],
    [/\bmas\b/g, 'más'],
    [/\bTelefono\b/g, 'Teléfono'],
    [/\btelefono\b/g, 'teléfono'],
    [/\bNumero\b/g, 'Número'],
    [/\bnumero\b/g, 'número'],
    [/\bResena\b/g, 'Reseña'],
    [/\bresena\b/g, 'reseña'],
    [/\bResenas\b/g, 'Reseñas'],
    [/\bresenas\b/g, 'reseñas'],
    [/\bUbicacion\b/g, 'Ubicación'],
    [/\bubicacion\b/g, 'ubicación'],
    [/\bDireccion\b/g, 'Dirección'],
    [/\bdireccion\b/g, 'dirección'],
    [/\brapidos\b/g, 'rápidos'],
    [/\bPractica\b/g, 'Práctica'],
    [/\bpractica\b/g, 'práctica'],
    [/\barea\b/g, 'área'],
    [/\bareas\b/g, 'áreas'],
    [/\bAnalisis\b/g, 'Análisis'],
    [/\banalisis\b/g, 'análisis'],
    [/\bacompanamiento\b/g, 'acompañamiento'],
    [/\bAcompanamiento\b/g, 'Acompañamiento'],
    [/\bacompanar\b/g, 'acompañar'],
    [/\bpublica\b/g, 'pública'],
    [/\bpublico\b/g, 'público'],
    [/\bingles\b/g, 'inglés'],
    [/\baleman\b/g, 'alemán'],
    [/\bPodes\b/g, 'Podés'],
    [/\bpodes\b/g, 'podés'],
    [/\bTenes\b/g, 'Tenés'],
    [/\btenes\b/g, 'tenés'],
    [/\bQueres\b/g, 'Querés'],
    [/\bqueres\b/g, 'querés'],
    [/\bConta\b/g, 'Contá'],
    [/\bconta\b/g, 'contá'],
    [/\bCoordina\b/g, 'Coordiná'],
    [/\bcoordina\b/g, 'coordiná'],
    [/\bAgenda\b/g, 'Agendá'],
    [/\bagenda\b/g, 'agendá'],
    [/\bConoce\b/g, 'Conocé'],
    [/\bNavegacion\b/g, 'Navegación'],
    [/\bmovil\b/g, 'móvil'],
    [/\bMovil\b/g, 'Móvil'],
    [/\bRoman\b/g, 'Román'],
    [/\bSarandi\b/g, 'Sarandí'],
    [/\bGaleria\b/g, 'Galería'],
    [/\bcalificacion\b/g, 'calificación'],
    [/\bCalificacion\b/g, 'Calificación'],
    [/\bautomáticamente\b/g, 'automáticamente'],
    [/\benvian\b/g, 'envían'],
    [/\benvia\b/g, 'envía'],
  ];

  let text = String(value ?? '');
  for (const [pattern, replacement] of replacements) {
    text = text.replace(pattern, replacement);
  }
  return text;
}

function esc(value) {
  return spanish(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function attr(value) {
  return esc(value).replace(/"/g, '&quot;');
}

function rawAttr(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function imageSrc(site, key, fallback) {
  return site.images?.[key] || fallback;
}

function query(value) {
  return encodeURIComponent(value).replace(/%20/g, '%20');
}

function phoneHref(phone) {
  return `tel:${phone.e164}`;
}

function whatsappHref(site) {
  if (!site.whatsappNumber) return phoneHref(site.primaryPhone);
  return `https://wa.me/${site.whatsappNumber}?text=${query(site.whatsappText)}`;
}

function externalAttrs(href) {
  return href.startsWith('http') ? ' target="_blank" rel="noopener"' : '';
}

function contactLabel(site) {
  return site.whatsappNumber ? 'WhatsApp' : 'Telefono';
}

function contactIcon(site) {
  return site.whatsappNumber ? 'message-circle' : 'phone-call';
}

function socialIcon(social) {
  const icon = String(social.icon || social.label || '').toLowerCase();
  if (icon.includes('instagram')) return 'instagram';
  if (icon.includes('facebook')) return 'facebook';
  if (icon.includes('linkedin')) return 'linkedin';
  if (icon.includes('youtube')) return 'youtube';
  return 'external-link';
}

function socialLink(social, variant = 'plain') {
  const compact = variant === 'compact';
  return `<a class="social-link" href="${rawAttr(social.url)}" target="_blank" rel="noopener" aria-label="${attr(social.label)}"><i data-lucide="${attr(socialIcon(social))}"></i>${compact ? '' : `<span>${esc(social.label)}</span>`}</a>`;
}

function socialLinks(site, className, variant = 'plain') {
  if (!site.socials?.length) return '';
  return `<div class="${attr(className)}" aria-label="Redes sociales de ${attr(site.fullName)}">${site.socials.map((social) => socialLink(social, variant)).join('')}</div>`;
}

function brandMark(site) {
  if (site.brandLogo) {
    return `<span class="brand-mark brand-mark-image"><img src="${rawAttr(site.brandLogo)}" alt="${attr(site.fullName)}" width="1080" height="1080" /></span>`;
  }
  return '<span class="brand-mark"><i data-lucide="scale"></i></span>';
}

function mapSearch(site) {
  return `https://www.google.com/maps/search/?api=1&query=${query(site.mapQuery)}`;
}

function mapEmbed(site) {
  return `https://www.google.com/maps?q=${query(site.mapQuery)}&output=embed`;
}

function card([title, text, icon]) {
  return `
        <a class="practice-card reveal" href="#contacto">
          <span class="card-arrow"><i data-lucide="arrow-up-right"></i></span>
          <h2>${esc(title).replace(/ /g, '<br />')}</h2>
          <i class="practice-icon" data-lucide="${attr(icon)}"></i>
          <p>${esc(text)}</p>
        </a>`;
}

function situation(text, index) {
  return `          <article class="situation-item reveal"><span>${String(index + 1).padStart(2, '0')}</span><h3>${esc(text)}</h3></article>`;
}

function valueBlock([title, text, icon]) {
  return `
          <article class="about-value reveal">
            <span class="value-icon"><i data-lucide="${attr(icon)}"></i></span>
            <h3>${esc(title)}</h3>
            <p>${esc(text)}</p>
          </article>`;
}

function teamMember([name, role]) {
  const initials = String(name)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
  return `
              <article class="team-member reveal">
                <span class="team-initials">${esc(initials)}</span>
                <strong>${esc(name)}</strong>
                <small>${esc(role)}</small>
              </article>`;
}

function teamGroup(group) {
  return `
          <section class="team-group reveal">
            <div class="team-group-heading">
              <span><i data-lucide="${attr(group.icon || 'users-round')}"></i></span>
              <h3>${esc(group.label)}</h3>
            </div>
            <div class="team-members">
${group.members.map(teamMember).join('\n')}
            </div>
          </section>`;
}

function teamSection(site) {
  if (!site.team?.groups?.length) return '';
  return `
    <section class="team" id="equipo">
      <div class="shell">
        <div class="team-heading reveal">
          <p class="section-kicker">${esc(site.team.kicker || 'Equipo')}</p>
          <h2>${esc(site.team.title || 'Equipo profesional')}</h2>
          <p>${esc(site.team.intro || 'Profesionales vinculados a la atencion del estudio.')}</p>
        </div>
        <div class="team-layout">
${site.team.groups.map(teamGroup).join('\n')}
        </div>
      </div>
    </section>`;
}

function reviewSlide([text, author], index) {
  const parts = Array.isArray(text) ? text : [text];
  const long = parts.join(' ').length > 230 || parts.length > 1;
  return `
            <figure class="review-slide${index === 0 ? ' is-active' : ''}" data-review-slide${index === 0 ? '' : ' hidden'}>
              <blockquote class="review-text${long ? ' is-collapsible' : ''}">
                ${parts.map((part) => `<p>${esc(part)}</p>`).join('\n                ')}
              </blockquote>
              ${long ? '<button class="review-more" type="button" data-review-more>Ver resena completa</button>' : ''}
              <figcaption class="review-author"><span class="author-mark"><i data-lucide="user-round"></i></span><strong>${esc(author)}</strong></figcaption>
            </figure>`;
}

function reviewCard([text, author]) {
  const parts = Array.isArray(text) ? text : [text];
  return `
              <figure class="review-card">
                <blockquote class="review-text">
                  ${parts.map((part) => `<p>${esc(part)}</p>`).join('\n                  ')}
                </blockquote>
                <figcaption class="review-author"><span class="author-mark"><i data-lucide="user-round"></i></span><strong>${esc(author)}</strong></figcaption>
              </figure>`;
}

function reviewsArticle(site) {
  if (site.reviewsLayout === 'grid') {
    return `
        <article class="review-quote review-quote-grid reveal">
          <div class="review-heading">
            <div>
              <p class="section-kicker">${esc(site.reviewKicker)}</p>
              <h2>${esc(site.reviewTitle)}</h2>
            </div>
          </div>
          <span class="thin-line" aria-hidden="true"></span>

          <div class="review-card-grid" aria-label="Testimonios de clientes">
${site.reviews.map(reviewCard).join('')}
          </div>
        </article>`;
  }

  return `
        <article class="review-quote reveal" data-review-carousel>
          <p class="quote-mark" aria-hidden="true">&ldquo;</p>
          <div class="review-heading">
            <div>
              <p class="section-kicker">${esc(site.reviewKicker)}</p>
              <h2>${esc(site.reviewTitle)}</h2>
            </div>
            <div class="review-controls" aria-label="Controles de testimonios">
              <button type="button" aria-label="Resena anterior" data-review-prev><i data-lucide="chevron-left"></i></button>
              <button type="button" aria-label="Siguiente resena" data-review-next><i data-lucide="chevron-right"></i></button>
            </div>
          </div>
          <span class="thin-line" aria-hidden="true"></span>

          <div class="review-slides" aria-live="polite">
${site.reviews.map(reviewSlide).join('')}
          </div>
        </article>`;
}

function faq([question, answer], index) {
  return `
          <details class="faq-item reveal"${index === 0 ? ' open' : ''}>
            <summary><span>${esc(question)}</span><i data-lucide="chevron-down"></i></summary>
            <div class="faq-answer"><p>${esc(answer)}</p></div>
          </details>`;
}

function contactDetails(site) {
  const items = [
    `<a href="${attr(phoneHref(site.primaryPhone))}"><i data-lucide="phone"></i><span><small>Telefono</small>${esc(site.primaryPhone.display)}</span></a>`,
    ...(site.altPhones || []).map((phone) => `<a href="${attr(phoneHref(phone))}"><i data-lucide="phone"></i><span><small>${esc(phone.label || 'Telefono alternativo')}</small>${esc(phone.display)}</span></a>`),
    site.email ? `<a href="mailto:${attr(site.email)}"><i data-lucide="mail"></i><span><small>Correo</small>${esc(site.email)}</span></a>` : '',
    ...(site.socials || []).map((social) => `<a href="${rawAttr(social.url)}" target="_blank" rel="noopener"><i data-lucide="${attr(socialIcon(social))}"></i><span><small>Red social</small>${esc(social.label)}</span></a>`),
    `<a href="${attr(mapSearch(site))}" target="_blank" rel="noopener"><i data-lucide="map-pin"></i><span><small>Direccion</small>${esc(site.address)}</span></a>`,
    `<span><i data-lucide="clock-3"></i><span><small>Horarios</small>${esc(site.hours)}</span></span>`,
  ].filter(Boolean);
  return items.join('\n            ');
}

function footerContact(site) {
  const pieces = [
    `<a href="${attr(phoneHref(site.primaryPhone))}"><i data-lucide="phone"></i>${esc(site.primaryPhone.display)}</a>`,
    site.email ? `<a href="mailto:${attr(site.email)}"><i data-lucide="mail"></i>${esc(site.email)}</a>` : '',
    ...(site.socials || []).map((social) => `<a href="${rawAttr(social.url)}" target="_blank" rel="noopener"><i data-lucide="${attr(socialIcon(social))}"></i>${esc(social.label)}</a>`),
    `<a href="${attr(mapSearch(site))}" target="_blank" rel="noopener"><i data-lucide="map-pin"></i>${esc(site.address)}</a>`,
    `<span><i data-lucide="clock-3"></i>${esc(site.hours)}</span>`,
  ].filter(Boolean);
  return pieces.join('\n        ');
}

function legalSeal(site) {
  const id = site.slug.replace(/[^a-z0-9]+/g, '-');
  return `
        <div class="legal-seal-wrap reveal" aria-hidden="true">
          <svg class="legal-seal" width="178" height="178" viewBox="0 0 200 200" role="presentation">
            <defs>
              <filter id="${id}-seal-ink" x="-5%" y="-5%" width="110%" height="110%">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="noise" seed="11" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.35" />
              </filter>
              <filter id="${id}-seal-speckle">
                <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" seed="5" stitchTiles="stitch" />
                <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.8 0 0 0 0" />
              </filter>
              <mask id="${id}-seal-mask">
                <rect width="200" height="200" fill="white" />
                <rect width="200" height="200" filter="url(#${id}-seal-speckle)" opacity="0.46" />
              </mask>
              <path id="${id}-seal-arc-top" d="M 24 100 A 76 76 0 0 1 176 100" fill="none" />
              <path id="${id}-seal-arc-bottom" d="M 37 100 A 63 63 0 0 0 163 100" fill="none" />
            </defs>
            <g filter="url(#${id}-seal-ink)" mask="url(#${id}-seal-mask)" fill="currentColor" stroke="currentColor">
              <circle cx="100" cy="100" r="96" fill="none" stroke-width="2.5" />
              <circle cx="100" cy="100" r="89" fill="none" stroke-width="1" />
              <circle cx="100" cy="100" r="57" fill="none" stroke-width="1" />
              <text class="legal-seal-arc" font-size="11.5" letter-spacing="2.5" font-weight="600" stroke="none">
                <textPath href="#${id}-seal-arc-top" startOffset="50%" text-anchor="middle">ESTUDIO JURIDICO</textPath>
              </text>
              <text class="legal-seal-arc" font-size="10" letter-spacing="3" font-weight="600" stroke="none">
                <textPath href="#${id}-seal-arc-bottom" startOffset="50%" text-anchor="middle">${site.locationLabel.includes('Punta') ? 'PUNTA DEL ESTE' : 'MALDONADO'} - URUGUAY</textPath>
              </text>
              <circle cx="23" cy="100" r="2" stroke="none" />
              <circle cx="177" cy="100" r="2" stroke="none" />
              <text class="legal-seal-name" x="100" y="94" text-anchor="middle" font-size="28" font-style="italic" stroke="none">${esc(site.seal.line1)}</text>
              <text class="legal-seal-name" x="100" y="118" text-anchor="middle" font-size="24" font-style="italic" stroke="none">${esc(site.seal.line2)}</text>
              <line x1="75" y1="128" x2="125" y2="128" stroke-width="0.75" />
              <text class="legal-seal-meta" x="100" y="144" text-anchor="middle" font-size="8.5" letter-spacing="2.4" font-weight="600" stroke="none">${esc(site.seal.meta)}</text>
            </g>
          </svg>
        </div>`;
}

function html(site) {
  const contactHref = whatsappHref(site);
  const contactAttrs = externalAttrs(contactHref);
  const floatingText = site.whatsappNumber ? '<span><small>Consultanos</small>WhatsApp</span>' : '<span><small>Contacto</small>Llamar</span>';
  const ogImage = imageSrc(site, 'og', 'assets/img/legal-hero-justice.webp');
  const practiceImage = imageSrc(site, 'practice', 'assets/img/legal-office-neutral.png');
  const reviewImage = imageSrc(site, 'review', 'assets/img/legal-symbol-neutral.png');
  const contactImage = imageSrc(site, 'contact', 'assets/img/legal-desk-neutral.png');
  const hasTeam = Boolean(site.team?.groups?.length);
  const teamNavLink = hasTeam ? '<a href="#equipo">Equipo</a>' : '';
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#090b0d" />
  <title>${esc(site.title)}</title>
  <meta name="description" content="${attr(site.description)}" />
  <meta property="og:title" content="${attr(site.fullName)}" />
  <meta property="og:description" content="${attr(site.description)}" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="${attr(ogImage)}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Manrope:wght@400;500;600&display=swap" rel="stylesheet" />
  <script>document.documentElement.classList.add('js', 'motion-armed');</script>
  <link rel="stylesheet" href="styles.css?v=${cache}" />
</head>
<body class="site-${rawAttr(site.slug)}">
  <a class="skip-link" href="#contenido">Saltar al contenido</a>

  <header class="site-header" data-header>
    <div class="shell header-grid">
      <a class="brand" href="#inicio" aria-label="${attr(site.fullName)}, inicio">
        ${brandMark(site)}
        <span class="brand-copy">
          <strong>${esc(site.brandStrong)}</strong>
          <small>${esc(site.brandSmall)}</small>
        </span>
      </a>

      <div class="header-right">
        <div class="header-contact">
          <a href="${attr(mapSearch(site))}" target="_blank" rel="noopener">
            <i data-lucide="map-pin"></i><span>${esc(site.locationLabel)}</span>
          </a>
          <a href="${attr(phoneHref(site.primaryPhone))}"><i data-lucide="phone"></i><span>${esc(site.primaryPhone.display)}</span></a>
          ${socialLinks(site, 'header-socials')}
        </div>
        <nav class="desktop-nav" aria-label="Navegacion principal">
          <a class="active" href="#inicio">Inicio</a>
          <a href="#estudio">Nosotros</a>
          ${teamNavLink}
          <a href="#servicios">Servicios</a>
          <a href="#proceso">Proceso</a>
          <a href="#resenas">Resenas</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </div>

      <button class="menu-button" type="button" aria-label="Abrir menu" aria-expanded="false" data-menu-button>
        <i class="menu-open" data-lucide="menu"></i>
        <i class="menu-close" data-lucide="x"></i>
      </button>
    </div>

    <nav class="mobile-nav" aria-label="Navegacion movil" data-mobile-nav>
      <a href="#inicio">Inicio</a>
      <a href="#estudio">Nosotros</a>
      ${teamNavLink}
      <a href="#servicios">Servicios</a>
      <a href="#proceso">Proceso</a>
      <a href="#resenas">Resenas</a>
      <a href="#preguntas">Preguntas</a>
      <a href="#ubicacion">Ubicacion</a>
      <a href="#contacto">Contacto</a>
      <a class="mobile-call" href="${attr(phoneHref(site.primaryPhone))}"><i data-lucide="phone"></i> Llamar al estudio</a>
      ${socialLinks(site, 'mobile-socials')}
    </nav>
  </header>

  <main id="contenido">
    <section class="hero hero-cinematic hero-has-video" id="inicio" data-hero>
      <div class="hero-bg" data-hero-bg aria-hidden="true">
        <video class="hero-video" data-hero-video autoplay muted loop playsinline preload="auto" poster="assets/img/legal-hero-justice.webp">
          <source src="assets/video/legal-hero-cinematic.mp4" type="video/mp4" />
        </video>
        <img class="hero-image" src="assets/img/legal-hero-justice.webp" alt="" width="1700" height="945" />
      </div>
      <div class="hero-statue" data-hero-statue aria-hidden="true">
        <img class="hero-statue-image" src="assets/img/legal-hero-justice.webp" alt="" width="1700" height="945" />
        <span class="hero-statue-shine" data-hero-shine></span>
      </div>
      <div class="hero-shade" aria-hidden="true"></div>
      <div class="hero-scroll-veil" data-hero-scroll-veil aria-hidden="true"></div>
      <div class="shell hero-content">
        <p class="hero-welcome" data-hero-kicker>${esc(site.heroKicker)}</p>
        <span class="gold-line" data-hero-line aria-hidden="true"></span>
        <h1 class="hero-title" data-hero-title>
          <span>${esc(site.heroTitle[0])}</span>
          <span>${esc(site.heroTitle[1])}</span>
        </h1>
        <p class="hero-lead" data-hero-lead>${esc(site.heroLead)}</p>
        <div class="hero-actions" data-hero-actions>
          <a class="outline-cta" href="${attr(contactHref)}"${contactAttrs}>${esc(site.actionLabel)}</a>
          <a class="round-cta" href="${attr(phoneHref(site.primaryPhone))}" aria-label="Llamar al estudio"><i data-lucide="phone-call"></i></a>
        </div>
      </div>
    </section>

    <section class="practice" id="servicios">
      <div class="shell practice-grid">
${site.services.map(card).join('')}

        <article class="practice-cta reveal">
          <img src="${attr(practiceImage)}" alt="${attr(site.fullName)}" width="1600" height="1200" />
          <span class="practice-cta-shade" aria-hidden="true"></span>
          <div>
            <h2>${esc(site.practiceCtaTitle)}</h2>
            <p>${esc(site.practiceCtaText)}</p>
            <a class="phone-line" href="${attr(phoneHref(site.primaryPhone))}"><i data-lucide="phone-call"></i><span><small>Llamanos ahora</small>${esc(site.primaryPhone.display)}</span></a>
            <a class="solid-cta" href="${attr(contactHref)}"${contactAttrs}>${esc(site.actionLabel)}</a>
          </div>
        </article>
      </div>
    </section>

    <section class="situations" id="situaciones">
      <div class="shell">
        <div class="situations-heading reveal"><div><p class="section-kicker">Situaciones concretas</p><h2>Podemos orientarte si...</h2></div><p>${esc(site.situationsIntro)}</p></div>
        <div class="situations-grid">
${site.situations.map(situation).join('\n')}
        </div>
        <div class="situations-action reveal"><p>${esc(site.situationsAction)}</p><a class="gold-cta" href="#contacto">Contar mi situacion <i data-lucide="arrow-right"></i></a></div>
${legalSeal(site)}
      </div>
    </section>

    <section class="about" id="estudio">
      <div class="shell about-grid">
        <div class="about-copy reveal">
          <p class="section-kicker">Sobre nosotros</p>
          <h2>${esc(site.aboutTitle)}</h2>
          <p>${esc(site.aboutText)}</p>
          <a class="gold-cta" href="#proceso">Conoce como trabajamos <i data-lucide="arrow-right"></i></a>
        </div>
        <div class="about-values" aria-label="Valores del estudio">
${site.values.map(valueBlock).join('')}
        </div>
      </div>
    </section>
${teamSection(site)}

    <section class="process" id="proceso">
      <div class="shell">
        <div class="process-heading reveal">
          <h2>Proceso legal simple</h2>
          <p>Te acompanamos paso a paso con un enfoque claro y profesional.</p>
        </div>
        <ol class="process-list">
          <li class="process-step reveal">
            <span class="step-number">01</span>
            <span class="step-icon"><i data-lucide="calendar-clock"></i></span>
            <h3>Agenda una consulta</h3>
            <p>Escuchamos tu situacion para conocer el punto de partida.</p>
            <span class="process-connector connector-down" aria-hidden="true"><i data-lucide="arrow-down-right"></i></span>
          </li>
          <li class="process-step process-step-down reveal">
            <span class="step-number">02</span>
            <span class="step-icon"><i data-lucide="handshake"></i></span>
            <h3>Revision inicial</h3>
            <p>Identificamos la documentacion y las opciones disponibles.</p>
            <span class="process-connector connector-up" aria-hidden="true"><i data-lucide="arrow-up-right"></i></span>
          </li>
          <li class="process-step reveal">
            <span class="step-number">03</span>
            <span class="step-icon"><i data-lucide="book-open-check"></i></span>
            <h3>Analizamos el caso</h3>
            <p>Te explicamos con claridad los proximos pasos posibles.</p>
            <span class="process-connector connector-down" aria-hidden="true"><i data-lucide="arrow-down-right"></i></span>
          </li>
          <li class="process-step process-step-down reveal">
            <span class="step-number">04</span>
            <span class="step-icon"><i data-lucide="shield-check"></i></span>
            <h3>Gestion y seguimiento</h3>
            <p>Avanzamos manteniendo una comunicacion responsable.</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="reviews" id="resenas">
      <div class="shell reviews-grid">
        <article class="rating-panel reveal">
          <img src="${attr(reviewImage)}" alt="${attr(site.fullName)}" width="1122" height="1402" />
          <span class="rating-shade" aria-hidden="true"></span>
          <div class="rating-copy">
            <div class="rating-line">
              <strong>${esc(site.ratingNumber)}</strong>
              <span class="stars" aria-label="Dato destacado">${site.ratingLabel}</span>
            </div>
            ${site.ratingTitle ? `<h2>${esc(site.ratingTitle)}</h2>` : ''}
          </div>
        </article>
${reviewsArticle(site)}
      </div>
    </section>

    <section class="faq" id="preguntas">
      <div class="shell faq-grid">
        <div class="faq-heading reveal">
          <p class="section-kicker">Preguntas frecuentes</p>
          <h2>Lo esencial antes de tu consulta</h2>
          <p>Informacion practica para dar el primer paso con mayor claridad.</p>
          <a class="text-link" href="${attr(phoneHref(site.primaryPhone))}">Tenes otra pregunta? Llamanos <i data-lucide="arrow-up-right"></i></a>
        </div>

        <div class="faq-list" data-faq-list>
${site.faqs.map(faq).join('')}
        </div>
      </div>
    </section>

    <section class="location" id="ubicacion">
      <div class="shell location-grid">
        <div class="location-copy reveal">
          <p class="section-kicker">Ubicacion</p>
          <h2>En ${esc(site.locationLabel)}</h2>
          <p>Un punto de atencion para coordinar tu consulta y acercar la documentacion necesaria.</p>
          <div class="location-details">
            ${contactDetails(site)}
          </div>
          <a class="gold-cta" href="${attr(mapSearch(site))}" target="_blank" rel="noopener">Como llegar <i data-lucide="external-link"></i></a>
        </div>

        <div class="map-frame reveal">
          <iframe
            title="Ubicacion de ${attr(site.fullName)}"
            src="${attr(mapEmbed(site))}"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen>
          </iframe>
        </div>
      </div>
    </section>

    <section class="contact" id="contacto">
      <img class="contact-image" src="${attr(contactImage)}" alt="${attr(site.fullName)}" width="1700" height="945" />
      <div class="shell contact-shell">
        <form class="contact-form reveal" data-contact-form>
          <h2>Queres coordinar una consulta?</h2>
          <p>Completa los datos y te conectamos con el estudio por telefono.</p>
          <label>
            <span>Nombre completo</span>
            <span class="field"><i data-lucide="user-round"></i><input name="name" autocomplete="name" required placeholder="Nombre completo" /></span>
          </label>
          <label>
            <span>Numero de telefono</span>
            <span class="field"><i data-lucide="phone"></i><input name="phone" autocomplete="tel" required type="tel" placeholder="Numero de telefono" /></span>
          </label>
          <label>
            <span>Motivo de consulta</span>
            <span class="field"><i data-lucide="message-square-text"></i><input name="reason" required placeholder="Motivo de consulta" /></span>
          </label>
          <button type="submit">Llamar al estudio</button>
          <small class="privacy-note">Los datos no se envian automaticamente. El boton abre una llamada al ${esc(site.primaryPhone.display)}.</small>
        </form>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="shell footer-grid">
      <div class="footer-brand">
        <a class="brand" href="#inicio">
          ${brandMark(site)}
          <span class="brand-copy"><strong>${esc(site.brandStrong)}</strong><small>${esc(site.brandSmall)}</small></span>
        </a>
        <p>${esc(site.footerText)}</p>
      </div>
      <div class="footer-links">
        <h2>Enlaces rapidos</h2>
        <a href="#inicio">Inicio</a>
        <a href="#servicios">Servicios</a>
        ${teamNavLink}
        <a href="#proceso">Proceso</a>
        <a href="#resenas">Resenas</a>
        <a href="#preguntas">Preguntas frecuentes</a>
        <a href="#ubicacion">Ubicacion</a>
        <a href="#contacto">Contacto</a>
      </div>
      <div class="footer-links">
        <h2>Servicios</h2>
        ${site.footerServices.map((service) => `<a href="#servicios">${esc(service)}</a>`).join('\n        ')}
      </div>
      <div class="footer-contact">
        <h2>Contacto</h2>
        ${footerContact(site)}
      </div>
    </div>
    <div class="shell footer-bottom">
      <span>© <span data-year></span> ${esc(site.fullName)}.</span>
      <span>La informacion es general y no sustituye asesoramiento legal personalizado.</span>
    </div>
  </footer>

  <a class="whatsapp-float" href="${attr(contactHref)}"${contactAttrs} aria-label="${site.whatsappNumber ? 'Consultar por WhatsApp con' : 'Llamar a'} ${attr(site.fullName)}">
    <i data-lucide="${attr(contactIcon(site))}"></i>
    ${floatingText}
  </a>

  <script defer src="assets/js/lucide.min.js?v=${cache}"></script>
  <script defer src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script defer src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script defer src="main.js?v=${cache}"></script>
</body>
</html>
`;
}

function copyAssets(siteDir) {
  for (const [from, to] of sharedAssets) {
    const source = path.join(root, from);
    const target = path.join(siteDir, to);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(source, target);
  }

  const neutralDir = path.join(root, 'assets-neutrales-legales');
  for (const name of ['legal-office-neutral.png', 'legal-symbol-neutral.png', 'legal-desk-neutral.png']) {
    const source = path.join(neutralDir, name);
    const target = path.join(siteDir, 'assets', 'img', name);
    if (!fs.existsSync(source)) throw new Error(`Falta asset neutral: ${source}`);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(source, target);
  }
}

function writeSite(site) {
  const siteDir = path.join(root, site.slug);
  if (!fs.existsSync(siteDir)) throw new Error(`No existe ${site.slug}`);

  copyAssets(siteDir);

  fs.copyFileSync(path.join(reference, 'styles.css'), path.join(siteDir, 'styles.css'));

  const js = fs
    .readFileSync(path.join(reference, 'main.js'), 'utf8')
    .replace(/\[Cairo Duaso\]/g, `[${site.brandStrong}]`)
    .replace(/window\.location\.href = 'tel:\+59842242433';/g, `window.location.href = 'tel:${site.primaryPhone.e164}';`);
  fs.writeFileSync(path.join(siteDir, 'main.js'), js, 'utf8');
  fs.writeFileSync(path.join(siteDir, 'index.html'), html(site), 'utf8');
}

for (const site of sites) {
  writeSite(site);
  console.log(`OK ${site.slug}`);
}
