import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, RotateCw, Award, ShieldCheck, Cpu, Database, Cloud } from 'lucide-react';

export default function AbilityCardModal({ isOpen, onClose, profile }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const cardRef = useRef(null);

  // Simulated power-up sequence when opened
  useEffect(() => {
    if (isOpen) {
      setLoadProgress(0);
      setIsFlipped(false);
      const start = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - start;
        const p = Math.min(100, Math.floor((elapsed / 600) * 100));
        setLoadProgress(p);
        if (p >= 100) clearInterval(interval);
      }, 20);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0.5, y: 0.5 });
  };

  // Card 3D tilt calculation
  const rotateY = (mousePos.x - 0.5) * 28;
  const rotateX = (0.5 - mousePos.y) * 28;
  const glareX = mousePos.x * 100;
  const glareY = mousePos.y * 100;

  const photoUrl = profile?.photo_url || profile?.profile_photo_url;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto"
          onClick={onClose}
        >
          {/* Ambient Gold Floating Dust Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(18)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-amber-400/60 blur-[0.5px]"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0.2,
                }}
                animate={{
                  y: [null, Math.random() * -120 - 40],
                  opacity: [0.2, 0.8, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            ))}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/15"
          >
            <X size={20} />
          </button>

          {/* Modal Container */}
          <div
            className="relative z-10 flex flex-col items-center max-w-sm sm:max-w-md w-full my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Loading Progress Header */}
            <div className="w-full flex items-center justify-between text-xs font-mono text-amber-400/80 mb-3 px-2">
              <span className="flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles size={13} className="text-amber-400 animate-pulse" />
                <span>Holographic Ability Card</span>
              </span>
              <span>{loadProgress}% LOADED</span>
            </div>

            {/* The 3D Trading Card */}
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => setIsFlipped(!isFlipped)}
              style={{
                perspective: '1200px',
              }}
              className="w-full max-w-[360px] aspect-[1/1.55] cursor-pointer select-none relative group"
            >
              <motion.div
                animate={{
                  rotateY: (isFlipped ? 180 : 0) + rotateY,
                  rotateX: rotateX,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 24,
                }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
                className="w-full h-full relative rounded-3xl"
              >
                {/* ── CARD FRONT ── */}
                <div
                  style={{
                    backfaceVisibility: 'hidden',
                  }}
                  className="absolute inset-0 rounded-3xl bg-[#18181B] border-2 border-[#D4AF37] p-5 flex flex-col justify-between overflow-hidden shadow-[0_24px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(212,175,55,0.25)]"
                >
                  {/* Holographic Rainbow Foil Overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity duration-300 holo-rainbow"
                    style={{
                      backgroundPosition: `${glareX}% ${glareY}%`,
                    }}
                  />

                  {/* Specular Light Flare */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-25 group-hover:opacity-60 transition-opacity"
                    style={{
                      background: `radial-gradient(circle 180px at ${glareX}% ${glareY}%, rgba(255,255,255,0.8), transparent 70%)`,
                    }}
                  />

                  {/* Top Bar: Level & Badge */}
                  <div className="relative z-10 flex items-center justify-between border-b border-amber-400/20 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                        LVL 8 • 7.86 CGPA
                      </span>
                    </div>
                    <span className="text-[11px] font-mono tracking-widest text-amber-400/90 font-bold uppercase">
                      ARCHITECT
                    </span>
                  </div>

                  {/* Character Avatar Box */}
                  <div className="relative z-10 my-3 rounded-2xl overflow-hidden bg-black/60 border border-amber-400/30 aspect-[16/10] flex items-center justify-center">
                    {photoUrl ? (
                      <img
                        src={photoUrl}
                        alt="Raj Chaudhary"
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center p-4">
                        <span className="font-serif text-3xl font-bold text-amber-400">RC</span>
                        <span className="text-xs text-white/60 mt-1">Backend Engineer</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#18181B] via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-2 left-3 right-3 flex items-baseline justify-between">
                      <p className="font-bold text-white text-base font-sans drop-shadow">
                        Raj Chaudhary
                      </p>
                      <span className="text-[10px] font-mono text-amber-400">AKGEC CSIT</span>
                    </div>
                  </div>

                  {/* Skill Stat Bars */}
                  <div className="relative z-10 space-y-2 text-xs font-mono">
                    {[
                      { name: 'System Architecture', val: 95, color: '#D4AF37' },
                      { name: 'Python & Django APIs', val: 96, color: '#22C55E' },
                      { name: 'PostgreSQL & DynamoDB', val: 92, color: '#38BDF8' },
                      { name: 'AWS & Cloud Scale', val: 89, color: '#F97316' },
                      { name: 'DSA & Algorithms', val: 86, color: '#A855F7' },
                    ].map((s) => (
                      <div key={s.name} className="space-y-0.5">
                        <div className="flex justify-between text-[10px] text-white/80">
                          <span>{s.name}</span>
                          <span className="font-bold text-amber-400">{s.val}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${s.val}%` }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: s.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Badges Strip */}
                  <div className="relative z-10 pt-3 border-t border-amber-400/20 flex items-center justify-between text-[10px] font-mono text-white/60">
                    <span className="flex items-center gap-1">
                      <Award size={12} className="text-amber-400" /> JPMorgan Virt.
                    </span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={12} className="text-emerald-400" /> 150+ DSA
                    </span>
                    <span className="flex items-center gap-1 text-amber-400">
                      <RotateCw size={11} className="animate-spin" /> Flip 360°
                    </span>
                  </div>
                </div>

                {/* ── CARD BACK ── */}
                <div
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                  className="absolute inset-0 rounded-3xl bg-[#141416] border-2 border-[#D4AF37] p-6 flex flex-col justify-between overflow-hidden shadow-[0_24px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(212,175,55,0.25)] text-center"
                >
                  {/* Holographic foil */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-40 holo-rainbow"
                    style={{
                      backgroundPosition: `${100 - glareX}% ${100 - glareY}%`,
                    }}
                  />

                  {/* Top Seal */}
                  <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-amber-400/70 border-b border-amber-400/20 pb-2">
                    <span>SPECIAL EDITION</span>
                    <span>AUTHENTICATED</span>
                  </div>

                  {/* Golden Astrological / Compass Monogram Emblem */}
                  <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                    <div className="relative w-28 h-28 rounded-full border-2 border-amber-400/40 flex items-center justify-center p-2 mb-4">
                      {/* Rotating compass ring */}
                      <div className="absolute inset-0 rounded-full border border-dashed border-amber-400/60 animate-[spin_24s_linear_infinite]" />
                      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#B89230] to-[#FFE9B3] flex items-center justify-center shadow-lg">
                        <span className="font-serif font-black text-2xl text-[#261C08] tracking-wider">
                          RC
                        </span>
                      </div>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-amber-300 tracking-tight">
                      Architect of Distributed Systems
                    </h3>
                    <p className="text-xs text-white/70 italic max-w-xs mt-3 leading-relaxed font-sans">
                      &ldquo;Writing clean backend code isn&apos;t just about making it work &mdash;
                      it&apos;s about building architectures that gracefully handle scale, failures,
                      and time.&rdquo;
                    </p>
                  </div>

                  {/* Bottom Verification Seal */}
                  <div className="relative z-10 border-t border-amber-400/20 pt-3 flex items-center justify-between text-[10px] font-mono text-white/50">
                    <span>SERIAL: 001/2026</span>
                    <span className="text-amber-400 font-bold">CLICK TO FLIP FRONT</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <p className="text-xs font-mono text-white/50 mt-4 text-center">
              Move cursor to tilt 3D hologram • Click card to flip 360°
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

