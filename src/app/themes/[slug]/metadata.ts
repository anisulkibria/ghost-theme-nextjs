import { Metadata } from 'next';

// Fetch theme data for metadata generation
async function getTheme(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const themeResponse = await fetch(`${baseUrl}/api/themes/${slug}`, {
      cache: 'no-store',
    });
    
    if (themeResponse.ok) {
      return await themeResponse.json();
    }
    return null;
  } catch (error) {
    console.error('Error fetching theme:', error);
    return null;
  }
}

// Generate metadata for the theme page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const theme = await getTheme(slug);
  
  if (!theme) {
    return {
      title: 'Theme Not Found',
      description: 'The requested theme could not be found.',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ghost-theme.com';
  
  // Use SEO-specific fields if available, otherwise fallback to default fields
  const title = theme.seoTitle || `${theme.name} Ghost Theme - Premium Ghost CMS Theme`;
  const description = theme.seoDescription || theme.fullDescription || theme.description;
  const image = theme.seoImage || theme.image;
  const keywords = theme.seoKeywords && theme.seoKeywords.length > 0 
    ? theme.seoKeywords 
    : ['Ghost Theme', 'Ghost CMS Theme', 'Ghost Blog', 'Premium Ghost Theme', ...(theme.tags || [])];
  const ogType = theme.ogType || 'website';
  
  return {
    title: title,
    description: description,
    keywords: keywords,
    openGraph: {
      title: title,
      description: description,
      url: `${baseUrl}/themes/${theme.id}`,
      siteName: 'Ghost Theme',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${theme.name} Theme Preview`,
        },
      ],
      locale: 'en_US',
      type: ogType as any,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [image],
    },
    alternates: {
      canonical: `${baseUrl}/themes/${theme.id}`,
    },
    robots: {
      index: !theme.noIndex,
      follow: !theme.noIndex,
    },
  };
}
