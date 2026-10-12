'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Clock, Phone, ArrowRight, Sparkles } from 'lucide-react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'SM-2026-CONFIRMED';

  return (
    <div style={{ backgroundColor: 'var(--color-cream-light)', minHeight: '75vh', padding: '64px 24px' }}>
      <div
        style={{
          maxWidth: '620px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          border: '1.5px solid var(--color-border)',
          boxShadow: 'var(--shadow-md)',
          padding: '48px 36px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-success-bg)',
            color: 'var(--color-success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
            border: '2px solid var(--color-success)',
          }}
        >
          <CheckCircle2 size={44} />
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 14px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-gold-subtle)',
            color: 'var(--color-gold-dark)',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '16px',
          }}
        >
          <Sparkles size={14} />
          <span>ORDER CONFIRMED</span>
        </div>

        <h1
          style={{
            fontSize: '2.2rem',
            color: 'var(--color-maroon-dark)',
            marginBottom: '12px',
          }}
        >
          Dhanyavaad! Your Order is Placed
        </h1>

        <p
          style={{
            fontSize: '1.02rem',
            color: 'var(--color-text-secondary)',
            marginBottom: '28px',
            lineHeight: 1.6,
          }}
        >
          Our halwais have received your order and are packing your fresh desi ghee sweets with care in aroma-lock packaging.
        </p>

        {/* Order Reference Box */}
        <div
          style={{
            backgroundColor: 'var(--color-cream)',
            borderRadius: 'var(--radius-md)',
            padding: '18px 24px',
            border: '1.5px dashed var(--color-gold)',
            marginBottom: '32px',
          }}
        >
          <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '4px' }}>
            Order Reference ID
          </span>
          <strong style={{ fontSize: '1.5rem', color: 'var(--color-maroon-dark)', letterSpacing: '0.04em' }}>
            #{orderId}
          </strong>
        </div>

        {/* Next Steps */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            textAlign: 'left',
            marginBottom: '36px',
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-md)',
            padding: '20px',
            border: '1px solid var(--color-border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Clock size={20} color="var(--color-saffron)" />
            <span style={{ fontSize: '0.9rem', color: 'var(--color-text-main)' }}>
              Estimated kitchen preparation & dispatch: <strong>45 – 90 mins</strong>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Phone size={20} color="var(--color-maroon)" />
            <span style={{ fontSize: '0.9rem', color: 'var(--color-text-main)' }}>
              Our delivery rider will call your phone prior to arrival for Cash on Delivery collection.
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-secondary">
            <span>Return to Homepage</span>
          </Link>
          <Link href="/sweets" className="btn btn-primary">
            <span>Explore More Sweets</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: '80px 24px', textAlign: 'center' }}>
          <p>Loading confirmation...</p>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
