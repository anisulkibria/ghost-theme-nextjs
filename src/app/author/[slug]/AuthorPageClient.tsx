'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import NewsletterCTA from '@/components/shared/NewsletterCTA';

export default function AuthorPageClient({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const [author, setAuthor] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState(4); // Show first 4 posts initially

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        // Fetch author information
        const authorResponse = await fetch(`/api/authors/${slug}`);
        const authorResult = await authorResponse.json();
        
        if (authorResult.error || !authorResult) {
          notFound();
          return;
        }
        
        setAuthor(authorResult);

        // Fetch posts for this author
        const postsResponse = await fetch(`/api/blog?author=${slug}`);
        const postsResult = await postsResponse.json();
        
        setPosts(Array.isArray(postsResult) ? postsResult : []);
      } catch (error) {
        console.error('Error fetching author data:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorData();
  }, [slug]);

  const handleLoadMore = () => {
    setVisiblePosts(prev => prev + 3); // Load 3 more posts each time
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Loading author...</p>
        </div>
      </div>
    );
  }

  if (!author) {
    notFound();
  }

  const staffPicks = posts.slice(0, 3).map((post, index) => ({
    number: String(index + 1).padStart(2, '0'),
    category: post.tags?.[0] || 'Technology',
    title: post.title,
    slug: post.id
  }));

  const relatedTags = posts && posts.length > 0 
    ? [...new Set(posts.flatMap(post => post.tags || []))].slice(0, 5)
    : ['AI', 'Machine Learning', 'Blockchain', 'Cybersecurity', 'Cloud Computing'];

  return (
    <>
      {/* Author Hero */}
      <section className="pt-32 pb-12 border-b border-slate-100 bg-slate-50/50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
              <Image src="/images/author-avatar.jpg"
                alt={author?.name || 'Anisul Kibria'} className="w-full h-full object-cover" width={128} height={128} />
            </div>
            {author?.url && (
              <a href={author.url}
                className="absolute bottom-1 right-1 bg-brand-primary text-white p-2 rounded-full hover:bg-brand-dark transition-colors shadow-sm"
                aria-label="Website">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1">
                  </path>
                </svg>
              </a>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 mb-4">{author?.name || 'Anisul Kibria'}</h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-serif mb-6">
            {author?.bio || 'Lead Developer at Ghost Theme. I write about web development, design systems, and modern CMS architectures. Passionate about building clean, performant websites.'}
          </p>

          <div className="flex justify-center gap-6 text-sm font-medium text-slate-500 mb-8">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z">
                </path>
              </svg>
              <span>{posts.length} Posts</span>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            {author?.social?.twitter && (
              <a href={author.social.twitter} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84">
                  </path>
                </svg>
              </a>
            )}
            {author?.social?.github && (
              <a href={author.social.github} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"></path>
                </svg>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Main Content: Medium Style List */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Main Feed (Single Column) */}
            <div className="lg:col-span-8 lg:border-r lg:border-slate-100 lg:pr-12">
              <div className="flex flex-col gap-10" id="authorList">

                {/* Render posts with load more functionality */}
                {posts.slice(0, visiblePosts).map((post, index) => (
                  <article key={post.id} className="blog-card group cursor-pointer flex flex-col md:flex-row gap-6 md:gap-10 border-b border-slate-100 pb-10 items-stretch md:items-start">
                    <div className="flex-1 order-2 md:order-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          {post.tags && post.tags.length > 0 && (
                            <Link href={`/tag/${post.tags[0].toLowerCase().replace(' ', '-')}`} className="text-xs font-bold text-slate-900 uppercase tracking-wider hover:text-brand-primary hover:underline">{post.tags[0]}</Link>
                          )}
                        </div>
                        <Link href={`/blog/${post.id}`} className="block group">
                          <h3 className="text-xl md:text-2xl font-bold font-serif text-slate-900 mb-2 group-hover:underline decoration-2 underline-offset-4 decoration-slate-900 leading-tight">
                            {post.title}
                          </h3>
                          <p className="hidden md:block text-slate-600 text-[15px] leading-relaxed line-clamp-2 md:line-clamp-3 mb-4 font-serif text-opacity-90">
                            {post.excerpt}
                          </p>
                        </Link>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-2 md:mt-0">
                        <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        <span>•</span>
                        <span>{post.readTime || '5 min read'}</span>
                      </div>
                    </div>
                    <Link href={`/blog/${post.id}`} className="w-full md:w-40 md:h-28 aspect-[16/9] md:aspect-[4/3] shrink-0 order-1 md:order-2 rounded-md overflow-hidden bg-slate-100">
                      <Image
                        src={post.image || 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'}
                        alt="Thumb"
                        width={300}
                        height={200}
                        className="w-full h-full object-cover"
                        unoptimized={post.image?.includes('unsplash.com')}
                      />
                    </Link>
                  </article>
                ))}

                {/* Pagination */}
                {posts.length > visiblePosts && (
                  <div className="mt-16 flex justify-center mb-12 lg:mb-0">
                    <button
                      onClick={handleLoadMore}
                      className="group inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 font-medium text-sm rounded-full hover:border-slate-900 hover:text-slate-900 transition-all">
                      Load more
                      <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                  </div>
                )}
              </div>

            </div>

            {/* Right Sidebar (Discover More) */}
            <aside className="hidden lg:block lg:col-span-4 pl-4 sticky top-24 self-start h-screen">
              {/* Newsletter Widget */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
                <h3 className="font-bold font-serif text-xl text-slate-900 mb-2">Newsletter</h3>
                <p className="text-sm text-slate-600 mb-4">Get latest posts delivered right to your inbox.</p>
                <form className="flex flex-col gap-2">
                  <input type="email" placeholder="Your email address" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-brand-primary text-sm" />
                  <button className="w-full px-4 py-2 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-dark transition-colors text-sm">Subscribe</button>
                </form>
              </div>

              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6">Staff Picks</h4>
              <div className="flex flex-col gap-6 mb-12">
                {staffPicks.map((pick) => (
                  <div key={pick.number} className="flex gap-4 items-start group mb-6">
                    <span className="text-3xl font-black text-slate-200 font-serif -mt-1 group-hover:text-brand-primary transition-colors">{pick.number}</span>
                    <div>
                      <div className="mb-1">
                        <Link href={`/tag/${pick.category.toLowerCase()}`} className="text-[11px] font-bold text-brand-primary uppercase tracking-wider hover:underline">{pick.category}</Link>
                      </div>
                      <Link href={`/blog/${pick.slug}`} className="text-sm font-bold text-slate-900 leading-snug group-hover:underline">{pick.title}</Link>
                    </div>
                  </div>
                ))}
              </div>

              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6">Also in Tech</h4>
              <div className="flex flex-wrap gap-2 mb-12">
                {relatedTags.map((tag) => (
                  <Link key={tag} href={`/tag/${tag.toLowerCase().replace(' ', '-')}`} className="px-3 py-2 bg-slate-100 rounded-full text-xs font-medium text-slate-600 hover:bg-slate-200">{tag}</Link>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-6">
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-slate-400">
                  <Link href="/contact" className="hover:text-slate-600">Help</Link>
                  <Link href="/page/about" className="hover:text-slate-600">About</Link>
                  <Link href="/page/privacy" className="hover:text-slate-600">Privacy</Link>
                  <Link href="/page/terms" className="hover:text-slate-600">Terms</Link>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <NewsletterCTA />
    </>
  );
}