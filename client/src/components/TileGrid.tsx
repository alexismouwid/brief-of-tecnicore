// ============================================================
// TECNICOR BRIEF — TileGrid Component
// Philosophy: Terminal Floor — 8 tiles in a 4x2 grid
// Each tile shows its status: locked | pending | active | completed
// ============================================================

import { motion } from 'framer-motion';
import { CheckCircle, Lock } from 'lucide-react';
import { TILES, TileStatus } from '@/lib/briefData';

interface TileGridProps {
  tileStatuses: TileStatus[];
  activeTile: number;
  onTileClick: (tileId: number) => void;
}

export default function TileGrid({ tileStatuses, activeTile, onTileClick }: TileGridProps) {
  return (
    <div className="grid grid-cols-4 gap-3 w-full">
      {TILES.map((tile, index) => {
        const status = tileStatuses[index];
        const isActive = activeTile === tile.id;
        const isClickable = status !== 'locked';

        return (
          <motion.button
            key={tile.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            onClick={() => isClickable && onTileClick(tile.id)}
            disabled={!isClickable}
            className={`
              relative flex flex-col items-start justify-between
              p-3 rounded-lg text-left transition-all duration-300
              ${status === 'locked' ? 'tile-locked cursor-not-allowed' : ''}
              ${status === 'pending' ? 'tile-pending hover:border-[#00E5FF]/40 hover:bg-[#0d1020]' : ''}
              ${status === 'active' || isActive ? 'tile-active animate-pulse-cyan' : ''}
              ${status === 'completed' ? 'tile-completed' : ''}
              ${isActive && status !== 'completed' ? 'ring-1 ring-[#00E5FF]/50' : ''}
            `}
            style={{ minHeight: '90px' }}
          >
            {/* Tile number */}
            <span
              className="font-mono-tech text-xs font-bold mb-1"
              style={{
                color: status === 'locked' ? '#2a2a3e' : status === 'completed' ? '#00E5FF' : '#4a5568',
              }}
            >
              {String(tile.id).padStart(2, '0')}
            </span>

            {/* Icon */}
            <div className="text-lg mb-1">
              {status === 'locked' ? (
                <Lock size={16} className="text-[#2a2a3e]" />
              ) : status === 'completed' ? (
                <CheckCircle size={16} className="text-[#00E5FF]" />
              ) : (
                <span className={status === 'active' || isActive ? 'text-[#00E5FF]' : 'text-[#4a5568]'}>
                  {tile.icon}
                </span>
              )}
            </div>

            {/* Title */}
            <div>
              <p
                className="font-display font-bold text-xs leading-tight"
                style={{
                  color: status === 'locked' ? '#2a2a3e' :
                    status === 'completed' ? '#00E5FF' :
                    isActive ? '#ffffff' : '#94a3b8',
                }}
              >
                {tile.title}
              </p>
            </div>

            {/* Active indicator */}
            {isActive && status !== 'completed' && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-lg"
                style={{ background: 'linear-gradient(90deg, #00E5FF, #00FF88)' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}

            {/* Completed overlay glow */}
            {status === 'completed' && (
              <div
                className="absolute inset-0 rounded-lg pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at center, rgba(0,229,255,0.05) 0%, transparent 70%)',
                }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
