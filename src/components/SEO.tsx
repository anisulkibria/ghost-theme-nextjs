'use client';

import Head from 'next/head';
import { StructuredData } from '@/types';

interface SEOProps {
  seo: any;
  structuredData?: StructuredData;
}

export default function SEO({ seo, structuredData }: SEOProps) {
  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        {seo.canonical && <link rel="canonical" href={seo.canonical} />}
        {seo.noindex && <meta name="robots" content="noindex,nofollow" />}
        
        {/* Open Graph tags */}
        <meta property="og:type" content={seo.openGraph?.type} />
        <meta property="og:title" content={seo.openGraph?.title} />
        <meta property="og:description" content={seo.openGraph?.description} />
        <meta property="og:url" content={seo.openGraph?.url} />
        <meta property="og:site_name" content={seo.openGraph?.siteName} />
        <meta property="og:locale" content={seo.openGraph?.locale} />
        
        {seo.openGraph?.images?.map((image: any, index: number) => (
          <meta key={index} property="og:image" content={image.url} />
        ))}
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content={seo.twitter?.cardType} />
        <meta name="twitter:site" content={seo.twitter?.site} />
        <meta name="twitter:creator" content={seo.twitter?.handle} />
        <meta name="twitter:title" content={seo.twitter?.title} />
        <meta name="twitter:description" content={seo.twitter?.description} />
        <meta name="twitter:image" content={seo.twitter?.image} />
        
        {/* Additional meta tags */}
        {seo.additionalMetaTags?.map((tag: any, index: number) => (
          <meta key={index} name={tag.name} content={tag.content} />
        ))}
        
        {/* Structured Data */}
        {structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData),
            }}
          />
        )}
      </Head>
    </>
  );
}