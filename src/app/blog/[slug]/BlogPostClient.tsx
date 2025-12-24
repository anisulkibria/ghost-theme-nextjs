'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github.css';
import NewsletterCTA from '@/components/shared/NewsletterCTA';
import NewsletterForm from '@/components/shared/NewsletterForm';
import ShareButton from '@/components/shared/ShareButton';
import CopyLinkButton from '@/components/shared/CopyLinkButton';
import TableOfContents from '@/components/shared/TableOfContents';

// Define the type for blog post with author
export interface BlogPost {
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
  author: {
    id: string;
    name: string;
    bio: string;
    avatar: string;
  };
}

// Related posts interface
interface RelatedPost {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  image: string;
}

// Markdown content component for blog posts
function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose prose-lg prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand-primary hover:prose-a:text-brand-primary/80 prose-img:rounded-xl prose-img:shadow-lg prose-blockquote:border-l-4 prose-blockquote:border-brand-primary prose-blockquote:bg-slate-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-slate-600 prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:shadow-lg prose-pre:rounded-lg prose-pre:overflow-x-auto prose-code:text-brand-primary prose-code:bg-slate-100 prose-code:rounded-md prose-code:px-1 prose-code:py-0.5 prose-code:before:content-[''] prose-code:after:content-[''] prose-table:border prose-table:border-slate-200 prose-th:border prose-th:border-slate-200 prose-th:bg-slate-50 prose-th:font-semibold prose-th:px-4 prose-th:py-2 prose-td:border prose-td:border-slate-200 prose-td:px-4 prose-td:py-2 prose-hr:border-slate-200 prose-hr:my-8">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

// Fetch related posts
async function getRelatedPosts(currentPostId: string): Promise<RelatedPost[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/blog`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.error(`Failed to fetch related posts: ${res.status}`);
      return [];
    }

    const data = await res.json();
    
    // Filter out the current post and take up to 3 related posts
    const relatedPosts = data
      .filter((post: BlogPost) => post.id !== currentPostId)
      .slice(0, 3)
      .map((post: BlogPost) => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        publishedAt: new Date(post.publishedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        readTime: post.readTime,
        image: post.image
      }));
    
    return relatedPosts;
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

export default function BlogPostClient({ post, slug }: { post: BlogPost; slug: string }) {
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchRelatedPosts = async () => {
      const relatedData = await getRelatedPosts(slug);
      setRelatedPosts(relatedData);
      setLoading(false);
    };
    
    fetchRelatedPosts();
  }, [slug]);

  return (
    <>
      {/* Article Header */}
      <header className="pt-32 pb-12 md:pt-40 md:pb-20 bg-white relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
 
            {/* Text Column (Left) */}
            <div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1">
 
              {/* Meta */}
              <div className="flex items-center gap-3 text-sm mb-4">
                <Link href={`/tag/${post.category.toLowerCase()}`}
                  className="px-3 py-1 bg-brand-primary/10 text-brand-primary font-bold uppercase tracking-widest text-xs rounded-full hover:bg-brand-primary hover:text-white transition-colors">{post.category}</Link>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 font-medium">{post.readTime}</span>
              </div>
 
              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-slate-900 leading-tight">
                {post.title}
              </h1>
 
              {/* Excerpt */}
              <p className="text-xl text-slate-600 font-serif italic leading-relaxed">
                "{post.excerpt}"
              </p>
 
              {/* Author */}
              <div className="flex items-center gap-4 mt-6">
                <div
                  className="flex items-center gap-3 bg-white pl-2 pr-4 py-2 rounded-full border border-slate-100 shadow-sm">
                  <Image
                    src="/images/author-avatar.jpg"
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full ring-2 ring-white"
                    width={40}
                    height={40}
                    unoptimized={false}
                  />
                  <div className="text-left leading-tight">
                    <Link href={`/author/${post.author.id}`} className="text-sm font-bold text-slate-900 hover:underline">{post.author.name}</Link>
                  </div>
                </div>
              </div>
 
            </div>
 
            {/* Image Column (Right) */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <div
                className="relative aspect-[3/2] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-900/5 bg-slate-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  width={800}
                  height={533}
                  unoptimized={post.image.includes('unsplash.com')}
                />
              </div>
              <p className="mt-3 text-xs text-slate-400 text-right font-mono">IMG_001 • UNPLSH</p>
            </div>
 
          </div>
        </div>
      </header>
 
      {/* Main Content */}
      <main className="flex-grow bg-white">
 
        <div className="container mx-auto px-4 pb-20 max-w-7xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
 
            {/* Left Sidebar: Share */}
            <aside className="hidden lg:block lg:col-span-2">
              <div className="sticky top-32">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Share</p>
                <div className="flex flex-col gap-3">
                  <ShareButton
                    url={`https://localhost:3000/blog/${post.id}`}
                    title={post.title}
                    platform="twitter"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 hover:bg-[#1DA1F2] hover:text-white transition-all duration-300"
                  />
                  <ShareButton
                    url={`https://localhost:3000/blog/${post.id}`}
                    title={post.title}
                    platform="facebook"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 hover:bg-[#4267B2] hover:text-white transition-all duration-300"
                  />
                  <ShareButton
                    url={`https://localhost:3000/blog/${post.id}`}
                    title={post.title}
                    platform="linkedin"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 hover:bg-[#0077b5] hover:text-white transition-all duration-300"
                  />
                  <CopyLinkButton
                    url={`https://localhost:3000/blog/${post.id}`}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 hover:bg-slate-800 hover:text-white transition-all duration-300"
                  />
                </div>
              </div>
            </aside>
 
            {/* Center: Article */}
            <article
              className="col-span-1 lg:col-span-7 prose prose-lg prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand-primary hover:prose-a:text-brand-primary/80 prose-img:rounded-xl prose-img:shadow-lg prose-blockquote:border-l-4 prose-blockquote:border-brand-primary prose-blockquote:bg-slate-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-slate-600 prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:shadow-lg prose-pre:rounded-lg prose-pre:overflow-x-auto prose-code:text-brand-primary prose-code:bg-slate-100 prose-code:rounded-md prose-code:px-1 prose-code:py-0.5 prose-code:before:content-[''] prose-code:after:content-[''] prose-table:border prose-table:border-slate-200 prose-th:border prose-th:border-slate-200 prose-th:bg-slate-50 prose-th:font-semibold prose-th:px-4 prose-th:py-2 prose-td:border prose-td:border-slate-200 prose-td:px-4 prose-td:py-2 prose-hr:border-slate-200 prose-hr:my-8">
              <p className="lead text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed font-serif antialiased">
                {post.excerpt}
              </p>
 
              <MarkdownContent content={post.content} />
 
              <hr className="my-12 border-slate-200" />
 
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                      className="px-3 py-1 bg-slate-100 text-slate-700 text-sm font-medium rounded-full hover:bg-brand-dark hover:text-white transition-all duration-200 shadow-sm hover:shadow-lg hover:scale-105"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
 
              {/* Author Box */}
              <div
                className="not-prose bg-slate-50 rounded-2xl p-8 flex flex-col sm:flex-row gap-6 items-start border border-slate-100">
                <div className="flex-shrink-0">
                  <div
                    className="w-20 h-20 rounded-full bg-slate-200 overflow-hidden ring-4 ring-white shadow-md">
                    <Image
                      src="/images/author-avatar.jpg"
                      alt={post.author.name}
                      className="w-full h-full object-cover"
                      width={80}
                      height={80}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">About {post.author.name}</h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {post.author.bio}
                  </p>
                  <div className="flex gap-3">
                    <Link href={`/author/${post.author.id}`} className="text-sm font-bold text-brand-primary hover:text-brand-dark">View all
                      posts</Link>
                  </div>
                </div>
              </div>
            </article>
 
            {/* Right Sidebar: TOC */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-32">
                {/* Newsletter Widget */}
                <NewsletterForm />
 
                <TableOfContents content={post.content} />
 
                {/* Promo Box */}
                <div className="mt-12 bg-slate-900 rounded-xl p-6 text-white text-center">
                  <h5 className="font-bold text-lg mb-2">Build Better Sites</h5>
                  <p className="text-slate-400 text-sm mb-6">Get access to all premium Ghost themes for one low
                    price.</p>
                  <Link href="/all-access-pass"
                    className="block w-full py-3 px-4 bg-brand-primary rounded-lg text-sm font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30">Get
                    All Access</Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
 
      {/* Related Posts */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 font-display">Keep Reading</h2>
              <p className="text-slate-600">More articles you might find interesting.</p>
            </div>
            <Link href="/blog"
              className="hidden md:inline-flex text-brand-primary font-bold hover:underline items-center gap-2">
              View all posts
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </Link>
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((post, index) => (
              <Link key={post.id} href={`/blog/${post.id}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-video bg-slate-100 overflow-hidden relative">
                  <Image
                    src={post.image}
                    alt="Related"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    width={400}
                    height={225}
                    unoptimized={post.image.includes('unsplash.com')}
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold ${
                        index === 0 ? 'text-slate-900' :
                        index === 1 ? 'text-brand-primary bg-brand-primary/10 uppercase tracking-widest' :
                        'text-slate-900'
                      }`}>
                      {index === 0 ? 'Update' : index === 1 ? 'Technology' : 'Opinion'}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 font-medium">
                    <span>{post.publishedAt}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3
                    className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-primary transition-colors leading-tight">
                    {post.title}
                  </h3>
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