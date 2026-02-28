import { ArrowRight, Instagram, Twitter } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-luxury-black text-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Left Column - Contact Info */}
          <div>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl mb-6 tracking-tight text-white">
              Contact &
              <br />
              <span className="italic text-luxury-gold font-light">Inquiries</span>
            </h1>
            <p className="text-luxury-muted text-lg md:text-xl tracking-wide mb-16 max-w-md font-light leading-relaxed">
              For press, collaborations, private viewings, or to schedule an appointment at our atelier.
            </p>

            <div className="space-y-12">
              <div>
                <h4 className="text-luxury-gold text-xs tracking-[0.3em] uppercase font-medium mb-4">Atelier</h4>
                <p className="text-white text-lg font-serif italic mb-2">12 Place Vendôme</p>
                <p className="text-white text-lg font-serif italic">75001 Paris, France</p>
              </div>

              <div>
                <h4 className="text-luxury-gold text-xs tracking-[0.3em] uppercase font-medium mb-4">Direct</h4>
                <p className="text-white text-lg font-serif italic mb-2">+33 1 40 20 50 50</p>
                <p className="text-white text-lg font-serif italic">contact@elara-maison.com</p>
              </div>

              <div className="flex gap-6 pt-8 border-t border-white/10">
                <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-luxury-muted hover:text-luxury-gold hover:border-luxury-gold transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-luxury-muted hover:text-luxury-gold hover:border-luxury-gold transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-luxury-dark p-12 md:p-16 border border-white/5">
            <form className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <label htmlFor="firstName" className="block text-luxury-gold text-xs tracking-[0.2em] uppercase font-medium mb-4">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full bg-transparent border-b border-white/20 pb-4 text-white focus:border-luxury-gold outline-none transition-colors font-light placeholder:text-luxury-muted/50"
                    placeholder="Given Name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-luxury-gold text-xs tracking-[0.2em] uppercase font-medium mb-4">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full bg-transparent border-b border-white/20 pb-4 text-white focus:border-luxury-gold outline-none transition-colors font-light placeholder:text-luxury-muted/50"
                    placeholder="Family Name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-luxury-gold text-xs tracking-[0.2em] uppercase font-medium mb-4">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-transparent border-b border-white/20 pb-4 text-white focus:border-luxury-gold outline-none transition-colors font-light placeholder:text-luxury-muted/50"
                  placeholder="email@domain.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-luxury-gold text-xs tracking-[0.2em] uppercase font-medium mb-4">Subject</label>
                <select
                  id="subject"
                  className="w-full bg-transparent border-b border-white/20 pb-4 text-white focus:border-luxury-gold outline-none transition-colors font-light appearance-none"
                >
                  <option value="" className="bg-luxury-black text-luxury-muted">Select a topic</option>
                  <option value="press" className="bg-luxury-black">Press Inquiry</option>
                  <option value="appointment" className="bg-luxury-black">Book Appointment</option>
                  <option value="collaboration" className="bg-luxury-black">Collaboration</option>
                  <option value="other" className="bg-luxury-black">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-luxury-gold text-xs tracking-[0.2em] uppercase font-medium mb-4">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-transparent border-b border-white/20 pb-4 text-white focus:border-luxury-gold outline-none transition-colors font-light placeholder:text-luxury-muted/50 resize-none"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-5 bg-luxury-gold text-luxury-black text-xs tracking-[0.2em] uppercase font-medium hover:bg-white transition-colors flex items-center justify-center gap-4 group mt-8"
              >
                Send Message <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
