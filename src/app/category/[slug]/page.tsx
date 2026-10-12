import { redirect } from 'next/navigation';
import { INITIAL_CATEGORIES } from '@/lib/data/initialData';

export function generateStaticParams() {
  return INITIAL_CATEGORIES.map((cat) => ({ slug: cat.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CategoryRedirectPage({ params }: Props) {
  const { slug } = await params;
  redirect(`/sweets?category=${slug}`);
}
