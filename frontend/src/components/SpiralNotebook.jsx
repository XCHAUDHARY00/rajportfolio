import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DEFAULT_ROLES = [
  'Backend Developer',
  'Web Developer',
  'Full Stack Developer',
  'iOS Developer',
  'UI/UX Designer',
];

// ── Web Audio API Realistic Paper Rustle / Fold Sound ──
function playPaperFoldSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Generate 150ms of textured white/pink noise for authentic paper friction
    const bufferSize = Math.floor(ctx.sampleRate * 0.15);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      const decay = Math.exp(-i / (bufferSize * 0.3));
      data[i] = (Math.random() * 2 - 1) * decay;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // Bandpass filter centered around 1300Hz to mimic physical paper flap
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(1350, ctx.currentTime);
    bandpass.Q.setValueAtTime(1.6, ctx.currentTime);

    // Highpass to eliminate heavy thud, preserving delicate paper rustle
    const highpass = ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.setValueAtTime(650, ctx.currentTime);

    // Quick natural attack & exponential decay
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.22, ctx.currentTime + 0.025);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.14);

    noise.connect(bandpass);
    bandpass.connect(highpass);
    highpass.connect(gainNode);
    gainNode.connect(ctx.destination);

    noise.start();
    noise.stop(ctx.currentTime + 0.15);
  } catch (err) {
    // Graceful fallback if audio is not permitted by browser
  }
}

export default function SpiralNotebook({ profile = {}, roles = null }) {
  const [index, setIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const userInteractedRef = useRef(false);

  // Parse roles from profile or fallback to strictly the 5 specified roles
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
      if (userInteractedRef.current) {
        playPaperFoldSound();
      }
    }, 4200);
    return () => clearInterval(timer);
  }, [activeRoles.length]);

  const handleNext = () => {
    userInteractedRef.current = true;
    setIsFlipping(true);
    playPaperFoldSound();
    setIndex((prev) => (prev + 1) % activeRoles.length);
    setTimeout(() => setIsFlipping(false), 700);
  };

  const currentRole = activeRoles[index % activeRoles.length];
  const nextRole = activeRoles[(index + 1) % activeRoles.length];
  const pageNumber = String((index % activeRoles.length) + 1).padStart(2, '0');
  const totalPages = String(activeRoles.length).padStart(2, '0');

  return (
    <div
      onClick={handleNext}
      className="relative cursor-pointer select-none w-full max-w-[390px] sm:max-w-[480px] pt-4 group"
      style={{ perspective: '1400px' }}
      title="Tap to flip calendar page with real sound"
    >
      {/* ── Metallic Wire Spiral Loops (Top Calendar Binding) ── */}
      <div className="absolute top-0 inset-x-5 flex justify-between z-40 pointer-events-none">
        {[...Array(14)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            {/* Top Wire Loop Ring with metallic specular shine */}
            <div
              className="w-[11px] h-[20px] rounded-full border-2 border-[#6E685E] dark:border-[#4B473E] -mb-2.5 shadow-sm transform group-hover:scale-105 transition-transform"
              style={{
                background:
                  'linear-gradient(135deg, #FFFFFF 0%, #D8D2C4 30%, #7E786C 75%, #2B2822 100%)',
              }}
            />
            {/* Paper Punch Hole Shadow */}
            <div className="w-[6px] h-[6px] rounded-full bg-[#1C1A18]/35 dark:bg-black/95 shadow-inner" />
          </div>
        ))}
      </div>

      {/* ── Physical Stack Thickness (Layered backing sheets) ── */}
      <div className="absolute inset-x-3 -bottom-3.5 h-20 rounded-2xl bg-[#D2CBC0] dark:bg-[#1A1A1D] border border-black/10 dark:border-white/5 shadow-xs transform translate-y-1.5 z-0" />
      <div className="absolute inset-x-1.5 -bottom-1.5 h-20 rounded-2xl bg-[#DFD8CC] dark:bg-[#232327] border border-black/10 dark:border-white/5 shadow-xs z-0" />

      {/* ── Underneath "Next Page" Sheet (Revealed as active sheet flips) ── */}
      <div className="absolute inset-0 top-4 z-10 rounded-2xl bg-[#F6F2EA] dark:bg-[#222226] border border-[#D5CDBC] dark:border-[#38383D] pt-6 pb-5 px-6 sm:px-8 flex flex-col justify-between overflow-hidden shadow-sm">
        {/* Subtle notebook ruled lines */}
        <div className="absolute inset-x-0 bottom-4 h-px bg-black/[0.04] dark:bg-white/[0.04]" />
        <div className="relative min-h-[52px] flex items-center">
          <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-[#1C1A18]/50 dark:text-[#FAF7F2]/50 font-sans">
            {nextRole}
          </h2>
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-[#8C877D]/60 dark:text-[#88837A]/60 pt-2">
          <span className="text-[10px] uppercase tracking-wider">Next sheet</span>
          <span>
            {String(((index + 1) % activeRoles.length) + 1).padStart(2, '0')} / {totalPages}
          </span>
        </div>
      </div>

      {/* ── Active Turning Page Sheet (Realistic 3D Paper Fold & Shadow) ── */}
      <div className="relative z-20 min-h-[130px] sm:min-h-[142px]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={index}
            initial={{
              rotateX: 85,
              opacity: 0,
              scale: 0.96,
              transformOrigin: 'top center',
            }}
            animate={{
              rotateX: 0,
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.68,
                ease: [0.16, 1, 0.3, 1], // Smooth physical damping
              },
            }}
            exit={{
              rotateX: -105,
              opacity: 0,
              scale: 0.94,
              transition: {
                duration: 0.52,
                ease: [0.45, 0, 0.2, 1], // Realistic paper flip acceleration
              },
            }}
            style={{
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
            }}
            className="w-full rounded-2xl bg-white dark:bg-[#2A2A2E] border border-[#DDD6C9] dark:border-[#3E3E44] shadow-[0_18px_38px_-10px_rgba(0,0,0,0.18)] dark:shadow-[0_22px_45px_-10px_rgba(0,0,0,0.7)] pt-6 pb-5 px-6 sm:px-8 flex flex-col justify-between overflow-hidden"
          >
            {/* Dynamic Paper Fold Crease Shadow */}
            <motion.div
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.08) 25%, transparent 60%)',
              }}
            />

            {/* Subtle Parchment Sheen */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, transparent 40%, rgba(0,0,0,0.03) 100%)',
              }}
            />

            {/* Notebook Lined Watermark */}
            <div className="absolute inset-x-0 bottom-4 h-px bg-black/[0.04] dark:bg-white/[0.04]" />

            {/* Role Title Headline */}
            <div className="relative min-h-[52px] flex items-center z-10">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1C1A18] dark:text-[#FAF7F2] font-sans">
                {currentRole}
              </h2>
            </div>

            {/* Page Footer Meta & Interactive Hint */}
            <div className="flex items-center justify-between text-[11px] font-mono text-[#8C877D] dark:text-[#88837A] pt-2 z-10 border-t border-black/[0.05] dark:border-white/[0.06]">
              <span className="text-[10px] uppercase tracking-wider opacity-85 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span>Tap page to flip &bull; Sound enabled</span>
              </span>
              <span className="font-semibold text-[#1C1A18] dark:text-[#FAF7F2]">
                {pageNumber} / {totalPages}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
