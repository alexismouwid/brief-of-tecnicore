// ============================================================
// TECNICOR BRIEF — Data Types & Store
// Philosophy: Terminal Floor — each tile = one section of the brief
// ============================================================

export interface BriefFormData {
  // Tile 1: Información del Cliente
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientCompany: string;
  clientSector: string;

  // Tile 2: Tipo de Proyecto
  projectType: string; // diseño_grafico | pagina_web | tienda_online | ia | contenido | otro
  projectSubtype: string;
  projectDescription: string;
  isManualOrAI: string; // manual | ia | ambos

  // Tile 3: Identidad Visual / Estilo
  hasExistingBranding: string; // si | no
  preferredStyle: string[]; // minimalista | moderno | retro | corporativo | creativo | etc
  colorPreference: string; // descripción libre
  referenceUrls: string;
  avoidStyles: string;

  // Tile 4: Tipografía
  fontStyle: string; // serif | sans-serif | display | manuscrita | monospace
  fontMood: string; // elegante | moderno | divertido | serio | tecnico
  fontExamples: string;
  fontNotes: string;

  // Tile 5: Plataformas de Publicación
  platforms: string[]; // instagram | facebook | tiktok | web | youtube | linkedin | whatsapp | otro
  primaryPlatform: string;
  contentFormat: string[]; // post | story | reel | banner | logo | flyer | video | pdf
  dimensions: string;

  // Tile 6: Objetivos y Audiencia
  targetAudience: string;
  ageRange: string;
  projectGoal: string; // vender | informar | entretener | posicionar | lanzar
  callToAction: string;
  tone: string; // formal | casual | humoristico | inspiracional | tecnico

  // Tile 7: Contenido y Recursos
  hasContent: string; // si | no | parcial
  contentDescription: string;
  hasPhotos: string; // si | no
  photosDescription: string;
  hasLogo: string; // si | no
  extraNotes: string;

  // Tile 8: Presupuesto y Entrega
  budget: string; // bajo | medio | alto | a_definir
  budgetRange: string;
  deadline: string;
  deliveryFormat: string[]; // archivos_editables | solo_exportados | ambos
  revisions: string; // 1 | 2 | 3 | ilimitadas
  additionalServices: string;
}

export const INITIAL_FORM_DATA: BriefFormData = {
  clientName: '',
  clientEmail: '',
  clientPhone: '',
  clientCompany: '',
  clientSector: '',
  projectType: '',
  projectSubtype: '',
  projectDescription: '',
  isManualOrAI: '',
  hasExistingBranding: '',
  preferredStyle: [],
  colorPreference: '',
  referenceUrls: '',
  avoidStyles: '',
  fontStyle: '',
  fontMood: '',
  fontExamples: '',
  fontNotes: '',
  platforms: [],
  primaryPlatform: '',
  contentFormat: [],
  dimensions: '',
  targetAudience: '',
  ageRange: '',
  projectGoal: '',
  callToAction: '',
  tone: '',
  hasContent: '',
  contentDescription: '',
  hasPhotos: '',
  photosDescription: '',
  hasLogo: '',
  extraNotes: '',
  budget: '',
  budgetRange: '',
  deadline: '',
  deliveryFormat: [],
  revisions: '',
  additionalServices: '',
};

export interface TileConfig {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  fields: string[];
}

export const TILES: TileConfig[] = [
  {
    id: 1,
    title: 'Datos del Cliente',
    subtitle: 'Cuéntanos quién eres',
    icon: '👤',
    color: '#00E5FF',
    fields: ['clientName', 'clientEmail', 'clientPhone', 'clientCompany', 'clientSector'],
  },
  {
    id: 2,
    title: 'Tipo de Proyecto',
    subtitle: '¿Qué necesitas crear?',
    icon: '🎯',
    color: '#00E5FF',
    fields: ['projectType', 'projectSubtype', 'projectDescription', 'isManualOrAI'],
  },
  {
    id: 3,
    title: 'Identidad Visual',
    subtitle: 'Estilo y referencias',
    icon: '🎨',
    color: '#00E5FF',
    fields: ['hasExistingBranding', 'preferredStyle', 'colorPreference', 'referenceUrls', 'avoidStyles'],
  },
  {
    id: 4,
    title: 'Tipografía',
    subtitle: 'El carácter de tus letras',
    icon: 'Aa',
    color: '#00E5FF',
    fields: ['fontStyle', 'fontMood', 'fontExamples', 'fontNotes'],
  },
  {
    id: 5,
    title: 'Plataformas',
    subtitle: '¿Dónde se publicará?',
    icon: '📱',
    color: '#00E5FF',
    fields: ['platforms', 'primaryPlatform', 'contentFormat', 'dimensions'],
  },
  {
    id: 6,
    title: 'Objetivos',
    subtitle: 'Tu audiencia y metas',
    icon: '🚀',
    color: '#00E5FF',
    fields: ['targetAudience', 'ageRange', 'projectGoal', 'callToAction', 'tone'],
  },
  {
    id: 7,
    title: 'Contenido',
    subtitle: 'Recursos disponibles',
    icon: '📁',
    color: '#00E5FF',
    fields: ['hasContent', 'contentDescription', 'hasPhotos', 'photosDescription', 'hasLogo', 'extraNotes'],
  },
  {
    id: 8,
    title: 'Presupuesto',
    subtitle: 'Inversión y tiempos',
    icon: '💰',
    color: '#00E5FF',
    fields: ['budget', 'budgetRange', 'deadline', 'deliveryFormat', 'revisions', 'additionalServices'],
  },
];

export type TileStatus = 'locked' | 'pending' | 'active' | 'completed';
