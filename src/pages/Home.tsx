import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';

interface CloudinaryImage {
  publicId: string;
  url: string;
  tags: string[];
}

export default function Home() {
  const [featuredCollections, setFeaturedCollections] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const defaultFeatured = [
    {
      id: 'winter',
      title: 'Winter',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'spring',
      title: 'Spring',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68ec25d43d?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'summer',
      title: 'Summer',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800',
    },
  ];

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch('/api/images');
        if (response.ok) {
          const allImages: CloudinaryImage[] = await response.json();

          const dynamicFeatured = defaultFeatured.map(item => {
            const seasonImage = allImages.find(img =>
              img.tags.some(tag => tag.toLowerCase() === item.id)
            );
            return {
              ...item,
              image: seasonImage ? seasonImage.url : item.image
            };
          });

          setFeaturedCollections(dynamicFeatured);
        }
      } catch (error) {
        console.error('Error fetching featured images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <div className="min-h-screen bg-luxury-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-luxury-dark">
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/50 via-transparent to-luxury-black"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl mb-6 tracking-tight text-white drop-shadow-2xl">
            <span className="italic font-light">Elara</span> Vogue
          </h1>
          <p className="text-luxury-muted text-lg md:text-xl tracking-wide mb-12 max-w-2xl font-light">
            Elegance Redefined for the Modern Era.
          </p>
          <Link
            to="/collections"
            className="group relative inline-flex items-center justify-center px-10 py-4 border border-luxury-gold text-luxury-gold text-sm tracking-[0.2em] uppercase font-medium overflow-hidden transition-all duration-500 hover:text-luxury-black"
          >
            <span className="absolute inset-0 w-full h-full bg-luxury-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            <span className="relative z-10">View Collections</span>
          </Link>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-6">
          <h2 className="font-serif text-4xl md:text-5xl italic text-white">Featured Collections</h2>
          <Link to="/collections" className="text-luxury-gold text-xs tracking-[0.2em] uppercase font-medium flex items-center gap-2 hover:text-white transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="w-10 h-10 text-luxury-gold animate-spin opacity-20" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCollections.map((collection, index) => (
              <Link
                key={collection.id}
                to={`/collections/${collection.id}`}
                className={`group relative overflow-hidden bg-luxury-dark aspect-[3/4] ${index === 1 ? 'md:translate-y-12' : ''
                  }`}
              >
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="font-serif text-3xl italic text-white mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {collection.title}
                  </h3>
                  <div className="w-12 h-px bg-luxury-gold transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100"></div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* The Craft Section */}
      <section className="py-32 px-6 bg-luxury-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <h4 className="text-luxury-gold text-xs tracking-[0.3em] uppercase font-medium mb-6">The Craft</h4>
            <h2 className="font-serif text-5xl md:text-6xl leading-tight mb-8">
              Where tradition meets <span className="italic text-luxury-muted">innovation.</span>
            </h2>
            <p className="text-luxury-muted text-lg leading-relaxed mb-12 max-w-lg font-light">
              Every garment is a testament to the meticulous skill of our artisans. From the initial sketch to the final stitch, we embody the pinnacle of sartorial excellence.
            </p>
            <Link
              to="/atelier"
              className="inline-flex items-center gap-4 text-white text-xs tracking-[0.2em] uppercase font-medium border-b border-luxury-gold pb-2 hover:text-luxury-gold transition-colors"
            >
              Discover the Atelier <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="aspect-[4/5] overflow-hidden bg-luxury-gray">
              <div className="w-full h-full bg-white/5 animate-pulse"></div>
            </div>
            <div className="absolute -inset-4 border border-white/10 z-0 pointer-events-none hidden md:block"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
