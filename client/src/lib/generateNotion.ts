// ============================================================
// TECNICOR BRIEF — Notion Markdown Generator
// Generates structured markdown ready to paste into Notion
// ============================================================

import { BriefFormData } from './briefData';

export function generateNotionMarkdown(data: BriefFormData): string {
  const lines: string[] = [];

  // Header
  lines.push('# 📋 Brief de Proyecto — Tecnicor');
  lines.push('');
  lines.push(`**Fecha:** ${new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}`);
  lines.push('');
  lines.push('---');
  lines.push('');

  // Section 1: Cliente
  lines.push('## 👤 Información del Cliente');
  lines.push('');
  lines.push(`| Campo | Información |`);
  lines.push(`|-------|-------------|`);
  lines.push(`| **Nombre** | ${data.clientName || '—'} |`);
  lines.push(`| **Email** | ${data.clientEmail || '—'} |`);
  lines.push(`| **Teléfono** | ${data.clientPhone || '—'} |`);
  lines.push(`| **Empresa** | ${data.clientCompany || '—'} |`);
  lines.push(`| **Sector** | ${data.clientSector || '—'} |`);
  lines.push('');

  // Section 2: Tipo de Proyecto
  lines.push('## 🎯 Tipo de Proyecto');
  lines.push('');
  const projectTypeLabels: Record<string, string> = {
    diseño_grafico: 'Diseño Gráfico',
    pagina_web: 'Página Web',
    tienda_online: 'Tienda Online',
    ia: 'Desarrollo con IA',
    contenido: 'Contenido Digital',
    otro: 'Otro',
  };
  lines.push(`**Tipo:** ${projectTypeLabels[data.projectType] || data.projectType}`);
  if (data.projectSubtype) lines.push(`**Subtipo:** ${data.projectSubtype}`);
  lines.push('');
  lines.push(`**Descripción:**`);
  lines.push(`> ${data.projectDescription || 'No especificado'}`);
  lines.push('');
  const aiLabels: Record<string, string> = {
    manual: 'Manual (artesanal)',
    ia: 'Con Inteligencia Artificial',
    ambos: 'Combinado (Manual + IA)',
    sin_preferencia: 'Sin preferencia',
  };
  lines.push(`**Producción:** ${aiLabels[data.isManualOrAI] || data.isManualOrAI || '—'}`);
  lines.push('');

  // Section 3: Identidad Visual
  lines.push('## 🎨 Identidad Visual');
  lines.push('');
  const brandingLabels: Record<string, string> = {
    si: 'Sí, tiene logo y colores definidos',
    parcial: 'Tiene algo pero quiere mejorarlo',
    no: 'No, empezamos desde cero',
  };
  lines.push(`**Branding Existente:** ${brandingLabels[data.hasExistingBranding] || data.hasExistingBranding || '—'}`);
  lines.push('');
  if (data.preferredStyle.length > 0) {
    lines.push(`**Estilos Preferidos:** ${data.preferredStyle.join(', ')}`);
  }
  if (data.colorPreference) {
    lines.push(`**Colores:** ${data.colorPreference}`);
  }
  if (data.referenceUrls) {
    lines.push('');
    lines.push(`**Referencias:**`);
    const urls = data.referenceUrls.split('\n').filter(u => u.trim());
    urls.forEach(url => {
      lines.push(`- ${url.trim()}`);
    });
  }
  if (data.avoidStyles) {
    lines.push('');
    lines.push(`**Evitar:** ${data.avoidStyles}`);
  }
  lines.push('');

  // Section 4: Tipografía
  lines.push('## Aa Tipografía');
  lines.push('');
  lines.push(`| Aspecto | Preferencia |`);
  lines.push(`|--------|-------------|`);
  lines.push(`| **Tipo** | ${data.fontStyle || '—'} |`);
  lines.push(`| **Personalidad** | ${data.fontMood || '—'} |`);
  if (data.fontExamples) lines.push(`| **Ejemplos** | ${data.fontExamples} |`);
  lines.push('');
  if (data.fontNotes) {
    lines.push(`**Notas:** ${data.fontNotes}`);
    lines.push('');
  }

  // Section 5: Plataformas
  lines.push('## 📱 Plataformas de Publicación');
  lines.push('');
  if (data.platforms.length > 0) {
    lines.push(`**Plataformas:** ${data.platforms.join(', ')}`);
  }
  if (data.primaryPlatform) {
    lines.push(`**Principal:** ${data.primaryPlatform}`);
  }
  if (data.contentFormat.length > 0) {
    lines.push(`**Formatos:** ${data.contentFormat.join(', ')}`);
  }
  if (data.dimensions) {
    lines.push(`**Dimensiones:** ${data.dimensions}`);
  }
  lines.push('');

  // Section 6: Objetivos
  lines.push('## 🚀 Objetivos y Audiencia');
  lines.push('');
  if (data.targetAudience) {
    lines.push(`**Audiencia Objetivo:**`);
    lines.push(`> ${data.targetAudience}`);
    lines.push('');
  }
  lines.push(`| Aspecto | Información |`);
  lines.push(`|--------|-------------|`);
  if (data.ageRange) lines.push(`| **Edad** | ${data.ageRange} |`);
  const goalLabels: Record<string, string> = {
    vender: 'Vender productos/servicios',
    informar: 'Informar y comunicar',
    entretener: 'Entretener',
    posicionar: 'Posicionar la marca',
    lanzar: 'Lanzar un producto/servicio',
    educar: 'Educar a la audiencia',
  };
  if (data.projectGoal) lines.push(`| **Objetivo** | ${goalLabels[data.projectGoal] || data.projectGoal} |`);
  if (data.callToAction) lines.push(`| **CTA** | ${data.callToAction} |`);
  const toneLabels: Record<string, string> = {
    formal: 'Formal y profesional',
    casual: 'Casual y cercano',
    humoristico: 'Humorístico',
    inspiracional: 'Inspiracional',
    tecnico: 'Técnico y especializado',
    juvenil: 'Juvenil y dinámico',
  };
  if (data.tone) lines.push(`| **Tono** | ${toneLabels[data.tone] || data.tone} |`);
  lines.push('');

  // Section 7: Contenido
  lines.push('## 📁 Contenido y Recursos');
  lines.push('');
  const contentLabels: Record<string, string> = {
    si: 'Sí, tiene todo el contenido listo',
    parcial: 'Tiene parte del contenido',
    no: 'No, necesita ayuda con el contenido',
  };
  lines.push(`**Estado del Contenido:** ${contentLabels[data.hasContent] || data.hasContent || '—'}`);
  if (data.contentDescription) {
    lines.push('');
    lines.push(`**Descripción:**`);
    lines.push(`> ${data.contentDescription}`);
  }
  lines.push('');
  const photoLabels: Record<string, string> = {
    si: 'Sí, tiene fotos propias',
    parcial: 'Tiene algunas fotos',
    no: 'No, usar banco de imágenes',
  };
  lines.push(`**Fotografías:** ${photoLabels[data.hasPhotos] || data.hasPhotos || '—'}`);
  if (data.photosDescription) {
    lines.push(`- ${data.photosDescription}`);
  }
  lines.push('');
  const logoLabels: Record<string, string> = {
    si_vector: 'Sí, en formato vectorial (AI/SVG)',
    si_png: 'Sí, en PNG/JPG',
    no: 'No tiene logo',
  };
  lines.push(`**Logo:** ${logoLabels[data.hasLogo] || data.hasLogo || '—'}`);
  if (data.extraNotes) {
    lines.push('');
    lines.push(`**Notas Adicionales:**`);
    lines.push(`> ${data.extraNotes}`);
  }
  lines.push('');

  // Section 8: Presupuesto
  lines.push('## 💰 Presupuesto y Entrega');
  lines.push('');
  const budgetLabels: Record<string, string> = {
    bajo: 'Básico (hasta $150 USD)',
    medio: 'Estándar ($150 - $500 USD)',
    alto: 'Premium ($500+ USD)',
    a_definir: 'A definir en reunión',
  };
  lines.push(`| Aspecto | Información |`);
  lines.push(`|--------|-------------|`);
  if (data.budget) lines.push(`| **Presupuesto** | ${budgetLabels[data.budget] || data.budget} |`);
  if (data.budgetRange) lines.push(`| **Rango Específico** | ${data.budgetRange} |`);
  if (data.deadline) {
    const deadlineDate = new Date(data.deadline + 'T00:00:00');
    lines.push(`| **Fecha Límite** | ${deadlineDate.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })} |`);
  }
  const deliveryLabels: Record<string, string> = {
    editables: 'Archivos editables (AI, PSD, Figma)',
    exportados: 'Solo exportados (PNG, JPG, PDF)',
    ambos: 'Ambos formatos',
  };
  if (data.deliveryFormat.length > 0) {
    lines.push(`| **Entrega** | ${data.deliveryFormat.map(d => deliveryLabels[d] || d).join(', ')} |`);
  }
  lines.push(`| **Revisiones** | ${data.revisions === 'a_definir' ? 'A definir' : `${data.revisions} revisión(es)`} |`);
  lines.push('');
  if (data.additionalServices) {
    lines.push(`**Servicios Adicionales:**`);
    lines.push(`> ${data.additionalServices}`);
    lines.push('');
  }

  // Footer
  lines.push('---');
  lines.push('');
  lines.push(`*Brief generado por Tecnicor el ${new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}*`);

  return lines.join('\n');
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Error al copiar al portapapeles:', err);
    return false;
  }
}

export function downloadAsFile(content: string, filename: string): void {
  const element = document.createElement('a');
  element.setAttribute('href', `data:text/markdown;charset=utf-8,${encodeURIComponent(content)}`);
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
