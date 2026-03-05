import { Link, useLocation } from 'react-router-dom';
import { Mail, UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const { user } = useAuth();
  const isLightPage = ['/', '/atelier', '/collections', '/contact', '/login', '/admin'].includes(location.pathname) ||
    location.pathname.startsWith('/collections/themed') ||
    location.pathname.startsWith('/collections/traditional') ||
    location.pathname.startsWith('/collections/modern');

  const navLinks = [
    { name: 'COLLECTIONS', path: '/collections' },
    { name: 'ABOUT', path: '/atelier' },
    { name: 'CONTACT', path: '/contact' },
  ];

  const lightClasses = isLightPage
    ? 'bg-cream/95 backdrop-blur border-ink/5 text-ink'
    : 'bg-luxury-black/80 backdrop-blur-lg border-white/5 text-white';

  const linkActiveClass = isLightPage ? 'text-ink' : 'text-luxury-gold';
  const linkMutedClass = isLightPage ? 'text-ink/60 hover:text-ink' : 'text-luxury-muted hover:text-white';
  const iconClass = isLightPage ? 'text-ink/60 hover:text-ink' : 'text-luxury-muted hover:text-luxury-gold';

  return (
    <nav className={`fixed top-0 z-50 w-full border-b h-20 flex items-center transition-colors ${lightClasses}`}>
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className={`w-5 h-5 flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-700 ${isLightPage ? 'bg-ink' : 'bg-luxury-gold'}`}>
            <div className={`w-2.5 h-2.5 transform rotate-45 ${isLightPage ? 'bg-cream' : 'bg-luxury-black'}`}></div>
          </div>
          <span className={`font-serif text-xl tracking-[0.2em] font-medium uppercase transition-colors duration-500 ${isLightPage ? 'text-ink group-hover:text-ink/80' : 'text-white group-hover:text-luxury-gold'}`}>
            Catherine Nixon
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[10px] tracking-[0.3em] uppercase transition-all duration-500 relative group py-2 ${location.pathname === link.path ? linkActiveClass : linkMutedClass}`}
            >
              {link.name}
              <span className={`absolute bottom-0 left-0 w-full h-px transition-transform duration-500 origin-left ${location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'} ${isLightPage ? 'bg-ink' : 'bg-luxury-gold'}`}></span>
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className={`flex items-center gap-8 ${iconClass}`}>
          <Link to="/contact" className="transition-colors duration-300">
            <Mail className="w-4 h-4" />
          </Link>
          {user ? (
            <Link to="/admin" className="transition-colors flex items-center gap-2 group">
              <UserCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] uppercase tracking-widest hidden lg:block">Admin</span>
            </Link>
          ) : (
            <Link to="/login" className="transition-colors">
              <UserCircle className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
