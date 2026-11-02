import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronLeft, ChevronRight, Maximize2, X, FolderGit2 } from 'lucide-react';

function ImageCarousel({ images, title, onOpenModal }) {
  const [index, setIndex] = useState(0);

  const list = images && images.length > 0 ? images : [];

  if (list.length === 0) {
    return (
      <div className="w-full h-full min-h-[260px] flex flex-col items-center justify-center bg-[#F4EFE7] p-8 text-center relative overflow-hidden group">
        <div className="w-14 h-14 rounded-2xl bg-white border border-[#EDE7DD] flex items-center justify-center mb-3 text-[#1C1A18] shadow-sm">
          <FolderGit2 size={24} />
        </div>
        <p className="font-semibold text-xl text-[#1C1A18]/50">{title?.[0] || 'P'}</p>
        <span className="text-xs text-[#8C877D] mt-1">Screenshots available via CMS</span>
      </div>
    );
  }

  const prev = (e) => {
    e.stopPropagation();
    setIndex((i) => (i === 0 ? list.length - 1 : i - 1));
  };

  const next = (e) => {
    e.stopPropagation();
    setIndex((i) => (i === list.length - 1 ? 0 : i + 1));
  };

  return (
    <div
      className="relative w-full h-full min-h-[260px] md:min-h-[300px] bg-[#F4EFE7] overflow-hidden group cursor-pointer"
      onClick={() => onOpenModal && onOpenModal(list, index)}
    >
      {/* Current Image */}
      <img
        src={list[index]}
        alt={`${title} screenshot ${index + 1}`}
        className="w-full h-full object-cover object-top transition duration-500 group-hover:scale-105"
      />

      {/* Multi-Image Navigation Controls */}
      {list.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#1C1A18] flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 shadow-sm border border-[#EDE7DD]"
            aria-label="Previous image"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#1C1A18] flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 shadow-sm border border-[#EDE7DD]"
            aria-label="Next image"
          >
            <ChevronRight size={16} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-white/80 px-2.5 py-1 rounded-full backdrop-blur-sm border border-[#EDE7DD]">
            {list.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setIndex(i); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? 'w-5 bg-[#1C1A18]' : 'w-1.5 bg-[#8C877D]/50 hover:bg-[#1C1A18]'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Image Counter Badge */}
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md border border-[#EDE7DD] text-[#2C2926] text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1.5 pointer-events-none shadow-sm">
        <Maximize2 size={10} />
        <span>{index + 1} / {list.length}</span>
      </div>
    </div>
  );
}

function ProjectCard({ project, onOpenModal }) {
  const images = (project.images && project.images.length > 0)
    ? project.images
    : (project.image_url ? [project.image_url] : []);

  const tags = Array.isArray(project.stack)
    ? project.stack
    : (project.stack || '').split(',').map((s) => s.trim()).filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`bg-white rounded-3xl overflow-hidden flex flex-col border border-[#EDE7DD] shadow-sm hover:border-[#DFD7CA] transition-all duration-300 ${
        project.featured ? 'lg:flex-row' : ''
      }`}
    >
      {/* Media / Carousel Section */}
      <div className={`${project.featured ? 'lg:w-1/2' : 'w-full'} min-h-[260px] relative`}>
        <ImageCarousel images={images} title={project.title} onOpenModal={onOpenModal} />
        {project.featured && (
          <span className="absolute top-3 left-3 bg-[#1C1A18] text-[#FAF7F2] text-[11px] font-semibold px-3 py-1 rounded-full tracking-wider uppercase shadow-sm">
            Featured
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className={`${project.featured ? 'lg:w-1/2 p-8 lg:p-10' : 'p-6 flex-1'} flex flex-col justify-between`}>
        <div>
          <div className="flex items-center justify-between gap-4 mb-2">
            <h3 className="text-2xl font-medium text-[#1C1A18] leading-snug">
              {project.title}
            </h3>
            {project.start_date && (
              <span className="text-[11px] text-[#8C877D] whitespace-nowrap">
                {project.start_date} {project.end_date ? `– ${project.end_date}` : ''}
              </span>
            )}
          </div>

          <p className="text-[#5E5A53] text-sm leading-relaxed mb-6 font-light">
            {project.description}
          </p>

          {/* Highlights / Bullets */}
          {project.bullets && project.bullets.length > 0 && (
            <ul className="mb-6 space-y-2">
              {project.bullets.slice(0, 4).map((b, i) => (
                <li key={i} className="text-[#2C2926] text-xs flex items-start gap-2">
                  <span className="text-[#1C1A18] font-bold mt-0.5">&rsaquo;</span>
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          {/* Tech Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-[#EDE7DD]">
            {tags.map((t) => (
              <span
                key={t}
                className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-[#FAF7F2] text-[#2C2926] border border-[#EDE7DD]"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            {project.github_url && (
              <a
                href={project.github_url.startsWith('http') ? project.github_url : `https://${project.github_url}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1C1A18] hover:text-black transition-colors py-1"
              >
                <Github size={14} />
                <span>Source Code</span>
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url.startsWith('http') ? project.live_url : `https://${project.live_url}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1C1A18] hover:underline transition-colors py-1"
              >
                <ExternalLink size={14} />
                <span>Live Demo</span>
              </a>
            )}
            {images.length > 0 && (
              <button
                onClick={() => onOpenModal && onOpenModal(images, 0)}
                className="ml-auto text-xs text-[#8C877D] hover:text-[#1C1A18] flex items-center gap-1 transition-colors"
              >
                <Maximize2 size={12} /> {images.length} Photos
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ projects }) {
  const [modalImages, setModalImages] = useState(null);
  const [modalIndex, setModalIndex] = useState(0);

  const openModal = (images, index) => {
    setModalImages(images);
    setModalIndex(index);
  };

  const closeModal = () => setModalImages(null);

  const nextModal = (e) => {
    e.stopPropagation();
    setModalIndex((i) => (i === modalImages.length - 1 ? 0 : i + 1));
  };

  const prevModal = (e) => {
    e.stopPropagation();
    setModalIndex((i) => (i === 0 ? modalImages.length - 1 : i - 1));
  };

  return (
    <section id="projects" className="bg-[#FAF7F2] text-[#1C1A18] py-24 sm:py-32 border-t border-[#EDE7DD]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <div className="text-[#8C877D] text-[11px] font-semibold uppercase tracking-[0.16em] mb-3">
            &mdash; SELECTED WORK
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#1C1A18] leading-tight">
            Production-grade systems &amp; platforms
          </h2>
          <p className="text-[#5E5A53] text-sm mt-3 font-light leading-relaxed">
            Full-stack and backend projects featuring high-concurrency architectures, clean RESTful APIs, and AI integrations.
          </p>
        </motion.div>

        <div className="space-y-8">
          {(projects || []).map((project) => (
            <ProjectCard key={project.id} project={project} onOpenModal={openModal} />
          ))}
        </div>
      </div>

      {/* Lightbox Modal for Multi-Image Preview */}
      <AnimatePresence>
        {modalImages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1C1A18]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={closeModal}
          >
            <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 sm:right-2 w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center transition duration-200"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              {/* Main Image */}
              <div
                className="relative w-full rounded-2xl overflow-hidden bg-black/40 flex items-center justify-center shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={modalImages[modalIndex]}
                  alt={`Screenshot ${modalIndex + 1}`}
                  className="max-h-[78vh] w-auto max-w-full object-contain"
                />

                {modalImages.length > 1 && (
                  <>
                    <button
                      onClick={prevModal}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/80 hover:bg-white text-black flex items-center justify-center transition shadow-lg"
                      aria-label="Previous"
                    >
                      <ChevronLeft size={22} />
                    </button>
                    <button
                      onClick={nextModal}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/80 hover:bg-white text-black flex items-center justify-center transition shadow-lg"
                      aria-label="Next"
                    >
                      <ChevronRight size={22} />
                    </button>
                  </>
                )}
              </div>

              {/* Pagination Dots */}
              {modalImages.length > 1 && (
                <div className="flex items-center gap-2 mt-4">
                  {modalImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setModalIndex(i); }}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === modalIndex ? 'w-7 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
