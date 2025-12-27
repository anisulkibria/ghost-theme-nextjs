'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import NewsletterCTA from '@/components/shared/NewsletterCTA';

export default function BlogClient() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState(4);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/blog');
        const data = await response.json();
        setPosts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLoadMore = () => {
    setVisiblePosts(prev => prev + 3);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-24 pb-16 border-b border-slate-100 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 mt-4">
            <h1 className="text-xs font-bold uppercase tracking-widest text-slate-500">Featured Stories</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto">
            {/* Main Feature (8 cols) */}
            {posts.length > 0 && posts[0] && (
              <Link href={`/blog/${posts[0].id}`} className="lg:col-span-8 relative group rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-500 block">
                <div className="relative w-full aspect-[16/9] md:aspect-[4/3]">
                  <Image
                    src={posts[0].image || 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'}
                    alt="Main Feature"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    width={1200}
                    height={675}
                  />
                </div>

                {/* Floating Content Card */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                  <div className="bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-lg border border-white/20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white bg-slate-900 rounded-sm">
                        {posts[0].tags?.[0] || 'Technology'}
                      </span>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {posts[0].readTime || '6 min read'}
                      </span>
                    </div>
                    <h1 className="text-3xl md:text-3xl lg:text-4xl font-serif font-bold text-slate-900 leading-tight mb-3">
                      {posts[0].title || 'The Future of Digital Publishing'}
                    </h1>
                    <p className="text-slate-600 line-clamp-2 md:line-clamp-2 text-sm md:text-base leading-relaxed">
                      {posts[0].excerpt || 'How headless CMS architectures are redefining the way we build and consume content, enabling faster, more secure, and scalable web experiences.'}
                    </p>
                  </div>
                </div>
              </Link>
            )}

            {/* Secondary Features (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {posts.length > 1 && posts.slice(1, 3).map((post, index) => (
                <Link key={post.id} href={`/blog/${post.id}`} className="relative flex-1 group rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-500 block">
                  <div className="relative w-full aspect-[16/9] md:aspect-[4/3]">
                    <Image
                      src={post.image || (index === 0 ? 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' : 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')}
                      alt="Secondary Feature"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      width={800}
                      height={600}
                    />
                  </div>

                  {/* Floating Content Card */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-20">
                    <div className="bg-white/95 backdrop-blur-sm p-4 sm:p-5 rounded-xl shadow-lg border border-white/20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">
                          {post.tags?.[0] || (index === 0 ? 'Design' : 'Theory')}
                        </span>
                        <span className="text-[10px] font-medium text-slate-400">
                          {post.readTime || (index === 0 ? '4 min read' : '5 min read')}
                        </span>
                      </div>
                      <h3 className="text-lg font-serif font-bold text-slate-900 leading-tight mb-2">{post.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 md:line-clamp-1 lg:line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Filter/Nav */}
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-100 mb-12">
        <div className="container mx-auto px-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-6 py-4 min-w-max border-b border-transparent">
            <Link href="#" className="text-sm font-bold text-slate-900 border-b-2 border-slate-900 pb-4 -mb-4.5">
              All Posts
            </Link>
            {posts && posts.length > 0 && [...new Set(posts.flatMap(post => post.tags || []))].slice(0, 5).map((tag, index) => (
              <Link key={index} href={`/tag/${tag.toLowerCase()}`} className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors pb-4 -mb-4.5">
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content: Medium Style List */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Main Feed (Single Column) */}
            <div className="lg:col-span-8 lg:border-r lg:border-slate-100 lg:pr-12">
              <div className="flex flex-col gap-10" id="blogList">
                {posts.slice(0, visiblePosts).map((post, index) => (
                  <article key={post.id} className="blog-card group cursor-pointer flex flex-col md:flex-row gap-6 md:gap-10 border-b border-slate-100 pb-10 items-stretch md:items-start">
                    <div className="flex-1 order-2 md:order-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Link href={`/author/${post.author?.id}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                            <div className="w-5 h-5 rounded-full bg-slate-200 overflow-hidden">
                              <Image
                                src={post.author?.avatar || "https://ui-avatars.com/api/?name=Anisul+Kibria&background=0D8ABC&color=fff"}
                                alt={post.author?.name || "Author"}
                                width={20}
                                height={20}
                              />
                            </div>
                            <span className="text-xs font-medium text-slate-900">
                              {post.author?.name || 'Anisul Kibria'}
                            </span>
                          </Link>
                          <span className="text-slate-300 mx-1">in</span>
                          {post.tags && post.tags.length > 0 && (
                            <Link href={`/tag/${post.tags[0].toLowerCase()}`} className="text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors">
                              {post.tags[0]}
                            </Link>
                          )}
                        </div>
                        <Link href={`/blog/${post.id}`} className="block group">
                          <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-900 mb-2 group-hover:underline decoration-2 underline-offset-4 decoration-slate-900 leading-tight">
                            {post.title}
                          </h3>
                          <p className="hidden md:block text-slate-600 text-[15px] leading-relaxed line-clamp-2 md:line-clamp-3 mb-4 font-serif text-opacity-90">
                            {post.excerpt}
                          </p>
                        </Link>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-2 md:mt-0">
                        <span>
                          {post.publishedAt
                            ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                            : 'Nov 28'
                          }
                        </span>
                        <span>•</span>
                        <span>{post.readTime || '6 min read'}</span>
                      </div>
                    </div>
                    <Link href={`/blog/${post.id}`} className="w-full md:w-40 md:h-28 aspect-[16/9] md:aspect-[4/3] shrink-0 order-1 md:order-2 rounded-md overflow-hidden bg-slate-100">
                      <Image
                        src={post.image || 'https://images.unsplash.com/photo-1542831371-7b5f696539a8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'}
                        alt="Thumb"
                        className="w-full h-full object-cover"
                        width={160}
                        height={112}
                      />
                    </Link>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {posts.length > visiblePosts && (
                <div className="mt-16 flex justify-center mb-12 lg:mb-0">
                  <button id="loadMoreBtn" onClick={handleLoadMore} className="group inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 font-medium text-sm rounded-full hover:border-slate-900 hover:text-slate-900 transition-all">
                    Load more
                    <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Right Sidebar (Discover More) */}
            <aside className="hidden lg:block lg:col-span-4 pl-4 sticky top-24 self-start h-screen">
              {/* Newsletter Widget */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
                <h3 className="font-bold font-serif text-xl text-slate-900 mb-2">Newsletter</h3>
                <p className="text-sm text-slate-600 mb-4">Get the latest posts delivered right to your inbox.</p>
                <form className="flex flex-col gap-2">
                  <input type="email" placeholder="Your email address" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-brand-primary text-sm" />
                  <button className="w-full px-4 py-2 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-dark transition-colors text-sm">
                    Subscribe
                  </button>
                </form>
              </div>

              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6">Staff Picks</h4>
              <div className="flex flex-col gap-6 mb-12">
                {posts.slice(0, 3).map((post, index) => (
                  <div key={post.id} className="flex gap-4 items-start group mb-6">
                    <span className="text-3xl font-black text-slate-200 font-serif -mt-1 group-hover:text-brand-primary transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <div className="mb-1">
                        {post.tags && post.tags.length > 0 && (
                          <Link href={`/tag/${post.tags[0].toLowerCase()}`} className="text-[11px] font-bold text-brand-primary uppercase tracking-wider hover:underline">
                            {post.tags[0]}
                          </Link>
                        )}
                      </div>
                      <Link href={`/blog/${post.id}`} className="text-sm font-bold text-slate-900 leading-snug group-hover:underline">
                        {post.title}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6">Recommended Topics</h4>
              <div className="flex flex-wrap gap-2 mb-12">
                {posts && posts.length > 0 && [...new Set(posts.flatMap(post => post.tags || []))].slice(0, 6).map((tag, index) => (
                  <Link key={index} href={`/tag/${tag.toLowerCase()}`} className="px-3 py-2 bg-slate-100 rounded-full text-xs font-medium text-slate-600 hover:bg-slate-200">
                    {tag}
                  </Link>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-6">
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-slate-400">
                  <Link href="/contact" className="hover:text-slate-600">Help</Link>
                  <Link href="/about" className="hover:text-slate-600">About</Link>
                  <Link href="/terms" className="hover:text-slate-600">Privacy</Link>
                  <Link href="/terms" className="hover:text-slate-600">Terms</Link>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <NewsletterCTA primaryButtonText="Get All Access Pass - $99" />
    </div>
  );
}