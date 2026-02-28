import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface CloudinaryImage {
  publicId: string;
  url: string;
  tags: string[];
}

export default function Home() {
  const [featuredCollections, setFeaturedCollections] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [heroImage, setHeroImage] = useState<string | null>(null);

  const defaultFeatured = [
    {
      id: 'traditional',
      title: 'Traditional',
      subtitle: 'Heritage & Craft',
      image: null,
    },
    {
      id: 'modern',
      title: 'Modern',
      subtitle: 'Minimalist Form',
      image: null,
    },
    {
      id: 'themed',
      title: 'Themed',
      subtitle: 'Conceptual Series',
      image: null,
    },
  ];

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch('/api/images');
        if (response.ok) {
          const allImages: CloudinaryImage[] = await response.json();

          const heroAsset = allImages.find(img =>
            img.tags.some(tag => tag.toLowerCase() === 'hero')
          );
          if (heroAsset) setHeroImage(heroAsset.url);

          const dynamicFeatured = defaultFeatured.map(item => {
            const seasonImage = allImages.find(img =>
              img.tags.some(tag => tag.toLowerCase() === item.id)
            );
            return {
              ...item,
              image: seasonImage ? seasonImage.url : null
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
    <div className="min-h-screen bg-cream text-ink">
      {/* Hero Section - 60/40 split */}
      <section className="relative min-h-[85vh] flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left column - text (60%) */}
          <div className="flex-1 lg:flex-[6] max-w-2xl">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight text-ink mb-8">
              Catherine Nixon
            </h1>
            <p className="text-ink/80 text-base md:text-lg leading-relaxed mb-10 max-w-lg">
              Defining modern luxury through meticulous craftsmanship and sustainable innovation. Every stitch tells a story of elegance and architectural fluidity.
            </p>
            <Link
              to="/collections"
              className="inline-block px-10 py-3 bg-beige border border-beige-dark rounded-full text-ink text-xs tracking-[0.3em] uppercase font-semibold hover:bg-beige-dark transition-colors"
            >
              View Collections
            </Link>
          </div>

          {/* Right column - hero image (40%) */}
          <div className="flex-1 lg:flex-[4] w-full max-w-xl">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-sm bg-beige">
              {heroImage ? (
                <img
                  src={heroImage}
                  alt="Hero"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-beige to-beige-dark">
                  <span className="text-ink/20 font-serif text-4xl tracking-[0.5em] uppercase">CN</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Selected Works */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-ink text-sm tracking-[0.3em] uppercase font-semibold mb-2">
              Selected Works
            </h2>
            <p className="text-ink/60 text-xs tracking-[0.2em] uppercase">
              Latest Editorial
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-24">
              <Loader2 className="w-10 h-10 text-ink/40 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
              {featuredCollections.map((collection) => (
                <Link
                  key={collection.id}
                  to={`/collections/${collection.id}`}
                  className="group"
                >
                  <div className="relative aspect-square overflow-hidden bg-beige rounded-sm mb-4 group-hover:opacity-95 transition-opacity">
                    {collection.image ? (
                      <img
                        src={collection.image}
                        alt={collection.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-beige to-beige-dark">
                        <span className="text-ink/20 font-serif text-3xl tracking-[0.5em] uppercase">CN</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-ink font-serif text-lg font-semibold mb-1">
                    {collection.title}
                  </h3>
                  <p className="text-ink/60 text-xs tracking-[0.2em] uppercase">
                    {collection.subtitle}
                  </p>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/collections"
              className="text-ink text-xs tracking-[0.3em] uppercase font-medium border-b border-ink/30 hover:border-ink transition-colors"
            >
              View Complete Archive
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl italic text-ink leading-relaxed mb-6">
            An artist captures the time in which he lives. All the great fashion illustrators did this.
          </blockquote>
          <cite className="text-ink/70 text-sm tracking-[0.2em] not-italic">
            — David Downton
          </cite>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-beige rounded-sm p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex-1 max-w-xl flex items-center">
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-ink">
                Let&apos;s Create Something Beautiful
              </h2>
            </div>
            <Link
              to="/contact"
              className="shrink-0 px-10 py-3 bg-beige-dark border border-ink/10 rounded-full text-ink text-xs tracking-[0.3em] uppercase font-semibold hover:bg-ink/10 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
