import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, Key, Loader2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const success = await login(email, password);

    if (success) {
      navigate('/admin');
    } else {
      setError('The credentials provided do not match our archives.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-off-white py-24 px-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg shadow-ink/5 border border-ink/5 p-10 md:p-12">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-14 h-14 rounded-full bg-beige flex items-center justify-center mb-6">
            <Lock className="w-6 h-6 text-ink/70" />
          </div>
          <h1 className="text-2xl font-bold text-ink mb-2">
            Admin Login
          </h1>
          <p className="text-ink/70 text-sm">
            Enter your credentials to access the dashboard
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm text-center rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-ink text-sm font-medium">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-beige/50 border border-ink/10 rounded-lg pl-11 pr-4 py-3 text-ink placeholder:text-ink/40 text-sm outline-none focus:border-ink/30 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-ink text-sm font-medium">
                Password
              </label>
              <Link
                to="#"
                className="text-beige-dark text-xs hover:text-ink transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*********"
                className="w-full bg-beige/50 border border-ink/10 rounded-lg pl-11 pr-4 py-3 text-ink placeholder:text-ink/40 text-sm outline-none focus:border-ink/30 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-ink text-white font-bold py-3 px-6 rounded-lg hover:bg-ink/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-ink/50 text-xs">
          Secure access for authorized personnel only.
        </p>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-ink/60 text-xs hover:text-ink transition-colors"
          >
            Back to site
          </Link>
        </div>
      </div>
    </div>
  );
}
