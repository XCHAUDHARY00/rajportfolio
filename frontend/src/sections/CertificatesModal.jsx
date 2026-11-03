import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  Trophy,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building,
  Star,
  Copy,
  Check,
  Maximize2,
  X,
} from 'lucide-react';

const FALLBACK_CERTS = [
  {
    id: 'cert-001',
    name: 'Software Engineering Job Simulation',
    issuer: 'JPMorgan Chase & Co. (Forage)',
    issue_date: 'MAY 2025',
    verify_url: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/JPMorgan%20Chase/software-engineering-completion.pdf',
    description:
      "Completed JPMorgan Chase's software engineering virtual experience. Built high-throughput financial data visualizers using Python and JPMorgan's open-source Perspective streaming library, resolving framework concurrency bugs.",
    skills_acquired: ['Python', 'Financial Data Feeds', 'Perspective Library', 'Data Visualization', 'Git'],
  },
  {
    id: 'cert-002',
    name: 'Generative AI Career Essentials',
    issuer: 'Infosys Springboard',
    issue_date: 'FEB 2025',
    verify_url: null,
    description:
      'Mastered core Generative AI architectures, prompt engineering, multimodal LLM pipelines (Gemini API), and enterprise responsible AI safety protocols.',
    skills_acquired: ['Generative AI', 'Prompt Engineering', 'LLM Pipelines', 'Gemini AI', 'AI Ethics'],
  },
  {
    id: 'cert-003',
    name: 'Hacknovate Hackathon Finalist',
    issuer: 'AKGEC Innovation Cell',
    issue_date: 'OCT 2024',
    verify_url: null,
    description:
      'Engineered an innovative full-stack microservices solution under strict 24-hour time constraints, competing against 200+ engineering teams across universities.',
    skills_acquired: ['Rapid Prototyping', 'System Design', 'React', 'FastAPI', 'High Concurrency'],
  },
];

const FALLBACK_ACHIEVEMENTS = [
  {
    id: 'ach-001',
    title: 'Hacknovate Hackathon Finalist',
    category: 'Hackathon',
    date: '2024 – 2025',
    description:
      'Advanced as a finalist in Hacknovate, the flagship annual hackathon at Ajay Kumar Garg Engineering College, competing against 200+ teams.',
  },
  {
    id: 'ach-002',
    title: 'Senior Secondary Merit — 89.66%',
    category: 'Academics',
    date: '2023 – 2024',
    description:
      'Graduated senior secondary with distinction (89.66%), scoring highest honors in Mathematics and Computer Science.',
  },
  {
    id: 'ach-003',
    title: '150+ DSA Solutions on LeetCode',
    category: 'Competitive Coding',
    date: '2025 – Present',
    description:
      'Consistent problem solver across Data Structures & Algorithms, focusing on Graph Theory, Dynamic Programming, and System Optimization.',
  },
];

export default function CertificatesModal({
  isOpen,
  onClose,
  certifications = [],
  achievements = [],
  profile = {},
}) {
  const [activeTab, setActiveTab] = useState('certs'); // 'certs' | 'achievements'
  const [certIndex, setCertIndex] = useState(0);
  const [copiedId, setCopiedId] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [cardTilt, setCardTilt] = useState({ rotateX: 0, rotateY: 0 });
  const cardRef = useRef(null);

  if (!isOpen) return null;

  const certList = certifications && certifications.length > 0 ? certifications : FALLBACK_CERTS;
  const achList = achievements && achievements.length > 0 ? achievements : FALLBACK_ACHIEVEMENTS;

  const currentCert = certList[certIndex % certList.length];

  const handleNextCert = () => {
    setCertIndex((prev) => (prev + 1) % certList.length);
  };

  const handlePrevCert = () => {
    setCertIndex((prev) => (prev - 1 + certList.length) % certList.length);
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setCardTilt({
      rotateX: -y * 0.04,
      rotateY: x * 0.04,
    });
  };

  const handleMouseLeave = () => {
    setCardTilt({ rotateX: 0, rotateY: 0 });
  };

  const handleCopy = (id) => {
    navigator.clipboard.writeText(id || 'CERT-VERIFIED-RC');
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#EFECE6] dark:bg-[#121212] text-[#1C1A18] dark:text-[#FAF7F2] transition-colors selection:bg-[#DDA74F] selection:text-[#121212]">
      {/* ── Background Subtle Ambient Glow ── */}
      <div className="absolute top-0 -left-20 w-[450px] h-[450px] bg-[#C6E6BF]/50 dark:bg-emerald-950/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-[500px] h-[500px] bg-[#D7CCEB]/50 dark:bg-purple-950/20 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-20 sm:py-28 relative z-10 min-h-screen flex flex-col justify-between">
        {/* ── Top Bar Header & Controls ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-black/[0.08] dark:border-white/[0.08] mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-1.5">
              <Sparkles size={13} />
              <span>ACCREDITED CREDENTIALS &amp; HONORS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1A18] dark:text-white font-sans">
              Certificates &amp; Achievements
            </h1>
            <p className="text-xs sm:text-sm font-sans text-[#736D64] dark:text-[#9A9388] mt-1 max-w-xl leading-relaxed">
              Verified certifications, virtual engineering simulations, and competitive honors earned by {profile?.name || 'Raj Chaudhary'}.
            </p>
          </div>

          {/* Tab Pill Switcher */}
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('certs')}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 ${
                activeTab === 'certs'
                  ? 'bg-[#1C1A18] dark:bg-white text-white dark:text-[#121212] shadow-sm'
                  : 'text-[#736D64] dark:text-[#9A9388] hover:text-[#1C1A18] dark:hover:text-white'
              }`}
            >
              <Award size={13} />
              <span>Certifications ({certList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('achievements')}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 ${
                activeTab === 'achievements'
                  ? 'bg-[#1C1A18] dark:bg-white text-white dark:text-[#121212] shadow-sm'
                  : 'text-[#736D64] dark:text-[#9A9388] hover:text-[#1C1A18] dark:hover:text-white'
              }`}
            >
              <Trophy size={13} />
              <span>Achievements ({achList.length})</span>
            </button>
          </div>
        </div>

        {/* ── TAB 1: 3D CERTIFICATES STACK WITH SMOOTH PHYSICS ── */}
        {activeTab === 'certs' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center my-auto py-6">
            {/* Left: 3D Parchment Certificate Physical Card Stack (7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleNextCert}
                className="relative cursor-pointer select-none perspective-1200 w-full max-w-[540px] aspect-[1.4/1]"
                title="Tap certificate to flip to next"
              >
                {/* Physical Underneath Cards Stack (Depth Effect) */}
                <div className="absolute inset-x-4 -bottom-3 h-full rounded-3xl bg-[#D6CFBF] dark:bg-[#1E1E22] border border-black/10 dark:border-white/5 shadow-md transform translate-y-2 scale-[0.94] z-0 opacity-70" />
                <div className="absolute inset-x-2 -bottom-1.5 h-full rounded-3xl bg-[#E6DEC\-D] dark:bg-[#25252A] border border-black/10 dark:border-white/5 shadow-md transform translate-y-1 scale-[0.97] z-0 opacity-90" />

                {/* Active Top Certificate with 3D Mouse Parallax & Smooth Slide Physics */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={certIndex}
                    initial={{ opacity: 0, x: 40, scale: 0.95, rotate: 2 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      rotate: 0,
                      rotateX: cardTilt.rotateX,
                      rotateY: cardTilt.rotateY,
                    }}
                    exit={{ opacity: 0, x: -50, scale: 0.92, rotate: -3 }}
                    transition={{
                      type: 'spring',
                      stiffness: 280,
                      damping: 24,
                    }}
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                    className="relative z-10 w-full h-full rounded-3xl bg-[#FCFAF5] dark:bg-[#1D1D21] border-[10px] border-[#EDE6D6] dark:border-[#2C2C32] p-5 sm:p-7 flex flex-col justify-between shadow-[0_24px_50px_-12px_rgba(0,0,0,0.22)] overflow-hidden"
                  >
                    {currentCert.badge_url ? (
                      /* Actual Uploaded Certificate Image Mode */
                      <div className="relative z-10 w-full h-full flex flex-col justify-between">
                        {/* Top bar header */}
                        <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-white/10">
                          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-serif">
                            <Award size={18} className="text-amber-500 flex-shrink-0" />
                            <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase font-bold truncate max-w-[200px] sm:max-w-xs">
                              {currentCert.issuer || 'CERTIFICATE OF COMPLETION'}
                            </span>
                          </div>
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-amber-400/80 bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 text-black flex flex-col items-center justify-center shadow-md transform rotate-3 flex-shrink-0">
                            <Star size={11} className="fill-black" />
                            <span className="text-[6px] font-black tracking-tighter">VERIFIED</span>
                          </div>
                        </div>

                        {/* Center: Actual Uploaded Image Display */}
                        <div className="my-auto py-2 w-full flex items-center justify-center relative group">
                          <div className="relative max-w-full max-h-[220px] sm:max-h-[260px] rounded-xl overflow-hidden bg-white/60 dark:bg-black/40 p-2 border border-black/10 dark:border-white/10 shadow-inner flex items-center justify-center">
                            <img
                              src={currentCert.badge_url}
                              alt={currentCert.name}
                              className="w-full h-full object-contain max-h-[200px] sm:max-h-[235px] rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
                            />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setZoomedImage(currentCert.badge_url);
                              }}
                              className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/75 hover:bg-black text-white text-[10px] font-mono opacity-80 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-md"
                              title="Zoom Certificate"
                            >
                              <Maximize2 size={12} />
                              <span className="hidden sm:inline">Zoom</span>
                            </button>
                          </div>
                        </div>

                        {/* Bottom bar */}
                        <div className="pt-2 border-t border-black/10 dark:border-white/10 flex items-end justify-between text-[10px] font-mono text-[#5E5A53] dark:text-[#A8A196]">
                          <div className="min-w-0 pr-2">
                            <span className="block text-[8px] uppercase tracking-wider text-[#8C877D]">CREDENTIAL</span>
                            <span className="font-bold text-[#1C1A18] dark:text-white text-xs truncate block">
                              {currentCert.name || currentCert.title}
                            </span>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span className="block text-[8px] uppercase tracking-wider text-[#8C877D]">DATE EARNED</span>
                            <span className="font-semibold">{currentCert.issue_date || '2024'}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Classic Gold Embossed Typography Mode */
                      <>
                        {/* Metallic Gold Foil Double Border */}
                        <div className="absolute inset-2.5 rounded-2xl border-2 border-[#D4AF37]/50 pointer-events-none" />
                        <div className="absolute inset-3.5 rounded-xl border border-dashed border-[#D4AF37]/35 pointer-events-none" />

                        {/* Certificate Top Header */}
                        <div className="relative z-10 flex items-start justify-between">
                          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-serif">
                            <Award size={22} className="text-amber-500" />
                            <span className="text-[11px] font-mono tracking-widest uppercase font-bold">
                              CERTIFICATE OF COMPLETION
                            </span>
                          </div>

                          {/* Official Gold Embossed Wax Seal Badge */}
                          <div className="w-12 h-12 rounded-full border-2 border-amber-400/80 bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 text-black flex flex-col items-center justify-center shadow-lg transform rotate-6">
                            <Star size={14} className="fill-black" />
                            <span className="text-[7px] font-black tracking-tighter">VERIFIED</span>
                          </div>
                        </div>

                        {/* Certificate Center: Recipient & Name */}
                        <div className="relative z-10 text-center my-auto py-2">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#736D64] dark:text-[#88837A] block">
                            THIS IS PROUDLY PRESENTED TO
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1A18] dark:text-white mt-1 tracking-tight">
                            {profile?.name || 'Raj Chaudhary'}
                          </h3>
                          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto my-2" />
                          <p className="text-xs sm:text-sm font-sans font-semibold text-amber-800 dark:text-amber-300">
                            For successfully mastering {currentCert.name || currentCert.title}
                          </p>
                        </div>

                        {/* Certificate Footer: Issuer & Verification Badge */}
                        <div className="relative z-10 pt-3 border-t border-black/10 dark:border-white/10 flex items-end justify-between text-[10px] font-mono text-[#5E5A53] dark:text-[#A8A196]">
                          <div>
                            <span className="block text-[8px] uppercase tracking-wider text-[#8C877D]">ISSUED BY</span>
                            <span className="font-bold text-[#1C1A18] dark:text-white text-xs">
                              {currentCert.issuer}
                            </span>
                          </div>

                          <div className="text-right">
                            <span className="block text-[8px] uppercase tracking-wider text-[#8C877D]">DATE EARNED</span>
                            <span className="font-semibold">{currentCert.issue_date || '2024'}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Controls & Counter */}
              <div className="flex items-center gap-6 mt-8">
                <button
                  onClick={handlePrevCert}
                  className="w-10 h-10 rounded-full border border-black/15 dark:border-white/15 bg-white/80 dark:bg-white/5 hover:bg-white text-[#1C1A18] dark:text-white flex items-center justify-center transition-all shadow-xs active:scale-90"
                  aria-label="Previous Certificate"
                >
                  <ChevronLeft size={18} />
                </button>

                <div className="flex items-center gap-2">
                  {certList.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCertIndex(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === certIndex % certList.length
                          ? 'w-7 bg-amber-500'
                          : 'w-2 bg-black/20 dark:bg-white/20 hover:bg-black/40'
                      }`}
                      aria-label={`Go to certificate ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNextCert}
                  className="w-10 h-10 rounded-full border border-black/15 dark:border-white/15 bg-white/80 dark:bg-white/5 hover:bg-white text-[#1C1A18] dark:text-white flex items-center justify-center transition-all shadow-xs active:scale-90"
                  aria-label="Next Certificate"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Right: Rich Editorial Details & Summary (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-start pl-0 lg:pl-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
                <span>CREDENTIAL 0{(certIndex % certList.length) + 1} / 0{certList.length}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1A18] dark:text-[#FAF7F2] font-sans">
                {currentCert.name || currentCert.title}
              </h2>

              <div className="flex items-center gap-3 text-xs font-mono text-[#736D64] dark:text-[#9A9388] mt-1 mb-5">
                <span className="flex items-center gap-1 font-semibold text-[#1C1A18] dark:text-white">
                  <Building size={12} />
                  <span>{currentCert.issuer}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  <span>{currentCert.issue_date || '2024'}</span>
                </span>
              </div>

              {/* Summary Description */}
              <div className="rounded-2xl bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/10 p-5 mb-6 w-full shadow-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#736D64] dark:text-[#88837A] block mb-2">
                  SUMMARY &amp; SYNOPSIS
                </span>
                <p className="text-xs sm:text-sm font-sans text-[#403B35] dark:text-[#C5BFB5] leading-relaxed">
                  {currentCert.description}
                </p>
              </div>

              {/* Skills Acquired Badges */}
              {currentCert.skills_acquired && (
                <div className="mb-6 w-full">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#736D64] dark:text-[#88837A] block mb-2">
                    VERIFIED COMPETENCIES
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(Array.isArray(currentCert.skills_acquired)
                      ? currentCert.skills_acquired
                      : String(currentCert.skills_acquired).split(',')
                    ).map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20 text-[11px] font-mono font-medium"
                      >
                        {String(skill).trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions & Verification */}
              <div className="flex flex-wrap items-center gap-3 w-full pt-2">
                {currentCert.verify_url && (
                  <a
                    href={currentCert.verify_url}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#1C1A18] hover:bg-black dark:bg-[#FAF7F2] dark:hover:bg-white text-white dark:text-[#121212] px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95 inline-flex items-center gap-2 group"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </a>
                )}

                <button
                  onClick={handleNextCert}
                  className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border border-[#CCC4B4] dark:border-[#3D3D42] text-[#2C2926] dark:text-[#FAF7F2] hover:bg-white/60 dark:hover:bg-white/10 active:scale-95"
                >
                  Next Certificate &rarr;
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: ACHIEVEMENTS & HONORS GRID ── */}
        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 my-auto py-6">
            {achList.map((ach, i) => (
              <motion.div
                key={ach.id || i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="rounded-3xl bg-white/80 dark:bg-[#18181B] border border-black/10 dark:border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group"
              >
                {/* Glow orb on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl group-hover:scale-150 transition-transform pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-400/15 text-amber-600 dark:text-amber-400 border border-amber-400/30 flex items-center justify-center shadow-xs">
                      <Trophy size={22} />
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 uppercase tracking-wider font-semibold">
                      {ach.category || 'HONOR'}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-[#1C1A18] dark:text-white font-sans mb-2">
                    {ach.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-sans text-[#5E5A53] dark:text-[#A8A196] leading-relaxed mb-4">
                    {ach.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-[#736D64] dark:text-[#88837A]">
                  <span>DATE</span>
                  <span className="font-semibold text-[#1C1A18] dark:text-amber-400">{ach.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── Fixed Floating Pill: "← Back to portfolio" ── */}
        <div className="fixed bottom-6 left-6 z-40">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all bg-[#1C1A18] hover:bg-black dark:bg-[#FAF7F2] dark:hover:bg-white text-white dark:text-[#121212] border border-white/20 dark:border-black/20 shadow-2xl flex items-center gap-2 group backdrop-blur-md"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to portfolio</span>
          </motion.button>
        </div>
      </div>

      {/* ── Lightbox Zoom for Certificate Images ── */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImage(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          >
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X size={20} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={zoomedImage}
              alt="Certificate full view"
              className="max-w-[95vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

