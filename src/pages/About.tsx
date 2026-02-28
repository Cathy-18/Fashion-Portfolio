import { Link } from 'react-router-dom';
import { ArrowRight, Triangle, Square, Layers } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-luxury-black text-white pt-32 pb-20">
      {/* Hero Section */}
      <section className="px-6 max-w-7xl mx-auto mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <h4 className="text-luxury-gold text-xs tracking-[0.3em] uppercase font-medium mb-6">The Visionary</h4>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl mb-6 tracking-tight text-white">
              Eleanor
              <br />
              <span className="italic text-luxury-muted font-light">Vance</span>
            </h1>
            <div className="w-24 h-px bg-luxury-gold mb-12"></div>
            <p className="text-luxury-muted text-lg md:text-xl tracking-wide mb-8 max-w-xl font-light leading-relaxed italic">
              "Fashion is not merely about clothing; it is about constructing a narrative for the body. My work explores the delicate tension between structural rigidity and fluid grace."
            </p>
            <p className="text-luxury-muted text-base leading-relaxed mb-8 max-w-xl font-light">
              Born in Milan and educated in the ateliers of Paris, Eleanor Vance has spent over a decade redefining the boundaries of modern luxury. Her approach combines architectural precision with the softness of natural fibers.
            </p>
            <p className="text-luxury-muted text-base leading-relaxed mb-12 max-w-xl font-light">
              Known for her uncompromising attention to detail, every collection is a chapter in an ongoing story of empowerment and elegance.
            </p>
            <div className="h-12 opacity-70 invert bg-luxury-gray w-48"></div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="aspect-[3/4] overflow-hidden bg-luxury-gray p-2 border border-white/5 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/60 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-32 px-6 bg-luxury-dark border-y border-white/5">
        <div className="max-w-7xl mx-auto text-center mb-24">
          <h4 className="text-luxury-gold text-xs tracking-[0.3em] uppercase font-medium mb-6">Core Values</h4>
          <h2 className="font-serif text-5xl md:text-6xl italic text-white mb-8">The Philosophy of Form</h2>
          <p className="text-luxury-muted text-lg max-w-2xl mx-auto font-light">
            Rooted in the belief that true luxury lies in the subtraction of the unnecessary.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Value 1 */}
          <div className="p-12 border border-white/10 text-center hover:border-luxury-gold transition-colors duration-500 group">
            <div className="w-16 h-16 mx-auto mb-8 flex items-center justify-center text-luxury-gold group-hover:scale-110 transition-transform duration-500">
              <Triangle className="w-8 h-8 fill-current" />
            </div>
            <h3 className="font-serif text-2xl mb-4 text-white">Symmetry</h3>
            <p className="text-luxury-muted text-sm leading-relaxed font-light">
              Finding perfect balance in every seam. We believe that proportion is the foundation of beauty.
            </p>
          </div>

          {/* Value 2 */}
          <div className="p-12 border border-white/10 text-center hover:border-luxury-gold transition-colors duration-500 group">
            <div className="w-16 h-16 mx-auto mb-8 flex items-center justify-center text-luxury-gold group-hover:scale-110 transition-transform duration-500">
              <Square className="w-8 h-8 fill-current" />
            </div>
            <h3 className="font-serif text-2xl mb-4 text-white">Minimalism</h3>
            <p className="text-luxury-muted text-sm leading-relaxed font-light">
              The ultimate sophistication. Stripping away the noise to reveal the essence of the wearer.
            </p>
          </div>

          {/* Value 3 */}
          <div className="p-12 border border-white/10 text-center hover:border-luxury-gold transition-colors duration-500 group">
            <div className="w-16 h-16 mx-auto mb-8 flex items-center justify-center text-luxury-gold group-hover:scale-110 transition-transform duration-500">
              <Layers className="w-8 h-8 fill-current" />
            </div>
            <h3 className="font-serif text-2xl mb-4 text-white">Texture</h3>
            <p className="text-luxury-muted text-sm leading-relaxed font-light">
              Tactile experiences in silk, wool, and leather. The fabric must speak as loudly as the design.
            </p>
          </div>
        </div>
      </section>

      {/* The Atelier */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="relative aspect-[21/9] overflow-hidden group bg-luxury-gray">
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="bg-luxury-black/80 backdrop-blur-sm p-16 text-center border border-white/10 max-w-2xl">
              <h2 className="font-serif text-5xl md:text-6xl italic text-white mb-6">The Atelier</h2>
              <p className="text-luxury-muted text-lg leading-relaxed mb-10 font-light">
                Every garment is conceptualized and crafted in our private studio, ensuring that the human touch remains at the heart of our process.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-4 text-luxury-gold text-xs tracking-[0.2em] uppercase font-medium border-b border-luxury-gold pb-2 hover:text-white transition-colors"
              >
                Visit the Studio <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-x divide-white/10">
          <div>
            <p className="font-serif text-5xl md:text-6xl text-white mb-4 italic">15</p>
            <p className="text-luxury-gold text-xs tracking-[0.2em] uppercase font-medium">Years Active</p>
          </div>
          <div>
            <p className="font-serif text-5xl md:text-6xl text-white mb-4 italic">42</p>
            <p className="text-luxury-gold text-xs tracking-[0.2em] uppercase font-medium">Collections</p>
          </div>
          <div>
            <p className="font-serif text-5xl md:text-6xl text-white mb-4 italic">08</p>
            <p className="text-luxury-gold text-xs tracking-[0.2em] uppercase font-medium">Awards Won</p>
          </div>
          <div>
            <p className="font-serif text-5xl md:text-6xl text-white mb-4 italic">12</p>
            <p className="text-luxury-gold text-xs tracking-[0.2em] uppercase font-medium">Global Boutiques</p>
          </div>
        </div>
      </section>
    </div>
  );
}
