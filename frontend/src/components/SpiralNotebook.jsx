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

export default function SpiralNotebook({ profile = {}, roles = null }) {
  const [index, setIndex] = useState(0);

  // Parse roles from profile.hero_roles_list or fallback to props/default
  const parsedRoles = (profile?.hero_roles_list || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const activeRoles =
    parsedRoles.length > 0
      ? parsedRoles
      : roles && roles.length > 0
      ? roles
      : DEFAULT_ROLES;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % activeRoles.length);
    }, 3400);
    return () => clearInterval(timer);
  }, [activeRoles.length]);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % activeRoles.length);
  };

  const currentRole = activeRoles[index % activeRoles.length];
  const nextRole = activeRoles[(index + 1) % activeRoles.length];
  const pageNumber = String((index % activeRoles.length) + 1).padStart(2, '0');
  const totalPages = String(activeRoles.length).padStart(2, '0');

  return (
    <div
      onClick={handleNext}
      className="relative cursor-pointer select-none perspective-1200 w-full max-w-[390px] sm:max-w-[500px] pt-4"
      title="Tap to flip calendar page"
    >
      {/* ── Metallic Wire Spiral Loops (Top Calendar Binding) ── */}
      <div className="absolute top-0 inset-x-4 flex justify-between z-30 pointer-events-none">
        {[...Array(14)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            {/* Top Wire Loop Ring */}
            <div
              className="w-[11px] h-[18px] rounded-full border-2 border-[#7D786F] dark:border-[#524E46] -mb-2 shadow-xs"
              style={{
                background:
                  'linear-gradient(135deg, #FFFFFF 0%, #D4CEBF 35%, #8A8478 75%, #3D3933 100%)',
              }}
            />
            {/* Paper Punch Hole Shadow */}
            <div className="w-[6px] h-[6px] rounded-full bg-[#1C1A18]/30 dark:bg-black/90 shadow-inner" />
          </div>
        ))}
      </div>

      {/* ── Layered Background Pages (Physical Pad Thickness Stack) ── */}
      <div className="absolute inset-x-3 -bottom-3 h-20 rounded-2xl bg-[#D6D0C2] dark:bg-[#1A1A1D] border border-black/10 dark:border-white/5 shadow-xs transform translate-y-1.5 z-0" />
      <div className="absolute inset-x-1.5 -bottom-1.5 h-20 rounded-2xl bg-[#E4DDD0] dark:bg-[#222226] border border-black/10 dark:border-white/5 shadow-xs z-0" />

      {/* ── Underneath "Next Page" Sheet (Visible during physical flip) ── */}
      <div className="absolute inset-0 top-4 z-10 rounded-2xl bg-[#FAF7F2] dark:bg-[#26262A] border border-[#DDD5C7] dark:border-[#38383D] pt-6 pb-5 px-6 sm:px-8 flex flex-col justify-between overflow-hidden shadow-sm">
        <div className="absolute inset-x-0 bottom-4 h-px bg-black/[0.04] dark:bg-white/[0.04]" />
        <div className="relative min-h-[52px] flex items-center">
          <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-[#1C1A18]/60 dark:text-[#FAF7F2]/60 font-sans">
            {nextRole}
          </h2>
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-[#8C877D]/60 dark:text-[#88837A]/60 pt-2">
          <span className="text-[10px] uppercase tracking-wider">Next</span>
          <span>
            {String(((index + 1) % activeRoles.length) + 1).padStart(2, '0')} / {totalPages}
          </span>
        </div>
      </div>

      {/* ── Active Turning Page Sheet (Physical Fold / Flip Animation) ── */}
      <div className="relative z-20 min-h-[125px] sm:min-h-[135px]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={index}
            initial={{
              rotateX: 85,
              opacity: 0.1,
              transformOrigin: 'top center',
              scale: 0.98,
            }}
            animate={{
              rotateX: 0,
              opacity: 1,
              scale: 1,
              transition: {
                type: 'spring',
                stiffness: 260,
                damping: 20,
                mass: 0.9,
              },
            }}
            exit={{
              rotateX: -110,
              opacity: 0,
              scale: 0.96,
              transition: {
                duration: 0.42,
                ease: [0.4, 0, 0.2, 1],
              },
            }}
            style={{
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
            }}
            className="w-full rounded-2xl bg-white dark:bg-[#2A2A2E] border border-[#DDD6C9] dark:border-[#3D3D42] shadow-[0_16px_36px_-8px_rgba(0,0,0,0.16)] dark:shadow-[0_20px_40px_-8px_rgba(0,0,0,0.6)] pt-6 pb-5 px-6 sm:px-8 flex flex-col justify-between overflow-hidden"
          >
            {/* Lined Notebook Watermark */}
            <div className="absolute inset-x-0 bottom-4 h-px bg-black/[0.04] dark:bg-white/[0.04]" />

            {/* Dynamic Light Sheen / Paper Fold Reflection during Flip */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 30%, rgba(0,0,0,0.04) 100%)',
              }}
            />

            {/* Role Title Headline */}
            <div className="relative min-h-[52px] flex items-center z-10">
              <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-[#1C1A18] dark:text-[#FAF7F2] font-sans">
                {currentRole}
              </h2>
            </div>

            {/* Page Footer Meta */}
            <div className="flex items-center justify-between text-[11px] font-mono text-[#8C877D] dark:text-[#88837A] pt-2 z-10">
              <span className="text-[10px] uppercase tracking-wider opacity-80 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span>Tap to flip</span>
              </span>
              <span className="font-semibold text-[#1C1A18] dark:text-amber-400">
                {pageNumber} / {totalPages}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
