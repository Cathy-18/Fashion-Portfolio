import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loader2, ArrowLeft, X } from 'lucide-react';
import ImagePlaceholder from '../components/ImagePlaceholder';

interface CloudinaryImage {
  publicId: string;
  url: string;
  tags: string[];
  context: { caption?: string; description?: string };
}

export default function CollectionDetail() {
  const { id } = useParams();
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const categoryLabels: Record<string, string> = {
    'traditional': 'Traditional',
    'modern': 'Modern',
    'themed': 'Themed'
  };

  const categoryDescriptions: Record<string, string> = {
    'traditional': 'A curated selection of timeless elegance and craftsmanship, honoring heritage silhouettes with contemporary luxury fabrics. Each piece is a testament to the art of bespoke tailoring.',
    'modern': 'Avant-garde minimalism exploring structure and void. This series challenges conventional volume through innovative draping and stark architectural lines.',
    'themed': 'Concept-driven narrative pieces exploring specific aesthetic paradigms. Each work in this collection is a standalone exploration of texture and motif.'
  };

  const currentCategory = id ? categoryLabels[id.toLowerCase()] || id.replace('-', ' ') : 'Collection';
  const currentDescription = id ? categoryDescriptions[id.toLowerCase()] || categoryDescriptions['traditional'] : categoryDescriptions['traditional'];

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
        console.error('Error fetching collection images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeasonImages();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#E9A825] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] relative selection:bg-[#F05A28] selection:text-white pb-24">
      {/* Top Background Texture Area */}
      <div className="absolute top-0 left-0 w-full h-[600px] sm:h-[850px] z-0 pointer-events-none">
        <div className="w-full h-full bg-[url('/collections-bg.png')] bg-cover bg-center opacity-40 mix-blend-multiply filter blur-[1px]"></div>
        {/* Gradient fade out to pure bg color */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#FAF8F5]"></div>
      </div>

      {/* Bronze Gradient Background (Lower half of page) */}
      <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-[#B3815D] to-[#FAF8F5] z-0 pointer-events-none"></div>

      <div className="relative z-10 max-w-[1400px] mx-auto">
        {/* Header Section */}
        <header className="pt-[140px] pb-16 px-6 md:px-12">
          <div className="flex flex-col mb-16">
             <Link to="/collections" className="inline-flex items-center gap-2 text-[#1A1A1A] text-[11px] font-bold uppercase tracking-[0.15em] hover:text-[#F05A28] transition-colors mb-12 w-fit">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Collections
             </Link>
             
             <h1 className="font-serif text-[48px] md:text-[80px] font-bold text-[#1A1A1A] leading-[1] tracking-tight mb-8">
                {currentCategory} <span className="italic font-normal text-[#F05A28]">Collection</span>
             </h1>

             {/* White Description Block */}
             <div className="bg-white p-8 md:p-10 rounded-[8px] max-w-2xl shadow-sm">
                <p className="text-[#6B6B6B] text-[14px] md:text-[15px] font-sans leading-relaxed">
                  {currentDescription}
                </p>
             </div>
          </div>
        </header>

        {/* Gallery Section */}
        <section className="px-6 md:px-12 pb-16">
          {images.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {images.map((img, index) => {
                return (
                  <div
                    key={img.publicId}
                    className="group cursor-pointer flex flex-col"
                    onClick={() => setLightboxImage(img.url)}
                  >
                    <div className="relative overflow-hidden bg-[#E2DEE4] rounded-[16px] mb-6 aspect-[3/4]">
                      <img
                        src={img.url}
                        alt={img.context?.caption || `Artwork ${index + 1}`}
                        className="w-full h-full object-cover object-center transition-transform duration-[1.5s] group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col px-1">
                      <h3 className="font-serif font-bold text-[22px] md:text-[24px] text-[#1A1A1A] mb-2 group-hover:text-[#F05A28] transition-colors">
                         {img.context?.caption || 'Untitled Edition'}
                      </h3>
                      {img.context?.description ? (
                         <p className="font-sans italic text-[#6B6B6B] text-[13px] leading-relaxed">
                           {img.context.description}
                         </p>
                      ) : (
                         <p className="font-sans italic text-[#6B6B6B] text-[13px] leading-relaxed opacity-60">
                           Exquisite detailing and structure.
                         </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-32 text-center bg-white/50 backdrop-blur-sm rounded-[24px]">
              <h2 className="font-serif text-[32px] md:text-[40px] font-bold text-[#1A1A1A] mb-4">No works found</h2>
              <p className="text-[#6B6B6B] text-[15px] font-sans max-w-md mx-auto mb-10">
                The {currentCategory} collection is currently being curated and will be updated shortly.
              </p>
              <Link to="/collections" className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white text-[12px] font-bold uppercase tracking-[0.15em] px-8 py-4 rounded-full hover:bg-[#F05A28] shadow-sm transition-all">
                Return to Catalog
              </Link>
            </div>
          )}
        </section>

        {/* Lightbox */}
        {lightboxImage && (
          <div
            className="fixed inset-0 z-[100] bg-[#FAF8F5]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-[#1A1A1A] hover:text-[#F05A28] hover:bg-black/5 rounded-full p-3 transition-colors"
              onClick={() => setLightboxImage(null)}
            >
              <X className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
            </button>
            <img
              src={lightboxImage}
              alt="Full view"
              className="max-h-[90vh] max-w-[95vw] object-contain shadow-2xl rounded-[12px]"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

      </div>
    </div>
  );
}
