import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  // Highlight active link
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'COLLECTIONS', path: '/collections' },
    { name: 'ATELIER', path: '/atelier' },
    { name: 'CONTACT', path: '/contact' }
  ];

  return (
    <nav className="fixed top-0 z-50 w-full h-[90px] flex items-center bg-[#FAF8F5]/90 backdrop-blur-md">
      <div className="max-w-[1400px] mx-auto w-full px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <span className="font-serif font-bold text-[18px] tracking-widest uppercase text-[#1A1A1A]">
            Catherine Nixon
          </span>
        </Link>

        {/* Desktop Navigation (Right Aligned) */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[11px] tracking-[0.1em] uppercase font-bold transition-colors ${
                isActive(link.path) ? 'text-[#1A1A1A]' : 'text-[#6B6B6B] hover:text-[#1A1A1A]'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
