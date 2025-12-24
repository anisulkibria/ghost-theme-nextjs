import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FontLoader from '@/components/FontLoader';
import { generateHomepageSEO } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Ghost Theme - Premium Ghost CMS Themes for Your Website',
  description: 'Discover beautiful, lightning-fast Ghost themes for serious publishers. Start your Ghost blog, newsletter, or magazine with our premium Ghost CMS themes.',
  keywords: ['Ghost Theme', 'Ghost CMS Theme', 'Ghost Blog', 'Premium Ghost Theme', 'ghost themes', 'ghost cms', 'premium themes', 'blog themes', 'magazine themes'],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/favicon.ico', sizes: 'any' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { seo, structuredData } = generateHomepageSEO();

  return (
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <body className="font-sans antialiased text-slate-800 bg-white" suppressHydrationWarning>
        <FontLoader />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
