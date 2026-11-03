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
  Menu,
} from 'lucide-react';
import { DOOR_CATEGORIES } from './DoorsSection';
import MenuDrawer from '../components/MenuDrawer';

const getStackArray = (stack) => {
  if (Array.isArray(stack)) return stack;
  if (typeof stack === 'string') {
    return stack.split(',').map((s) => s.trim()).filter(Boolean);
  }
  return [];
};

// ── Realistic Modern Apple Studio Display Mockup Screen ──
function ModernAppleDisplay({ project, image, onOpenLightbox }) {
  const isSkillForge = (project.title || '').toLowerCase().includes('skillforge') ||
                       (project.title || '').toLowerCase().includes('career');

  return (
    <div className="flex flex-col items-center w-full select-none mb-6">
      {/* Studio Display Bezel Frame */}
      <div className="w-full aspect-[16/10] rounded-2xl bg-[#0D0D10] border-[4px] border-[#222226] shadow-2xl p-1.5 sm:p-2 relative overflow-hidden flex flex-col justify-between">
        {/* Subtle Top Camera Dot */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-black border border-white/10 z-20" />

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
                <Maximize2 size={20} />
              </div>
            </div>
          ) : isSkillForge ? (
            /* Sleek Live Production Platform Display (SkillForge AI) */
            <div className="w-full h-full bg-[#0E1015] text-white p-3.5 sm:p-4 font-sans flex flex-col justify-between text-left">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center text-black font-black text-[10px]">
                    SF
                  </div>
                  <span className="font-bold text-xs tracking-tight">skillforge.ai</span>
                </div>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Platform
                </span>
              </div>

              <div className="my-auto py-2">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between mb-2">
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-white/50 block">ATS Score</span>
                    <span className="text-sm font-bold text-emerald-400">94 / 100 Verified</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-emerald-500/20 text-emerald-400 font-bold">
                    PASSED
                  </span>
                </div>
                <p className="text-[11px] text-white/70 line-clamp-2">
                  Gemini AI rubric mock interview with automated skill gap roadmaps.
                </p>
              </div>

              <div className="border-t border-white/10 pt-1.5 flex items-center justify-between text-[10px] font-mono text-white/50">
                <span>Django 5 &bull; DRF</span>
                <span className="text-emerald-400">100% Tests</span>
              </div>
            </div>
          ) : (
            /* Sleek Live Production Storefront / Systems Display */
            <div className="w-full h-full bg-[#0D0F14] text-white p-3.5 sm:p-4 font-mono text-[10px] flex flex-col justify-between text-left">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-white text-xs">storefront.api</span>
                </div>
                <span className="text-white/40">v2.4 Live</span>
              </div>

              <div className="my-auto py-2 space-y-1.5">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-amber-400 font-bold">$ GET /api/v1/catalogue</span>
                  <p className="text-white/70 mt-0.5">200 OK &bull; 18ms latency &bull; PostgreSQL</p>
                </div>
                <p className="text-[11px] text-white/80 font-sans line-clamp-2">
                  {project.description || 'Production-ready decoupled backend platform.'}
                </p>
              </div>

              <div className="border-t border-white/10 pt-1.5 flex items-center justify-between text-[10px] text-white/50">
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
      <div className="w-10 h-4 bg-gradient-to-b from-[#B0ACA5] via-[#8E8A82] to-[#6E6A63] shadow-inner" />

      {/* Modern Apple Display Oval Aluminum Foot */}
      <div className="w-28 sm:w-32 h-1.5 rounded-full bg-gradient-to-r from-[#9E9A92] via-[#C4C0B8] to-[#9E9A92] shadow-md -mt-0.5" />
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
  const [drawerOpen, setDrawerOpen] = useState(false);

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

    if (activeCategoryId === 'backend') {
      return (
        combined.includes('backend') ||
        combined.includes('api') ||
        combined.includes('django') ||
        combined.includes('python') ||
        combined.includes('drf') ||
        true
      );
    }
    if (activeCategoryId === 'app') {
      return (
        combined.includes('app') ||
        combined.includes('react') ||
        combined.includes('mobile') ||
        combined.includes('ios') ||
        true
      );
    }
    if (activeCategoryId === 'systems') {
      return (
        combined.includes('system') ||
        combined.includes('distributed') ||
        combined.includes('redis') ||
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
        true
      );
    }
    if (activeCategoryId === 'fullstack') {
      return (
        combined.includes('full-stack') ||
        combined.includes('react') ||
        combined.includes('ai') ||
        combined.includes('gemini') ||
        true
      );
    }
    return true;
  });

  const displayedProjects = filteredProjects.length > 0 ? filteredProjects : projects;

  return (
    <section
      id="doors"
      className="relative min-h-screen py-20 sm:py-28 px-4 sm:px-6 bg-[#EFECE6] dark:bg-[#121212] transition-colors"
    >
      <div className="max-w-xl mx-auto w-full">
        {/* ── Top Bar matching Reference Screenshot (media_1793723413874_8ed083a6.jpg) ── */}
        <div className="flex items-center justify-between gap-4 mb-8 sticky top-4 z-40">
          {/* Left: "← Back to the doors" Pill Button */}
          <button
            onClick={onBackToDoors}
            className="px-4 sm:px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all bg-white/90 dark:bg-[#1E1E22]/90 hover:bg-white text-[#1C1A18] dark:text-[#FAF7F2] border border-black/10 dark:border-white/10 shadow-sm flex items-center gap-2 backdrop-blur-md active:scale-95"
          >
            <ArrowLeft size={13} />
            <span>Back to the doors</span>
          </button>

          {/* Right: "Menu" Pill Button */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="px-4 sm:px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all bg-white/90 dark:bg-[#1E1E22]/90 hover:bg-white text-[#1C1A18] dark:text-[#FAF7F2] border border-black/10 dark:border-white/10 shadow-sm flex items-center gap-2 backdrop-blur-md active:scale-95"
          >
            <Menu size={13} />
            <span>Menu</span>
          </button>
        </div>

        {/* ── Visual Paper Stacking Header Sheets (Matching Screenshot) ── */}
        <div className="relative w-full flex flex-col items-center pointer-events-none mb-[-12px]">
          <div className="w-[84%] h-3.5 rounded-t-[1.8rem] bg-[#D4CEC2] dark:bg-[#202024] border-t border-x border-black/10 dark:border-white/5 opacity-60 transform -translate-y-2" />
          <div className="w-[92%] h-3.5 rounded-t-[2rem] bg-[#E0DAD0] dark:bg-[#26262B] border-t border-x border-black/10 dark:border-white/5 opacity-80 transform -translate-y-1" />
        </div>

        {/* ── Stacking Cards Deck (Swipe/Scroll Down to Stack Over Previous Paper) ── */}
        <div className="relative space-y-10 sm:space-y-14">
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
                  top: `calc(5.5rem + ${idx * 12}px)`,
                }}
                className="sticky rounded-[2.2rem] bg-white dark:bg-[#1A1A1E] border border-[#DDD5C7] dark:border-white/10 p-5 sm:p-7 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.6)] overflow-hidden"
              >
                {/* 1. Modern Apple Studio Display Screen Mockup */}
                <ModernAppleDisplay
                  project={project}
                  image={imgs[0]}
                  onOpenLightbox={() => setSelectedImageModal(imgs)}
                />

                {/* 2. Project Meta & Details (Matching Screenshot Style) */}
                <div className="text-left">
                  {/* Category & Status Tag */}
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-mono font-bold tracking-widest text-[#736D64] dark:text-[#88837A] uppercase">
                      {tagLabel} &bull; LIVE
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#1C1A18] dark:text-[#FAF7F2] font-sans leading-tight">
                    {project.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-xs sm:text-sm font-sans text-[#736D64] dark:text-[#9A9388] mt-1 font-medium">
                    {stackItems.slice(0, 3).join(' • ') || 'Production Architecture'}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm font-sans text-[#4A453E] dark:text-[#C5BFB5] leading-relaxed my-4">
                    {project.description ||
                      'Production-grade system built with strict reliability, high availability, and clean modular code.'}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    {project.live_url ? (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[#1C1A18] hover:bg-black dark:bg-[#FAF7F2] dark:hover:bg-white text-white dark:text-[#121212] px-6 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all shadow-md inline-flex items-center gap-2 active:scale-95"
                      >
                        <span>Visit live site</span>
                        <ExternalLink size={12} />
                      </a>
                    ) : (
                      <button
                        onClick={() => setSelectedImageModal(imgs)}
                        className="bg-[#1C1A18] hover:bg-black dark:bg-[#FAF7F2] dark:hover:bg-white text-white dark:text-[#121212] px-6 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all shadow-md inline-flex items-center gap-2 active:scale-95"
                      >
                        <span>Explore details</span>
                        <ExternalLink size={12} />
                      </button>
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
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Menu Drawer */}
      <MenuDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSelectRoute={(route) => {
          if (route.category && onSelectCategory) {
            onSelectCategory(route.category);
          } else {
            onBackToDoors();
          }
        }}
      />

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
