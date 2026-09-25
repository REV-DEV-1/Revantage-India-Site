import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import Logo from '@/components/Logo';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-[#F7F9FF] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo showText={false} className="h-12" />
          </div>
          <h1 className="text-2xl font-extrabold mb-2 text-[#0D1248]">Admin Login</h1>
          <p className="text-sm text-[#4B5578]">Sign in to manage jobs, stories, and content.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-[#DDE3F5]">
          {error && (
            <div className="flex items-center gap-2 p-3 mb-4 bg-[#D60808]/10 text-[#D60808] rounded-xl text-sm">
              <AlertCircle size={18} />
              {error}
            </div>
          )}
          <div className="flex items-center gap-2 p-3 mb-4 bg-[#2DCB3B]/10 text-[#2DCB3B] rounded-xl text-sm">
            <Mail size={18} />
            Superadmin: admin@revantagehbs.com · Password: Revantage@2026
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-bold text-[#0D1248] mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7882A5]" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field pl-10"
                  placeholder="admin@revantagehbs.com"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-bold text-[#0D1248] mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7882A5]" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field pl-10"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
              {loading ? 'Signing in...' : 'Sign In'} <ArrowRight size={16} className="ml-1" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
