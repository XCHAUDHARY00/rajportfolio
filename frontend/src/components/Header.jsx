import { useState } from 'react';
import { Menu } from 'lucide-react';
import LiveClock from './LiveClock';
import PullCord from './PullCord';
import MenuDrawer from './MenuDrawer';

export default function Header({ profile, onSelectDoorCategory }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRouteSelect = (route) => {
    if (route.category && onSelectDoorCategory) {
      onSelectDoorCategory(route.category);
    } else if (route.href) {
      scrollTo(route.href);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between transition-colors backdrop-blur-md bg-[#EFECE6]/80 dark:bg-[#121212]/80 border-b border-black/[0.06] dark:border-white/[0.08]">
        {/* Left: Menu pill */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDrawerOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border border-black/10 dark:border-white/15 bg-white/70 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 text-[#1C1A18] dark:text-[#FAF7F2] shadow-sm active:scale-95"
          >
            <Menu size={14} />
            <span>Menu</span>
          </button>
        </div>

        {/* Center: Desktop Nav Links matching Rishi's top bar */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-[#5E5A53] dark:text-[#A8A196]">
          <button
            onClick={() => scrollTo('#hero')}
            className="hover:text-[#1C1A18] dark:hover:text-white transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => handleRouteSelect({ category: 'backend' })}
            className="hover:text-[#1C1A18] dark:hover:text-white transition-colors"
          >
            Backend &amp; APIs
          </button>
          <button
            onClick={() => handleRouteSelect({ category: 'systems' })}
            className="hover:text-[#1C1A18] dark:hover:text-white transition-colors"
          >
            Distributed Systems
          </button>
          <button
            onClick={() => handleRouteSelect({ category: 'cloud' })}
            className="hover:text-[#1C1A18] dark:hover:text-white transition-colors"
          >
            Cloud &amp; DevOps
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

        {/* Right: Live Clock & Pull-Cord Light Switch */}
        <div className="flex items-center gap-3.5 relative">
          <LiveClock />

          {/* Hanging Pull-Cord Switch Bead */}
          <div className="relative -mr-2">
            <PullCord />
          </div>
        </div>
      </header>

      {/* Fullscreen Drawer */}
      <MenuDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSelectRoute={handleRouteSelect}
        profile={profile}
      />
    </>
  );
}
