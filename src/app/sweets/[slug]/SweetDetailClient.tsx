'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star,
  ShoppingBag,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { InitialProduct } from '@/lib/data/initialData';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import ProductCard from '@/components/ProductCard';

interface Props {
  product: InitialProduct;
  relatedProducts: InitialProduct[];
}

export default function SweetDetailClient({ product, relatedProducts }: Props) {
  const { addItem } = useCart();
  const { showToast } = useToast();

  const defaultWeight = product.weightOptions?.[0]?.label || '500g';
  const defaultPrice = product.weightOptions?.[0]?.price || product.price;

  const [selectedWeight, setSelectedWeight] = useState(defaultWeight);
  const [currentPrice, setCurrentPrice] = useState(defaultPrice);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.images[0] || '/images/hero-sweets.jpg');

  const handleWeightSelect = (opt: { label: string; price: number }) => {
    setSelectedWeight(opt.label);
    setCurrentPrice(opt.price);
  };

  const handleAddToCart = () => {
    addItem(product, quantity, selectedWeight, currentPrice);
    showToast(`Added ${quantity}x ${product.name} (${selectedWeight}) to your cart!`, 'success');
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} from Sangita Mithai!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      showToast('Link copied to clipboard!', 'info');
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--color-cream-light)', paddingBottom: '80px' }}>
      {/* Breadcrumb Navigation */}
      <div style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: '#ffffff', padding: '14px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            <Link href="/" style={{ color: 'var(--color-text-secondary)' }}>Home</Link>
            <span>/</span>
            <Link href="/sweets" style={{ color: 'var(--color-text-secondary)' }}>Sweets</Link>
            <span>/</span>
            <span style={{ color: 'var(--color-maroon-dark)', fontWeight: 700 }}>{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '36px' }}>
        {/* Back Link */}
        <Link
          href="/sweets"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.9rem',
            color: 'var(--color-maroon)',
            fontWeight: 600,
            marginBottom: '24px',
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to All Sweets</span>
        </Link>

        {/* Main Product Showcase Card */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-md)',
            padding: '36px',
            marginBottom: '56px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '44px',
            }}
          >
            {/* Left: Photos & Gallery */}
            <div>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1 / 1',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  border: '1.5px solid var(--color-border)',
                  backgroundColor: 'var(--color-cream)',
                  marginBottom: '16px',
                }}
              >
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />

                {/* Badges */}
                <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {product.isBestSeller && <span className="badge badge-gold">★ Bestseller</span>}
                  {product.isFeatured && <span className="badge badge-maroon">Royal Signature</span>}
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div style={{ display: 'flex', gap: '12px' }}>
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedImage(img)}
                      style={{
                        position: 'relative',
                        width: '72px',
                        height: '72px',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        border: selectedImage === img ? '2px solid var(--color-maroon)' : '1px solid var(--color-border)',
                        cursor: 'pointer',
                      }}
                    >
                      <Image src={img} alt={`${product.name} thumbnail ${i + 1}`} fill style={{ objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Details & Buying Controls */}
            <div>
              {/* Category & Rating */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--color-saffron)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {product.category.replace(/-/g, ' ')}
                </span>

                <button
                  type="button"
                  onClick={handleShare}
                  aria-label="Share this sweet"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--color-text-muted)',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                  }}
                >
                  <Share2 size={15} />
                  <span>Share</span>
                </button>
              </div>

              {/* Sweet Title */}
              <h1
                style={{
                  fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                  color: 'var(--color-maroon-dark)',
                  lineHeight: 1.2,
                  marginBottom: '12px',
                }}
              >
                {product.name}
              </h1>

              {/* Star Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', color: 'var(--color-saffron)' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="var(--color-saffron)" color="var(--color-saffron)" />
                  ))}
                </div>
                <strong style={{ fontSize: '0.95rem', color: 'var(--color-maroon-dark)' }}>{product.rating.toFixed(1)}</strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>({product.reviewCount} customer reviews)</span>
              </div>

              {/* Pricing Display */}
              <div
                style={{
                  backgroundColor: 'var(--color-cream-light)',
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '12px',
                }}
              >
                <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-maroon-dark)' }}>
                  ₹{currentPrice * quantity}
                </span>
                {product.compareAtPrice && (
                  <span style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
                    ₹{product.compareAtPrice * quantity}
                  </span>
                )}
                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                  (₹{currentPrice} for {selectedWeight})
                </span>
              </div>

              {/* Long Description */}
              <p
                style={{
                  fontSize: '0.98rem',
                  lineHeight: 1.65,
                  color: 'var(--color-text-secondary)',
                  marginBottom: '28px',
                }}
              >
                {product.description}
              </p>

              {/* Portion Selector Pills */}
              {product.weightOptions && product.weightOptions.length > 0 && (
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '10px' }}>
                    Select Pack / Portion Size:
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {product.weightOptions.map((opt) => {
                      const isSelected = selectedWeight === opt.label;
                      return (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => handleWeightSelect(opt)}
                          style={{
                            padding: '10px 18px',
                            borderRadius: 'var(--radius-md)',
                            border: isSelected ? '2px solid var(--color-maroon)' : '1px solid var(--color-border)',
                            backgroundColor: isSelected ? 'var(--color-maroon-subtle)' : '#ffffff',
                            color: isSelected ? 'var(--color-maroon-dark)' : 'var(--color-text-main)',
                            fontWeight: isSelected ? 700 : 500,
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                        >
                          {opt.label} — ₹{opt.price}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Add to Cart */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1.5px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: '#ffffff',
                    height: '48px',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    style={{
                      width: '40px',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: 'var(--color-maroon)',
                      cursor: 'pointer',
                    }}
                  >
                    -
                  </button>
                  <span style={{ width: '40px', textAlign: 'center', fontWeight: 700, fontSize: '1rem' }}>
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                    aria-label="Increase quantity"
                    style={{
                      width: '40px',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: 'var(--color-maroon)',
                      cursor: 'pointer',
                    }}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={handleAddToCart}
                  disabled={!product.isAvailable}
                  style={{ flex: '1 1 200px', height: '48px' }}
                >
                  <ShoppingBag size={20} />
                  <span>Add to Shopping Cart</span>
                </button>
              </div>

              {/* Purity Highlights Box */}
              <div
                style={{
                  borderTop: '1px solid var(--color-border)',
                  paddingTop: '20px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                  <ShieldCheck size={16} color="var(--color-success)" />
                  <span>100% Shuddh Cow Ghee</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                  <Clock size={16} color="var(--color-saffron)" />
                  <span>Fresh daily kitchen batch</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                  <CheckCircle2 size={16} color="var(--color-success)" />
                  <span>Pure vegetarian silver vark</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                  <Sparkles size={16} color="var(--color-gold-dark)" />
                  <span>Zero chemical preservatives</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Tabs: Ingredients & Shelf Life */}
          <div
            style={{
              marginTop: '44px',
              paddingTop: '32px',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '32px',
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--color-maroon-dark)', marginBottom: '12px' }}>
                  Authentic Ingredients
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {product.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'var(--color-cream)',
                        border: '1px solid var(--color-border)',
                        fontSize: '0.85rem',
                        color: 'var(--color-text-main)',
                      }}
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--color-maroon-dark)', marginBottom: '12px' }}>
                  Shelf Life & Storage Instructions
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  Consume within 5-7 days of opening for optimum crispness and fragrance. Store in a cool, dry place. For milk and chhena sweets (like Rasmalai & Rasgulla), keep refrigerated at 4°C.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Sweets Section */}
        {relatedProducts.length > 0 && (
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.8rem',
                color: 'var(--color-maroon-dark)',
                marginBottom: '24px',
              }}
            >
              You May Also Relish
            </h2>
            <div className="grid-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
