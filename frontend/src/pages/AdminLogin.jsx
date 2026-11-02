import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Lock, User, ArrowLeft, Shield } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Please enter username/email and password.');
      return;
    }
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 400));
      localStorage.setItem('admin_token', btoa(`${username}:${password}:${Date.now()}`));
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
                Admin Username or Email
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cream/30" size={16} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#0B0C10] border border-white/10 text-white font-sans text-sm pl-10 pr-4 py-3 rounded-xl outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors placeholder-white/20"
                  placeholder="admin"
                  required
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
                  placeholder="raj@portfolio2026"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-black py-3 rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-glow-gold active:scale-95 disabled:opacity-50 mt-2"
            >
              {loading ? 'Authenticating…' : 'Enter Admin Console'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-cream/40 hover:text-white text-xs font-sans transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Back to Portfolio</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
