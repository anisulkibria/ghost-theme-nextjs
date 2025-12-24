import { Metadata } from 'next';
import DocumentationPageClient from './DocumentationPageClient';

export const metadata: Metadata = {
  title: 'Ghost Theme Documentation - Ghost CMS Theme Guides',
  description: 'Complete documentation for all Ghost Theme products. Learn how to install, configure, and customize your Ghost CMS themes with our comprehensive guides.',
  keywords: ['Ghost Theme', 'Ghost CMS Theme', 'Ghost Blog', 'Premium Ghost Theme', 'ghost theme documentation', 'ghost cms guide', 'theme installation', 'theme configuration', 'ghost tutorials'],
  openGraph: {
    title: 'Ghost Theme Documentation - Ghost CMS Theme Guides',
    description: 'Complete documentation for all Ghost Theme products. Learn how to install, configure, and customize your Ghost CMS themes.',
    type: 'website',
    url: 'https://ghost-theme.com/documentation',
    images: [
      {
        url: 'https://ghost-theme.com/images/hero.webp',
        width: 1200,
        height: 630,
        alt: 'Ghost Theme Documentation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Documentation - Ghost Theme',
    description: 'Complete documentation for all Ghost Theme products. Learn how to install, configure, and customize your Ghost themes.',
    images: ['https://ghost-theme.com/images/hero.webp'],
  },
  alternates: {
    canonical: 'https://ghost-theme.com/documentation',
  },
};

export default function DocumentationPage() {
  return <DocumentationPageClient />;
}