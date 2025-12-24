import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AuthorPageClient from './AuthorPageClient';

// Fetch author data from API
async function getAuthor(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/authors/${slug}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching author:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthor(slug);
  
  if (!author) {
    return {
      title: 'Author Not Found - Ghost Theme',
      description: 'The requested author could not be found.',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ghost-theme.com';
  const authorUrl = `${baseUrl}/author/${slug}`;

  return {
    title: `${author.name} - Author | Ghost Theme`,
    description: author.bio || `Read articles by ${author.name}, a contributor to Ghost Theme. Discover insights and tutorials on Ghost CMS, web development, and design.`,
    keywords: ['Ghost Theme', 'Ghost CMS Theme', 'Ghost Blog', 'Premium Ghost Theme', author.name.toLowerCase(), 'author', 'ghost cms', 'web development', 'blog'],
    openGraph: {
      title: `${author.name} - Author - Ghost Theme`,
      description: author.bio || `Read articles by ${author.name}, a contributor to Ghost Theme.`,
      type: 'profile',
      url: authorUrl,
      images: [
        {
          url: author.avatar || `${baseUrl}/images/author-avatar.jpg`,
          width: 400,
          height: 400,
          alt: `${author.name} - Author Profile`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${author.name} - Author - Ghost Theme`,
      description: author.bio || `Read articles by ${author.name}, a contributor to Ghost Theme.`,
      images: [author.avatar || `${baseUrl}/images/author-avatar.jpg`],
    },
    alternates: {
      canonical: authorUrl,
    },
  };
}

export default function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  return <AuthorPageClient params={params} />;
}