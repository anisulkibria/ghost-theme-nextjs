'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Theme } from '@/types';
import NewsletterCTA from '@/components/shared/NewsletterCTA';
import Testimonials from '@/components/shared/Testimonials';

function HomePageClient() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    // Reset loading state when component mounts
    setLoading(true);
    
    const fetchData = async () => {
      try {
        // Add cache-busting timestamp to prevent browser caching
        const timestamp = Date.now();
        
        // Create a timeout promise with longer duration
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Request timeout')), 8000); // 8 second timeout
        });

        // Fetch themes with timeout and fallback
        let themesData;
        try {
          const themesPromise = fetch(`/api/themes?t=${timestamp}`, {
            cache: 'no-store',
            headers: { 'Cache-Control': 'no-cache' }
          });
          const themesResponse = await Promise.race([themesPromise, timeoutPromise]);
          themesData = await (themesResponse as Response).json();
        } catch (themesError) {
          console.warn('Themes fetch failed, using empty array:', themesError);
          themesData = [];
        }
        
        // Fetch blog posts with timeout and fallback
        let blogData;
        try {
          const blogPromise = fetch(`/api/blog?t=${timestamp}`, {
            cache: 'no-store',
            headers: { 'Cache-Control': 'no-cache' }
          });
          const blogResponse = await Promise.race([blogPromise, timeoutPromise]);
          blogData = await (blogResponse as Response).json();
        } catch (blogError) {
          console.warn('Blog posts fetch failed, using empty array:', blogError);
          blogData = [];
        }
        
        // Only update state if component is still mounted
        if (isMounted) {
          setThemes(Array.isArray(themesData) ? themesData : []);
          setBlogPosts(Array.isArray(blogData) ? blogData : []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Set empty data on error to prevent infinite loading
        if (isMounted) {
          setThemes([]);
          setBlogPosts([]);
        }
      } finally {
        // Always set loading to false if component is still mounted
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Add a small delay to ensure loading state is visible
    const timeoutId = setTimeout(fetchData, 100);

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  // Add client-side filtering functionality
  useEffect(() => {
    // Only run this effect after the component has loaded and themes are available
    if (loading) return;
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const themeCards = document.querySelectorAll('#themesGrid .group');
    
    const handleFilterClick = (e: Event) => {
      const filter = (e.currentTarget as HTMLElement).getAttribute('data-filter');
      
      // Update active button styling
      filterButtons.forEach(btn => {
        if (btn.getAttribute('data-filter') === filter) {
          btn.classList.add('bg-slate-900', 'text-white');
          btn.classList.remove('bg-slate-100', 'text-slate-600');
        } else {
          btn.classList.remove('bg-slate-900', 'text-white');
          btn.classList.add('bg-slate-100', 'text-slate-600');
        }
      });
      
      // Filter theme cards
      themeCards.forEach((card: Element) => {
        if (filter === 'all') {
          (card as HTMLElement).style.display = 'block';
        } else {
          const cardCategory = card.getAttribute('data-category');
          if (cardCategory === filter) {
            (card as HTMLElement).style.display = 'block';
          } else {
            (card as HTMLElement).style.display = 'none';
          }
        }
      });
    };
    
    filterButtons.forEach((btn: Element) => {
      btn.addEventListener('click', handleFilterClick as EventListener);
    });
    
    return () => {
      filterButtons.forEach((btn: Element) => {
        btn.removeEventListener('click', handleFilterClick as EventListener);
      });
    };
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans antialiased text-slate-800 bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50 border-b border-slate-200">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="container mx-auto text-center px-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-sm font-medium text-slate-600">Updated for Ghost V6</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold font-serif text-slate-900 mb-6 leading-tight tracking-tight">
            Premium Ghost Themes<br /> for <span className="text-brand-primary">Serious Publishers</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Beautifully designed, lightning-fast themes that help you start your newsletter, magazine, or blog in
            minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/all-access-pass"
              className="px-8 py-4 text-base font-bold text-white bg-brand-primary rounded-full hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl shadow-blue-500/20 flex items-center gap-2"
            >
              Get All Access Pass
            </Link>
            <Link
              href="#themes"
              className="px-8 py-4 text-base font-bold text-slate-700 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors flex items-center gap-2"
            >
              Browse All Themes
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex -space-x-2">
              <Image className="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=1" alt="User" width={40} height={40} />
              <Image className="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=2" alt="User" width={40} height={40} />
              <Image className="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=3" alt="User" width={40} height={40} />
              <Image className="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=4" alt="User" width={40} height={40} />
              <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">+2k</div>
            </div>
            <p className="text-sm text-slate-500 font-medium">Trusted by 2,000+ creators worldwide</p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-10 border-b border-slate-100 bg-white">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">Works perfectly
            with</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Simple Text Logos for Demo Purposes (simulating SVGs) */}
            <span className="text-xl font-bold text-slate-600 flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10 5-10 5L12 2zm0 9l-2.5-1.25L12 20l-2.5-1.25L12 11z" />
              </svg>
              Ghost
            </span>
            <span className="text-xl font-bold text-slate-600 flex items-center gap-2">Stripe</span>
            <span className="text-xl font-bold text-slate-600 flex items-center gap-2">Mailgun</span>
            <span className="text-xl font-bold text-slate-600 flex items-center gap-2">Unsplash</span>
            <span className="text-xl font-bold text-slate-600 flex items-center gap-2">Zapier</span>
          </div>
        </div>
      </section>

      {/* Featured Themes Grid */}
      <section id="themes" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-slate-900 mb-6">Curated Themes for Every Niche
            </h2>
            <div className="flex flex-wrap justify-center gap-2" id="themeFilters">
              <button
                className="filter-btn px-6 py-2 rounded-full bg-slate-900 text-white font-medium text-sm transition-transform hover:scale-105"
                data-filter="all"
              >
                All Themes
              </button>
              <button
                className="filter-btn px-6 py-2 rounded-full bg-slate-100 text-slate-600 font-medium text-sm hover:bg-slate-200 transition-colors"
                data-filter="magazine"
              >
                Magazine
              </button>
              <button
                className="filter-btn px-6 py-2 rounded-full bg-slate-100 text-slate-600 font-medium text-sm hover:bg-slate-200 transition-colors"
                data-filter="newsletter"
              >
                Newsletter
              </button>
              <button
                className="filter-btn px-6 py-2 rounded-full bg-slate-100 text-slate-600 font-medium text-sm hover:bg-slate-200 transition-colors"
                data-filter="portfolio"
              >
                Portfolio
              </button>
              <button
                className="filter-btn px-6 py-2 rounded-full bg-slate-100 text-slate-600 font-medium text-sm hover:bg-slate-200 transition-colors"
                data-filter="photography"
              >
                Photography
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="themesGrid">
            {themes.map((theme) => (
              <Link key={theme.id} href={`/themes/${theme.id}`} data-category={theme.category}
                className="block group border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white">
                <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  {theme.featured && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-primary shadow-sm z-10">
                      Featured
                    </div>
                  )}
                  <Image src={theme.image} alt={`${theme.name} Theme`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    width={400}
                    height={300}
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">{theme.name}</h3>
                      <p className="text-sm text-slate-500 line-clamp-1">{theme.description}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">${theme.price}</span>
                  </div>
                  <div className="flex items-center gap-4 border-t border-slate-100 pt-4 mt-4">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white"></div>
                      <div className="w-6 h-6 rounded-full bg-slate-300 border-2 border-white"></div>
                      <div className="w-6 h-6 rounded-full bg-slate-400 border-2 border-white"></div>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">{theme.tags?.[0] || theme.category}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link href="#" className="inline-flex items-center gap-2 text-brand-primary font-medium hover:underline">
              View all themes
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-brand-primary font-bold tracking-wider text-sm uppercase mb-4 block">Why
              Ghost-Theme?</span>
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-slate-900 mb-6">Everything you need to build
              faster</h2>
            <p className="text-lg text-slate-600">Our themes are strictly vetted for code quality, design fidelity, and
              performance. You're not just buying a template; you're buying a foundation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center mb-24">
            <div className="order-2 md:order-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div
                    className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-brand-primary mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">99+ PageSpeed</h3>
                  <p className="text-sm text-slate-600">Consistently high scores on Core Web Vitals for better SEO
                    rankings.</p>
                </div>
                <div
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div
                    className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Clean Code</h3>
                  <p className="text-sm text-slate-600">Well-documented, commented, and easy to customize
                    codebase.</p>
                </div>
                <div
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div
                    className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z">
                      </path>
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Fully Responsive</h3>
                  <p className="text-sm text-slate-600">Looks perfect on every device, from mobile to ultra-wide
                    monitors.</p>
                </div>
                <div
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div
                    className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z">
                      </path>
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Premium Support</h3>
                  <p className="text-sm text-slate-600">Direct access to developers for any integration issues.
                  </p>
                </div>
              </div>
            </div>
            {/* Interactive/Visual Element representing code or design */}
            <div className="order-1 md:order-2">
              <div
                className="bg-slate-900 rounded-2xl p-6 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 border border-slate-700">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <pre className="font-mono text-xs sm:text-sm text-slate-300 leading-relaxed overflow-x-auto">
{`<span class="text-purple-400">const</span> <span class="text-blue-400">themeConfig</span> = {
  <span class="text-blue-300">name</span>: <span class="text-green-300">'Factum'</span>,
  <span class="text-blue-300">version</span>: <span class="text-green-300">'1.2.0'</span>,
  <span class="text-blue-300">features</span>: [
    <span class="text-green-300">'Memberships'</span>,
    <span class="text-green-300">'Dark Mode'</span>,
    <span class="text-green-300">'SEO Optimized'</span>
  ],
  <span class="text-blue-300">colors</span>: {
    <span class="text-blue-300">primary</span>: <span class="text-green-300">'#2563EB'</span>,
    <span class="text-blue-300">secondary</span>: <span class="text-green-300">'#0F172A'</span>
  }
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* Developer Friendly Strip */}
          <div
            className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
            <div>
              <h3 className="text-2xl font-bold font-serif text-slate-900 mb-2">Developer Friendly</h3>
              <p className="text-slate-600">Built with modern tools you love: Tailwind CSS, Vanilla JS, and Gulp.</p>
            </div>
            <div className="flex gap-6 grayscale opacity-60">
              <span className="font-bold text-slate-500 flex items-center gap-2"><svg className="w-6 h-6"
                  viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
                </svg> Tailwind</span>
              <span className="font-bold text-slate-500 flex items-center gap-2">JS</span>
              <span className="font-bold text-slate-500 flex items-center gap-2">HTML5</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Latest Articles */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold font-serif text-slate-900 mb-4">Latest from the Blog</h2>
              <p className="text-slate-600">Tips and tutorials on how to grow your publication.</p>
            </div>
            <Link href="/blog" className="text-brand-primary font-medium hover:underline flex items-center gap-1">Read
              all posts <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg></Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post) => (
              <article
                key={post.id}
                className="group border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white flex flex-col h-full">
                <Link href={`/blog/${post.id}`} className="block aspect-[3/2] bg-slate-100 relative overflow-hidden">
                  <Image src={post.image || '/images/blog-post-1.jpg'}
                    alt="Blog Post"
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    width={800}
                    height={600}
                  />
                </Link>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-3">
                    {post.tags && post.tags.length > 0 && (
                      <Link href={`/tag/${post.tags[0]}`}
                        className="text-xs font-bold uppercase tracking-widest text-brand-primary hover:underline">{post.tags[0]}</Link>
                    )}
                  </div>
                  <h3
                    className="text-xl font-serif font-bold text-slate-900 mb-3 leading-tight group-hover:text-brand-primary transition-colors">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="border-t border-slate-100 pt-4 mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden">
                        <Image src="/images/author-avatar.jpg"
                          alt="Author"
                          width={24}
                          height={24}
                          unoptimized
                        />
                      </div>
                      <Link href={`/author/${post.author?.id}`} className="text-xs font-bold text-slate-900 hover:underline">
                        {post.author?.name || 'Anisul Kibria'}
                      </Link>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <NewsletterCTA />
    </div>
    );
  }

export default HomePageClient;