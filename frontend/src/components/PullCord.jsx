import { useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function PullCord() {
  const { isDark, toggleTheme } = useTheme();
  const [pulling, setPulling] = useState(false);
  const controls = useAnimation();
  const audioContextRef = useRef(null);

  // Subtle realistic mechanical click sound via Web Audio API
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
      osc.frequency.setValueAtTime(isDark ? 520 : 380, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Audio not permitted or supported
    }
  };

  const handlePull = async () => {
    if (pulling) return;
    setPulling(true);
    playClickSound();

    // Pull down animation
    await controls.start({
      y: 42,
      transition: { type: 'spring', stiffness: 500, damping: 25 },
    });

    toggleTheme();

    // Spring bounce back up
    await controls.start({
      y: 0,
      transition: { type: 'spring', stiffness: 450, damping: 14 },
    });

    setPulling(false);
  };

  return (
    <div
      className="relative flex flex-col items-center cursor-pointer select-none group"
      onClick={handlePull}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      style={{ width: '36px' }}
    >
      <motion.div
        animate={controls}
        whileHover={{
          rotate: [-1.5, 2, -2, 1, 0],
          transition: { duration: 0.6, ease: 'easeInOut' },
        }}
        className="flex flex-col items-center origin-top"
      >
        {/* Beaded ball chain */}
        <div className="flex flex-col items-center gap-[3px] pt-0">
          {[...Array(14)].map((_, i) => (
            <span
              key={i}
              className={`w-[3px] h-[3px] rounded-full transition-colors ${
                isDark
                  ? 'bg-amber-300/80 shadow-[0_0_2px_rgba(251,191,36,0.6)]'
                  : 'bg-[#8F7D66]'
              }`}
            />
          ))}
        </div>

        {/* Small connector ring */}
        <div
          className={`w-[5px] h-[5px] rounded-full border transition-colors ${
            isDark ? 'bg-amber-400 border-amber-200' : 'bg-[#BFA054] border-[#7D5F1E]'
          }`}
        />

        {/* Skeuomorphic Wooden/Brass Teardrop Pendant */}
        <div className="relative mt-[2px] transition-transform group-hover:scale-105 active:scale-95">
          {/* 3D Drop Shadow */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-2 bg-black/40 blur-[3px] rounded-full" />

          {/* Pendant Body */}
          <div
            className={`w-[14px] h-[28px] rounded-t-[50%] rounded-b-[40%] relative overflow-hidden transition-all shadow-md ${
              isDark
                ? 'shadow-[0_2px_8px_rgba(251,191,36,0.25)]'
                : 'shadow-[0_4px_8px_rgba(0,0,0,0.35)]'
            }`}
            style={{
              background: isDark
                ? 'linear-gradient(135deg, #F5D794 0%, #B89230 45%, #6B4E10 85%, #3B2A06 100%)'
                : 'linear-gradient(135deg, #A46C44 0%, #6E3F1F 45%, #46250E 85%, #2B1506 100%)',
            }}
          >
            {/* Specular Highlight along the left curvature */}
            <div
              className="absolute top-[2px] left-[2px] w-[3px] h-[22px] rounded-full opacity-60 pointer-events-none"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 90%)',
              }}
            />

            {/* Bottom brass cap */}
            <div
              className="absolute bottom-0 inset-x-0 h-[4px]"
              style={{
                background: 'linear-gradient(90deg, #8C6A1E 0%, #ECC880 50%, #8C6A1E 100%)',
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
