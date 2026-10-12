import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { INITIAL_PRODUCTS } from '@/lib/data/initialData';
import SweetDetailClient from './SweetDetailClient';

export function generateStaticParams() {
  return INITIAL_PRODUCTS.map((p) => ({ slug: p.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = INITIAL_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'Sweet Not Found | Sangita Mithai',
    };
  }

  return {
    title: `${product.name} | Sangita Mithai`,
    description: product.shortDescription || product.description,
    openGraph: {
      title: `${product.name} - 100% Pure Desi Ghee | Sangita Mithai`,
      description: product.description,
      images: product.images,
    },
  };
}

export default async function SweetDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = INITIAL_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = INITIAL_PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug
  ).slice(0, 4);

  return <SweetDetailClient product={product} relatedProducts={relatedProducts} />;
}
