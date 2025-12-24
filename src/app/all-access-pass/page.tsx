import { Metadata } from 'next';
import Image from 'next/image';
import { Theme } from '@/types';
import NewsletterCTA from '@/components/shared/NewsletterCTA';

export const metadata: Metadata = {
  title: 'All Access Pass - Premium Ghost Theme Bundle',
  description: 'Get instant access to all 9 premium Ghost themes, plus all future releases. No recurring fees. Best value for Ghost CMS themes.',
  keywords: ['Ghost Theme', 'Ghost CMS Theme', 'Ghost Blog', 'Premium Ghost Theme', 'ghost themes', 'all access pass', 'premium themes', 'bundle', 'deal', 'ghost cms'],
  openGraph: {
    title: 'All Access Pass - Premium Ghost Theme Bundle',
    description: 'Get instant access to all 9 premium Ghost themes, plus all future releases. No recurring fees. Best value for Ghost CMS themes.',
    url: 'https://ghost-theme.com/all-access-pass',
    siteName: 'Ghost Theme',
    images: [
      {
        url: 'https://ghost-theme.com/images/hero.webp',
        width: 1200,
        height: 630,
        alt: 'All Access Pass - Ghost Theme Bundle',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Access Pass - Ghost Theme',
    description: 'Get instant access to all 9 premium Ghost themes, plus all future releases. No recurring fees.',
    images: ['https://ghost-theme.com/images/hero.webp'],
  },
  alternates: {
    canonical: 'https://ghost-theme.com/all-access-pass',
  },
};

const AllAccessPassPage = async () => {
  // Fetch themes from the database
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/themes`, {
    cache: 'no-store'
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch themes');
  }
  
  const themes = await response.json();

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-slate-900 border-b border-slate-800">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto text-center px-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 shadow-sm mb-8 animate-fade-in-up backdrop-blur-sm">
            <span className="text-sm font-bold text-yellow-400">Limited Time Offer</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold font-serif text-white mb-6 leading-tight tracking-tight">
            Get Everything<br /> We've Ever Made
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Unlock instant access to all 9 premium Ghost themes, plus all future releases. No recurring fees.
          </p>

          <div className="flex flex-col items-center justify-center gap-2 mb-12">
            <span className="text-6xl font-bold text-white tracking-tight">$49</span>
            <span className="text-sm text-slate-400 uppercase tracking-widest font-bold">One-time payment</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a href="https://shop.ghost-theme.com/checkout/buy/81f2e8a4-70b1-4343-96c6-f971e0c97922" className="px-8 py-4 text-base font-bold text-white bg-brand-primary rounded-full hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl shadow-blue-500/20 flex items-center gap-2">
              Get The Pass Now
            </a>
          </div>
          <p className="text-sm text-slate-500">30-day money back guarantee • Secure checkout</p>
        </div>
      </section>

      {/* Included Themes */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-slate-900 mb-6">What's Included?</h2>
            <p className="text-slate-600">You get immediate download access to every theme in our catalog.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {themes.map((theme: Theme, index: number) => (
              <div key={theme.id} className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                <div className="aspect-video bg-slate-100 relative">
                  <Image
                    src={theme.image}
                    alt={theme.name}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex justify-between items-center bg-slate-50">
                  <span className="font-bold text-slate-900">{theme.name}</span>
                  <span className="text-xs font-bold text-slate-500 line-through">${theme.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global CTA */}
      <NewsletterCTA />
    </>
  );
};

export default AllAccessPassPage;