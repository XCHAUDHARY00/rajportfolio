import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ArrowUp, Github, Linkedin, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import { sendContact } from '../api/portfolio';

export default function ContactSection({ profile }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [analyticsDismissed, setAnalyticsDismissed] = useState(() => {
    try {
      return localStorage.getItem('analytics_consented') !== null;
    } catch {
      return false;
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      await sendContact(form);
      toast.success('Message sent successfully! I will reply shortly.');
      setForm({ name: '', email: '', message: '' });
    } catch {
      toast.error('Failed to send message. Please email me directly.');
    } finally {
      setLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConsent = (allow) => {
    try {
      localStorage.setItem('analytics_consented', allow ? 'true' : 'false');
    } catch {}
    setAnalyticsDismissed(true);
  };

  return (
    <footer id="contact" className="relative pt-20 pb-16 px-4 sm:px-8 bg-[#EFECE6] dark:bg-[#121212] transition-colors">
      <div className="max-w-5xl mx-auto w-full">
        {/* ── Large Pill Card (Adaptive Light / Deep Charcoal Dark) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[2.5rem] bg-[#FAF7F2] dark:bg-[#18181B] text-[#1C1A18] dark:text-white p-8 sm:p-14 border border-black/10 dark:border-white/10 shadow-2xl relative overflow-hidden mb-16 transition-colors"
        >
          {/* Subtle glow circle */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/15 dark:bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 6 cols: Pitch & Direct Contact */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/25 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available for new work</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1A18] dark:text-white font-sans leading-tight">
                Need something built?
                <br />
                <span className="text-amber-600 dark:text-amber-400 font-light">Let&apos;s make it happen.</span>
              </h2>

              <p className="text-sm font-sans text-[#5E5A53] dark:text-white/70 mt-4 max-w-md leading-relaxed">
                Whether you need a high-throughput backend, API integration, cloud migration, or full-stack application &mdash; my inbox is open.
              </p>

              {/* Direct Details */}
              <div className="space-y-3 mt-8 text-xs font-mono text-[#403B35] dark:text-white/80">
                <a
                  href={`mailto:${profile?.email || 'dhariwalraj37@gmail.com'}`}
                  className="flex items-center gap-2.5 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  <Mail size={14} className="text-amber-600 dark:text-amber-400" />
                  <span>{profile?.email || 'dhariwalraj37@gmail.com'}</span>
                </a>

                <a
                  href={`tel:${profile?.phone || '7300706640'}`}
                  className="flex items-center gap-2.5 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  <Phone size={14} className="text-amber-600 dark:text-amber-400" />
                  <span>+91 {profile?.phone || '7300706640'}</span>
                </a>

                <div className="flex items-center gap-2.5 text-[#736D64] dark:text-white/60">
                  <MapPin size={14} className="text-amber-600 dark:text-amber-400" />
                  <span>{profile?.location || 'Ghaziabad, UP, India'}</span>
                </div>
              </div>
            </div>

            {/* Right 6 cols: Message Form */}
            <div className="lg:col-span-6">
              <form onSubmit={handleSubmit} className="space-y-3.5 bg-white/70 dark:bg-white/5 p-6 rounded-2xl border border-black/10 dark:border-white/10 backdrop-blur-sm shadow-sm">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full bg-[#FAF7F2] dark:bg-black/40 border border-black/15 dark:border-white/15 rounded-xl px-4 py-3 text-xs text-[#1C1A18] dark:text-white placeholder-[#8C877D] dark:placeholder-white/40 outline-none focus:border-amber-500 transition-colors font-sans"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full bg-[#FAF7F2] dark:bg-black/40 border border-black/15 dark:border-white/15 rounded-xl px-4 py-3 text-xs text-[#1C1A18] dark:text-white placeholder-[#8C877D] dark:placeholder-white/40 outline-none focus:border-amber-500 transition-colors font-sans"
                  />
                </div>

                <div>
                  <textarea
                    rows={3}
                    placeholder="Project details or message..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    className="w-full bg-[#FAF7F2] dark:bg-black/40 border border-black/15 dark:border-white/15 rounded-xl px-4 py-3 text-xs text-[#1C1A18] dark:text-white placeholder-[#8C877D] dark:placeholder-white/40 outline-none focus:border-amber-500 transition-colors resize-none font-sans"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1C1A18] hover:bg-black text-white dark:bg-amber-400 dark:hover:bg-amber-300 dark:text-[#18181B] py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span>{loading ? 'Sending...' : 'Send Message'}</span>
                  <Send size={13} />
                </button>
              </form>
            </div>
          </div>
        </motion.div>

        {/* ── Sub Footer Bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#736D64] dark:text-[#88837A] pt-4 border-t border-black/[0.08] dark:border-white/[0.08]">
          <p>© {new Date().getFullYear()} Raj Chaudhary. Built with 3D physics &amp; intent.</p>

          <div className="flex items-center gap-6">
            {profile?.github && (
              <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-[#1C1A18] dark:hover:text-white transition-colors">
                GitHub
              </a>
            )}
            {profile?.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#1C1A18] dark:hover:text-white transition-colors">
                LinkedIn
              </a>
            )}
            {profile?.leetcode && (
              <a href={profile.leetcode} target="_blank" rel="noreferrer" className="hover:text-[#1C1A18] dark:hover:text-white transition-colors">
                LeetCode
              </a>
            )}
            <a href="/admin" className="flex items-center gap-1 hover:text-[#1C1A18] dark:hover:text-white transition-colors">
              <Shield size={11} />
              <span>Admin</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── Floating Back to Top Button (Matching all 5 Screenshots) ── */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          title="Back to top"
          className="w-12 h-12 rounded-full bg-[#1C1A18] hover:bg-black dark:bg-[#FAF7F2] dark:hover:bg-white text-white dark:text-[#121212] border border-white/20 dark:border-black/20 shadow-2xl flex items-center justify-center group backdrop-blur-md"
        >
          <ArrowUp size={18} className="group-hover:-translate-y-0.5 transition-transform" />
        </motion.button>
      </div>

      {/* ── Cookie / Analytics Pill Banner (Matching Screenshots) ── */}
      <AnimatePresence>
        {!analyticsDismissed && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-4 py-2.5 rounded-full bg-[#1C1A18]/95 text-white border border-white/15 shadow-2xl backdrop-blur-md flex items-center gap-3 sm:gap-4 text-xs font-sans max-w-[95vw]"
          >
            <span className="text-[11px] text-white/80 hidden sm:inline">
              May I count your visit with Google Analytics? It sets cookies.
            </span>
            <span className="text-[11px] text-white/80 sm:hidden">
              Allow analytics cookies?
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleConsent(false)}
                className="px-3 py-1 rounded-full text-[11px] font-medium text-white/70 hover:text-white transition-colors"
              >
                No thanks
              </button>
              <button
                onClick={() => handleConsent(true)}
                className="px-3.5 py-1 rounded-full bg-white text-[#1C1A18] text-[11px] font-semibold hover:bg-slate-200 transition-colors"
              >
                Allow
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}

