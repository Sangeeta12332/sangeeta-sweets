'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import ProductCard from './ProductCard';
import { INITIAL_PRODUCTS, InitialProduct } from '@/lib/data/initialData';

const TABS = [
  { id: 'all', label: 'All Bestsellers' },
  { id: 'dry-fruit-sweets', label: 'Kaju & Dry Fruit' },
  { id: 'bengali-sweets', label: 'Bengali Delicacies' },
  { id: 'milk-sweets', label: 'Milk & Mawa' },
  { id: 'traditional-mithai', label: 'Desi Ghee Ladoos' },
  { id: 'gift-boxes', label: 'Festive Boxes' },
];

export default function HomeFeaturedTabs() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredProducts: InitialProduct[] =
    activeTab === 'all'
      ? INITIAL_PRODUCTS.filter((p) => p.isBestSeller || p.isFeatured).slice(0, 8)
      : INITIAL_PRODUCTS.filter((p) => p.category === activeTab);

  return (
    <section className="section" style={{ paddingTop: '40px', paddingBottom: '72px' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-kicker">
            <Sparkles size={16} />
            <span>Signature Confections</span>
          </div>
          <h2 className="section-title">Freshly Handcrafted Favourites</h2>
          <p className="section-desc">
            Explore our most cherished traditional sweets, made daily in small batches with 100% pure desi ghee and time-honoured heritage recipes.
          </p>
        </div>

        {/* Tab Filters */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '40px',
          }}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  transition: 'all 0.25s ease',
                  backgroundColor: isActive ? 'var(--color-maroon)' : '#ffffff',
                  color: isActive ? '#ffffff' : 'var(--color-text-main)',
                  border: isActive
                    ? '1.5px solid var(--color-maroon-dark)'
                    : '1.5px solid var(--color-border)',
                  boxShadow: isActive ? 'var(--shadow-maroon)' : 'var(--shadow-sm)',
                  cursor: 'pointer',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="grid-4" style={{ marginBottom: '40px' }}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        {/* View All CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/sweets"
            className="btn btn-primary btn-lg"
            style={{
              padding: '14px 36px',
              fontSize: '1.05rem',
              boxShadow: 'var(--shadow-maroon)',
            }}
          >
            <span>Explore Complete 13-Sweet Menu</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
