import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import ImagePlaceholder from '../components/ImagePlaceholder';

interface CloudinaryImage {
  publicId: string;
  url: string;
  tags: string[];
  context?: Record<string, string>;
  createdAt: string;
}

interface CollectionItem {
  id: string;
  title: string;
  desc: string;
  image: string | null;
  fallbackImage: string;
}

export default function Collections() {
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [recentAdditions, setRecentAdditions] = useState<CloudinaryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const collectionTypes = [
    { 
      id: 'traditional', 
      title: 'Traditional', 
      desc: 'TIMELESS ELEGANCE & CRAFT',
      fallbackImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800'
    },
    { 
      id: 'modern', 
      title: 'Modern', 
      desc: 'AVANT-GARDE MINIMALISM',
      fallbackImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800'
    },
    { 
      id: 'themed', 
      title: 'Themed', 
      desc: 'NARRATIVE & CONCEPT PIECES',
      fallbackImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800'
    },
  ];

  useEffect(() => {
    const fetchAndGroupImages = async () => {
      try {
        const response = await fetch('/api/images');
        if (response.ok) {
          const allImages: CloudinaryImage[] = await response.json();

          // Map the collections
          const dynamicCollections = collectionTypes.map(type => {
            const typeImage = allImages.find(img =>
              img.tags.some(tag => tag.toLowerCase() === type.id)
            );
            return {
              ...type,
              image: typeImage ? typeImage.url : null
            };
          });

          // Get 3 most recent images overall
          const recent = [...allImages]
            .filter(img => !img.tags.includes('hero') && !img.tags.includes('portrait'))
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 3);

          setCollections(dynamicCollections);
          setRecentAdditions(recent);
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
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#E9A825] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] relative pt-[140px] pb-24 overflow-hidden">
      
      {/* Background Texture Area */}
      <div className="absolute top-0 left-0 w-full h-[850px] z-0 pointer-events-none">
        <div className="w-full h-full bg-[url('/collections-bg.png')] bg-cover bg-center opacity-40 mix-blend-multiply filter blur-[1px]"></div>
        {/* Gradient fade out to pure bg color */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#FAF8F5]"></div>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 lg:mb-20">
           <h1 className="font-serif text-[56px] md:text-[76px] tracking-tight leading-none text-[#1A1A1A] mb-4">
             Collections
           </h1>
           <p className="text-[#1A1A1A]/80 italic text-[15px] md:text-[17px] font-sans max-w-lg mx-auto leading-relaxed">
             Exploring the boundaries of high fashion through distinct aesthetic paradigms.
           </p>
        </div>

        {/* Collections Display Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-32">
          {collections.map((col) => {
            return (
              <Link to={`/collections/${col.id}`} key={col.id} className="block relative aspect-[3/4] group overflow-hidden bg-[#E2DFD8] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.15)]">
                {col.image ? (
                    <img 
                      src={col.image} 
                      alt={col.title} 
                      className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.03]"
                    />
                ) : (
                    <img 
                      src={col.fallbackImage} 
                      alt={`${col.title} Placeholder`} 
                      className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.03]"
                    />
                )}

                {/* Glassmorphism Text Overlay */}
                <div className="absolute inset-x-0 bottom-0 pt-32 pb-8 px-8 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent backdrop-blur-[2px] flex flex-col items-start translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                  <h2 className="font-serif text-[32px] md:text-[36px] leading-[1.1] text-[#1A1A1A] mb-1">
                    {col.title}
                  </h2>
                  <p className="text-[#6B6B6B] text-[10px] font-bold uppercase tracking-[0.15em] mb-6 font-sans">
                    {col.desc}
                  </p>
                  <span className="text-[#1A1A1A] text-[10px] font-bold uppercase tracking-[0.2em] pb-1 border-b border-[#1A1A1A]/30 group-hover:border-[#1A1A1A] transition-colors">
                    EXPLORE SERIES
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Recent Additions */}
        <div className="pt-8">
          <div className="flex items-center w-full mb-12">
            <h3 className="font-serif text-[36px] text-[#1A1A1A] shrink-0">
              Recent Additions
            </h3>
            <div className="flex-grow h-px bg-[#1A1A1A]/10 mx-6"></div>
            <Link to="#" className="text-[#1A1A1A] text-[10px] font-bold uppercase tracking-[0.2em] font-sans hover:text-[#E9A825] transition-colors shrink-0">
              VIEW ALL
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
             {recentAdditions.map((img) => {
               const collectionTag = img.tags.find(tag => tag === 'traditional' || tag === 'modern' || tag === 'themed');
               
               let descText = "";
               if (collectionTag === 'traditional') descText = "An exploration of fluid motion and light interaction on heavy charcoal silk.";
               else if (collectionTag === 'modern') descText = "Sculptural silhouettes meeting the delicate wrist, part of our Modernist series.";
               else if (collectionTag === 'themed') descText = "Deep textured velvet embroidery inspired by nocturnal urban landscapes.";
               else descText = "A recent addition to our curated archives.";

               const finalDesc = img.context?.description || descText;

               return (
                 <div key={img.publicId} className="group cursor-pointer flex flex-col">
                    <div className="aspect-[4/5] bg-[#E2DFD8] overflow-hidden mb-6 relative">
                       <img 
                         src={img.url} 
                         alt={img.context?.caption || 'Artwork'} 
                         className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                       />
                    </div>
                    <div>
                      <h4 className="font-serif text-[24px] text-[#1A1A1A] mb-2 group-hover:text-[#6B6B6B] transition-colors">
                        {img.context?.caption || 'Untitled Edition'}
                      </h4>
                      <p className="text-[#6B6B6B] text-[13px] leading-relaxed font-sans max-w-[90%]">
                        {finalDesc}
                      </p>
                    </div>
                 </div>
               )
             })}
             
             {recentAdditions.length === 0 && (
                <div className="col-span-3 text-center py-10 text-[#6B6B6B] text-[13px] font-sans">
                  No artworks found in the archive yet.
                </div>
             )}
          </div>
        </div>

      </div>
    </div>
  );
}
