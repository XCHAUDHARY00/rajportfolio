import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft, Sparkles, FolderGit2 } from 'lucide-react';

export const DOOR_CATEGORIES = [
  {
    id: 'backend',
    title: 'Backend & APIs',
    subtitle: 'FROM DATABASE ARCHITECTURE TO HIGH-THROUGHPUT REST SERVICES',
    doorColor: '#1E2B3E', // Navy
    nameplate: 'BACKEND DEVELOPER',
    bullets: [
      'RESTful & Modular API Architecture',
      'Database Modeling (PostgreSQL & DynamoDB)',
      'Secure Token Authentication & HMAC',
      'High Concurrency & Load Optimization',
      'Automated Tests & Production Hardening',
    ],
  },
  {
    id: 'systems',
    title: 'Distributed Systems',
    subtitle: 'FAULT-TOLERANT ARCHITECTURES & EVENT-DRIVEN SCALE',
    doorColor: '#3D2636', // Plum
    nameplate: 'SYSTEM ARCHITECT',
    bullets: [
      'Microservices & Decoupled Backends',
      'Asynchronous Queues & Background Workers',
      'Caching Strategies & Redis Integration',
      'Resilient Failure Handling & Retries',
      'High-Availability Cloud Workloads',
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    subtitle: 'INFRASTRUCTURE AS CODE & CONTAINERIZED DEPLOYMENTS',
    doorColor: '#4D5D4E', // Sage Green
    nameplate: 'CLOUD & DEVOPS',
    bullets: [
      'AWS Cloud (DynamoDB, S3, SES, Lambda)',
      'Docker Containerization & Environments',
      'CI/CD Pipelines & Zero-Downtime Deploys',
      'IAM Roles, Secrets & Cloud Security',
      'Real-Time Health Monitoring & Observability',
    ],
  },
  {
    id: 'fullstack',
    title: 'Full-Stack & AI',
    subtitle: 'INTELLIGENT SYSTEMS, GEMINI APIS & INTERACTIVE HUBS',
    doorColor: '#9E5B3E', // Terracotta
    nameplate: 'FULL-STACK & AI',
    bullets: [
      'Google Gemini AI Logic & LLM Pipelines',
      'React & Tailwind Production Dashboards',
      'Content Management Systems (CMS Admin)',
      'Full End-to-End Feature Delivery',
      'Rich Interactive Skeuomorphic UIs',
    ],
  },
];

const getStackArray = (stack) => {
  if (Array.isArray(stack)) return stack;
  if (typeof stack === 'string') {
    return stack.split(',').map((s) => s.trim()).filter(Boolean);
  }
  return [];
};

export default function DoorsSection({ projects = [], onEnterCategory, selectedCategoryId = null }) {
  const [activeDoorId, setActiveDoorId] = useState(selectedCategoryId || null);

  const activeCategory = DOOR_CATEGORIES.find((d) => d.id === activeDoorId) || null;

  // Find projects matching active category
  const matchingProjects = (projects || []).filter((p) => {
    if (!activeCategory) return true;
    const stackStr = getStackArray(p.stack).join(' ').toLowerCase();
    const titleStr = (p.title || '').toLowerCase();
    const descStr = (p.description || '').toLowerCase();
    const combined = `${stackStr} ${titleStr} ${descStr}`;

    if (activeCategory.id === 'backend') {
      return combined.includes('django') || combined.includes('api') || combined.includes('backend') || combined.includes('drf') || true;
    }
    if (activeCategory.id === 'systems') {
      return combined.includes('system') || combined.includes('distributed') || combined.includes('commerce') || true;
    }
    if (activeCategory.id === 'cloud') {
      return combined.includes('cloud') || combined.includes('aws') || combined.includes('operating') || true;
    }
    if (activeCategory.id === 'fullstack') {
      return combined.includes('full-stack') || combined.includes('ai') || combined.includes('gemini') || combined.includes('react') || true;
    }
    return true;
  });

  const featuredProject = matchingProjects[0] || (projects && projects[0]) || {
    title: 'SkillForge AI — Career Operating System',
    description: 'AI-powered ATS resume analysis, mock interview simulation with Gemini AI, and dynamic skill roadmaps.',
    stack: ['Python', 'Django 5', 'DRF', 'PostgreSQL', 'Gemini AI'],
  };

  const handleDoorClick = (id) => {
    if (activeDoorId === id) {
      if (onEnterCategory) onEnterCategory(id);
    } else {
      setActiveDoorId(id);
    }
  };

  return (
    <section
      id="doors"
      className="relative py-24 sm:py-32 px-4 sm:px-8 overflow-hidden transition-colors bg-[#EFECE6] dark:bg-[#121212]"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Headline */}
        <div className="mb-14 sm:mb-20 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1C1A18] dark:text-[#FAF7F2] font-sans">
              Magic happens behind the doors
            </h2>
            <p className="text-xs sm:text-sm font-sans text-[#736D64] dark:text-[#9A9388] mt-2 max-w-lg">
              Step inside my engineering disciplines. Tap a door to inspect its specialization, or click inside to enter project archives.
            </p>
          </div>

          {activeDoorId && (
            <button
              onClick={() => setActiveDoorId(null)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/15 dark:border-white/15 bg-white/70 dark:bg-white/5 hover:bg-white text-xs font-semibold uppercase tracking-wider text-[#1C1A18] dark:text-white transition-all shadow-xs"
            >
              <ArrowLeft size={13} />
              <span>Back to all doors</span>
            </button>
          )}
        </div>

        {/* ── DOORS VIEW ── */}
        <div className="relative">
          {/* Active Door Focused View (Screenshot 4) */}
          {activeCategory ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center justify-center max-w-5xl mx-auto">
              {/* Left: The Open Arch Door with Illuminated Project Preview Inside */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-[260px] sm:w-[300px] h-[420px] sm:h-[480px] perspective-1200">
                  {/* Recessed Wall Arch Frame */}
                  <div className="absolute inset-0 rounded-t-full border-[12px] border-white dark:border-[#202024] bg-[#121214] arch-frame overflow-hidden shadow-2xl">
                    {/* Glowing Light Beam & Illuminated Project Room Inside */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-100/90 via-white to-amber-200/80 dark:from-[#25252B] dark:via-[#1B1B1E] dark:to-black p-5 flex flex-col justify-center items-center text-center shadow-[0_0_60px_rgba(255,240,200,0.6)]">
                      {/* Project Preview Badge Inside Door */}
                      <div className="w-14 h-14 rounded-2xl bg-amber-400/25 border border-amber-400/40 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold text-xl mb-3 shadow-md">
                        {featuredProject?.title?.[0] || '⚡'}
                      </div>
                      <h4 className="font-bold text-sm text-[#1C1A18] dark:text-white line-clamp-2 px-2">
                        {featuredProject?.title}
                      </h4>
                      <p className="text-[10px] text-[#5E5A53] dark:text-[#A8A196] line-clamp-2 mt-1.5 px-3">
                        {featuredProject?.description}
                      </p>
                      <span className="mt-4 px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-[#1C1A18] text-white dark:bg-white dark:text-[#121212] shadow-sm flex items-center gap-1.5">
                        <Sparkles size={10} className="text-amber-400 dark:text-amber-600" />
                        <span>Ready to explore</span>
                      </span>
                    </div>

                    {/* Floor shadow */}
                    <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  </div>

                  {/* 3D Door Leaf (Hinged on Left, Swung Inward -105deg) */}
                  <motion.div
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: -105 }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      transformOrigin: 'left center',
                      backgroundColor: activeCategory.doorColor,
                    }}
                    className="absolute inset-0 rounded-t-full border-r-2 border-t-2 border-white/20 shadow-2xl overflow-hidden door-fluted cursor-pointer"
                    onClick={() => onEnterCategory && onEnterCategory(activeCategory.id)}
                  >
                    {/* Fluted Vertical Grooves Overlay */}
                    <div className="absolute inset-0 door-fluted pointer-events-none opacity-80" />

                    {/* Brass Nameplate */}
                    <div className="absolute top-[28%] inset-x-6 flex justify-center">
                      <div className="brass-plate px-4 py-2.5 rounded-xs flex items-center justify-center relative w-full max-w-[170px] shadow-md border border-[#F5E0A3]">
                        {/* 4 Screws */}
                        <span className="w-1.5 h-1.5 rounded-full brass-screw absolute top-1 left-1" />
                        <span className="w-1.5 h-1.5 rounded-full brass-screw absolute top-1 right-1" />
                        <span className="w-1.5 h-1.5 rounded-full brass-screw absolute bottom-1 left-1" />
                        <span className="w-1.5 h-1.5 rounded-full brass-screw absolute bottom-1 right-1" />
                        <span className="text-[10px] font-mono font-bold tracking-widest text-[#261C08] uppercase text-center leading-tight">
                          {activeCategory.nameplate}
                        </span>
                      </div>
                    </div>

                    {/* Brass Lever Handle & Keyhole */}
                    <div className="absolute top-[52%] right-6 flex flex-col items-center gap-1.5">
                      <div className="w-12 h-3.5 rounded-full brass-handle shadow-lg transform -rotate-3" />
                      <div className="w-2.5 h-4 bg-[#151006] rounded-t-full rounded-b-xs border border-amber-600/40" />
                    </div>
                  </motion.div>

                  {/* "Click to enter" floating pill */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    onClick={() => onEnterCategory && onEnterCategory(activeCategory.id)}
                    className="absolute top-[38%] left-1/2 -translate-x-1/2 z-30 px-5 py-2.5 rounded-full bg-[#1C1A18] hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-[#121212] text-xs font-semibold uppercase tracking-wider shadow-2xl transition-transform active:scale-95 flex items-center gap-2 group whitespace-nowrap"
                  >
                    <span>Click to enter</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>

              {/* Right: Checklist & Featured Projects in this Discipline */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="lg:col-span-7 flex flex-col items-start pl-0 lg:pl-6"
              >
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-2">
                  <span>DISCIPLINE 0{DOOR_CATEGORIES.findIndex((d) => d.id === activeCategory.id) + 1}</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1A18] dark:text-[#FAF7F2] font-sans">
                  {activeCategory.title}
                </h3>
                <p className="text-[11px] font-mono tracking-widest text-[#736D64] dark:text-[#9A9388] mt-1 mb-6 uppercase">
                  {activeCategory.subtitle}
                </p>

                {/* ── Featured Project Card in this Discipline ── */}
                {featuredProject && (
                  <div
                    onClick={() => onEnterCategory && onEnterCategory(activeCategory.id)}
                    className="w-full bg-white dark:bg-[#1A1A1E] border border-[#DDD6C9] dark:border-white/10 rounded-2xl p-5 mb-6 shadow-sm hover:border-amber-500/50 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                        • Featured Project in this Door
                      </span>
                      <span className="text-[10px] font-mono text-[#736D64] dark:text-[#88837A] group-hover:text-amber-500 transition-colors">
                        View Details &rarr;
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-[#1C1A18] dark:text-[#FAF7F2] font-sans group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {featuredProject.title}
                    </h4>
                    <p className="text-xs text-[#5E5A53] dark:text-[#A8A196] line-clamp-2 mt-1 leading-relaxed">
                      {featuredProject.description}
                    </p>

                    {/* Stack Badges */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {getStackArray(featuredProject.stack).slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-sm bg-[#FAF7F2] dark:bg-white/5 border border-[#EDE7DD] dark:border-white/10 text-[9px] font-mono text-[#5E5A53] dark:text-[#A8A196]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Discipline Checklist */}
                <div className="space-y-2.5 w-full mb-8">
                  {activeCategory.bullets.map((b, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.06 }}
                      className="flex items-center gap-3 text-xs sm:text-sm font-medium text-[#2C2926] dark:text-[#E8E2D7]"
                    >
                      <div className="w-4 h-4 rounded-full bg-[#3D3A35] dark:bg-white/10 flex items-center justify-center text-white dark:text-amber-400 flex-shrink-0">
                        <Check size={10} strokeWidth={3} />
                      </div>
                      <span>{b}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => onEnterCategory && onEnterCategory(activeCategory.id)}
                    className="bg-[#1C1A18] hover:bg-black dark:bg-[#FAF7F2] dark:hover:bg-white text-white dark:text-[#121212] px-7 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-md active:scale-95 inline-flex items-center gap-2 group"
                  >
                    <span>Open {activeCategory.title} Projects</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => setActiveDoorId(null)}
                    className="px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-all border border-[#CCC4B4] dark:border-[#3D3D42] text-[#403B35] dark:text-[#FAF7F2] hover:bg-white/40 dark:hover:bg-white/5"
                  >
                    Close door
                  </button>
                </div>
              </motion.div>
            </div>
          ) : (
            /* 4 Arch Doors Gallery Grid (Matching Screenshot 5) */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 justify-center">
              {DOOR_CATEGORIES.map((cat, idx) => (
                <motion.div
                  key={cat.id}
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                  onClick={() => handleDoorClick(cat.id)}
                  className="flex flex-col items-center cursor-pointer group select-none"
                >
                  {/* Recessed Wall Arch Frame */}
                  <div className="relative w-full max-w-[260px] aspect-[1/1.7] rounded-t-full border-[10px] border-white dark:border-[#222226] bg-[#DDD7CB] dark:bg-[#1A1A1D] arch-frame overflow-hidden transition-all group-hover:border-amber-100 dark:group-hover:border-[#333338]">
                    {/* Door Leaf */}
                    <div
                      style={{
                        backgroundColor: cat.doorColor,
                      }}
                      className="w-full h-full relative rounded-t-full overflow-hidden shadow-inner door-fluted flex flex-col justify-between p-4"
                    >
                      {/* Vertical Fluted Texture */}
                      <div className="absolute inset-0 door-fluted pointer-events-none opacity-85" />

                      {/* Brass Nameplate */}
                      <div className="relative z-10 pt-16 flex justify-center">
                        <div className="brass-plate px-3 py-2 rounded-xs w-full max-w-[150px] flex items-center justify-center relative shadow-sm border border-[#F5E0A3] group-hover:scale-105 transition-transform">
                          <span className="w-1 h-1 rounded-full brass-screw absolute top-1 left-1" />
                          <span className="w-1 h-1 rounded-full brass-screw absolute top-1 right-1" />
                          <span className="w-1 h-1 rounded-full brass-screw absolute bottom-1 left-1" />
                          <span className="w-1 h-1 rounded-full brass-screw absolute bottom-1 right-1" />
                          <span className="text-[9px] font-mono font-bold tracking-widest text-[#261C08] uppercase text-center leading-tight">
                            {cat.nameplate}
                          </span>
                        </div>
                      </div>

                      {/* Brass Lever Handle & Keyhole */}
                      <div className="relative z-10 pb-20 pr-3 flex flex-col items-end gap-1">
                        <div className="w-10 h-3 rounded-full brass-handle shadow-md group-hover:rotate-6 transition-transform" />
                        <div className="w-2 h-3.5 bg-[#151006] rounded-t-full rounded-b-xs border border-amber-600/40 mr-1" />
                      </div>
                    </div>
                  </div>

                  {/* Door Bottom Label */}
                  <div className="mt-4 text-center">
                    <p className="font-semibold text-sm text-[#1C1A18] dark:text-[#FAF7F2] tracking-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {cat.title}
                    </p>
                    <span className="text-[11px] font-mono text-[#736D64] dark:text-[#88837A] mt-0.5 block uppercase tracking-wider">
                      Tap to open &rarr;
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
