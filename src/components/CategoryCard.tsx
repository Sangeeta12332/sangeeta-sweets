import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: {
    _id?: string;
    name: string;
    slug: string;
    description: string;
    image: string;
    itemCount?: number;
  };
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/sweets?category=${category.slug}`} className="category-card">
      <div className="category-card-img-wrap">
        <Image
          src={category.image || '/images/hero-sweets.jpg'}
          alt={category.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="category-card-img"
        />
      </div>
      <div className="category-card-body">
        <h3 className="category-card-name">{category.name}</h3>
        <p className="category-card-desc">{category.description}</p>
        <span className="category-card-link">
          <span>Explore Collection</span>
          <ArrowRight size={15} />
        </span>
      </div>
    </Link>
  );
}
