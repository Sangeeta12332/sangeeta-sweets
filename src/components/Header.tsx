'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, Menu, X, Shield, Phone } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change or ESC
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'All Sweets', href: '/sweets' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div
        style={{
          backgroundColor: 'var(--color-maroon-dark)',
          color: '#ffffff',
          fontSize: '0.8rem',
          padding: '7px 16px',
          textAlign: 'center',
          letterSpacing: '0.04em',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px',
          borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
        }}
      >
        <span>🪔 Pure Desi Ghee & Fresh Ingredients • Free Delivery on orders over ₹500</span>
        <span style={{ opacity: 0.6 }}>|</span>
        <a
          href="tel:+919876543210"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            color: 'var(--color-gold-light)',
            fontWeight: 600,
          }}
        >
          <Phone size={12} /> +91 98765 43210
        </a>
      </div>

      {/* Main Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: scrolled ? 'rgba(253, 251, 247, 0.98)' : 'var(--color-cream-light)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid var(--color-border)',
          transition: 'all 0.3s ease',
          boxShadow: scrolled ? '0 4px 20px rgba(42, 25, 20, 0.08)' : 'none',
        }}
      >
        <div className="container">
          <div
            style={{
              height: 'var(--header-height)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Brand Logo & Name */}
            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textDecoration: 'none',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '1.5px solid var(--color-gold)',
                  boxShadow: '0 2px 8px rgba(104, 19, 36, 0.15)',
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/images/logo.png"
                  alt="Sangita Mithai Brand Emblem"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    color: 'var(--color-maroon-dark)',
                    lineHeight: 1.1,
                    letterSpacing: '0.04em',
                  }}
                >
                  SANGITA MITHAI
                </span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--color-saffron)',
                    fontWeight: 700,
                  }}
                >
                  ROYAL INDIAN SWEETS
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '32px',
              }}
              className="desktop-nav"
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.95rem',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? 'var(--color-maroon)' : 'var(--color-text-main)',
                      position: 'relative',
                      padding: '8px 0',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          width: '100%',
                          height: '2.5px',
                          backgroundColor: 'var(--color-gold)',
                          borderRadius: '2px',
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Link
                href="/sweets"
                aria-label="Search sweets"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  color: 'var(--color-maroon-dark)',
                  transition: 'background 0.2s',
                }}
              >
                <Search size={21} />
              </Link>

              {/* Shopping Bag Button */}
              <Link
                href="/cart"
                aria-label="View Shopping Cart"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-maroon-subtle)',
                  color: 'var(--color-maroon)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  border: '1px solid rgba(104, 19, 36, 0.15)',
                  position: 'relative',
                  transition: 'all 0.2s',
                }}
              >
                <ShoppingBag size={20} />
                <span className="cart-text">Cart</span>
                <span
                  style={{
                    backgroundColor: 'var(--color-maroon)',
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {totalItems}
                </span>
              </Link>

              {/* Admin Access Shortcut */}
              <Link
                href="/admin"
                title="Admin Dashboard"
                style={{
                  display: 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  color: 'var(--color-text-muted)',
                  border: '1px solid var(--color-border)',
                }}
                className="admin-link"
              >
                <Shield size={18} />
              </Link>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  color: 'var(--color-maroon-dark)',
                }}
                className="mobile-toggle"
              >
                {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop & Drawer */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(42, 25, 20, 0.45)',
            backdropFilter: 'blur(4px)',
            zIndex: 1100,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '82%',
              maxWidth: '340px',
              height: '100%',
              backgroundColor: 'var(--color-cream-light)',
              boxShadow: '-8px 0 24px rgba(42, 25, 20, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              padding: '24px',
              overflowY: 'auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '20px',
                borderBottom: '1px solid var(--color-border)',
                marginBottom: '24px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 800,
                  fontSize: '1.15rem',
                  color: 'var(--color-maroon)',
                }}
              >
                SANGITA MITHAI
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                style={{ color: 'var(--color-text-main)' }}
              >
                <X size={24} />
              </button>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '1.05rem',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? 'var(--color-maroon)' : 'var(--color-text-main)',
                      backgroundColor: isActive ? 'var(--color-maroon-subtle)' : 'transparent',
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/cart"
                style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  color: 'var(--color-maroon)',
                }}
              >
                <span>Shopping Cart</span>
                <span
                  style={{
                    backgroundColor: 'var(--color-maroon)',
                    color: '#ffffff',
                    padding: '2px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                  }}
                >
                  {totalItems} items
                </span>
              </Link>
              <Link
                href="/admin"
                style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  color: 'var(--color-text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: '12px',
                }}
              >
                <Shield size={16} /> Admin Portal
              </Link>
            </nav>

            <div
              style={{
                marginTop: 'auto',
                paddingTop: '20px',
                borderTop: '1px solid var(--color-border)',
                fontSize: '0.85rem',
                color: 'var(--color-text-muted)',
              }}
            >
              <p style={{ fontWeight: 600, color: 'var(--color-text-main)', marginBottom: '4px' }}>
                Store Hours
              </p>
              <p>Mon - Sun: 8:00 AM - 10:00 PM</p>
              <p style={{ marginTop: '6px' }}>Phone: +91 98765 43210</p>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @media (min-width: 860px) {
          .desktop-nav {
            display: flex !important;
          }
          .admin-link {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .cart-text {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
