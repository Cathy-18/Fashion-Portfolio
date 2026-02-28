import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-luxury-black border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-5 h-5 bg-luxury-gold flex items-center justify-center transform rotate-45">
                <div className="w-2.5 h-2.5 bg-luxury-black transform -rotate-45"></div>
              </div>
              <span className="font-serif text-lg tracking-[0.2em] font-medium uppercase text-white">
                Elara Vogue
              </span>
            </Link>
            <p className="text-luxury-muted text-sm leading-relaxed max-w-xs">
              Redefining luxury through sustainable craftsmanship and timeless avant-garde design.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-serif text-luxury-gold text-xs tracking-[0.2em] uppercase mb-6">Explore</h4>
            <ul className="space-y-4">
              {['Collections', 'Maison', 'Sustainability', 'Careers'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-luxury-muted hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-serif text-luxury-gold text-xs tracking-[0.2em] uppercase mb-6">Customer Care</h4>
            <ul className="space-y-4">
              {['Contact Us', 'Shipping & Returns', 'Size Guide', 'Book Appointment'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-luxury-muted hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-luxury-gold text-xs tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Newsletter
            </h4>
            <p className="text-luxury-muted text-sm mb-6">
              Subscribe for exclusive access to runway shows and private viewings.
            </p>
            <form className="flex border-b border-white/20 pb-2 focus-within:border-luxury-gold transition-colors">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-transparent border-none outline-none text-sm text-white placeholder:text-luxury-muted flex-1"
              />
              <button type="submit" className="text-luxury-gold text-xs tracking-[0.2em] font-medium uppercase hover:text-white transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-luxury-muted">
          <p>&copy; {new Date().getFullYear()} Elara Vogue. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="hover:text-white transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="hover:text-white transition-colors"><Facebook className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
