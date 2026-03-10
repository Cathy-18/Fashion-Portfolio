import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, ChevronDown } from 'lucide-react';
import ImagePlaceholder from '../components/ImagePlaceholder';

interface CloudinaryImage {
  publicId: string;
  url: string;
  tags: string[];
}

interface CollectionItem {
  id: string;
  title: string;
  subtitle?: string;
  image: string | null;
}

export default function Collections() {
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const collectionTypes = [
    { id: 'traditional', title: 'Traditional', subtitle: 'Heritage & Craft' },
    { id: 'modern', title: 'Modern', subtitle: 'Minimalist Form' },
    { id: 'themed', title: 'Themed', subtitle: 'Conceptual Series' },
  ];

  const recentAdditions = [
    { id: 'traditional', title: 'Heritage', year: '2024' },
    { id: 'modern', title: 'Minimalist', year: '2023' },
    { id: 'themed', title: 'Conceptual', year: '2022' },
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

  const getImageForId = (id: string) => {
    return collections.find(c => c.id === id)?.image ?? null;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-ink/30 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-off-white text-ink pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Curated Collections Section */}
        <section className="mb-24">
          <p className="text-ink/50 text-xs tracking-[0.3em] uppercase font-medium text-center mb-4">
            Select a Portfolio
          </p>
          <h1 className="font-serif text-4xl md:text-5xl italic text-ink text-center mb-16">
            Curated Collections
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                to={`/collections/${collection.id}`}
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-beige shadow-sm mb-6 group-hover:opacity-95 transition-opacity">
                  {collection.image ? (
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <ImagePlaceholder size="md" />
                  )}
                </div>
                <h3 className="text-ink font-sans text-base font-medium">
                  {collection.title}
                </h3>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="#recent-additions"
              className="inline-flex items-center gap-2 text-ink/50 text-xs tracking-[0.2em] uppercase hover:text-ink transition-colors"
            >
              View Full Archive
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Recent Additions Section */}
        <section id="recent-additions" className="pt-16 border-t border-ink/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
            <h2 className="text-ink font-sans text-lg font-medium tracking-wide">
              Recent Additions
            </h2>
            <Link
              to="/collections"
              className="text-ink/50 text-xs tracking-[0.2em] uppercase hover:text-ink transition-colors"
            >
              Explore Gallery
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            {recentAdditions.map((item) => {
              const image = getImageForId(item.id);
              return (
                <Link
                  key={item.id}
                  to={`/collections/${item.id}`}
                  className="group"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-beige shadow-sm mb-6 group-hover:opacity-95 transition-opacity">
                    {image ? (
                      <img
                        src={image}
                        alt={item.title}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <ImagePlaceholder size="md" />
                    )}
                  </div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-ink font-sans text-base font-medium">
                      {item.title}
                    </h3>
                    <span className="text-ink/50 text-xs font-medium">
                      {item.year}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
