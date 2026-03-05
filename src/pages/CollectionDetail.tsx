import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Grid, Loader2, Palette, Mail } from 'lucide-react';

interface CloudinaryImage {
  publicId: string;
  url: string;
  tags: string[];
}

export default function CollectionDetail() {
  const { id } = useParams();
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const categoryLabels: Record<string, string> = {
    'traditional': 'Traditional',
    'modern': 'Modern',
    'themed': 'Themed'
  };

  const isThemed = id?.toLowerCase() === 'themed';
  const isTraditional = id?.toLowerCase() === 'traditional';
  const currentCategory = id ? categoryLabels[id.toLowerCase()] || id.replace('-', ' ') : 'Collection';

  useEffect(() => {
    const fetchSeasonImages = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/images');
        if (response.ok) {
          const allImages: CloudinaryImage[] = await response.json();
          const filtered = allImages.filter(img =>
            img.tags.some(tag => tag.toLowerCase().includes(id?.toLowerCase() || ''))
          );
          setImages(filtered);
        }
      } catch (error) {
        console.error('Error fetching season images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeasonImages();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FBFBF8] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#1A1915] animate-spin opacity-20" />
      </div>
    );
  }

  if (isThemed) {
    const featuredImage = images[0]?.url || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200';
    const conceptImage = images[1]?.url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800';
    const textureImage = images[2]?.url || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=1200';
    const etherealImage = images[3]?.url || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800';
    const lineageImage = images[4]?.url || conceptImage;
    const popImage = images[5]?.url || conceptImage;
    const springImage = images[6]?.url || featuredImage;

    return (
      <div className="min-h-screen bg-[#F8F6F3] text-[#1A1915]">
        {/* Header Section */}
        <header className="pt-32 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="max-w-xl animate-luxury-fade">
              <p className="text-[#1A1915]/40 text-[10px] tracking-[0.4em] uppercase font-bold mb-6">
                Curated Portfolio
              </p>
              <h1 className="font-serif text-[clamp(4rem,12vw,8rem)] leading-[0.85] tracking-tight mb-4">
                Themed
                <br />
                <span className="italic font-light opacity-40 block">Narratives</span>
              </h1>
            </div>
            <div className="md:max-w-sm md:pt-20 animate-luxury-fade [animation-delay:200ms]">
              <p className="font-sans text-sm md:text-base leading-relaxed text-[#1A1915]/60">
                Exploring conceptual fashion through seasonal rhythms and avant-garde lenses. A digital archive of fabric, form, and feeling.
              </p>
            </div>
          </div>
        </header>

        {/* Featured Gallery Section */}
        <section className="px-6 md:px-12 pb-32 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Main Featured Card */}
            <div className="md:col-span-8 group relative aspect-[4/3] overflow-hidden rounded-lg shadow-xl animate-luxury-fade">
              <img
                src={featuredImage}
                alt="Seasonal Shifts"
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-[10px] tracking-[0.3em] uppercase font-bold mb-2 opacity-80">Autumn / Winter 2024</p>
                <h2 className="font-serif text-4xl mb-4">Seasonal Shifts</h2>
                <button className="text-[10px] tracking-[0.2em] uppercase font-bold border-b border-white/40 pb-1 hover:border-white transition-colors">
                  View Collection &rarr;
                </button>
              </div>
            </div>

            {/* Right Stack */}
            <div className="md:col-span-4 flex flex-col gap-8">
              {/* Top stack item */}
              <div className="flex-1 bg-white rounded-lg p-8 shadow-md flex flex-col justify-between animate-luxury-fade [animation-delay:150ms] group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase font-bold mb-2 opacity-40">01 &mdash; CONCEPT</p>
                    <h3 className="font-serif text-2xl font-bold mb-3">Avant-Garde Dreams</h3>
                    <p className="text-xs text-[#1A1915]/60 leading-relaxed max-w-[200px]">Experimental silhouettes challenging the boundaries of traditional wear.</p>
                  </div>
                  <div className="text-xl rotate-45 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">&rarr;</div>
                </div>
                <div className="mt-6 aspect-square max-w-[150px] mx-auto">
                  <img src={conceptImage} alt="Concept" className="w-full h-full object-contain mix-blend-multiply" />
                </div>
              </div>

              {/* Bottom stack item */}
              <div className="h-[200px] bg-[#8E8A82] rounded-lg p-8 shadow-md relative overflow-hidden animate-luxury-fade [animation-delay:300ms] group cursor-pointer">
                <img src={textureImage} alt="Textures" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-[2s]" />
                <div className="relative z-10 text-white h-full flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase font-bold mb-2 opacity-80">NEW RELEASE</p>
                    <h3 className="font-serif text-2xl font-bold">Urban Textures</h3>
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="text-[10px] leading-relaxed max-w-[150px] opacity-80">A study of concrete, glass, and street style in harmony.</p>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                      <Palette size={14} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Commissioned Series Section */}
        <section className="px-6 md:px-12 pb-32 max-w-[1400px] mx-auto border-t border-[#1A1915]/5 pt-20">
          <div className="mb-16">
            <h2 className="font-serif text-3xl font-bold mb-4 italic">Commissioned Series</h2>
            <p className="text-sm text-[#1A1915]/60 max-w-2xl leading-relaxed">
              Bespoke illustrations created for luxury brands and independent designers. Each series is a collaborative journey from sketch to final render.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Ethereal Forms', desc: 'Watercolor & Ink', img: etherealImage, bg: 'bg-[#FDECEC]/30' },
              { title: 'Modern Lineage', desc: 'Digital Charcoal', img: lineageImage, bg: 'bg-white shadow-sm' },
              { title: 'Pop & Posh', desc: 'Mixed Media', img: popImage, bg: 'bg-[#FFB703]/10' }
            ].map((item, i) => (
              <div key={i} className="animate-luxury-fade" style={{ animationDelay: `${i * 150 + 400}ms` }}>
                <div className={`aspect-[4/5] ${item.bg} mb-6 rounded overflow-hidden group`}>
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                </div>
                <h3 className="font-serif text-xl font-bold mb-1">{item.title}</h3>
                <p className="text-[10px] tracking-[0.2em] uppercase opacity-40 italic">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Spring Edit / Bottom CTA */}
        <section className="px-6 md:px-12 pb-40 max-w-[1400px] mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-[#1A1915]/5 flex flex-col lg:flex-row items-center gap-12 animate-luxury-fade [animation-delay:800ms]">
            <div className="w-full lg:w-1/2 aspect-video overflow-hidden rounded-xl">
              <img src={springImage} alt="Spring Edit" className="w-full h-full object-cover" />
            </div>
            <div className="w-full lg:w-1/2">
              <span className="inline-block px-3 py-1 bg-[#F8F6F3] rounded-full text-[8px] tracking-[0.3em] font-bold uppercase mb-6 border border-[#1A1915]/5 text-[#1A1915]/40">Editor&apos;s Pick</span>
              <h2 className="font-serif text-4xl mb-6">The Spring Edit:<br />Floral Motifs &amp; Soft Drapery</h2>
              <p className="text-sm text-[#1A1915]/60 mb-10 max-w-md leading-relaxed">
                A closer look at the intricate details defining this season's aesthetic. Discover the process behind the petal-inspired ruffles and the muted color palettes.
              </p>
              <button className="bg-[#1A1915] text-white px-10 py-4 rounded-full text-[10px] tracking-[0.2em] font-bold uppercase flex items-center gap-4 hover:bg-black transition-colors group">
                Read the Story
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </button>
            </div>
          </div>
        </section>

        {/* Minimal Footer for Themed */}
        <footer className="px-12 py-12 border-t border-[#1A1915]/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[#1A1915]/60">
          <div className="font-serif text-xl font-bold italic">Illustra</div>
          <div className="text-[10px] tracking-widest uppercase opacity-40">&copy; 2024 Illustra Portfolio. All rights reserved.</div>
          <div className="flex gap-6">
            <Mail size={16} />
            <Grid size={16} />
            <div className="w-4 h-4 border border-[#1A1915]/60 rounded-full flex items-center justify-center text-[8px] font-bold">W</div>
          </div>
        </footer>
      </div>
    );
  }

  // Common Layout for all collections...
  return (
    <div className={`min-h-screen ${isTraditional ? 'bg-[#FBFBF8] text-[#1A1915]' : 'bg-luxury-black text-white'}`}>
      {/* Header Section */}
      <header className="pt-24 pb-12 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12">
          <div className="animate-luxury-fade">
            <p className="text-[#3A9E5C] text-[10px] tracking-[0.4em] uppercase font-bold mb-8">
              Collection {(id === 'traditional' ? '01' : id === 'modern' ? '02' : '03')}
            </p>
            <h1 className="font-serif text-[clamp(4rem,15vw,10rem)] leading-[0.85] tracking-tight mb-4">
              {currentCategory}
              <br />
              <span className="italic font-light opacity-50 block pl-[0.1em]">Works</span>
            </h1>
          </div>

          <div className="md:max-w-md md:pt-12 animate-luxury-fade [animation-delay:200ms]">
            <div className="w-full h-px bg-[#1A1915]/10 mb-8 md:hidden"></div>
            <div className="flex gap-8">
              <div className="w-px h-24 bg-[#3A9E5C]/60 shrink-0 hidden md:block"></div>
              <p className="font-sans text-sm md:text-base leading-relaxed text-[#1A1915]/60 max-w-sm">
                A curated selection of tactile explorations. Pencil, charcoal, and watercolor illustrations that study the delicate interplay of form, texture, and light in fashion.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Gallery Section */}
      <section className="px-6 md:px-12 pb-32 max-w-[1400px] mx-auto">
        {images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-y-48 gap-x-12">
            {images.map((img, index) => {
              // Custom layout logic to mimic the staggered look
              const isLarge = index === 0;
              const isRight = index === 1;
              const isSmallLeft = index === 2;
              const isHorizontal = index === 3;
              const isSquareLeft = index === 4;
              const isCenterNarrow = index === 5;
              const isTallRight = index === 6;

              let gridClasses = "md:col-span-6"; // Default
              if (isLarge) gridClasses = "md:col-span-8";
              if (isRight) gridClasses = "md:col-span-4 md:mt-24";
              if (isSmallLeft) gridClasses = "md:col-span-4";
              if (isHorizontal) gridClasses = "md:col-span-7 md:-mt-12";
              if (isSquareLeft) gridClasses = "md:col-span-3";
              if (isCenterNarrow) gridClasses = "md:col-span-5 md:mt-24";
              if (isTallRight) gridClasses = "md:col-span-4 md:-mt-32";

              return (
                <div
                  key={img.publicId}
                  className={`${gridClasses} group animate-luxury-fade`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className={`relative overflow-hidden bg-[#F0F0EB] mb-6 ${isHorizontal ? 'aspect-[16/10]' : 'aspect-[3/4]'}`}>
                    <img
                      src={img.url}
                      alt={`Artwork ${index + 1}`}
                      className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-[1.5s] group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 text-[10px] tracking-[0.2em] font-medium opacity-40">
                      {(index + 1).toString().padStart(2, '0')}
                    </div>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-[#1A1915]/5 pb-4">
                    <div>
                      <h3 className="font-serif text-lg md:text-xl font-medium mb-1">
                        {index === 0 ? 'Autumn Silhouette' :
                          index === 1 ? 'Vintage Couture' :
                            index === 2 ? 'Sketchbook Study No. 4' :
                              index === 3 ? 'Parisian Morning' :
                                index === 4 ? 'Draped Fabric' :
                                  index === 5 ? 'High Contrast' :
                                    index === 6 ? 'Runway Motion' : `${currentCategory} Study`}
                      </h3>
                      <p className="text-[10px] tracking-widest uppercase opacity-40 italic">
                        {index === 0 ? 'Watercolor on cold press' :
                          index === 1 ? 'Graphite and charcoal' :
                            index === 2 ? 'Pencil sketch' :
                              index === 3 ? 'Ink and wash' :
                                index === 4 ? 'Charcoal study' :
                                  index === 5 ? 'Mixed media' :
                                    index === 6 ? 'Quick gesture sketch' : 'Form & Texture Study'}
                      </p>
                    </div>
                    <div className="text-[10px] tracking-widest font-bold opacity-10">
                      {(index + 1).toString().padStart(2, '0')}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-48 text-center border-t border-[#1A1915]/10">
            <h2 className="font-serif text-4xl mb-6 italic opacity-20">Atelier Archives</h2>
            <p className="text-sm tracking-widest uppercase opacity-40 max-w-md mx-auto mb-12">
              The {currentCategory} collection is being curated for the upcoming season.
            </p>
            <Link to="/collections" className="text-[10px] tracking-[0.4em] font-bold uppercase border border-[#1A1915] px-12 py-4 hover:bg-[#1A1915] hover:text-[#FBFBF8] transition-all duration-500">
              Return to Archives
            </Link>
          </div>
        )}
      </section>

      {/* Pagination / Navigation */}
      <nav className="border-y border-[#1A1915]/5 px-6 md:px-12 py-12 max-w-[1400px] mx-auto flex justify-between items-center text-[10px] tracking-[0.3em] font-bold uppercase">
        <Link to="/collections" className="flex items-center gap-4 group opacity-60 hover:opacity-100 transition-opacity">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Previous Collection</span>
        </Link>

        <div className="flex gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#3A9E5C]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#1A1915]/10"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#1A1915]/10"></div>
        </div>

        <Link to="/collections" className="flex items-center gap-4 group opacity-60 hover:opacity-100 transition-opacity text-right">
          <span>Digital Works</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </nav>

      {/* Stay in the Loop Section */}
      <section className="px-6 md:px-12 py-32 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-end">
          <div>
            <h2 className="font-serif text-4xl italic mb-8">Stay in the loop</h2>
            <p className="text-sm opacity-50 max-w-sm leading-relaxed mb-12">
              Subscribe to receive updates on new collections, workshops, and exhibitions.
            </p>
            <form className="flex gap-4 border-b border-[#1A1915]/20 pb-4 max-w-md">
              <input
                type="email"
                placeholder="Email address"
                className="bg-transparent border-none outline-none text-sm w-full font-serif italic"
              />
              <button type="submit" className="text-[10px] tracking-[0.2em] font-bold uppercase text-[#3A9E5C]">
                Submit
              </button>
            </form>
          </div>

          <div className="flex flex-col items-end gap-12">
            <div className="flex gap-6">
              <div className="w-10 h-10 rounded-full border border-[#1A1915]/10 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                <Grid size={16} />
              </div>
              <div className="w-10 h-10 rounded-full border border-[#1A1915]/10 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                <div className="w-4 h-4 border border-current rounded-sm"></div>
              </div>
              <div className="w-10 h-10 rounded-full border border-[#1A1915]/10 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                <div className="w-4 h-px bg-current rotate-45 relative after:content-[''] after:absolute after:inset-0 after:bg-current after:-rotate-90"></div>
              </div>
            </div>

            <div className="flex gap-8 text-[10px] tracking-widest font-bold opacity-30">
              <Link to="#">Terms</Link>
              <Link to="#">Privacy</Link>
              <span>© 2024 Portfolio</span>
            </div>
          </div>
        </div>
      </section>
    </div >
  );
}
