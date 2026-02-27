// ============================================================
// TECNICOR BRIEF — PDF Generator
// Uses jsPDF to create a professional brief document
// ============================================================

import jsPDF from 'jspdf';
import { BriefFormData } from './briefData';

export async function generateBriefPDF(data: BriefFormData): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // ─── Color palette ───────────────────────────────────────
  const BLACK = [10, 10, 15] as [number, number, number];
  const CYAN = [0, 229, 255] as [number, number, number];
  const WHITE = [255, 255, 255] as [number, number, number];
  const GRAY_LIGHT = [240, 244, 248] as [number, number, number];
  const GRAY_MID = [148, 163, 184] as [number, number, number];
  const DARK_CARD = [17, 17, 24] as [number, number, number];
  const BORDER = [30, 30, 46] as [number, number, number];

  // ─── Helper functions ────────────────────────────────────

  function checkNewPage(neededHeight: number) {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      // Add header to new page
      doc.setFillColor(...BLACK);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
      doc.setFillColor(...DARK_CARD);
      doc.rect(0, 0, pageWidth, 12, 'F');
      doc.setTextColor(...CYAN);
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.text('TECNICOR — BRIEF DE PROYECTO', margin, 8);
      doc.setTextColor(...GRAY_MID);
      doc.text(`${data.clientName || 'Cliente'} · ${new Date().toLocaleDateString('es-CO')}`, pageWidth - margin, 8, { align: 'right' });
      y = 20;
    }
  }

  function drawSectionHeader(title: string, icon: string) {
    checkNewPage(20);
    // Section background
    doc.setFillColor(...DARK_CARD);
    doc.roundedRect(margin, y, contentWidth, 10, 2, 2, 'F');
    // Cyan left border
    doc.setFillColor(...CYAN);
    doc.rect(margin, y, 2, 10, 'F');
    // Icon + title
    doc.setTextColor(...CYAN);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(`${icon}  ${title.toUpperCase()}`, margin + 6, y + 6.5);
    y += 14;
  }

  function drawField(label: string, value: string | string[]) {
    if (!value || (Array.isArray(value) && value.length === 0)) return;
    const displayValue = Array.isArray(value) ? value.join(', ') : value;
    if (!displayValue.trim()) return;

    checkNewPage(16);

    // Label
    doc.setTextColor(...GRAY_MID);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.text(label, margin + 4, y);
    y += 4;

    // Value box
    const lines = doc.splitTextToSize(displayValue, contentWidth - 8);
    const boxHeight = Math.max(8, lines.length * 4.5 + 4);

    checkNewPage(boxHeight + 4);

    doc.setFillColor(13, 13, 24);
    doc.setDrawColor(...BORDER);
    doc.roundedRect(margin + 4, y, contentWidth - 8, boxHeight, 1.5, 1.5, 'FD');

    doc.setTextColor(...GRAY_LIGHT);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.text(lines, margin + 8, y + 5);

    y += boxHeight + 5;
  }

  // ─── PAGE 1: Cover ───────────────────────────────────────

  // Background
  doc.setFillColor(...BLACK);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Top accent bar
  doc.setFillColor(...CYAN);
  doc.rect(0, 0, pageWidth, 3, 'F');

  // Hero section background
  doc.setFillColor(13, 17, 30);
  doc.rect(0, 3, pageWidth, 80, 'F');

  // Decorative grid lines (subtle)
  doc.setDrawColor(0, 229, 255, 0.08);
  doc.setLineWidth(0.1);
  for (let i = 0; i < 10; i++) {
    doc.line(0, 3 + i * 8, pageWidth, 3 + i * 8);
  }

  // Logo area
  doc.setTextColor(...CYAN);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('TECNICOR', margin, 30);

  doc.setTextColor(...GRAY_MID);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('SERVICIOS PROFESIONALES', margin, 36);

  // Divider line
  doc.setDrawColor(...CYAN);
  doc.setLineWidth(0.5);
  doc.line(margin, 40, margin + 40, 40);

  // "BRIEF DE PROYECTO" title
  doc.setTextColor(...WHITE);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('BRIEF DE', margin, 58);
  doc.setTextColor(...CYAN);
  doc.text('PROYECTO', margin, 68);

  // Client info card
  doc.setFillColor(...DARK_CARD);
  doc.setDrawColor(...BORDER);
  doc.roundedRect(margin, 88, contentWidth, 40, 3, 3, 'FD');

  // Cyan left accent
  doc.setFillColor(...CYAN);
  doc.rect(margin, 88, 3, 40, 'F');

  doc.setTextColor(...GRAY_MID);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text('CLIENTE', margin + 8, 97);
  doc.setTextColor(...WHITE);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(data.clientName || 'Sin nombre', margin + 8, 105);

  if (data.clientCompany) {
    doc.setTextColor(...CYAN);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(data.clientCompany, margin + 8, 112);
  }

  if (data.clientEmail) {
    doc.setTextColor(...GRAY_MID);
    doc.setFontSize(8);
    doc.text(`✉  ${data.clientEmail}`, margin + 8, 120);
  }
  if (data.clientPhone) {
    doc.text(`📱  ${data.clientPhone}`, margin + 80, 120);
  }

  // Project type badge
  if (data.projectType) {
    const projectLabels: Record<string, string> = {
      diseño_grafico: 'DISEÑO GRÁFICO',
      pagina_web: 'PÁGINA WEB',
      tienda_online: 'TIENDA ONLINE',
      ia: 'DESARROLLO CON IA',
      contenido: 'CONTENIDO DIGITAL',
      otro: 'OTRO',
    };
    doc.setFillColor(0, 229, 255, 0.1);
    doc.setDrawColor(...CYAN);
    doc.roundedRect(margin, 135, 70, 10, 2, 2, 'FD');
    doc.setTextColor(...CYAN);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.text(projectLabels[data.projectType] || data.projectType.toUpperCase(), margin + 5, 141.5);
  }

  // Date and metadata
  doc.setTextColor(...GRAY_MID);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  const dateStr = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Generado el ${dateStr}`, margin, 155);
  doc.text(`Sector: ${data.clientSector || 'No especificado'}`, margin, 161);

  // Bottom bar
  doc.setFillColor(...DARK_CARD);
  doc.rect(0, pageHeight - 20, pageWidth, 20, 'F');
  doc.setFillColor(...CYAN);
  doc.rect(0, pageHeight - 20, pageWidth, 1, 'F');
  doc.setTextColor(...GRAY_MID);
  doc.setFontSize(7);
  doc.text('tecnicore.com  ·  contacto@tecnicore.com  ·  +57 300 533 5148', pageWidth / 2, pageHeight - 10, { align: 'center' });

  // ─── PAGE 2+: Content ────────────────────────────────────

  doc.addPage();
  doc.setFillColor(...BLACK);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Page header
  doc.setFillColor(...DARK_CARD);
  doc.rect(0, 0, pageWidth, 12, 'F');
  doc.setFillColor(...CYAN);
  doc.rect(0, 0, pageWidth, 1.5, 'F');
  doc.setTextColor(...CYAN);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.text('TECNICOR — BRIEF DE PROYECTO', margin, 8);
  doc.setTextColor(...GRAY_MID);
  doc.text(`${data.clientName || 'Cliente'} · ${new Date().toLocaleDateString('es-CO')}`, pageWidth - margin, 8, { align: 'right' });

  y = 22;

  // ─── Section 1: Tipo de Proyecto ─────────────────────────
  drawSectionHeader('Tipo de Proyecto', '🎯');
  const projectTypeLabels: Record<string, string> = {
    diseño_grafico: 'Diseño Gráfico',
    pagina_web: 'Página Web',
    tienda_online: 'Tienda Online',
    ia: 'Desarrollo con IA',
    contenido: 'Contenido Digital',
    otro: 'Otro',
  };
  drawField('Tipo de proyecto', projectTypeLabels[data.projectType] || data.projectType);
  if (data.projectSubtype) drawField('Subtipo', data.projectSubtype);
  drawField('Descripción del proyecto', data.projectDescription);
  const aiLabels: Record<string, string> = {
    manual: 'Manual (artesanal)',
    ia: 'Con Inteligencia Artificial',
    ambos: 'Combinado (Manual + IA)',
    sin_preferencia: 'Sin preferencia',
  };
  drawField('Producción', aiLabels[data.isManualOrAI] || data.isManualOrAI);

  y += 4;

  // ─── Section 2: Identidad Visual ─────────────────────────
  drawSectionHeader('Identidad Visual', '🎨');
  const brandingLabels: Record<string, string> = {
    si: 'Sí, tiene logo y colores definidos',
    parcial: 'Tiene algo pero quiere mejorarlo',
    no: 'No, empezamos desde cero',
  };
  drawField('Branding existente', brandingLabels[data.hasExistingBranding] || data.hasExistingBranding);
  drawField('Estilos preferidos', data.preferredStyle);
  drawField('Preferencia de colores', data.colorPreference);
  if (data.referenceUrls) drawField('URLs de referencia', data.referenceUrls);
  if (data.avoidStyles) drawField('Estilos a evitar', data.avoidStyles);

  y += 4;

  // ─── Section 3: Tipografía ────────────────────────────────
  drawSectionHeader('Tipografía', 'Aa');
  drawField('Tipo de fuente', data.fontStyle);
  drawField('Personalidad tipográfica', data.fontMood);
  if (data.fontExamples) drawField('Ejemplos de fuentes', data.fontExamples);
  if (data.fontNotes) drawField('Notas adicionales', data.fontNotes);

  y += 4;

  // ─── Section 4: Plataformas ───────────────────────────────
  drawSectionHeader('Plataformas de Publicación', '📱');
  drawField('Plataformas seleccionadas', data.platforms);
  if (data.primaryPlatform) drawField('Plataforma principal', data.primaryPlatform);
  drawField('Formatos de contenido', data.contentFormat);
  if (data.dimensions) drawField('Dimensiones específicas', data.dimensions);

  y += 4;

  // ─── Section 5: Objetivos ─────────────────────────────────
  drawSectionHeader('Objetivos y Audiencia', '🚀');
  drawField('Audiencia objetivo', data.targetAudience);
  drawField('Rango de edad', data.ageRange);
  const goalLabels: Record<string, string> = {
    vender: 'Vender productos/servicios',
    informar: 'Informar y comunicar',
    entretener: 'Entretener',
    posicionar: 'Posicionar la marca',
    lanzar: 'Lanzar un producto/servicio',
    educar: 'Educar a la audiencia',
  };
  drawField('Objetivo principal', goalLabels[data.projectGoal] || data.projectGoal);
  if (data.callToAction) drawField('Llamado a la acción', data.callToAction);
  const toneLabels: Record<string, string> = {
    formal: 'Formal y profesional',
    casual: 'Casual y cercano',
    humoristico: 'Humorístico',
    inspiracional: 'Inspiracional',
    tecnico: 'Técnico y especializado',
    juvenil: 'Juvenil y dinámico',
  };
  drawField('Tono de comunicación', toneLabels[data.tone] || data.tone);

  y += 4;

  // ─── Section 6: Contenido ─────────────────────────────────
  drawSectionHeader('Contenido y Recursos', '📁');
  const contentLabels: Record<string, string> = {
    si: 'Sí, tiene todo el contenido listo',
    parcial: 'Tiene parte del contenido',
    no: 'No, necesita ayuda con el contenido',
  };
  drawField('Estado del contenido', contentLabels[data.hasContent] || data.hasContent);
  if (data.contentDescription) drawField('Descripción del contenido', data.contentDescription);
  const photoLabels: Record<string, string> = {
    si: 'Sí, tiene fotos propias',
    parcial: 'Tiene algunas fotos',
    no: 'No, usar banco de imágenes',
  };
  drawField('Fotografías', photoLabels[data.hasPhotos] || data.hasPhotos);
  if (data.photosDescription) drawField('Descripción de fotos', data.photosDescription);
  const logoLabels: Record<string, string> = {
    si_vector: 'Sí, en formato vectorial (AI/SVG)',
    si_png: 'Sí, en PNG/JPG',
    no: 'No tiene logo',
  };
  drawField('Logo disponible', logoLabels[data.hasLogo] || data.hasLogo);
  if (data.extraNotes) drawField('Notas adicionales', data.extraNotes);

  y += 4;

  // ─── Section 7: Presupuesto ───────────────────────────────
  drawSectionHeader('Presupuesto y Entrega', '💰');
  const budgetLabels: Record<string, string> = {
    bajo: 'Básico (hasta $150 USD)',
    medio: 'Estándar ($150 - $500 USD)',
    alto: 'Premium ($500+ USD)',
    a_definir: 'A definir en reunión',
  };
  drawField('Rango de inversión', budgetLabels[data.budget] || data.budget);
  if (data.budgetRange) drawField('Presupuesto específico', data.budgetRange);
  if (data.deadline) {
    const deadlineDate = new Date(data.deadline + 'T00:00:00');
    drawField('Fecha límite', deadlineDate.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }));
  }
  const deliveryLabels: Record<string, string> = {
    editables: 'Archivos editables (AI, PSD, Figma)',
    exportados: 'Solo exportados (PNG, JPG, PDF)',
    ambos: 'Ambos formatos',
  };
  drawField('Formato de entrega', data.deliveryFormat.map((d) => deliveryLabels[d] || d));
  drawField('Revisiones incluidas', data.revisions === 'a_definir' ? 'A definir' : `${data.revisions} revisión(es)`);
  if (data.additionalServices) drawField('Servicios adicionales', data.additionalServices);

  // ─── Footer on last page ──────────────────────────────────
  checkNewPage(25);
  y += 8;

  // Summary box
  doc.setFillColor(0, 229, 255, 0.05);
  doc.setDrawColor(...CYAN);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, y, contentWidth, 20, 3, 3, 'FD');
  doc.setTextColor(...CYAN);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('¿Listo para comenzar?', margin + 5, y + 7);
  doc.setTextColor(...GRAY_MID);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.text('El equipo de Tecnicor revisará tu brief y se pondrá en contacto contigo a la brevedad.', margin + 5, y + 13);
  doc.text('contacto@tecnicore.com  ·  +57 300 533 5148  ·  tecnicore.com', margin + 5, y + 18);

  // Page numbers
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFillColor(...DARK_CARD);
    doc.rect(0, pageHeight - 10, pageWidth, 10, 'F');
    doc.setTextColor(...GRAY_MID);
    doc.setFontSize(7);
    doc.text(`Página ${i} de ${totalPages}`, pageWidth - margin, pageHeight - 4, { align: 'right' });
    if (i > 1) {
      doc.text('TECNICOR — BRIEF DE PROYECTO CONFIDENCIAL', margin, pageHeight - 4);
    }
  }

  // Save
  const fileName = `Tecnicor_Brief_${(data.clientName || 'Cliente').replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
}
