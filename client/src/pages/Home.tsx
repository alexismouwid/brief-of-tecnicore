// ============================================================
// TECNICOR BRIEF — Home Page (Main Experience)
// Philosophy: Terminal Floor — split screen: tile map + active form
// ============================================================

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, FileText, CheckCircle, Download, RotateCcw, Copy } from 'lucide-react';
import { toast } from 'sonner';

import TileGrid from '@/components/TileGrid';
import {
  Tile1Form, Tile2Form, Tile3Form, Tile4Form,
  Tile5Form, Tile6Form, Tile7Form, Tile8Form,
} from '@/components/TileForms';
import { BriefFormData, INITIAL_FORM_DATA, TILES, TileStatus } from '@/lib/briefData';
import { generateBriefPDF } from '@/lib/generatePDF';
import { generateNotionMarkdown, downloadAsFile } from '@/lib/generateNotion';

// Hero background image URL
const HERO_BG = 'https://private-us-east-1.manuscdn.com/sessionFile/ImlNUCIsgrcXaxFXokqWcO/sandbox/CcfQ1VDUpIX2ccIdyPxnDQ-img-1_1772157874000_na1fn_dGVjbmljb3ItYnJpZWYtaGVyby1iZw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvSW1sTlVDSXNncmNYYXhGWG9rcVdjTy9zYW5kYm94L0NjZlExVkRVcElYMmNjSWR5UHhuRFEtaW1nLTFfMTc3MjE1Nzg3NDAwMF9uYTFmbl9kR1ZqYm1samIzSXRZbkpwWldZdGFHVnlieTFpWncucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Q9WlJK7GuYOKwd4s6UBzcC~tVkyGRFZ36LS5XAOugd1feoYapEyapfDSlMpaQBPivov52u4SU9GJha7oLpQJKWNSiVarQiqYh7x5amoLZyGnYkXncWBJSG8B8JFcU8YyccfXqDzch1Ks9BR6SUC4Y6-12rtDm1bbFQBadncU1MwWmqa~EK0rGNqMK3nzViO0tEQkhMu7FRIfx8XWSFpAq7hxGcuun58BzWDJVarydcwM8g7BcTGUBXURPELS0W2QmFc4lef9oRapv77lK5retXmn1kp2F6~jrK-FGl~W8UK~D-kWjmoWmwsKH4VmlQTfRWTOzqwZJTaZ02RarpnYyA__';
const SUCCESS_IMG = 'https://private-us-east-1.manuscdn.com/sessionFile/ImlNUCIsgrcXaxFXokqWcO/sandbox/CcfQ1VDUpIX2ccIdyPxnDQ-img-2_1772157869000_na1fn_dGVjbmljb3ItYnJpZWYtc3VjY2Vzcw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvSW1sTlVDSXNncmNYYXhGWG9rcVdjTy9zYW5kYm94L0NjZlExVkRVcElYMmNjSWR5UHhuRFEtaW1nLTJfMTc3MjE1Nzg2OTAwMF9uYTFmbl9kR1ZqYm1samIzSXRZbkpwWldZdGMzVmpZMlZ6Y3cucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=WW2-L4hZBRBnbw4lH3syxLYYnO5f227XpkdaueIul3MtejgYExskTxQt3YSsznfK0-PQ6VreFKFly5LrHcI4~yG5whEYITymtXw5ae-yZIETpsPyhgPE9XUqe0pxBuj2gh-zKEK1GGr0zVLiuKbj6SPDLick5x5KEBh0yxNUEZPRwbFvzoPElRWzTmk6MggJ~RDRPnQ101Q-LtqxABTk~Ivg3hSnrPeK4isF9dsYLaWbgc7wu8p7oTcIOzdtf0MkByS6ztwPdCY~UeRyWw7hrpSRrOmV~20iksXux3rmJV6JKp8waXWRSBY6ej4bYb-QD8w1twe7Mt9W1KzuJxIb2g__';

// Validation: required fields per tile
const REQUIRED_FIELDS: Record<number, (keyof BriefFormData)[]> = {
  1: ['clientName', 'clientEmail'],
  2: ['projectType', 'projectDescription'],
  3: ['preferredStyle'],
  4: ['fontStyle'],
  5: ['platforms', 'contentFormat'],
  6: ['targetAudience', 'projectGoal'],
  7: ['hasContent'],
  8: ['budget', 'deadline'],
};

function validateTile(tileId: number, data: BriefFormData): boolean {
  const required = REQUIRED_FIELDS[tileId] || [];
  return required.every((field) => {
    const value = data[field];
    if (Array.isArray(value)) return value.length > 0;
    return value !== '' && value !== undefined && value !== null;
  });
}

const TILE_FORMS = [Tile1Form, Tile2Form, Tile3Form, Tile4Form, Tile5Form, Tile6Form, Tile7Form, Tile8Form];

type AppPhase = 'intro' | 'brief' | 'success';

export default function Home() {
  const [phase, setPhase] = useState<AppPhase>('intro');
  const [activeTile, setActiveTile] = useState(1);
  const [completedTiles, setCompletedTiles] = useState<Set<number>>(new Set());
  const [formData, setFormData] = useState<BriefFormData>(INITIAL_FORM_DATA);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloadingMarkdown, setIsDownloadingMarkdown] = useState(false);

  const getTileStatus = useCallback((tileId: number): TileStatus => {
    if (completedTiles.has(tileId)) return 'completed';
    if (tileId === activeTile) return 'active';
    // Unlock next tile only if previous is completed
    if (tileId === 1) return 'pending';
    if (completedTiles.has(tileId - 1)) return 'pending';
    return 'locked';
  }, [completedTiles, activeTile]);

  const tileStatuses: TileStatus[] = TILES.map((t) => getTileStatus(t.id));

  const handleFieldChange = useCallback((field: keyof BriefFormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleTileClick = useCallback((tileId: number) => {
    const status = getTileStatus(tileId);
    if (status === 'locked') return;
    setActiveTile(tileId);
  }, [getTileStatus]);

  const handleNext = () => {
    if (!validateTile(activeTile, formData)) {
      toast.error('Por favor completa los campos requeridos antes de continuar.', {
        description: 'Los campos marcados con * son obligatorios.',
      });
      return;
    }

    // Mark current tile as completed
    setCompletedTiles((prev) => new Set(Array.from(prev).concat(activeTile)));

    if (activeTile < 8) {
      setActiveTile(activeTile + 1);
      toast.success(`¡Baldosa ${activeTile} completada!`, {
        description: `Avanzando a: ${TILES[activeTile].title}`,
      });
    } else {
      // All tiles done
      setCompletedTiles(new Set([1, 2, 3, 4, 5, 6, 7, 8]));
      setPhase('success');
    }
  };

  const handlePrev = () => {
    if (activeTile > 1) {
      setActiveTile(activeTile - 1);
    }
  };

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    try {
      await generateBriefPDF(formData);
      toast.success('¡PDF generado exitosamente!', {
        description: 'El archivo se ha descargado en tu dispositivo.',
      });
    } catch (err) {
      toast.error('Error al generar el PDF. Intenta de nuevo.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadMarkdown = () => {
    setIsDownloadingMarkdown(true);
    try {
      const markdown = generateNotionMarkdown(formData);
      const filename = `Tecnicor_Brief_${(formData.clientName || 'Cliente').replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.md`;
      downloadAsFile(markdown, filename);
      toast.success('¡Markdown descargado!', {
        description: 'Archivo listo para pegar en Notion.',
      });
    } catch (err) {
      toast.error('Error al descargar el markdown.');
    } finally {
      setIsDownloadingMarkdown(false);
    }
  };

  const handleReset = () => {
    setPhase('intro');
    setActiveTile(1);
    setCompletedTiles(new Set());
    setFormData(INITIAL_FORM_DATA);
  };

  const progressPercent = (completedTiles.size / 8) * 100;
  const ActiveForm = TILE_FORMS[activeTile - 1];
  const activeTileConfig = TILES[activeTile - 1];

  // ─── INTRO SCREEN ────────────────────────────────────────

  if (phase === 'intro') {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
        style={{ background: '#0a0a0f' }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${HERO_BG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
          }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(10,10,15,0.4) 0%, rgba(10,10,15,0.7) 50%, rgba(10,10,15,0.95) 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 mb-2">
              <div
                className="w-30 h-30 rounded-full flex items-center justify-center font-display font-black text-lg"
              >
                
              <img src="/logo.png" alt="logo" className="w-20 h-20 object-contain" />
              </div>
              <img src="/nombre.png" alt="nombre" className="w-35 h-35 flex relative right-10 object-contain" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-display font-black text-5xl md:text-6xl text-white mb-4 leading-tight"
          >
            Brief de{' '}
            <span style={{ color: '#00E5FF' }} className="text-glow-cyan">
              Proyecto
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-[#94a3b8] text-lg mb-3 leading-relaxed"
          >
            Completa las <strong className="text-white">8 secciones</strong> de este cuestionario
            para que podamos entender exactamente lo que necesitas.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="font-mono-tech text-sm text-[#4a5568] mb-10"
          >
            ⏱ Tiempo estimado: 5-10 minutos
          </motion.p>

          {/* Tile preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="grid grid-cols-4 gap-2 mb-10 max-w-sm mx-auto"
          >
            {TILES.map((tile, i) => (
              <motion.div
                key={tile.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.05 }}
                className="aspect-square rounded-lg flex flex-col items-center justify-center text-center p-2"
                style={{
                  background: '#111118',
                  border: '1px solid #1e1e2e',
                }}
              >
                <span className="text-lg mb-0.5">{tile.icon}</span>
                <span className="font-mono-tech text-[9px] text-[#4a5568]">{String(tile.id).padStart(2, '0')}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            onClick={() => setPhase('brief')}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-display font-bold text-lg transition-all duration-300 hover:scale-105 glow-cyan"
            style={{
              background: 'linear-gradient(135deg, #00E5FF, #00b8cc)',
              color: '#0a0a0f',
            }}
          >
            Comenzar Brief
            <ChevronRight size={20} />
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-6 text-[#4a5568] text-sm"
          >
            Al completar el cuestionario, se generará un PDF con toda tu información.
          </motion.p>
        </div>
      </div>
    );
  }

  // ─── SUCCESS SCREEN ──────────────────────────────────────

  if (phase === 'success') {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
        style={{ background: '#0a0a0f' }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${SUCCESS_IMG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(10,10,15,0.85)' }}
        />

        <div className="relative z-10 text-center px-6 max-w-xl mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="mb-6"
          >
            <CheckCircle size={72} className="mx-auto" style={{ color: '#00E5FF' }} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display font-black text-4xl text-white mb-3"
          >
            ¡Brief Completado!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[#94a3b8] text-lg mb-2"
          >
            Excelente trabajo, <strong className="text-white">{formData.clientName || 'cliente'}</strong>.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-[#94a3b8] mb-10"
          >
            Has completado las 8 secciones del brief. Descarga tu PDF y envíanoslo
            para que podamos comenzar a trabajar en tu proyecto.
          </motion.p>

          {/* Completed tiles summary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-4 gap-2 mb-10 max-w-sm mx-auto"
          >
            {TILES.map((tile, i) => (
              <motion.div
                key={tile.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.07 }}
                className="aspect-square rounded-lg flex flex-col items-center justify-center tile-completed"
              >
                <CheckCircle size={16} style={{ color: '#00E5FF' }} />
                <span className="font-mono-tech text-[9px] mt-1" style={{ color: '#00E5FF' }}>
                  {String(tile.id).padStart(2, '0')}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col gap-3 justify-center max-w-md mx-auto"
          >
            {/* Download Markdown for Notion */}
            <button
              onClick={handleDownloadMarkdown}
              disabled={isDownloadingMarkdown}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-display font-bold text-lg transition-all duration-300 hover:scale-105 glow-cyan disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #00E5FF, #00b8cc)',
                color: '#0a0a0f',
              }}
            >
              {isDownloadingMarkdown ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#0a0a0f] border-t-transparent rounded-full animate-spin" />
                  Descargando...
                </>
              ) : (
                <>
                  <Copy size={20} />
                  Descargar para Notion (.md)
                </>
              )}
            </button>

            {/* Download PDF */}
            <button
              onClick={handleGeneratePDF}
              disabled={isGenerating}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-display font-bold text-base transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'transparent',
                border: '1px solid #00E5FF',
                color: '#00E5FF',
              }}
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#00E5FF] border-t-transparent rounded-full animate-spin" />
                  Generando PDF...
                </>
              ) : (
                <>
                  <FileText size={18} />
                  Descargar PDF
                </>
              )}
            </button>

            {/* New Brief */}
            <button
              onClick={handleReset}
              className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-display font-medium text-sm transition-all duration-300 hover:border-[#00E5FF]/60"
              style={{
                background: 'transparent',
                border: '1px solid #2a2a3e',
                color: '#94a3b8',
              }}
            >
              <RotateCcw size={16} />
              Nuevo Brief
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8 p-4 rounded-lg text-center"
            style={{ background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.15)' }}
          >
            <p className="text-[#4a5568] text-xs font-mono-tech mb-2">📋 ARCHIVOS DESCARGADOS:</p>
            <p className="text-[#94a3b8] text-sm leading-relaxed">
              Envía ambos archivos (.md y .pdf) a{' '}
              <a href="mailto:contacto@tecnicore.com" style={{ color: '#00E5FF' }} className="font-semibold">
                tecnicorenotion@gmail.com
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // ─── BRIEF SCREEN ────────────────────────────────────────

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0a0f' }}>
      {/* Top navigation bar */}
      <header
        className="flex items-center justify-between px-6 py-3 border-b"
        style={{ borderColor: '#1e1e2e', background: '#0d0d18' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center font-display font-black text-sm"
          >
            <img src="/logo.png" alt="logonav" className="w-15 h-15 object-contain" />
          </div>
          
            <img src="/nombre.png" alt="nombrenav" className="w-30 h-30 flex relative right-5 object-contain" />
          <span className="text-[#2a2a3e] text-sm">·</span>
          <span className="font-mono-tech text-xs text-[#4a5568]">BRIEF DE PROYECTO</span>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <span className="font-mono-tech text-xs" style={{ color: '#00E5FF' }}>
              {completedTiles.size}/8 completadas
            </span>
            <div
              className="w-36 h-1.5 rounded-full overflow-hidden"
              style={{ background: '#1e1e2e' }}
            >
              <motion.div
                className="h-full rounded-full progress-bar"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="font-mono-tech text-xs text-[#4a5568]">{Math.round(progressPercent)}%</span>
          </div>
          <FileText size={16} className="text-[#4a5568]" />
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel: Tile map */}
        <aside
          className="hidden lg:flex flex-col w-72 xl:w-80 border-r p-5 gap-5"
          style={{ borderColor: '#1e1e2e', background: '#0d0d18' }}
        >
          {/* Panel header */}
          <div>
            <h2 className="font-display font-bold text-white text-sm mb-1">Mapa de Progreso</h2>
            <p className="font-mono-tech text-xs text-[#4a5568]">
              {completedTiles.size === 8 ? 'COMPLETADO' : `BALDOSA ${String(activeTile).padStart(2, '0')} ACTIVA`}
            </p>
          </div>

          {/* Tile grid */}
          <TileGrid
            tileStatuses={tileStatuses}
            activeTile={activeTile}
            onTileClick={handleTileClick}
          />

          {/* Progress bar */}
          <div>
            <div className="flex justify-between mb-1.5">
              <span className="font-mono-tech text-xs text-[#4a5568]">PROGRESO</span>
              <span className="font-mono-tech text-xs" style={{ color: '#00E5FF' }}>
                {Math.round(progressPercent)}%
              </span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#1e1e2e' }}>
              <motion.div
                className="h-full rounded-full progress-bar"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Current tile info */}
          <div
            className="rounded-lg p-3"
            style={{ background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.15)' }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-base">{activeTileConfig.icon}</span>
              <span className="font-display font-bold text-white text-xs">{activeTileConfig.title}</span>
            </div>
            <p className="text-xs text-[#4a5568] leading-relaxed">
              {activeTileConfig.subtitle}
            </p>
          </div>

          {/* Info */}
          <div
            className="rounded-lg p-3 mt-auto"
            style={{ background: '#111118', border: '1px solid #1e1e2e' }}
          >
            <p className="text-xs text-[#4a5568] leading-relaxed">
              Completa cada baldosa en orden. Los campos marcados con <span style={{ color: '#00E5FF' }}>*</span> son obligatorios para avanzar.
            </p>
          </div>
        </aside>

        {/* Right panel: Active form */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile progress bar */}
          <div className="lg:hidden px-4 pt-3 pb-2">
            <div className="flex justify-between mb-1">
              <span className="font-mono-tech text-xs text-[#4a5568]">
                Baldosa {activeTile} de 8
              </span>
              <span className="font-mono-tech text-xs" style={{ color: '#00E5FF' }}>
                {Math.round(progressPercent)}%
              </span>
            </div>
            <div className="h-1 rounded-full overflow-hidden" style={{ background: '#1e1e2e' }}>
              <motion.div
                className="h-full rounded-full progress-bar"
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Mobile tile grid */}
          <div className="lg:hidden px-4 pt-2 pb-3">
            <div className="grid grid-cols-8 gap-1.5">
              {TILES.map((tile) => {
                const status = getTileStatus(tile.id);
                return (
                  <button
                    key={tile.id}
                    onClick={() => handleTileClick(tile.id)}
                    disabled={status === 'locked'}
                    className="aspect-square rounded flex items-center justify-center transition-all"
                    style={{
                      background: status === 'completed' ? 'rgba(0,229,255,0.15)' :
                        activeTile === tile.id ? 'rgba(0,229,255,0.08)' : '#111118',
                      border: status === 'completed' || activeTile === tile.id
                        ? '1px solid #00E5FF'
                        : '1px solid #1e1e2e',
                    }}
                  >
                    <span className="font-mono-tech text-[8px]" style={{
                      color: status === 'completed' || activeTile === tile.id ? '#00E5FF' : '#2a2a3e',
                    }}>
                      {tile.id}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form area */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-2xl mx-auto px-4 lg:px-8 py-6">
              {/* Tile header */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTile}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Tile number + title */}
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-mono-tech font-bold text-sm"
                      style={{
                        background: 'rgba(0,229,255,0.1)',
                        border: '1px solid rgba(0,229,255,0.3)',
                        color: '#00E5FF',
                      }}
                    >
                      {String(activeTile).padStart(2, '0')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{activeTileConfig.icon}</span>
                        <h1 className="font-display font-black text-2xl text-white">
                          {activeTileConfig.title}
                        </h1>
                      </div>
                      <p className="text-[#94a3b8] text-sm">{activeTileConfig.subtitle}</p>
                    </div>
                  </div>

                  {/* Form card */}
                  <div
                    className="rounded-2xl p-6 mb-6"
                    style={{
                      background: '#0d0d18',
                      border: '1px solid #1e1e2e',
                    }}
                  >
                    <ActiveForm data={formData} onChange={handleFieldChange} />
                  </div>

                  {/* Navigation buttons */}
                  <div className="flex items-center justify-between gap-4">
                    <button
                      onClick={handlePrev}
                      disabled={activeTile === 1}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-display font-medium text-sm transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#00E5FF]/40"
                      style={{
                        background: 'transparent',
                        border: '1px solid #2a2a3e',
                        color: '#94a3b8',
                      }}
                    >
                      <ChevronLeft size={16} />
                      Anterior
                    </button>

                    <div className="flex items-center gap-2">
                      {TILES.map((tile) => {
                        const status = getTileStatus(tile.id);
                        return (
                          <div
                            key={tile.id}
                            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                            style={{
                              background: status === 'completed' ? '#00E5FF' :
                                activeTile === tile.id ? '#00E5FF' : '#2a2a3e',
                              transform: activeTile === tile.id ? 'scale(1.5)' : 'scale(1)',
                            }}
                          />
                        );
                      })}
                    </div>

                    <button
                      onClick={handleNext}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-bold text-sm transition-all duration-200 hover:scale-105 glow-cyan"
                      style={{
                        background: 'linear-gradient(135deg, #00E5FF, #00b8cc)',
                        color: '#0a0a0f',
                      }}
                    >
                      {activeTile === 8 ? (
                        <>
                          Finalizar
                          <CheckCircle size={16} />
                        </>
                      ) : (
                        <>
                          Siguiente
                          <ChevronRight size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
