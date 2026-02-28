import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Grid, Loader2 } from 'lucide-react';

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
      <div className="min-h-screen bg-luxury-black flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-luxury-gold animate-spin opacity-20" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-black text-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-luxury-dark">
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/60 via-transparent to-luxury-black"></div>
          {images.length > 0 ? (
            <img
              src={images[0].url}
              alt="Hero background"
              className="w-full h-full object-cover opacity-50 animate-luxury-fade scale-105"
            />
          ) : (
            <div className="w-full h-full bg-luxury-dark opacity-40"></div>
          )}
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-32 animate-luxury-fade">
          <h4 className="text-luxury-gold text-xs tracking-[0.5em] uppercase font-bold mb-12 italic border-b border-luxury-gold/20 inline-block pb-2">
            Editorial Series
          </h4>
          <h1 className="font-serif text-6xl md:text-9xl mb-8 tracking-tighter text-white uppercase leading-none">
            {currentCategory}
            <br />
            <span className="italic text-luxury-gold lowercase font-light tracking-widest pl-4">Reverie</span>
          </h1>
          <p className="text-luxury-muted text-base md:text-lg tracking-[0.2em] uppercase mb-16 max-w-2xl mx-auto font-light leading-loose opacity-80">
            An exploration of spectral shifts and structural vulnerability. This series embodies the spirit of our {currentCategory} collection through curated textures and architectural silhouettes.
          </p>
          <div className="w-px h-24 bg-luxury-gold/50 mx-auto animate-pulse"></div>
        </div>
      </section>

      {/* Gallery of Looks */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-24 border-b border-white/5 pb-10">
          <div>
            <h2 className="font-serif text-5xl italic text-white mb-2">The <span className="text-luxury-gold not-italic uppercase tracking-widest text-4xl font-bold">Looks</span></h2>
            <p className="text-luxury-muted text-[10px] tracking-[0.4em] uppercase font-bold italic">Series Archive</p>
          </div>
          <p className="text-luxury-muted text-[10px] tracking-[0.4em] uppercase font-bold border border-white/10 px-4 py-2 rounded-full">{images.length} Curated Pieces</p>
        </div>

        {images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {images.map((img, index) => (
              <div key={img.publicId} className="group animate-luxury-fade" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="relative aspect-[3/4] overflow-hidden bg-luxury-dark border border-white/5 mb-8">
                  <img
                    src={img.url}
                    alt={`Look ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700"></div>
                  <div className="absolute top-6 left-6 luxury-glass px-4 py-1.5 border border-white/10">
                    <span className="font-serif text-sm italic text-luxury-gold">No. {(index + 1).toString().padStart(2, '0')}</span>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-2xl tracking-widest text-white group-hover:text-luxury-gold transition-colors mb-2 italic lowercase">
                      {currentCategory} Masterpiece
                    </h3>
                    <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-luxury-muted group-hover:text-white transition-colors duration-500">
                      Hand-Tailored Silhouette
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-48 text-center bg-luxury-dark/20 border border-white/5 rounded-3xl">
            <Grid className="w-16 h-16 text-luxury-gold/10 mx-auto mb-8" />
            <h2 className="font-serif text-4xl mb-6 italic tracking-tight">Atelier is Currently Preparing</h2>
            <p className="text-luxury-muted font-light tracking-widest text-xs uppercase max-w-md mx-auto leading-loose">
              The {currentCategory} curation is currently under development. Please return for the full collection reveal in the coming weeks.
            </p>
            <Link to="/collections" className="inline-block mt-16 text-[10px] tracking-[0.4em] font-bold uppercase border border-luxury-gold px-10 py-4 text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-all duration-700">
              View All Archives
            </Link>
          </div>
        )}
      </section>

      {/* Navigation Footer */}
      <section className="py-32 px-6 border-t border-white/5 bg-luxury-dark/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16 text-center md:text-left">
          <Link to="/collections" className="group flex flex-col md:flex-row items-center gap-8 group">
            <div className="w-16 h-16 border border-white/10 flex items-center justify-center group-hover:border-luxury-gold transition-all duration-700">
              <ArrowLeft className="w-6 h-6 text-luxury-muted group-hover:text-luxury-gold group-hover:-translate-x-2 transition-all duration-700" />
            </div>
            <div>
              <p className="text-luxury-gold text-[10px] tracking-[0.4em] uppercase font-bold mb-3 italic">Portfolio</p>
              <p className="font-serif text-3xl italic text-white group-hover:text-luxury-gold transition-colors duration-500">Return to Archives</p>
            </div>
          </Link>

          <Link to="/contact" className="group flex flex-col md:flex-row items-center gap-8 text-center md:text-right">
            <div className="order-2 md:order-1">
              <p className="text-luxury-gold text-[10px] tracking-[0.4em] uppercase font-bold mb-3 italic">Inquiry</p>
              <p className="font-serif text-3xl italic text-white group-hover:text-luxury-gold transition-colors duration-500">Contact Atelier</p>
            </div>
            <div className="w-16 h-16 border border-white/10 flex items-center justify-center group-hover:border-luxury-gold transition-all duration-700 order-1 md:order-2">
              <ArrowRight className="w-6 h-6 text-luxury-muted group-hover:text-luxury-gold group-hover:translate-x-2 transition-all duration-700" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
