import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, Loader2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useAuth();

  // If already logged in, redirect to dashboard immediately
  useEffect(() => {
    if (user?.role === 'admin') {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const success = await login(email, password);

    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('The credentials provided do not match our archives.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FDFDF9] to-[#F2EDE1] py-24 px-6 relative overflow-hidden">
      {/* Subtle radial glow in the background to match image */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-[420px] bg-white rounded-[24px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden relative z-10 flex flex-col">
        {/* Banner Image */}
        <div className="h-[180px] w-full relative bg-[#1A1A1A]">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800"
            alt="Interior"
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        <div className="px-10 py-10 md:px-12 md:pb-12 md:pt-10 flex-1">
          <div className="mb-10">
            <h1 className="text-[28px] font-sans font-bold text-ink mb-1">
              Welcome Back
            </h1>
            <p className="text-ink/50 text-[14px] font-medium font-sans">
              Sign in to your admin dashboard
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-[13px] font-medium text-center rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2.5">
              <label htmlFor="email" className="block text-ink text-[13px] font-bold font-sans">
                Username
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full bg-transparent border border-gray-200 rounded-[14px] px-5 py-3.5 text-ink placeholder:text-gray-400 text-[14px] font-medium outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 transition-all font-sans"
                />
              </div>
            </div>

            <div className="space-y-2.5">
              <label htmlFor="password" className="block text-ink text-[13px] font-bold font-sans">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-transparent border border-gray-200 rounded-[14px] px-5 py-3.5 text-ink placeholder:text-gray-400 text-[14px] font-medium outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 transition-all shadow-sm font-sans"
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Eye className="w-[18px] h-[18px]" />
                </button>
              </div>
              <div className="flex justify-end pt-2">
                <Link
                  to="#"
                  className="text-amber-500 font-bold text-[13px] font-sans hover:text-amber-600 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#E9A825] text-white font-bold font-sans text-[15px] py-4 px-6 rounded-[14px] hover:bg-[#D4981E] shadow-[0_8px_16px_rgba(233,168,37,0.2)] hover:shadow-[0_12px_20px_rgba(233,168,37,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center -translate-y-[1px] active:translate-y-[1px]"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-gray-400 text-[11px] font-medium font-sans tracking-wide">
            © 2026 Admin Portal. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
