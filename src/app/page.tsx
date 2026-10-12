import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  HeartHandshake,
  Award,
  Truck,
  Star,
  Gift,
  PhoneCall,
  CheckCircle2,
} from 'lucide-react';
import { INITIAL_CATEGORIES } from '@/lib/data/initialData';
import CategoryCard from '@/components/CategoryCard';
import HomeFeaturedTabs from '@/components/HomeFeaturedTabs';

export default function Home() {
  const displayCategories = INITIAL_CATEGORIES.filter((c) => c.slug !== 'namkeen');

  return (
    <div style={{ backgroundColor: 'var(--color-cream-light)' }}>
      {/* 1. HERO SECTION */}
      <section
        style={{
          position: 'relative',
          padding: '64px 0 80px 0',
          background: 'radial-gradient(ellipse at 80% 20%, rgba(217, 93, 16, 0.08) 0%, rgba(251, 247, 238, 0) 70%), linear-gradient(180deg, #fdfbf7 0%, #fbf7ee 100%)',
          borderBottom: '1px solid var(--color-border)',
          overflow: 'hidden',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '48px',
              alignItems: 'center',
            }}
          >
            {/* Left Content Column */}
            <div>
              {/* Auspicious Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-gold-subtle)',
                  border: '1px solid rgba(195, 152, 58, 0.4)',
                  color: 'var(--color-gold-dark)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  marginBottom: '20px',
                }}
              >
                <Sparkles size={16} color="var(--color-saffron)" />
                <span>PURVEYORS OF ROYAL TASTE SINCE 1984</span>
              </div>

              {/* Grand Headline */}
              <h1
                style={{
                  fontSize: 'clamp(2.4rem, 4vw, 3.4rem)',
                  lineHeight: 1.15,
                  color: 'var(--color-maroon-dark)',
                  marginBottom: '20px',
                  fontWeight: 800,
                }}
              >
                Pure Desi Ghee Mithai Crafted for Royal Celebrations.
              </h1>

              {/* Subheading Narrative */}
              <p
                style={{
                  fontSize: '1.1rem',
                  lineHeight: 1.7,
                  color: 'var(--color-text-secondary)',
                  marginBottom: '32px',
                  maxWidth: '560px',
                }}
              >
                Handcrafted fresh every morning using slow-simmered artisanal mawa, 100% bilona cow ghee, Kashmiri saffron, and premium Goan cashews. Delivered with sacred purity directly to your doorstep.
              </p>

              {/* Call to Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px',
                  marginBottom: '36px',
                }}
              >
                <Link
                  href="/sweets"
                  className="btn btn-primary btn-lg"
                  style={{
                    boxShadow: 'var(--shadow-maroon)',
                  }}
                >
                  <span>Explore Sweets Catalog</span>
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/sweets?category=gift-boxes"
                  className="btn btn-gold btn-lg"
                >
                  <Gift size={18} />
                  <span>Festive Gift Boxes</span>
                </Link>
              </div>

              {/* Trust Badges Bar */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '12px',
                  paddingTop: '20px',
                  borderTop: '1px solid var(--color-border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-maroon-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-maroon)',
                      flexShrink: 0,
                    }}
                  >
                    <Award size={18} />
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--color-maroon-dark)', display: 'block' }}>
                      100% Desi Cow Ghee
                    </strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      Zero palm oil or vanaspati
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-saffron-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-saffron)',
                      flexShrink: 0,
                    }}
                  >
                    <Clock size={18} />
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--color-maroon-dark)', display: 'block' }}>
                      Fresh Daily Batches
                    </strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      Prepared fresh at 4:00 AM
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-gold-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-gold-dark)',
                      flexShrink: 0,
                    }}
                  >
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--color-maroon-dark)', display: 'block' }}>
                      100% Vegetarian
                    </strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      Pure certified silver vark
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-success-bg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-success)',
                      flexShrink: 0,
                    }}
                  >
                    <Truck size={18} />
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--color-maroon-dark)', display: 'block' }}>
                      Same-Day Delivery
                    </strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      Aroma-sealed delivery pack
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Column */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4 / 3.4',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '2px solid var(--color-gold)',
                  boxShadow: '0 24px 50px rgba(104, 19, 36, 0.18)',
                }}
              >
                <Image
                  src="/images/hero-sweets.jpg"
                  alt="Assorted Royal Indian Sweets including Kaju Katli, Gulab Jamun, and Motichoor Ladoo"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />

                {/* Subtle Gradient Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(78, 12, 25, 0.6) 100%)',
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    right: '20px',
                    color: '#ffffff',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: 'var(--color-gold-light)',
                      display: 'block',
                      textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                    }}
                  >
                    The Grand Mithai Platter
                  </span>
                  <span style={{ fontSize: '0.85rem', opacity: 0.9, textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>
                    Handcrafted Kaju Katli, Saffron Rasmalai, and Desi Ghee Ladoos
                  </span>
                </div>
              </div>

              {/* Floating Review Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '-16px',
                  right: '-12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.96)',
                  backdropFilter: 'blur(8px)',
                  padding: '12px 18px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1.5px solid var(--color-gold)',
                  boxShadow: '0 10px 25px rgba(42, 25, 20, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-gold-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-gold-dark)',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                  }}
                >
                  ★
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 800, fontSize: '0.95rem', color: 'var(--color-maroon-dark)' }}>
                    <span>4.9 / 5.0</span>
                    <span style={{ color: 'var(--color-saffron)' }}>★★★★★</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    2,400+ Beloved Families
                  </span>
                </div>
              </div>

              {/* Floating Desi Ghee Pill */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-16px',
                  left: '16px',
                  backgroundColor: 'var(--color-maroon)',
                  color: '#ffffff',
                  padding: '10px 18px',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: '0 8px 20px rgba(104, 19, 36, 0.35)',
                  border: '1px solid var(--color-gold)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                }}
              >
                <span style={{ fontSize: '1rem' }}>🪔</span>
                <span>Authentic 100% Bilona Desi Ghee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EXPLORE CATEGORIES SECTION */}
      <section className="section" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-kicker">
              <Sparkles size={16} />
              <span>Royal Collections</span>
            </div>
            <h2 className="section-title">Indulge by Mithai Category</h2>
            <p className="section-desc">
              Whether you crave delicate chhena soaked in rabdi or rich Goan cashew diamonds, explore our traditional sweet confectionery crafts.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px',
            }}
          >
            {displayCategories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE FEATURED BESTSELLERS TABS */}
      <HomeFeaturedTabs />

      {/* 4. THE PURITY PLEDGE & HERITAGE STORY */}
      <section
        className="section"
        style={{
          backgroundColor: 'var(--color-maroon-dark)',
          color: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
          borderTop: '2px solid var(--color-gold)',
          borderBottom: '2px solid var(--color-gold)',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-header" style={{ marginBottom: '56px' }}>
            <div
              className="section-kicker"
              style={{
                color: 'var(--color-gold-light)',
              }}
            >
              <Award size={16} />
              <span>THE SANGITA MITHAI PROMISE</span>
            </div>
            <h2 className="section-title" style={{ color: '#ffffff' }}>
              The Four Pillars of Sacred Purity
            </h2>
            <p
              className="section-desc"
              style={{ color: 'rgba(255, 255, 255, 0.85)' }}
            >
              For over four decades, our master halwais have honoured age-old culinary secrets without cutting corners or compromising on authentic ingredients.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '32px',
            }}
          >
            {/* Pillar 1 */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                borderRadius: 'var(--radius-lg)',
                padding: '32px 24px',
                border: '1px solid rgba(195, 152, 58, 0.25)',
                transition: 'transform 0.3s ease',
              }}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--color-gold)',
                  color: 'var(--color-maroon-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.6rem',
                  marginBottom: '20px',
                }}
              >
                🥛
              </div>
              <h3
                style={{
                  color: 'var(--color-gold-light)',
                  fontSize: '1.25rem',
                  marginBottom: '10px',
                }}
              >
                100% Bilona Desi Ghee
              </h3>
              <p
                style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  color: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                Zero palm oil. Zero vanaspati. We cook our laddoos, halwas, and soan papdi exclusively in traditional slow-churned desi cow ghee.
              </p>
            </div>

            {/* Pillar 2 */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                borderRadius: 'var(--radius-lg)',
                padding: '32px 24px',
                border: '1px solid rgba(195, 152, 58, 0.25)',
                transition: 'transform 0.3s ease',
              }}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--color-gold)',
                  color: 'var(--color-maroon-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.6rem',
                  marginBottom: '20px',
                }}
              >
                🔥
              </div>
              <h3
                style={{
                  color: 'var(--color-gold-light)',
                  fontSize: '1.25rem',
                  marginBottom: '10px',
                }}
              >
                Slow-Simmered Mawa
              </h3>
              <p
                style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  color: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                Whole milk reduced patiently for 6+ hours in heavy brass kadhais to achieve that irresistible caramelised aroma and rich, velvety texture.
              </p>
            </div>

            {/* Pillar 3 */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                borderRadius: 'var(--radius-lg)',
                padding: '32px 24px',
                border: '1px solid rgba(195, 152, 58, 0.25)',
                transition: 'transform 0.3s ease',
              }}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--color-gold)',
                  color: 'var(--color-maroon-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.6rem',
                  marginBottom: '20px',
                }}
              >
                ✨
              </div>
              <h3
                style={{
                  color: 'var(--color-gold-light)',
                  fontSize: '1.25rem',
                  marginBottom: '10px',
                }}
              >
                Pure Certified Silver Vark
              </h3>
              <p
                style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  color: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                Our Kaju Katli and royal treats feature 100% vegetarian-certified silver foil (chandi vark), machine-beaten with zero animal derivatives.
              </p>
            </div>

            {/* Pillar 4 */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                borderRadius: 'var(--radius-lg)',
                padding: '32px 24px',
                border: '1px solid rgba(195, 152, 58, 0.25)',
                transition: 'transform 0.3s ease',
              }}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--color-gold)',
                  color: 'var(--color-maroon-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.6rem',
                  marginBottom: '20px',
                }}
              >
                📦
              </div>
              <h3
                style={{
                  color: 'var(--color-gold-light)',
                  fontSize: '1.25rem',
                  marginBottom: '10px',
                }}
              >
                Aroma-Lock Packaging
              </h3>
              <p
                style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  color: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                Every order is hand-packed in food-grade, gold-embossed boxes with sealed inner liners, locking in kitchen freshness till it reaches your table.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FESTIVE & WEDDING GIFTING SPOTLIGHT */}
      <section className="section">
        <div className="container">
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              border: '2px solid var(--color-border)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              alignItems: 'center',
            }}
          >
            {/* Visual side */}
            <div
              style={{
                position: 'relative',
                minHeight: '360px',
                width: '100%',
                height: '100%',
              }}
            >
              <Image
                src="/images/dry-fruit-box.jpg"
                alt="Shahi Dry Fruit & Nut Hamper by Sangita Mithai"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, rgba(104,19,36,0.2) 0%, rgba(0,0,0,0) 100%)',
                }}
              />
            </div>

            {/* Content side */}
            <div style={{ padding: '48px 40px' }}>
              <div className="section-kicker">
                <Gift size={16} />
                <span>CELEBRATIONS & BULK ORDERS</span>
              </div>
              <h2
                style={{
                  fontSize: '2.1rem',
                  color: 'var(--color-maroon-dark)',
                  marginBottom: '16px',
                  lineHeight: 1.2,
                }}
              >
                Royal Mithai Hampers for Weddings & Festivities
              </h2>
              <p
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.65,
                  color: 'var(--color-text-secondary)',
                  marginBottom: '24px',
                }}
              >
                Make your Diwali, Rakhi, weddings, and sacred poojas unforgettable with custom-embossed royal gift boxes. Packed with premium dry fruit bites, assorted laddoos, and handwritten greetings.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--color-text-main)' }}>
                  <CheckCircle2 size={16} color="var(--color-success)" />
                  <span>Custom corporate branding and personalized message cards</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--color-text-main)' }}>
                  <CheckCircle2 size={16} color="var(--color-success)" />
                  <span>Tiered bulk discounts for orders over 15 boxes</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--color-text-main)' }}>
                  <CheckCircle2 size={16} color="var(--color-success)" />
                  <span>Temperature-regulated same-day doorstep dispatch</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <Link
                  href="/sweets?category=gift-boxes"
                  className="btn btn-gold btn-lg"
                >
                  <Gift size={18} />
                  <span>Browse Gift Boxes</span>
                </Link>

                <a
                  href="tel:+919876543210"
                  className="btn btn-secondary btn-lg"
                  style={{ gap: '8px' }}
                >
                  <PhoneCall size={18} />
                  <span>Order Inquiry: +91 98765 43210</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. VERIFIED CUSTOMER REVIEWS */}
      <section className="section" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-kicker">
              <Star size={16} fill="var(--color-saffron)" color="var(--color-saffron)" />
              <span>TESTIMONIALS</span>
            </div>
            <h2 className="section-title">Loved by Indian Families</h2>
            <p className="section-desc">
              Here is what sweet connoisseurs say about our authentic desi ghee recipes and doorstep delivery.
            </p>
          </div>

          <div className="grid-3">
            {/* Review 1 */}
            <div
              style={{
                backgroundColor: '#ffffff',
                padding: '28px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ color: 'var(--color-saffron)', marginBottom: '12px', fontSize: '1rem' }}>
                  ★★★★★
                </div>
                <p
                  style={{
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    color: 'var(--color-text-main)',
                    fontStyle: 'italic',
                    marginBottom: '20px',
                  }}
                >
                  "The Kaju Katli is simply unmatched! The thickness is perfect, sweetness is subtle and not overpowering, and the pure silver vark looks so regal. Ordered 5 boxes for Diwali and everyone asked for the shop’s name."
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-maroon-subtle)',
                    color: 'var(--color-maroon)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                  }}
                >
                  RM
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', margin: 0 }}>Rajesh Malhotra</h4>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Verified Customer • Ordered Kaju Katli</span>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div
              style={{
                backgroundColor: '#ffffff',
                padding: '28px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ color: 'var(--color-saffron)', marginBottom: '12px', fontSize: '1rem' }}>
                  ★★★★★
                </div>
                <p
                  style={{
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    color: 'var(--color-text-main)',
                    fontStyle: 'italic',
                    marginBottom: '20px',
                  }}
                >
                  "The Motichoor Ladoo melted instantly in my mouth with rich pure ghee aroma. You can clearly taste that they use 100% desi cow ghee and real saffron. Delivered warm and fresh within two hours."
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-saffron-subtle)',
                    color: 'var(--color-saffron)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                  }}
                >
                  PS
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', margin: 0 }}>Pooja Sharma</h4>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Verified Customer • Ordered Motichoor Ladoo</span>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div
              style={{
                backgroundColor: '#ffffff',
                padding: '28px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ color: 'var(--color-saffron)', marginBottom: '12px', fontSize: '1rem' }}>
                  ★★★★★
                </div>
                <p
                  style={{
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    color: 'var(--color-text-main)',
                    fontStyle: 'italic',
                    marginBottom: '20px',
                  }}
                >
                  "Their Kesar Rasmalai is heavenly! The chhena discs are exceptionally spongy and the saffron rabdi is thick, chilled, and packed with pistachios. Best sweet shop in the entire region!"
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-gold-subtle)',
                    color: 'var(--color-gold-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                  }}
                >
                  AK
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', margin: 0 }}>Ananya Kulkarni</h4>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Verified Customer • Ordered Royal Kesar Rasmalai</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BOTTOM BANNER CTA */}
      <section
        style={{
          backgroundColor: 'var(--color-maroon)',
          color: '#ffffff',
          padding: '64px 0',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div className="container">
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              color: 'var(--color-gold-light)',
              fontSize: '0.9rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontWeight: 700,
              display: 'block',
              marginBottom: '12px',
            }}
          >
            TREAT YOUR FAMILY TODAY
          </span>
          <h2
            style={{
              color: '#ffffff',
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              marginBottom: '16px',
            }}
          >
            Experience The Royal Taste of Sangita Mithai
          </h2>
          <p
            style={{
              maxWidth: '620px',
              margin: '0 auto 32px auto',
              fontSize: '1.05rem',
              color: 'rgba(255, 255, 255, 0.85)',
              lineHeight: 1.6,
            }}
          >
            Order before 5:00 PM for guaranteed same-day fresh doorstep delivery. Prepared in pure desi ghee with love and tradition.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link
              href="/sweets"
              className="btn btn-gold btn-lg"
              style={{
                padding: '16px 36px',
                fontSize: '1.05rem',
              }}
            >
              <span>Browse All Sweets Now</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
