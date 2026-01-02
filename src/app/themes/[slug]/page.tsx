import { Metadata } from 'next';
import ThemePageClient from './ThemePageClient';
import { generateMetadata } from './metadata';

export { generateMetadata };

export default function ThemePage({ params }: { params: Promise<{ slug: string }> }) {
  return <ThemePageClient params={params} />;
}
