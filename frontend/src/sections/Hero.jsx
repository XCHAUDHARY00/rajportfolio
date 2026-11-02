import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowDown } from 'lucide-react';

export default function Hero({ profile }) {
  const [imgError, setImgError] = useState(false);
  const handleScroll = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const photoUrl = profile?.photo_url || profile?.profile_photo_url || null;

  const defaultHeadline = `I build\nthoughtful backend\nsystems, from\nREST APIs to\ncloud scale.`;
  const defaultSubtext = `Passionate about high-throughput Python backends, distributed systems, and production cloud infrastructure. Third-year CSIT at AKGEC (CGPA ${profile?.cgpa ? profile.cgpa.toFixed(2) : '7.86'}).`;

  return (
    <section className="relative bg-[#FAF7F2] text-[#1C1A18] pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column — 7 cols */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Top Tag Row: Role • Status Pill */}
            <div className="flex flex-wrap items-center gap-2.5 mb-7">
              <span className="text-[#8C877D] text-[11px] font-semibold tracking-[0.16em] uppercase">
                {profile?.hero_role || 'BACKEND DEVELOPER •'}
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF3EB] text-[#2A5E3A] border border-[#D1E6D6] text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                <span>{profile?.hero_status || 'Open to SDE & Backend roles'}</span>
              </span>
            </div>

            {/* Massive Editorial Headline */}
            <h1 className="text-[44px] sm:text-[60px] lg:text-[72px] font-normal tracking-[-0.035em] text-[#1C1A18] leading-[1.06] mb-8 whitespace-pre-line">
              {profile?.hero_headline || defaultHeadline}
            </h1>

            {/* Subtext One-Liner */}
            <p className="text-[#5E5A53] text-base sm:text-lg font-light leading-relaxed max-w-xl mb-9">
              {profile?.hero_subtext || defaultSubtext}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleScroll('#projects')}
                className="bg-[#1C1A18] hover:bg-black text-[#FAF7F2] px-6 py-3 rounded-full text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-95 inline-flex items-center gap-1.5"
              >
                <span>View Projects</span>
                <ChevronRight size={14} />
              </button>

              <button
                onClick={() => handleScroll('#contact')}
                className="bg-[#EFEAE2] hover:bg-[#E5DFD3] text-[#2C2926] border border-[#E2DBD0] px-6 py-3 rounded-full text-xs font-semibold tracking-wide transition-all active:scale-95"
              >
                Get in Touch
              </button>
            </div>
          </motion.div>

          {/* Right Column — 5 cols: Tall Portrait Frame */}
          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          >
            <div className="w-full max-w-[340px] sm:max-w-[370px]">
              {/* Outer Warm Sand Frame */}
              <div className="rounded-[2.5rem] border-[10px] border-[#F2ECE3] bg-[#EFE9DF] overflow-hidden shadow-sm aspect-[3.2/4] relative">
                {photoUrl && !imgError ? (
                  <img
                    src={photoUrl}
                    alt={profile?.name || 'Raj Chaudhary'}
                    className="w-full h-full object-cover object-top"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#F4EFE7]">
                    <div className="w-24 h-24 rounded-full bg-[#EAE2D5] border border-[#DDD3C2] flex items-center justify-center mb-4 text-[#2C2926] font-serif text-3xl font-bold">
                      RC
                    </div>
                    <p className="font-medium text-lg text-[#1C1A18]">{profile?.name || 'Raj Chaudhary'}</p>
                    <p className="text-xs text-[#8C877D] mt-1">{profile?.title || 'Backend Developer • Python • Cloud'}</p>
                    <span className="mt-4 px-3 py-1 rounded-full bg-[#E5DDD0] text-[#5E5A53] text-[11px] font-medium">
                      Upload DP in Admin CMS
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Subtle Scroll Hint */}
        <div className="flex justify-center mt-20 sm:mt-24">
          <button
            onClick={() => handleScroll('#about')}
            className="flex flex-col items-center gap-1 text-[#8C877D] hover:text-[#1C1A18] transition-colors"
            aria-label="Scroll to about"
          >
            <span className="text-[10px] uppercase font-semibold tracking-widest">Scroll</span>
            <ArrowDown size={14} className="animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
