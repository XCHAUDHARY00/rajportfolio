import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code,
  Server,
  Layout,
  Cloud,
  Sparkles,
  Wrench,
  Database,
  Smartphone,
  CheckCircle2,
  Search,
  X,
  ArrowLeft,
} from 'lucide-react';

const CATEGORY_META = {
  All: { label: 'All Disciplines', icon: Sparkles },
  Backend: { label: 'Backend & APIs', icon: Server },
  Mobile: { label: 'iOS & Mobile', icon: Smartphone },
  Programming: { label: 'Languages', icon: Code },
  Frontend: { label: 'Web & Frontend', icon: Layout },
  DevOps: { label: 'Cloud & DevOps', icon: Cloud },
  Databases: { label: 'Databases & Cache', icon: Database },
  Tools: { label: 'Tools & Systems', icon: Wrench },
};

const DEFAULT_SKILLS = [
  // Backend & APIs
  { name: 'Python', category: 'Backend', level: 'Expert', desc: 'Core language for async APIs, automation & data systems' },
  { name: 'Django 5', category: 'Backend', level: 'Expert', desc: 'Enterprise full-stack framework & ORM architecture' },
  { name: 'Django REST Framework (DRF)', category: 'Backend', level: 'Expert', desc: 'High-throughput REST API design, serializers & auth' },
  { name: 'FastAPI', category: 'Backend', level: 'Advanced', desc: 'Modern async high-performance microservices' },
  { name: 'RESTful Architecture', category: 'Backend', level: 'Expert', desc: 'Clean decoupled microservices & contracts' },
  { name: 'JWT & HMAC Authentication', category: 'Backend', level: 'Advanced', desc: 'Secure stateless token authentication' },
  
  // iOS & Mobile
  { name: 'iOS Development', category: 'Mobile', level: 'Proficient', desc: 'Native Apple platform engineering & HIG' },
  { name: 'Swift', category: 'Mobile', level: 'Proficient', desc: 'Modern type-safe iOS programming' },
  { name: 'Mobile API Integration', category: 'Mobile', level: 'Advanced', desc: 'Optimized network payloads & offline sync' },

  // Programming Languages
  { name: 'Python 3.12+', category: 'Programming', level: 'Expert', desc: 'Object-oriented & functional paradigms' },
  { name: 'JavaScript (ES6+)', category: 'Programming', level: 'Advanced', desc: 'Asynchronous event-driven development' },
  { name: 'SQL (PostgreSQL)', category: 'Programming', level: 'Advanced', desc: 'Complex relational schemas & query optimization' },
  { name: 'C / C++', category: 'Programming', level: 'Intermediate', desc: 'Foundational memory management & DSA' },

  // Web & Frontend
  { name: 'React.js 18', category: 'Frontend', level: 'Advanced', desc: 'Modern component-driven UI architectures' },
  { name: 'Tailwind CSS', category: 'Frontend', level: 'Expert', desc: 'Utility-first responsive modern design systems' },
  { name: 'Framer Motion', category: 'Frontend', level: 'Advanced', desc: 'Physics-based 3D animations & micro-interactions' },
  { name: 'Vite', category: 'Frontend', level: 'Advanced', desc: 'Next-gen lightning fast frontend tooling' },

  // Databases & Cache
  { name: 'PostgreSQL', category: 'Databases', level: 'Expert', desc: 'ACID transactions, indexing & performance tuning' },
  { name: 'Amazon DynamoDB', category: 'Databases', level: 'Advanced', desc: 'Single-digit millisecond NoSQL database scale' },
  { name: 'Redis', category: 'Databases', level: 'Advanced', desc: 'In-memory caching layer & session store' },

  // Cloud & DevOps
  { name: 'AWS (S3, DynamoDB, SES)', category: 'DevOps', level: 'Advanced', desc: 'Cloud infrastructure & serverless services' },
  { name: 'Docker', category: 'DevOps', level: 'Advanced', desc: 'Multi-stage containerization & microservices' },
  { name: 'CI / CD Pipelines', category: 'DevOps', level: 'Advanced', desc: 'Automated GitHub Actions test & deploy workflows' },
  { name: 'Vercel / Render', category: 'DevOps', level: 'Advanced', desc: 'Zero-downtime production deployments' },

  // AI & Tools
  { name: 'Google Gemini AI API', category: 'Tools', level: 'Advanced', desc: 'Multimodal LLM pipelines & prompt engineering' },
  { name: 'Git & GitHub', category: 'Tools', level: 'Expert', desc: 'Branching, PRs, version control & team workflows' },
  { name: 'Postman / Bruno', category: 'Tools', level: 'Advanced', desc: 'Rigorous API testing & collection documentation' },
];

export default function SkillsModal({ isOpen, onClose, skills = [] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  // Merge backend skills with rich metadata if available
  const skillList = skills && skills.length > 0 ? skills.map((s) => {
    const match = DEFAULT_SKILLS.find((d) => d.name.toLowerCase() === s.name.toLowerCase());
    return {
      name: s.name,
      category: s.category || match?.category || 'Backend',
      level: match?.level || 'Proficient',
      desc: match?.desc || `${s.name} used in production systems & APIs.`,
    };
  }) : DEFAULT_SKILLS;

  const categories = ['All', 'Backend', 'Mobile', 'Programming', 'Frontend', 'Databases', 'DevOps', 'Tools'];

  const filtered = skillList.filter((s) => {
    const matchesCat = activeCategory === 'All' || s.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (s.desc && s.desc.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#EFECE6] dark:bg-[#121212] text-[#1C1A18] dark:text-[#FAF7F2] transition-colors selection:bg-[#DDA74F] selection:text-[#121212]">
      {/* Background ambient glow */}
      <div className="absolute top-0 -left-20 w-[450px] h-[450px] bg-[#C6E6BF]/40 dark:bg-emerald-950/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 -right-20 w-[500px] h-[500px] bg-[#D7CCEB]/40 dark:bg-purple-950/20 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-20 sm:py-24 relative z-10 min-h-screen flex flex-col justify-between">
        {/* Header */}
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-black/[0.08] dark:border-white/[0.08] mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-1.5">
                <Sparkles size={13} />
                <span>TECHNICAL ARSENAL &amp; ARCHITECTURES</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1A18] dark:text-white font-sans">
                Skills &amp; Technologies
              </h1>
              <p className="text-xs sm:text-sm font-sans text-[#736D64] dark:text-[#9A9388] mt-1 max-w-xl leading-relaxed">
                Full-spectrum technical proficiencies across high-performance Backend APIs, native iOS, modern Web frontends, and cloud infrastructure.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C877D]" />
              <input
                type="text"
                placeholder="Search skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full pl-9 pr-4 py-2 text-xs font-sans text-[#1C1A18] dark:text-white placeholder-[#8C877D] outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
            {categories.map((cat) => {
              const Icon = CATEGORY_META[cat]?.icon || Wrench;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#1C1A18] dark:bg-white text-white dark:text-[#121212] shadow-sm'
                      : 'bg-white/50 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[#736D64] dark:text-[#9A9388] hover:text-[#1C1A18] dark:hover:text-white'
                  }`}
                >
                  <Icon size={12} />
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>

          {/* Skills Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 pb-16">
            <AnimatePresence>
              {filtered.map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: idx * 0.02 }}
                  className="rounded-2xl p-5 bg-[#FCFAF5] dark:bg-[#1A1A1E] border border-black/[0.08] dark:border-white/[0.08] hover:border-amber-500/40 transition-all shadow-xs group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <h3 className="font-sans font-bold text-base text-[#1C1A18] dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {skill.name}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 font-semibold whitespace-nowrap">
                        {skill.level}
                      </span>
                    </div>
                    <p className="text-xs font-sans text-[#5E5A53] dark:text-[#9A9388] leading-relaxed">
                      {skill.desc}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-[#8C877D]">
                    <span className="uppercase">{skill.category}</span>
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <CheckCircle2 size={11} /> Verified
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Floating Back Button */}
        <div className="fixed bottom-6 left-6 z-40">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all bg-[#1C1A18] hover:bg-black dark:bg-[#FAF7F2] dark:hover:bg-white text-white dark:text-[#121212] border border-white/20 dark:border-black/20 shadow-2xl flex items-center gap-2 group backdrop-blur-md"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to portfolio</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
