import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onFinish }) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (onFinish) setTimeout(onFinish, 300);
          return 100;
        }
        const step = Math.floor(Math.random() * 15) + 8;
        return Math.min(100, prev + step);
      });
    }, 70);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#EFECE6] dark:bg-[#101012] overflow-hidden select-none"
    >
      {/* ── 3D Colorful Ambient Blur Orbs (Combining Website Palette) ── */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          rotate: [0, 90, 0],
          x: [-30, 40, -30],
          y: [-20, 30, -20],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full bg-[#1E2B3E]/30 dark:bg-[#1E2B3E]/60 blur-[110px] pointer-events-none"
      />

      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [0, -120, 0],
          x: [40, -30, 40],
          y: [30, -40, 30],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 -right-28 w-[520px] h-[520px] rounded-full bg-[#9E5B3E]/30 dark:bg-[#9E5B3E]/55 blur-[120px] pointer-events-none"
      />

      <motion.div
        animate={{
          scale: [0.9, 1.3, 0.9],
          x: [-40, 20, -40],
          y: [40, -30, 40],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-28 left-1/4 w-[480px] h-[480px] rounded-full bg-[#4D5D4E]/30 dark:bg-[#4D5D4E]/50 blur-[115px] pointer-events-none"
      />

      <motion.div
        animate={{
          scale: [1.1, 0.85, 1.1],
          rotate: [0, 180, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 right-1/4 w-[420px] h-[420px] rounded-full bg-[#3D2636]/25 dark:bg-[#3D2636]/60 blur-[105px] pointer-events-none"
      />

      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [0.9, 1.15, 0.9],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 m-auto w-[340px] h-[340px] rounded-full bg-[#ECC880]/25 dark:bg-[#ECC880]/20 blur-[90px] pointer-events-none"
      />

      {/* ── Centered 3D Monogram & Progress Indicator ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Pulsing Concentric Rings */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center mb-8">
          <div className="absolute inset-0 rounded-full border border-black/10 dark:border-white/10 animate-ping opacity-25" />
          <div className="absolute inset-2 rounded-full border border-black/15 dark:border-white/15 animate-[spin_12s_linear_infinite]" />
          <div className="absolute inset-4 rounded-full border border-dashed border-[#ECC880]/60 dark:border-[#ECC880]/40 animate-[spin_20s_linear_infinite_reverse]" />

          {/* Core Brass/Charcoal Monogram */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/80 dark:bg-[#1C1C20]/90 backdrop-blur-xl border border-black/10 dark:border-white/20 shadow-2xl flex items-center justify-center text-[#1C1A18] dark:text-[#FAF7F2] font-serif text-2xl sm:text-3xl font-bold tracking-tight"
          >
            RC
          </motion.div>
        </div>

        {/* Progress Percent */}
        <div className="flex items-baseline gap-1 font-mono">
          <span className="text-4xl sm:text-5xl font-black text-[#1C1A18] dark:text-white tracking-tight">
            {percent}
          </span>
          <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">%</span>
        </div>

        {/* Progress Bar Line */}
        <div className="w-48 sm:w-60 h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden my-4">
          <motion.div
            className="h-full bg-gradient-to-r from-[#1E2B3E] via-[#9E5B3E] to-[#ECC880] rounded-full transition-all duration-150"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Clean Editorial Title */}
        <p className="text-[11px] font-mono tracking-[0.22em] uppercase text-[#736D64] dark:text-[#A8A196] font-semibold">
          Architecting 3D Experience
        </p>
      </div>
    </motion.div>
  );
}

