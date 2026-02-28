import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, Search, Heart } from 'lucide-react';

interface CloudinaryImage {
  publicId: string;
  url: string;
  tags: string[];
}

interface CollectionItem {
  id: string;
  title: string;
  image: string;
  tagline?: string;
}

export default function Collections() {
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('ALL WORKS');

  const categories = ['ALL SEASONS', 'HIGH SUMMER', 'PRE-FALL', 'RESORT', 'BRIDAL'];

  const collectionTypes = [
    { id: 'traditional', title: 'TRADITIONAL' },
    { id: 'modern', title: 'MODERN' },
    { id: 'themed', title: 'THEMED' },
  ];


  useEffect(() => {
    const fetchAndGroupImages = async () => {
      try {
        const response = await fetch('/api/images');
        if (response.ok) {
          const allImages: CloudinaryImage[] = await response.json();

          const dynamicCollections = collectionTypes.map(type => {
            const typeImage = allImages.find(img =>
              img.tags.some(tag => tag.toLowerCase() === type.id)
            );

            return {
              ...type,
              image: typeImage ? typeImage.url : null
            };
          });

          setCollections(dynamicCollections);
        }
      } catch (error) {
        console.error('Error fetching collections:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndGroupImages();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-luxury-black flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-luxury-gold animate-spin opacity-20" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-black text-white pt-32 pb-20">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-24">
        <h4 className="text-luxury-gold text-xs tracking-[0.4em] uppercase font-semibold mb-6 animate-luxury-fade">The Archives</h4>
        <h1 className="font-serif text-5xl md:text-7xl uppercase tracking-[0.1em] mb-8 animate-luxury-fade [animation-delay:200ms]">Editorial Collections</h1>
        <p className="text-luxury-muted text-sm max-w-2xl mx-auto font-light leading-relaxed animate-luxury-fade [animation-delay:400ms]">
          Explore the defining moments of Catherine Nixon. Each collection represents a unique chapter in our journey of redefining modern luxury through silhouette, texture, and emotion.
        </p>
        <div className="w-24 h-px bg-luxury-gold mx-auto mt-12 animate-luxury-fade [animation-delay:600ms]"></div>
      </div>

      {/* Featured Big Section (L'Hiver Éternel style) */}
      <div className="relative aspect-[21/9] overflow-hidden group luxury-border bg-luxury-dark/30">
        {collections.find(c => c.id === 'traditional')?.image ? (
          <img
            src={collections.find(c => c.id === 'traditional')?.image}
            alt="Traditional Collection"
            className="w-full h-full object-cover opacity-60 transition-transform duration-[2s] group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-luxury-dark via-luxury-black to-luxury-gold/5 flex items-center justify-center">
            <span className="text-luxury-gold/10 font-serif text-2xl tracking-[1em] uppercase">Archive Series</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/80 via-transparent to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-center p-12 lg:p-20">
          <span className="bg-luxury-gold/20 backdrop-blur-md text-luxury-gold text-[8px] tracking-[0.4em] uppercase font-bold py-1 px-3 w-fit mb-6 border border-luxury-gold/30">
            Latest Arrival
          </span>
          <h2 className="font-serif text-5xl lg:text-7xl mb-4 italic tracking-tight">Héritage</h2>
          <p className="text-luxury-muted text-xs tracking-[0.3em] font-light uppercase">Traditional / Haute Couture</p>
          <Link to="/collections/traditional" className="mt-12 w-fit border-b border-white pb-2 text-[10px] tracking-[0.4em] uppercase font-bold hover:text-luxury-gold hover:border-luxury-gold transition-all duration-300">
            Discover
          </Link>
        </div>
      </div>

      {/* Filter Navigation */}
      <div className="max-w-7xl mx-auto px-6 mb-20 flex flex-wrap justify-center gap-x-12 gap-y-6">
        {['ALL WORKS', 'TRADITIONAL', 'MODERN', 'THEMED'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-[10px] tracking-[0.4em] font-bold uppercase transition-all duration-300 relative py-2 ${activeCategory === cat ? 'text-luxury-gold' : 'text-luxury-muted hover:text-white'
              }`}
          >
            {cat}
            <span className={`absolute bottom-0 left-0 w-full h-px bg-luxury-gold transition-transform duration-500 origin-left ${activeCategory === cat ? 'scale-x-100' : 'scale-x-0'
              }`}></span>
          </button>
        ))}
      </div>

      {/* Season Grid (Overlay Style) */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {collections
          .filter(collection =>
            activeCategory === 'ALL WORKS' ||
            collection.title === activeCategory
          )
          .map((collection) => (
            <Link
              key={collection.id}
              to={`/collections/${collection.id}`}
              className="relative aspect-square overflow-hidden group luxury-border bg-luxury-dark/50"
            >
              {collection.image ? (
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 opacity-70 group-hover:opacity-90 grayscale-[20%] group-hover:grayscale-0"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-luxury-dark/80 via-luxury-black to-luxury-gray">
                  <span className="text-luxury-gold/5 font-serif text-3xl tracking-[1em] uppercase -rotate-45">Editorial</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="font-serif text-4xl lg:text-6xl tracking-[0.1em] text-white opacity-90 transition-all duration-700 group-hover:scale-95 group-hover:tracking-[0.2em]">
                  {collection.title}
                </h3>
              </div>
              {/* Corner details */}
              <div className="absolute bottom-10 left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform translate-y-4 group-hover:translate-y-0">
                <span className="text-[10px] tracking-[0.4em] uppercase font-bold border-b border-luxury-gold pb-1 italic">
                  Explore Series
                </span>
              </div>
            </Link>
          ))}
      </div>
    </div >
  );
}
