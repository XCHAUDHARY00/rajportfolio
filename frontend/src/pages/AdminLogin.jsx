import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Lock, User, ArrowLeft, Shield } from 'lucide-react';
import { loginAdmin } from '../api/portfolio';

export default function AdminLogin() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const u = username.trim().toLowerCase();
    const p = password.trim();

    if (!u || !p) {
      toast.error('Please enter username/email and password.');
      return;
    }

    setLoading(true);
    try {
      // 1. Authenticate against backend /api/auth/login
      try {
        const res = await loginAdmin(u, p);
        if (res.data?.access_token) {
          localStorage.setItem('admin_token', res.data.access_token);
          toast.success('Admin authenticated successfully!');
          navigate('/admin');
          return;
        }
      } catch (apiErr) {
        // If backend explicitly rejected invalid credentials
        if (apiErr.response?.status === 401) {
          toast.error('Invalid credentials! Incorrect username or password.');
          return;
        }

        // 2. Strict client fallback (e.g. during backend deployment / offline)
        const validUsernames = ['admin', 'dhariwalraj37@gmail.com'];
        const validPassword = 'raj@portfolio2026';
        if (validUsernames.includes(u) && p === validPassword) {
          localStorage.setItem('admin_token', btoa(`${u}:${p}:${Date.now()}`));
          toast.success('Admin authenticated successfully!');
          navigate('/admin');
          return;
        }

        // If credentials don't match, strictly reject!
        toast.error('Invalid credentials! Incorrect username or password.');
        return;
      }
    } catch {
      toast.error('Login error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1A18] flex items-center justify-center px-6 relative">
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#EFEAE2] border border-[#EDE7DD] mb-4 shadow-sm">
            <span className="text-xl font-bold text-[#1C1A18]">RC</span>
          </div>
          <h1 className="text-3xl font-medium tracking-tight text-[#1C1A18]">Portfolio CMS</h1>
          <p className="text-[#8C877D] text-xs uppercase tracking-widest mt-1.5 flex items-center justify-center gap-1.5 font-semibold">
            <Shield size={12} className="text-[#1C1A18]" /> Admin Authentication
          </p>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-[#EDE7DD]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[#1C1A18] uppercase tracking-wider mb-2">
                Admin Username or Email
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C877D]" size={16} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#EDE7DD] text-[#1C1A18] text-sm pl-10 pr-4 py-3 rounded-xl outline-none focus:border-[#1C1A18] transition-colors placeholder-[#8C877D]"
                  placeholder="admin"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1C1A18] uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C877D]" size={16} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#EDE7DD] text-[#1C1A18] text-sm pl-10 pr-4 py-3 rounded-xl outline-none focus:border-[#1C1A18] transition-colors placeholder-[#8C877D]"
                  placeholder="raj@portfolio2026"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1C1A18] hover:bg-black text-[#FAF7F2] py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition shadow-sm active:scale-95 disabled:opacity-50 mt-2"
            >
              {loading ? 'Authenticating…' : 'Enter Admin Console'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#EDE7DD] text-center">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-[#8C877D] hover:text-[#1C1A18] transition-colors font-medium"
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
