import { Link } from 'react-router-dom';
import { Instagram, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-luxury-dark border-t border-white/5 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          {/* Brand Info */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-6 h-6 bg-luxury-gold flex items-center justify-center transform rotate-45">
                <div className="w-3 h-3 bg-luxury-black transform -rotate-45"></div>
              </div>
              <span className="font-serif text-2xl tracking-[0.2em] font-light uppercase text-white">
                Catherine Nixon
              </span>
            </div>
            <p className="text-luxury-muted text-base leading-relaxed max-w-md font-light">
              Defining modern luxury through meticulous craftsmanship and sustainable innovation. Every stitch tells a story of elegance and architectural fluidity.
            </p>
          </div>

          {/* Explore Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white text-xs tracking-[0.3em] uppercase font-semibold mb-8">Explore</h4>
            <ul className="space-y-4">
              {['Collections', 'Our Story', 'Sustainability'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-luxury-muted hover:text-luxury-gold text-xs tracking-wider transition-colors duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Links */}
          <div className="lg:col-span-3">
            <h4 className="text-white text-xs tracking-[0.3em] uppercase font-semibold mb-8">Contact</h4>
            <ul className="space-y-4 text-xs tracking-wider text-luxury-muted">
              <li>
                <a href="mailto:atelier@catherinenixon.com" className="hover:text-luxury-gold transition-colors flex items-center gap-3">
                  <Mail className="w-4 h-4 text-luxury-gold/50" />
                  atelier@catherinenixon.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-4"></span>
                +1 (212) 555-0199
              </li>
              <li className="flex items-center gap-3">
                <span className="w-4"></span>
                485 Broadway, New York, NY
              </li>
            </ul>
          </div>

          {/* Social / Copy (merged into grid to match design feel) */}
          <div className="lg:col-span-2">
            <h4 className="text-white text-xs tracking-[0.3em] uppercase font-semibold mb-8">Follow Us</h4>
            <div className="flex gap-6">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-luxury-gold hover:text-luxury-gold transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-luxury-gold hover:text-luxury-gold transition-all duration-300">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Global Footer Bottom */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] tracking-[0.2em] uppercase text-luxury-muted/70">
            &copy; {new Date().getFullYear()} Catherine Nixon. All Rights Reserved.
          </p>
          <div className="flex gap-10 text-[10px] tracking-[0.2em] uppercase">
            <Link to="/privacy" className="text-luxury-muted/70 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-luxury-muted/70 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
