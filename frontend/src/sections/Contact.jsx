import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { sendContact } from '../api/portfolio';

export default function Contact({ profile }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in Name, Email, and Message.');
      return;
    }
    setLoading(true);
    try {
      await sendContact(form);
      setSent(true);
      toast.success('Message sent directly to Raj!');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const email = profile?.email || 'dhariwalraj37@gmail.com';
  const phone = profile?.phone || '7300706640';
  const location = profile?.location || 'Ghaziabad, UP';

  return (
    <section id="contact" className="bg-[#FAF7F2] text-[#1C1A18] py-24 sm:py-32 border-t border-[#EDE7DD]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column — 5 cols */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-[#8C877D] text-[11px] font-semibold uppercase tracking-[0.16em] mb-3">
              &mdash; GET IN TOUCH
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#1C1A18] mb-6 leading-tight">
              Let's build something <span className="font-medium">exceptional.</span>
            </h2>

            <p className="text-[#5E5A53] text-base leading-relaxed mb-8 font-light">
              Interested in collaborating, discussing software engineering roles, or building new backend systems? Drop a message below or contact directly.
            </p>

            <div className="space-y-3.5">
              <a
                href={`mailto:${email}`}
                className="bg-white p-4 rounded-xl border border-[#EDE7DD] flex items-center gap-3.5 hover:border-[#DFD7CA] transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#EDE7DD] flex items-center justify-center flex-shrink-0 text-[#1C1A18]">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[11px] text-[#8C877D] uppercase font-semibold">Email</p>
                  <p className="text-sm font-medium text-[#1C1A18]">{email}</p>
                </div>
              </a>

              <a
                href={`tel:${phone}`}
                className="bg-white p-4 rounded-xl border border-[#EDE7DD] flex items-center gap-3.5 hover:border-[#DFD7CA] transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#EDE7DD] flex items-center justify-center flex-shrink-0 text-[#1C1A18]">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[11px] text-[#8C877D] uppercase font-semibold">Phone</p>
                  <p className="text-sm font-medium text-[#1C1A18]">+91 {phone}</p>
                </div>
              </a>

              <div className="bg-white p-4 rounded-xl border border-[#EDE7DD] flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] border border-[#EDE7DD] flex items-center justify-center flex-shrink-0 text-[#1C1A18]">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[11px] text-[#8C877D] uppercase font-semibold">Location</p>
                  <p className="text-sm font-medium text-[#1C1A18]">{location}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column — 7 cols: Clean Form */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#EDE7DD] shadow-sm">
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 rounded-full bg-[#EAF3EB] text-[#2A5E3A] border border-[#D1E6D6] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={28} />
                  </div>
                  <h3 className="text-2xl font-medium text-[#1C1A18] mb-2">Message Delivered</h3>
                  <p className="text-[#5E5A53] text-sm max-w-sm mx-auto mb-6">
                    Thank you for reaching out. Raj will review your note and respond shortly.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="bg-[#FAF7F2] text-[#1C1A18] border border-[#EDE7DD] px-5 py-2 rounded-full text-xs font-semibold hover:border-[#DFD7CA] transition"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-[#1C1A18] uppercase tracking-wider mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Alex Smith"
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#EDE7DD] text-sm text-[#1C1A18] placeholder-[#8C877D] focus:outline-none focus:border-[#1C1A18] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#1C1A18] uppercase tracking-wider mb-2">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#EDE7DD] text-sm text-[#1C1A18] placeholder-[#8C877D] focus:outline-none focus:border-[#1C1A18] transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1A18] uppercase tracking-wider mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="Backend Role / Project Inquiry"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#EDE7DD] text-sm text-[#1C1A18] placeholder-[#8C877D] focus:outline-none focus:border-[#1C1A18] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1A18] uppercase tracking-wider mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Hi Raj, I'd like to discuss a software engineering opportunity..."
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#EDE7DD] text-sm text-[#1C1A18] placeholder-[#8C877D] focus:outline-none focus:border-[#1C1A18] transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#1C1A18] hover:bg-black text-[#FAF7F2] py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
