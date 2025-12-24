import { Metadata } from 'next';
import BlogClient from './BlogClient';

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ghost-theme.com';
  
  return {
    title: 'Ghost Blog - Latest Articles and Tutorials | Ghost Theme',
    description: 'Read the latest articles, tutorials, and insights about Ghost CMS, web development, and digital publishing. Stay updated with our expert Ghost blog content.',
    keywords: 'Ghost Blog, Ghost Theme, Ghost CMS Theme, Premium Ghost Theme, ghost blog, web development, cms tutorials, digital publishing, ghost cms articles',
    openGraph: {
      title: 'Ghost Blog - Latest Articles and Tutorials | Ghost Theme',
      description: 'Read the latest articles, tutorials, and insights about Ghost CMS, web development, and digital publishing. Stay updated with our expert Ghost blog content.',
      url: `${baseUrl}/blog`,
      siteName: 'Ghost Theme',
      images: [
        {
          url: `${baseUrl}/images/hero.webp`,
          width: 1200,
          height: 630,
          alt: 'Ghost Theme Blog - Latest Articles and Tutorials',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Ghost Blog - Latest Articles and Tutorials | Ghost Theme',
      description: 'Read the latest articles, tutorials, and insights about Ghost CMS, web development, and digital publishing. Stay updated with our expert Ghost blog content.',
      images: [`${baseUrl}/images/hero.webp`],
    },
    alternates: {
      canonical: `${baseUrl}/blog`,
    },
  };
}

export default function BlogPage() {
  return <BlogClient />;
}