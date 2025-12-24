'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import NewsletterCTA from '@/components/shared/NewsletterCTA';
import React, { useState, useEffect } from 'react';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  readTime: string;
  category: string;
  image: string;
  featured: boolean;
  tags: string[];
  publishedAt: string;
  authorId: string;
  documentationId: string | null;
  authorName?: string;
  authorBio?: string;
  authorAvatar?: string;
  authorUrl?: string;
  authorSocial?: any;
  authorCreatedAt?: string;
  authorUpdatedAt?: string;
}

export default function TagPageClient({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const [tagData, setTagData] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [visiblePosts, setVisiblePosts] = useState(4); // Show first 4 posts initially

  useEffect(() => {
    const fetchTagData = async () => {
      try {
        // Fetch tag information
        const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';
        const tagResponse = await fetch(`${baseUrl}/api/tags/${slug}`, { cache: 'no-store' });
        const tagResult = await tagResponse.json();
        
        if (tagResult.error || !tagResult.tag) {
          notFound();
          return;
        }
        
        setTagData(tagResult.tag);

        // Fetch posts for this tag
        const blogResponse = await fetch(`${baseUrl}/api/blog?tag=${slug}`, { cache: 'no-store' });
        const postsResult = await blogResponse.json();
        
        setPosts(Array.isArray(postsResult) ? postsResult : []);
      } catch (error) {
        console.error('Error fetching tag data:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchTagData();
  }, [slug]);

  const handleLoadMore = () => {
    setVisiblePosts(prev => prev + 3); // Load 3 more posts each time
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Loading tag...</p>
        </div>
      </div>
    );
  }

  if (!tagData) {
    notFound();
  }

  const staffPicks = posts.slice(0, 3).map((post: Post, index: number) => ({
    number: String(index + 1).padStart(2, '0'),
    category: post.tags?.[0] || 'Technology',
    title: post.title,
    slug: post.id
  }));

  const relatedTags = posts && posts.length > 0 
    ? [...new Set(posts.flatMap((post: Post) => post.tags || []))].slice(0, 5)
    : ['AI', 'Machine Learning', 'Blockchain', 'Cybersecurity', 'Cloud Computing'];

  return (
    <>
      {/* Tag Hero */}
      <section className="pt-32 pb-12 border-b border-slate-100 bg-slate-50/50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-primary/10 text-brand-primary mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 mb-6">{tagData.name}</h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-serif">
            {tagData.description || `A collection of posts about ${tagData.name}.`}
          </p>
          <div className="mt-8 flex justify-center gap-4 text-sm font-medium text-slate-500">
            <span>{posts.length} Posts</span>
            <span>•</span>
            <span>Updated Yesterday</span>
          </div>
        </div>
      </section>

      {/* Main Content: Medium Style List */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
   
            {/* Main Feed (Single Column) */}
            <div className="lg:col-span-8 lg:border-r lg:border-slate-100 lg:pr-12">
              <div className="flex flex-col gap-10" id="tagList">
   
                {/* Render posts with load more functionality */}
                {posts.slice(0, visiblePosts).map((post: Post, index: number) => (
                  <article key={post.id} className="group cursor-pointer flex flex-col md:flex-row gap-6 md:gap-10 border-b border-slate-100 pb-10 items-stretch md:items-start">
                    <div className="flex-1 order-2 md:order-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-5 h-5 rounded-full bg-slate-200 overflow-hidden">
                            <Image
                              src="/images/author-avatar.jpg"
                              alt="Author"
                              width={20}
                              height={20}
                            />
                          </div>
                          <Link href={`/author/${post.authorId}`} className="text-xs font-medium text-slate-900 hover:underline">{post.authorName || 'Anisul Kibria'}</Link>
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
                        <span>Nov 28</span>
                        <span>•</span>
                        <span>{post.readTime || '6 min read'}</span>
                      </div>
                    </div>
                    <Link href={`/blog/${post.id}`} className="w-full md:w-40 md:h-28 aspect-[16/9] md:aspect-[4/3] shrink-0 order-1 md:order-2 rounded-md overflow-hidden bg-slate-100">
                      <Image
                        src={post.image || 'https://images.unsplash.com/photo-1497215728101-850c78e973c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'}
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
                {relatedTags.map((tag: string) => (
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