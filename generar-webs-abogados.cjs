const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = __dirname;
const PROSPECTOS = path.join(ROOT, 'prospectos');
const VERSION = '20260712';
const GENERATED_MARKER = '.generado-web-abogados';

const nodeModules = path.join(ROOT, 'estudio-juridico-estandar', 'node_modules');
const React = require(path.join(nodeModules, 'react'));
const { renderToStaticMarkup } = require(path.join(nodeModules, 'react-dom', 'server'));
const Lucide = require(path.join(nodeModules, 'lucide-react'));

const sites = [
  {
    slug: 'estudio-juridico-cairo-duaso',
    name: 'Estudio Jurídico Cairo Duaso',
    shortName: 'Cairo Duaso',
    monogram: 'CD',
    niche: 'Estudio jurídico',
    location: 'Maldonado Centro',
    address: 'Calle 3 de Febrero esquina, 20000 Maldonado',
    phone: '4224 2433',
    whatsapp: false,
    email: '',
    hours: 'Lunes a viernes de 10:00 a 18:00 · Sábados de 11:00 a 15:00',
    hero: 'foto1.jpg',
    heroAlt: 'Fachada del Estudio Jurídico Cairo Duaso en Maldonado',
    heroVariant: 'full',
    objectPosition: 'center 58%',
    colors: { accent: '#b99468', accent2: '#8f2f3e', ink: '#171315', paper: '#f4efe8', surface: '#211b1e' },
    tagline: 'Asesoramiento legal claro para decisiones importantes.',
    lead: 'Asesoramiento y representación legal para particulares y empresas en Maldonado, con atención personalizada y comunicación clara.',
    aboutTitle: 'Tu caso, explicado con claridad',
    aboutText: 'El estudio acompaña consultas y gestiones legales con una atención cercana. El objetivo es que conozcas tus opciones y entiendas cada paso antes de avanzar.',
    services: [
      'Asesoramiento jurídico',
      'Representación legal',
      'Resolución de asuntos legales',
      'Atención personalizada',
      'Asistencia legal para particulares',
      'Asistencia legal para empresas',
    ],
    points: ['Atención personalizada', 'Asistencia a particulares y empresas', 'Seguimiento claro de cada gestión'],
    stats: [
      { value: '5.0', label: 'calificación en Google' },
      { value: '9', label: 'reseñas registradas' },
      { value: 'Centro', label: 'Maldonado' },
    ],
    rating: 5,
    reviews: 9,
    testimonials: [
      {
        text: 'Excelente!!! Soy clienta hace años: Seriedad, Profesionalismo, Rapidez, Seguridad y una Amabilidad y Atención digna de destacar. Súper recomendable!',
        author: '',
      },
    ],
    faq: [
      ['¿Cómo puedo contactar al estudio?', 'Podés llamar al 4224 2433 o acercarte a la oficina dentro del horario de atención.'],
      ['¿Atienden a particulares y empresas?', 'Sí. El estudio brinda asistencia legal tanto a particulares como a empresas.'],
      ['¿Dónde están ubicados?', 'En Calle 3 de Febrero esquina, Maldonado Centro.'],
      ['¿Qué documentación debo llevar?', 'Depende del motivo de consulta. En el primer contacto el estudio puede indicarte qué documentos conviene presentar.'],
    ],
  },
  {
    slug: 'estudio-dr-claudio-rodriguez-la-cruz',
    name: 'Estudio Dr. Claudio Rodríguez La Cruz',
    shortName: 'Rodríguez La Cruz',
    monogram: 'RC',
    niche: 'Derecho penal y laboral',
    location: 'Maldonado Centro',
    address: 'Román Guerra, 20000 Maldonado',
    phone: '099 813 012',
    whatsapp: true,
    email: 'crodriguezlacruz@gmail.com',
    hours: 'Urgencias legales las 24 horas, los 365 días',
    hero: 'foto1.jpg',
    heroAlt: 'Retrato profesional del Dr. Claudio Rodríguez La Cruz',
    heroVariant: 'split',
    objectPosition: 'center 28%',
    colors: { accent: '#c7a56b', accent2: '#7a2733', ink: '#101317', paper: '#f1eee8', surface: '#1b2026' },
    tagline: 'Defensa y asistencia jurídica cuando cada decisión importa.',
    lead: 'Atención en derecho penal, accidentes de tránsito y derecho laboral, con urgencias legales disponibles las 24 horas.',
    aboutTitle: 'Respuesta jurídica cuando el tiempo importa',
    aboutText: 'Más de veinte años de experiencia en asistencia penal y otras áreas sensibles, con atención a indagados, acusados y denunciantes.',
    services: [
      'Urgencias legales 24 horas',
      'Derecho penal',
      'Accidentes de tránsito',
      'Derecho laboral',
      'Legislación sobre armas de fuego',
      'Legítima defensa',
      'Aspectos legales vinculados a Internet',
      'Asistencia a indagados o acusados',
      'Asistencia a denunciantes',
      'Docencia y capacitación en derecho penal',
    ],
    points: ['Más de 20 años de experiencia', 'Urgencias legales 24 horas, todo el año', 'Práctica enfocada en derecho penal'],
    stats: [
      { value: '20+', label: 'años de experiencia' },
      { value: '24 h', label: 'urgencias legales' },
      { value: '365', label: 'días de atención urgente' },
    ],
    rating: 4,
    reviews: 24,
    testimonials: [],
    faq: [
      ['¿Atienden urgencias legales?', 'Sí. El estudio informa atención de urgencias legales las 24 horas, durante todo el año.'],
      ['¿Qué áreas trabaja el estudio?', 'Derecho penal, accidentes de tránsito, derecho laboral, armas de fuego, legítima defensa y asuntos legales vinculados a Internet.'],
      ['¿Asisten tanto a denunciantes como a personas acusadas?', 'Sí. Entre los servicios publicados figuran la asistencia a denunciantes y a personas indagadas o acusadas.'],
      ['¿Cómo inicio una consulta?', 'Podés comunicarte por teléfono, WhatsApp o correo electrónico y explicar brevemente la situación.'],
    ],
  },
  {
    slug: 'estudio-juridico-dra-ana-audiffred-asoc',
    name: 'Estudio Jurídico Dra. Ana Audiffred & Asociados',
    shortName: 'Ana Audiffred & Asociados',
    monogram: 'AA',
    niche: 'Estudio jurídico notarial',
    location: 'Maldonado Centro',
    address: 'Galería Torre Maldonado, Sarandí esq. Ventura Alegre 108, Maldonado',
    phone: '099 934 004',
    secondaryPhone: '+598 4223 7209',
    whatsapp: true,
    email: 'est.juridicoaudiffred@gmail.com',
    hours: '',
    logo: 'logo.jpg',
    logoAlt: 'Logo del Estudio Jurídico Notarial Ana Audiffred y Asociados',
    heroVariant: 'logo',
    colors: { accent: '#e2bd49', accent2: '#91835f', ink: '#111212', paper: '#f5f0e3', surface: '#333433' },
    tagline: 'Asesoría jurídica y notarial con atención personalizada.',
    lead: 'Más de 18 años de trayectoria, con consultas en Maldonado y asesoramiento para personas de todo el país.',
    aboutTitle: 'Experiencia jurídica y notarial en un mismo estudio',
    aboutText: 'El estudio reúne asesoría jurídica, notarial y representación legal, con un enfoque personalizado para acompañar cada consulta.',
    services: [
      'Asesoría jurídica',
      'Asesoría notarial',
      'Resolución de conflictos legales',
      'Atención personalizada',
      'Representación legal',
      'Asesoramiento en todo el país',
    ],
    points: ['Más de 18 años de trayectoria', 'Servicios jurídicos y notariales', 'Asesoramiento en todo Uruguay'],
    stats: [
      { value: '18+', label: 'años de trayectoria' },
      { value: '2 áreas', label: 'jurídica y notarial' },
      { value: 'Uruguay', label: 'alcance de atención' },
    ],
    rating: 3.7,
    reviews: null,
    testimonials: [],
    instagram: 'https://www.instagram.com/estudioanaaudiffred/',
    faq: [
      ['¿El estudio también brinda servicios notariales?', 'Sí. Se presenta públicamente como estudio jurídico notarial.'],
      ['¿Atienden consultas fuera de Maldonado?', 'Sí. El estudio informa asesoramiento en todo el país.'],
      ['¿Dónde está la oficina?', 'En Galería Torre Maldonado, Sarandí esquina Ventura Alegre 108.'],
      ['¿Cómo puedo agendar una consulta?', 'Podés comunicarte por WhatsApp, teléfono o correo electrónico.'],
    ],
  },
  {
    slug: 'abogado-bermar-calcerrada',
    name: 'Abogado Bermar Calcerrada',
    shortName: 'Bermar Calcerrada',
    monogram: 'BC',
    niche: 'Derecho laboral y de familia',
    location: 'Maldonado Centro',
    address: 'Ventura Alegre, 20000 Maldonado',
    phone: '099 595 615',
    whatsapp: true,
    email: '',
    hours: 'Consultas con agenda previa',
    hero: 'foto1.jpg',
    heroAlt: 'Imagen institucional del Estudio Jurídico Bermar Calcerrada Badiola',
    heroVariant: 'split',
    objectPosition: 'center center',
    mediaFit: 'contain',
    colors: { accent: '#d1ad78', accent2: '#9b4f3f', ink: '#171313', paper: '#f3eee7', surface: '#251c1b' },
    tagline: 'Soluciones reales en derecho laboral y de familia.',
    lead: 'Asesoramiento, representación y trámites legales desde Maldonado Centro, con consultas coordinadas previamente.',
    aboutTitle: 'Una práctica enfocada en resolver',
    aboutText: 'Atención de consultas y conflictos laborales, asuntos de familia y trámites legales con acompañamiento profesional.',
    services: [
      'Derecho laboral',
      'Derecho de familia',
      'Trámites legales',
      'Asesoramiento jurídico',
      'Consultas legales',
      'Representación en conflictos laborales',
    ],
    points: ['Práctica en derecho laboral', 'Asuntos de familia', 'Consultas coordinadas previamente'],
    stats: [
      { value: '4.9', label: 'calificación en Google' },
      { value: '46+', label: 'reseñas registradas' },
      { value: 'Centro', label: 'Maldonado' },
    ],
    rating: 4.9,
    reviews: 46,
    testimonials: [],
    faq: [
      ['¿Qué áreas trabaja el estudio?', 'Principalmente derecho laboral, derecho de familia, trámites y asesoramiento jurídico.'],
      ['¿Las consultas requieren agenda?', 'Sí. La información pública del estudio indica que las consultas se coordinan previamente.'],
      ['¿Dónde está ubicado?', 'En la zona de Ventura Alegre, Maldonado Centro.'],
      ['¿Cómo puedo consultar?', 'Podés comunicarte por WhatsApp o teléfono al 099 595 615.'],
    ],
  },
  {
    slug: 'estudio-tellechea-valladarez-asociados',
    name: 'Estudio Tellechea Valladarez & Asociados',
    shortName: 'Tellechea Valladarez',
    monogram: 'TV',
    niche: 'Estudio jurídico notarial',
    location: 'Maldonado Centro',
    address: '3 de Febrero, 20000 Maldonado',
    phone: '099 385 888',
    whatsapp: true,
    email: '',
    hours: '',
    hero: 'foto1.jpg',
    heroAlt: 'Fachada del Estudio Tellechea Valladarez y Asociados',
    heroVariant: 'full',
    objectPosition: 'center 55%',
    colors: { accent: '#c2a36f', accent2: '#476c61', ink: '#121817', paper: '#f1f1eb', surface: '#1c2925' },
    tagline: 'Servicios jurídicos y notariales en Maldonado.',
    lead: 'Consultas, representación y trámites legales desde un estudio con práctica jurídica y notarial.',
    aboutTitle: 'Asesoramiento jurídico y notarial cercano',
    aboutText: 'El estudio concentra servicios de bufete, escribanía y representación legal para acompañar consultas y gestiones en Maldonado.',
    services: [
      'Asesoramiento jurídico',
      'Servicios de bufete',
      'Servicios notariales',
      'Representación legal',
      'Trámites legales',
      'Consultas legales',
    ],
    points: ['Servicios jurídicos', 'Atención notarial', 'Consultas y trámites legales'],
    stats: [
      { value: '5.0', label: 'calificación en Google' },
      { value: '2 áreas', label: 'jurídica y notarial' },
      { value: 'Centro', label: 'Maldonado' },
    ],
    rating: 5,
    reviews: null,
    testimonials: [],
    faq: [
      ['¿El estudio brinda servicios notariales?', 'Sí. La información pública confirma actividad jurídica y notarial.'],
      ['¿Qué gestiones puedo consultar?', 'Asesoramiento, representación, trámites y consultas legales, además de servicios notariales.'],
      ['¿Dónde está ubicado?', 'En la calle 3 de Febrero, Maldonado Centro.'],
      ['¿Cómo puedo comunicarme?', 'Podés escribir por WhatsApp o llamar al 099 385 888.'],
    ],
  },
  {
    slug: 'estudio-juridico-caubarrere-asoc',
    name: 'Estudio Jurídico Caubarrere & Asociados',
    shortName: 'Caubarrere & Asociados',
    monogram: 'CA',
    niche: 'Estudio jurídico integral',
    location: 'Punta del Este',
    address: 'Design District, Av. Italia esquina, 20100 Punta del Este',
    phone: '4249 2709',
    secondaryPhone: '099 903 534',
    whatsapp: false,
    email: 'estudio@estudiocaubarrere.com',
    hours: '',
    hero: 'foto1.jpg',
    secondary: 'foto2.jpg',
    logo: 'logo.jpg',
    heroAlt: 'Fachada del Estudio Jurídico Caubarrere y Asociados en Punta del Este',
    secondaryAlt: 'Oficinas del Estudio Caubarrere y Asociados',
    logoAlt: 'Logo del Estudio Caubarrere y Asociados',
    heroVariant: 'full',
    objectPosition: 'center 48%',
    colors: { accent: '#d0ae76', accent2: '#8b2836', ink: '#171315', paper: '#f4efe7', surface: '#2a181c' },
    tagline: 'Cinco décadas de práctica jurídica, notarial y contable.',
    lead: 'Desde 1975, un equipo de abogados, escribanos y contadores brinda asistencia integral en Punta del Este y Montevideo.',
    aboutTitle: 'Tradición profesional desde 1975',
    aboutText: 'Una práctica multidisciplinaria que integra servicios jurídicos, notariales, contables y financieros para personas y empresas.',
    services: [
      'Derecho civil',
      'Derecho laboral',
      'Derecho comercial',
      'Derecho bancario',
      'Escrituraciones',
      'Títulos automotores',
      'Poderes',
      'Certificación de firmas',
      'Mediación',
      'Certificados',
      'Asesoramiento contable y financiero',
    ],
    points: ['Desde 1975', 'Abogados, escribanos y contadores', 'Asistencia en inglés y alemán'],
    stats: [
      { value: '1975', label: 'año de fundación' },
      { value: '4.9', label: 'calificación en Google' },
      { value: '3 áreas', label: 'jurídica, notarial y contable' },
    ],
    rating: 4.9,
    reviews: 7,
    testimonials: [],
    faq: [
      ['¿Qué profesionales integran el estudio?', 'El equipo reúne abogados, escribanos y contadores.'],
      ['¿Atienden en otros idiomas?', 'Sí. El estudio informa asistencia en inglés y alemán mediante el 099 903 534.'],
      ['¿Qué áreas cubren?', 'Derecho civil, laboral, comercial y bancario; servicios notariales; mediación; certificados y asesoramiento contable y financiero.'],
      ['¿Dónde se encuentra la oficina?', 'En Design District, avenida Italia, Punta del Este.'],
    ],
  },
  {
    slug: 'abogada-biaturi-estudio-juridico',
    name: 'Abogada Biaturi · Estudio Jurídico',
    shortName: 'Florencia Biaturi',
    monogram: 'FB',
    niche: 'Abogada y asesoría legal',
    location: 'Punta del Este',
    address: 'Abraham Lincoln casi Av. Roosevelt, parada 15, Punta del Este',
    phone: '091 079 716',
    whatsapp: true,
    email: 'dra.f.biaturi@gmail.com',
    hours: '',
    hero: 'foto1.jpg',
    heroAlt: 'Fachada del estudio de la Dra. Florencia Biaturi en Punta del Este',
    heroVariant: 'split',
    objectPosition: 'center 43%',
    colors: { accent: '#d5a66f', accent2: '#47717a', ink: '#11191b', paper: '#f2f0ea', surface: '#1b2a2e' },
    tagline: 'Asesoría legal cercana en Maldonado y Punta del Este.',
    lead: 'Consultas en distintas áreas del Derecho, con atención en Maldonado, San Carlos y Punta del Este.',
    aboutTitle: 'Atención legal cercana, en tres ciudades',
    aboutText: 'La Dra. Florencia Biaturi brinda asesoría y consultas jurídicas con coordinación directa por WhatsApp.',
    services: [
      'Asesoría legal en distintas áreas del Derecho',
      'Consultas jurídicas',
      'Atención en Maldonado',
      'Atención en San Carlos',
      'Atención en Punta del Este',
      'Agenda de consultas por WhatsApp',
    ],
    points: ['Atención en Maldonado', 'Consultas en San Carlos', 'Oficina en Punta del Este'],
    stats: [
      { value: '5.0', label: 'calificación en Google' },
      { value: '3', label: 'ciudades de atención' },
      { value: 'Directo', label: 'contacto por WhatsApp' },
    ],
    rating: 5,
    reviews: 2,
    testimonials: [],
    instagram: 'https://www.instagram.com/fba_serviciosjuridicos/',
    faq: [
      ['¿En qué ciudades atiende?', 'En Maldonado, San Carlos y Punta del Este.'],
      ['¿Cómo puedo agendar una consulta?', 'Podés coordinar directamente por WhatsApp al 091 079 716.'],
      ['¿Dónde está la oficina de Punta del Este?', 'En Abraham Lincoln casi avenida Roosevelt, parada 15.'],
      ['¿Qué tipo de consultas recibe?', 'La información pública indica asesoría legal en distintas áreas del Derecho.'],
    ],
  },
];

const iconNames = ['Scale', 'BriefcaseBusiness', 'FileText', 'Landmark', 'Handshake', 'ShieldCheck'];

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function icon(name, className = '') {
  const Component = Lucide[name] || Lucide.Circle;
  return renderToStaticMarkup(
    React.createElement(Component, {
      className: `icon ${className}`.trim(),
      'aria-hidden': 'true',
      focusable: 'false',
      strokeWidth: 1.6,
    }),
  );
}

function digits(value) {
  return String(value || '').replace(/\D/g, '');
}

function internationalNumber(phone) {
  const clean = digits(phone);
  if (clean.startsWith('598')) return clean;
  if (clean.startsWith('0')) return `598${clean.slice(1)}`;
  return `598${clean}`;
}

function telHref(phone) {
  return `tel:+${internationalNumber(phone)}`;
}

function mapHref(site) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.name} ${site.address}`)}`;
}

function convertToWebp(source, target) {
  const result = spawnSync(
    'ffmpeg',
    ['-hide_banner', '-loglevel', 'error', '-y', '-i', source, '-c:v', 'libwebp', '-quality', '84', '-compression_level', '6', target],
    { encoding: 'utf8' },
  );
  if (result.status !== 0) {
    throw new Error(`No se pudo convertir ${source}: ${result.stderr || result.error || 'error desconocido'}`);
  }
}

function prepareTarget(site) {
  const target = path.join(ROOT, site.slug);
  if (fs.existsSync(target)) {
    if (!fs.existsSync(path.join(target, GENERATED_MARKER))) {
      throw new Error(`La carpeta ${site.slug} ya existe y no fue generada por este script.`);
    }
    fs.rmSync(target, { recursive: true, force: true });
  }
  fs.mkdirSync(path.join(target, 'assets', 'img'), { recursive: true });
  fs.writeFileSync(path.join(target, GENERATED_MARKER), `Generado ${new Date().toISOString()}\n`, 'utf8');

  const sourceDir = path.join(PROSPECTOS, site.slug, 'fotos');
  const imageDir = path.join(target, 'assets', 'img');
  if (site.hero) convertToWebp(path.join(sourceDir, site.hero), path.join(imageDir, 'hero.webp'));
  if (site.secondary) convertToWebp(path.join(sourceDir, site.secondary), path.join(imageDir, 'secondary.webp'));
  if (site.logo) convertToWebp(path.join(sourceDir, site.logo), path.join(imageDir, 'logo.webp'));
  return target;
}

function brandMarkup(site) {
  const mark = site.logo
    ? `<span class="brand__mark brand__mark--logo"><img src="assets/img/logo.webp" alt="" /></span>`
    : `<span class="brand__mark"><span>${escapeHtml(site.monogram)}</span></span>`;
  return `${mark}<span class="brand__text"><strong>${escapeHtml(site.shortName)}</strong><small>${escapeHtml(site.niche)}</small></span>`;
}

function primaryAction(site, label = '') {
  if (site.whatsapp) {
    const href = `https://wa.me/${internationalNumber(site.phone)}?text=${encodeURIComponent(`Hola, quisiera hacer una consulta con ${site.shortName}.`)}`;
    return `<a class="button button--primary" href="${href}" target="_blank" rel="noopener">${icon('MessageCircle')}<span>${escapeHtml(label || 'Consultar por WhatsApp')}</span>${icon('ArrowUpRight', 'button__arrow')}</a>`;
  }
  return `<a class="button button--primary" href="${telHref(site.phone)}">${icon('Phone')}<span>${escapeHtml(label || 'Llamar al estudio')}</span>${icon('ArrowUpRight', 'button__arrow')}</a>`;
}

function renderUtility(site) {
  const email = site.email
    ? `<a href="mailto:${escapeHtml(site.email)}">${icon('Mail')}<span>${escapeHtml(site.email)}</span></a>`
    : '';
  return `<div class="utility"><div class="shell utility__inner"><span>${escapeHtml(site.location)}</span><div>${email}<a href="${telHref(site.phone)}">${icon('Phone')}<span>${escapeHtml(site.phone)}</span></a></div></div></div>`;
}

function renderHeader(site) {
  return `<header class="site-header" data-header>
    ${renderUtility(site)}
    <div class="shell nav-shell">
      <a class="brand" href="#inicio" aria-label="Ir al inicio">${brandMarkup(site)}</a>
      <nav class="desktop-nav" aria-label="Navegación principal">
        <a href="#estudio">Estudio</a>
        <a href="#servicios">Servicios</a>
        <a href="#proceso">Proceso</a>
        ${site.testimonials.length ? '<a href="#resenas">Reseñas</a>' : ''}
        <a href="#contacto">Contacto</a>
      </nav>
      <a class="nav-contact" href="${site.whatsapp ? `https://wa.me/${internationalNumber(site.phone)}` : telHref(site.phone)}" ${site.whatsapp ? 'target="_blank" rel="noopener"' : ''}>${site.whatsapp ? icon('MessageCircle') : icon('Phone')}<span>${escapeHtml(site.phone)}</span></a>
      <button class="menu-button" type="button" aria-label="Abrir menú" aria-expanded="false" data-menu-button>
        <span class="menu-open">${icon('Menu')}</span><span class="menu-close">${icon('X')}</span>
      </button>
    </div>
    <nav class="mobile-nav" aria-label="Navegación móvil" data-mobile-nav>
      <a href="#estudio">Estudio</a><a href="#servicios">Servicios</a><a href="#proceso">Proceso</a>${site.testimonials.length ? '<a href="#resenas">Reseñas</a>' : ''}<a href="#contacto">Contacto</a>
      ${primaryAction(site, site.whatsapp ? 'Escribir ahora' : 'Llamar ahora')}
    </nav>
  </header>`;
}

function renderHeroMedia(site) {
  if (site.hero) {
    return `<figure class="hero__media reveal" style="--object-position:${escapeHtml(site.objectPosition || 'center')};--object-fit:${escapeHtml(site.mediaFit || 'cover')}">
      <img src="assets/img/hero.webp" alt="${escapeHtml(site.heroAlt)}" width="1600" height="1200" />
      <figcaption><span>${escapeHtml(site.niche)}</span><strong>${escapeHtml(site.location)}</strong></figcaption>
    </figure>`;
  }
  return `<figure class="hero__media hero__media--logo reveal">
    <img src="assets/img/logo.webp" alt="${escapeHtml(site.logoAlt)}" width="500" height="500" />
  </figure>`;
}

function renderHero(site) {
  const locationAction = `<a class="button button--ghost" href="${mapHref(site)}" target="_blank" rel="noopener">${icon('MapPin')}<span>Ver ubicación</span></a>`;
  const fullBackdrop = site.heroVariant === 'full' && site.hero
    ? `<div class="hero__backdrop" aria-hidden="true"><img src="assets/img/hero.webp" alt="" style="object-position:${escapeHtml(site.objectPosition || 'center')}" /><span></span></div>`
    : '';
  const sideMedia = site.heroVariant === 'full' ? '' : renderHeroMedia(site);
  const titleClass = site.name.length > 43 ? 'title-xlong' : site.name.length > 31 ? 'title-long' : '';

  return `<section class="hero hero--${escapeHtml(site.heroVariant)}" id="inicio">
    ${fullBackdrop}
    <div class="shell hero__grid">
      <div class="hero__copy">
        <p class="eyebrow reveal"><span></span>${escapeHtml(site.niche)} · ${escapeHtml(site.location)}</p>
        <h1 class="${titleClass} reveal">${escapeHtml(site.name)}</h1>
        <p class="hero__statement reveal">${escapeHtml(site.tagline)}</p>
        <p class="hero__lead reveal">${escapeHtml(site.lead)}</p>
        <div class="hero__actions reveal">${primaryAction(site)}${locationAction}</div>
        <div class="hero__details reveal">
          <span>${icon('Phone')} ${escapeHtml(site.phone)}</span>
          ${site.hours ? `<span>${icon('Clock3')} ${escapeHtml(site.hours)}</span>` : ''}
        </div>
      </div>
      ${sideMedia}
    </div>
  </section>`;
}

function renderStats(site) {
  return `<section class="proof-band" aria-label="Datos destacados"><div class="shell proof-band__grid">${site.stats
    .map((stat) => `<div class="proof-stat"><strong>${escapeHtml(stat.value)}</strong><span>${escapeHtml(stat.label)}</span></div>`)
    .join('')}</div></section>`;
}

function renderServices(site) {
  return `<section class="section services" id="servicios">
    <div class="shell">
      <div class="section-heading reveal"><div><p class="eyebrow"><span></span>Áreas de práctica</p><h2>Consultas y servicios</h2></div><p>Conocé las áreas publicadas por el estudio y elegí el motivo de tu consulta.</p></div>
      <div class="services__grid">${site.services
        .map((service, index) => `<a class="service reveal" href="#contacto"><span class="service__number">${String(index + 1).padStart(2, '0')}</span>${icon(iconNames[index % iconNames.length], 'service__icon')}<h3>${escapeHtml(service)}</h3><span class="service__link" aria-hidden="true">${icon('ArrowUpRight')}</span></a>`)
        .join('')}</div>
    </div>
  </section>`;
}

function renderAbout(site) {
  const secondPhoto = site.secondary
    ? `<figure class="about__photo reveal"><img src="assets/img/secondary.webp" alt="${escapeHtml(site.secondaryAlt)}" width="1600" height="927" /></figure>`
    : `<div class="about__signature reveal" aria-hidden="true"><span>${escapeHtml(site.monogram)}</span><small>${escapeHtml(site.shortName)}</small></div>`;
  return `<section class="section about" id="estudio">
    <div class="shell about__grid">
      <div class="about__copy reveal"><p class="eyebrow"><span></span>El estudio</p><h2>${escapeHtml(site.aboutTitle)}</h2><p>${escapeHtml(site.aboutText)}</p>
        <ul>${site.points.map((point) => `<li>${icon('Check')}<span>${escapeHtml(point)}</span></li>`).join('')}</ul>
        ${primaryAction(site, 'Iniciar una consulta')}
      </div>
      ${secondPhoto}
    </div>
  </section>`;
}

function renderProcess(site) {
  const steps = [
    ['Primer contacto', `Contanos brevemente la situación por teléfono${site.whatsapp ? ' o WhatsApp' : ''}.`],
    ['Revisión inicial', 'El estudio identifica la documentación y el área que corresponde.'],
    ['Orientación', 'Recibís una explicación clara sobre los próximos pasos posibles.'],
    ['Seguimiento', 'La gestión continúa con comunicación durante cada etapa.'],
  ];
  return `<section class="section process" id="proceso"><div class="shell"><div class="process__heading reveal"><p class="eyebrow"><span></span>Cómo trabajamos</p><h2>Un proceso legal claro</h2><p>Cuatro pasos simples para pasar de la consulta inicial a una orientación concreta.</p></div><ol class="process__steps">${steps
    .map((step, index) => `<li class="process-step reveal"><span class="process-step__number">0${index + 1}</span><span class="process-step__icon">${icon(['Phone', 'FileSearch', 'MessagesSquare', 'ShieldCheck'][index])}</span><h3>${step[0]}</h3><p>${step[1]}</p></li>`)
    .join('')}</ol></div></section>`;
}

function renderTestimonials(site) {
  if (!site.testimonials.length) return '';
  const stars = Array.from({ length: 5 }, () => icon('Star', 'star-filled')).join('');
  return `<section class="section testimonials" id="resenas"><div class="shell testimonials__grid"><div class="rating-block reveal"><p class="eyebrow"><span></span>Opiniones reales</p><strong>${site.rating.toFixed(1)}</strong><div class="stars">${stars}</div><p>${site.reviews} reseñas registradas en Google</p></div><div class="quote-block reveal"><p class="quote-mark">“</p><h2>Lo que dicen quienes confiaron en el estudio</h2><blockquote>${escapeHtml(site.testimonials[0].text)}</blockquote><p class="quote-author">${site.testimonials[0].author ? escapeHtml(site.testimonials[0].author) : 'Reseña pública de Google'}</p></div></div></section>`;
}

function renderFaq(site) {
  return `<section class="section faq" id="preguntas"><div class="shell faq__grid"><div class="faq__heading reveal"><p class="eyebrow"><span></span>Preguntas frecuentes</p><h2>Antes de consultar</h2><p>Información práctica para iniciar el contacto con el estudio.</p></div><div class="faq__items">${site.faq
    .map((item) => `<details class="faq-item reveal"><summary><span>${escapeHtml(item[0])}</span>${icon('ChevronDown')}</summary><p>${escapeHtml(item[1])}</p></details>`)
    .join('')}</div></div></section>`;
}

function renderContactForm(site) {
  if (!site.whatsapp) return '';
  return `<form class="contact-form reveal" data-whatsapp-form data-number="${internationalNumber(site.phone)}" data-business="${escapeHtml(site.shortName)}">
    <div><label for="name-${site.slug}">Nombre</label><input id="name-${site.slug}" name="name" autocomplete="name" required placeholder="Tu nombre" /></div>
    <div><label for="area-${site.slug}">Motivo de consulta</label><select id="area-${site.slug}" name="area" required><option value="">Seleccionar</option>${site.services.slice(0, 8).map((service) => `<option>${escapeHtml(service)}</option>`).join('')}</select></div>
    <div class="contact-form__wide"><label for="message-${site.slug}">Mensaje</label><textarea id="message-${site.slug}" name="message" rows="4" placeholder="Contanos brevemente tu situación"></textarea></div>
    <button class="button button--primary contact-form__wide" type="submit">${icon('MessageCircle')}<span>Enviar por WhatsApp</span>${icon('ArrowUpRight', 'button__arrow')}</button>
    <p class="contact-form__note contact-form__wide">Se abrirá WhatsApp con tu mensaje listo para enviar.</p>
  </form>`;
}

function renderContact(site) {
  const email = site.email ? `<a href="mailto:${escapeHtml(site.email)}">${icon('Mail')}<span><small>Correo</small>${escapeHtml(site.email)}</span></a>` : '';
  const secondaryPhone = site.secondaryPhone ? `<a href="${telHref(site.secondaryPhone)}">${icon('Phone')}<span><small>Teléfono alternativo</small>${escapeHtml(site.secondaryPhone)}</span></a>` : '';
  const hours = site.hours ? `<div>${icon('Clock3')}<span><small>Horario</small>${escapeHtml(site.hours)}</span></div>` : '';
  const social = site.instagram ? `<a href="${site.instagram}" target="_blank" rel="noopener">${icon('Instagram')}<span><small>Instagram</small>Ver perfil</span></a>` : '';
  return `<section class="section contact" id="contacto"><div class="shell contact__grid"><div class="contact__copy reveal"><p class="eyebrow"><span></span>Contacto</p><h2>Conversemos sobre tu consulta</h2><p>Elegí el canal más cómodo y compartí una descripción breve de tu situación.</p><div class="contact-list"><a href="${telHref(site.phone)}">${icon('Phone')}<span><small>Teléfono</small>${escapeHtml(site.phone)}</span></a>${secondaryPhone}${email}<a href="${mapHref(site)}" target="_blank" rel="noopener">${icon('MapPin')}<span><small>Ubicación</small>${escapeHtml(site.address)}</span></a>${hours}${social}</div>${!site.whatsapp ? `<div class="contact__actions">${primaryAction(site)}${site.email ? `<a class="button button--ghost" href="mailto:${escapeHtml(site.email)}">${icon('Mail')}<span>Enviar correo</span></a>` : ''}</div>` : ''}</div>${renderContactForm(site)}</div></section>`;
}

function renderFooter(site) {
  const instagram = site.instagram ? `<a class="footer-social" href="${site.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icon('Instagram')}</a>` : '';
  return `<footer class="footer"><div class="shell footer__grid"><div><a class="brand brand--footer" href="#inicio">${brandMarkup(site)}</a><p>${escapeHtml(site.tagline)}</p></div><div><h3>Enlaces</h3><a href="#estudio">Estudio</a><a href="#servicios">Servicios</a><a href="#proceso">Proceso</a><a href="#contacto">Contacto</a></div><div><h3>Contacto</h3><a href="${telHref(site.phone)}">${escapeHtml(site.phone)}</a>${site.email ? `<a href="mailto:${escapeHtml(site.email)}">${escapeHtml(site.email)}</a>` : ''}<span>${escapeHtml(site.location)}</span>${instagram}</div></div><div class="shell footer__bottom"><p>© <span data-year></span> ${escapeHtml(site.name)}.</p><p>La información de este sitio es general y no sustituye asesoramiento legal personalizado.</p></div></footer>`;
}

function htmlFor(site) {
  const description = `${site.name}: ${site.lead}`;
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="${site.colors.ink}" />
  <title>${escapeHtml(site.name)} | ${escapeHtml(site.location)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta property="og:title" content="${escapeHtml(site.name)}" />
  <meta property="og:description" content="${escapeHtml(site.tagline)}" />
  <meta property="og:type" content="website" />
  ${site.hero ? '<meta property="og:image" content="assets/img/hero.webp" />' : site.logo ? '<meta property="og:image" content="assets/img/logo.webp" />' : ''}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Manrope:wght@400;500;600&display=swap" rel="stylesheet" />
  <script>document.documentElement.classList.add('js');</script>
  <link rel="stylesheet" href="styles.css?v=${VERSION}" />
</head>
<body class="site-theme hero-variant-${escapeHtml(site.heroVariant)}" style="--accent:${site.colors.accent};--accent-2:${site.colors.accent2};--ink:${site.colors.ink};--paper:${site.colors.paper};--surface:${site.colors.surface}">
  <a class="skip-link" href="#contenido">Saltar al contenido</a>
  ${renderHeader(site)}
  <main id="contenido">${renderHero(site)}${renderStats(site)}${renderServices(site)}${renderAbout(site)}${renderProcess(site)}${renderTestimonials(site)}${renderFaq(site)}${renderContact(site)}</main>
  ${renderFooter(site)}
  <a class="floating-contact" href="${site.whatsapp ? `https://wa.me/${internationalNumber(site.phone)}?text=${encodeURIComponent(`Hola, quisiera hacer una consulta con ${site.shortName}.`)}` : telHref(site.phone)}" ${site.whatsapp ? 'target="_blank" rel="noopener"' : ''} aria-label="${site.whatsapp ? 'Consultar por WhatsApp' : 'Llamar al estudio'}">${site.whatsapp ? icon('MessageCircle') : icon('Phone')}<span>${site.whatsapp ? 'Consulta' : 'Llamar'}</span></a>
  <script defer src="main.js?v=${VERSION}"></script>
</body>
</html>`;
}

  const styles = `:root{color-scheme:dark;font-family:"Manrope","Segoe UI",sans-serif;font-synthesis:none;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;--header-height:106px}*{box-sizing:border-box}html{scroll-behavior:smooth;-webkit-text-size-adjust:100%;scroll-padding-top:112px}body{margin:0;background:var(--ink);color:var(--paper);overflow-x:hidden}body.menu-open{overflow:hidden}a{color:inherit;text-decoration:none}button,input,select,textarea{font:inherit}button{color:inherit}img{display:block;max-width:100%}.icon{width:1.1rem;height:1.1rem;flex:none}.shell{width:min(1180px,calc(100% - 48px));margin:0 auto}.skip-link{position:fixed;left:16px;top:-80px;z-index:200;background:var(--accent);color:var(--ink);padding:10px 14px}.skip-link:focus{top:12px}.utility{height:34px;border-bottom:1px solid rgba(255,255,255,.1);font-size:11px;color:rgba(255,255,255,.66)}.utility__inner{height:100%;display:flex;align-items:center;justify-content:space-between}.utility__inner>div{display:flex;align-items:center;gap:22px}.utility a{display:inline-flex;align-items:center;gap:7px}.utility .icon{width:13px;height:13px;color:var(--accent)}.site-header{position:absolute;inset:0 0 auto;z-index:60;color:#fff}.site-header.is-scrolled{position:fixed;background:color-mix(in srgb,var(--ink) 94%,transparent);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);box-shadow:0 8px 30px rgba(0,0,0,.24)}.site-header.is-scrolled .utility{display:none}.nav-shell{height:72px;display:flex;align-items:center;gap:34px}.brand{display:inline-flex;align-items:center;gap:12px;min-width:0}.brand__mark{width:42px;height:42px;border:1px solid color-mix(in srgb,var(--accent) 78%,transparent);display:grid;place-items:center;background:color-mix(in srgb,var(--surface) 90%,transparent);color:var(--accent);font-family:"DM Serif Display",Georgia,serif;font-size:16px}.brand__mark--logo{overflow:hidden;background:var(--surface)}.brand__mark--logo img{width:100%;height:100%;object-fit:contain}.brand__text{display:flex;flex-direction:column;min-width:0}.brand__text strong{font-family:"DM Serif Display",Georgia,serif;font-size:17px;font-weight:400;line-height:1.1;white-space:nowrap}.brand__text small{margin-top:3px;color:rgba(255,255,255,.54);font-size:8px;text-transform:uppercase;letter-spacing:.18em;white-space:nowrap}.desktop-nav{margin-left:auto;display:flex;align-items:center;gap:27px}.desktop-nav a{font-size:12px;color:rgba(255,255,255,.72);transition:color .2s}.desktop-nav a:hover,.desktop-nav a:focus-visible{color:var(--accent)}.nav-contact{height:40px;padding:0 14px;border:1px solid color-mix(in srgb,var(--accent) 60%,transparent);display:inline-flex;align-items:center;gap:8px;color:var(--accent);font-size:12px}.menu-button{display:none;width:42px;height:42px;border:1px solid rgba(255,255,255,.2);background:transparent;place-items:center;cursor:pointer}.menu-close{display:none}.menu-button[aria-expanded="true"] .menu-open{display:none}.menu-button[aria-expanded="true"] .menu-close{display:block}.mobile-nav{display:none}.hero{position:relative;min-height:86svh;padding-top:var(--header-height);overflow:hidden;background:var(--ink)}.hero__grid{position:relative;z-index:2;min-height:calc(86svh - var(--header-height));display:grid;grid-template-columns:minmax(0,1.05fr) minmax(340px,.8fr);gap:68px;align-items:center;padding-top:62px;padding-bottom:68px}.hero__copy{max-width:690px}.eyebrow{display:flex;align-items:center;gap:12px;margin:0;color:var(--accent);font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.2em}.eyebrow>span{width:44px;height:1px;background:var(--accent)}h1,h2,h3,p{margin-top:0}h1,h2{font-family:"DM Serif Display",Georgia,serif;font-weight:400;letter-spacing:0}h1{margin:22px 0 0;font-size:68px;line-height:1.02;max-width:820px;text-wrap:balance}.title-long{font-size:60px}.title-xlong{font-size:53px}.hero__statement{margin:24px 0 0;max-width:690px;font-family:"DM Serif Display",Georgia,serif;font-size:28px;line-height:1.25;color:var(--accent)}.hero__lead{margin:16px 0 0;max-width:610px;color:rgba(255,255,255,.7);font-size:15px;line-height:1.75}.hero__actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}.button{min-height:48px;padding:0 18px;border:1px solid transparent;display:inline-flex;align-items:center;justify-content:center;gap:10px;font-size:12px;font-weight:600;cursor:pointer;transition:transform .2s,background-color .2s,border-color .2s,color .2s}.button:hover{transform:translateY(-2px)}.button--primary{background:var(--accent);color:var(--ink)}.button--primary:hover{background:color-mix(in srgb,var(--accent) 84%,white)}.button--ghost{border-color:rgba(255,255,255,.25);color:#fff;background:rgba(0,0,0,.18)}.button--ghost:hover{border-color:var(--accent);color:var(--accent)}.button__arrow{margin-left:4px}.hero__details{display:flex;flex-wrap:wrap;gap:18px;margin-top:26px;color:rgba(255,255,255,.58);font-size:11px}.hero__details span{display:inline-flex;align-items:center;gap:7px}.hero__details .icon{color:var(--accent);width:14px;height:14px}.hero__media{position:relative;margin:0;height:min(610px,66svh);border:1px solid rgba(255,255,255,.16);overflow:hidden;background:var(--surface)}.hero__media:before{content:"";position:absolute;inset:12px;z-index:1;border:1px solid rgba(255,255,255,.13);pointer-events:none}.hero__media img{width:100%;height:100%;object-fit:var(--object-fit,cover);object-position:var(--object-position,center)}.hero__media figcaption{position:absolute;z-index:2;inset:auto 0 0;padding:20px;background:rgba(10,10,10,.78);display:flex;align-items:end;justify-content:space-between;gap:16px}.hero__media figcaption span{font-size:9px;text-transform:uppercase;letter-spacing:.18em;color:var(--accent)}.hero__media figcaption strong{font-family:"DM Serif Display",Georgia,serif;font-size:18px;font-weight:400}.hero__media--logo{display:grid;place-items:center;background:var(--surface);padding:58px}.hero__media--logo img{object-fit:contain;max-height:420px}.hero--full .hero__grid{grid-template-columns:minmax(0,780px);justify-content:start}.hero__backdrop{position:absolute;inset:0}.hero__backdrop img{width:100%;height:100%;object-fit:cover;filter:brightness(.52) saturate(.82)}.hero__backdrop span{position:absolute;inset:0;background:rgba(8,8,8,.38)}.hero--full .hero__copy{padding:34px;background:rgba(11,10,10,.72);border-left:3px solid var(--accent);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)}.proof-band{position:relative;z-index:3;border-top:1px solid rgba(255,255,255,.1);border-bottom:1px solid rgba(255,255,255,.1);background:var(--surface)}.proof-band__grid{display:grid;grid-template-columns:repeat(3,1fr)}.proof-stat{min-height:122px;padding:26px 32px;display:flex;align-items:center;gap:17px;border-right:1px solid rgba(255,255,255,.11)}.proof-stat:last-child{border-right:0}.proof-stat strong{font-family:"DM Serif Display",Georgia,serif;color:var(--accent);font-size:36px;font-weight:400}.proof-stat span{max-width:150px;color:rgba(255,255,255,.58);font-size:11px;line-height:1.5;text-transform:uppercase;letter-spacing:.11em}.section{padding:104px 0}.section-heading{display:grid;grid-template-columns:minmax(0,1fr) minmax(280px,430px);gap:50px;align-items:end;margin-bottom:48px}.section-heading h2,.about h2,.process h2,.testimonials h2,.faq h2,.contact h2{margin:16px 0 0;font-size:48px;line-height:1.08}.section-heading>p,.process__heading>p,.faq__heading>p,.contact__copy>p{margin:0;color:rgba(255,255,255,.58);font-size:14px;line-height:1.75}.services{background:var(--ink)}.services__grid{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid rgba(255,255,255,.16);border-left:1px solid rgba(255,255,255,.16)}.service{position:relative;min-height:232px;padding:26px;display:flex;flex-direction:column;border-right:1px solid rgba(255,255,255,.16);border-bottom:1px solid rgba(255,255,255,.16);transition:background-color .25s,color .25s}.service:hover{background:var(--paper);color:var(--ink)}.service__number{font-size:10px;color:rgba(255,255,255,.38)}.service:hover .service__number{color:var(--accent-2)}.service__icon{width:34px;height:34px;margin-top:34px;color:var(--accent)}.service h3{margin:auto 34px 0 0;font-family:"DM Serif Display",Georgia,serif;font-size:24px;font-weight:400;line-height:1.18}.service__link{position:absolute;right:22px;top:22px;width:34px;height:34px;border:1px solid rgba(255,255,255,.24);display:grid;place-items:center}.service:hover .service__link{border-color:var(--accent-2);color:var(--accent-2)}.about{background:var(--paper);color:var(--ink)}.about__grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(360px,.85fr);gap:84px;align-items:center}.about .eyebrow{color:var(--accent-2)}.about .eyebrow>span{background:var(--accent-2)}.about__copy>p{margin:24px 0 0;max-width:650px;color:color-mix(in srgb,var(--ink) 68%,transparent);font-size:15px;line-height:1.8}.about ul{list-style:none;margin:30px 0;padding:0;display:grid;gap:14px}.about li{display:flex;align-items:center;gap:12px;font-size:14px}.about li .icon{color:var(--accent-2)}.about .button--primary{background:var(--ink);color:var(--paper)}.about__signature{min-height:430px;border:1px solid color-mix(in srgb,var(--ink) 20%,transparent);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;position:relative}.about__signature:before,.about__signature:after{content:"";position:absolute;background:var(--accent-2)}.about__signature:before{width:1px;height:86%;top:7%;left:50%}.about__signature:after{height:1px;width:86%;left:7%;top:50%}.about__signature span,.about__signature small{position:relative;z-index:1;background:var(--paper);padding:10px 24px}.about__signature span{font-family:"DM Serif Display",Georgia,serif;color:var(--accent-2);font-size:82px}.about__signature small{font-size:11px;text-transform:uppercase;letter-spacing:.18em}.about__photo{margin:0;height:500px;overflow:hidden}.about__photo img{width:100%;height:100%;object-fit:cover}.process{background:var(--surface)}.process__heading{max-width:690px;margin:0 auto 60px;text-align:center}.process__heading .eyebrow{justify-content:center}.process__heading>p{margin:18px auto 0;max-width:560px}.process__steps{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(4,1fr);gap:0}.process-step{position:relative;padding:0 24px;text-align:center}.process-step:not(:last-child):after{content:"";position:absolute;top:44px;right:-18px;width:36px;height:1px;background:var(--accent)}.process-step__number{position:absolute;top:-7px;left:calc(50% + 20px);width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:var(--accent);color:var(--ink);font-size:9px;z-index:2}.process-step__icon{width:88px;height:88px;border:1px solid rgba(255,255,255,.18);display:grid;place-items:center;margin:0 auto 24px;box-shadow:0 0 0 10px rgba(0,0,0,.11)}.process-step__icon .icon{width:30px;height:30px;color:var(--accent)}.process-step h3{font-family:"DM Serif Display",Georgia,serif;font-size:21px;font-weight:400}.process-step p{color:rgba(255,255,255,.55);font-size:12px;line-height:1.7}.testimonials{background:var(--ink);border-top:1px solid rgba(255,255,255,.1)}.testimonials__grid{display:grid;grid-template-columns:.72fr 1.3fr;gap:74px;align-items:center}.rating-block{padding-right:74px;border-right:1px solid rgba(255,255,255,.15)}.rating-block>strong{display:block;margin-top:28px;font-family:"DM Serif Display",Georgia,serif;color:var(--accent);font-size:92px;font-weight:400;line-height:1}.stars{display:flex;gap:4px;margin-top:12px}.stars .icon{width:16px;height:16px}.star-filled{fill:var(--accent);color:var(--accent)}.rating-block>p:last-child{margin-top:14px;color:rgba(255,255,255,.55);font-size:12px}.quote-block{position:relative}.quote-block h2{max-width:690px}.quote-mark{position:absolute;right:0;top:-36px;color:rgba(255,255,255,.08);font-family:Georgia,serif;font-size:140px}.quote-block blockquote{margin:38px 0 0;max-width:740px;color:rgba(255,255,255,.72);font-size:15px;line-height:1.85}.quote-author{margin-top:22px;color:var(--accent);font-size:11px;text-transform:uppercase;letter-spacing:.13em}.faq{background:var(--paper);color:var(--ink)}.faq__grid{display:grid;grid-template-columns:.78fr 1.22fr;gap:82px}.faq__heading{position:sticky;top:120px;align-self:start}.faq .eyebrow{color:var(--accent-2)}.faq .eyebrow>span{background:var(--accent-2)}.faq__heading>p{margin-top:20px;color:color-mix(in srgb,var(--ink) 64%,transparent)}.faq__items{border-top:1px solid color-mix(in srgb,var(--ink) 18%,transparent)}.faq-item{border-bottom:1px solid color-mix(in srgb,var(--ink) 18%,transparent)}.faq-item summary{list-style:none;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:22px 0;font-family:"DM Serif Display",Georgia,serif;font-size:20px}.faq-item summary::-webkit-details-marker{display:none}.faq-item summary .icon{color:var(--accent-2);transition:transform .2s}.faq-item[open] summary .icon{transform:rotate(180deg)}.faq-item p{padding:0 48px 22px 0;margin:0;color:color-mix(in srgb,var(--ink) 64%,transparent);font-size:14px;line-height:1.75}.contact{background:var(--surface)}.contact__grid{display:grid;grid-template-columns:.86fr 1.14fr;gap:82px;align-items:start}.contact__copy>p{margin-top:22px}.contact-list{display:grid;gap:0;margin-top:34px;border-top:1px solid rgba(255,255,255,.14)}.contact-list>a,.contact-list>div{min-width:0;display:flex;align-items:center;gap:15px;padding:17px 0;border-bottom:1px solid rgba(255,255,255,.14);color:rgba(255,255,255,.78)}.contact-list .icon{color:var(--accent)}.contact-list span{min-width:0;font-size:13px;overflow-wrap:anywhere}.contact-list small{display:block;margin-bottom:4px;color:rgba(255,255,255,.38);font-size:9px;text-transform:uppercase;letter-spacing:.13em}.contact__actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}.contact-form{padding:34px;border:1px solid rgba(255,255,255,.18);background:rgba(0,0,0,.18);display:grid;grid-template-columns:1fr 1fr;gap:18px}.contact-form label{display:block;margin-bottom:8px;color:rgba(255,255,255,.52);font-size:10px;text-transform:uppercase;letter-spacing:.12em}.contact-form input,.contact-form select,.contact-form textarea{width:100%;border:1px solid rgba(255,255,255,.18);border-radius:0;background:rgba(0,0,0,.18);color:#fff;padding:13px 14px;outline:none}.contact-form select option{color:#111}.contact-form input:focus,.contact-form select:focus,.contact-form textarea:focus{border-color:var(--accent);box-shadow:0 0 0 2px color-mix(in srgb,var(--accent) 18%,transparent)}.contact-form__wide{grid-column:1/-1}.contact-form .button{width:100%}.contact-form__note{margin:0;color:rgba(255,255,255,.4);font-size:10px;text-align:center}.footer{padding:64px 0 22px;background:#0c0d0e;border-top:1px solid rgba(255,255,255,.1)}.footer__grid{display:grid;grid-template-columns:1.3fr .7fr 1fr;gap:70px}.footer .brand__mark{width:44px;height:44px}.footer__grid>div>p{max-width:360px;margin:20px 0 0;color:rgba(255,255,255,.47);font-size:12px;line-height:1.7}.footer h3{margin:0 0 18px;color:var(--accent);font-size:10px;text-transform:uppercase;letter-spacing:.16em}.footer__grid>div:nth-child(n+2){display:flex;flex-direction:column;align-items:flex-start;gap:10px}.footer__grid a,.footer__grid span{color:rgba(255,255,255,.52);font-size:12px}.footer-social{margin-top:8px;width:36px;height:36px;border:1px solid rgba(255,255,255,.15);display:grid;place-items:center}.footer__bottom{display:flex;justify-content:space-between;gap:30px;margin-top:54px;padding-top:20px;border-top:1px solid rgba(255,255,255,.1)}.footer__bottom p{margin:0;color:rgba(255,255,255,.34);font-size:9px}.floating-contact{position:fixed;right:20px;bottom:20px;z-index:50;height:48px;padding:0 16px;display:flex;align-items:center;gap:9px;background:var(--accent);color:var(--ink);box-shadow:0 12px 34px rgba(0,0,0,.32);font-size:11px;font-weight:600}.js .reveal{opacity:0;transform:translateY(22px)}.js .reveal.is-visible{opacity:1;transform:none;transition:opacity .65s ease,transform .65s ease}.reveal[data-split]{opacity:1;transform:none}
@media (max-width:1040px){.desktop-nav{display:none}.nav-contact{margin-left:auto}.menu-button{display:grid}.mobile-nav{position:fixed;inset:106px 0 auto;background:var(--ink);padding:22px 24px 28px;border-top:1px solid rgba(255,255,255,.12);transform:translateY(-130%);opacity:0;pointer-events:none;transition:transform .25s,opacity .25s;display:flex;flex-direction:column;gap:4px}.site-header.is-scrolled .mobile-nav{inset:72px 0 auto}.mobile-nav.is-open{transform:none;opacity:1;pointer-events:auto}.mobile-nav>a:not(.button){padding:13px 0;border-bottom:1px solid rgba(255,255,255,.1);font-family:"DM Serif Display",Georgia,serif;font-size:21px}.mobile-nav .button{margin-top:14px}.hero__grid{grid-template-columns:minmax(0,1fr) minmax(300px,.72fr);gap:38px}.hero__media{height:520px}h1{font-size:58px}.title-long{font-size:51px}.title-xlong{font-size:45px}.services__grid{grid-template-columns:repeat(2,1fr)}.about__grid,.contact__grid{gap:52px}.process__steps{grid-template-columns:repeat(2,1fr);gap:52px 0}.process-step:nth-child(2):after{display:none}.testimonials__grid{gap:46px}.rating-block{padding-right:46px}}
@media (max-width:760px){:root{--header-height:72px}.shell{width:min(100% - 30px,620px)}.utility{display:none}.nav-shell{height:72px}.brand__mark{width:38px;height:38px}.brand__text strong{max-width:210px;overflow:hidden;text-overflow:ellipsis}.brand__text small{display:none}.nav-contact{display:none}.mobile-nav{inset:72px 0 auto}.hero{min-height:auto;padding-top:72px}.hero__grid{min-height:auto;grid-template-columns:1fr;gap:34px;padding-top:58px;padding-bottom:44px}.hero__copy{max-width:none}h1{font-size:44px}.title-long,.title-xlong{font-size:40px}.hero__statement{font-size:23px}.hero__lead{font-size:14px;line-height:1.65}.hero__actions{display:grid;grid-template-columns:1fr;margin-top:26px}.hero__actions .button{width:100%}.hero__details{display:grid;gap:10px}.hero__media{height:auto;aspect-ratio:4/5}.hero__media--logo{aspect-ratio:1/1;padding:34px}.hero--full .hero__grid{padding-top:86px;padding-bottom:52px}.hero--full .hero__copy{padding:24px 20px}.hero__backdrop img{filter:brightness(.42) saturate(.8)}.proof-band__grid{grid-template-columns:1fr}.proof-stat{min-height:86px;padding:18px 4px;border-right:0;border-bottom:1px solid rgba(255,255,255,.1)}.proof-stat:last-child{border-bottom:0}.proof-stat strong{width:108px;font-size:30px}.section{padding:76px 0}.section-heading{grid-template-columns:1fr;gap:18px;margin-bottom:34px}.section-heading h2,.about h2,.process h2,.testimonials h2,.faq h2,.contact h2{font-size:37px}.services__grid{grid-template-columns:1fr}.service{min-height:194px}.about__grid,.faq__grid,.contact__grid,.testimonials__grid{grid-template-columns:1fr;gap:44px}.about__signature{min-height:330px}.about__signature span{font-size:66px}.about__photo{height:340px}.process__heading{text-align:left}.process__heading .eyebrow{justify-content:flex-start}.process__steps{grid-template-columns:1fr;gap:34px}.process-step{padding:0 0 0 98px;text-align:left;min-height:90px}.process-step:not(:last-child):after{display:block;top:84px;right:auto;left:44px;width:1px;height:32px}.process-step__icon{position:absolute;left:0;top:0;width:74px;height:74px;margin:0}.process-step__number{top:-8px;left:57px}.process-step h3{padding-top:5px}.rating-block{padding:0 0 42px;border-right:0;border-bottom:1px solid rgba(255,255,255,.15)}.rating-block>strong{font-size:74px}.faq__heading{position:static}.faq-item summary{font-size:18px}.contact-form{grid-template-columns:1fr;padding:22px}.contact-form__wide{grid-column:auto}.footer__grid{grid-template-columns:1fr;gap:36px}.footer__bottom{flex-direction:column;gap:8px}.floating-contact{right:14px;bottom:14px}.footer{padding-bottom:78px}}
@media (max-width:380px){h1,.title-long,.title-xlong{font-size:35px}.hero__statement{font-size:21px}.brand__text strong{max-width:160px}.floating-contact span{display:none}.floating-contact{width:48px;padding:0;justify-content:center}}
@media (hover:hover){.contact-list a:hover,.footer a:hover{color:var(--accent)}}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}.hero__backdrop img{transform:none!important}}`;

const finalStyles = `${styles}
.hero--full .hero__copy{background:rgba(11,10,10,.78);backdrop-filter:none;-webkit-backdrop-filter:none}
@media (max-width:760px){
  .hero-variant-split .hero__grid,.hero-variant-logo .hero__grid{position:relative;isolation:isolate}
  .hero-variant-split .hero__copy,.hero-variant-logo .hero__copy{position:relative;z-index:2}
  .hero-variant-split .hero__media,.hero-variant-logo .hero__media{position:absolute;inset:0;z-index:1;width:100%;height:100%;aspect-ratio:auto;border:0;opacity:.16;padding:0}
  .hero-variant-logo .hero__media{opacity:.2}
  .hero-variant-split .hero__media:before,.hero-variant-logo .hero__media:before,.hero-variant-split .hero__media figcaption,.hero-variant-logo .hero__media figcaption{display:none}
  .hero-variant-split .hero__media img{object-fit:cover}
  .hero-variant-logo .hero__media img{object-fit:contain;padding:48px}
}`;

const mainJs = String.raw`(function(){'use strict';var safe=function(fn,name){try{fn()}catch(error){console.error('[web]',name,error)}};function initMenu(){var button=document.querySelector('[data-menu-button]');var nav=document.querySelector('[data-mobile-nav]');if(!button||!nav)return;var close=function(){button.setAttribute('aria-expanded','false');button.setAttribute('aria-label','Abrir menú');nav.classList.remove('is-open');document.body.classList.remove('menu-open')};button.addEventListener('click',function(){var open=button.getAttribute('aria-expanded')==='true';button.setAttribute('aria-expanded',String(!open));button.setAttribute('aria-label',open?'Abrir menú':'Cerrar menú');nav.classList.toggle('is-open',!open);document.body.classList.toggle('menu-open',!open)});nav.querySelectorAll('a').forEach(function(link){link.addEventListener('click',close)});window.addEventListener('resize',function(){if(window.innerWidth>1040)close()})}function initHeader(){var header=document.querySelector('[data-header]');if(!header)return;var onScroll=function(){header.classList.toggle('is-scrolled',window.scrollY>40)};onScroll();window.addEventListener('scroll',onScroll,{passive:true})}function initReveal(){var items=document.querySelectorAll('.reveal');if(!items.length)return;var revealAll=function(){items.forEach(function(item){item.classList.add('is-visible')})};if(!('IntersectionObserver'in window)){revealAll();return}var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}})},{threshold:.05,rootMargin:'0px 0px -40px 0px'});items.forEach(function(item){observer.observe(item)});setTimeout(revealAll,1600)}function initForms(){document.querySelectorAll('[data-whatsapp-form]').forEach(function(form){form.addEventListener('submit',function(event){event.preventDefault();var data=new FormData(form);var name=String(data.get('name')||'').trim();var area=String(data.get('area')||'').trim();var message=String(data.get('message')||'').trim();var business=form.getAttribute('data-business')||'el estudio';var number=form.getAttribute('data-number')||'';var text='Hola, mi nombre es '+name+'. Quisiera consultar con '+business+'.\nMotivo: '+area+(message?'\nConsulta: '+message:'');window.open('https://wa.me/'+number+'?text='+encodeURIComponent(text),'_blank','noopener')})})}function initYear(){document.querySelectorAll('[data-year]').forEach(function(node){node.textContent=String(new Date().getFullYear())})}document.addEventListener('DOMContentLoaded',function(){safe(initMenu,'menu');safe(initHeader,'header');safe(initReveal,'reveal');safe(initForms,'forms');safe(initYear,'year')})})();`;

const htaccess = `# Sitios estáticos Amaru Web Studio
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType text/css "access plus 1 hours"
  ExpiresByType application/javascript "access plus 1 hours"
  ExpiresByType image/webp "access plus 1 month"
</IfModule>
<IfModule mod_headers.c>
  <FilesMatch "\\.(html|css|js|json)$">
    Header set Cache-Control "no-cache, must-revalidate"
  </FilesMatch>
  <FilesMatch "\\.(webp|woff2)$">
    Header set Cache-Control "public, max-age=2592000"
  </FilesMatch>
</IfModule>
<IfModule mod_mime.c>
  AddType image/webp .webp
  AddType application/javascript .js
</IfModule>
Options -Indexes
`;

function viewerHtml() {
  const buttons = sites.map((site, index) => `<button class="prospect ${index === 0 ? 'active' : ''}" data-url="./${site.slug}/index.html" data-name="${escapeHtml(site.shortName)}"><span style="background:${site.colors.accent}"></span><strong>${escapeHtml(site.shortName)}</strong><small>${escapeHtml(site.niche)} · ${escapeHtml(site.location)}</small></button>`).join('');
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Webs de estudios jurídicos</title><style>*{box-sizing:border-box}body{margin:0;background:#111;color:#f4efe8;font-family:Arial,sans-serif}.viewer{height:100svh;display:grid;grid-template-columns:310px 1fr}.sidebar{padding:22px;border-right:1px solid #333;overflow:auto}.sidebar h1{margin:0 0 6px;font-family:Georgia,serif;font-size:24px;font-weight:400}.sidebar>p{margin:0 0 20px;color:#999;font-size:12px;line-height:1.5}.prospect{position:relative;width:100%;display:block;padding:14px 12px 14px 18px;border:0;border-top:1px solid #2d2d2d;background:none;color:inherit;text-align:left;cursor:pointer}.prospect:last-child{border-bottom:1px solid #2d2d2d}.prospect>span{position:absolute;left:0;top:14px;bottom:14px;width:3px}.prospect strong,.prospect small{display:block}.prospect strong{font-family:Georgia,serif;font-size:15px;font-weight:400}.prospect small{margin-top:4px;color:#888;font-size:10px;line-height:1.35}.prospect.active{background:#1d1d1d}.toolbar{height:46px;border-bottom:1px solid #333;display:flex;align-items:center;justify-content:space-between;padding:0 16px;font-size:12px}.toolbar a{color:#d1ad78;text-decoration:none}.frame-wrap{display:grid;grid-template-rows:46px 1fr;min-width:0}.frame-wrap iframe{width:100%;height:100%;border:0;background:#fff}@media(max-width:760px){.viewer{grid-template-columns:1fr;grid-template-rows:auto 1fr}.sidebar{padding:14px;display:flex;gap:8px;overflow:auto}.sidebar h1,.sidebar>p{display:none}.prospect{min-width:190px;border:1px solid #333;padding:10px 10px 10px 16px}.prospect:last-child{border-bottom:1px solid #333}.frame-wrap{min-height:calc(100svh - 66px)}}</style></head><body><main class="viewer"><aside class="sidebar"> <h1>Webs jurídicas</h1><p>Siete propuestas construidas con datos y fotos reales de cada estudio.</p>${buttons}</aside><section class="frame-wrap"><div class="toolbar"><span data-current>${escapeHtml(sites[0].shortName)}</span><a data-open href="./${sites[0].slug}/index.html" target="_blank">Abrir en otra pestaña ↗</a></div><iframe title="Vista previa" src="./${sites[0].slug}/index.html" data-frame></iframe></section></main><script>(function(){var frame=document.querySelector('[data-frame]'),current=document.querySelector('[data-current]'),open=document.querySelector('[data-open]');document.querySelectorAll('.prospect').forEach(function(button){button.addEventListener('click',function(){document.querySelectorAll('.prospect').forEach(function(x){x.classList.remove('active')});button.classList.add('active');frame.src=button.dataset.url;current.textContent=button.dataset.name;open.href=button.dataset.url})})})();</script></body></html>`;
}

function serverSource() {
  return `const http=require('http');const fs=require('fs');const path=require('path');const ROOT=__dirname;const PORT=4177;const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.webp':'image/webp','.json':'application/json; charset=utf-8'};http.createServer((req,res)=>{try{let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(pathname==='/')pathname='/ver-webs-abogados.html';let file=path.normalize(path.join(ROOT,pathname));if(!file.startsWith(ROOT)){res.writeHead(403);res.end('Forbidden');return}if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');if(!fs.existsSync(file)){res.writeHead(404);res.end('Not found');return}res.writeHead(200,{'Content-Type':mime[path.extname(file).toLowerCase()]||'application/octet-stream','Cache-Control':'no-cache'});fs.createReadStream(file).pipe(res)}catch(error){res.writeHead(500);res.end('Server error')}}).listen(PORT,'127.0.0.1',()=>console.log('http://127.0.0.1:'+PORT));`;
}
function validatorSource() {
  return String.raw`const fs=require('fs');const path=require('path');const root=__dirname;const slugs=${JSON.stringify(sites.map((site) => site.slug))};let errors=[];for(const slug of slugs){const dir=path.join(root,slug);const htmlPath=path.join(dir,'index.html');const cssPath=path.join(dir,'styles.css');const jsPath=path.join(dir,'main.js');for(const file of [htmlPath,cssPath,jsPath,path.join(dir,'.htaccess')])if(!fs.existsSync(file))errors.push(slug+': falta '+path.basename(file));if(!fs.existsSync(htmlPath))continue;const html=fs.readFileSync(htmlPath,'utf8');const js=fs.readFileSync(jsPath,'utf8');if(/type=["']module/.test(html))errors.push(slug+': usa módulos');if(/\b(import|export)\b/.test(js))errors.push(slug+': JS contiene import/export');if(!html.includes('?v=${VERSION}'))errors.push(slug+': falta cache buster');if(/Lorem|undefined|null|Tu negocio|Legal Buddy/i.test(html))errors.push(slug+': contiene placeholder');for(const match of html.matchAll(/(?:src|href)=["']([^"'#?]+)(?:\?[^"']*)?["']/g)){const ref=match[1];if(/^(https?:|mailto:|tel:)/.test(ref)||ref.startsWith('/'))continue;const resolved=path.join(dir,ref);if(!fs.existsSync(resolved))errors.push(slug+': enlace local roto '+ref)}}if(errors.length){console.error(errors.join('\n'));process.exit(1)}console.log('OK: '+slugs.length+' sitios verificados');`;
}

for (const site of sites) {
  if (fs.existsSync(path.join(ROOT, site.slug, '.reference-pilot'))) {
    console.log(`Conservado piloto de referencia: ${site.slug}`);
    continue;
  }
  const target = prepareTarget(site);
  fs.writeFileSync(path.join(target, 'index.html'), htmlFor(site), 'utf8');
  fs.writeFileSync(path.join(target, 'styles.css'), finalStyles, 'utf8');
  fs.writeFileSync(path.join(target, 'main.js'), mainJs, 'utf8');
  fs.writeFileSync(path.join(target, '.htaccess'), htaccess, 'utf8');
  console.log(`Generado: ${site.slug}`);
}

fs.writeFileSync(path.join(ROOT, 'ver-webs-abogados.html'), viewerHtml(), 'utf8');
fs.writeFileSync(path.join(ROOT, 'serve-webs-abogados.cjs'), serverSource(), 'utf8');
fs.writeFileSync(path.join(ROOT, 'validar-webs-abogados.cjs'), validatorSource(), 'utf8');
console.log('Visor y herramientas generados.');
