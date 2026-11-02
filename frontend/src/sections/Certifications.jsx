import { motion } from 'framer-motion';
import { ArrowUpRight, Award, CheckCircle2 } from 'lucide-react';

function CertCard({ cert, index }) {
  const formatDate = (d) => {
    if (!d) return '';
    const date = new Date(d);
    return isNaN(date.getTime()) ? d : date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <motion.div
      className="bg-white p-6 sm:p-7 rounded-2xl flex flex-col justify-between border border-[#EDE7DD] shadow-sm hover:border-[#DFD7CA] transition duration-200"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#EDE7DD] flex items-center justify-center overflow-hidden flex-shrink-0">
            {cert.badge_url ? (
              <img src={cert.badge_url} alt={cert.name} className="w-full h-full object-cover" />
            ) : (
              <Award className="text-[#1C1A18]" size={22} />
            )}
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] text-[#2A5E3A] bg-[#EAF3EB] border border-[#D1E6D6] px-2.5 py-0.5 rounded-full font-medium">
            <CheckCircle2 size={11} /> Verified
          </span>
        </div>

        <h3 className="text-lg font-medium text-[#1C1A18] mb-1 leading-snug">{cert.name}</h3>
        <p className="text-xs font-semibold text-[#5E5A53]">{cert.issuer}</p>
        <p className="text-[11px] text-[#8C877D] mt-0.5 mb-3">{formatDate(cert.issue_date)}</p>

        {cert.description && (
          <p className="text-xs text-[#5E5A53] leading-relaxed font-light mb-4">{cert.description}</p>
        )}
      </div>

      {cert.verify_url && (
        <a
          href={cert.verify_url.startsWith('http') ? cert.verify_url : `https://${cert.verify_url}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1C1A18] hover:underline mt-3 pt-3 border-t border-[#EDE7DD] transition-colors"
        >
          <span>Verify Credential</span>
          <ArrowUpRight size={13} />
        </a>
      )}
    </motion.div>
  );
}

export default function Certifications({ certifications }) {
  return (
    <section id="certifications" className="bg-[#FAF7F2] text-[#1C1A18] py-24 sm:py-32 border-t border-[#EDE7DD]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <div className="text-[#8C877D] text-[11px] font-semibold uppercase tracking-[0.16em] mb-3">
            &mdash; VERIFIED CREDENTIALS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#1C1A18] leading-tight">
            Certifications &amp; Courses
          </h2>
          <p className="text-[#5E5A53] text-sm mt-3 font-light leading-relaxed">
            Professional certifications from top industry institutions including JPMorgan Chase &amp; Co.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(certifications || []).map((c, i) => (
            <CertCard key={c.id} cert={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
