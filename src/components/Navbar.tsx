import { Link, useLocation } from 'react-router-dom';
import { Search, UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const { user } = useAuth();

  const navLinks = [
    { name: 'COLLECTIONS', path: '/collections' },
    { name: 'ATELIER', path: '/atelier' },
    { name: 'PRESS', path: '/press' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-luxury-black/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-6 h-6 bg-luxury-gold flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-500">
            <div className="w-3 h-3 bg-luxury-black transform rotate-45"></div>
          </div>
          <span className="font-serif text-xl tracking-[0.2em] font-medium uppercase text-white">
            Elara Vogue
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-xs tracking-[0.15em] uppercase transition-colors duration-300 ${location.pathname === link.path
                  ? 'text-luxury-gold'
                  : 'text-luxury-muted hover:text-white'
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex relative group items-center">
            <Search className="w-4 h-4 text-luxury-muted absolute left-3 z-10" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border border-white/20 rounded-full py-1.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-luxury-gold hover:border-white/40 transition-all duration-300 w-48 focus:w-64"
            />
          </div>

          {user ? (
            <Link to="/admin" className="text-luxury-muted hover:text-white transition-colors flex items-center gap-2 text-xs uppercase tracking-widest border border-white/20 px-3 py-1.5 rounded-full hover:border-luxury-gold">
              <UserCircle className="w-4 h-4" />
              <span>Admin</span>
            </Link>
          ) : (
            <Link to="/login" className="text-luxury-muted hover:text-white transition-colors">
              <UserCircle className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
