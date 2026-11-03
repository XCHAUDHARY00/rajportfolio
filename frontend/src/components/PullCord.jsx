import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function PullCord() {
  const { isDark, toggleTheme } = useTheme();
  const [pulling, setPulling] = useState(false);
  const [swayAngle, setSwayAngle] = useState(0);
  const controls = useAnimation();
  const audioContextRef = useRef(null);
  const containerRef = useRef(null);

  // Mechanical switch click sound via Web Audio API
  const playClickSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(isDark ? 560 : 380, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch {
      // Audio fallback
    }
  };

  // Pull cord down & toggle theme with realistic spring physics
  const handlePull = async () => {
    if (pulling) return;
    setPulling(true);
    playClickSound();

    // Pull down
    await controls.start({
      y: 54,
      rotate: 0,
      transition: { type: 'spring', stiffness: 520, damping: 22 },
    });

    toggleTheme();

    // Recoil bounce back up with decaying pendulum sway
    await controls.start({
      y: 0,
      rotate: [0, -18, 15, -10, 6, -3, 0],
      transition: {
        y: { type: 'spring', stiffness: 440, damping: 16 },
        rotate: { duration: 1.4, ease: 'easeOut' },
      },
    });

    setPulling(false);
  };

  // Ultra-flexible mouse sway physics across a wider tracking zone
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (pulling || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const anchorX = rect.left + rect.width / 2;
      const diffX = e.clientX - anchorX;

      // React smoothly when mouse is within 250px of the cord
      if (Math.abs(diffX) < 250 && e.clientY < rect.bottom + 120) {
        const factor = Math.max(-1, Math.min(1, diffX / 140));
        setSwayAngle(factor * 26);
      } else {
        setSwayAngle(0);
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [pulling]);

  return (
    <div
      ref={containerRef}
      onClick={handlePull}
      className="fixed top-0 right-6 sm:right-10 z-50 flex flex-col items-center cursor-pointer select-none group"
      style={{ width: '64px', height: '185px' }}
    >
      <motion.div
        animate={controls}
        className="flex flex-col items-center origin-top relative"
        style={{ transformOrigin: 'top center' }}
      >
        {/* Soft cast shadow on the wall behind the entire hanging chain and bell */}
        <motion.div
          animate={{
            x: swayAngle * 0.45,
            rotate: swayAngle * 0.9,
          }}
          transition={{ type: 'spring', stiffness: 140, damping: 15 }}
          className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-[160px] bg-black/15 dark:bg-black/45 blur-[6px] rounded-full pointer-events-none origin-top -z-10"
        />

        {/* Animated flexible pendulum sway wrapper with smooth spring inertia */}
        <motion.div
          animate={{
            rotate: swayAngle,
            rotateY: swayAngle * 1.4,
          }}
          transition={{
            type: 'spring',
            stiffness: 140,
            damping: 12,
            mass: 0.8,
          }}
          className="flex flex-col items-center origin-top"
          style={{ transformOrigin: 'top center' }}
        >
          {/* Ceiling Mount Bracket */}
          <div
            className={`w-[11px] h-[5px] rounded-b-md border shadow-xs transition-colors ${
              isDark
                ? 'bg-amber-400 border-amber-200'
                : 'bg-[#BFA054] border-[#7D5F1E]'
            }`}
          />

          {/* Long Hanging Beaded Ball Chain (~22 beads down past header) with flexible micro-sway */}
          <div className="flex flex-col items-center gap-[3px] py-[1px]">
            {[...Array(22)].map((_, i) => (
              <span
                key={i}
                style={{
                  transform: `translateX(${Math.sin((i / 22) * Math.PI) * (swayAngle * 0.08)}px)`,
                }}
                className={`w-[3.5px] h-[3.5px] rounded-full transition-colors shadow-xs ${
                  isDark
                    ? 'bg-amber-300/90 shadow-[0_0_2px_rgba(251,191,36,0.6)]'
                    : 'bg-[#8A7964]'
                }`}
              />
            ))}
          </div>

          {/* Brass Coupling Collar */}
          <div
            className={`w-[9px] h-[6px] rounded-sm border my-[1px] transition-colors shadow-xs ${
              isDark
                ? 'bg-amber-400 border-amber-200'
                : 'bg-[#C9A95C] border-[#7D5F1E]'
            }`}
          />

          {/* ── BIG SKEUOMORPHIC TURNED WOOD / BRASS PENDANT BELL ── */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="relative mt-[2px] flex items-center justify-center transition-transform"
          >
            {/* Deep drop shadow under the bell */}
            <div
              className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-9 h-4 rounded-full blur-[6px] pointer-events-none transition-opacity ${
                isDark ? 'bg-black/90 opacity-85' : 'bg-black/40 opacity-75'
              }`}
            />

            {/* Bell Pendant (Large: 26px width x 48px height) */}
            <div
              className={`w-[26px] h-[48px] rounded-t-[50%] rounded-b-[42%] relative overflow-hidden transition-all border ${
                isDark
                  ? 'border-amber-300/40 shadow-[0_6px_20px_rgba(251,191,36,0.35)]'
                  : 'border-[#3D1D08]/50 shadow-[0_8px_20px_rgba(0,0,0,0.38)]'
              }`}
              style={{
                background: isDark
                  ? 'linear-gradient(135deg, #FDE68A 0%, #D4AF37 32%, #8C6A1E 70%, #4D3808 100%)'
                  : 'linear-gradient(135deg, #B57545 0%, #7E4520 32%, #4D250E 75%, #240E03 100%)',
              }}
            >
              {/* Glossy Specular Curved Highlight */}
              <div
                className="absolute top-[3px] left-[3px] w-[6px] h-[40px] rounded-full opacity-75 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.2) 65%, transparent 100%)',
                }}
              />

              {/* Top Brass Collar Trim */}
              <div
                className="absolute top-0 inset-x-0 h-[5px]"
                style={{
                  background:
                    'linear-gradient(90deg, #7D5F1E 0%, #ECC880 50%, #7D5F1E 100%)',
                }}
              />

              {/* Decorative Turned Grooves */}
              <div
                className="absolute top-[20px] inset-x-0 h-[1.5px] opacity-40"
                style={{
                  background: isDark
                    ? 'rgba(0,0,0,0.5)'
                    : 'rgba(255,255,255,0.3)',
                }}
              />
              <div
                className="absolute top-[28px] inset-x-0 h-[1px] opacity-30"
                style={{
                  background: isDark
                    ? 'rgba(0,0,0,0.5)'
                    : 'rgba(255,255,255,0.25)',
                }}
              />

              {/* Bottom Brass Tip Cap */}
              <div
                className="absolute bottom-0 inset-x-0 h-[6px]"
                style={{
                  background:
                    'linear-gradient(90deg, #7D5F1E 0%, #F5D794 50%, #59400D 100%)',
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
