'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Star, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface WeightOption {
  label: string;
  price: number;
}

interface ProductCardProps {
  product: {
    _id?: string;
    id?: string;
    name: string;
    slug: string;
    shortDescription?: string;
    description?: string;
    price: number;
    compareAtPrice?: number;
    category: string;
    images: string[];
    weightOptions?: WeightOption[];
    isFeatured?: boolean;
    isBestSeller?: boolean;
    isAvailable?: boolean;
    rating?: number;
    reviewCount?: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const defaultWeight =
    product.weightOptions && product.weightOptions.length > 0
      ? product.weightOptions[0].label
      : '500g';
  const defaultPrice =
    product.weightOptions && product.weightOptions.length > 0
      ? product.weightOptions[0].price
      : product.price;

  const [selectedWeight, setSelectedWeight] = useState(defaultWeight);
  const [currentPrice, setCurrentPrice] = useState(defaultPrice);

  const handleWeightChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedWeight(val);
    const match = product.weightOptions?.find((opt) => opt.label === val);
    if (match) {
      setCurrentPrice(match.price);
    }
  };

  const imageSrc =
    product.images && product.images.length > 0 ? product.images[0] : '/images/hero-sweets.jpg';

  return (
    <div className="product-card">
      <div className="product-card-image-wrap">
        <Link href={`/sweets/${product.slug}`} tabIndex={-1} aria-label={product.name}>
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="product-card-image"
          />
        </Link>

        {/* Badges */}
        <div className="product-card-badge" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {product.isBestSeller && <span className="badge badge-gold">★ Bestseller</span>}
          {product.isFeatured && !product.isBestSeller && (
            <span className="badge badge-maroon">Signature</span>
          )}
          {!product.isAvailable && <span className="badge badge-error">Sold Out</span>}
        </div>
      </div>

      <div className="product-card-body">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '4px',
          }}
        >
          <span className="product-card-category">{product.category.replace(/-/g, ' ')}</span>
          {product.rating && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                fontSize: '0.8rem',
                color: 'var(--color-saffron-dark)',
                fontWeight: 700,
              }}
            >
              <Star size={13} fill="var(--color-saffron)" color="var(--color-saffron)" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        <Link href={`/sweets/${product.slug}`}>
          <h3 className="product-card-title">{product.name}</h3>
        </Link>

        <p className="product-card-desc">
          {product.shortDescription || product.description || 'Authentic traditional Indian sweet crafted with desi ghee.'}
        </p>

        {/* Weight Selector */}
        {product.weightOptions && product.weightOptions.length > 1 ? (
          <div style={{ marginBottom: '12px' }}>
            <label
              htmlFor={`weight-select-${product.slug}`}
              style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}
            >
              Pack Size:
            </label>
            <select
              id={`weight-select-${product.slug}`}
              value={selectedWeight}
              onChange={handleWeightChange}
              className="form-select"
              style={{ padding: '6px 10px', fontSize: '0.85rem' }}
            >
              {product.weightOptions.map((opt) => (
                <option key={opt.label} value={opt.label}>
                  {opt.label} (₹{opt.price})
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
            Pack: <strong>{selectedWeight}</strong>
          </div>
        )}

        {/* Pricing & Add to Cart */}
        <div className="product-card-footer">
          <div className="product-price-box">
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span className="product-price">₹{currentPrice}</span>
              {product.compareAtPrice && (
                <span className="product-price-compare">₹{product.compareAtPrice}</span>
              )}
            </div>
            <span className="product-price-unit">per {selectedWeight}</span>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => addItem(product, 1, selectedWeight, currentPrice)}
            disabled={product.isAvailable === false}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag size={15} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
