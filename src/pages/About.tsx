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
    title: 'Catherine\nNixon',
    subtitle: 'Visionary Couturier & Creative Director',
    bio: 'Catherine Nixon is a contemporary fashion illustrator who transforms garments into visual poetry. Her work navigates the dialogue between architectural precision and flowing movement, revealing the quiet power within modern femininity. Through deliberate line, texture, and shadow, she presents fashion not merely as clothing, but as atmosphere — refined, evocative, and distinctly modern.',
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
            title: data.context?.title || prev.title,
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
    <div className="min-h-screen bg-cream text-ink pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative aspect-square max-w-xl overflow-hidden rounded-sm bg-beige shadow-sm">
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-ink/30 animate-spin" />
              </div>
            ) : portraitContent.url ? (
              <img
                src={portraitContent.url}
                alt={portraitContent.title.replace('\n', ' ')}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <ImagePlaceholder size="xl" />
            )}
          </div>
          <div>
            <p className="text-ink/60 text-xs tracking-[0.3em] uppercase font-medium mb-6">
              About the Designer
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-none mb-6 uppercase tracking-tight whitespace-pre-line">
              {portraitContent.title}
            </h1>
            <p className="text-ink/70 italic text-base tracking-widest mb-8">
              {portraitContent.subtitle}
            </p>
            <p className="text-ink/80 text-base md:text-lg leading-relaxed whitespace-pre-line">
              {portraitContent.bio}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
