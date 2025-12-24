import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Hero from '@/components/shared/Hero';
import { generateMetadata } from './metadata';

// Fetch documentation data from API
async function getDocumentation(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/documentation/theme/${slug}`, {
      cache: 'no-store', // Disable caching for fresh data
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching documentation:', error);
    return null;
  }
}

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';

function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose prose-lg prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-brand-primary hover:prose-a:text-brand-primary/80 prose-hr:border-slate-200 prose-hr:my-8 prose-blockquote:border-l-4 prose-blockquote:border-brand-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-slate-600 prose-ul:space-y-2 prose-ol:space-y-2 prose-li:marker:text-brand-primary prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:text-slate-800 prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-table:border prose-table:border-slate-200 prose-th:border prose-th:border-slate-200 prose-th:bg-slate-50 prose-th:font-semibold prose-th:px-4 prose-th:py-2 prose-td:border prose-td:border-slate-200 prose-td:px-4 prose-td:py-2 prose-img:rounded-lg prose-img:shadow-lg prose-img:my-6">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

const SingleDocTemplate = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const doc = await getDocumentation(slug);
  
  if (!doc) {
    notFound();
  }

  return (
    <>
        {/* Documentation Hero */}
        <Hero
          title={doc.title}
          description={doc.description}
          backgroundImage="bg-gray-50 border-b border-slate-200"
        >
          <nav className="text-sm font-medium text-slate-500 mb-4">
            <a href="/documentation" className="hover:text-blue-600 transition-colors">Documentation</a>
            <span className="mx-2 text-slate-300">/</span>
            <span className="text-slate-900">{doc.title}</span>
          </nav>
        </Hero>

        <div className="container mx-auto px-4 flex-grow">
          <div className="flex flex-col lg:flex-row gap-12 py-12">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 shrink-0 lg:border-r lg:border-slate-100 lg:pr-8">
              <nav className="sticky top-24 space-y-8">
                <div>
                  <h5 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4">Theme Documentation</h5>
                  <ul className="space-y-2 text-sm">
                    <li><a href="/documentation/factum" className={`${slug === 'factum' ? 'text-brand-primary font-bold' : 'text-slate-600 hover:text-slate-900'} transition-colors block`}>Factum</a></li>
                    <li><a href="/documentation/robotical" className={`${slug === 'robotical' ? 'text-brand-primary font-bold' : 'text-slate-600 hover:text-slate-900'} transition-colors block`}>Robotical</a></li>
                    <li><a href="/documentation/writer" className={`${slug === 'writer' ? 'text-brand-primary font-bold' : 'text-slate-600 hover:text-slate-900'} transition-colors block`}>Writer</a></li>
                    <li><a href="/documentation/ylogger" className={`${slug === 'ylogger' ? 'text-brand-primary font-bold' : 'text-slate-600 hover:text-slate-900'} transition-colors block`}>Ylogger</a></li>
                    <li><a href="/documentation/bloggie" className={`${slug === 'bloggie' ? 'text-brand-primary font-bold' : 'text-slate-600 hover:text-slate-900'} transition-colors block`}>Bloggie</a></li>
                    <li><a href="/documentation/icelog" className={`${slug === 'icelog' ? 'text-brand-primary font-bold' : 'text-slate-600 hover:text-slate-900'} transition-colors block`}>Icelog</a></li>
                    <li><a href="/documentation/beguni" className={`${slug === 'beguni' ? 'text-brand-primary font-bold' : 'text-slate-600 hover:text-slate-900'} transition-colors block`}>Beguni</a></li>
                    <li><a href="/documentation/acceler" className={`${slug === 'acceler' ? 'text-brand-primary font-bold' : 'text-slate-600 hover:text-slate-900'} transition-colors block`}>Acceler</a></li>
                    <li><a href="/documentation/asahi" className={`${slug === 'asahi' ? 'text-brand-primary font-bold' : 'text-slate-600 hover:text-slate-900'} transition-colors block`}>Asahi</a></li>
                  </ul>
                </div>

                <div>
                  <h5 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-4">Quick Links</h5>
                  <ul className="space-y-2 text-sm">
                    <li><a href="/documentation" className="text-slate-600 hover:text-slate-900 transition-colors block">All Documentation</a></li>
                    <li><a href="/themes" className="text-slate-600 hover:text-slate-900 transition-colors block">Browse Themes</a></li>
                    <li><a href="/contact" className="text-slate-600 hover:text-slate-900 transition-colors block">Get Support</a></li>
                  </ul>
                </div>
              </nav>
            </aside>

            {/* Content */}
            <main className="flex-grow min-w-0">
              <MarkdownContent content={doc.content} />

              <div className="mt-16 pt-8 border-t border-slate-200 flex justify-between">
                <div></div> {/* Spacer for 'next' only layout if needed, but we'll do Next */}
                <a href="/documentation" className="group flex items-center gap-3 text-right hover:text-brand-primary transition-colors">
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">Back to</div>
                    <div className="font-bold text-slate-900 group-hover:text-brand-primary">All Documentation</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </a>
              </div>
            </main>
          </div>
        </div>
    </>
  );
};

export default SingleDocTemplate;
export { generateMetadata };