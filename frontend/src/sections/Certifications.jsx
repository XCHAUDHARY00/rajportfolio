import { motion } from 'framer-motion';
import { ArrowUpRight, Award, CheckCircle2, ArrowRight } from 'lucide-react';

function CertCard({ cert, index }) {
  const formatDate = (d) => {
    if (!d) return '';
    const date = new Date(d);
    return isNaN(date.getTime()) ? d : date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <motion.div
      className="bg-white dark:bg-[#1A1A1E] p-6 sm:p-7 rounded-2xl flex flex-col justify-between border border-[#EDE7DD] dark:border-white/10 shadow-sm hover:shadow-md hover:border-amber-500/40 dark:hover:border-amber-400/40 transition-all"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
    >
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 dark:border-amber-400/20 flex items-center justify-center overflow-hidden flex-shrink-0">
            {cert.badge_url ? (
              <img src={cert.badge_url} alt={cert.name} className="w-full h-full object-cover" />
            ) : (
              <Award className="text-amber-600 dark:text-amber-400" size={22} />
            )}
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-medium">
            <CheckCircle2 size={11} /> Verified
          </span>
        </div>

        <h3 className="text-lg font-bold text-[#1C1A18] dark:text-white mb-1 leading-snug font-sans">{cert.name}</h3>
        <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">{cert.issuer}</p>
        <p className="text-[11px] text-[#8C877D] dark:text-[#88837A] mt-0.5 mb-3">{formatDate(cert.issue_date)}</p>

        {cert.description && (
          <p className="text-xs text-[#5E5A53] dark:text-[#A0998E] leading-relaxed font-normal mb-4">{cert.description}</p>
        )}
      </div>

      {cert.verify_url && (
        <a
          href={cert.verify_url.startsWith('http') ? cert.verify_url : `https://${cert.verify_url}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1C1A18] dark:text-[#FAF7F2] hover:text-amber-600 dark:hover:text-amber-400 mt-3 pt-3 border-t border-[#EDE7DD] dark:border-white/10 transition-colors"
        >
          <span>Verify Credential</span>
          <ArrowUpRight size={13} />
        </a>
      )}
    </motion.div>
  );
}

export default function Certifications({ certifications = [], onOpenFullCertificates }) {
  const defaultCerts = [
    {
      id: 'jpmorgan-swe',
      name: 'Software Engineering Virtual Experience',
      issuer: 'JPMorgan Chase & Co.',
      issue_date: '2024-06-01',
      description: 'Interface with stock price data feeds, set up systems, and implement JPMorgan Chase frameworks.',
    },
    {
      id: 'frontend-cognifyz',
      name: 'Frontend Web Development Certification',
      issuer: 'Cognifyz Technologies',
      issue_date: '2025-07-01',
      description: 'Hands-on practical frontend engineering using modern JavaScript, React.js, and responsive design.',
    },
    {
      id: 'akgec-excellence',
      name: 'Academic Merit Distinction',
      issuer: 'AKGEC & LFAIC',
      issue_date: '2024-08-01',
      description: 'Awarded for distinction in high school PCM (89.66%) and B.Tech CS & IT engineering curriculum.',
    },
  ];

  const activeCerts = certifications && certifications.length > 0 ? certifications : defaultCerts;

  return (
    <section id="certificates" className="bg-[#EFECE6] dark:bg-[#121212] text-[#1C1A18] dark:text-[#FAF7F2] py-24 sm:py-32 border-t border-[#EDE7DD] dark:border-white/10 transition-colors">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="text-amber-600 dark:text-amber-400 text-xs font-mono font-bold uppercase tracking-[0.18em] mb-3 flex items-center gap-1.5">
              <Award size={13} />
              <span>VERIFIED CREDENTIALS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1A18] dark:text-white leading-tight font-sans">
              Certifications &amp; Achievements
            </h2>
            <p className="text-[#5E5A53] dark:text-[#A0998E] text-sm mt-3 font-normal leading-relaxed">
              Authenticated professional credentials and industry certifications verifying software engineering proficiency.
            </p>
          </motion.div>

          {onOpenFullCertificates && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenFullCertificates}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#1C1A18] dark:bg-white text-white dark:text-[#121212] shadow-sm hover:opacity-90 transition-opacity self-start md:self-auto"
            >
              <span>3D Parchment Stack</span>
              <ArrowRight size={13} />
            </motion.button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCerts.map((c, i) => (
            <CertCard key={c.id || i} cert={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
