import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, Award, ExternalLink, Clock } from 'lucide-react';

export default function StoryTimeline({
  experience = [],
  certifications = [],
  achievements = [],
  profile = {},
}) {
  const [activeYearIndex, setActiveYearIndex] = useState(0);
  const itemRefs = useRef([]);
  const sectionRef = useRef(null);

  // Compile timeline events matching Raj Chaudhary's exact journey
  const timelineEvents = [
    {
      year: '2026',
      period: 'SEP 2026 – PRESENT',
      role: 'Full Stack Developer Intern',
      org: 'Colleen',
      location: 'Remote',
      type: 'Internship',
      icon: Briefcase,
      bullets: [
        'Engineering full-stack features, resilient microservices, and high-performance RESTful APIs.',
        'Building clean, decoupled client architectures with real-time state synchronization.',
        'Working remotely in an agile production engineering team delivering high-impact features.',
      ],
    },
    {
      year: '2025',
      period: 'JUN 2025 – JUL 2025',
      role: 'Frontend Developer Intern',
      org: 'Cognifyz Technologies',
      location: 'Remote',
      type: 'Internship',
      icon: Briefcase,
      bullets: [
        '2-month remote frontend internship mastering React.js, modern JavaScript (ES6+), and Tailwind CSS.',
        'Designed and developed responsive, modular component systems and intuitive UI layouts.',
        'Optimized frontend performance, state management, and cross-browser responsiveness.',
      ],
    },
    {
      year: '2024',
      period: '2024 – 2028 (PRESENT)',
      role: profile.edu_degree || 'B.Tech — Computer Science & IT (CS & IT)',
      org: profile.edu_college || 'Ajay Kumar Garg Engineering College (AKGEC)',
      location: profile.edu_location || 'Ghaziabad, UP',
      type: 'Undergraduate Degree',
      icon: GraduationCap,
      bullets: [
        'Four-year engineering degree in CS & IT branch, mastering Data Structures & Algorithms, Operating Systems, and DBMS.',
        'Specialized in backend architectures (Python, Django, FastAPI), native iOS development, and distributed systems.',
        `Current CGPA: ${profile.cgpa ? profile.cgpa.toFixed(2) : '7.86'}. Active problem solver with 150+ DSA solutions on LeetCode.`,
      ],
    },
    {
      year: '2024',
      period: '2022 – 2024',
      role: 'Class 12th — Senior Secondary (PCM — 89.66%)',
      org: 'LFAIC Inter College',
      location: 'Sambhal, UP',
      type: 'Senior Secondary',
      icon: GraduationCap,
      bullets: [
        'Graduated Class 12th with distinction, scoring 89.66% in Physics, Chemistry, and Mathematics (PCM).',
        'Demonstrated top academic excellence and deep quantitative analytical foundations.',
      ],
    },
    {
      year: '2022',
      period: '2020 – 2022',
      role: 'Class 10th — High School (86.00%)',
      org: 'LFAIC Inter College',
      location: 'Sambhal, UP',
      type: 'High School',
      icon: GraduationCap,
      bullets: [
        'Completed Class 10th board examination with distinction, securing 86.00%.',
        'Built strong foundational mathematics, science, and analytical problem-solving skills.',
      ],
    },
    ...(experience || []).map((exp) => ({
      year: exp.start_date ? exp.start_date.substring(0, 4) : '2025',
      period: `${exp.start_date || '2025'} – ${exp.currently_working ? 'PRESENT' : exp.end_date || '2025'}`,
      role: exp.role || 'Software Engineer',
      org: exp.company || 'Tech Organization',
      location: exp.location || 'Remote',
      type: exp.type || 'Internship',
      icon: Briefcase,
      bullets: exp.responsibilities || (exp.description ? [exp.description] : []),
      logo_url: exp.logo_url,
      letter_url: exp.letter_url,
    })),
  ];

  // Filter unique milestones
  const uniqueEvents = timelineEvents.filter(
    (ev, idx, self) =>
      idx === self.findIndex((t) => t.role === ev.role && t.org === ev.org)
  );

  // ── Automatic scroll-sliding detection ──
  // As the user scrolls up and down the timeline, the year and dates change automatically
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const focusY = window.innerHeight * 0.42;
          let bestIdx = 0;
          let bestDist = Infinity;

          itemRefs.current.forEach((el, idx) => {
            if (!el) return;
            const rect = el.getBoundingClientRect();

            // If item covers the focus horizon, it's directly active
            if (rect.top <= focusY && rect.bottom >= focusY) {
              bestIdx = idx;
              bestDist = -1;
            } else if (bestDist !== -1) {
              // Otherwise compare distance from item's top/center to focus horizon
              const itemCenter = (rect.top + rect.bottom) / 2;
              const dist = Math.abs(itemCenter - focusY);
              if (dist < bestDist) {
                bestDist = dist;
                bestIdx = idx;
              }
            }
          });

          setActiveYearIndex((prev) => (prev !== bestIdx ? bestIdx : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [uniqueEvents.length]);

  const handleEventClick = (idx) => {
    setActiveYearIndex(idx);
    if (itemRefs.current[idx]) {
      const y =
        itemRefs.current[idx].getBoundingClientRect().top +
        window.scrollY -
        window.innerHeight * 0.38;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const currentEvent = uniqueEvents[activeYearIndex] || uniqueEvents[0];
  const stepNumber = String(activeYearIndex + 1).padStart(2, '0');
  const totalSteps = String(uniqueEvents.length).padStart(2, '0');

  // Generate radial graduation ticks for the skeuomorphic compass dial
  const dialTicks = Array.from({ length: 36 });

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative py-24 sm:py-36 px-4 sm:px-8 bg-[#EFECE6] dark:bg-[#161618] text-[#1C1A18] dark:text-[#EFECE6] overflow-hidden transition-colors"
    >
      {/* ── Soft Pastel Gradient Ambient Orbs (Matching Screenshot In Light Mode) ── */}
      <div className="absolute top-0 -left-20 w-[450px] h-[450px] bg-[#C6E6BF]/55 dark:bg-emerald-950/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-20 w-[500px] h-[500px] bg-[#D7CCEB]/50 dark:bg-purple-950/20 rounded-full blur-[110px] pointer-events-none" />

      {/* Subtle background grain grid */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ── LEFT COLUMN: Skeuomorphic Time-Travel Dial (Sticky Desktop) ── */}
          <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-28">
            {/* Tag */}
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-[#736D64] dark:text-amber-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1C1A18] dark:bg-amber-400 animate-pulse" />
              <span>My story</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1A18] dark:text-white font-sans">
              Let&apos;s go back in time.
            </h2>

            {/* Skeuomorphic Radar / Compass Dial with Rotating Graduation Ticks */}
            <div className="relative my-8 w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center select-none">
              {/* Outer Orbit Ring */}
              <div className="absolute inset-0 rounded-full border border-black/10 dark:border-white/10" />

              {/* Middle Rotating Dial with Graduation Tick Marks */}
              <div
                className="absolute inset-3 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center transition-transform duration-700 ease-out"
                style={{
                  transform: `rotate(${activeYearIndex * 45}deg)`,
                }}
              >
                {dialTicks.map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full h-[1px] pointer-events-none"
                    style={{
                      transform: `rotate(${i * 10}deg)`,
                    }}
                  >
                    <div
                      className={`h-[1px] ${
                        i % 3 === 0
                          ? 'w-[10px] bg-black/35 dark:bg-white/40'
                          : 'w-[5px] bg-black/15 dark:bg-white/20'
                      }`}
                    />
                  </div>
                ))}
              </div>

              {/* Inner Dashed Ring */}
              <div className="absolute inset-10 rounded-full border border-dashed border-black/15 dark:border-white/20" />

              {/* Central Year & Period Display (Changes automatically on scroll) */}
              <div className="text-center z-10 px-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentEvent.year}
                    initial={{ opacity: 0, y: -10, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.92 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="text-5xl sm:text-6xl lg:text-[64px] font-black text-[#1C1A18] dark:text-white font-sans tracking-tight block leading-none">
                      {currentEvent.year}
                    </span>
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentEvent.period}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="text-[11px] font-mono tracking-widest uppercase text-[#736D64] dark:text-amber-400 mt-2 block font-bold"
                  >
                    {currentEvent.period}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Progress indicator pill with Clock Icon (Matching Screenshot 1) */}
            <div className="flex items-center gap-3 text-xs font-mono text-[#736D64] dark:text-white/60">
              <Clock size={13} className="text-[#1C1A18] dark:text-amber-400" />
              <span className="font-bold text-[#1C1A18] dark:text-amber-400">
                {stepNumber} / {totalSteps}
              </span>
              <div className="w-24 h-1.5 rounded-full bg-black/10 dark:bg-white/15 overflow-hidden">
                <div
                  className="h-full bg-[#1C1A18] dark:bg-amber-400 rounded-full transition-all duration-400"
                  style={{
                    width: `${((activeYearIndex + 1) / uniqueEvents.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Continuous Connected Timeline Track ── */}
          <div className="lg:col-span-7 relative pl-6 sm:pl-8">
            {/* Continuous Vertical Timeline Line */}
            <div className="absolute left-[7px] sm:left-[11px] top-4 bottom-4 w-[2px] bg-black/20 dark:bg-gradient-to-b dark:from-amber-400/60 dark:via-white/20 dark:to-transparent" />

            <div className="space-y-14 sm:space-y-20 pb-8">
              {uniqueEvents.map((item, idx) => {
                const isActive = activeYearIndex === idx;

                return (
                  <div
                    key={idx}
                    ref={(el) => (itemRefs.current[idx] = el)}
                    onClick={() => handleEventClick(idx)}
                    className={`relative pl-8 sm:pl-10 cursor-pointer transition-all duration-300 ${
                      isActive ? 'opacity-100 scale-[1.01]' : 'opacity-45 hover:opacity-85'
                    }`}
                  >
                    {/* Glowing Timeline Node Bead */}
                    <div
                      className={`absolute -left-[5px] sm:-left-[3px] top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-[#1C1A18] border-black shadow-[0_0_12px_rgba(28,26,24,0.35)] dark:bg-amber-400 dark:border-amber-300 dark:shadow-[0_0_16px_rgba(251,191,36,0.8)] scale-110'
                          : 'bg-[#DDD6C8] border-black/25 dark:bg-[#202024] dark:border-white/20'
                      }`}
                    >
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          isActive
                            ? 'bg-white dark:bg-[#121212]'
                            : 'bg-[#736D64] dark:bg-white/40'
                        }`}
                      />
                    </div>

                    {/* Period Badge & Type */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[11px] font-mono tracking-wider uppercase text-[#736D64] dark:text-amber-400 font-bold">
                        {item.period}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-[#5E5A53] dark:text-white/70 border border-black/10 dark:border-white/10 font-mono">
                        {item.type}
                      </span>
                    </div>

                    {/* Role Title */}
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1C1A18] dark:text-white font-sans">
                      {item.role}
                    </h3>

                    {/* Organization & Location */}
                    <div className="flex items-center gap-2 text-xs font-sans text-[#5E5A53] dark:text-white/60 mt-0.5 mb-3 font-medium">
                      <span>{item.org}</span>
                      {item.location && (
                        <>
                          <span>•</span>
                          <span>{item.location}</span>
                        </>
                      )}
                    </div>

                    {/* Bullet Points with Clean Editorial Style */}
                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="space-y-1.5 text-xs sm:text-sm text-[#5E5A53] dark:text-white/75 font-sans leading-relaxed">
                        {item.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2">
                            <span className="text-[#1C1A18] dark:text-amber-400 font-bold mt-0.5 text-xs">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Document / Letter Link if attached */}
                    {item.letter_url && (
                      <div className="mt-3">
                        <a
                          href={item.letter_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-[#1C1A18] dark:text-amber-400 hover:underline font-semibold"
                        >
                          <span>View Experience Letter</span>
                          <ExternalLink size={11} />
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
