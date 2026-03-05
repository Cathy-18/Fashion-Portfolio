import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Grid, Loader2, Palette, Mail } from 'lucide-react';
import ImagePlaceholder from '../components/ImagePlaceholder';

interface CloudinaryImage {
  publicId: string;
  url: string;
  tags: string[];
  context: { caption?: string };
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
    const etherealImage = images[0] || null;
    const lineageImage = images[1] || null;
    const popImage = images[2] || null;

    return (
      <div className="min-h-screen bg-[#F8F6F3] text-[#1A1915]">
        {/* Header Section */}
        <header className="pt-32 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-[#1A1915]/5 mb-20">
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

        {/* Commissioned Series Section (Only Grid Kept) */}
        <section className="px-6 md:px-12 pb-32 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Ethereal Forms', desc: 'Watercolor & Ink', img: etherealImage, bg: 'bg-[#FDECEC]/30' },
              { title: 'Modern Lineage', desc: 'Digital Charcoal', img: lineageImage, bg: 'bg-white shadow-sm' },
              { title: 'Pop & Posh', desc: 'Mixed Media', img: popImage, bg: 'bg-[#FFB703]/10' }
            ].map((item, i) => (
              <div key={i} className="animate-luxury-fade" style={{ animationDelay: `${i * 150 + 400}ms` }}>
                <div className={`aspect-[4/5] ${item.bg} mb-6 rounded overflow-hidden group`}>
                  {item.img ? (
                    <img src={item.img.url} alt={item.title} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                  ) : (
                    <ImagePlaceholder size="lg" />
                  )}
                </div>
                {item.img?.context?.caption && (
                  <h3 className="font-serif text-xl font-bold mt-4">{item.img.context.caption}</h3>
                )}
              </div>
            ))}
          </div>
        </section>


      </div>
    );
  }

  const isModern = id?.toLowerCase() === 'modern';

  if (isModern) {
    const modernImages = {
      avantGarde: images[0] || null,
      urbanMinimalist: images[1] || null,
      digitalCouture: images[2] || null,
      abstractForms: images[3] || null,
      pastelDreams: images[4] || null,
      structuredCoats: images[5] || null,
      botanicalStudy: images[6] || null,
    };

    return (
      <div className="min-h-screen bg-[#FBFBF8] text-[#1A1915]">
        {/* Modern Header */}
        <header className="pt-32 pb-16 px-6 md:px-12 max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div className="animate-luxury-fade">
              <p className="text-[#1A1915]/40 text-[10px] tracking-[0.4em] uppercase font-bold mb-6">
                Curated Collection
              </p>
              <h1 className="font-serif text-[clamp(3rem,10vw,6rem)] leading-[0.9] tracking-tight uppercase">
                Modern
                <br />
                <span className="italic font-light opacity-30">Aesthetics</span>
              </h1>
            </div>
          </div>
          <p className="font-sans text-sm md:text-base leading-relaxed text-[#1A1915]/60 max-w-xl animate-luxury-fade [animation-delay:200ms]">
            A refined selection of digital and contemporary fashion illustrations showcasing modern lines, bold silhouettes, and avant-garde concepts.
          </p>
        </header>

        {/* Modern Masonry Grid */}
        <section className="px-6 md:px-12 pb-32 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Column 1 */}
            <div className="flex flex-col gap-12">
              <div className="group animate-luxury-fade">
                <div className="relative aspect-[3/5] overflow-hidden rounded-sm bg-beige mb-6">
                  {modernImages.avantGarde ? (
                    <img src={modernImages.avantGarde.url} alt="Avant Garde Spring" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                  ) : (
                    <ImagePlaceholder size="lg" />
                  )}
                  <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur px-2 py-1 text-[8px] font-bold tracking-widest border border-ink/5">01</div>
                </div>
                {modernImages.avantGarde?.context?.caption && (
                  <h3 className="font-serif text-lg font-bold mt-4 uppercase">{modernImages.avantGarde.context.caption}</h3>
                )}
              </div>

              <div className="group animate-luxury-fade [animation-delay:400ms]">
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-black mb-6">
                  {modernImages.structuredCoats ? (
                    <img src={modernImages.structuredCoats.url} alt="Structured Coats" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                  ) : (
                    <ImagePlaceholder size="lg" />
                  )}
                </div>
                {modernImages.structuredCoats?.context?.caption && (
                  <h3 className="font-serif text-lg font-bold mt-4 uppercase">{modernImages.structuredCoats.context.caption}</h3>
                )}
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-12 md:pt-24">
              <div className="group animate-luxury-fade [animation-delay:150ms]">
                <div className="relative aspect-square overflow-hidden rounded-sm bg-[#FDF0E5] mb-6">
                  {modernImages.urbanMinimalist ? (
                    <img src={modernImages.urbanMinimalist.url} alt="Urban Minimalist" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                  ) : (
                    <ImagePlaceholder size="lg" />
                  )}
                </div>
                {modernImages.urbanMinimalist?.context?.caption && (
                  <h3 className="font-serif text-lg font-bold mt-4 uppercase">{modernImages.urbanMinimalist.context.caption}</h3>
                )}
              </div>

              <div className="group animate-luxury-fade [animation-delay:500ms]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[#E8D9CE] mb-6">
                  {modernImages.abstractForms ? (
                    <img src={modernImages.abstractForms.url} alt="Abstract Forms" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                  ) : (
                    <ImagePlaceholder size="lg" />
                  )}
                </div>
                {modernImages.abstractForms?.context?.caption && (
                  <h3 className="font-serif text-lg font-bold mt-4 uppercase">{modernImages.abstractForms.context.caption}</h3>
                )}
              </div>

              <div className="group animate-luxury-fade [animation-delay:700ms]">
                <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-[#D9D1C1] mb-6">
                  {modernImages.botanicalStudy ? (
                    <img src={modernImages.botanicalStudy.url} alt="Botanical Study" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                  ) : (
                    <ImagePlaceholder size="md" />
                  )}
                </div>
                {modernImages.botanicalStudy?.context?.caption && (
                  <h3 className="font-serif text-lg font-bold mt-4 uppercase">{modernImages.botanicalStudy.context.caption}</h3>
                )}
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-12">
              <div className="group animate-luxury-fade [animation-delay:300ms]">
                <div className="relative aspect-square overflow-hidden rounded-sm bg-[#C41E3A] mb-6">
                  {modernImages.digitalCouture ? (
                    <img src={modernImages.digitalCouture.url} alt="Digital Couture" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                  ) : (
                    <ImagePlaceholder size="lg" />
                  )}
                </div>
                {modernImages.digitalCouture?.context?.caption && (
                  <h3 className="font-serif text-lg font-bold mt-4 uppercase">{modernImages.digitalCouture.context.caption}</h3>
                )}
              </div>

              <div className="group animate-luxury-fade [animation-delay:600ms]">
                <div className="relative aspect-[5/9] overflow-hidden rounded-sm bg-white mb-6">
                  {modernImages.pastelDreams ? (
                    <img src={modernImages.pastelDreams.url} alt="Pastel Dreams" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                  ) : (
                    <ImagePlaceholder size="lg" />
                  )}
                  <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur px-2 py-1 text-[8px] font-bold tracking-widest border border-ink/5">05</div>
                </div>
                {modernImages.pastelDreams?.context?.caption && (
                  <h3 className="font-serif text-lg font-bold mt-4 uppercase">{modernImages.pastelDreams.context.caption}</h3>
                )}
              </div>
            </div>
          </div>

          <div className="mt-24 text-center">
            <button className="px-12 py-4 border border-[#1A1915] text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-[#1A1915] hover:text-white transition-all duration-500">
              View All Works
            </button>
          </div>
        </section>
      </div>
    );
  }

  // Common Layout for all collections...
  return (
    <div className={`min-h-screen ${isTraditional ? 'bg-[#FBFBF8] text-[#1A1915]' : 'bg-luxury-black text-white'}`}>
      {/* Header Section */}
      <header className="pt-32 pb-12 px-6 md:px-12 max-w-[1400px] mx-auto">
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
                      {img.context?.caption && (
                        <h3 className="font-serif text-lg md:text-xl font-medium mb-1">
                          {img.context.caption}
                        </h3>
                      )}
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
