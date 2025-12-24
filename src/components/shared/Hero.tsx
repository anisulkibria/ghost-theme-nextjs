import React from 'react';

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export default function Hero({ 
  title, 
  subtitle, 
  description, 
  backgroundImage, 
  actions, 
  children, 
  className = '' 
}: HeroProps) {
  return (
    <section className={`relative pt-32 pb-16 md:pt-40 md:pb-20 ${backgroundImage ? 'bg-slate-50 border-b border-slate-200' : 'bg-slate-50 border-b border-slate-200'} ${className}`}>
      {backgroundImage && (
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
      )}
      <div className="container mx-auto px-4 relative z-10 max-w-3xl">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 mb-6 font-display">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl text-slate-600 mb-10">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
              {description}
            </p>
          )}
          {actions && (
            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500">
              {actions}
            </div>
          )}
        </div>
      </div>
      {children && (
        <div className="container mx-auto px-4">
          {children}
        </div>
      )}
    </section>
  );
}