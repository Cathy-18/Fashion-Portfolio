import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#FAF8F5] pt-12 pb-12 mt-auto">
      <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="font-serif font-bold text-[14px] tracking-widest uppercase text-[#1A1A1A]">
          Catherine Nixon
        </div>
        <div className="text-[#9A9A9A] text-[10px] tracking-[0.1em] uppercase font-sans">
          &copy; 2026 CATHERINE NIXON PORTFOLIO. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-6">
          <a href="https://www.instagram.com/busy._.reading_?igsh=MTYzaXprZTB5aHM4Zg==" target="_blank" rel="noopener noreferrer" className="text-[#1A1A1A] text-[11px] font-sans hover:text-[#E9A825] transition-colors uppercase tracking-widest">Instagram</a>
          <a href="https://www.linkedin.com/in/catherine-nixon-588a1928b" target="_blank" rel="noopener noreferrer" className="text-[#1A1A1A] text-[11px] font-sans hover:text-[#E9A825] transition-colors uppercase tracking-widest">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
