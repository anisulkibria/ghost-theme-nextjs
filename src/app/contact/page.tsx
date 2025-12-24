import { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact Us - Ghost Theme Support',
  description: 'Get in touch with the Ghost Theme team. Have questions about our Ghost CMS themes, pricing, or need support? We\'re here to help and typically reply within 24 hours.',
  keywords: ['Ghost Theme', 'Ghost CMS Theme', 'Ghost Blog', 'Premium Ghost Theme', 'contact', 'support', 'ghost theme', 'help', 'customer service'],
  openGraph: {
    title: 'Contact Us - Ghost Theme Support',
    description: 'Get in touch with the Ghost Theme team. Have questions about our Ghost CMS themes, pricing, or need support?',
    type: 'website',
    url: 'https://ghost-theme.com/contact',
    images: [
      {
        url: 'https://ghost-theme.com/images/hero.webp',
        width: 1200,
        height: 630,
        alt: 'Contact Ghost Theme',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Ghost Theme',
    description: 'Get in touch with the Ghost Theme team. Have questions about our themes, pricing, or need support?',
    images: ['https://ghost-theme.com/images/hero.webp'],
  },
  alternates: {
    canonical: 'https://ghost-theme.com/contact',
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}