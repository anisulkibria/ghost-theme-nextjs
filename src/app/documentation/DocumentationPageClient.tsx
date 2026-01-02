'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function DocumentationPageClient() {
  const [docs, setDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const response = await fetch('/api/documentation');
        const data = await response.json();
        
        setDocs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching documentation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, []);

  const filteredDocs = docs.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Loading documentation...</p>
        </div>
      </div>
    );
  }

  // Static theme data for documentation cards
  const themes = [
    { id: 'factum', name: 'Factum', image: '/images/theme1.webp', category: 'Magazine & News' },
    { id: 'robotical', name: 'Robotical', image: '/images/theme2.webp', category: 'Tech & Portfolio' },
    { id: 'writer', name: 'Writer', image: '/images/theme3.webp', category: 'Minimalist Writing' },
    { id: 'ylogger', name: 'Ylogger', image: '/images/theme4.webp', category: 'Video & Blog' },
    { id: 'bloggie', name: 'Bloggie', image: '/images/bloggie.webp', category: 'Fast & Modern' },
    { id: 'icelog', name: 'Icelog', image: '/images/icelog.webp', category: 'Minimal' },
    { id: 'beguni', name: 'Beguni', image: '/images/theme7.jpg', category: 'Creative & Photography' },
    { id: 'acceler', name: 'Acceler', image: '/images/theme8.jpg', category: 'Bootstrap & Business' },
    { id: 'asahi', name: 'Asahi', image: '/images/theme9.webp', category: 'Tailwind & Magazine' }
  ];

  return (
    <>
      {/* Search Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50 border-b border-slate-200">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="container mx-auto text-center px-4 relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 mb-6 font-display">How can we help you?</h1>
          <p className="text-xl text-slate-600 mb-10">
            Search our knowledge base or browse by theme below.
          </p>

          <div className="relative max-w-2xl mx-auto mb-12">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-full text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary shadow-lg shadow-slate-200/50 transition-shadow"
              placeholder="Search for articles, guides, or troubleshooting..." />
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500">
            <span className="font-medium text-slate-900">Popular:</span>
            {docs.slice(0, 4).map((doc, index) => (
              <Link key={doc.id} href={`/documentation/${doc.slug}`}
                className="hover:text-brand-primary underline decoration-slate-300 hover:decoration-brand-primary underline-offset-2 transition-colors">
                {doc.title.replace(' Documentation', '')}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Articles */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold font-serif text-slate-900 mb-4">Browse by Theme</h2>
            <p className="text-slate-600">Detailed guides and configuration options for every theme in our collection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {themes.map((theme) => (
              <Link key={theme.id} href={`/documentation/${theme.id}`}
                className="group block border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                    <Image src={theme.image} alt={theme.name} className="w-full h-full object-cover" width={64} height={64} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-primary transition-colors">
                      {theme.name}
                    </h3>
                    <p className="text-sm text-slate-500">{theme.category}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                      </path>
                    </svg>
                    Installation Guide
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.572c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.572 1.065c-1.543.94-3.31-.826-2.37-2.37.996.608 2.296.07 2.572-1.065z">
                      </path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    Configuration
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                      </path>
                    </svg>
                    Theme Structure
                  </li>
                </ul>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* Support Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold font-serif text-slate-900 mb-6">Still need help?</h2>
          <p className="text-lg text-slate-600 mb-8">
            If you can't find answer in our documentation, our support team is here to help.
          </p>
          <Link href="/contact"
            className="inline-flex items-center px-8 py-3 text-base font-bold text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-colors">
            Contact Support
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}