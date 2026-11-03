import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, ChevronRight, Layers, Terminal } from 'lucide-react';
import { DOOR_CATEGORIES } from './DoorsSection';

export default function ProjectCategoryView({
  projects = [],
  activeCategoryId = 'backend',
  onSelectCategory,
  onBackToDoors,
}) {
  const [selectedImageModal, setSelectedImageModal] = useState(null);

  const activeCategory =
    DOOR_CATEGORIES.find((c) => c.id === activeCategoryId) || DOOR_CATEGORIES[0];

  // Filter projects by matching category or show all if category is broad
  const filteredProjects = projects.filter((p) => {
    if (!activeCategoryId) return true;
    const cat = (p.category || p.stack || '').toLowerCase();
    if (activeCategoryId === 'backend') {
      return cat.includes('backend') || cat.includes('api') || cat.includes('django') || cat.includes('python') || true;
    }
    if (activeCategoryId === 'systems') {
      return cat.includes('system') || cat.includes('distributed') || cat.includes('redis') || true;
    }
    if (activeCategoryId === 'cloud') {
      return cat.includes('cloud') || cat.includes('aws') || cat.includes('docker') || cat.includes('devops') || true;
    }
    return true;
  });

  return (
    <section className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-8 bg-[#EFECE6] dark:bg-[#121212] transition-colors">
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
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, idx) => {
              const imgs =
                project.images && project.images.length > 0
                  ? project.images
                  : project.image_url
                  ? [project.image_url]
                  : [];

              return (
                <motion.div
                  key={project.id || idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="rounded-3xl bg-white/80 dark:bg-[#18181A] border border-[#DDD6C9] dark:border-white/10 p-6 sm:p-10 shadow-sm overflow-hidden"
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
                          {project.stack ? project.stack.split(',')[0].trim() : 'BACKEND SYSTEM'}
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
                      {project.stack && (
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {project.stack.split(',').map((tech, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-md bg-[#FAF7F2] dark:bg-white/5 border border-[#EDE7DD] dark:border-white/10 text-[10px] font-mono text-[#5E5A53] dark:text-[#A8A196]"
                            >
                              {tech.trim()}
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

                        {imgs.length > 1 && (
                          <button
                            onClick={() => setSelectedImageModal(imgs)}
                            className="px-4 py-2.5 rounded-full text-xs font-medium text-[#736D64] dark:text-[#9A9388] hover:text-[#1C1A18] dark:hover:text-white inline-flex items-center gap-1.5 transition-colors"
                          >
                            <Layers size={13} />
                            <span>{imgs.length} Photos</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Right: Realistic 3D Device / Monitor Mockup (5 cols) */}
                    <div className="lg:col-span-5 flex justify-center">
                      <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[9/16] max-h-[380px] rounded-[2.5rem] p-3 bg-[#1C1C1E] border-[6px] border-[#2C2C2E] shadow-2xl overflow-hidden flex flex-col justify-between">
                        {/* Dynamic Island / Speaker Pill */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-20 flex items-center justify-center">
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-white/10 mr-1" />
                        </div>

                        {/* Screen Content */}
                        <div className="relative w-full h-full rounded-[2rem] bg-black overflow-hidden flex flex-col">
                          {imgs[0] ? (
                            <img
                              src={imgs[0]}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            /* Sleek terminal dashboard mockup when no screenshot */
                            <div className="w-full h-full p-4 font-mono text-[11px] text-emerald-400 bg-[#090A0E] flex flex-col justify-between">
                              <div>
                                <div className="flex items-center gap-1.5 mb-3 text-white/30 text-[9px]">
                                  <span className="w-2 h-2 rounded-full bg-red-500/70" />
                                  <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
                                  <span className="w-2 h-2 rounded-full bg-green-500/70" />
                                  <span className="ml-1 text-white/40">system.api:8000</span>
                                </div>
                                <p className="text-amber-300">$ GET /api/v1/health</p>
                                <p className="text-white/60">status: &quot;200 OK&quot;</p>
                                <p className="text-white/60">latency: 18ms</p>
                                <p className="text-emerald-400 mt-2">$ uvicorn app:running</p>
                                <p className="text-white/40 mt-1 line-clamp-3">
                                  {project.description || 'Database connected. 100% test coverage.'}
                                </p>
                              </div>
                              <div className="border-t border-white/10 pt-2 text-[10px] text-white/50 flex justify-between">
                                <span>{project.stack?.split(',')[0] || 'Python'}</span>
                                <span className="text-emerald-400">ACTIVE</span>
                              </div>
                            </div>
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

      {/* Screenshots Modal */}
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
              className="relative max-w-4xl w-full p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[80vh] overflow-y-auto">
                {selectedImageModal.map((img, i) => (
                  <div
                    key={i}
                    className="rounded-2xl overflow-hidden border border-white/15 bg-black"
                  >
                    <img
                      src={img}
                      alt={`Screenshot ${i + 1}`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

