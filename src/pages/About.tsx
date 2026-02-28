import { useState, useEffect } from 'react';
import { MapPin, Trophy, Loader2 } from 'lucide-react';

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

  const [portrait, setPortrait] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPortrait = async () => {
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
        console.error('Error fetching portrait:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPortrait();
  }, []);

  return (
    <div className="min-h-screen bg-luxury-black text-white pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Main Bio Section */}
        <section className="luxury-border p-1 md:p-12 mb-32 bg-luxury-dark/30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="relative aspect-[3/4] luxury-border overflow-hidden bg-luxury-dark/50">
              {isLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-luxury-gold animate-spin opacity-20" />
                </div>
              ) : portrait ? (
                <img
                  src={portrait}
                  alt="Catherine Nixon"
                  className="w-full h-full object-cover grayscale opacity-90 transition-transform duration-[2s] hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-luxury-dark to-luxury-black">
                  <span className="text-luxury-gold/10 font-serif text-6xl tracking-[1em] uppercase -rotate-90 whitespace-nowrap">CN</span>
                </div>
              )}
            </div>
            <div className="pt-8">
              <h1 className="font-serif text-6xl lg:text-8xl leading-none mb-6 uppercase tracking-tight">
                Catherine
                <br />
                Nixon
              </h1>
              <p className="text-luxury-gold italic text-base tracking-widest mb-8">
                Visionary Couturier & Creative Director
              </p>
              <div className="flex items-center gap-3 text-luxury-muted text-[10px] tracking-[0.3em] uppercase mb-16 underline decoration-luxury-gold/30 underline-offset-8">
                <MapPin className="w-3 h-3 text-luxury-gold" /> Paris Based
              </div>

              <div className="max-w-md">
                <h3 className="font-serif text-2xl uppercase mb-8 border-b border-white/5 pb-4 tracking-widest italic">Biography</h3>
                <p className="text-luxury-muted font-light leading-relaxed text-base italic">
                  Catherine Nixon is a contemporary fashion illustrator who transforms garments into visual poetry. Her work navigates the dialogue between architectural precision and flowing movement, revealing the quiet power within modern femininity. Through deliberate line, texture, and shadow, she presents fashion not merely as clothing, but as atmosphere — refined, evocative, and distinctly modern.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="mb-48 border-t border-white/5 pt-20">
          <div className="flex items-center gap-6 mb-16">
            <div className="w-12 h-px bg-luxury-gold"></div>
            <h2 className="font-serif text-sm tracking-[0.4em] uppercase font-bold text-white">Design Philosophy</h2>
            <div className="flex-1 h-px bg-white/5"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <h3 className="font-serif text-3xl md:text-4xl italic leading-snug">
              "Fashion is not merely about clothing the body, but about architecting the soul's outer shell."
            </h3>
            <p className="text-luxury-muted font-light leading-relaxed tracking-wide">
              My philosophy is rooted in the concept of 'Soft Brutalism.' I seek to merge industrial textures with organic silhouettes. Every seam is intentional, every fabric choice a dialogue between the wearer and their environment. We reject the ephemeral nature of trends in favor of timeless, constructed pieces that endure.
            </p>
          </div>
        </section>

        {/* Experience & Education Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-32 mb-48">
          <div>
            <div className="flex items-center gap-6 mb-16">
              <h2 className="font-serif text-sm tracking-[0.4em] uppercase font-bold text-white">Experience</h2>
              <div className="flex-1 h-px bg-white/5"></div>
            </div>
            <div className="space-y-16">
              {experiences.map((exp, i) => (
                <div key={i} className="relative pl-10">
                  <div className="absolute left-0 top-0 w-3 h-3 rounded-full border border-luxury-gold">
                    <div className="absolute inset-1 rounded-full bg-luxury-gold/20"></div>
                  </div>
                  <p className="text-luxury-gold text-[10px] tracking-[0.2em] font-bold uppercase mb-3">{exp.period}</p>
                  <h4 className="font-serif text-xl tracking-wider text-white mb-2">{exp.role}</h4>
                  <p className="text-luxury-muted text-xs tracking-widest uppercase mb-4">{exp.company}</p>
                  <p className="text-luxury-muted font-light text-sm leading-relaxed italic">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-6 mb-16">
              <h2 className="font-serif text-sm tracking-[0.4em] uppercase font-bold text-white">Education</h2>
              <div className="flex-1 h-px bg-white/5"></div>
            </div>
            <div className="space-y-16">
              {education.map((edu, i) => (
                <div key={i} className="flex justify-between items-start border-b border-white/5 pb-10">
                  <div>
                    <h4 className="font-serif text-xl tracking-wider text-white mb-2 italic">{edu.degree}</h4>
                    <p className="text-luxury-muted text-xs tracking-[0.2em] uppercase font-light italic">{edu.school}</p>
                  </div>
                  <span className="text-luxury-muted text-[10px] tracking-[0.2em] font-bold pt-2">{edu.year}</span>
                </div>
              ))}
            </div>

            <div className="mt-20 p-8 border border-luxury-gold/20 bg-luxury-dark/20 relative overflow-hidden group">
              <h4 className="text-luxury-gold text-xs tracking-[0.3em] uppercase font-bold mb-6 flex items-center gap-3">
                <Trophy className="w-4 h-4" /> Awards
              </h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 text-xs tracking-widest text-luxury-muted italic font-light">
                  <span className="w-4 h-4 flex items-center justify-center text-luxury-gold text-[8px] font-bold border border-luxury-gold">🏆</span>
                  LVMH Prize Finalist (2020)
                </li>
                <li className="flex items-center gap-4 text-xs tracking-widest text-luxury-muted italic font-light">
                  <span className="w-4 h-4 flex items-center justify-center text-luxury-gold text-[8px] font-bold border border-luxury-gold">🏆</span>
                  ANDAM Fashion Award (2022)
                </li>
              </ul>
              <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/5 blur-3xl -mr-16 -mt-16 group-hover:bg-luxury-gold/10 transition-colors"></div>
            </div>
          </div>
        </section>

        {/* Final Quote */}
        <section className="text-center py-20 border-t border-white/5">
          <h2 className="font-serif text-4xl lg:text-5xl italic text-luxury-muted/40 mb-8 lowercase tracking-tighter">
            "Elegance is refusal."
          </h2>
          <p className="text-luxury-gold text-[10px] tracking-[0.5em] uppercase font-bold">Coco Chanel</p>
        </section>
      </div>
    </div>
  );
}
