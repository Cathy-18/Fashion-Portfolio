import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
            setError('Unauthorized access. Please check your credentials.');
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-grow flex items-center justify-center bg-luxury-black bg-[url('https://images.unsplash.com/photo-1579761596700-112000c01d4a?auto=format&fit=crop&q=80')] bg-cover bg-center">
            <div className="absolute inset-0 bg-luxury-black/80 backdrop-blur-sm"></div>

            <div className="relative z-10 w-full max-w-md p-10 bg-luxury-black/90 border border-white/10 rounded-xl shadow-2xl">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-10 h-10 bg-luxury-gold flex items-center justify-center transform rotate-45 mb-6">
                        <div className="w-5 h-5 bg-luxury-black transform -rotate-45"></div>
                    </div>
                    <h1 className="text-2xl font-serif tracking-[0.2em] uppercase text-white mb-2">Admin Portal</h1>
                    <p className="text-luxury-muted text-sm tracking-wider uppercase">Authorized Personnel Only</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-900/30 border border-red-500/30 text-red-200 text-sm rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-xs uppercase tracking-[0.1em] text-luxury-muted mb-2">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-colors duration-300"
                            placeholder="Enter admin email..."
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-xs uppercase tracking-[0.1em] text-luxury-muted mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/50 border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-colors duration-300"
                            placeholder="Enter admin password..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-luxury-gold text-luxury-black uppercase tracking-[0.15em] text-sm py-4 font-medium hover:bg-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-t-2 border-luxury-black rounded-full animate-spin"></div>
                        ) : (
                            'Access Dashboard'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
