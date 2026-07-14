const fs = require("fs");
const path = require("path");

const root = __dirname;
const premiumCss = fs.readFileSync(path.join(root, "legal-premium-v2.css"), "utf8");

const sites = {
  "abogada-biaturi-estudio-juridico": {
    theme: "theme-biaturi",
    contactLabel: "Consultar por WhatsApp",
    h1: "Dra. Florencia Biaturi",
    statement: "Asesoría legal cercana en Maldonado, San Carlos y Punta del Este.",
    lead: "Una consulta directa para explicar tu situación y conocer cómo avanzar.",
    stats: [
      ["5.0", "calificación en Google"],
      ["2", "reseñas públicas"],
      ["3", "ciudades de atención"]
    ],
    services: [
      ["Asesoría legal integral", "Orientación en distintas áreas del Derecho según la situación planteada."],
      ["Consultas jurídicas", "Un primer espacio para explicar el asunto y ordenar la información disponible."],
      ["Atención en tres ciudades", "Coordinación de consultas en Maldonado, San Carlos y Punta del Este."],
      ["Agenda por WhatsApp", "Contacto directo para organizar la consulta por el canal más práctico."]
    ],
    profile: {
      kicker: "Atención local",
      title: "Una consulta directa, en la ciudad que te quede más cerca.",
      copy: "No necesitás identificar de antemano el área jurídica. Podés explicar la situación y coordinar la consulta por WhatsApp.",
      facts: [
        ["Maldonado", "Atención jurídica coordinada"],
        ["San Carlos", "Consultas con agenda previa"],
        ["Punta del Este", "Oficina en parada 15"],
        ["WhatsApp", "Contacto al 091 079 716"]
      ]
    },
    location: {
      label: "Oficina en Punta del Este",
      title: "Coordiná tu consulta y llegá con la ubicación clara.",
      address: "Abraham Lincoln casi Av. Roosevelt, parada 15, Punta del Este.",
      query: "Abogada Biaturi Estudio Jurídico Abraham Lincoln casi Av. Roosevelt parada 15 Punta del Este",
      link: "https://www.google.com/maps/search/?api=1&query=Abogada%20Biaturi%20%C2%B7%20Estudio%20Jur%C3%ADdico%20Abraham%20Lincoln%20casi%20Av.%20Roosevelt%2C%20parada%2015%2C%20Punta%20del%20Este"
    },
    formOptions: ["Asesoría legal", "Consulta jurídica", "Coordinación en Maldonado", "Coordinación en San Carlos", "Coordinación en Punta del Este"]
  },
  "estudio-juridico-caubarrere-asoc": {
    theme: "theme-caubarrere",
    contactLabel: "Llamar al estudio",
    h1: "Caubarrere & Asociados",
    statement: "Cinco décadas de práctica jurídica, notarial y contable.",
    lead: "Abogados, escribanos y contadores con presencia en Punta del Este y Montevideo.",
    stats: [
      ["1975", "año de fundación"],
      ["4.9", "calificación en Google"],
      ["7", "reseñas públicas"]
    ],
    services: [
      ["Derecho civil", "Asesoramiento y gestión de asuntos comprendidos dentro del área civil."],
      ["Derecho laboral", "Consultas y asistencia jurídica vinculadas a relaciones de trabajo."],
      ["Derecho comercial y bancario", "Asistencia para asuntos comerciales, empresariales y bancarios."],
      ["Servicios notariales", "Escrituraciones, títulos automotores, poderes y certificación de firmas."],
      ["Mediación y certificados", "Gestiones de mediación y expedición o tramitación de certificados."],
      ["Área contable y financiera", "Asesoramiento contable y financiero dentro de un equipo integral."]
    ],
    profile: {
      kicker: "Equipo multidisciplinario",
      title: "Tres disciplinas para abordar asuntos que requieren una visión integral.",
      copy: "La estructura del estudio reúne práctica jurídica, notarial y contable, con trayectoria desde 1975.",
      facts: [
        ["Abogados", "Asesoramiento y representación legal"],
        ["Escribanos", "Documentación y gestiones notariales"],
        ["Contadores", "Asesoramiento contable y financiero"],
        ["Idiomas", "Asistencia en inglés y alemán"]
      ]
    },
    location: {
      label: "Oficina en Punta del Este",
      title: "Atención en Design District, sobre Avenida Italia.",
      address: "Design District, Av. Italia esquina, 20100 Punta del Este.",
      query: "Estudio Jurídico Caubarrere Asociados Design District Avenida Italia Punta del Este",
      link: "https://www.google.com/maps/search/?api=1&query=Estudio%20Jur%C3%ADdico%20Caubarrere%20%26%20Asociados%20Design%20District%2C%20Av.%20Italia%20esquina%2C%2020100%20Punta%20del%20Este"
    },
    formOptions: ["Derecho civil", "Derecho laboral", "Derecho comercial o bancario", "Servicio notarial", "Mediación o certificados", "Asesoramiento contable o financiero"]
  },
  "estudio-tellechea-valladarez-asociados": {
    theme: "theme-tellechea",
    contactLabel: "Consultar por WhatsApp",
    h1: "Tellechea Valladarez & Asociados",
    statement: "Servicios jurídicos y notariales en Maldonado.",
    lead: "Consultas, representación y trámites legales con contacto directo.",
    stats: [
      ["5.0", "calificación en Google"],
      ["2", "áreas: jurídica y notarial"],
      ["Centro", "ubicación en Maldonado"]
    ],
    services: [
      ["Asesoramiento jurídico", "Orientación profesional para analizar consultas y definir próximos pasos."],
      ["Servicios notariales", "Atención de gestiones y documentación dentro del área notarial."],
      ["Representación legal", "Asistencia y representación para asuntos que requieren actuación profesional."],
      ["Trámites legales", "Acompañamiento en gestiones y procedimientos jurídicos."],
      ["Servicios de bufete", "Atención desde un estudio con práctica jurídica y notarial."],
      ["Consultas legales", "Primer contacto para presentar la situación y coordinar una consulta."]
    ],
    profile: {
      kicker: "Práctica jurídica y notarial",
      title: "Dos áreas de trabajo, una consulta más ordenada.",
      copy: "El estudio concentra asesoramiento, representación, trámites y servicios notariales en Maldonado Centro.",
      facts: [
        ["Jurídico", "Asesoramiento y representación"],
        ["Notarial", "Gestiones y documentación"],
        ["Trámites", "Acompañamiento profesional"],
        ["Contacto", "WhatsApp al 099 385 888"]
      ]
    },
    location: {
      label: "Maldonado Centro",
      title: "Una oficina accesible para coordinar tu consulta.",
      address: "3 de Febrero, 20000 Maldonado.",
      query: "Estudio Tellechea Valladarez Asociados 3 de Febrero 20000 Maldonado",
      link: "https://www.google.com/maps/search/?api=1&query=Estudio%20Tellechea%20Valladarez%20%26%20Asociados%203%20de%20Febrero%2C%2020000%20Maldonado"
    },
    formOptions: ["Asesoramiento jurídico", "Servicio notarial", "Representación legal", "Trámite legal", "Consulta legal"]
  },
  "estudio-juridico-dra-ana-audiffred-asoc": {
    theme: "theme-audiffred",
    contactLabel: "Consultar por WhatsApp",
    h1: "Ana Audiffred & Asociados",
    statement: "Asesoría jurídica y notarial con atención personalizada.",
    lead: "Más de 18 años de trayectoria y alcance en todo Uruguay.",
    stats: [
      ["18+", "años de trayectoria"],
      ["2", "áreas: jurídica y notarial"],
      ["Uruguay", "alcance de atención"]
    ],
    services: [
      ["Asesoría jurídica", "Orientación para evaluar consultas y organizar los pasos necesarios."],
      ["Asesoría notarial", "Atención de documentación y gestiones dentro del área notarial."],
      ["Resolución de conflictos", "Evaluación profesional de situaciones que requieren una vía legal."],
      ["Representación legal", "Acompañamiento y representación para la gestión del asunto."]
    ],
    profile: {
      kicker: "Trayectoria y alcance",
      title: "Experiencia jurídica y notarial dentro de un mismo estudio.",
      copy: "El estudio trabaja desde Maldonado y comunica asesoramiento para personas de todo el país.",
      facts: [
        ["18+ años", "Trayectoria profesional"],
        ["Jurídico", "Asesoría y representación"],
        ["Notarial", "Documentación y gestiones"],
        ["Todo Uruguay", "Alcance informado por el estudio"]
      ]
    },
    location: {
      label: "Maldonado Centro",
      title: "El estudio se encuentra en Galería Torre Maldonado.",
      address: "Sarandí esquina Ventura Alegre 108, Maldonado.",
      query: "Estudio Jurídico Ana Audiffred Asociados Galería Torre Maldonado Sarandí Ventura Alegre 108 Maldonado",
      link: "https://www.google.com/maps/search/?api=1&query=Estudio%20Jur%C3%ADdico%20Dra.%20Ana%20Audiffred%20%26%20Asociados%20Galer%C3%ADa%20Torre%20Maldonado%2C%20Sarand%C3%AD%20esq.%20Ventura%20Alegre%20108%2C%20Maldonado"
    },
    formOptions: ["Asesoría jurídica", "Asesoría notarial", "Resolución de conflictos", "Representación legal"]
  }
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderStats(stats) {
  return `<section class="proof-band" aria-label="Datos destacados"><div class="shell proof-band__grid">${stats
    .map(([value, label]) => `<div class="proof-stat"><strong>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></div>`)
    .join("")}</div></section>`;
}

function renderServices(services) {
  return `<div class="services__grid premium-services">${services
    .map(([title, copy], index) => `<a class="service reveal" href="#contacto"><span class="service__number">${String(index + 1).padStart(2, "0")}</span><div class="service__body"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(copy)}</p></div><span class="service__link" aria-hidden="true">↗</span></a>`)
    .join("")}</div>`;
}

function renderProfile(profile) {
  return `<section class="profile-strip"><div class="shell profile-strip__grid"><div class="profile-strip__intro reveal"><span>${escapeHtml(profile.kicker)}</span><h2>${escapeHtml(profile.title)}</h2><p>${escapeHtml(profile.copy)}</p></div><div class="profile-strip__facts">${profile.facts
    .map(([title, copy]) => `<article class="reveal"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(copy)}</span></article>`)
    .join("")}</div></div></section>`;
}

function renderLocation(location, businessName) {
  const embed = `https://www.google.com/maps?q=${encodeURIComponent(location.query)}&output=embed`;
  return `<section class="location-v2" id="ubicacion"><div class="location-v2__grid"><div class="location-v2__map"><iframe title="Ubicación de ${escapeHtml(businessName)}" src="${embed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div><div class="location-v2__copy reveal"><span>${escapeHtml(location.label)}</span><h2>${escapeHtml(location.title)}</h2><p>${escapeHtml(location.address)}</p><a class="button button--primary" href="${location.link}" target="_blank" rel="noopener">Abrir en Google Maps</a></div></div></section>`;
}

for (const [site, config] of Object.entries(sites)) {
  const siteDir = path.join(root, site);
  const htmlPath = path.join(siteDir, "index.html");
  let html = fs.readFileSync(htmlPath, "utf8");

  fs.writeFileSync(path.join(siteDir, "premium-v2.css"), premiumCss, "utf8");

  html = html.replace(/<link rel="stylesheet" href="premium-v2\.css\?v=[^"]+"\s*\/?>\s*/g, "");
  html = html.replace(/(<link rel="stylesheet" href="styles\.css\?v=[^"]+"\s*\/?>)/, `$1\n  <link rel="stylesheet" href="premium-v2.css?v=20260713b" />`);
  html = html.replace(/<body class="([^"]*)"/, (_match, classes) => {
    const cleaned = classes.replace(/\bpremium-v2\b/g, "").replace(/\btheme-[\w-]+\b/g, "").replace(/\s+/g, " ").trim();
    return `<body class="${cleaned} premium-v2 ${config.theme}"`;
  });

  html = html.replace(/<h1 class="([^"]+) reveal">[\s\S]*?<\/h1>/, `<h1 class="$1 reveal">${escapeHtml(config.h1)}</h1>`);
  html = html.replace(/<p class="hero__statement reveal">[\s\S]*?<\/p>/, `<p class="hero__statement reveal">${escapeHtml(config.statement)}</p>`);
  html = html.replace(/<p class="hero__lead reveal">[\s\S]*?<\/p>/, `<p class="hero__lead reveal">${escapeHtml(config.lead)}</p>`);
  html = html.replace(/<span>(?:Escribir ahora|Llamar ahora)<\/span>/g, `<span>${escapeHtml(config.contactLabel)}</span>`);
  html = html.replace(/<span>Iniciar una consulta<\/span>/g, `<span>${escapeHtml(config.contactLabel)}</span>`);

  html = html.replace(/<section class="proof-band"[\s\S]*?<\/section>/, renderStats(config.stats));
  html = html.replace(/<div class="services__grid(?: premium-services)?">[\s\S]*?<\/div>\s*(?=<\/div>\s*<\/section>)/, renderServices(config.services));

  const profile = renderProfile(config.profile);
  if (html.includes('<section class="profile-strip">')) {
    html = html.replace(/<section class="profile-strip">[\s\S]*?<\/section>/, profile);
  } else {
    html = html.replace('</section><section class="section process" id="proceso">', `</section>${profile}<section class="section process" id="proceso">`);
  }

  const location = renderLocation(config.location, config.h1);
  if (html.includes('<section class="location-v2"')) {
    html = html.replace(/<section class="location-v2"[\s\S]*?<\/section>/, location);
  } else {
    html = html.replace('<section class="section contact" id="contacto">', `${location}<section class="section contact" id="contacto">`);
  }

  const optionMarkup = `<option value="">Seleccionar</option>${config.formOptions.map((option) => `<option>${escapeHtml(option)}</option>`).join("")}`;
  html = html.replace(/(<select id="area-[^"]+" name="area" required>)[\s\S]*?(<\/select>)/, `$1${optionMarkup}$2`);

  html = html.replace(/<a href="#situaciones">Casos frecuentes<\/a>/g, "");
  html = html.replace(/(<a href="#servicios">Servicios<\/a>)/g, `$1\n        <a href="#situaciones">Casos frecuentes</a>`);
  html = html.replace(/<a href="#situaciones">Casos frecuentes<\/a>\s*<a href="#situaciones">Casos frecuentes<\/a>/g, '<a href="#situaciones">Casos frecuentes</a>');

  fs.writeFileSync(htmlPath, html, "utf8");
}

console.log(`Rediseño aplicado a ${Object.keys(sites).length} sitios.`);
