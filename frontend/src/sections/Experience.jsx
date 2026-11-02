import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, MapPin, Calendar, X, FileText } from 'lucide-react';

function ExperienceCard({ exp, index, onOpenLetter }) {
  const formatDate = (d) => {
    if (!d) return '';
    const date = new Date(d);
    return isNaN(date.getTime()) ? d : date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <motion.div
      className="relative pl-8 sm:pl-10"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Timeline Node */}
      <div className="absolute left-0 top-7 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#1C1A18] flex items-center justify-center shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[#1C1A18]" />
      </div>

      <div className="bg-white p-6 sm:p-7 rounded-2xl ml-2 sm:ml-4 border border-[#EDE7DD] shadow-sm hover:border-[#DFD7CA] transition duration-200">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
          {/* Logo or Initial */}
          <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#FAF7F2] border border-[#EDE7DD] flex items-center justify-center overflow-hidden">
            {exp.logo_url ? (
              <img src={exp.logo_url} alt={exp.company} className="w-full h-full object-cover" />
            ) : (
              <span className="text-[#1C1A18] font-bold text-base">{exp.company?.[0] || 'E'}</span>
            )}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xl font-medium text-[#1C1A18]">{exp.role}</h3>
              {exp.type && (
                <span className="text-[11px] text-[#2A5E3A] bg-[#EAF3EB] border border-[#D1E6D6] px-2.5 py-0.5 rounded-full font-medium">
                  {exp.type}
                </span>
              )}
            </div>

            <p className="text-[#5E5A53] font-medium text-sm mt-0.5">{exp.company}</p>

            <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-[#8C877D]">
              <span className="flex items-center gap-1.5">
                <Calendar size={12} />
                {formatDate(exp.start_date)} &mdash; {exp.currently_working ? 'Present' : formatDate(exp.end_date)}
              </span>
              {exp.location && (
                <span className="flex items-center gap-1">
                  <MapPin size={12} /> {exp.location}
                </span>
              )}
            </div>
          </div>
        </div>

        {exp.description && (
          <p className="text-sm text-[#5E5A53] leading-relaxed mb-4 font-light">
            {exp.description}
          </p>
        )}

        {/* Bullets */}
        {exp.bullets && exp.bullets.length > 0 && (
          <ul className="space-y-1.5 mb-4">
            {exp.bullets.map((b, i) => (
              <li key={i} className="text-xs text-[#2C2926] flex items-start gap-2">
                <span className="text-[#1C1A18] font-bold mt-0.5">&rsaquo;</span>
                <span className="leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Skills Pills */}
        {exp.skills && exp.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4 pt-3 border-t border-[#EDE7DD]">
            {exp.skills.map((s) => (
              <span
                key={s}
                className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#FAF7F2] text-[#2C2926] border border-[#EDE7DD]"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {/* Bottom Actions: Certificate/Letter & Link */}
        <div className="flex items-center gap-3 pt-3 border-t border-[#EDE7DD]">
          {exp.letter_url && (
            <button
              onClick={() => onOpenLetter(exp.letter_url, `${exp.role} at ${exp.company} — Letter`)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1C1A18] hover:underline"
            >
              <FileText size={13} />
              <span>View Internship Letter / Certificate</span>
            </button>
          )}

          {exp.certificate_url && !exp.letter_url && (
            <a
              href={exp.certificate_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1C1A18] hover:underline"
            >
              <FileText size={13} />
              <span>View Credential</span>
              <ExternalLink size={11} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience({ experience }) {
  const [letterModal, setLetterModal] = useState(null);

  const openLetter = (url, title) => setLetterModal({ url, title });
  const closeLetter = () => setLetterModal(null);

  return (
    <section id="experience" className="bg-[#FAF7F2] text-[#1C1A18] py-24 sm:py-32 border-t border-[#EDE7DD]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-[#8C877D] text-[11px] font-semibold uppercase tracking-[0.16em] mb-3">
            &mdash; EXPERIENCE &amp; INTERNSHIPS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#1C1A18] leading-tight">
            Work History &amp; Roles
          </h2>
          <p className="text-[#5E5A53] text-sm mt-3 font-light leading-relaxed">
            Hands-on software engineering experience, internships, and open-source contributions.
          </p>
        </motion.div>

        {/* Timeline List */}
        <div className="relative">
          {/* Vertical Timeline Track */}
          <div className="absolute left-[7px] top-6 bottom-6 w-[2px] bg-[#EDE7DD]" />

          <div className="space-y-8">
            {(experience || []).map((exp, index) => (
              <ExperienceCard key={exp.id} exp={exp} index={index} onOpenLetter={openLetter} />
            ))}
          </div>
        </div>
      </div>

      {/* Letter Lightbox Modal */}
      <AnimatePresence>
        {letterModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1C1A18]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={closeLetter}
          >
            <div
              className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#EDE7DD]">
                <h3 className="font-medium text-base text-[#1C1A18]">{letterModal.title}</h3>
                <button
                  onClick={closeLetter}
                  className="w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#EDE7DD] flex items-center justify-center text-[#1C1A18] transition"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="mt-4 max-h-[75vh] overflow-auto flex items-center justify-center bg-[#FAF7F2] rounded-xl p-2">
                {letterModal.url.endsWith('.pdf') ? (
                  <iframe src={letterModal.url} className="w-full h-[70vh] rounded-lg" title="Document" />
                ) : (
                  <img src={letterModal.url} alt="Letter" className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg" />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
