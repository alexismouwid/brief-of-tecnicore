// ============================================================
// TECNICOR BRIEF — Tile Forms
// Philosophy: Terminal Floor — each tile has its own form section
// ============================================================

import { BriefFormData } from '@/lib/briefData';

interface FormProps {
  data: BriefFormData;
  onChange: (field: keyof BriefFormData, value: string | string[]) => void;
}

// ─── Shared UI Primitives ────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-sm font-medium text-[#94a3b8] mb-1.5 font-display">
      {children}
    </label>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2.5 rounded-lg input-dark text-sm font-sans"
    />
  );
}

function Textarea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-3 py-2.5 rounded-lg input-dark text-sm font-sans resize-none"
    />
  );
}

function RadioGroup({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`
            px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
            ${value === opt.value
              ? 'bg-[#00E5FF]/10 border border-[#00E5FF] text-[#00E5FF]'
              : 'bg-[#0d0d18] border border-[#2a2a3e] text-[#94a3b8] hover:border-[#00E5FF]/40'
            }
          `}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function CheckboxGroup({
  value,
  onChange,
  options,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  options: { value: string; label: string }[];
}) {
  const toggle = (v: string) => {
    if (value.includes(v)) {
      onChange(value.filter((x) => x !== v));
    } else {
      onChange([...value, v]);
    }
  };
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => toggle(opt.value)}
          className={`
            px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
            ${value.includes(opt.value)
              ? 'bg-[#00E5FF]/10 border border-[#00E5FF] text-[#00E5FF]'
              : 'bg-[#0d0d18] border border-[#2a2a3e] text-[#94a3b8] hover:border-[#00E5FF]/40'
            }
          `}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function FieldGroup({ children }: { children: React.ReactNode }) {
  return <div className="space-y-1">{children}</div>;
}

// ─── Tile 1: Datos del Cliente ───────────────────────────────

export function Tile1Form({ data, onChange }: FormProps) {
  return (
    <div className="space-y-4">
      <FieldGroup>
        <Label>Nombre completo *</Label>
        <Input value={data.clientName} onChange={(v) => onChange('clientName', v)} placeholder="Ej: María García" />
      </FieldGroup>
      <FieldGroup>
        <Label>Correo electrónico *</Label>
        <Input type="email" value={data.clientEmail} onChange={(v) => onChange('clientEmail', v)} placeholder="correo@ejemplo.com" />
      </FieldGroup>
      <FieldGroup>
        <Label>Teléfono / WhatsApp</Label>
        <Input value={data.clientPhone} onChange={(v) => onChange('clientPhone', v)} placeholder="+57 300 000 0000" />
      </FieldGroup>
      <FieldGroup>
        <Label>Empresa o marca</Label>
        <Input value={data.clientCompany} onChange={(v) => onChange('clientCompany', v)} placeholder="Nombre de tu empresa o proyecto" />
      </FieldGroup>
      <FieldGroup>
        <Label>Sector o industria</Label>
        <Input value={data.clientSector} onChange={(v) => onChange('clientSector', v)} placeholder="Ej: Moda, Tecnología, Restaurante..." />
      </FieldGroup>
    </div>
  );
}

// ─── Tile 2: Tipo de Proyecto ────────────────────────────────

export function Tile2Form({ data, onChange }: FormProps) {
  return (
    <div className="space-y-4">
      <FieldGroup>
        <Label>¿Qué tipo de proyecto necesitas? *</Label>
        <RadioGroup
          value={data.projectType}
          onChange={(v) => onChange('projectType', v)}
          options={[
            { value: 'diseño_grafico', label: '🎨 Diseño Gráfico' },
            { value: 'pagina_web', label: '🌐 Página Web' },
            { value: 'tienda_online', label: '🛒 Tienda Online' },
            { value: 'ia', label: '🤖 Desarrollo con IA' },
            { value: 'contenido', label: '📸 Contenido Digital' },
            { value: 'otro', label: '✨ Otro' },
          ]}
        />
      </FieldGroup>
      <FieldGroup>
        <Label>Especifica el subtipo (opcional)</Label>
        <Input value={data.projectSubtype} onChange={(v) => onChange('projectSubtype', v)} placeholder="Ej: Logo, Landing Page, Chatbot, Reels..." />
      </FieldGroup>
      <FieldGroup>
        <Label>Describe brevemente tu proyecto *</Label>
        <Textarea
          value={data.projectDescription}
          onChange={(v) => onChange('projectDescription', v)}
          placeholder="¿Qué quieres crear? ¿Para qué sirve? ¿Qué problema resuelve?"
          rows={4}
        />
      </FieldGroup>
      <FieldGroup>
        <Label>¿Prefieres producción manual o con IA?</Label>
        <RadioGroup
          value={data.isManualOrAI}
          onChange={(v) => onChange('isManualOrAI', v)}
          options={[
            { value: 'manual', label: '✋ Manual (artesanal)' },
            { value: 'ia', label: '🤖 Con IA' },
            { value: 'ambos', label: '⚡ Combinado' },
            { value: 'sin_preferencia', label: '🎯 Sin preferencia' },
          ]}
        />
      </FieldGroup>
    </div>
  );
}

// ─── Tile 3: Identidad Visual ────────────────────────────────

export function Tile3Form({ data, onChange }: FormProps) {
  return (
    <div className="space-y-4">
      <FieldGroup>
        <Label>¿Ya tienes branding / identidad visual?</Label>
        <RadioGroup
          value={data.hasExistingBranding}
          onChange={(v) => onChange('hasExistingBranding', v)}
          options={[
            { value: 'si', label: '✅ Sí, tengo logo y colores' },
            { value: 'parcial', label: '🔄 Tengo algo pero quiero mejorarlo' },
            { value: 'no', label: '❌ No, empezamos desde cero' },
          ]}
        />
      </FieldGroup>
      <FieldGroup>
        <Label>Estilo visual que prefieres (puedes elegir varios)</Label>
        <CheckboxGroup
          value={data.preferredStyle}
          onChange={(v) => onChange('preferredStyle', v)}
          options={[
            { value: 'minimalista', label: 'Minimalista' },
            { value: 'moderno', label: 'Moderno' },
            { value: 'retro', label: 'Retro / Vintage' },
            { value: 'corporativo', label: 'Corporativo' },
            { value: 'creativo', label: 'Creativo / Artístico' },
            { value: 'futurista', label: 'Futurista / Tech' },
            { value: 'organico', label: 'Orgánico / Natural' },
            { value: 'bold', label: 'Bold / Impactante' },
          ]}
        />
      </FieldGroup>
      <FieldGroup>
        <Label>Colores que te gustan o representan tu marca</Label>
        <Input
          value={data.colorPreference}
          onChange={(v) => onChange('colorPreference', v)}
          placeholder="Ej: Azul marino y dorado, tonos tierra, negro y blanco..."
        />
      </FieldGroup>
      <FieldGroup>
        <Label>URLs de referencia (sitios, logos, diseños que te gustan)</Label>
        <Textarea
          value={data.referenceUrls}
          onChange={(v) => onChange('referenceUrls', v)}
          placeholder="Pega aquí los links de referencia, uno por línea..."
          rows={3}
        />
      </FieldGroup>
      <FieldGroup>
        <Label>¿Qué estilos quieres EVITAR?</Label>
        <Input
          value={data.avoidStyles}
          onChange={(v) => onChange('avoidStyles', v)}
          placeholder="Ej: Nada muy colorido, evitar el rosa, sin fuentes cursivas..."
        />
      </FieldGroup>
    </div>
  );
}

// ─── Tile 4: Tipografía ──────────────────────────────────────

export function Tile4Form({ data, onChange }: FormProps) {
  return (
    <div className="space-y-4">
      <FieldGroup>
        <Label>Tipo de fuente que prefieres</Label>
        <RadioGroup
          value={data.fontStyle}
          onChange={(v) => onChange('fontStyle', v)}
          options={[
            { value: 'sans-serif', label: 'Sans-serif (limpia, moderna)' },
            { value: 'serif', label: 'Serif (clásica, elegante)' },
            { value: 'display', label: 'Display (impactante, decorativa)' },
            { value: 'manuscrita', label: 'Manuscrita (personal, artesanal)' },
            { value: 'monospace', label: 'Monospace (técnica, digital)' },
            { value: 'sin_preferencia', label: 'Sin preferencia' },
          ]}
        />
      </FieldGroup>
      <FieldGroup>
        <Label>Personalidad que debe transmitir la tipografía</Label>
        <RadioGroup
          value={data.fontMood}
          onChange={(v) => onChange('fontMood', v)}
          options={[
            { value: 'elegante', label: '✨ Elegante' },
            { value: 'moderno', label: '⚡ Moderno' },
            { value: 'divertido', label: '🎉 Divertido' },
            { value: 'serio', label: '💼 Serio' },
            { value: 'tecnico', label: '🤖 Técnico' },
            { value: 'amigable', label: '😊 Amigable' },
          ]}
        />
      </FieldGroup>
      <FieldGroup>
        <Label>Ejemplos de fuentes que te gustan (opcional)</Label>
        <Input
          value={data.fontExamples}
          onChange={(v) => onChange('fontExamples', v)}
          placeholder="Ej: Montserrat, Playfair Display, Bebas Neue..."
        />
      </FieldGroup>
      <FieldGroup>
        <Label>Notas adicionales sobre tipografía</Label>
        <Textarea
          value={data.fontNotes}
          onChange={(v) => onChange('fontNotes', v)}
          placeholder="Cualquier detalle extra sobre cómo quieres que se vean los textos..."
          rows={2}
        />
      </FieldGroup>
    </div>
  );
}

// ─── Tile 5: Plataformas ─────────────────────────────────────

export function Tile5Form({ data, onChange }: FormProps) {
  return (
    <div className="space-y-4">
      <FieldGroup>
        <Label>¿Dónde se publicará el contenido? (puedes elegir varios)</Label>
        <CheckboxGroup
          value={data.platforms}
          onChange={(v) => onChange('platforms', v)}
          options={[
            { value: 'instagram', label: '📸 Instagram' },
            { value: 'facebook', label: '👥 Facebook' },
            { value: 'tiktok', label: '🎵 TikTok' },
            { value: 'youtube', label: '▶️ YouTube' },
            { value: 'linkedin', label: '💼 LinkedIn' },
            { value: 'web', label: '🌐 Sitio Web' },
            { value: 'whatsapp', label: '💬 WhatsApp' },
            { value: 'impreso', label: '🖨️ Impreso' },
            { value: 'otro', label: '✨ Otro' },
          ]}
        />
      </FieldGroup>
      <FieldGroup>
        <Label>Plataforma principal</Label>
        <Input
          value={data.primaryPlatform}
          onChange={(v) => onChange('primaryPlatform', v)}
          placeholder="¿Cuál es la más importante?"
        />
      </FieldGroup>
      <FieldGroup>
        <Label>Formato del contenido (puedes elegir varios)</Label>
        <CheckboxGroup
          value={data.contentFormat}
          onChange={(v) => onChange('contentFormat', v)}
          options={[
            { value: 'post', label: 'Post / Publicación' },
            { value: 'story', label: 'Story / Historia' },
            { value: 'reel', label: 'Reel / Video corto' },
            { value: 'banner', label: 'Banner / Portada' },
            { value: 'logo', label: 'Logo' },
            { value: 'flyer', label: 'Flyer / Volante' },
            { value: 'video', label: 'Video largo' },
            { value: 'pdf', label: 'PDF / Catálogo' },
            { value: 'animacion', label: 'Animación' },
          ]}
        />
      </FieldGroup>
      <FieldGroup>
        <Label>Dimensiones o tamaños específicos (opcional)</Label>
        <Input
          value={data.dimensions}
          onChange={(v) => onChange('dimensions', v)}
          placeholder="Ej: 1080x1080px, A4, 1920x1080px..."
        />
      </FieldGroup>
    </div>
  );
}

// ─── Tile 6: Objetivos ───────────────────────────────────────

export function Tile6Form({ data, onChange }: FormProps) {
  return (
    <div className="space-y-4">
      <FieldGroup>
        <Label>¿A quién va dirigido? (audiencia objetivo) *</Label>
        <Textarea
          value={data.targetAudience}
          onChange={(v) => onChange('targetAudience', v)}
          placeholder="Describe tu cliente ideal: profesión, intereses, necesidades..."
          rows={3}
        />
      </FieldGroup>
      <FieldGroup>
        <Label>Rango de edad de tu audiencia</Label>
        <RadioGroup
          value={data.ageRange}
          onChange={(v) => onChange('ageRange', v)}
          options={[
            { value: '13-17', label: '13-17' },
            { value: '18-24', label: '18-24' },
            { value: '25-34', label: '25-34' },
            { value: '35-44', label: '35-44' },
            { value: '45+', label: '45+' },
            { value: 'todos', label: 'Todos' },
          ]}
        />
      </FieldGroup>
      <FieldGroup>
        <Label>Objetivo principal del proyecto *</Label>
        <RadioGroup
          value={data.projectGoal}
          onChange={(v) => onChange('projectGoal', v)}
          options={[
            { value: 'vender', label: '💰 Vender' },
            { value: 'informar', label: '📢 Informar' },
            { value: 'entretener', label: '🎭 Entretener' },
            { value: 'posicionar', label: '🏆 Posicionar marca' },
            { value: 'lanzar', label: '🚀 Lanzar producto' },
            { value: 'educar', label: '📚 Educar' },
          ]}
        />
      </FieldGroup>
      <FieldGroup>
        <Label>¿Qué acción quieres que tome el usuario?</Label>
        <Input
          value={data.callToAction}
          onChange={(v) => onChange('callToAction', v)}
          placeholder="Ej: Comprar, Contactar, Suscribirse, Visitar el sitio..."
        />
      </FieldGroup>
      <FieldGroup>
        <Label>Tono de comunicación</Label>
        <RadioGroup
          value={data.tone}
          onChange={(v) => onChange('tone', v)}
          options={[
            { value: 'formal', label: '👔 Formal' },
            { value: 'casual', label: '😊 Casual' },
            { value: 'humoristico', label: '😂 Humorístico' },
            { value: 'inspiracional', label: '✨ Inspiracional' },
            { value: 'tecnico', label: '🔬 Técnico' },
            { value: 'juvenil', label: '🎯 Juvenil' },
          ]}
        />
      </FieldGroup>
    </div>
  );
}

// ─── Tile 7: Contenido ───────────────────────────────────────

export function Tile7Form({ data, onChange }: FormProps) {
  return (
    <div className="space-y-4">
      <FieldGroup>
        <Label>¿Tienes el contenido (textos, información) listo?</Label>
        <RadioGroup
          value={data.hasContent}
          onChange={(v) => onChange('hasContent', v)}
          options={[
            { value: 'si', label: '✅ Sí, lo tengo todo' },
            { value: 'parcial', label: '🔄 Tengo parte' },
            { value: 'no', label: '❌ No, necesito ayuda' },
          ]}
        />
      </FieldGroup>
      <FieldGroup>
        <Label>Describe el contenido que tienes o necesitas</Label>
        <Textarea
          value={data.contentDescription}
          onChange={(v) => onChange('contentDescription', v)}
          placeholder="¿Qué textos, mensajes o información incluirá el proyecto?"
          rows={3}
        />
      </FieldGroup>
      <FieldGroup>
        <Label>¿Tienes fotos o imágenes propias?</Label>
        <RadioGroup
          value={data.hasPhotos}
          onChange={(v) => onChange('hasPhotos', v)}
          options={[
            { value: 'si', label: '📸 Sí, tengo fotos' },
            { value: 'parcial', label: '🔄 Algunas' },
            { value: 'no', label: '❌ No, usar banco de imágenes' },
          ]}
        />
      </FieldGroup>
      {data.hasPhotos !== 'no' && (
        <FieldGroup>
          <Label>Describe las fotos disponibles</Label>
          <Input
            value={data.photosDescription}
            onChange={(v) => onChange('photosDescription', v)}
            placeholder="Ej: Fotos de producto, fotos de equipo, imágenes de alta resolución..."
          />
        </FieldGroup>
      )}
      <FieldGroup>
        <Label>¿Tienes logo en alta resolución?</Label>
        <RadioGroup
          value={data.hasLogo}
          onChange={(v) => onChange('hasLogo', v)}
          options={[
            { value: 'si_vector', label: '✅ Sí, en vector (AI/SVG)' },
            { value: 'si_png', label: '🖼️ Sí, en PNG/JPG' },
            { value: 'no', label: '❌ No tengo logo' },
          ]}
        />
      </FieldGroup>
      <FieldGroup>
        <Label>Notas adicionales o información extra</Label>
        <Textarea
          value={data.extraNotes}
          onChange={(v) => onChange('extraNotes', v)}
          placeholder="Cualquier detalle importante que debamos saber..."
          rows={3}
        />
      </FieldGroup>
    </div>
  );
}

// ─── Tile 8: Presupuesto ─────────────────────────────────────

export function Tile8Form({ data, onChange }: FormProps) {
  return (
    <div className="space-y-4">
      <FieldGroup>
        <Label>Rango de inversión aproximado *</Label>
        <RadioGroup
          value={data.budget}
          onChange={(v) => onChange('budget', v)}
          options={[
            { value: 'bajo', label: '💵 Básico (hasta $150 USD)' },
            { value: 'medio', label: '💰 Estándar ($150 - $500 USD)' },
            { value: 'alto', label: '💎 Premium ($500+ USD)' },
            { value: 'a_definir', label: '🤝 A definir juntos' },
          ]}
        />
      </FieldGroup>
      <FieldGroup>
        <Label>Presupuesto específico (opcional)</Label>
        <Input
          value={data.budgetRange}
          onChange={(v) => onChange('budgetRange', v)}
          placeholder="Ej: $200 USD, COP 800.000..."
        />
      </FieldGroup>
      <FieldGroup>
        <Label>¿Para cuándo necesitas el proyecto? *</Label>
        <Input
          type="date"
          value={data.deadline}
          onChange={(v) => onChange('deadline', v)}
        />
      </FieldGroup>
      <FieldGroup>
        <Label>Formato de entrega</Label>
        <CheckboxGroup
          value={data.deliveryFormat}
          onChange={(v) => onChange('deliveryFormat', v)}
          options={[
            { value: 'editables', label: '📁 Archivos editables (AI, PSD, Figma)' },
            { value: 'exportados', label: '🖼️ Solo exportados (PNG, JPG, PDF)' },
            { value: 'ambos', label: '📦 Ambos' },
          ]}
        />
      </FieldGroup>
      <FieldGroup>
        <Label>Número de revisiones incluidas</Label>
        <RadioGroup
          value={data.revisions}
          onChange={(v) => onChange('revisions', v)}
          options={[
            { value: '1', label: '1 revisión' },
            { value: '2', label: '2 revisiones' },
            { value: '3', label: '3 revisiones' },
            { value: 'a_definir', label: 'A definir' },
          ]}
        />
      </FieldGroup>
      <FieldGroup>
        <Label>¿Necesitas servicios adicionales?</Label>
        <Textarea
          value={data.additionalServices}
          onChange={(v) => onChange('additionalServices', v)}
          placeholder="Ej: Gestión de redes, fotografía, redacción de textos, hosting..."
          rows={2}
        />
      </FieldGroup>
    </div>
  );
}
