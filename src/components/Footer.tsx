import { Link, useLocation } from 'react-router-dom';
import { Instagram, Mail } from 'lucide-react';

export default function Footer() {
  const location = useLocation();
  const isLightPage = ['/', '/atelier', '/collections', '/contact', '/login', '/admin'].includes(location.pathname) || location.pathname.startsWith('/collections/');

  return (
    <footer className={`border-t py-8 ${isLightPage ? 'bg-cream border-ink/10' : 'bg-luxury-dark border-white/5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className={`text-[10px] tracking-[0.2em] uppercase ${isLightPage ? 'text-ink/60' : 'text-luxury-muted/70'}`}>
          &copy; {new Date().getFullYear()} Catherine Nixon. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="#"
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all hover:border-current ${isLightPage ? 'border-ink/20 text-ink/60 hover:text-ink' : 'border-white/10 text-luxury-muted hover:text-luxury-gold hover:border-luxury-gold'}`}
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <Link
            to="/contact"
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all hover:border-current ${isLightPage ? 'border-ink/20 text-ink/60 hover:text-ink' : 'border-white/10 text-luxury-muted hover:text-luxury-gold hover:border-luxury-gold'}`}
            aria-label="Contact"
          >
            <Mail className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
