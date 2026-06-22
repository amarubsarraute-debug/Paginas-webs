// ═══════════════════════════════════════════
// STATE + STORAGE
// ═══════════════════════════════════════════

const STORAGE_KEY = 'polaris_state';

let state = {
  day: 1,
  season: 'Temporada 1: Fundaciones',
  xpTotal: 0,
  xpDaily: 0,
  level: 0,
  streak: 0,
  bestStreak: 0,
  lastActiveDate: null,
  mission: '',
  habits: {},
  identityProofList: [],
  shadowHistory: [],
  shadowCount: 0,
  attributes: {
    disciplina: 0,
    negocio: 0,
    cuerpo: 0,
    mente: 0,
    autocontrol: 0,
    valor: 0,
  },
  polaris: {
    vision: '',
    season: 'Temporada 1: Fundaciones',
    quarter: '',
    boss: '',
    weekly: '',
    next: '',
  },
  progress: {
    quarter: 0,
    finance: 0,
    body: 0,
    biz: 0,
  },
  finances: {
    obj: '',
    actual: '',
    saveObj: '',
    saveActual: '',
    next: '',
  },
  identityCentral: 'Soy alguien que construye su negocio, entrena su cuerpo, cuida su energía y actúa aunque tenga dudas.',
  // Config de notificaciones (Fase C)
  notifications: {
    enabled: false,
    daily: true,  dailyTime: '09:00',
    streak: true, streakTime: '22:00',
    timer: true,
    lastDaily: null, lastStreak: null,
  },
  // Contenido personal (Fase D) — se llena desde el seed privado, NO viaja en el bundle público
  customPhrases: [],        // frases de identidad propias; si hay, reemplazan a IDENTITY_PHRASES
  nonNegotiables: [],       // no-negociables propios; si hay, reemplazan a los genéricos
  ideal: { creencias: [], logros: [], diaPerfecto: '', pareja: '' }, // módulo Visualización
  // Módulos nuevos (Fase E)
  inseguridades: [],        // { id, texto, origen, clasif: 'cambiable'|'nocambiable', accion }
  constraintHistory: [],    // { date, experiencia, creencia, identidad, comportamiento, nuevaCreencia }
};

let shadowState = {
  task: '',
  emotion: '',
  certainty: '',
  fear: '',
};

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch(e) {}
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      state = { ...state, ...parsed };
      // merge nested
      state.attributes = { ...{ disciplina:0,negocio:0,cuerpo:0,mente:0,autocontrol:0,valor:0 }, ...parsed.attributes };
      state.polaris = { ...state.polaris, ...parsed.polaris };
      state.progress = { ...state.progress, ...parsed.progress };
      state.finances = { ...state.finances, ...parsed.finances };
      state.notifications = { ...state.notifications, ...parsed.notifications };
      state.ideal = { ...state.ideal, ...parsed.ideal };
    }
  } catch(e) {}
}
