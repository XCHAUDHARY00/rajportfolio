import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DEFAULT_ROLES = [
  'Backend Developer',
  'Python & Django Specialist',
  'REST API Architect',
  'Distributed Systems Engineer',
  'Cloud & DevOps Practitioner',
  'PostgreSQL & DynamoDB Specialist',
];

export default function SpiralNotebook({ roles = DEFAULT_ROLES }) {
  const [index, setIndex] = useState(0);
  const activeRoles = roles && roles.length > 0 ? roles : DEFAULT_ROLES;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % activeRoles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [activeRoles.length]);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % activeRoles.length);
  };

  const currentRole = activeRoles[index];
  const pageNumber = String(index + 1).padStart(2, '0');
  const totalPages = String(activeRoles.length).padStart(2, '0');

  return (
    <div
      onClick={handleNext}
      className="relative cursor-pointer select-none perspective-1000 w-full max-w-[380px] sm:max-w-[500px] pt-4"
      title="Click to flip role page"
    >
      {/* ── Metallic Wire Spiral Loops (Top Binding) ── */}
      <div className="absolute top-0 inset-x-4 flex justify-between z-20 pointer-events-none">
        {[...Array(14)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            {/* Upper loop arc */}
            <div
              className="w-[10px] h-[16px] rounded-full border-2 border-[#8A857D] dark:border-[#5A554D] -mb-2 shadow-xs"
              style={{
                background:
                  'linear-gradient(135deg, #FFFFFF 0%, #C2BCB2 40%, #7A756D 80%, #3D3A35 100%)',
              }}
            />
            {/* Paper Punch Hole */}
            <div className="w-[6px] h-[6px] rounded-full bg-[#1C1A18]/25 dark:bg-black/80" />
          </div>
        ))}
      </div>

      {/* ── Layered Background Pages (Physical Thickness) ── */}
      <div className="absolute inset-x-2 -bottom-2 h-16 rounded-2xl bg-[#DCD6CA] dark:bg-[#1E1E20] border border-black/10 dark:border-white/5 shadow-xs transform translate-y-1 z-0" />
      <div className="absolute inset-x-1 -bottom-1 h-16 rounded-2xl bg-[#E8E2D7] dark:bg-[#252528] border border-black/10 dark:border-white/5 shadow-xs z-0" />

      {/* ── Active Page Sheet ── */}
      <div className="relative z-10 rounded-2xl bg-white dark:bg-[#2A2A2E] border border-[#DDD6C9] dark:border-[#3D3D42] shadow-[0_12px_32px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_36px_-8px_rgba(0,0,0,0.5)] pt-6 pb-5 px-6 sm:px-8 overflow-hidden min-h-[120px] sm:min-h-[130px] flex flex-col justify-between">
        {/* Subtle lined notebook watermark / faint ruled line */}
        <div className="absolute inset-x-0 bottom-4 h-px bg-black/[0.04] dark:bg-white/[0.04]" />

        {/* 3D Flipping Role Text */}
        <div className="relative min-h-[50px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRole}
              initial={{ rotateX: 85, opacity: 0, y: -10 }}
              animate={{ rotateX: 0, opacity: 1, y: 0 }}
              exit={{ rotateX: -85, opacity: 0, y: 10 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="origin-top w-full"
            >
              <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-[#1C1A18] dark:text-[#FAF7F2] font-sans">
                {currentRole}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Page numbering at bottom right */}
        <div className="flex items-center justify-between text-[11px] font-mono text-[#8C877D] dark:text-[#88837A] pt-2">
          <span className="text-[10px] uppercase tracking-wider opacity-75">Click to flip</span>
          <span className="font-semibold">
            {pageNumber} / {totalPages}
          </span>
        </div>
      </div>
    </div>
  );
}
