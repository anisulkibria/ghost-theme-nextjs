import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TagPageClient from './TagPageClient';

interface Tag {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface TagResponse {
  tag?: Tag;
  error?: string;
}

// Fetch tag information
async function getTag(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/tags/${slug}`, { cache: 'no-store' });
    
    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching tag:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tagResult = await getTag(slug);
  
  if (tagResult?.error || !tagResult?.tag) {
    return {
      title: 'Tag Not Found - Ghost Theme',
      description: 'The requested tag could not be found.',
    };
  }
  
  const tagData = tagResult.tag;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ghost-theme.com';
  const tagUrl = `${baseUrl}/tag/${slug}`;

  return {
    title: `${tagData.name} - Tag | Ghost Theme`,
    description: tagData.description || `Browse all articles tagged with ${tagData.name}. Discover insights, tutorials, and resources related to ${tagData.name}.`,
    keywords: ['Ghost Theme', 'Ghost CMS Theme', 'Ghost Blog', 'Premium Ghost Theme', tagData.name.toLowerCase(), 'tag', 'ghost blog', 'articles', 'tutorials'],
    openGraph: {
      title: `${tagData.name} - Tag - Ghost Theme`,
      description: tagData.description || `Browse all articles tagged with ${tagData.name}. Discover insights, tutorials, and resources related to ${tagData.name}.`,
      type: 'website',
      url: tagUrl,
      images: [
        {
          url: `${baseUrl}/images/hero.webp`,
          width: 1200,
          height: 630,
          alt: `${tagData.name} - Ghost Theme Tag`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tagData.name} - Tag - Ghost Theme`,
      description: tagData.description || `Browse all articles tagged with ${tagData.name}. Discover insights, tutorials, and resources related to ${tagData.name}.`,
      images: [`${baseUrl}/images/hero.webp`],
    },
    alternates: {
      canonical: tagUrl,
    },
  };
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  return <TagPageClient params={params} />;
}