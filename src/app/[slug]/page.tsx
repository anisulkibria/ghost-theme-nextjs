import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageTemplate from '@/components/PageTemplate';
import SEO from '@/components/SEO';
import { generatePageSEO } from '@/lib/seo';
import prisma from '@/lib/prisma';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getPage(slug: string) {
  try {
    const page = await prisma.page.findUnique({
      where: {
        slug: slug,
        published: true,
      },
    });

    return page;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: `${page.title} | Ghost Theme`,
    description: page.description || `Read about ${page.title} on Ghost Theme. Learn more about our Ghost CMS themes and services.`,
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    notFound();
  }

  const { seo, structuredData } = generatePageSEO(page);

  return (
    <>
      <SEO seo={seo} structuredData={structuredData} />
      <PageTemplate
        title={page.title}
        lastUpdated={new Date(page.lastUpdated).toLocaleDateString()}
      >
        <div
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </PageTemplate>
    </>
  );
}