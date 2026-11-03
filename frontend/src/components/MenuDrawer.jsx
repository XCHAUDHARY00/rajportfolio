import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Shield } from 'lucide-react';
import LiveClock from './LiveClock';

const ROUTES = [
  { num: '01', label: 'Home', href: '#hero' },
  { num: '02', label: 'Backend & APIs', href: '#doors', category: 'backend' },
  { num: '03', label: 'Distributed Systems', href: '#doors', category: 'systems' },
  { num: '04', label: 'Cloud & DevOps', href: '#doors', category: 'cloud' },
  { num: '05', label: 'Full-Stack & AI', href: '#doors', category: 'fullstack' },
  { num: '06', label: 'My Story (Timeline)', href: '#story' },
  { num: '07', label: 'Contact & Hire', href: '#contact' },
];

export default function MenuDrawer({ isOpen, onClose, onSelectRoute, profile }) {
  const handleNav = (route) => {
    onClose();
    if (onSelectRoute) {
      onSelectRoute(route);
    } else if (route.href) {
      const el = document.querySelector(route.href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: '-100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#121212] text-[#EFECE6] flex flex-col justify-between p-6 sm:p-12 overflow-y-auto"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs text-amber-400 border border-white/15">
                RC
              </span>
              <span className="text-xs font-mono tracking-widest uppercase text-white/50">
                Navigation Index
              </span>
            </div>

            <div className="hidden sm:block">
              <LiveClock />
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-white/15 hover:border-white/30 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 hover:bg-white/5 transition-colors"
            >
              <span>Close</span>
              <X size={15} />
            </button>
          </div>

          {/* Center Links */}
          <div className="py-12 max-w-4xl mx-auto w-full">
            <nav className="space-y-3 sm:space-y-4">
              {ROUTES.map((r, i) => (
                <motion.div
                  key={r.num}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                >
                  <button
                    onClick={() => handleNav(r)}
                    className="w-full text-left group flex items-baseline gap-4 sm:gap-8 py-2.5 transition-transform hover:translate-x-2"
                  >
                    <span className="font-mono text-xs sm:text-sm text-amber-400/70 group-hover:text-amber-400">
                      {r.num}
                    </span>
                    <span className="text-3xl sm:text-5xl font-light tracking-tight text-white/80 group-hover:text-white transition-colors">
                      {r.label}
                    </span>
                    <ArrowUpRight
                      size={20}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-amber-400"
                    />
                  </button>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Bottom Info & Social Links */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
            <div className="flex flex-wrap items-center gap-6">
              {profile?.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub
                </a>
              )}
              {profile?.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              )}
              {profile?.leetcode && (
                <a
                  href={profile.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LeetCode
                </a>
              )}
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="hover:text-white transition-colors"
                >
                  {profile.email}
                </a>
              )}
            </div>

            <div className="flex items-center gap-4">
              <a
                href="/admin"
                className="flex items-center gap-1.5 text-amber-400/70 hover:text-amber-400 transition-colors"
              >
                <Shield size={12} />
                <span>Admin CMS</span>
              </a>
              <span className="text-white/30">•</span>
              <span>Raj Chaudhary © {new Date().getFullYear()}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
