import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Trophy, Calendar, MapPin, ExternalLink } from 'lucide-react';

export default function StoryTimeline({
  experience = [],
  certifications = [],
  achievements = [],
  profile = {},
}) {
  const [activeYearIndex, setActiveYearIndex] = useState(0);

  // Compile timeline events from real backend data
  const timelineEvents = [
    {
      year: '2026',
      period: 'JAN 2026 – PRESENT',
      role: 'Senior Backend Developer & Cloud Architect',
      org: 'Production Portfolio & Full-Stack Systems',
      location: 'Ghaziabad, UP',
      type: 'Engineering',
      icon: Briefcase,
      bullets: [
        'Architected modular FastAPI backends with AWS DynamoDB, S3, and SES integration.',
        'Engineered 3D skeuomorphic interfaces with sub-second response times and CI/CD pipelines.',
        'Maintained 100% test coverage and robust HMAC token authentication.',
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
    {
      year: '2025',
      period: 'JAN 2025 – MAY 2025',
      role: 'Software Engineering Virtual Experience',
      org: 'JPMorgan Chase & Co.',
      location: 'Virtual / Remote',
      type: 'Virtual Experience',
      icon: Award,
      bullets: [
        'Interfaced with financial data feeds, implemented live stock price visualizers, and resolved framework bugs.',
        'Engineered high-throughput financial data streaming scripts in Python.',
        'Awarded Certificate of Completion in Software Engineering.',
      ],
    },
    {
      year: '2024',
      period: 'JUL 2024 – PRESENT (2024 – 2028)',
      role: profile.edu_degree || 'B.Tech, Computer Science & IT',
      org: profile.edu_college || 'Ajay Kumar Garg Engineering College (AKGEC)',
      location: profile.edu_location || 'Ghaziabad, UP',
      type: 'Education',
      icon: GraduationCap,
      bullets: [
        `Four years of rigorous computer science: distributed systems, algorithms, DBMS, and OS fundamentals.`,
        `Current CGPA: ${profile.cgpa ? profile.cgpa.toFixed(2) : '7.86'}.`,
        `${profile.edu_class12 || 'Senior Secondary (Class 12): 89.66%'}.`,
      ],
    },
  ];

  // Remove duplicate years/roles if seeded
  const uniqueEvents = timelineEvents.filter(
    (ev, idx, self) =>
      idx === self.findIndex((t) => t.role === ev.role && t.org === ev.org)
  );

  const currentEvent = uniqueEvents[activeYearIndex] || uniqueEvents[0];
  const stepNumber = String(activeYearIndex + 1).padStart(2, '0');
  const totalSteps = String(uniqueEvents.length).padStart(2, '0');

  return (
    <section
      id="story"
      className="relative py-24 sm:py-36 px-4 sm:px-8 bg-[#161618] text-[#EFECE6] overflow-hidden transition-colors"
    >
      {/* Background subtle starry/grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ── LEFT COLUMN: The Radar / Dial Timeline Widget (Matching Screenshot 1) ── */}
          <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-28">
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-amber-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>My story</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-sans">
              Let&apos;s go back in time.
            </h2>

            {/* Radar / Dial Graphic with Concentric Rings */}
            <div className="relative my-8 w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center select-none">
              {/* Outer Orbit Ring */}
              <div className="absolute inset-0 rounded-full border border-white/10" />

              {/* Middle Graduation Tick Marks */}
              <div className="absolute inset-4 rounded-full border border-dashed border-white/20 animate-[spin_60s_linear_infinite]" />

              {/* Inner Ring */}
              <div className="absolute inset-10 rounded-full border border-white/15" />

              {/* Central Giant Year Display */}
              <div className="text-center z-10">
                <motion.div
                  key={currentEvent.year}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="text-5xl sm:text-6xl font-black text-white font-sans tracking-tight block">
                    {currentEvent.year}
                  </span>
                </motion.div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400/90 mt-1 block">
                  {currentEvent.period}
                </span>
              </div>
            </div>

            {/* Progress indicator pill */}
            <div className="flex items-center gap-3 text-xs font-mono text-white/50">
              <span className="font-bold text-amber-400">{stepNumber}</span>
              <div className="w-20 h-1 rounded-full bg-white/15 overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-300"
                  style={{
                    width: `${((activeYearIndex + 1) / uniqueEvents.length) * 100}%`,
                  }}
                />
              </div>
              <span>{totalSteps}</span>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Vertical Connected Timeline Track (Matching Screenshot 1) ── */}
          <div className="lg:col-span-7 relative pl-6 sm:pl-8">
            {/* Continuous Vertical Glowing Line */}
            <div className="absolute left-[7px] sm:left-[11px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-amber-400/60 via-white/20 to-transparent" />

            <div className="space-y-12 sm:space-y-14">
              {uniqueEvents.map((item, idx) => {
                const Icon = item.icon || Briefcase;
                const isActive = activeYearIndex === idx;

                return (
                  <motion.div
                    key={idx}
                    onMouseEnter={() => setActiveYearIndex(idx)}
                    onClick={() => setActiveYearIndex(idx)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`relative pl-8 sm:pl-10 cursor-pointer transition-all duration-300 ${
                      isActive ? 'opacity-100 scale-[1.01]' : 'opacity-65 hover:opacity-90'
                    }`}
                  >
                    {/* Glowing Timeline Node Bead */}
                    <div
                      className={`absolute -left-[5px] sm:-left-[3px] top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-amber-400 border-amber-300 shadow-[0_0_16px_rgba(251,191,36,0.8)] scale-110'
                          : 'bg-[#202024] border-white/20'
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          isActive ? 'bg-[#121212]' : 'bg-white/40'
                        }`}
                      />
                    </div>

                    {/* Period Badge */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[11px] font-mono tracking-wider uppercase text-amber-400/90 font-bold">
                        {item.period}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/70 border border-white/10 font-mono">
                        {item.type}
                      </span>
                    </div>

                    {/* Role Title */}
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
                      {item.role}
                    </h3>

                    {/* Organization & Location */}
                    <div className="flex items-center gap-2 text-xs font-sans text-white/60 mt-0.5 mb-3">
                      <span>{item.org}</span>
                      {item.location && (
                        <>
                          <span>•</span>
                          <span>{item.location}</span>
                        </>
                      )}
                    </div>

                    {/* Bullet Points */}
                    {item.bullets && item.bullets.length > 0 && (
                      <ul className="space-y-1.5 text-xs sm:text-sm text-white/75 font-sans leading-relaxed">
                        {item.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2">
                            <span className="text-amber-400 font-bold mt-1 text-xs">•</span>
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
                          className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 underline font-medium"
                        >
                          <span>View Experience Letter</span>
                          <ExternalLink size={11} />
                        </a>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
