import { Metadata } from 'next';

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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getDocumentation(slug);
  
  if (!doc) {
    return {
      title: 'Documentation Not Found - Ghost Theme',
      description: 'The requested documentation page could not be found.',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ghost-theme.com';
  const docUrl = `${baseUrl}/documentation/${slug}`;

  return {
    title: `${doc.title} - Ghost Theme Documentation`,
    description: doc.description || `Complete guide for ${doc.title}. Learn how to install, configure, and customize this Ghost CMS theme.`,
    keywords: ['Ghost Theme', 'Ghost CMS Theme', 'Ghost Blog', 'Premium Ghost Theme', `${doc.title.toLowerCase()}`, 'ghost theme', 'documentation', 'guide', 'tutorial', 'installation', 'configuration'],
    openGraph: {
      title: `${doc.title} - Ghost Theme Documentation`,
      description: doc.description || `Complete guide for ${doc.title}. Learn how to install, configure, and customize this Ghost theme.`,
      type: 'article',
      url: docUrl,
      images: [
        {
          url: `${baseUrl}/images/hero.webp`,
          width: 1200,
          height: 630,
          alt: `${doc.title} - Ghost Theme Documentation`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${doc.title} - Ghost Theme Documentation`,
      description: doc.description || `Complete guide for ${doc.title}. Learn how to install, configure, and customize this Ghost theme.`,
      images: [`${baseUrl}/images/hero.webp`],
    },
    alternates: {
      canonical: docUrl,
    },
  };
}