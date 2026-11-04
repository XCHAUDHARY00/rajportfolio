import { useState } from 'react';
import { Menu, Award, Sparkles, ArrowLeft } from 'lucide-react';
import LiveClock from './LiveClock';
import PullCord from './PullCord';
import MenuDrawer from './MenuDrawer';

export default function Header({
  profile,
  onSelectDoorCategory,
  onOpenCertificates,
  onOpenSkills,
  isInsideDoorCategory = false,
  onBackToDoors = null,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRouteSelect = (route) => {
    if (route.action === 'certificates' && onOpenCertificates) {
      onOpenCertificates();
    } else if (route.action === 'skills' && onOpenSkills) {
      onOpenSkills();
    } else if (route.category && onSelectDoorCategory) {
      onSelectDoorCategory(route.category);
    } else if (route.href) {
      scrollTo(route.href);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-8 py-3 flex items-center justify-between transition-colors backdrop-blur-md bg-[#EFECE6]/85 dark:bg-[#121212]/85 border-b border-black/[0.06] dark:border-white/[0.08]">
        {/* Left: When inside door category, show clean "← Back to the doors" pill; otherwise Menu pill + Monogram [RC] */}
        {isInsideDoorCategory ? (
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToDoors}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border border-black/10 dark:border-white/15 bg-white/80 dark:bg-white/5 hover:bg-white text-[#1C1A18] dark:text-[#FAF7F2] shadow-xs active:scale-95"
            >
              <ArrowLeft size={13} />
              <span>Back to the doors</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border border-black/10 dark:border-white/15 bg-white/80 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 text-[#1C1A18] dark:text-[#FAF7F2] shadow-xs active:scale-95"
            >
              <Menu size={13} />
              <span>Menu</span>
            </button>

            {/* Monogram Badge & Title */}
            <a
              href="/"
              className="flex items-center gap-1.5 sm:gap-2 group transition-opacity hover:opacity-80"
            >
              <span className="bg-[#EFEAE2] dark:bg-white/10 group-hover:bg-[#E5DFD3] dark:group-hover:bg-white/15 text-[#2C2926] dark:text-[#FAF7F2] text-xs font-bold px-2 py-0.5 rounded-md border border-[#DDD4C7] dark:border-white/15 transition-colors font-serif shadow-xs">
                RC
              </span>
              <span className="font-semibold text-xs sm:text-sm text-[#1C1A18] dark:text-white tracking-tight hidden sm:inline">
                {profile?.name || 'Raj Chaudhary'}
              </span>
            </a>
          </div>
        )}

        {/* Center: Desktop Nav Links (Hidden if inside door category to prevent clutter) */}
        {!isInsideDoorCategory && (
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-[#5E5A53] dark:text-[#A8A196]">
            <button
              onClick={() => scrollTo('#hero')}
              className="hover:text-[#1C1A18] dark:hover:text-white transition-colors"
            >
              Home
            </button>

            <button
              onClick={onOpenCertificates}
              className="hover:text-[#1C1A18] dark:hover:text-white transition-colors flex items-center gap-1.5 font-semibold text-[#1C1A18] dark:text-amber-400/90"
            >
              <Award size={13} className="text-amber-500" />
              <span>Certificates &amp; Achievements</span>
            </button>

            <button
              onClick={onOpenSkills}
              className="hover:text-[#1C1A18] dark:hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Sparkles size={13} className="text-amber-500" />
              <span>Skills</span>
            </button>

            <button
              onClick={() => scrollTo('#doors')}
              className="hover:text-[#1C1A18] dark:hover:text-white transition-colors"
            >
              Projects
            </button>

            <button
              onClick={() => scrollTo('#story')}
              className="hover:text-[#1C1A18] dark:hover:text-white transition-colors"
            >
              My story
            </button>

            <button
              onClick={() => scrollTo('#contact')}
              className="hover:text-[#1C1A18] dark:hover:text-white transition-colors"
            >
              Contact
            </button>
          </nav>
        )}

        {/* Right: Menu Pill (when in door view) + Live Clock + Margin for hanging pull cord */}
        <div className="flex items-center gap-2 sm:gap-4 pr-14 sm:pr-20">
          {isInsideDoorCategory && (
            <button
              onClick={() => setDrawerOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border border-black/10 dark:border-white/15 bg-white/80 dark:bg-white/5 hover:bg-white text-[#1C1A18] dark:text-[#FAF7F2] shadow-xs active:scale-95"
            >
              <Menu size={13} />
              <span>Menu</span>
            </button>
          )}

          <LiveClock />
        </div>
      </header>

      {/* Hanging Pull-Cord Bell Switch mounted at top right */}
      <PullCord />

      {/* Fullscreen Drawer */}
      <MenuDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSelectRoute={handleRouteSelect}
        onOpenCertificates={onOpenCertificates}
        onOpenSkills={onOpenSkills}
        profile={profile}
      />
    </>
  );
}
