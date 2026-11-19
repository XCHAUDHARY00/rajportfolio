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

        {/* Right Column (5 cols): Ultra-Aesthetic Modern Studio Portrait Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center relative mt-6 lg:mt-0"
        >
          {/* Ambient Warm Studio Glow Behind Portrait */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500/20 via-orange-500/10 to-transparent dark:from-amber-500/15 dark:via-purple-500/10 dark:to-transparent rounded-[3.5rem] blur-2xl pointer-events-none" />

          {/* Luxury Studio Portrait Frame */}
          <div className="relative w-full max-w-[290px] xs:max-w-[320px] sm:max-w-[360px] aspect-[3/4] p-2.5 sm:p-3 rounded-[2.6rem] sm:rounded-[3.2rem] bg-gradient-to-b from-white/90 via-white/50 to-white/20 dark:from-white/15 dark:via-white/5 dark:to-transparent backdrop-blur-2xl border border-white/70 dark:border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18),0_10px_30px_-5px_rgba(217,119,6,0.12)] dark:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8),0_0_50px_rgba(245,158,11,0.15)] group select-none">
            
            {/* Inner High-Resolution Photo Container */}
            <div className="relative w-full h-full rounded-[2.1rem] sm:rounded-[2.7rem] overflow-hidden bg-[#141418] shadow-inner">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt={profile?.name || 'Raj Chaudhary'}
                  className="w-full h-full object-cover object-top filter contrast-[1.12] saturate-[1.18] brightness-[0.97] transition-transform duration-700 ease-out group-hover:scale-105"
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

              {/* Floating Status Badge at Top Left */}
              <div className="absolute top-3.5 left-3.5 z-20 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold tracking-wider uppercase text-white flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{profile?.hero_status || 'OPEN TO SDE ROLES'}</span>
              </div>

              {/* Bottom Cinematic Gradient Vignette & Nameplate */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-black/85 via-black/45 to-transparent flex flex-col justify-end text-left pointer-events-none">
                <p className="text-white text-base sm:text-lg font-bold font-sans tracking-tight drop-shadow-sm">
                  {profile?.name || 'Raj Chaudhary'}
                </p>
                <p className="text-white/80 text-[10px] sm:text-[11px] font-mono tracking-wider uppercase">
                  Full Stack Cloud &bull; iOS Developer
                </p>
              </div>

              {/* Diagonal Glass Sheen Reflection */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.05) 45%, transparent 60%)',
                }}
              />
            </div>
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
