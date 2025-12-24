export interface Theme {
  id: string;
  name: string;
  description: string;
  fullDescription?: string;
  price: number;
  category: string;
  image: string;
  featured?: boolean;
  tags?: string[];
  layout?: string;
  browsers?: string;
  version?: string;
  ghostVersion?: string;
  features?: string[];
  screenshots?: string[];
  purchaseLink?: string;
  demoLink?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    url?: string;
  };
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  featured?: boolean;
  image?: string;
}

export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  url?: string;
  social?: {
    twitter?: string;
    github?: string;
  website?: string;
  };
  posts?: number;
  location?: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  current?: boolean;
}

export interface ThemeFilter {
  name: string;
  value: string;
  active?: boolean;
}

export interface NewsletterForm {
  email: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  description?: string;
  lastUpdated?: string;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// SEO Metadata Types
export interface SEOMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
  locale?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  articleSection?: string;
  tags?: string[];
  noindex?: boolean;
  canonical?: string;
}

export interface OpenGraphMetadata extends SEOMetadata {
  type?: 'website' | 'article' | 'product' | 'blog';
  siteName?: string;
  locale?: string;
  alternateLocale?: string[];
}

export interface TwitterMetadata {
  card?: 'summary' | 'summary_large_image' | 'app' | 'player';
  site?: string;
  creator?: string;
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
}

export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export interface SEOConfig {
  siteName: string;
  siteUrl: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultImage: string;
  twitterHandle?: string;
  facebookAppId?: string;
}

// Extended types for existing models with SEO
export interface ThemeWithSEO extends Theme {
  seo?: SEOMetadata;
}

export interface BlogPostWithSEO extends BlogPost {
  seo?: SEOMetadata;
}

export interface PageWithSEO extends Page {
  seo?: SEOMetadata;
}

export interface AuthorWithSEO extends Author {
  seo?: SEOMetadata;
}