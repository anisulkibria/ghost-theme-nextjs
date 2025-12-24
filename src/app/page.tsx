import { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: 'Ghost Theme - Premium Ghost CMS Themes for Your Website',
  description: 'Discover beautiful, lightning-fast Ghost themes for serious publishers. Start your Ghost blog, newsletter, or magazine with our premium Ghost CMS themes.',
  keywords: ['Ghost Theme', 'Ghost CMS Theme', 'Ghost Blog', 'Premium Ghost Theme', 'ghost themes', 'ghost cms', 'premium themes', 'newsletter themes', 'magazine themes'],
  openGraph: {
    title: 'Ghost Theme - Premium Ghost CMS Themes for Your Website',
    description: 'Discover beautiful, lightning-fast Ghost themes for serious publishers. Start your Ghost blog with our premium Ghost CMS themes.',
    type: 'website',
    url: 'https://ghost-theme.com',
    images: [
      {
        url: 'https://ghost-theme.com/images/hero.webp',
        width: 1200,
        height: 630,
        alt: 'Ghost Theme - Premium Themes for Your Website',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ghost Theme - Premium Themes for Your Website',
    description: 'Discover beautifully designed, lightning-fast Ghost themes for serious publishers.',
    images: ['https://ghost-theme.com/images/hero.webp'],
  },
  alternates: {
    canonical: 'https://ghost-theme.com',
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
