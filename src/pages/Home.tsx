import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2, Check } from 'lucide-react';

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

  const bespokeServices = [
    {
      name: 'Consultation',
      price: '$250',
      unit: '/ session',
      features: ['Personal Style Assessment', 'Complete Wardrobe Edit', 'Color Analysis'],
      cta: 'Book Now',
      highlight: false
    },
    {
      name: 'Bespoke',
      price: '$2,500+',
      unit: '/ garment',
      features: ['Custom Design Sketching', 'Premium Fabric Sourcing', '3 Private Fittings', 'Hand-finished Details'],
      cta: 'Inquire',
      highlight: true
    },
    {
      name: 'Bridal',
      price: '$5,000+',
      unit: '/ gown',
      features: ['Full Design Consultation', 'Muslin Toile Fitting', 'Unlimited Alterations', 'Veil Coordination'],
      cta: 'Inquire',
      highlight: false
    }
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
    <div className="min-h-screen bg-luxury-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-luxury-black">
          {heroImage ? (
            <img
              src={heroImage}
              alt="Hero background"
              className="w-full h-full object-cover opacity-60"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-luxury-dark via-luxury-black to-luxury-gold/5 opacity-40"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/30 via-transparent to-luxury-black"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto flex flex-col items-center">
          <h2 className="text-luxury-gold text-xs tracking-[0.4em] uppercase font-semibold mb-6 animate-luxury-fade">
            Luxury Prêt-à-Porter
          </h2>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-[10rem] mb-12 tracking-tight text-white leading-none uppercase animate-luxury-fade [animation-delay:200ms]">
            Catherine
            <br />
            <span className="italic">Nixon</span>
          </h1>
          <Link
            to="/collections"
            className="group relative inline-flex items-center justify-center px-12 py-4 border border-luxury-gold text-white text-[10px] tracking-[0.4em] uppercase font-bold overflow-hidden transition-all duration-700 animate-luxury-fade [animation-delay:400ms]"
          >
            <span className="absolute inset-0 w-full h-full bg-luxury-gold -translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out"></span>
            <span className="relative z-10 group-hover:text-luxury-black">View Collections</span>
          </Link>
        </div>
      </section>

      {/* Latest Editorial Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-24">
          <h4 className="text-luxury-gold text-xs tracking-[0.4em] uppercase font-semibold mb-8">Latest Editorial</h4>
          <h2 className="font-serif text-5xl md:text-6xl leading-[1.1] mb-12 italic">
            Exploring the boundaries of <span className="text-luxury-muted font-normal not-italic">modern silhouette</span> and timeless elegance.
          </h2>
          <Link to="/collections" className="group flex items-center gap-4 text-white text-[10px] tracking-[0.3em] uppercase font-bold hover:text-luxury-gold transition-colors">
            View Lookbook <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="w-10 h-10 text-luxury-gold animate-spin opacity-20" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {featuredCollections.map((collection, index) => (
              <Link
                key={collection.id}
                to={`/collections/${collection.id}`}
                className={`group relative ${index === 1 ? 'md:scale-110 md:z-10' : ''}`}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-luxury-dark/50 mb-6 border border-white/5 group-hover:border-luxury-gold/30 transition-colors">
                  {collection.image ? (
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-luxury-dark to-luxury-black">
                      <span className="text-luxury-gold/20 font-serif text-3xl tracking-[1em] uppercase -rotate-12">CN</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700"></div>
                  <div className="absolute bottom-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0 duration-500">
                    <ArrowRight className="w-6 h-6 rotate-[-45deg]" />
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-2xl tracking-widest text-white mb-2 group-hover:text-luxury-gold transition-colors italic">
                    {collection.title}
                  </h3>
                  <p className="text-luxury-muted text-[10px] tracking-[0.3em] uppercase group-hover:text-white transition-colors">
                    {collection.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* The Atelier Bespoke Section */}
      <section className="py-32 px-6 bg-luxury-dark/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h4 className="text-luxury-gold text-xs tracking-[0.4em] uppercase font-semibold mb-6">The Atelier</h4>
            <h2 className="font-serif text-5xl md:text-6xl uppercase tracking-widest leading-none">Bespoke Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bespokeServices.map((service) => (
              <div
                key={service.name}
                className={`flex flex-col p-10 border border-white/5 bg-luxury-black/40 relative group ${service.highlight ? 'ring-1 ring-luxury-gold/50 scale-105 z-10' : ''
                  }`}
              >
                {service.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-luxury-gold text-luxury-black px-4 py-1 text-[10px] font-bold uppercase tracking-widest">
                    Most Popular
                  </span>
                )}
                <h3 className="font-serif text-3xl mb-8 tracking-wide italic">{service.name}</h3>
                <div className="mb-10">
                  <span className="text-5xl font-light text-luxury-gold">{service.price}</span>
                  <span className="text-luxury-muted text-xs lowercase ml-2 italic">{service.unit}</span>
                </div>

                <ul className="space-y-4 mb-12 flex-1">
                  {service.features.map(feature => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-luxury-muted font-light tracking-wide">
                      <Check className="w-4 h-4 text-luxury-gold" />
                      {feature}
                    </li>
                  ))}
                </ul>

              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
