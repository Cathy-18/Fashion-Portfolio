import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import ImagePlaceholder from '../components/ImagePlaceholder';

interface CloudinaryImage {
  publicId: string;
  url: string;
  tags: string[];
}

export default function About() {
  const [portrait, setPortrait] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/images');
        if (response.ok) {
          const allImages: CloudinaryImage[] = await response.json();
          const portraitAsset = allImages.find(img =>
            img.tags.some(tag => tag.toLowerCase() === 'portrait')
          );
          if (portraitAsset) setPortrait(portraitAsset.url);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  const bioText = 'Catherine Nixon is a contemporary fashion illustrator who transforms garments into visual poetry. Her work navigates the dialogue between architectural precision and flowing movement, revealing the quiet power within modern femininity. Through deliberate line, texture, and shadow, she presents fashion not merely as clothing, but as atmosphere — refined, evocative, and distinctly modern.';

  return (
    <div className="min-h-screen bg-cream text-ink pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section - Portrait left, content right */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative aspect-square max-w-xl overflow-hidden rounded-sm bg-beige shadow-sm">
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-ink/30 animate-spin" />
              </div>
            ) : portrait ? (
              <img
                src={portrait}
                alt="Catherine Nixon"
                className="w-full h-full object-cover"
              />
            ) : (
              <ImagePlaceholder size="xl" />
            )}
          </div>
          <div>
            <p className="text-ink/60 text-xs tracking-[0.3em] uppercase font-medium mb-6">
              About the Designer
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-none mb-6 uppercase tracking-tight">
              Catherine
              <br />
              Nixon
            </h1>
            <p className="text-ink/70 italic text-base tracking-widest mb-8">
              Visionary Couturier &amp; Creative Director
            </p>
            <p className="text-ink/80 text-base md:text-lg leading-relaxed">
              {bioText}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
