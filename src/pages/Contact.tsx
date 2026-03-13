export default function Contact() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] pt-[150px] pb-32 relative">
      {/* Background Texture Area */}
      <div className="absolute top-0 left-0 w-full h-[600px] sm:h-[850px] z-0 pointer-events-none">
        <div className="w-full h-full bg-[url('/collections-bg.png')] bg-cover bg-center opacity-40 mix-blend-multiply filter blur-[1px]"></div>
        {/* Gradient fade out to pure bg color */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#FAF8F5]"></div>
      </div>

      <div className="max-w-2xl mx-auto px-6 relative z-10">
        <div className="bg-white p-12 md:p-16 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] w-full relative">
          <div className="text-center mb-12">
            <h1 className="font-serif text-[38px] text-[#1A1A1A] mb-3">Inquiries</h1>
            <p className="text-[#9A9A9A] text-[9px] font-bold uppercase tracking-[0.2em] font-sans">
              AVAILABLE FOR BESPOKE CONSULTATIONS
            </p>
          </div>
          
          <form className="space-y-8" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1A1A1A] block font-sans">FIRST NAME</label>
                <input 
                  type="text" 
                  placeholder="John" 
                  className="w-full bg-transparent border-b border-gray-200 pb-3 text-[14px] font-sans outline-none focus:border-[#1A1A1A] transition-colors placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1A1A1A] block font-sans">LAST NAME</label>
                <input 
                  type="text" 
                  placeholder="Doe" 
                  className="w-full bg-transparent border-b border-gray-200 pb-3 text-[14px] font-sans outline-none focus:border-[#1A1A1A] transition-colors placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1A1A1A] block font-sans">EMAIL ADDRESS</label>
              <input 
                type="email" 
                placeholder="john@example.com" 
                className="w-full bg-transparent border-b border-gray-200 pb-3 text-[14px] font-sans outline-none focus:border-[#1A1A1A] transition-colors placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-3 relative">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1A1A1A] block font-sans">SUBJECT</label>
              <select className="w-full bg-transparent border-b border-gray-200 pb-3 text-[14px] font-sans outline-none focus:border-[#1A1A1A] transition-colors text-[#1A1A1A] appearance-none cursor-pointer">
                <option>General Inquiry</option>
                <option>Bespoke Commission</option>
                <option>Editorial Styling</option>
                <option>Other</option>
              </select>
              <div className="absolute right-0 bottom-4 pointer-events-none">
                 <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="#1A1A1A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1A1A1A] block font-sans">MESSAGE</label>
              <textarea 
                rows={4}
                placeholder="Your message..." 
                className="w-full bg-transparent border-b border-gray-200 pb-3 text-[14px] font-sans outline-none focus:border-[#1A1A1A] transition-colors placeholder:text-gray-400 resize-none mt-2"
              ></textarea>
            </div>

            <div className="pt-6 flex justify-center">
              <button 
                type="submit" 
                className="bg-[#1A1A1A] text-white text-[11px] font-bold uppercase tracking-[0.2em] px-12 py-4 hover:bg-black transition-colors"
              >
                SEND MESSAGE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
