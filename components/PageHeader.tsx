interface PageHeaderProps {
  title: string;
  subtitle?: string;
  image?: string;
}

export default function PageHeader({ title, subtitle, image }: PageHeaderProps) {
  return (
    <div className="relative pt-32 pb-20 md:pt-48 md:pb-28 border-b border-white/10 overflow-hidden bg-background">
      {image ? (
        <>
          <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </>
      ) : (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-brand-red/5 blur-[120px] rounded-full pointer-events-none" />
      )}
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 text-center">
        {subtitle && (
          <span className="text-brand-red text-xs uppercase tracking-superwide font-medium mb-6 block">
            {subtitle}
          </span>
        )}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-8 leading-tight">
          {title}
        </h1>
        <div className="mx-auto h-px w-24 bg-brand-red/50" />
      </div>
    </div>
  );
}
