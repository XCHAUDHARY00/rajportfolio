import { motion } from 'framer-motion';
import {
  Code,
  Server,
  Layout,
  Cloud,
  Sparkles,
  Wrench,
  Smartphone,
  Database,
  ArrowRight,
} from 'lucide-react';

const CATEGORY_ICONS = {
  Backend: Server,
  Programming: Code,
  Mobile: Smartphone,
  Frontend: Layout,
  Databases: Database,
  DevOps: Cloud,
  AI: Sparkles,
  Tools: Wrench,
};

const CATEGORY_ORDER = ['Backend', 'Mobile', 'Programming', 'Frontend', 'Databases', 'DevOps', 'Tools'];

const DEFAULT_PORTFOLIO_SKILLS = [
  { name: 'Python 3.12', category: 'Backend' },
  { name: 'Django 5', category: 'Backend' },
  { name: 'Django REST Framework', category: 'Backend' },
  { name: 'FastAPI', category: 'Backend' },
  { name: 'REST APIs & JWT', category: 'Backend' },
  { name: 'iOS (Swift & SwiftUI)', category: 'Mobile' },
  { name: 'Mobile API Integration', category: 'Mobile' },
  { name: 'JavaScript (ES6+)', category: 'Programming' },
  { name: 'C / C++', category: 'Programming' },
  { name: 'React.js 18', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Framer Motion', category: 'Frontend' },
  { name: 'PostgreSQL', category: 'Databases' },
  { name: 'Amazon DynamoDB', category: 'Databases' },
  { name: 'Redis', category: 'Databases' },
  { name: 'AWS (S3, DynamoDB)', category: 'DevOps' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'CI/CD GitHub Actions', category: 'DevOps' },
  { name: 'Gemini AI API', category: 'Tools' },
  { name: 'Git & GitHub', category: 'Tools' },
];

function groupSkills(skills) {
  const list = Array.isArray(skills) && skills.length > 0 ? skills : DEFAULT_PORTFOLIO_SKILLS;
  const map = {};
  list.forEach((s) => {
    const cat = s.category || 'Backend';
    if (!map[cat]) map[cat] = [];
    map[cat].push(s);
  });
  const ordered = {};
  [...CATEGORY_ORDER, ...Object.keys(map).filter((k) => !CATEGORY_ORDER.includes(k))].forEach((k) => {
    if (map[k]) ordered[k] = map[k];
  });
  return ordered;
}

export default function Skills({ skills, onOpenFullSkills }) {
  const grouped = groupSkills(skills);

  return (
    <section id="skills" className="bg-[#FAF7F2] dark:bg-[#141416] text-[#1C1A18] dark:text-[#FAF7F2] py-24 sm:py-32 border-t border-[#EDE7DD] dark:border-white/10 transition-colors">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="text-amber-600 dark:text-amber-400 text-xs font-mono font-bold uppercase tracking-[0.18em] mb-3 flex items-center gap-1.5">
              <Sparkles size={13} />
              <span>TECHNICAL ARSENAL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1A18] dark:text-white leading-tight font-sans">
              Technologies &amp; Frameworks
            </h2>
            <p className="text-[#5E5A53] dark:text-[#A0998E] text-sm mt-3 font-normal leading-relaxed">
              Modern full-stack, native iOS, and scalable backend platforms engineered for high throughput and reliable execution.
            </p>
          </motion.div>

          {onOpenFullSkills && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenFullSkills}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#1C1A18] dark:bg-white text-white dark:text-[#121212] shadow-sm hover:opacity-90 transition-opacity self-start md:self-auto"
            >
              <span>Explore all skills</span>
              <ArrowRight size={13} />
            </motion.button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(grouped).map(([category, items], ci) => {
            const Icon = CATEGORY_ICONS[category] || Wrench;
            return (
              <motion.div
                key={category}
                className="bg-white dark:bg-[#1A1A1E] p-6 sm:p-7 rounded-2xl border border-[#EDE7DD] dark:border-white/10 shadow-sm hover:shadow-md hover:border-amber-500/40 dark:hover:border-amber-400/40 transition-all group"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: ci * 0.06 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 dark:border-amber-400/20 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                      <Icon size={18} />
                    </div>
                    <h3 className="font-bold text-base text-[#1C1A18] dark:text-white font-sans">{category}</h3>
                  </div>
                  <span className="text-[10px] font-mono text-[#8C877D] dark:text-[#88837A] uppercase">
                    {items.length} items
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill.id || skill.name}
                      className="px-3 py-1.5 rounded-lg bg-[#FAF7F2] dark:bg-white/5 text-[#2C2926] dark:text-[#E8E2D6] border border-[#EDE7DD] dark:border-white/10 text-xs font-medium hover:border-amber-500/30 transition-colors"
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
