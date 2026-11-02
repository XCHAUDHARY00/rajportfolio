import { ArrowUp, Terminal } from 'lucide-react';

export default function Footer() {
  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAF7F2] text-[#1C1A18] border-t border-[#EDE7DD]">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Monogram Badge + Name */}
        <div className="flex items-center gap-2.5">
          <span className="bg-[#EFEAE2] text-[#2C2926] text-xs font-bold px-2 py-1 rounded-md border border-[#E3DBD0]">
            RC
          </span>
          <span className="text-xs text-[#8C877D]">&middot;</span>
          <span className="text-xs text-[#5E5A53] font-medium">Raj Chaudhary &mdash; Backend Developer</span>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => handleNav(e, l.href)}
              className="text-[#5E5A53] text-xs font-medium hover:text-[#1C1A18] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/admin/login"
            className="text-[#8C877D] text-xs hover:text-[#1C1A18] transition-colors flex items-center gap-1 font-medium"
          >
            <Terminal size={11} /> Admin CMS
          </a>
        </div>

        {/* Back to Top */}
        <div className="flex items-center gap-3">
          <p className="text-[#8C877D] text-xs">
            &copy; {new Date().getFullYear()} Raj Chaudhary
          </p>
          <button
            onClick={scrollToTop}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#EFEAE2] border border-[#EDE7DD] flex items-center justify-center text-[#1C1A18] transition shadow-sm"
            aria-label="Back to top"
          >
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}
