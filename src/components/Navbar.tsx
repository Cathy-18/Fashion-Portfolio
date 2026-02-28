import { Link, useLocation } from 'react-router-dom';
import { Search, UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const { user } = useAuth();

  const navLinks = [
    { name: 'COLLECTIONS', path: '/collections' },
    { name: 'ABOUT', path: '/atelier' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full bg-luxury-black/80 backdrop-blur-lg border-b border-white/5 h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-6 h-6 bg-luxury-gold flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-700">
            <div className="w-3 h-3 bg-luxury-black transform rotate-45"></div>
          </div>
          <span className="font-serif text-2xl tracking-[0.25em] font-light uppercase text-white group-hover:text-luxury-gold transition-colors duration-500">
            Catherine Nixon
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[10px] tracking-[0.3em] uppercase transition-all duration-500 relative group py-2 ${location.pathname === link.path
                ? 'text-luxury-gold'
                : 'text-luxury-muted hover:text-white'
                }`}
            >
              {link.name}
              <span className={`absolute bottom-0 left-0 w-full h-px bg-luxury-gold transition-transform duration-500 origin-left ${location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-8 text-luxury-muted">
          <button className="hover:text-luxury-gold transition-colors duration-300">
            <Search className="w-4 h-4" />
          </button>


          {user ? (
            <Link to="/admin" className="hover:text-luxury-gold transition-colors flex items-center gap-2 group">
              <UserCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] uppercase tracking-widest hidden lg:block">Admin</span>
            </Link>
          ) : (
            <Link to="/login" className="hover:text-luxury-gold transition-colors">
              <UserCircle className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
