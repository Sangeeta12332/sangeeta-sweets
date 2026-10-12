'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  X,
  SlidersHorizontal,
  Sparkles,
  RotateCcw,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, InitialProduct } from '@/lib/data/initialData';
import ProductCard from '@/components/ProductCard';

const CATEGORY_TABS = [
  { id: 'all', label: 'All Sweets' },
  { id: 'milk-sweets', label: 'Milk Sweets' },
  { id: 'bengali-sweets', label: 'Bengali Sweets' },
  { id: 'dry-fruit-sweets', label: 'Dry Fruit Sweets' },
  { id: 'traditional-mithai', label: 'Traditional Mithai' },
  { id: 'gift-boxes', label: 'Gift Boxes' },
];

function SweetsCatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = [...INITIAL_PRODUCTS];

    // Filter by category
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.ingredients.some((i) => i.toLowerCase().includes(q))
      );
    }

    // Filter by stock
    if (inStockOnly) {
      list = list.filter((p) => p.isAvailable);
    }

    // Sort products
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      // 'featured'
      list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    return list;
  }, [selectedCategory, searchQuery, inStockOnly, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('featured');
    setInStockOnly(false);
  };

  return (
    <div style={{ backgroundColor: 'var(--color-cream-light)', minHeight: '80vh', paddingBottom: '80px' }}>
      {/* 1. CATALOG HERO BANNER */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--color-maroon-dark) 0%, var(--color-maroon) 100%)',
          color: '#ffffff',
          padding: '52px 0 44px 0',
          borderBottom: '3px solid var(--color-gold)',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(212, 175, 55, 0.2)',
              border: '1px solid var(--color-gold)',
              color: 'var(--color-gold-light)',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              marginBottom: '16px',
            }}
          >
            <Sparkles size={16} />
            <span>100% PURE BILONA DESI GHEE CONFECTIONERY</span>
          </div>

          <h1
            style={{
              color: '#ffffff',
              fontSize: 'clamp(2.2rem, 3.8vw, 3rem)',
              marginBottom: '14px',
              fontWeight: 800,
            }}
          >
            Our Royal Sweets Collection
          </h1>

          <p
            style={{
              color: 'rgba(255, 255, 255, 0.88)',
              fontSize: '1.05rem',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Artisanal recipes prepared fresh every dawn using slow-simmered whole milk mawa, Goan cashews, and natural spices. Choose your portion and savour the royal flavours.
          </p>
        </div>
      </section>

      {/* 2. FILTER & SEARCH TOOLBAR */}
      <div className="container" style={{ marginTop: '36px' }}>
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
            padding: '20px 24px',
            marginBottom: '32px',
          }}
        >
          {/* Top Row: Search Input + Sorting */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '20px',
            }}
          >
            {/* Search Input */}
            <div
              style={{
                position: 'relative',
                flex: '1 1 300px',
                maxWidth: '540px',
              }}
            >
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-text-muted)',
                }}
              />
              <input
                type="text"
                placeholder="Search sweet by name or ingredient (e.g. Kaju, Ladoo, Rabdi)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{
                  paddingLeft: '42px',
                  paddingRight: searchQuery ? '40px' : '16px',
                  height: '46px',
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--color-text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Right Controls: Sort + Stock Filter */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                flexWrap: 'wrap',
              }}
            >
              {/* Sort Dropdown */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="form-select"
                  style={{
                    height: '44px',
                    padding: '8px 14px',
                    fontSize: '0.88rem',
                    minWidth: '170px',
                  }}
                >
                  <option value="featured">Most Popular</option>
                  <option value="rating">Top Rated (★ 5.0)</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

              {/* In-Stock Toggle */}
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: 'var(--color-text-main)',
                  cursor: 'pointer',
                  userSelect: 'none',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: inStockOnly ? 'var(--color-maroon-subtle)' : 'transparent',
                }}
              >
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  style={{
                    accentColor: 'var(--color-maroon)',
                    width: '16px',
                    height: '16px',
                    cursor: 'pointer',
                  }}
                />
                <span>In Stock Only</span>
              </label>
            </div>
          </div>

          {/* Bottom Row: Category Filter Tabs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px',
              paddingTop: '16px',
              borderTop: '1px solid var(--color-border-subtle)',
            }}
          >
            {CATEGORY_TABS.map((tab) => {
              const isActive = selectedCategory === tab.id;
              const count =
                tab.id === 'all'
                  ? INITIAL_PRODUCTS.length
                  : INITIAL_PRODUCTS.filter((p) => p.category === tab.id).length;

              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    transition: 'all 0.2s ease',
                    backgroundColor: isActive ? 'var(--color-maroon)' : 'var(--color-cream-light)',
                    color: isActive ? '#ffffff' : 'var(--color-text-main)',
                    border: isActive
                      ? '1px solid var(--color-maroon-dark)'
                      : '1px solid var(--color-border)',
                    boxShadow: isActive ? 'var(--shadow-maroon)' : 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                  }}
                >
                  <span>{tab.label}</span>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      padding: '2px 6px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: isActive ? 'rgba(255, 255, 255, 0.25)' : 'var(--color-border)',
                      color: isActive ? '#ffffff' : 'var(--color-text-secondary)',
                      fontWeight: 700,
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}

            {/* Clear All Filters Button if altered */}
            {(selectedCategory !== 'all' || searchQuery || inStockOnly || sortBy !== 'featured') && (
              <button
                type="button"
                onClick={handleResetFilters}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '8px 14px',
                  fontSize: '0.82rem',
                  color: 'var(--color-maroon)',
                  fontWeight: 600,
                  marginLeft: 'auto',
                  cursor: 'pointer',
                }}
              >
                <RotateCcw size={14} />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* 3. RESULTS SUMMARY BAR */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
            fontSize: '0.9rem',
            color: 'var(--color-text-secondary)',
          }}
        >
          <div>
            Showing <strong>{filteredProducts.length}</strong> handcrafted sweets
            {selectedCategory !== 'all' && (
              <span> in <em>{CATEGORY_TABS.find((t) => t.id === selectedCategory)?.label}</em></span>
            )}
            {searchQuery && (
              <span> matching &quot;<strong>{searchQuery}</strong>&quot;</span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--color-success)' }}>
            <ShieldCheck size={16} />
            <span>100% Pure Desi Ghee Certified</span>
          </div>
        </div>

        {/* 4. PRODUCT GRID */}
        {filteredProducts.length > 0 ? (
          <div className="grid-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              padding: '64px 24px',
              textAlign: 'center',
              maxWidth: '560px',
              margin: '32px auto',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🪔</div>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.4rem',
                color: 'var(--color-maroon-dark)',
                marginBottom: '8px',
              }}
            >
              No sweets found matching your search
            </h3>
            <p
              style={{
                fontSize: '0.95rem',
                color: 'var(--color-text-secondary)',
                marginBottom: '24px',
                lineHeight: 1.5,
              }}
            >
              We couldn&apos;t find any sweets matching &quot;{searchQuery}&quot;. Try searching for classic favourites like <strong>Kaju Katli</strong>, <strong>Motichoor Ladoo</strong>, or <strong>Rasmalai</strong>.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleResetFilters}
            >
              <RotateCcw size={16} />
              <span>Show All 13 Sweets</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SweetsPage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: '80px 24px', textAlign: 'center', color: 'var(--color-maroon)' }}>
          <p>Loading royal sweets catalog...</p>
        </div>
      }
    >
      <SweetsCatalogContent />
    </Suspense>
  );
}
