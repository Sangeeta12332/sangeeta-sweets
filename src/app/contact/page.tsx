'use client';

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function ContactPage() {
  const { showToast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    orderType: 'general',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Dhanyavaad! Your inquiry has been received. Our team will contact you shortly.', 'success');
  };

  return (
    <div style={{ backgroundColor: 'var(--color-cream-light)', paddingBottom: '80px' }}>
      {/* Header Banner */}
      <section
        style={{
          background: 'linear-gradient(135deg, var(--color-maroon-dark) 0%, var(--color-maroon) 100%)',
          color: '#ffffff',
          padding: '56px 0',
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
            <span>WE ARE AT YOUR SERVICE</span>
          </div>

          <h1
            style={{
              color: '#ffffff',
              fontSize: 'clamp(2.2rem, 3.8vw, 3rem)',
              marginBottom: '14px',
              fontWeight: 800,
            }}
          >
            Get in Touch With Sangita Mithai
          </h1>

          <p
            style={{
              color: 'rgba(255, 255, 255, 0.88)',
              fontSize: '1.05rem',
              maxWidth: '640px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Have a custom wedding hamper request, festive bulk inquiry, or feedback? Speak directly with our master sweetmakers.
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: '48px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
          }}
        >
          {/* Left: Contact Info */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)',
              padding: '36px',
            }}
          >
            <h2 style={{ fontSize: '1.6rem', color: 'var(--color-maroon-dark)', marginBottom: '24px' }}>
              Store Information
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '36px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--color-maroon-subtle)',
                    color: 'var(--color-maroon)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>Main Flagship Sweet Store</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    Sangita Mithai Sweets & Farsan<br />
                    Station Road, Near Main Temple Chowk,<br />
                    Pin: 400001
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--color-saffron-subtle)',
                    color: 'var(--color-saffron)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Phone size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>Call & WhatsApp Orders</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    <a href="tel:+919876543210" style={{ color: 'var(--color-maroon)', fontWeight: 700 }}>
                      +91 98765 43210
                    </a>
                    <br />
                    Instant WhatsApp support for bulk party trays
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--color-gold-subtle)',
                    color: 'var(--color-gold-dark)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Clock size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>Store & Delivery Hours</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    Monday – Sunday: 8:00 AM – 10:00 PM<br />
                    Morning Fresh Batch Out at 8:30 AM Daily
                  </p>
                </div>
              </div>
            </div>

            {/* Auspicious note */}
            <div
              style={{
                backgroundColor: 'var(--color-cream)',
                borderRadius: 'var(--radius-md)',
                padding: '16px 20px',
                border: '1px solid var(--color-border)',
                fontSize: '0.88rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.5,
              }}
            >
              🪔 <strong>Pooja & Bulk Orders:</strong> Please place large pooja prasad orders (over 5 kg) at least 24 hours in advance so our master halwais can allocate a dedicated brass kadhai batch.
            </div>
          </div>

          {/* Right: Message / Inquiry Form */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-sm)',
              padding: '36px',
            }}
          >
            <h2 style={{ fontSize: '1.6rem', color: 'var(--color-maroon-dark)', marginBottom: '8px' }}>
              Send an Inquiry
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
              Leave your details below and our team will get back to you within 30 minutes.
            </p>

            {submitted ? (
              <div
                style={{
                  backgroundColor: 'var(--color-success-bg)',
                  border: '1px solid var(--color-success)',
                  borderRadius: 'var(--radius-md)',
                  padding: '24px',
                  textAlign: 'center',
                }}
              >
                <CheckCircle2 size={40} color="var(--color-success)" style={{ margin: '0 auto 12px auto' }} />
                <h3 style={{ color: 'var(--color-success)', marginBottom: '8px' }}>Dhanyavaad! Message Sent</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-main)' }}>
                  Our team has received your message and will phone you shortly with pricing and delivery options.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Your Full Name *</label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Ramesh Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Mobile Phone Number *</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    className="form-input"
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="orderType">Inquiry Type</label>
                  <select
                    id="orderType"
                    className="form-select"
                    value={formData.orderType}
                    onChange={(e) => setFormData({ ...formData, orderType: e.target.value })}
                  >
                    <option value="general">General Sweet Inquiry</option>
                    <option value="bulk">Festive / Bulk Family Order</option>
                    <option value="wedding">Wedding Sweets & Gift Hampers</option>
                    <option value="corporate">Corporate Diwali Gifting</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Your Message or Requirements</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="form-textarea"
                    placeholder="Tell us about the sweets, quantities, or delivery date you need..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block btn-lg" style={{ marginTop: '8px' }}>
                  <Send size={18} />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
