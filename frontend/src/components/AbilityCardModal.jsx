import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  RotateCw,
  CheckCircle2,
  Code2,
  Server,
  Smartphone,
  Database,
  GraduationCap,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from 'lucide-react';

export default function AbilityCardModal({ isOpen, onClose, profile }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const cardRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsFlipped(false);
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
  const rotateY = (mousePos.x - 0.5) * 26;
  const rotateX = (0.5 - mousePos.y) * 26;
  const glareX = Math.round(mousePos.x * 100);
  const glareY = Math.round(mousePos.y * 100);

  const photoUrl = profile?.photo_url || profile?.profile_photo_url || '/raj_photo.png';

  const engineeringStats = [
    { name: 'Backend & High-Throughput APIs', val: 96, icon: Server, color: '#F59E0B' },
    { name: 'Native iOS & Mobile Systems (Swift)', val: 94, icon: Smartphone, color: '#38BDF8' },
    { name: 'Full Stack Web (React, Tailwind)', val: 95, icon: Code2, color: '#10B981' },
    { name: 'Databases (PostgreSQL, DynamoDB)', val: 92, icon: Database, color: '#818CF8' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto"
          onClick={onClose}
        >
          {/* Ethereal Floating Ghost Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(24)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gradient-to-r from-amber-400/50 via-teal-400/40 to-indigo-400/40 blur-[1px]"
                style={{
                  width: `${(i % 4) + 2}px`,
                  height: `${(i % 4) + 2}px`,
                  left: `${(i * 19) % 100}%`,
                  top: `${(i * 27) % 100}%`,
                }}
                animate={{
                  y: [0, -60, 0],
                  x: [0, (i % 2 === 0 ? 30 : -30), 0],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 5 + (i % 4) * 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 sm:top-6 sm:right-6 z-50 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/20 shadow-lg active:scale-90"
            title="Close modal (Esc)"
          >
            <X size={20} />
          </button>

          {/* Card Container */}
          <div
            className="relative z-10 flex flex-col items-center max-w-[420px] w-full my-auto py-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header pill indicator */}
            <div className="w-full flex items-center justify-between text-xs font-mono text-amber-400/90 mb-3 px-3">
              <span className="flex items-center gap-1.5 uppercase tracking-wider font-bold">
                <Sparkles size={14} className="text-amber-400 animate-spin" />
                <span>Holographic Ability Card</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                VERIFIED ID
              </span>
            </div>

            {/* ── 3D Tilting Trading Card ── */}
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => setIsFlipped(!isFlipped)}
              style={{ perspective: '1500px' }}
              className="w-full aspect-[1/1.6] max-h-[660px] cursor-pointer select-none relative group"
            >
              <motion.div
                animate={{
                  rotateY: (isFlipped ? 180 : 0) + rotateY,
                  rotateX: rotateX,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 280,
                  damping: 22,
                }}
                style={{ transformStyle: 'preserve-3d' }}
                className="w-full h-full relative rounded-[2rem]"
              >
                {/* ════════════════ CARD FRONT ════════════════ */}
                <div
                  style={{ backfaceVisibility: 'hidden' }}
                  className="absolute inset-0 rounded-[2rem] bg-[#141417] border-2 border-amber-400/70 p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_50px_rgba(217,119,6,0.3)]"
                >
                  {/* Holographic Iridescent Shimmer */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-35 group-hover:opacity-65 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(${120 + glareX * 0.6}deg, rgba(255,180,0,0.2) 0%, rgba(56,189,248,0.25) 30%, rgba(236,72,153,0.2) 60%, rgba(16,185,129,0.25) 100%)`,
                      backgroundSize: '200% 200%',
                    }}
                  />

                  {/* Specular Glare Spot */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-25 group-hover:opacity-50 transition-opacity"
                    style={{
                      background: `radial-gradient(circle 220px at ${glareX}% ${glareY}%, rgba(255,255,255,0.7), transparent 70%)`,
                    }}
                  />

                  {/* Top Header Row */}
                  <div className="relative z-10 flex items-center justify-between border-b border-amber-400/20 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300">
                        Raj Chaudhary
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30 font-semibold">
                      Full Stack &amp; iOS
                    </span>
                  </div>

                  {/* ── Photo Frame: FULLY VISIBLE & VIBRANT ── */}
                  <div className="relative z-10 my-2.5 rounded-2xl overflow-hidden bg-black/60 border border-amber-400/40 p-1.5 flex items-center justify-center shadow-inner">
                    <div className="w-full h-44 sm:h-52 rounded-xl overflow-hidden relative bg-[#1B1A1E]">
                      {photoUrl ? (
                        <img
                          src={photoUrl}
                          alt="Raj Chaudhary"
                          className="w-full h-full object-cover object-top filter brightness-105 contrast-105"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-amber-400">
                          <span className="text-3xl font-serif font-black">RC</span>
                          <span className="text-xs text-white/70">Raj Chaudhary</span>
                        </div>
                      )}
                      {/* Subtle golden corner accents */}
                      <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-amber-400 pointer-events-none" />
                      <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-amber-400 pointer-events-none" />
                      <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-amber-400 pointer-events-none" />
                      <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-amber-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Education & Experience Pills */}
                  <div className="relative z-10 grid grid-cols-2 gap-2 text-[10px] font-mono text-white/90">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-1.5">
                      <GraduationCap size={13} className="text-amber-400 flex-shrink-0" />
                      <div className="truncate">
                        <span className="text-white/50 block text-[9px] uppercase">Education</span>
                        <span className="font-semibold text-white">AKGEC (B.Tech)</span>
                      </div>
                    </div>
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-1.5">
                      <Briefcase size={13} className="text-emerald-400 flex-shrink-0" />
                      <div className="truncate">
                        <span className="text-white/50 block text-[9px] uppercase">Current Role</span>
                        <span className="font-semibold text-emerald-300">Colleen (Intern)</span>
                      </div>
                    </div>
                  </div>

                  {/* Engineering Capabilities Stat Bars */}
                  <div className="relative z-10 space-y-2 mt-2 font-mono">
                    {engineeringStats.map((stat) => {
                      const Icon = stat.icon;
                      return (
                        <div key={stat.name} className="space-y-0.5">
                          <div className="flex justify-between items-center text-[10px] text-white/85">
                            <span className="flex items-center gap-1">
                              <Icon size={11} style={{ color: stat.color }} />
                              <span>{stat.name}</span>
                            </span>
                            <span className="font-bold text-amber-300">{stat.val}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${stat.val}%` }}
                              transition={{ duration: 0.9, delay: 0.2 }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: stat.color }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom Footer: Flip prompt */}
                  <div className="relative z-10 pt-2.5 border-t border-amber-400/20 flex items-center justify-between text-[10px] font-mono text-white/70">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 size={11} /> Verified Profile
                    </span>
                    <span className="flex items-center gap-1 text-amber-400 font-bold uppercase tracking-wider">
                      <RotateCw size={11} className="animate-spin" /> Tap to Flip 360°
                    </span>
                  </div>
                </div>

                {/* ════════════════ CARD BACK ════════════════ */}
                <div
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                  className="absolute inset-0 rounded-[2rem] bg-[#121215] border-2 border-amber-400/70 p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_50px_rgba(217,119,6,0.3)] text-left"
                >
                  {/* Holographic Iridescent Shimmer */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-35"
                    style={{
                      background: `linear-gradient(${200 - glareX * 0.6}deg, rgba(255,180,0,0.2) 0%, rgba(56,189,248,0.2) 50%, rgba(16,185,129,0.2) 100%)`,
                    }}
                  />

                  {/* Top Seal */}
                  <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-amber-400/80 border-b border-amber-400/20 pb-2">
                    <span className="uppercase tracking-widest font-bold">Engineering Dossier</span>
                    <span>2026 OFFICIAL</span>
                  </div>

                  {/* Central Dossier Content */}
                  <div className="relative z-10 my-auto space-y-3.5">
                    {/* Monogram & Title */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-200 flex items-center justify-center text-black font-black font-serif text-xl shadow-md flex-shrink-0">
                        RC
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base font-sans tracking-tight">
                          Raj Chaudhary
                        </h3>
                        <p className="text-[11px] font-mono text-amber-400">
                          Backend, iOS &amp; Web Developer
                        </p>
                      </div>
                    </div>

                    {/* Mission Quote */}
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80 italic font-sans leading-relaxed">
                      &ldquo;Passionate about engineering reliable, high-throughput backend APIs,
                      fluid native iOS applications, and intuitive 3D web interfaces.&rdquo;
                    </div>

                    {/* Key Milestones */}
                    <div className="space-y-1.5 text-xs font-sans text-white/80">
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Colleen</strong> &bull; Full Stack Intern (Sep 2026 &ndash; Present)
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                        <span>
                          <strong className="text-white">Cognifyz</strong> &bull; Frontend Developer Intern (June &ndash; July 2025)
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
                        <span>
                          <strong className="text-white">AKGEC Ghaziabad</strong> &bull; B.Tech CS &amp; IT (2024 &ndash; 2028)
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 flex-shrink-0" />
                        <span>
                          <strong className="text-white">LFAIC Sambhal</strong> &bull; 12th PCM 89.66% &bull; 10th 86.00%
                        </span>
                      </div>
                    </div>

                    {/* Contact Badges */}
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1 text-[11px] font-mono text-white/70">
                      <div className="flex items-center gap-2">
                        <Mail size={12} className="text-amber-400 flex-shrink-0" />
                        <span className="truncate">dhariwalraj37@gmail.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={12} className="text-emerald-400 flex-shrink-0" />
                        <span>+91 7300706640</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={12} className="text-rose-400 flex-shrink-0" />
                        <span>Ghaziabad, UP &bull; Sambhal, UP</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Verification Seal */}
                  <div className="relative z-10 border-t border-amber-400/20 pt-2.5 flex items-center justify-between text-[10px] font-mono text-white/60">
                    <span className="text-emerald-400 font-semibold">AUTHENTICATED IDENTITY</span>
                    <span className="text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <RotateCw size={10} /> Flip Front
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            <p className="text-[11px] font-mono text-white/60 mt-3.5 text-center">
              Move cursor to tilt 3D hologram &bull; Tap card to flip 360°
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
