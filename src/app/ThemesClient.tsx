'use client';

import { useState, useEffect } from 'react';
import { Theme } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import NewsletterCTA from '@/components/shared/NewsletterCTA';

export default function ThemesClient() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await fetch('/api/themes');
        const data = await response.json();
        
        // Check if response contains an error
        if (data.error) {
          console.error('API Error:', data.error);
          setThemes([]); // Set empty array on error
        } else {
          // Ensure we have an array
          setThemes(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error('Error fetching themes:', error);
        setThemes([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchThemes();
  }, []);

  const filteredThemes = activeFilter === 'all'
    ? themes
    : themes.filter(theme => theme.category === activeFilter);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Loading themes...</p>
        </div>
      </div>
    );
  }
  return (
    <>
      {/* Page Title */}
      <section className="relative pt-32 pb-12 bg-gray-50 border-b border-slate-200">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 mb-4">All Premium Themes</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore our complete collection of high-quality Ghost CMS themes.
          </p>
        </div>
      </section>

      {/* All Themes Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="flex flex-wrap justify-center gap-2" id="themeFilters">
              <button
                className={`filter-btn px-6 py-2 rounded-full font-medium text-sm transition-transform hover:scale-105 ${
                  activeFilter === 'all' 
                    ? 'bg-slate-900 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                onClick={() => setActiveFilter('all')}
              >All Themes</button>
              <button
                className={`filter-btn px-6 py-2 rounded-full font-medium text-sm transition-transform hover:scale-105 ${
                  activeFilter === 'magazine' 
                    ? 'bg-slate-900 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                onClick={() => setActiveFilter('magazine')}
              >Magazine</button>
              <button
                className={`filter-btn px-6 py-2 rounded-full font-medium text-sm transition-transform hover:scale-105 ${
                  activeFilter === 'newsletter' 
                    ? 'bg-slate-900 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                onClick={() => setActiveFilter('newsletter')}
              >Newsletter</button>
              <button
                className={`filter-btn px-6 py-2 rounded-full font-medium text-sm transition-transform hover:scale-105 ${
                  activeFilter === 'portfolio' 
                    ? 'bg-slate-900 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                onClick={() => setActiveFilter('portfolio')}
              >Portfolio</button>
              <button
                className={`filter-btn px-6 py-2 rounded-full font-medium text-sm transition-transform hover:scale-105 ${
                  activeFilter === 'photography' 
                    ? 'bg-slate-900 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                onClick={() => setActiveFilter('photography')}
              >Photography</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="themesGrid">
            {filteredThemes.map((theme) => (
              <Link key={theme.id} href={`/themes/${theme.id}`} data-category={theme.category}
                className="block group border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white"
              >
                <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  {theme.featured && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-primary shadow-sm z-10">Featured</div>
                  )}
                  <Image src={theme.image} alt={`${theme.name} Theme`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" width={400} height={300} />
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
                    <span className="text-xs text-slate-500 font-medium">{theme.tags?.[0]}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Global CTA */}
      <NewsletterCTA />
    </>
  );
}