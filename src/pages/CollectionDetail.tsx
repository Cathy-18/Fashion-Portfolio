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

  const seasonLabels: Record<string, string> = {
    'winter': 'Winter',
    'autumn': 'Autumn',
    'spring': 'Spring',
    'summer': 'Summer'
  };

  const currentSeason = id ? seasonLabels[id] || id : 'Seasonal';

  useEffect(() => {
    const fetchSeasonImages = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/images');
        if (response.ok) {
          const allImages: CloudinaryImage[] = await response.json();
          // Filter images that have the specific seasonal tag
          const filtered = allImages.filter(img =>
            img.tags.some(tag => tag.toLowerCase() === id?.toLowerCase())
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
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-luxury-dark">
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/40 to-luxury-black/80"></div>
          {images.length > 0 && (
            <img
              src={images[0].url}
              alt="Hero background"
              className="w-full h-full object-cover opacity-40"
            />
          )}
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-32">
          <h4 className="text-luxury-gold text-xs tracking-[0.4em] uppercase font-medium mb-8">
            {currentSeason} Collection
          </h4>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl mb-6 tracking-widest text-white uppercase">
            {currentSeason}
            <br />
            <span className="italic text-luxury-gold lowercase font-light tracking-normal">Reverie</span>
          </h1>
          <p className="text-luxury-muted text-lg md:text-xl tracking-wide mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            An exploration of seasonal transition and refined aesthetics. This collection embodies the spirit of {currentSeason} through curated silhouettes and palettes.
          </p>
          <div className="w-px h-24 bg-luxury-gold mx-auto animate-pulse"></div>
        </div>
      </section>

      {/* Gallery of Looks */}
      {images.length > 0 ? (
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-6">
            <h2 className="font-serif text-4xl italic text-white">The <span className="text-luxury-gold">Looks</span></h2>
            <p className="text-luxury-muted text-xs tracking-[0.2em] uppercase">{images.length} Curated Pieces</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {images.map((img, index) => (
              <div key={img.publicId} className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-luxury-dark border border-white/5 mb-6">
                  <img
                    src={img.url}
                    alt={`Look ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 border border-white/10">
                    <span className="font-serif text-sm italic text-luxury-gold">Look {(index + 1).toString().padStart(2, '0')}</span>
                  </div>
                </div>
                <h3 className="font-serif text-xl tracking-wide text-white group-hover:text-luxury-gold transition-colors">
                  {currentSeason} Masterpiece
                </h3>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="py-48 px-6 text-center">
          <div className="max-w-md mx-auto">
            <Grid className="w-12 h-12 text-luxury-gold/20 mx-auto mb-6" />
            <h2 className="font-serif text-3xl mb-4 italic">Awaiting the Season</h2>
            <p className="text-luxury-muted font-light leading-relaxed">
              Our {currentSeason} curation is currently in the atelier. Please check back soon for the full collection reveal.
            </p>
            <Link to="/collections" className="inline-block mt-12 text-xs tracking-widest uppercase border-b border-luxury-gold pb-1 hover:text-luxury-gold transition-colors">
              Explore Other Collections
            </Link>
          </div>
        </section>
      )}

      {/* Navigation Footer */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/collections" className="group flex items-center gap-6">
            <ArrowLeft className="w-6 h-6 text-luxury-muted group-hover:text-luxury-gold transition-colors" />
            <div>
              <p className="text-luxury-gold text-xs tracking-[0.2em] uppercase font-medium mb-2">Portfolio</p>
              <p className="font-serif text-2xl italic text-white group-hover:text-luxury-gold transition-colors">View All Collections</p>
            </div>
          </Link>

          <Link to="/collections" className="w-12 h-12 flex items-center justify-center border border-white/20 hover:border-luxury-gold text-luxury-muted hover:text-luxury-gold transition-colors">
            <Grid className="w-5 h-5" />
          </Link>

          <Link to="/contact" className="group flex items-center gap-6 text-right">
            <div>
              <p className="text-luxury-gold text-xs tracking-[0.2em] uppercase font-medium mb-2">Inquiry</p>
              <p className="font-serif text-2xl italic text-white group-hover:text-luxury-gold transition-colors">Contact Atelier</p>
            </div>
            <ArrowRight className="w-6 h-6 text-luxury-muted group-hover:text-luxury-gold transition-colors" />
          </Link>
        </div>
      </section>
    </div>
  );
}
