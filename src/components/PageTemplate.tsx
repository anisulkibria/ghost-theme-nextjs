import { ReactNode } from 'react';

interface PageTemplateProps {
  title: string;
  lastUpdated?: string;
  children: ReactNode;
}

export default function PageTemplate({ title, lastUpdated, children }: PageTemplateProps) {
  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-20 bg-slate-50 border-b border-slate-200/60">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-display">{title}</h1>
          {lastUpdated && (
            <p className="text-slate-500 text-sm font-medium">Last updated: {lastUpdated}</p>
          )}
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow bg-white py-20">
        <div className="container mx-auto px-4 max-w-3xl prose prose-lg prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-brand-primary hover:prose-a:text-brand-primary/80 prose-strong:text-slate-900 prose-code:text-brand-primary prose-code:bg-slate-100 prose-code:rounded-md prose-code:px-1 prose-code:py-0.5 prose-code:before:content-[''] prose-code:after:content-[''] prose-blockquote:border-l-4 prose-blockquote:border-brand-primary prose-blockquote:bg-slate-50 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-slate-600 prose-ul:space-y-2 prose-ol:space-y-2 prose-li:marker:text-brand-primary">
          {children}
        </div>
      </main>
    </>
  );
}