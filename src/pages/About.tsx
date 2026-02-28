import { useState, useEffect } from 'react';
import { MapPin, Loader2, Pen, Eye, Book } from 'lucide-react';

interface CloudinaryImage {
  publicId: string;
  url: string;
  tags: string[];
}

export default function About() {
  const experiences = [
    {
      period: '2019 – Present',
      role: 'Creative Director',
      company: 'CN, Paris',
      description: 'Leading all creative direction, from runway collections to brand identity.'
    },
    {
      period: '2015 – 2019',
      role: 'Senior Designer',
      company: 'Givenchy, Paris',
      description: 'Specialized in Haute Couture embellishments and evening wear silhouettes.'
    }
  ];

  const education = [
    {
      degree: 'MA Fashion Design',
      year: '2014',
      school: 'Central Saint Martins, London'
    },
    {
      degree: 'BA Fine Arts',
      year: '2011',
      school: 'Universität der Künste, Berlin'
    }
  ];

  const awards = [
    'LVMH Prize Finalist (2020)',
    'ANDAM Fashion Award (2022)'
  ];

  const clientele = ['CN', 'Givenchy', 'Central Saint Martins', 'Universität der Künste'];

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

  const philosophyQuote = "Fashion is not merely about clothing the body, but about architecting the soul's outer shell.";
  const philosophyParagraph = "My philosophy is rooted in the concept of 'Soft Brutalism.' I seek to merge industrial textures with organic silhouettes. Every seam is intentional, every fabric choice a dialogue between the wearer and their environment. We reject the ephemeral nature of trends in favor of timeless, constructed pieces that endure.";

  return (
    <div className="min-h-screen bg-cream text-ink pt-24 pb-20">
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
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-beige to-beige-dark">
                <span className="text-ink/20 font-serif text-5xl tracking-[0.5em] uppercase">CN</span>
              </div>
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
            <div className="flex items-center gap-3 text-ink/60 text-[10px] tracking-[0.3em] uppercase mb-8">
              <MapPin className="w-3 h-3" /> Paris Based
            </div>
            <p className="text-ink/80 text-base md:text-lg leading-relaxed">
              {bioText}
            </p>
          </div>
        </section>

        {/* Biography Section - Two columns */}
        <section className="mb-24">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-16">Biography</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <p className="text-ink/80 leading-relaxed">
                {bioText}
              </p>
              <div className="space-y-12 pt-4">
                {experiences.map((exp, i) => (
                  <div key={i}>
                    <p className="text-ink/60 text-[10px] tracking-[0.2em] font-semibold uppercase mb-2">{exp.period}</p>
                    <h4 className="font-serif text-xl font-semibold mb-1">{exp.role}</h4>
                    <p className="text-ink/60 text-xs tracking-wider uppercase mb-2">{exp.company}</p>
                    <p className="text-ink/80 text-sm leading-relaxed italic">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <div className="space-y-8 pt-4">
                {education.map((edu, i) => (
                  <div key={i} className="flex justify-between items-start border-b border-ink/10 pb-8">
                    <div>
                      <h4 className="font-serif text-xl font-semibold mb-1 italic">{edu.degree}</h4>
                      <p className="text-ink/60 text-xs tracking-[0.2em] uppercase">{edu.school}</p>
                    </div>
                    <span className="text-ink/60 text-[10px] tracking-[0.2em] font-semibold">{edu.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Artistic Philosophy - Three boxes */}
        <section className="mb-24">
          <h2 className="text-ink/60 text-sm tracking-[0.3em] uppercase font-medium text-center mb-16">
            Artistic Philosophy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-beige rounded-sm p-10 border border-beige-dark/50">
              <Pen className="w-6 h-6 text-ink/40 mb-6" />
              <h3 className="font-serif text-xl font-bold mb-4">The Medium</h3>
              <p className="text-ink/80 text-sm leading-relaxed italic">
                &quot;{philosophyQuote}&quot;
              </p>
            </div>
            <div className="bg-beige rounded-sm p-10 border border-beige-dark/50">
              <Eye className="w-6 h-6 text-ink/40 mb-6" />
              <h3 className="font-serif text-xl font-bold mb-4">The Gaze</h3>
              <p className="text-ink/80 text-sm leading-relaxed">
                {philosophyParagraph}
              </p>
            </div>
            <div className="bg-beige rounded-sm p-10 border border-beige-dark/50">
              <Book className="w-6 h-6 text-ink/40 mb-6" />
              <h3 className="font-serif text-xl font-bold mb-4">The Story</h3>
              <ul className="space-y-3">
                {awards.map((award, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-ink/80 italic">
                    <span className="w-4 h-4 flex items-center justify-center text-[10px] font-bold border border-ink/30 rounded">★</span>
                    {award}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Stats Section - Derived from existing content */}
        <section className="py-16 border-y border-ink/10 mb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center md:text-left md:border-r md:border-ink/10 md:pr-12">
              <p className="font-serif text-4xl font-bold text-ink">9+</p>
              <p className="text-ink/60 text-[10px] tracking-[0.2em] uppercase mt-1">Years Active</p>
            </div>
            <div className="text-center md:text-left md:border-r md:border-ink/10 md:pr-12">
              <p className="font-serif text-4xl font-bold text-ink">Paris</p>
              <p className="text-ink/60 text-[10px] tracking-[0.2em] uppercase mt-1">Studio Location</p>
            </div>
            <div className="text-center md:text-left md:border-r md:border-ink/10 md:pr-12">
              <p className="font-serif text-4xl font-bold text-ink">2</p>
              <p className="text-ink/60 text-[10px] tracking-[0.2em] uppercase mt-1">Awards</p>
            </div>
            <div>
              <p className="font-serif text-4xl font-bold text-ink">Digital</p>
              <p className="text-ink/60 text-[10px] tracking-[0.2em] uppercase mt-1">&amp; Couture</p>
            </div>
          </div>
        </section>

        {/* Selected Clientele - From experiences & education */}
        <section className="mb-24">
          <h2 className="text-ink/60 text-xs tracking-[0.3em] uppercase font-medium text-center mb-12">
            Selected Clientele
          </h2>
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 text-ink/80 font-medium tracking-wider">
            {clientele.map((client, i) => (
              <span key={i} className="text-sm uppercase">{client}</span>
            ))}
          </div>
        </section>

        {/* Final Quote */}
        <section className="text-center py-16 border-t border-ink/10">
          <h2 className="font-serif text-3xl md:text-4xl italic text-ink/60 mb-6 lowercase tracking-tight">
            &quot;Elegance is refusal.&quot;
          </h2>
          <p className="text-ink/60 text-[10px] tracking-[0.3em] uppercase font-semibold">Coco Chanel</p>
        </section>
      </div>
    </div>
  );
}
