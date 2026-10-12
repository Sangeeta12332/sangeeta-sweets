import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Award, Clock, Heart, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Our Heritage & Story | Sangita Mithai',
  description:
    'Discover the 40-year story of Sangita Mithai. Crafted with 100% pure desi cow ghee, artisanal slow-simmered mawa, and sacred family recipes.',
};

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-cream-light)', paddingBottom: '80px' }}>
      {/* Hero Banner */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--color-maroon-dark) 0%, var(--color-maroon) 100%)',
          color: '#ffffff',
          padding: '60px 0',
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
              letterSpacing: '0.08em',
              marginBottom: '16px',
            }}
          >
            <Sparkles size={16} />
            <span>HERITAGE, PURITY & TRADITION</span>
          </div>

          <h1
            style={{
              color: '#ffffff',
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              marginBottom: '16px',
              fontWeight: 800,
            }}
          >
            Four Decades of Royal Sweetmaking
          </h1>

          <p
            style={{
              color: 'rgba(255, 255, 255, 0.88)',
              fontSize: '1.1rem',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Founded in 1984, Sangita Mithai was born with a single vow: never compromise on the purity of desi cow ghee and authentic Indian taste.
          </p>
        </div>
      </section>

      {/* Main Story Grid */}
      <div className="container" style={{ marginTop: '56px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center',
            marginBottom: '64px',
          }}
        >
          <div>
            <div className="section-kicker">OUR JOURNEY</div>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--color-maroon-dark)', marginBottom: '20px' }}>
              From a Small Halwai Shop to a Cherished Institution
            </h2>
            <p style={{ fontSize: '1.02rem', lineHeight: 1.7, color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
              What began as a humble confectionery with a single brass kadhai has blossomed into a beloved household name. Over four decades, generations of families have trusted us for their wedding platters, Diwali celebrations, and sacred temple offerings.
            </p>
            <p style={{ fontSize: '1.02rem', lineHeight: 1.7, color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
              While the times have changed, our recipes have stayed unchanged. Our master halwais still start their mornings at 4:00 AM, slowly caramelising fresh full-cream milk, roasting coarse besan to golden perfection, and rolling delicate diamond cuts of Kaju Katli by hand.
            </p>
            <Link href="/sweets" className="btn btn-primary btn-lg">
              <span>Taste Our Creations</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '4 / 3',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '2px solid var(--color-gold)',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <Image
              src="/images/hero-sweets.jpg"
              alt="Sangita Mithai Kitchen and Sweet Assortment"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* 3 Core Principles */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            border: '1px solid var(--color-border)',
            padding: '48px 36px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="section-kicker">UNCOMPROMISING STANDARDS</div>
            <h2 style={{ fontSize: '2rem', color: 'var(--color-maroon-dark)' }}>
              Why Sangita Mithai Remains Different
            </h2>
          </div>

          <div className="grid-3">
            <div style={{ textAlign: 'center', padding: '16px' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-maroon-subtle)',
                  color: 'var(--color-maroon)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto',
                }}
              >
                <Award size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>100% Shuddh Desi Ghee</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                We refuse to use hydrogenated oils, palm oil, or artificial ghee essences. Pure bilona cow ghee is the heartbeat of our confectionery.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '16px' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-saffron-subtle)',
                  color: 'var(--color-saffron)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto',
                }}
              >
                <Heart size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Zero Artificial Preservatives</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Every sweet is made for immediate wholesome enjoyment. We never extend shelf life artificially with chemical preservatives.
              </p>
            </div>

            <div style={{ textAlign: 'center', padding: '16px' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-gold-subtle)',
                  color: 'var(--color-gold-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto',
                }}
              >
                <ShieldCheck size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Sacred Kitchen Hygiene</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                From filtered RO water to food-grade stainless steel surfaces and certified vegetarian silver vark, hygiene is non-negotiable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
