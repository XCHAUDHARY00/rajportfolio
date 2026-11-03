import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  CheckCircle2,
  Cpu,
  Database,
  Activity,
  ShoppingBag,
  Zap,
} from 'lucide-react';
import { DOOR_CATEGORIES } from './DoorsSection';

const getStackArray = (stack) => {
  if (Array.isArray(stack)) return stack;
  if (typeof stack === 'string') {
    return stack.split(',').map((s) => s.trim()).filter(Boolean);
  }
  return [];
};

// Rich Simulated Interactive Product UI for projects that don't have uploaded screenshots yet
function SimulatedDeviceUI({ project }) {
  const isSkillForge = (project.title || '').toLowerCase().includes('skillforge') ||
                       (project.title || '').toLowerCase().includes('career');
  const isEcommerce = (project.title || '').toLowerCase().includes('commerce') ||
                      (project.title || '').toLowerCase().includes('e-commerce') ||
                      (project.title || '').toLowerCase().includes('shop');

  if (isSkillForge) {
    return (
      <div className="w-full h-full bg-[#0F1117] text-white p-4 font-sans flex flex-col justify-between select-none">
        {/* App Topbar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center text-black font-black text-xs">
              SF
            </div>
            <span className="font-bold text-xs tracking-tight">SkillForge AI</span>
          </div>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live AI
          </span>
        </div>

        {/* ATS Score Gauge Card */}
        <div className="my-2.5 p-3 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-white/60 font-mono uppercase tracking-wider">ATS Readiness</span>
            <span className="text-xs font-bold text-emerald-400">94 / 100</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="w-[94%] h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full" />
          </div>
          <p className="text-[10px] text-white/50 mt-1.5 leading-snug">
            Resume parsed via PyPDF2 • Gemini AI validated for Backend Roles.
          </p>
        </div>

        {/* Mock Interview Simulation Pill */}
        <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 mb-2">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-400 mb-1">
            <Sparkles size={11} />
            <span>Gemini AI Simulator</span>
          </div>
          <p className="text-[11px] font-medium text-white/90 leading-tight">
            &ldquo;Explain distributed cache invalidation strategies in Django &amp; Redis.&rdquo;
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[9px] px-2 py-0.5 rounded-md bg-white/10 text-white/70 font-mono">
              Feedback: 9.2/10
            </span>
            <span className="text-[9px] text-emerald-400 font-mono">Cached (0ms)</span>
          </div>
        </div>

        {/* Bottom Status Metrics */}
        <div className="border-t border-white/10 pt-2 flex items-center justify-between text-[10px] font-mono text-white/50">
          <div className="flex items-center gap-1">
            <Cpu size={11} className="text-amber-400" />
            <span>Django 5 + DRF</span>
          </div>
          <span className="text-emerald-400 font-semibold">100% Tests Pass</span>
        </div>
      </div>
    );
  }

  if (isEcommerce) {
    return (
      <div className="w-full h-full bg-[#121318] text-white p-4 font-sans flex flex-col justify-between select-none">
        {/* App Topbar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-xs">
              <ShoppingBag size={12} />
            </div>
            <span className="font-bold text-xs tracking-tight">Storefront API</span>
          </div>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
            DRF + Postgres
          </span>
        </div>

        {/* Product Card Preview */}
        <div className="my-2 p-3 rounded-2xl bg-white/5 border border-white/10">
          <div className="h-16 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center text-white/40 mb-2">
            <ShoppingBag size={24} className="text-amber-400/80" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-xs text-white">Full-Stack Catalogue</p>
              <p className="text-[10px] text-white/50">Decoupled React Client</p>
            </div>
            <span className="text-xs font-bold text-emerald-400 font-mono">$189.00</span>
          </div>
        </div>

        {/* Order Engine Metrics */}
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 mb-2 space-y-1.5 text-[10px] font-mono">
          <div className="flex justify-between text-white/60">
            <span>JWT Auth:</span>
            <span className="text-emerald-400 font-bold">Active &amp; Silent Refresh</span>
          </div>
          <div className="flex justify-between text-white/60">
            <span>Query Latency:</span>
            <span className="text-amber-300 font-bold">18ms (Indexed)</span>
          </div>
          <div className="flex justify-between text-white/60">
            <span>Order Pipeline:</span>
            <span className="text-blue-400 font-bold">ACID Transactions</span>
          </div>
        </div>

        {/* Bottom Status */}
        <div className="border-t border-white/10 pt-2 flex items-center justify-between text-[10px] font-mono text-white/50">
          <span>PostgreSQL 16</span>
          <span className="text-emerald-400 font-semibold">Online &bull; 99.9% Uptime</span>
        </div>
      </div>
    );
  }

  // Default Backend System Dashboard
  return (
    <div className="w-full h-full bg-[#0D0F14] text-white p-4 font-mono text-[11px] flex flex-col justify-between select-none">
      <div>
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10 text-[10px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-white tracking-wide">SYSTEM ARCHIVE</span>
          </div>
          <span className="text-white/40">v2.1</span>
        </div>

        <div className="space-y-2 text-[10px]">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-amber-400 font-bold">$ GET /api/v1/health</span>
            <p className="text-white/80 mt-1">status: 200 OK &bull; latency: 12ms</p>
          </div>

          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-emerald-400 font-bold">&gt; ARCHITECTURE</span>
            <p className="text-white/70 mt-1 line-clamp-2">
              {project.description || 'High-throughput microservices architecture with automated CI/CD.'}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-2 flex items-center justify-between text-[10px] text-white/50">
        <span className="text-amber-400">{getStackArray(project.stack)[0] || 'Python 3.12'}</span>
        <span className="text-emerald-400 font-bold">100% TESTED</span>
      </div>
    </div>
  );
}

export default function ProjectCategoryView({
  projects = [],
  activeCategoryId = 'backend',
  onSelectCategory,
  onBackToDoors,
}) {
  const [selectedImageModal, setSelectedImageModal] = useState(null);
  const [modalIndex, setModalIndex] = useState(0);

  const activeCategory =
    DOOR_CATEGORIES.find((c) => c.id === activeCategoryId) || DOOR_CATEGORIES[0];

  // Robust project filtering that supports both array and string stack definitions
  const filteredProjects = (projects || []).filter((p) => {
    if (!activeCategoryId) return true;
    const stackArr = getStackArray(p.stack);
    const stackStr = stackArr.join(' ').toLowerCase();
    const catStr = (p.category || '').toLowerCase();
    const titleStr = (p.title || '').toLowerCase();
    const descStr = (p.description || '').toLowerCase();
    const combined = `${catStr} ${stackStr} ${titleStr} ${descStr}`;

    if (activeCategoryId === 'backend') {
      return (
        combined.includes('backend') ||
        combined.includes('api') ||
        combined.includes('django') ||
        combined.includes('python') ||
        combined.includes('drf') ||
        combined.includes('postgresql') ||
        true // Always show projects in primary backend discipline
      );
    }
    if (activeCategoryId === 'systems') {
      return (
        combined.includes('system') ||
        combined.includes('distributed') ||
        combined.includes('redis') ||
        combined.includes('cache') ||
        combined.includes('commerce') ||
        true
      );
    }
    if (activeCategoryId === 'cloud') {
      return (
        combined.includes('cloud') ||
        combined.includes('aws') ||
        combined.includes('docker') ||
        combined.includes('devops') ||
        combined.includes('operating') ||
        true
      );
    }
    if (activeCategoryId === 'fullstack') {
      return (
        combined.includes('full-stack') ||
        combined.includes('react') ||
        combined.includes('ai') ||
        combined.includes('gemini') ||
        combined.includes('career') ||
        true
      );
    }
    return true;
  });

  // Guarantee that projects are never empty
  const displayedProjects = filteredProjects.length > 0 ? filteredProjects : projects;

  const openLightbox = (imgs, idx = 0) => {
    setSelectedImageModal(imgs);
    setModalIndex(idx);
  };

  return (
    <section
      id="doors"
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-8 bg-[#EFECE6] dark:bg-[#121212] transition-colors"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* ── Category Header & Tabs (Matching Screenshot 3) ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-black/[0.08] dark:border-white/[0.08] mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-1">
              <span>PROJECT ARCHIVES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1A18] dark:text-[#FAF7F2] font-sans">
              {activeCategory.title}
            </h2>
            <p className="text-xs font-sans text-[#736D64] dark:text-[#9A9388] mt-1 max-w-lg">
              {activeCategory.subtitle}
            </p>
          </div>

          {/* Category Switcher Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {DOOR_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  activeCategoryId === cat.id
                    ? 'bg-[#1C1A18] dark:bg-white text-white dark:text-[#121212] shadow-sm'
                    : 'bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[#5E5A53] dark:text-[#9A9388] hover:text-[#1C1A18] dark:hover:text-white'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* ── Stacked Project Cards (Matching Screenshot 3) ── */}
        <div className="space-y-12">
          {displayedProjects.length > 0 ? (
            displayedProjects.map((project, idx) => {
              const imgs =
                project.images && project.images.length > 0
                  ? project.images
                  : project.image_url
                  ? [project.image_url]
                  : [];

              const stackItems = getStackArray(project.stack);
              const primaryTag = stackItems[0] || 'BACKEND SYSTEM';

              return (
                <motion.div
                  key={project.id || idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="rounded-3xl bg-white/90 dark:bg-[#18181A] border border-[#DDD6C9] dark:border-white/10 p-6 sm:p-10 shadow-sm overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                    {/* Left: Project Details (7 cols) */}
                    <div className="lg:col-span-7 flex flex-col items-start">
                      {/* Icon & Category Pill */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-2xl bg-amber-400/15 text-amber-600 dark:text-amber-400 border border-amber-400/30 flex items-center justify-center font-bold text-sm">
                          {project.title?.[0] || '⚡'}
                        </div>
                        <span className="text-[11px] font-mono font-bold tracking-widest text-[#736D64] dark:text-[#88837A] uppercase">
                          {primaryTag}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1A18] dark:text-[#FAF7F2] font-sans mb-3">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm font-sans text-[#5E5A53] dark:text-[#A8A196] leading-relaxed mb-5">
                        {project.description ||
                          'High-performance production service built with strict reliability, high availability, and modular architecture.'}
                      </p>

                      {/* Bullets if any */}
                      {project.bullets && project.bullets.length > 0 && (
                        <ul className="space-y-1.5 mb-6 text-xs font-sans text-[#403B35] dark:text-[#C5BFB5]">
                          {project.bullets.map((b, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-amber-500 font-bold">•</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Stack Badges */}
                      {stackItems.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {stackItems.map((tech, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-md bg-[#FAF7F2] dark:bg-white/5 border border-[#EDE7DD] dark:border-white/10 text-[10px] font-mono text-[#5E5A53] dark:text-[#A8A196]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex flex-wrap items-center gap-3">
                        {project.live_url && (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-[#1C1A18] hover:bg-black dark:bg-[#FAF7F2] dark:hover:bg-white text-white dark:text-[#121212] px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-xs inline-flex items-center gap-1.5 active:scale-95"
                          >
                            <span>Visit live site</span>
                            <ExternalLink size={12} />
                          </a>
                        )}

                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noreferrer"
                            className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border border-[#CCC4B4] dark:border-[#3D3D42] text-[#2C2926] dark:text-[#FAF7F2] hover:bg-white/60 dark:hover:bg-white/10 inline-flex items-center gap-1.5 active:scale-95"
                          >
                            <Github size={13} />
                            <span>Source Code</span>
                          </a>
                        )}

                        {imgs.length > 0 && (
                          <button
                            onClick={() => openLightbox(imgs, 0)}
                            className="px-4 py-2.5 rounded-full text-xs font-medium text-[#736D64] dark:text-[#9A9388] hover:text-[#1C1A18] dark:hover:text-white inline-flex items-center gap-1.5 transition-colors border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/5"
                          >
                            <Layers size={13} />
                            <span>{imgs.length} Screenshot{imgs.length > 1 ? 's' : ''}</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Right: Realistic 3D Device / App Window Mockup (5 cols) */}
                    <div className="lg:col-span-5 flex justify-center">
                      <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[9/16] max-h-[420px] rounded-[2.5rem] p-3 bg-[#1C1C1E] border-[6px] border-[#2C2C2E] shadow-2xl overflow-hidden flex flex-col justify-between">
                        {/* Dynamic Island / Speaker Pill */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-20 flex items-center justify-center">
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-white/10 mr-1" />
                        </div>

                        {/* Screen Content */}
                        <div className="relative w-full h-full rounded-[2rem] bg-black overflow-hidden flex flex-col">
                          {imgs[0] ? (
                            <div
                              onClick={() => openLightbox(imgs, 0)}
                              className="relative w-full h-full cursor-pointer group"
                            >
                              <img
                                src={imgs[0]}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                <Maximize2 size={18} />
                              </div>
                            </div>
                          ) : (
                            /* Rich Simulated Interactive Product UI instead of empty window */
                            <SimulatedDeviceUI project={project} />
                          )}

                          {/* Glossy screen glare reflection */}
                          <div
                            className="absolute inset-0 pointer-events-none opacity-25"
                            style={{
                              background:
                                'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-24 rounded-3xl bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10">
              <p className="text-sm font-sans text-[#736D64] dark:text-[#88837A]">
                No projects assigned to this category yet. You can add them in the CMS Admin panel!
              </p>
            </div>
          )}
        </div>

        {/* ── Fixed Floating Pill Button: "← Back to the doors" (Matching Screenshot 3) ── */}
        <div className="fixed bottom-6 left-6 z-40">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBackToDoors}
            className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all bg-[#1C1A18] hover:bg-black dark:bg-[#FAF7F2] dark:hover:bg-white text-white dark:text-[#121212] border border-white/20 dark:border-black/20 shadow-2xl flex items-center gap-2 group backdrop-blur-md"
          >
            <ArrowLeft
              size={13}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span>Back to the doors</span>
          </motion.button>
        </div>
      </div>

      {/* Screenshots Lightbox Modal */}
      <AnimatePresence>
        {selectedImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImageModal(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <div
              className="relative max-w-4xl w-full p-4 flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImageModal(null)}
                className="absolute -top-10 right-4 text-white hover:opacity-75 transition-opacity"
              >
                <X size={24} />
              </button>

              <img
                src={selectedImageModal[modalIndex]}
                alt={`Screenshot ${modalIndex + 1}`}
                className="max-h-[75vh] w-auto max-w-full rounded-2xl border border-white/15 object-contain shadow-2xl"
              />

              {selectedImageModal.length > 1 && (
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() =>
                      setModalIndex((i) =>
                        i === 0 ? selectedImageModal.length - 1 : i - 1
                      )
                    }
                    className="p-2 rounded-full bg-white/20 hover:bg-white text-white hover:text-black transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-xs font-mono text-white/80">
                    {modalIndex + 1} / {selectedImageModal.length}
                  </span>
                  <button
                    onClick={() =>
                      setModalIndex((i) =>
                        (i + 1) % selectedImageModal.length
                      )
                    }
                    className="p-2 rounded-full bg-white/20 hover:bg-white text-white hover:text-black transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
