interface ImagePlaceholderProps {
  className?: string;
  brandText?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function ImagePlaceholder({ 
  className = "", 
  brandText = "CN",
  size = "md" 
}: ImagePlaceholderProps) {
  const sizeClasses = {
    sm: "text-xl tracking-[0.3em]",
    md: "text-2xl md:text-3xl tracking-[0.5em]",
    lg: "text-4xl md:text-5xl tracking-[0.5em]",
    xl: "text-5xl md:text-7xl tracking-[0.6em]"
  };

  return (
    <div className={`w-full h-full flex items-center justify-center bg-gradient-to-b from-beige to-beige-dark ${className}`}>
      <span className={`text-ink/20 font-serif uppercase ${sizeClasses[size]}`}>
        {brandText}
      </span>
    </div>
  );
}
