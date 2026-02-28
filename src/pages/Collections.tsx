import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface CloudinaryImage {
  publicId: string;
  url: string;
  tags: string[];
}

interface CollectionItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export default function Collections() {
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const seasons = [
    { id: 'winter', title: 'Winter', subtitle: 'Frost & Elegance' },
    { id: 'autumn', title: 'Autumn', subtitle: 'Saffron Spirits' },
    { id: 'spring', title: 'Spring', subtitle: 'Floral Awakening' },
    { id: 'summer', title: 'Summer', subtitle: 'Golden Solstice' },
  ];

  // Default placeholders for when no image exists for a season
  const placeholders: Record<string, string> = {
    winter: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800',
    autumn: 'https://images.unsplash.com/photo-1507680434567-5739c8a21e6c?auto=format&fit=crop&q=80&w=800',
    spring: 'https://images.unsplash.com/photo-1490481651871-ab68ec25d43d?auto=format&fit=crop&q=80&w=800',
    summer: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800',
  };

  useEffect(() => {
    const fetchAndGroupImages = async () => {
      try {
        const response = await fetch('/api/images');
        if (response.ok) {
          const allImages: CloudinaryImage[] = await response.json();

          const dynamicCollections = seasons.map(season => {
            // Find the first image that has this season's tag
            const seasonImage = allImages.find(img =>
              img.tags.some(tag => tag.toLowerCase() === season.id.toLowerCase())
            );

            return {
              ...season,
              image: seasonImage ? seasonImage.url : placeholders[season.id]
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
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h4 className="text-luxury-gold text-xs tracking-[0.3em] uppercase font-medium mb-6">Seasonal Masterpieces</h4>
          <h1 className="font-serif text-5xl md:text-7xl italic text-white mb-8">Our Collections</h1>
          <div className="w-24 h-px bg-luxury-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              to={`/collections/${collection.id}`}
              className="group block text-center"
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-8 bg-luxury-dark">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-luxury-black/0 group-hover:bg-luxury-black/20 transition-colors duration-500"></div>
              </div>
              <h3 className="font-serif text-2xl uppercase tracking-widest text-white mb-3">
                {collection.title}
              </h3>
              <p className="text-luxury-gold italic font-serif text-lg">
                {collection.subtitle}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
