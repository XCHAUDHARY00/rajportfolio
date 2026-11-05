import { motion } from 'framer-motion';
import { ChevronRight, ArrowDown, Sparkles } from 'lucide-react';
import SpiralNotebook from '../components/SpiralNotebook';

const HERO_ROLES = [
  'Backend Developer',
  'Web Developer',
  'Full Stack Developer',
  'iOS Developer',
  'UI/UX Designer',
];

export default function Hero({ profile, onOpenAbilityCard }) {
  const photoUrl = profile?.photo_url || profile?.profile_photo_url;

  const rolesList = (profile?.hero_roles_list || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const activeRoles = rolesList.length > 0 ? rolesList : HERO_ROLES;

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const defaultSubtext =
    profile?.hero_subtext ||
    `Passionate about high-throughput Python backends, distributed systems, and production cloud infrastructure. Third-year CSIT at AKGEC (CGPA ${profile?.cgpa ? profile.cgpa.toFixed(2) : '7.86'
    }).`;

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex flex-col justify-between pt-24 sm:pt-36 pb-8 px-4 sm:px-12 overflow-hidden transition-colors bg-[#EFECE6] dark:bg-[#121212]"
    >
      {/* ── Main Content Grid ── */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center flex-1 my-auto">
        {/* Left Column (7 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start z-10"
        >
          {/* ── Clean Minimal Top Role Tag (No clutter / No duplicate status pills) ── */}
          <div className="mb-4 sm:mb-5">
            <span className="text-[#736D64] dark:text-[#A8A196] text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] uppercase">
              &bull; {profile?.hero_role || 'BACKEND DEVELOPER'}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[66px] font-normal tracking-[-0.03em] leading-[1.12] text-[#1C1A18] dark:text-[#FAF7F2] font-sans mb-3">
            Hi, I&apos;m{' '}
            <span className="font-semibold text-[#1C1A18] dark:text-white">
              {profile?.name || 'Raj Chaudhary'}.
            </span>
            <br />
            <span className="text-[#696359] dark:text-[#9A9388] font-light">I am a</span>
          </h1>

          {/* ── 3D Spiral-Ring Notebook Widget with Previous Roles ── */}
          <div className="my-3 sm:my-4 w-full">
            <SpiralNotebook profile={profile} roles={activeRoles} />
          </div>

          {/* Subtext One-Liner from Previous Version */}
          <p className="text-[#5E5A53] dark:text-[#A8A196] text-xs sm:text-base font-light leading-relaxed max-w-xl mt-1 mb-6">
            {defaultSubtext}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <button
              onClick={() => scrollTo('#contact')}
              className="bg-[#1C1A18] hover:bg-black dark:bg-[#FAF7F2] dark:hover:bg-white text-[#FAF7F2] dark:text-[#121212] px-6 sm:px-7 py-3 rounded-full text-xs font-semibold tracking-wide transition-all shadow-md active:scale-95 inline-flex items-center gap-2 group"
            >
              <span>Hire me</span>
              <ChevronRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>

            <button
              onClick={() => scrollTo('#doors')}
              className="px-6 sm:px-7 py-3 rounded-full text-xs font-semibold tracking-wide transition-all border border-[#CCC4B4] dark:border-[#3D3D42] bg-white/60 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 text-[#2C2926] dark:text-[#FAF7F2] active:scale-95 shadow-xs"
            >
              See my work
            </button>
          </div>
        </motion.div>

        {/* Right Column (5 cols): Colorful Oval Portrait with Floating Ability Card Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center relative mt-6 lg:mt-0"
        >
          <div className="relative w-full max-w-[290px] sm:max-w-[350px] aspect-[3/4] flex items-center justify-center">
            {/* Outer Oval Ambient Shadow & Subtle Bevel Ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/80 via-white/30 to-transparent dark:from-white/10 dark:via-white/5 dark:to-transparent p-[3px] shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] pointer-events-none z-10" />

            {/* Inner Colorful Oval Portrait - Clickable to open Creative Feature */}
            <div
              onClick={onOpenAbilityCard}
              className="relative w-full h-full overflow-hidden rounded-full border-[5px] sm:border-[6px] border-[#FCFAF6] dark:border-[#222226] bg-[#E8E2D5] dark:bg-[#1E1E22] shadow-inner flex items-center justify-center cursor-pointer group"
              title="Click photo to unlock 3D Holographic Ability Card"
            >
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt={profile?.name || 'Raj Chaudhary'}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                  decoding="async"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-t from-[#D6CFBF] to-[#E8E2D5] dark:from-[#1E1E22] dark:to-[#2B2B30] flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-24 h-24 rounded-full bg-white/40 dark:bg-white/10 flex items-center justify-center mb-4 text-[#1C1A18] dark:text-white font-serif text-3xl font-bold shadow-inner">
                    RC
                  </div>
                  <p className="font-semibold text-base text-[#1C1A18] dark:text-white">
                    {profile?.name || 'Raj Chaudhary'}
                  </p>
                  <p className="text-xs text-[#736D64] dark:text-[#9A9388] mt-1">
                    Full Stack &amp; iOS Engineer
                  </p>
                </div>
              )}
            </div>

            {/* Floating Pill: Official Hackathon Creative Feature with Visible Hint */}
            <motion.button
              onClick={onOpenAbilityCard}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="absolute -bottom-4 sm:-bottom-5 z-20 px-5 py-2.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wider uppercase transition-all bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white shadow-[0_10px_28px_rgba(245,158,11,0.4)] border border-amber-300/40 backdrop-blur-md flex items-center gap-2 group cursor-pointer"
              title="Interactive Creative Feature: Tap to reveal 3D Holographic Ability Card"
            >
              <Sparkles size={13} className="text-amber-200 animate-spin" />
              <span>✨ Unlock Ability Card</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* ── Bottom Bar: SCROLL TO EXPLORE ── */}
      <div className="max-w-6xl mx-auto w-full pt-6 flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-[#736D64] dark:text-[#88837A] border-t border-black/[0.06] dark:border-white/[0.06]">
        <span>Akgec csit &bull; backend</span>

        <button
          onClick={() => scrollTo('#doors')}
          className="flex items-center gap-1.5 hover:text-[#1C1A18] dark:hover:text-white transition-colors group cursor-pointer"
        >
          <span>Scroll to explore</span>
          <ArrowDown
            size={12}
            className="group-hover:translate-y-0.5 transition-transform"
          />
        </button>
      </div>
    </section>
  );
}
