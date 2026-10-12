import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
  </svg>
);

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-maroon-dark)',
        color: '#ffffff',
        borderTop: '3px solid var(--color-gold)',
        paddingTop: '64px',
        paddingBottom: '32px',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div
                style={{
                  position: 'relative',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '1.5px solid var(--color-gold)',
                }}
              >
                <Image
                  src="/images/logo.png"
                  alt="Sangita Mithai Logo"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  color: 'var(--color-gold-light)',
                  letterSpacing: '0.04em',
                }}
              >
                SANGITA MITHAI
              </span>
            </div>
            <p
              style={{
                fontSize: '0.9rem',
                color: 'rgba(255, 255, 255, 0.78)',
                lineHeight: 1.6,
                marginBottom: '20px',
              }}
            >
              Crafting authentic Indian mithai with timeless heritage, 100% pure desi ghee, and uncompromising
              devotion to purity and festive celebration.
            </p>
            <div style={{ display: 'flex', gap: '14px' }}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-gold-light)',
                  transition: 'background 0.2s',
                }}
              >
                <InstagramIcon />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-gold-light)',
                  transition: 'background 0.2s',
                }}
              >
                <FacebookIcon />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-gold-light)',
                  transition: 'background 0.2s',
                }}
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.15rem',
                color: 'var(--color-gold-light)',
                marginBottom: '18px',
                letterSpacing: '0.04em',
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link
                  href="/"
                  style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', transition: 'color 0.2s' }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/sweets"
                  style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', transition: 'color 0.2s' }}
                >
                  All Sweets
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', transition: 'color 0.2s' }}
                >
                  Our Heritage & Story
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', transition: 'color 0.2s' }}
                >
                  Contact & Store Locator
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/login"
                  style={{
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontSize: '0.85rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    marginTop: '8px',
                  }}
                >
                  <ShieldCheck size={14} /> Admin Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.15rem',
                color: 'var(--color-gold-light)',
                marginBottom: '18px',
                letterSpacing: '0.04em',
              }}
            >
              Customer Care
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link
                  href="/cart"
                  style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}
                >
                  View Shopping Cart
                </Link>
              </li>
              <li>
                <Link
                  href="/sweets?category=gift-boxes"
                  style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}
                >
                  Festive Gift Hampers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}
                >
                  Bulk & Wedding Enquiries
                </Link>
              </li>
              <li>
                <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.85rem' }}>
                  Same-Day City Delivery
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.15rem',
                color: 'var(--color-gold-light)',
                marginBottom: '18px',
                letterSpacing: '0.04em',
              }}
            >
              Store Location
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: 'rgba(255, 255, 255, 0.85)' }}>
                <MapPin size={18} color="var(--color-gold-light)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Sangita Mithai Bhavan, Main Market Road, Civil Lines, Jaipur, Rajasthan 302006</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255, 255, 255, 0.85)' }}>
                <Phone size={18} color="var(--color-gold-light)" style={{ flexShrink: 0 }} />
                <span>+91 98765 43210 / +91 141 2345678</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255, 255, 255, 0.85)' }}>
                <Mail size={18} color="var(--color-gold-light)" style={{ flexShrink: 0 }} />
                <span>care@sangitamithai.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '0.85rem',
            color: 'rgba(255, 255, 255, 0.65)',
          }}
        >
          <p>© 2026 Sangita Mithai. All rights reserved.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Crafted with Tradition & Desi Ghee</span>
            <span>•</span>
            <span>FSSAI Certified Sweet Shop</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
