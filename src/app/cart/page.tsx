'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    deliveryFee,
    total,
    totalItems,
    isLoaded,
  } = useCart();

  if (!isLoaded) {
    return (
      <div style={{ padding: '80px 24px', textAlign: 'center', color: 'var(--color-maroon)' }}>
        <p>Loading your shopping basket...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div style={{ backgroundColor: 'var(--color-cream-light)', minHeight: '70vh', padding: '80px 24px' }}>
        <div
          style={{
            maxWidth: '560px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            border: '1px solid var(--color-border)',
            padding: '48px 32px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-maroon-subtle)',
              color: 'var(--color-maroon)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
            }}
          >
            <ShoppingBag size={36} />
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.8rem',
              color: 'var(--color-maroon-dark)',
              marginBottom: '12px',
            }}
          >
            Your Mithai Cart is Empty
          </h1>

          <p
            style={{
              fontSize: '0.95rem',
              color: 'var(--color-text-secondary)',
              marginBottom: '32px',
              lineHeight: 1.6,
            }}
          >
            Add your favourite handcrafted sweets like Kaju Katli, Rasmalai, or festive gift boxes to fill your basket with pure desi ghee sweetness!
          </p>

          <Link
            href="/sweets"
            className="btn btn-primary btn-lg"
            style={{ display: 'inline-flex', gap: '8px' }}
          >
            <span>Explore Royal Sweets</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--color-cream-light)', padding: '48px 0 80px 0' }}>
      <div className="container">
        {/* Title */}
        <div style={{ marginBottom: '32px' }}>
          <h1
            style={{
              fontSize: '2.2rem',
              color: 'var(--color-maroon-dark)',
              marginBottom: '8px',
            }}
          >
            Your Mithai Basket ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
            Review your chosen delicacies and portion weights before checkout.
          </p>
        </div>

        {/* 2-Column Cart Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'flex-start',
          }}
        >
          {/* Left: Items List */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)',
              padding: '24px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--color-border)' }}>
              <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-maroon-dark)' }}>Order Items</span>
              <button
                type="button"
                onClick={clearCart}
                style={{ fontSize: '0.82rem', color: 'var(--color-error)', display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
              >
                <Trash2 size={13} />
                <span>Empty Cart</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.weight}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    paddingBottom: '20px',
                    borderBottom: '1px solid var(--color-border-subtle)',
                  }}
                >
                  {/* Thumbnail */}
                  <div
                    style={{
                      position: 'relative',
                      width: '80px',
                      height: '80px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      backgroundColor: 'var(--color-cream)',
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={item.image || '/images/hero-sweets.jpg'}
                      alt={item.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <Link href={`/sweets/${item.slug}`}>
                      <h3 style={{ fontSize: '1.05rem', color: 'var(--color-maroon-dark)', marginBottom: '4px' }}>
                        {item.name}
                      </h3>
                    </Link>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                      Pack: <strong>{item.weight}</strong> • ₹{item.price} each
                    </div>

                    {/* Stepper + Remove */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          border: '1px solid var(--color-border)',
                          borderRadius: 'var(--radius-md)',
                          height: '32px',
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.weight, item.quantity - 1)}
                          style={{ width: '28px', height: '100%', textAlign: 'center', fontWeight: 700, color: 'var(--color-maroon)' }}
                        >
                          -
                        </button>
                        <span style={{ width: '28px', textAlign: 'center', fontSize: '0.88rem', fontWeight: 600 }}>
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, item.weight, item.quantity + 1)}
                          style={{ width: '28px', height: '100%', textAlign: 'center', fontWeight: 700, color: 'var(--color-maroon)' }}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.productId, item.weight)}
                        aria-label="Remove item"
                        style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', cursor: 'pointer' }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Line Total */}
                  <div style={{ textAlign: 'right', fontWeight: 800, fontSize: '1.15rem', color: 'var(--color-maroon-dark)' }}>
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '20px' }}>
              <Link
                href="/sweets"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.88rem',
                  color: 'var(--color-saffron)',
                  fontWeight: 600,
                }}
              >
                <span>+ Add more sweets from catalog</span>
              </Link>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)',
              padding: '24px',
            }}
          >
            <h2
              style={{
                fontSize: '1.25rem',
                color: 'var(--color-maroon-dark)',
                marginBottom: '20px',
                paddingBottom: '12px',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              Order Bill Summary
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>
                <span>Subtotal ({totalItems} items)</span>
                <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>₹{subtotal}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: 'var(--color-text-secondary)' }}>
                <span>Delivery Charge</span>
                <span style={{ fontWeight: 600, color: deliveryFee === 0 ? 'var(--color-success)' : 'var(--color-text-main)' }}>
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>

              {subtotal < 500 && (
                <div style={{ fontSize: '0.8rem', color: 'var(--color-saffron-dark)', backgroundColor: 'var(--color-saffron-subtle)', padding: '6px 12px', borderRadius: 'var(--radius-sm)' }}>
                  Add ₹{500 - subtotal} more for FREE doorstep delivery!
                </div>
              )}
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '16px',
                borderTop: '1.5px dashed var(--color-border)',
                marginBottom: '24px',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: 'var(--color-maroon-dark)',
              }}
            >
              <span>Total Payable</span>
              <span>₹{total}</span>
            </div>

            {/* Note on checkout */}
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '20px', lineHeight: 1.5 }}>
              * Cash on Delivery (COD) available for all local addresses. Same-day dispatch for orders confirmed before 5:00 PM.
            </p>

            <Link
              href="/checkout"
              className="btn btn-primary btn-block btn-lg"
              style={{
                boxShadow: 'var(--shadow-maroon)',
                fontSize: '1rem',
              }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
