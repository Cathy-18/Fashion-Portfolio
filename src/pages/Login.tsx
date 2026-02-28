import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, User, Loader2 } from 'lucide-react';

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
        <div className="flex-grow flex items-center justify-center bg-luxury-black overflow-hidden relative">
            <div className="absolute inset-0 bg-luxury-dark/90 backdrop-blur-xl"></div>

            <div className="relative z-10 w-full max-w-lg p-12 lg:p-16 border border-white/5 rounded-3xl luxury-glass shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                <div className="flex flex-col items-center mb-12 text-center">
                    <div className="w-12 h-12 bg-luxury-gold flex items-center justify-center transform rotate-45 mb-8 shadow-lg shadow-luxury-gold/20">
                        <div className="w-6 h-6 bg-luxury-black transform -rotate-45"></div>
                    </div>
                    <h1 className="text-3xl font-serif tracking-[0.3em] uppercase text-white mb-4">CN Archives</h1>
                    <p className="text-luxury-muted text-[10px] tracking-[0.4em] uppercase font-bold italic">Private Access Required</p>
                </div>

                {error && (
                    <div className="mb-8 p-4 bg-red-950/40 border border-red-500/30 text-red-200 text-xs tracking-widest uppercase font-bold text-center animate-luxury-fade">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-4">
                        <label htmlFor="email" className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase font-bold text-luxury-muted mb-2">
                            <User className="w-3 h-3 text-luxury-gold/50" /> Email Identity
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/10 focus:outline-none focus:border-luxury-gold/50 focus:bg-white/[0.08] transition-all duration-500 text-sm tracking-widest font-light"
                            placeholder="Enter your email..."
                        />
                    </div>

                    <div className="space-y-4">
                        <label htmlFor="password" className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase font-bold text-luxury-muted mb-2">
                            <Lock className="w-3 h-3 text-luxury-gold/50" /> Secure Key
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-white/10 focus:outline-none focus:border-luxury-gold/50 focus:bg-white/[0.08] transition-all duration-500 text-sm tracking-widest font-light"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-luxury-gold text-luxury-black uppercase tracking-[0.3em] text-[10px] py-5 font-bold hover:bg-white transition-all duration-700 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center shadow-xl shadow-luxury-gold/10 group"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <span className="group-hover:tracking-[0.4em] transition-all duration-700">Access Dashboard</span>
                        )}
                    </button>
                </form>

                <div className="mt-12 text-center">
                    <Link to="/" className="text-[10px] tracking-[0.2em] uppercase font-bold text-luxury-muted hover:text-white transition-colors duration-300">
                        Back to Atelier
                    </Link>
                </div>
            </div>
        </div>
    );
}
