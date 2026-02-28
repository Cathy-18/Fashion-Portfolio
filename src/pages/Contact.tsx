import { useState } from 'react';
import { Mail, Instagram, Twitter, Globe, ChevronDown } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const subjects = [
    'General Inquiry',
    'Custom Commission',
    'Private Appointment',
    'Wholesale'
  ];

  return (
    <div className="min-h-screen bg-luxury-black text-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start mb-32">
          {/* Left Column: Info */}
          <div className="animate-luxury-fade">
            <h4 className="text-luxury-gold text-xs tracking-[0.4em] uppercase font-bold mb-6 italic">Get in Touch</h4>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl mb-12 tracking-tight leading-[0.9]">
              Contact &
              <br />
              <span className="italic">Inquiries</span>
            </h1>
            <div className="w-16 h-px bg-luxury-gold mb-12"></div>

            <p className="text-luxury-muted text-base leading-relaxed mb-16 max-w-sm font-light italic">
              For custom commissions or general questions, please reach out to our atelier. We endeavor to respond to all inquiries within 24 hours.
            </p>

            <div className="space-y-16">
              <div>
                <h4 className="text-white text-[10px] tracking-[0.4em] uppercase font-bold mb-6">Atelier</h4>
                <p className="text-luxury-muted text-sm tracking-widest leading-relaxed">
                  152 Rue de Rivoli
                  <br />
                  75001 Paris, France
                </p>
              </div>

              <div>
                <h4 className="text-white text-[10px] tracking-[0.4em] uppercase font-bold mb-6">Direct</h4>
                <ul className="text-luxury-muted text-sm tracking-widest space-y-3">
                  <li className="hover:text-luxury-gold transition-colors">
                    <a href="mailto:info@catherinenixon.com">info@catherinenixon.com</a>
                  </li>
                  <li>+33 1 23 45 67 89</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="animate-luxury-fade [animation-delay:200ms]">
            <form className="space-y-12">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] tracking-[0.3em] uppercase font-bold text-luxury-muted block">First Name</label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-white/10 py-2 text-sm tracking-widest outline-none focus:border-luxury-gold transition-colors"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] tracking-[0.3em] uppercase font-bold text-luxury-muted block">Last Name</label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-white/10 py-2 text-sm tracking-widest outline-none focus:border-luxury-gold transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] tracking-[0.3em] uppercase font-bold text-luxury-muted block">Email Address</label>
                <input
                  type="email"
                  className="w-full bg-transparent border-b border-white/10 py-2 text-sm tracking-widest outline-none focus:border-luxury-gold transition-colors"
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] tracking-[0.3em] uppercase font-bold text-luxury-muted block">Subject</label>
                <div className="relative group">
                  <select className="w-full bg-transparent border-b border-white/10 py-2 text-sm tracking-widest outline-none focus:border-luxury-gold appearance-none cursor-pointer">
                    <option value="" className="bg-luxury-black">Select Inquiry Type</option>
                    {subjects.map(s => <option key={s} value={s} className="bg-luxury-black">{s}</option>)}
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-muted group-focus-within:text-luxury-gold pointer-events-none" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] tracking-[0.3em] uppercase font-bold text-luxury-muted block">Message</label>
                <textarea
                  rows={6}
                  className="w-full bg-transparent border-b border-white/10 py-2 text-sm tracking-widest outline-none focus:border-luxury-gold transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-5 bg-luxury-gold text-luxury-black text-[10px] tracking-[0.4em] font-bold uppercase hover:bg-white transition-all duration-500 shadow-lg shadow-luxury-gold/10"
              >
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>

        {/* Footer Socials (As per design) */}
        <div className="pt-20 border-t border-white/5 flex gap-10 justify-center text-luxury-muted/50">
          <a href="#" className="hover:text-luxury-gold transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-luxury-gold transition-colors">
            <Globe className="w-5 h-5" />
          </a>
          <a href="mailto:atelier@catherinenixon.com" className="hover:text-luxury-gold transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>

        <div className="text-center mt-8">
          <p className="text-[10px] tracking-[0.4em] uppercase text-luxury-muted/30 font-light">
            &copy; 2024 Catherine Nixon. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
