import Link from 'next/link';

interface NewsletterCTAProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  guaranteeText?: string;
  className?: string;
}

export default function NewsletterCTA({
  title = "Build your dream publication today",
  description = "Join 5,000+ creators who trust our themes to power their online presence. Get access to all themes for one simple price.",
  primaryButtonText = "Get All Access Pass - $49",
  primaryButtonHref = "/all-access-pass",
  secondaryButtonText = "Browse Themes",
  secondaryButtonHref = "/themes",
  guaranteeText = "30-day money back guarantee • Cancel anytime",
  className = ""
}: NewsletterCTAProps) {
  return (
    <section className={`py-24 bg-slate-900 overflow-hidden relative ${className}`}>
      {/* Abstract Background */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold font-serif text-white mb-6">{title}</h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href={primaryButtonHref}
            className="px-8 py-4 bg-brand-primary text-white font-bold rounded-full hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl shadow-blue-500/20 text-lg"
          >
            {primaryButtonText}
          </Link>
          <Link
            href={secondaryButtonHref}
            className="px-8 py-4 bg-transparent border border-slate-700 text-white font-bold rounded-full hover:bg-white/10 transition-colors text-lg"
          >
            {secondaryButtonText}
          </Link>
        </div>
        <p className="text-sm text-slate-500 mt-6">{guaranteeText}</p>
      </div>
    </section>
  );
}