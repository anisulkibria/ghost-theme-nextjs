import { Metadata } from 'next';
import ThemesClient from '@/app/ThemesClient';

export const metadata: Metadata = {
  title: 'Premium Ghost Themes - Ghost CMS Theme Collection',
  description: 'Explore our complete collection of high-quality Ghost CMS themes. Find the perfect Premium Ghost Theme for your Ghost blog or website.',
  keywords: ['Ghost Theme', 'Ghost CMS Theme', 'Ghost Blog', 'Premium Ghost Theme', 'ghost themes', 'cms themes', 'premium themes', 'ghost cms'],
  openGraph: {
    title: 'Premium Ghost Themes - Ghost CMS Theme Collection',
    description: 'Explore our complete collection of high-quality Ghost CMS themes. Find the perfect Premium Ghost Theme for your Ghost blog or website.',
    url: 'https://ghost-theme.com/themes',
    siteName: 'Ghost Theme',
    images: [
      {
        url: 'https://ghost-theme.com/images/hero.webp',
        width: 1200,
        height: 630,
        alt: 'Ghost Theme - Premium Themes Collection',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Premium Themes - Ghost Theme',
    description: 'Explore our complete collection of high-quality Ghost CMS themes.',
    images: ['https://ghost-theme.com/images/hero.webp'],
  },
  alternates: {
    canonical: 'https://ghost-theme.com/themes',
  },
};

export default function ThemesPage() {
  return <ThemesClient />;
}