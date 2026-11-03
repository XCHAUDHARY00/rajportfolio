import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Github,
  Maximize2,
  X,
  Info,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';
import { DOOR_CATEGORIES } from './DoorsSection';

const getStackArray = (stack) => {
  if (Array.isArray(stack)) return stack;
  if (typeof stack === 'string') {
    return stack.split(',').map((s) => s.trim()).filter(Boolean);
  }
  return [];
};

// ── Realistic Modern Apple Studio Display Mockup Screen ──
function ModernAppleDisplay({ project, image, onOpenLightbox }) {
  const isSkillForge =
    (project.title || '').toLowerCase().includes('skillforge') ||
    (project.title || '').toLowerCase().includes('career');

  return (
    <div className="flex flex-col items-center w-full select-none mb-6">
      {/* Studio Display Bezel Frame */}
      <div className="w-full aspect-[16/10] max-h-[460px] rounded-2xl bg-[#0D0D10] border-[4px] sm:border-[5px] border-[#222226] shadow-2xl p-1.5 sm:p-2.5 relative overflow-hidden flex flex-col justify-between">
        {/* Subtle Top Camera Dot */}
        <div className="absolute top-1.5 sm:top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-black border border-white/10 z-20" />

        {/* Inner Glass Display */}
        <div className="relative w-full h-full rounded-xl bg-black overflow-hidden flex flex-col justify-between">
          {image ? (
            <div
              onClick={onOpenLightbox}
              className="relative w-full h-full cursor-pointer group"
            >
              <img
                src={image}
                alt={project.title}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Maximize2 size={24} />
              </div>
            </div>
          ) : isSkillForge ? (
            /* Sleek Live Production Platform Display (SkillForge AI) */
            <div className="w-full h-full bg-[#0E1015] text-white p-4 sm:p-6 font-sans flex flex-col justify-between text-left">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center text-black font-black text-xs">
                    SF
                  </div>
                  <span className="font-bold text-sm tracking-tight">skillforge.ai</span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Platform
                </span>
              </div>

              <div className="my-auto py-3">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between mb-2.5">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block">ATS Score</span>
                    <span className="text-base font-bold text-emerald-400">94 / 100 Verified</span>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 font-bold">
                    PASSED
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-white/70 line-clamp-2 leading-relaxed">
                  Gemini AI rubric mock interview with automated skill gap roadmaps and intelligent caching.
                </p>
              </div>

              <div className="border-t border-white/10 pt-2 flex items-center justify-between text-[11px] font-mono text-white/50">
                <span>Django 5 &bull; DRF &bull; Gemini API</span>
                <span className="text-emerald-400">100% Tests Pass</span>
              </div>
            </div>
          ) : (
            /* Sleek Live Production Storefront / Systems Display */
            <div className="w-full h-full bg-[#0D0F14] text-white p-4 sm:p-6 font-mono text-xs flex flex-col justify-between text-left">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-white text-sm">storefront.api</span>
                </div>
                <span className="text-white/40">v2.4 Live</span>
              </div>

              <div className="my-auto py-3 space-y-2">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-amber-400 font-bold">$ GET /api/v1/catalogue</span>
                  <p className="text-white/70 mt-1">200 OK &bull; 18ms latency &bull; PostgreSQL</p>
                </div>
                <p className="text-xs sm:text-sm text-white/80 font-sans line-clamp-2">
                  {project.description || 'Production-ready decoupled backend platform.'}
                </p>
              </div>

              <div className="border-t border-white/10 pt-2 flex items-center justify-between text-[11px] text-white/50">
                <span className="text-amber-400 font-bold">{getStackArray(project.stack)[0] || 'Python 3.12'}</span>
                <span className="text-emerald-400">HEALTHY</span>
              </div>
            </div>
          )}

          {/* Glossy Curved Glass Reflection */}
          <div
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)',
            }}
          />
        </div>
      </div>

      {/* Modern Apple Display Aluminum Stand Neck */}
      <div className="w-12 h-5 bg-gradient-to-b from-[#B0ACA5] via-[#8E8A82] to-[#6E6A63] shadow-inner" />

      {/* Modern Apple Display Oval Aluminum Foot */}
      <div className="w-36 sm:w-44 h-2 rounded-full bg-gradient-to-r from-[#9E9A92] via-[#C4C0B8] to-[#9E9A92] shadow-md -mt-0.5" />
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
  const [detailProject, setDetailProject] = useState(null);

  const activeCategory =
    DOOR_CATEGORIES.find((c) => c.id === activeCategoryId) || DOOR_CATEGORIES[0];

  // Robust project filtering
  const filteredProjects = (projects || []).filter((p) => {
    if (!activeCategoryId) return true;
    const stackArr = getStackArray(p.stack);
    const stackStr = stackArr.join(' ').toLowerCase();
    const catStr = (p.category || '').toLowerCase();
    const titleStr = (p.title || '').toLowerCase();
    const descStr = (p.description || '').toLowerCase();
    const combined = `${catStr} ${stackStr} ${titleStr} ${descStr}`;

    // Direct category match
    if (catStr === activeCategoryId) return true;
    if ((activeCategoryId === 'ios' || activeCategoryId === 'app') && (catStr === 'ios' || catStr === 'app')) return true;
    if (activeCategoryId === 'web' && (catStr === 'web' || catStr === 'frontend')) return true;

    if (activeCategoryId === 'ios' || activeCategoryId === 'app') {
      return (
        catStr.includes('ios') ||
        combined.includes('ios') ||
        combined.includes('swift') ||
        combined.includes('mobile') ||
        combined.includes('app')
      );
    }
    if (activeCategoryId === 'web') {
      return (
        catStr.includes('web') ||
        combined.includes('web') ||
        combined.includes('react') ||
        combined.includes('frontend') ||
        combined.includes('tailwind')
      );
    }
    if (activeCategoryId === 'backend') {
      return (
        catStr.includes('backend') ||
        combined.includes('backend') ||
        combined.includes('api') ||
        combined.includes('django') ||
        combined.includes('python') ||
        combined.includes('drf')
      );
    }
    if (activeCategoryId === 'systems') {
      return (
        catStr.includes('system') ||
        combined.includes('system') ||
        combined.includes('distributed') ||
        combined.includes('redis') ||
        combined.includes('database')
      );
    }
    if (activeCategoryId === 'cloud') {
      return (
        catStr.includes('cloud') ||
        combined.includes('cloud') ||
        combined.includes('aws') ||
        combined.includes('docker') ||
        combined.includes('devops')
      );
    }
    if (activeCategoryId === 'fullstack') {
      return (
        catStr.includes('full-stack') ||
        combined.includes('full-stack') ||
        combined.includes('react') ||
        combined.includes('ai') ||
        combined.includes('gemini')
      );
    }

    return true;
  });

  const displayedProjects = filteredProjects.length > 0 ? filteredProjects : projects;

  return (
    <section
      id="doors"
      className="relative min-h-screen pt-24 pb-28 px-4 sm:px-8 bg-[#EFECE6] dark:bg-[#121212] transition-colors"
    >
      {/* ── EXPANDED WIDE CONTAINER (Generous max-w-4xl to max-w-5xl) ── */}
      <div className="max-w-4xl lg:max-w-5xl mx-auto w-full">
        {/* Visual Paper Stacking Top Sheets */}
        <div className="relative w-full flex flex-col items-center pointer-events-none mb-[-14px]">
          <div className="w-[88%] h-3.5 rounded-t-[2rem] bg-[#D4CEC2] dark:bg-[#202024] border-t border-x border-black/10 dark:border-white/5 opacity-60 transform -translate-y-2" />
          <div className="w-[94%] h-3.5 rounded-t-[2.2rem] bg-[#E0DAD0] dark:bg-[#26262B] border-t border-x border-black/10 dark:border-white/5 opacity-80 transform -translate-y-1" />
        </div>

        {/* ── Stacking Cards Deck (Paper Stacking Effect) ── */}
        <div className="relative space-y-12 sm:space-y-16">
          {displayedProjects.map((project, idx) => {
            const imgs =
              project.images && project.images.length > 0
                ? project.images
                : project.image_url
                ? [project.image_url]
                : [];

            const stackItems = getStackArray(project.stack);
            const tagLabel = stackItems[0] || 'PRODUCTION';

            return (
              <motion.div
                key={project.id || idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                style={{
                  top: `calc(5rem + ${idx * 14}px)`,
                }}
                className="sticky rounded-[2.5rem] bg-white dark:bg-[#1A1A1E] border border-[#DDD5C7] dark:border-white/10 p-6 sm:p-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.14)] dark:shadow-[0_24px_55px_-12px_rgba(0,0,0,0.7)] overflow-hidden"
              >
                {/* 1. Modern Apple Studio Display Screen Mockup (Full proper width) */}
                <ModernAppleDisplay
                  project={project}
                  image={imgs[0]}
                  onOpenLightbox={() => setSelectedImageModal(imgs)}
                />

                {/* 2. Project Meta & Details */}
                <div className="text-left mt-4">
                  {/* Category & Status Tag */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-[#736D64] dark:text-[#88837A] uppercase">
                      {tagLabel} &bull; LIVE SYSTEM
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#1C1A18] dark:text-[#FAF7F2] font-sans leading-tight">
                    {project.title}
                  </h3>

                  {/* Subtitle / Tech overview */}
                  <p className="text-xs sm:text-sm font-sans text-[#736D64] dark:text-[#9A9388] mt-1.5 font-medium">
                    {stackItems.slice(0, 4).join(' • ') || 'Production Architecture'}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-base font-sans text-[#4A453E] dark:text-[#C5BFB5] leading-relaxed my-4 max-w-3xl">
                    {project.description ||
                      'Production-grade system built with strict reliability, high availability, and clean modular code.'}
                  </p>

                  {/* Action Buttons: Live site, Source Code, and VIEW FULL INFORMATION Button */}
                  <div className="flex flex-wrap items-center gap-3.5 pt-2">
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[#1C1A18] hover:bg-black dark:bg-[#FAF7F2] dark:hover:bg-white text-white dark:text-[#121212] px-6 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all shadow-md inline-flex items-center gap-2 active:scale-95"
                      >
                        <span>Visit live site</span>
                        <ExternalLink size={13} />
                      </a>
                    )}

                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all border border-[#CCC4B4] dark:border-[#3D3D42] text-[#2C2926] dark:text-[#FAF7F2] hover:bg-black/5 dark:hover:bg-white/10 inline-flex items-center gap-1.5 active:scale-95"
                      >
                        <Github size={13} />
                        <span>Source Code</span>
                      </a>
                    )}

                    {/* ── "View Full Information" Button as requested ── */}
                    <button
                      onClick={() => setDetailProject(project)}
                      className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all bg-[#FAF7F2] dark:bg-white/5 border border-[#CCC4B4] dark:border-white/15 text-[#1C1A18] dark:text-[#FAF7F2] hover:bg-white dark:hover:bg-white/10 inline-flex items-center gap-2 active:scale-95 shadow-xs"
                    >
                      <Info size={13} className="text-amber-500" />
                      <span>View Full Information</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── MODAL: VIEW FULL INFORMATION MODAL (Description, All Tech Stack, All Images) ── */}
      <AnimatePresence>
        {detailProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDetailProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full max-h-[88vh] overflow-y-auto rounded-[2rem] bg-white dark:bg-[#1A1A1E] text-[#1C1A18] dark:text-[#FAF7F2] border border-black/10 dark:border-white/10 p-6 sm:p-10 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setDetailProject(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 flex items-center justify-center text-[#1C1A18] dark:text-white transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* Tag & Title */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-mono font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase">
                  PROJECT SPECIFICATION
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1A18] dark:text-white font-sans pr-8">
                {detailProject.title}
              </h2>

              {/* Full Multi-Paragraph Description */}
              <div className="my-6">
                <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[#736D64] dark:text-[#88837A] mb-2">
                  FULL DESCRIPTION &amp; SYSTEM OVERVIEW
                </h4>
                <p className="text-sm sm:text-base font-sans text-[#3D3A35] dark:text-[#C5BFB5] leading-relaxed">
                  {detailProject.description}
                </p>
              </div>

              {/* Key Deliverables / Bullets */}
              {detailProject.bullets && detailProject.bullets.length > 0 && (
                <div className="my-6">
                  <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[#736D64] dark:text-[#88837A] mb-3">
                    CORE ENGINEERING RESPONSIBILITIES
                  </h4>
                  <ul className="space-y-2">
                    {detailProject.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#403B35] dark:text-[#C5BFB5]">
                        <CheckCircle2 size={15} className="text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Complete Tech Stack */}
              <div className="my-6">
                <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[#736D64] dark:text-[#88837A] mb-3">
                  COMPLETE TECHNOLOGY STACK
                </h4>
                <div className="flex flex-wrap gap-2">
                  {getStackArray(detailProject.stack).map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono font-medium text-[#1C1A18] dark:text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* All Images Gallery */}
              {((detailProject.images && detailProject.images.length > 0) || detailProject.image_url) && (
                <div className="my-6">
                  <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[#736D64] dark:text-[#88837A] mb-3">
                    PROJECT SCREENSHOTS &amp; ARCHIVES
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(detailProject.images && detailProject.images.length > 0
                      ? detailProject.images
                      : [detailProject.image_url]
                    ).map((img, i) => (
                      <div
                        key={i}
                        onClick={() => setSelectedImageModal([img])}
                        className="rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 cursor-pointer group relative aspect-[16/10] bg-black"
                      >
                        <img
                          src={img}
                          alt={`${detailProject.title} screenshot ${i + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                          <Maximize2 size={20} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons inside Modal */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-black/10 dark:border-white/10 mt-8">
                {detailProject.live_url && (
                  <a
                    href={detailProject.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#1C1A18] hover:bg-black dark:bg-white dark:hover:bg-slate-200 text-white dark:text-[#121212] px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all inline-flex items-center gap-2"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink size={13} />
                  </a>
                )}

                {detailProject.github_url && (
                  <a
                    href={detailProject.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border border-[#CCC4B4] dark:border-white/15 text-[#1C1A18] dark:text-white hover:bg-black/5 dark:hover:bg-white/10 inline-flex items-center gap-2"
                  >
                    <Github size={13} />
                    <span>View Repository</span>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageModal && selectedImageModal.length > 0 && (
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
                src={selectedImageModal[0]}
                alt="Project Preview"
                className="max-h-[75vh] w-auto max-w-full rounded-2xl border border-white/15 object-contain shadow-2xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
