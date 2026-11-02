import { motion } from 'framer-motion';
import { Github, Linkedin, Code2, MapPin, GraduationCap } from 'lucide-react';

export default function About({ profile }) {
  const stats = [
    {
      label: profile?.stat1_label || 'CGPA',
      value: profile?.stat1_value || (profile?.cgpa ? profile.cgpa.toFixed(2) : '7.86'),
      sub: profile?.stat1_sub || 'AKGEC CSIT'
    },
    {
      label: profile?.stat2_label || 'PROJECTS',
      value: profile?.stat2_value || '2+',
      sub: profile?.stat2_sub || 'Production Grade'
    },
    {
      label: profile?.stat3_label || 'DSA PRACTICE',
      value: profile?.stat3_value || '150+',
      sub: profile?.stat3_sub || 'LeetCode & Beyond'
    },
    {
      label: profile?.stat4_label || 'CERTS & WINS',
      value: profile?.stat4_value || '4+',
      sub: profile?.stat4_sub || 'JPMorgan & Honors'
    },
  ];

  const education = {
    degree: profile?.edu_degree || 'B.Tech — Computer Science & IT',
    college: profile?.edu_college || 'Ajay Kumar Garg Engineering College (2024 – 2028)',
    location: profile?.edu_location || (profile?.location || 'Ghaziabad, UP'),
    class12: profile?.edu_class12 || 'Class 12: 89.66%',
  };

  const aboutTag = profile?.about_tag || 'ABOUT MY BACKGROUND';
  const aboutHeadline = profile?.about_headline || 'Engineering scalable systems with intent & speed.';
  const aboutQuote = profile?.about_quote || "Writing clean backend code isn't just about making it work — it's about building architectures that gracefully handle scale, failures, and time.";

  return (
    <section id="about" className="bg-[#FAF7F2] text-[#1C1A18] py-24 sm:py-32 border-t border-[#EDE7DD]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column — Stats & Education (5 cols) */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* 4 Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-[#EDE7DD] shadow-sm flex flex-col justify-between min-h-[130px] hover:border-[#DFD7CA] transition-colors"
                >
                  <p className="text-4xl sm:text-5xl font-semibold text-[#1C1A18] tracking-tight mb-2">
                    {s.value}
                  </p>
                  <div>
                    <p className="text-xs font-semibold text-[#1C1A18] uppercase tracking-wider">{s.label}</p>
                    <p className="text-[11px] text-[#8C877D] mt-0.5">{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Education Card */}
            <div className="bg-white p-6 rounded-2xl mt-4 border border-[#EDE7DD] shadow-sm hover:border-[#DFD7CA] transition-colors">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#EDE7DD] flex items-center justify-center flex-shrink-0 text-[#1C1A18]">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#1C1A18]">{education.degree}</p>
                  <p className="text-xs text-[#5E5A53] mt-0.5">{education.college}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-[#8C877D]">
                    {education.location && (
                      <span className="flex items-center gap-1"><MapPin size={12} /> {education.location}</span>
                    )}
                    {education.location && education.class12 && <span>&bull;</span>}
                    {education.class12 && <span>{education.class12}</span>}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column — Narrative & Socials (7 cols) */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="text-[#8C877D] text-[11px] font-semibold uppercase tracking-[0.16em] mb-4">
              &mdash; {aboutTag}
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#1C1A18] mb-6 leading-tight">
              {aboutHeadline}
            </h2>

            <p className="text-[#5E5A53] text-base leading-relaxed mb-6 font-light">
              {profile?.bio || `Passionate Backend Developer and B.Tech CSIT student at AKGEC (CGPA: 7.86) with a strong foundation in building scalable, production-grade systems. I specialize in Python, Django, DRF, and PostgreSQL, designing clean RESTful APIs, integrating AI (Google Gemini), and shipping full-stack applications with Docker and AWS.`}
            </p>

            {/* Editorial Quote */}
            {aboutQuote && (
              <blockquote className="bg-white border-l-4 border-[#1C1A18] p-5 rounded-r-2xl my-6 border-y border-r border-[#EDE7DD] shadow-sm">
                <p className="font-serif italic text-base sm:text-lg text-[#2C2926] leading-relaxed">
                  &ldquo;{aboutQuote}&rdquo;
                </p>
              </blockquote>
            )}

            {/* Social Pills */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {profile?.github && (
                <a
                  href={profile.github.startsWith('http') ? profile.github : `https://${profile.github}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#EFEAE2] hover:bg-[#E5DFD3] text-[#2C2926] border border-[#E2DBD0] px-4 py-2 rounded-full text-xs font-medium transition-colors flex items-center gap-2"
                >
                  <Github size={15} />
                  <span>GitHub</span>
                </a>
              )}

              {profile?.linkedin && (
                <a
                  href={profile.linkedin.startsWith('http') ? profile.linkedin : `https://${profile.linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#EFEAE2] hover:bg-[#E5DFD3] text-[#2C2926] border border-[#E2DBD0] px-4 py-2 rounded-full text-xs font-medium transition-colors flex items-center gap-2"
                >
                  <Linkedin size={15} />
                  <span>LinkedIn</span>
                </a>
              )}

              <a
                href={profile?.leetcode ? (profile.leetcode.startsWith('http') ? profile.leetcode : `https://${profile.leetcode}`) : "https://leetcode.com/u/Raj_Dhariwal/"}
                target="_blank"
                rel="noreferrer"
                className="bg-[#EFEAE2] hover:bg-[#E5DFD3] text-[#2C2926] border border-[#E2DBD0] px-4 py-2 rounded-full text-xs font-medium transition-colors flex items-center gap-2"
              >
                <Code2 size={15} />
                <span>LeetCode</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
