import { motion } from 'framer-motion';
import { Code, Server, Layout, Cloud, Sparkles, Wrench } from 'lucide-react';

const CATEGORY_ICONS = {
  Programming: Code,
  Backend: Server,
  Frontend: Layout,
  DevOps: Cloud,
  AI: Sparkles,
  Tools: Wrench,
};

const CATEGORY_ORDER = ['Backend', 'Programming', 'DevOps', 'AI', 'Frontend', 'Tools'];

function groupSkills(skills) {
  if (skills && !Array.isArray(skills) && typeof skills === 'object') {
    return skills;
  }
  const map = {};
  (Array.isArray(skills) ? skills : []).forEach((s) => {
    const cat = s.category || 'Other';
    if (!map[cat]) map[cat] = [];
    map[cat].push(s);
  });
  const ordered = {};
  [...CATEGORY_ORDER, ...Object.keys(map).filter((k) => !CATEGORY_ORDER.includes(k))].forEach((k) => {
    if (map[k]) ordered[k] = map[k];
  });
  return ordered;
}

export default function Skills({ skills }) {
  const grouped = groupSkills(skills);

  return (
    <section id="skills" className="bg-[#FAF7F2] text-[#1C1A18] py-24 sm:py-32 border-t border-[#EDE7DD]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <div className="text-[#8C877D] text-[11px] font-semibold uppercase tracking-[0.16em] mb-3">
            &mdash; TECHNICAL REPERTOIRE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#1C1A18] leading-tight">
            Technologies &amp; Frameworks
          </h2>
          <p className="text-[#5E5A53] text-sm mt-3 font-light leading-relaxed">
            Tools, architectures, and platforms I leverage to design robust systems and scalable APIs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(grouped).map(([category, items], ci) => {
            const Icon = CATEGORY_ICONS[category] || Wrench;
            return (
              <motion.div
                key={category}
                className="bg-white p-6 sm:p-7 rounded-2xl border border-[#EDE7DD] shadow-sm hover:border-[#DFD7CA] transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: ci * 0.08 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF7F2] border border-[#EDE7DD] flex items-center justify-center text-[#1C1A18]">
                    <Icon size={17} />
                  </div>
                  <h3 className="font-semibold text-base text-[#1C1A18]">{category}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill.id || skill.name}
                      className="px-3 py-1.5 rounded-lg bg-[#FAF7F2] text-[#2C2926] border border-[#EDE7DD] text-xs font-medium hover:border-[#DFD7CA] transition-colors"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
