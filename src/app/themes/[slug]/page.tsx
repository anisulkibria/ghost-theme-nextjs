'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { use } from 'react';
import { Theme } from '@/types';
import { Metadata } from 'next';

// Fetch theme data for metadata generation
async function getTheme(slug: string): Promise<Theme | null> {
  try {
    const themeResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/themes/${slug}`, {
      cache: 'no-store',
    });
    
    if (themeResponse.ok) {
      return await themeResponse.json();
    }
    return null;
  } catch (error) {
    console.error('Error fetching theme:', error);
    return null;
  }
}

// Generate metadata for the theme page
async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const theme = await getTheme(slug);
  
  if (!theme) {
    return {
      title: 'Theme Not Found',
      description: 'The requested theme could not be found.',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ghost-theme.com';
  
  return {
    title: `${theme.name} Ghost Theme - Premium Ghost CMS Theme`,
    description: theme.fullDescription || theme.description,
    keywords: ['Ghost Theme', 'Ghost CMS Theme', 'Ghost Blog', 'Premium Ghost Theme', ...(theme.tags || [])],
    openGraph: {
      title: `${theme.name} Ghost Theme - Premium Theme for Your Website`,
      description: theme.fullDescription || theme.description,
      url: `${baseUrl}/themes/${theme.id}`,
      siteName: 'Ghost Theme',
      images: [
        {
          url: theme.image,
          width: 1200,
          height: 630,
          alt: `${theme.name} Theme Preview`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${theme.name} Ghost Theme - Premium Theme for Your Website`,
      description: theme.fullDescription || theme.description,
      images: [theme.image],
    },
    alternates: {
      canonical: `${baseUrl}/themes/${theme.id}`,
    },
  };
}

export default function ThemePage({ params }: { params: Promise<{ slug: string }> }) {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [relatedThemes, setRelatedThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const { slug } = use(params);

  useEffect(() => {
    const fetchThemeData = async () => {
      try {
        // Fetch current theme
        const themeResponse = await fetch(`/api/themes/${slug}`);
        if (themeResponse.ok) {
          const themeData = await themeResponse.json();
          setTheme(themeData);
          
          // Fetch related themes (excluding current theme)
          const allThemesResponse = await fetch('/api/themes');
          if (allThemesResponse.ok) {
            const allThemes = await allThemesResponse.json();
            const related = allThemes
              .filter((t: Theme) => t.id !== slug && t.category === themeData.category)
              .slice(0, 3);
            setRelatedThemes(related);
          }
        } else {
          notFound();
        }
      } catch (error) {
        console.error('Error fetching theme:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchThemeData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Loading theme...</p>
        </div>
      </div>
    );
  }

  if (!theme) {
    notFound();
  }

  // Define feature icons based on feature index
  const featureIcons = [
    // Membership Ready
    <svg key="membership" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
    </svg>,
    // Fully Responsive
    <svg key="responsive" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
    </svg>,
    // Blazing Fast
    <svg key="fast" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
    </svg>,
    // Dark Mode
    <svg key="dark" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
    </svg>,
    // Custom Settings
    <svg key="custom" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"></path>
    </svg>,
    // Premium Support
    <svg key="support" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
    </svg>
  ];

  // Define feature colors
  const featureColors = [
    'bg-blue-100 text-brand-primary',
    'bg-purple-100 text-purple-600',
    'bg-green-100 text-green-600',
    'bg-orange-100 text-orange-600',
    'bg-pink-100 text-pink-600',
    'bg-teal-100 text-teal-600'
  ];

  // Define hover colors
  const hoverColors = [
    'hover:border-blue-100',
    'hover:border-purple-100',
    'hover:border-green-100',
    'hover:border-orange-100',
    'hover:border-pink-100',
    'hover:border-teal-100'
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="pt-32 pb-16 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex text-sm text-slate-500 mb-8">
            <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/themes" className="hover:text-brand-primary transition-colors">Themes</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-800 font-medium">{theme.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-blue-100 text-brand-primary text-xs font-bold uppercase tracking-wide rounded-full">Ghost 6 Ready</span>
                {theme.featured && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wide rounded-full">New Release</span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-slate-900 mb-6 leading-tight">
                {theme.name} Ghost Theme
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-lg">
                {theme.fullDescription}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {theme.purchaseLink ? (
                  <a
                    href={theme.purchaseLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 text-base font-bold text-white bg-brand-primary rounded-full hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl shadow-blue-500/20 text-center flex items-center justify-center gap-2"
                  >
                    Purchase for ${theme.price}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </a>
                ) : (
                  <button className="px-8 py-4 text-base font-bold text-slate-400 bg-slate-100 border border-slate-200 rounded-full cursor-not-allowed text-center flex items-center justify-center gap-2" disabled>
                    Purchase for ${theme.price}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </button>
                )}
                
                {theme.demoLink ? (
                  <a
                    href={theme.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 text-base font-bold text-slate-700 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors text-center flex items-center justify-center gap-2"
                  >
                    Live Preview
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </a>
                ) : null}
              </div>

              <div className="flex items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Money Back Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                  <span>Free Support</span>
                </div>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl transform translate-x-4 translate-y-4"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform transition-transform hover:-translate-y-1 duration-500">
                <Image src={theme.image} alt={`${theme.name} Theme Preview`} className="w-full h-auto" width={600} height={450} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content & Sidebar */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content (8 cols) */}
            <div className="lg:col-span-8">
              {/* Features Grid */}
              <div className="mb-20">
                <h2 className="text-3xl font-bold font-serif text-slate-900 mb-8">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {(theme.features || []).slice(0, 6).map((feature: string, index: number) => (
                    <div key={index} className={`flex gap-4 p-6 rounded-2xl border border-slate-100 bg-slate-50 ${hoverColors[index]} hover:shadow-md transition-all`}>
                      <div className={`w-12 h-12 ${featureColors[index]} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        {featureIcons[index]}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 mb-2">
                          {index === 0 && "Membership Ready"}
                          {index === 1 && "Fully Responsive"}
                          {index === 2 && "Blazing Fast"}
                          {index === 3 && "Dark Mode"}
                          {index === 4 && "Custom Settings"}
                          {index === 5 && "Premium Support"}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{feature}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="prose prose-lg prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-brand-primary hover:prose-a:text-brand-primary/80 prose-strong:text-slate-900 prose-code:text-brand-primary prose-code:bg-slate-100 prose-code:rounded-md prose-code:px-1 prose-code:py-0.5 prose-code:before:content-[''] prose-code:after:content-[''] prose-blockquote:border-l-4 prose-blockquote:border-brand-primary prose-blockquote:bg-slate-50 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-slate-600 prose-ul:space-y-2 prose-ol:space-y-2 prose-li:marker:text-brand-primary mb-20">
                <h3>About this theme</h3>
                <p>
                  {theme.fullDescription}
                </p>
                <p>
                  Built with the latest web technologies, {theme.name} ensures your site performs exceptionally well in
                  search engine results while providing a smooth, app-like feel for your visitors. It includes
                  full support for Ghost's membership features, allowing you to monetize your content easily.
                </p>
                <h4>Typography & Design</h4>
                <p>
                  We've carefully selected fonts that offer excellent readability on screens of all sizes. The
                  layout respects whitespace, giving your content room to breathe and your readers a
                  stress-free environment.
                </p>
              </div>

              {/* FAQ Section */}
              <div>
                <h3 className="text-2xl font-bold font-serif text-slate-900 mb-8">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {/* FAQ 1 */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <details className="group">
                      <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6 bg-slate-50 text-slate-900 hover:bg-slate-100 transition-colors">
                        <span>Can I use this theme on multiple sites?</span>
                        <span className="transition group-open:rotate-180">
                          <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                            <path d="M6 9l6 6 6-6"></path>
                          </svg>
                        </span>
                      </summary>
                      <div className="text-slate-600 p-6 pt-0 bg-slate-50 border-t border-slate-100">
                        <p>Yes, you can use the theme on as many sites as you own. However, if you are
                          building sites for clients, you will need to purchase a license for each
                          client.</p>
                      </div>
                    </details>
                  </div>

                  {/* FAQ 2 */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <details className="group">
                      <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6 bg-slate-50 text-slate-900 hover:bg-slate-100 transition-colors">
                        <span>Do you offer support?</span>
                        <span className="transition group-open:rotate-180">
                          <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                            <path d="M6 9l6 6 6-6"></path>
                          </svg>
                        </span>
                      </summary>
                      <div className="text-slate-600 p-6 pt-0 bg-slate-50 border-t border-slate-100">
                        <p>Absolutely! We provide free support for all our themes. You can contact us
                          via email if you have any questions or issues with setup.</p>
                      </div>
                    </details>
                  </div>

                  {/* FAQ 3 */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <details className="group">
                      <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6 bg-slate-50 text-slate-900 hover:bg-slate-100 transition-colors">
                        <span>Is this theme compatible with Ghost 5.0?</span>
                        <span className="transition group-open:rotate-180">
                          <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                            <path d="M6 9l6 6 6-6"></path>
                          </svg>
                        </span>
                      </summary>
                      <div className="text-slate-600 p-6 pt-0 bg-slate-50 border-t border-slate-100">
                        <p>Yes, this theme is fully compatible with the latest version of Ghost (5.0+)
                          and takes advantage of all the newest features.</p>
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar (4 cols) */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                {/* Theme Specs */}
                <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                  <h3 className="font-bold font-serif text-slate-900 mb-6 text-xl">Specifications</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-slate-200 last:border-0">
                      <span className="text-slate-500 text-sm">Version</span>
                      <span className="font-medium text-slate-900 text-sm">{theme.version}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-slate-200 last:border-0">
                      <span className="text-slate-500 text-sm">Ghost Version</span>
                      <span className="font-medium text-slate-900 text-sm">{theme.ghostVersion}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-slate-200 last:border-0">
                      <span className="text-slate-500 text-sm">Columns</span>
                      <span className="font-medium text-slate-900 text-sm">{theme.layout}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-slate-200 last:border-0">
                      <span className="text-slate-500 text-sm">Layout</span>
                      <span className="font-medium text-slate-900 text-sm">Responsive</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-slate-200 last:border-0">
                      <span className="text-slate-500 text-sm">Browsers</span>
                      <span className="font-medium text-slate-900 text-sm">{theme.browsers}</span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {(theme.tags || []).map((tag: string, index: number) => (
                      <a key={index} href="#" className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 hover:border-brand-primary hover:text-brand-primary transition-colors">
                        {tag}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Need Help */}
                <div className="bg-brand-dark rounded-2xl p-8 text-center text-white">
                  <h3 className="font-bold font-serif text-xl mb-2">Need Customization?</h3>
                  <p className="text-slate-300 text-sm mb-6">We can help you customize this theme to fit your brand perfectly.</p>
                  <Link href="/contact" className="inline-block w-full py-3 bg-white text-brand-dark font-bold rounded-xl hover:bg-slate-100 transition-colors">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Themes */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold font-serif text-slate-900 mb-4">You might also like</h2>
              <p className="text-slate-600">Explore other premium themes from our collection.</p>
            </div>
            <Link href="/themes" className="text-brand-primary font-medium hover:underline flex items-center gap-1">
              View all themes
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedThemes
              .slice(0, 3)
              .map((relatedTheme: Theme) => (
                <Link key={relatedTheme.id} href={`/themes/${relatedTheme.id}`} className="block group border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white">
                  <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                    <Image src={relatedTheme.image} alt={`${relatedTheme.name} Theme`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" width={400} height={300} />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{relatedTheme.name}</h3>
                        <p className="text-sm text-slate-500 line-clamp-1">{relatedTheme.description}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">${relatedTheme.price}</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}