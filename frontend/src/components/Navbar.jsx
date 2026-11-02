import { useState, useEffect } from 'react';
import { Menu, X, ArrowDown } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ profile }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const resumeUrl = profile?.resume_url || null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#EDE7DD] py-3.5 shadow-sm'
          : 'bg-[#FAF7F2] py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Left: Monogram Badge + Name */}
        <a href="/" className="flex items-center gap-2.5 group">
          <span className="bg-[#EFEAE2] group-hover:bg-[#E5DFD3] text-[#2C2926] text-xs font-bold px-2 py-1 rounded-md border border-[#E3DBD0] transition-colors">
            RC
          </span>
          <span className="font-medium text-[15px] text-[#2C2926] tracking-tight">
            Raj Chaudhary
          </span>
        </a>

        {/* Center: Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="text-[14px] text-[#5E5A53] hover:text-[#1C1A18] font-normal transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Resume Pill Button */}
        <div className="hidden md:flex items-center gap-3">
          {resumeUrl ? (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-[#EFEAE2] hover:bg-[#E5DFD3] text-[#2C2926] px-4 py-1.5 rounded-full text-xs font-medium border border-[#E2DBD0] inline-flex items-center gap-1.5 transition-colors active:scale-95 shadow-none"
            >
              <ArrowDown size={13} className="text-[#5E5A53]" />
              <span>Resume</span>
            </a>
          ) : (
            <a
              href="#contact"
              onClick={(e) => handleNav(e, '#contact')}
              className="bg-[#EFEAE2] hover:bg-[#E5DFD3] text-[#2C2926] px-4 py-1.5 rounded-full text-xs font-medium border border-[#E2DBD0] inline-flex items-center gap-1.5 transition-colors active:scale-95"
            >
              <ArrowDown size={13} className="text-[#5E5A53]" />
              <span>Resume</span>
            </a>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-[#EFEAE2] text-[#2C2926] px-3 py-1 rounded-full text-xs font-medium border border-[#E2DBD0] inline-flex items-center gap-1"
            >
              <ArrowDown size={11} />
              <span>Resume</span>
            </a>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="p-1.5 text-[#2C2926] hover:opacity-70"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#EDE7DD] px-6 py-4 flex flex-col gap-3 shadow-md animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="text-sm text-[#5E5A53] hover:text-[#1C1A18] font-medium py-1.5"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/admin/login"
            className="text-xs text-[#8C877D] hover:text-[#1C1A18] font-medium pt-2 border-t border-[#EDE7DD]"
          >
            Admin CMS Login →
          </a>
        </div>
      )}
    </header>
  );
}
