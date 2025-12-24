import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { generateBlogPostSEO } from '@/lib/seo';
import BlogPostClient from './BlogPostClient';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';

// Define the type for blog post with author
interface BlogPost {
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

// Fetch blog post data
async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/blog/${slug}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      console.error(`Failed to fetch blog post: ${res.status}`);
      return null;
    }

    const data = await res.json();
    
    // Format the date
    const formattedPost = {
      ...data,
      publishedAt: new Date(data.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };
    
    return formattedPost;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
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

// Generate metadata for the blog post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ghost-theme.com';
  const imageUrl = post.image || `${baseUrl}/images/blog-post-1.jpg`;
  
  return {
    title: `${post.title} | Ghost Theme`,
    description: post.excerpt,
    keywords: ['Ghost Theme', 'Ghost CMS Theme', 'Ghost Blog', 'Premium Ghost Theme', ...(post.tags || [])],
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${baseUrl}/blog/${post.id}`,
      siteName: 'Ghost Theme',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: new Date(post.publishedAt).toISOString(),
      authors: [post.author.name],
      section: post.category,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
      creator: post.author.name,
    },
    alternates: {
      canonical: `${baseUrl}/blog/${post.id}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} slug={slug} />;
}