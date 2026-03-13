import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import ImagePlaceholder from '../components/ImagePlaceholder';

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
      subtitle: 'LEGACY & CRAFT',
      image: null,
    },
    {
      id: 'modern',
      title: 'Modern',
      subtitle: 'STRUCTURAL AVANT-GARDE',
      image: null,
    },
    {
      id: 'themed',
      title: 'Themed',
      subtitle: 'CONCEPT NARRATIVE',
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
          if (heroAsset) {
            setHeroImage(heroAsset.url);
          } else {
            try {
              const portraitRes = await fetch('/api/portrait');
              if (portraitRes.ok) {
                const portrait = await portraitRes.json();
                if (portrait?.url) setHeroImage(portrait.url);
              }
            } catch {
                // fallthrough
            }
          }

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
    <div className="min-h-screen bg-white text-[#1A1A1A] pt-[120px] relative">
      {/* Background Texture Area */}
      <div className="absolute top-0 left-0 w-full h-[600px] sm:h-[850px] z-0 pointer-events-none">
        <div className="w-full h-full bg-[url('/collections-bg.png')] bg-cover bg-center opacity-40 mix-blend-multiply filter blur-[1px]"></div>
        {/* Gradient fade out to pure bg color */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-white"></div>
      </div>
      
      {/* Hero Section */}
      <section className="px-6 pb-20 max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-[700px] gap-6">
          {/* Left Block */}
          <div className="relative h-full w-full bg-[#E5D8C5] overflow-hidden flex items-center justify-center p-8 lg:p-16">
            <div className="absolute inset-0">
               <div className="w-full h-full bg-[url('/collections-bg.png')] bg-cover bg-center opacity-40 mix-blend-multiply filter blur-[2px]"></div>
            </div>
            
            {/* Text Card over Left Block */}
            <div className="relative z-10 w-[85%] max-w-md bg-[#EFE8DE]/95 backdrop-blur-sm p-12 md:p-14 text-center flex flex-col items-center">
              <h1 className="font-serif text-[42px] md:text-[50px] leading-[1.1] mb-6 text-[#1A1A1A]">
                The Art of <br />
                <span className="italic">Modern Elegance</span>
              </h1>
              <p className="text-[#6B6B6B] text-[13px] leading-[1.8] mb-10 font-sans">
                Defining luxury through a lens of timeless craftsmanship and contemporary silhouettes. Explore a curated collection of fashion-forward narratives.
              </p>
              <Link 
                to="/collections" 
                className="inline-block border border-[#1A1A1A]/30 text-[#1A1A1A] text-[10px] font-bold uppercase tracking-[0.2em] px-8 py-3.5 hover:bg-[#1A1A1A] hover:text-white transition-colors"
              >
                VIEW COLLECTIONS
              </Link>
            </div>
          </div>
          
          {/* Right Block */}
          <div className="relative h-full w-full bg-[#E5DFD5] overflow-hidden flex items-center justify-center">
             {heroImage ? (
                <img
                  src={heroImage}
                  alt="Hero"
                  className="w-full h-full object-cover"
                />
             ) : (
               <div className="absolute inset-0 opacity-40 mix-blend-multiply flex items-center justify-center">
                  <svg viewBox="0 0 800 800" className="w-[150%] h-[150%] text-[#C9BAA3]" fill="currentColor">
                    <path d="M400,200 C500,100 700,300 800,200 L800,800 L0,800 L0,200 C100,300 300,100 400,200 Z" opacity="0.5"/>
                    <path d="M400,300 C600,200 700,400 800,300 L800,800 L0,800 L0,300 C200,400 300,200 400,300 Z" opacity="0.3"/>
                  </svg>
               </div>
             )}
          </div>
        </div>
      </section>

      {/* Selected Works */}
      <section className="py-20 px-6 relative max-w-[1400px] mx-auto">
        <div className="text-center mb-16 relative">
          <h2 className="font-serif text-[38px] text-[#1A1A1A] relative z-10 inline-block bg-white px-8">Selected Works</h2>
          <div className="absolute top-1/2 left-0 w-full h-px bg-black/10 -z-10"></div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-[#E9A825] animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-14 px-0 md:px-12">
            {featuredCollections.map((col, i) => (
              <Link to={`/collections/${col.id}`} key={col.id} className="group relative block pb-10">
                {/* Card Image */}
                <div className="w-full aspect-[3/4] overflow-hidden bg-[#F5F2EA]">
                  {col.image ? (
                      <img 
                        src={col.image} 
                        alt={col.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                  ) : (
                      <div className="h-full w-full flex items-center justify-center">
                         <ImagePlaceholder size="md" />
                      </div>
                  )}
                </div>
                
                {/* Overlapping Text Box */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[85%] bg-white py-6 px-4 text-center shadow-[0_15px_30px_-15px_rgba(0,0,0,0.08)] group-hover:-translate-y-2 transition-transform duration-500">
                  <h3 className="font-serif text-[20px] text-[#1A1A1A] mb-2">{col.title}</h3>
                  <p className="text-[#9A9A9A] text-[9px] font-bold uppercase tracking-[0.2em] font-sans">{col.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <div className="h-20"></div>
    </div>
  );
}
