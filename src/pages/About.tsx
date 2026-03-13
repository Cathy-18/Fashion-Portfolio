import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import ImagePlaceholder from '../components/ImagePlaceholder';

interface PortraitData {
  publicId: string;
  url: string;
  context?: {
    title?: string;
    subtitle?: string;
    bio?: string;
  };
}

export default function About() {
  const [portraitContent, setPortraitContent] = useState({
    url: null as string | null,
    title: 'About Me',
    subtitle: "Fashion is the most powerful art there is. It's movement, design, and architecture all in one.",
    bio: 'Founded by visionaries dedicated to the intersection of classic couture and modern aesthetics, Atelier Luxe has spent a decade refining the silhouette of the modern individual. Our process is rooted in sustainable sourcing and meticulous attention to detail.\n\nEvery piece is a dialogue between the fabric and the wearer, designed to transcend seasons and create a lasting impression of refined grace.',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPortrait = async () => {
      try {
        const response = await fetch('/api/portrait');
        if (response.ok) {
          const data: PortraitData = await response.json();
          setPortraitContent(prev => ({
            url: data.url,
            title: prev.title, // keeping "About Me" fixed as requested
            subtitle: data.context?.subtitle || prev.subtitle,
            bio: data.context?.bio || prev.bio,
          }));
        }
      } catch (error) {
        // No portrait yet — defaults remain
      } finally {
        setIsLoading(false);
      }
    };
    fetchPortrait();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A1A] pt-[150px] pb-32 relative">
      {/* Background Texture Area */}
      <div className="absolute top-0 left-0 w-full h-[600px] sm:h-[850px] z-0 pointer-events-none">
        <div className="w-full h-full bg-[url('/collections-bg.png')] bg-cover bg-center opacity-40 mix-blend-multiply filter blur-[1px]"></div>
        {/* Gradient fade out to pure bg color */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#FAF8F5]"></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        <div className="bg-white p-10 md:p-16 lg:p-20 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Text Content */}
          <div className="max-w-lg">
            <h1 className="font-serif text-[38px] md:text-[44px] text-[#1A1A1A] mb-8">
              {portraitContent.title}
            </h1>
            
            <p className="font-sans font-medium italic text-[15px] leading-relaxed text-[#1A1A1A] mb-8">
              "{portraitContent.subtitle}"
            </p>
            
            <div className="space-y-6 text-[#6B6B6B] text-[13px] leading-[1.8] font-sans whitespace-pre-line">
              {portraitContent.bio}
            </div>
          </div>

          {/* Portrait Image */}
          <div className="w-full aspect-square bg-[#E8E6E1] overflow-hidden flex items-center justify-center">
            {isLoading ? (
              <Loader2 className="w-10 h-10 text-[#E9A825] animate-spin" />
            ) : portraitContent.url ? (
              <img
                src={portraitContent.url}
                alt="Portrait"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            ) : (
              <ImagePlaceholder size="xl" />
            )}
          </div>
          
        </div>

      </div>
    </div>
  );
}
