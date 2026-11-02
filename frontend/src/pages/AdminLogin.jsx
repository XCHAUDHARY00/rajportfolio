import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Lock, Mail, ArrowLeft, Shield } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter email and password.');
      return;
    }
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      localStorage.setItem('admin_token', btoa(`${email}:${Date.now()}`));
      toast.success('Admin authenticated successfully!');
      navigate('/admin');
    } catch {
      toast.error('Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08080A] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gold/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.04] border border-gold/30 mb-4 shadow-glow-gold">
            <span className="font-serif text-2xl font-bold gold-gradient-text">RC</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-white">Portfolio CMS</h1>
          <p className="text-cream/40 font-sans text-xs uppercase tracking-widest mt-1.5 flex items-center justify-center gap-1.5">
            <Shield size={12} className="text-gold" /> Admin Authentication
          </p>
        </div>

        <div className="glass-card p-8 rounded-3xl shadow-2xl border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-cream/70 font-sans text-xs uppercase tracking-wider font-semibold mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/30" size={16} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0B0C10] border border-white/10 text-white font-sans text-sm pl-10 pr-4 py-3 rounded-xl outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors placeholder-white/20"
                  placeholder="dhariwalraj37@gmail.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-cream/70 font-sans text-xs uppercase tracking-wider font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/30" size={16} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0B0C10] border border-white/10 text-white font-sans text-sm pl-10 pr-4 py-3 rounded-xl outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors placeholder-white/20"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-gold to-gold-dark text-black py-3.5 rounded-xl font-sans font-bold text-sm tracking-wider uppercase hover:shadow-glow-gold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-2 active:scale-[0.99]"
            >
              {loading ? 'Authenticating…' : 'Enter Dashboard'}
            </button>
          </form>
        </div>

        <p className="text-center mt-6">
          <a
            href="/"
            className="text-cream/40 hover:text-gold transition-colors font-sans text-xs inline-flex items-center gap-1.5"
          >
            <ArrowLeft size={13} /> Back to Portfolio
          </a>
        </p>
      </div>
    </div>
  );
}
