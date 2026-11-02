import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

export default function Achievements({ achievements }) {
  return (
    <section id="achievements" className="bg-[#FAF7F2] text-[#1C1A18] py-24 sm:py-32 border-t border-[#EDE7DD]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-[#8C877D] text-[11px] font-semibold uppercase tracking-[0.16em] mb-3">
            &mdash; MILESTONES &amp; HONORS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#1C1A18] leading-tight">
            Key Achievements
          </h2>
          <p className="text-[#5E5A53] text-sm mt-3 font-light leading-relaxed">
            Hackathon finalist results and competitive programming highlights.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-4 bottom-4 w-[2px] bg-[#EDE7DD]" />

          <div className="space-y-8">
            {(achievements || []).map((ach, i) => {
              const year = ach.date ? new Date(ach.date).getFullYear() : '2026';
              return (
                <motion.div
                  key={ach.id}
                  className="relative pl-8 sm:pl-10"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  {/* Dot */}
                  <div className="absolute left-0 top-5 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#1C1A18] flex items-center justify-center shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1C1A18]" />
                  </div>

                  {/* Card */}
                  <div className="bg-white p-6 sm:p-7 rounded-2xl ml-2 sm:ml-4 border border-[#EDE7DD] shadow-sm hover:border-[#DFD7CA] transition duration-200">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-semibold text-[#1C1A18] tracking-wider uppercase">
                        {ach.category || 'Milestone'}
                      </span>
                      <span className="text-xs text-[#8C877D] flex items-center gap-1 font-medium">
                        <Calendar size={12} /> {ach.date || year}
                      </span>
                    </div>

                    <h3 className="text-xl font-medium text-[#1C1A18] mb-2">{ach.title}</h3>
                    <p className="text-sm text-[#5E5A53] leading-relaxed font-light">{ach.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
