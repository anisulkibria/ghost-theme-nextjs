import { Organization, Article, Product, Blog, Person } from 'schema-dts';
import { SEOMetadata, SEOConfig, OpenGraphMetadata, TwitterMetadata, StructuredData } from '@/types';

// Global SEO Configuration
export const SEO_CONFIG: SEOConfig = {
  siteName: 'Ghost Theme',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://ghost-theme.com',
  defaultTitle: 'Ghost Theme - Premium Ghost CMS Themes for Your Website',
  defaultDescription: 'Discover beautiful, lightning-fast Ghost themes for serious publishers. Start your Ghost blog, newsletter, or magazine with our premium Ghost CMS themes.',
  defaultImage: '/images/hero.webp',
  twitterHandle: '@ghosttheme',
  facebookAppId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
};

// Helper function to generate absolute URLs
export function getAbsoluteUrl(path: string = ''): string {
  const baseUrl = SEO_CONFIG.siteUrl.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

// Helper function to generate SEO metadata
export function generateSEOMetadata(
  metadata: SEOMetadata,
  config: SEOConfig = SEO_CONFIG
): any {
  const {
    title,
    description,
    keywords,
    image,
    url,
    type = 'website',
    author,
    publishedTime,
    modifiedTime,
    articleSection,
    tags,
    noindex,
    canonical,
  } = metadata;

  const fullTitle = title ? `${title} | ${config.siteName}` : config.defaultTitle;
  const fullDescription = description || config.defaultDescription;
  const fullImage = image ? getAbsoluteUrl(image) : getAbsoluteUrl(config.defaultImage);
  const fullUrl = url ? getAbsoluteUrl(url) : getAbsoluteUrl();

  return {
    title: fullTitle,
    description: fullDescription,
    canonical: canonical || fullUrl,
    noindex: noindex || false,
    openGraph: {
      type: type as any,
      locale: 'en_US',
      url: fullUrl,
      title: fullTitle,
      description: fullDescription,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title || config.siteName,
        },
      ],
      siteName: config.siteName,
      article: type === 'article' ? {
        publishedTime: publishedTime,
        modifiedTime: modifiedTime,
        authors: author ? [author] : undefined,
        section: articleSection,
        tags: tags,
      } : undefined,
    },
    twitter: {
      handle: config.twitterHandle,
      site: config.twitterHandle,
      cardType: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      image: fullImage,
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: keywords?.join(', ') || '',
      },
    ],
  };
}

// Generate structured data for different content types
export function generateStructuredData(type: string, data: any): StructuredData {
  switch (type) {
    case 'organization':
      return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SEO_CONFIG.siteName,
        url: SEO_CONFIG.siteUrl,
        logo: getAbsoluteUrl('/images/logo.png'),
        description: SEO_CONFIG.defaultDescription,
        sameAs: [
          'https://twitter.com/ghosttheme',
          'https://github.com/ghosttheme',
        ],
      };

    case 'article':
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        image: data.image ? getAbsoluteUrl(data.image) : undefined,
        datePublished: data.publishedTime,
        dateModified: data.modifiedTime,
        author: {
          '@type': 'Person',
          name: data.author,
        },
        publisher: {
          '@type': 'Organization',
          name: SEO_CONFIG.siteName,
          logo: {
            '@type': 'ImageObject',
            url: getAbsoluteUrl('/images/logo.png'),
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': data.url,
        },
      };

    case 'product':
      return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: data.name,
        description: data.description,
        image: data.image ? getAbsoluteUrl(data.image) : undefined,
        offers: {
          '@type': 'Offer',
          price: data.price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        brand: {
          '@type': 'Brand',
          name: SEO_CONFIG.siteName,
        },
      };

    case 'blog':
      return {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: data.name || SEO_CONFIG.siteName,
        description: data.description || SEO_CONFIG.defaultDescription,
        url: data.url || SEO_CONFIG.siteUrl,
        publisher: {
          '@type': 'Organization',
          name: SEO_CONFIG.siteName,
          logo: {
            '@type': 'ImageObject',
            url: getAbsoluteUrl('/images/logo.png'),
          },
        },
      };

    case 'person':
      return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: data.name,
        description: data.bio,
        image: data.avatar ? getAbsoluteUrl(data.avatar) : undefined,
        url: data.url ? getAbsoluteUrl(data.url) : undefined,
        sameAs: data.social ? Object.values(data.social).filter(Boolean) : undefined,
      };

    default:
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: data.title,
        description: data.description,
        url: data.url,
      };
  }
}

// Generate SEO metadata for blog posts
export function generateBlogPostSEO(post: any, config: SEOConfig = SEO_CONFIG): {
  seo: any;
  structuredData: StructuredData;
} {
  const metadata: SEOMetadata = {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: ['Ghost Theme', 'Ghost CMS Theme', 'Ghost Blog', 'Premium Ghost Theme', ...(post.seoKeywords || post.tags)],
    image: post.seoImage || post.image,
    url: `/blog/${post.id}`,
    type: 'article',
    author: post.author?.name,
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    articleSection: post.category,
    tags: post.tags,
    noindex: post.noIndex,
  };

  return {
    seo: generateSEOMetadata(metadata, config),
    structuredData: generateStructuredData('article', {
      ...metadata,
      author: post.author?.name,
      url: getAbsoluteUrl(`/blog/${post.id}`),
    }),
  };
}

// Generate SEO metadata for themes
export function generateThemeSEO(theme: any, config: SEOConfig = SEO_CONFIG): {
  seo: any;
  structuredData: StructuredData;
} {
  const metadata: SEOMetadata = {
    title: theme.seoTitle || `${theme.name} - Premium Ghost Theme`,
    description: theme.seoDescription || theme.description,
    keywords: ['Ghost Theme', 'Ghost CMS Theme', 'Ghost Blog', 'Premium Ghost Theme', ...(theme.seoKeywords || [...(theme.tags || []), theme.category, 'ghost theme'])],
    image: theme.seoImage || theme.image,
    url: `/themes/${theme.id}`,
    type: 'product',
    noindex: theme.noIndex,
  };

  return {
    seo: generateSEOMetadata(metadata, config),
    structuredData: generateStructuredData('product', {
      ...metadata,
      name: theme.name,
      price: theme.price,
    }),
  };
}

// Generate SEO metadata for pages
export function generatePageSEO(page: any, config: SEOConfig = SEO_CONFIG): {
  seo: any;
  structuredData: StructuredData;
} {
  const metadata: SEOMetadata = {
    title: page.seoTitle || page.title,
    description: page.seoDescription || page.description,
    keywords: page.seoKeywords,
    image: page.seoImage,
    url: `/${page.slug}`,
    type: 'website',
    noindex: page.noIndex,
  };

  return {
    seo: generateSEOMetadata(metadata, config),
    structuredData: generateStructuredData('webpage', {
      ...metadata,
      url: getAbsoluteUrl(`/${page.slug}`),
    }),
  };
}

// Generate SEO metadata for authors
export function generateAuthorSEO(author: any, config: SEOConfig = SEO_CONFIG): {
  seo: any;
  structuredData: StructuredData;
} {
  const metadata: SEOMetadata = {
    title: `${author.name} - Author`,
    description: author.seoDescription || author.bio,
    keywords: ['Ghost Theme', 'Ghost CMS Theme', 'Ghost Blog', 'Premium Ghost Theme', ...(author.seoKeywords || [])],
    image: author.seoImage || author.avatar,
    url: `/author/${author.id}`,
    type: 'profile',
    author: author.name,
    noindex: author.noIndex,
  };

  return {
    seo: generateSEOMetadata(metadata, config),
    structuredData: generateStructuredData('person', {
      ...metadata,
      name: author.name,
      bio: author.bio,
      avatar: author.avatar,
      url: `/author/${author.id}`,
      social: author.social,
    }),
  };
}

// Generate SEO metadata for homepage
export function generateHomepageSEO(config: SEOConfig = SEO_CONFIG): {
  seo: any;
  structuredData: StructuredData;
} {
  const metadata: SEOMetadata = {
    title: config.defaultTitle,
    description: config.defaultDescription,
    keywords: ['Ghost Theme', 'Ghost CMS Theme', 'Ghost Blog', 'Premium Ghost Theme', 'ghost themes', 'ghost cms', 'premium themes', 'blog themes', 'magazine themes'],
    image: config.defaultImage,
    url: '/',
    type: 'website',
  };

  return {
    seo: generateSEOMetadata(metadata, config),
    structuredData: generateStructuredData('organization', {
      name: config.siteName,
      description: config.defaultDescription,
    }),
  };
}

// Generate breadcrumbs structured data
export function generateBreadcrumbs(breadcrumbs: Array<{ name: string; url: string }>): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: getAbsoluteUrl(crumb.url),
    })),
  };
}