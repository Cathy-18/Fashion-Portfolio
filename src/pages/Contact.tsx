import { ChevronDown, ArrowRight } from 'lucide-react';

export default function Contact() {
  const subjects = [
    'General Inquiry',
    'Custom Commission',
    'Private Appointment',
    'Wholesale'
  ];

  return (
    <div className="min-h-screen bg-off-white text-ink pt-32 pb-20">
      <div className="max-w-2xl mx-auto px-6">
        {/* Inquiries Section */}
        <section className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-ink mb-6">
            Inquiries
          </h1>
          <p className="text-ink/70 font-serif text-base md:text-lg leading-relaxed">
            For commissions, collaborations, or just to say hello. Please fill out the form below and I&apos;ll get back to you shortly.
          </p>
        </section>

        {/* Contact Form */}
        <section className="bg-beige/80 border border-ink/10 rounded-sm p-8 md:p-12 mb-24">
          <form className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-ink/70 text-[10px] tracking-[0.2em] uppercase font-semibold block">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Jane"
                  className="w-full bg-transparent border border-ink/20 rounded px-4 py-3 text-ink placeholder:text-ink/40 text-sm outline-none focus:border-ink/50 transition-colors"
                />
              </div>
              <div className="space-y-3">
                <label className="text-ink/70 text-[10px] tracking-[0.2em] uppercase font-semibold block">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="w-full bg-transparent border border-ink/20 rounded px-4 py-3 text-ink placeholder:text-ink/40 text-sm outline-none focus:border-ink/50 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-ink/70 text-[10px] tracking-[0.2em] uppercase font-semibold block">
                Email Address
              </label>
              <input
                type="email"
                placeholder="jane@example.com"
                className="w-full bg-transparent border border-ink/20 rounded px-4 py-3 text-ink placeholder:text-ink/40 text-sm outline-none focus:border-ink/50 transition-colors"
              />
            </div>

            <div className="space-y-3">
              <label className="text-ink/70 text-[10px] tracking-[0.2em] uppercase font-semibold block">
                Subject
              </label>
              <div className="relative">
                <select
                  className="w-full bg-transparent border border-ink/20 rounded px-4 py-3 text-ink text-sm appearance-none cursor-pointer outline-none focus:border-ink/50 transition-colors"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a subject...
                  </option>
                  {subjects.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/50 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-ink/70 text-[10px] tracking-[0.2em] uppercase font-semibold block">
                Message
              </label>
              <textarea
                rows={6}
                placeholder="Tell me about your project..."
                className="w-full bg-transparent border border-ink/20 rounded px-4 py-3 text-ink placeholder:text-ink/40 text-sm outline-none focus:border-ink/50 transition-colors resize-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-3 bg-beige border border-ink/10 rounded text-ink text-xs tracking-[0.2em] uppercase font-semibold hover:bg-beige-dark transition-colors"
              >
                Send Message
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </section>

        {/* Footer - Direct Contact & Socials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12 border-t border-ink/10">
          <div>
            <h4 className="text-ink text-[10px] tracking-[0.2em] uppercase font-semibold mb-4">
              Direct Contact
            </h4>
            <ul className="text-ink/70 text-sm space-y-2">
              <li>
                <a href="mailto:info@catherinenixon.com" className="hover:text-ink transition-colors">
                  info@catherinenixon.com
                </a>
              </li>
              <li>+33 1 23 45 67 89</li>
            </ul>
          </div>
          <div>
            <h4 className="text-ink text-[10px] tracking-[0.2em] uppercase font-semibold mb-4">
              Socials
            </h4>
            <ul className="text-ink/70 text-sm space-y-2">
              <li>
                <a href="#" className="hover:text-ink transition-colors tracking-wider">INSTAGRAM</a>
              </li>
              <li>
                <a href="#" className="hover:text-ink transition-colors tracking-wider">PINTEREST</a>
              </li>
              <li>
                <a href="#" className="hover:text-ink transition-colors tracking-wider">BEHANCE</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center pt-8">
          <p className="text-ink/50 text-[10px] tracking-[0.2em] uppercase">
            &copy; {new Date().getFullYear()} Catherine Nixon. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
