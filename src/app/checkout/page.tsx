'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  Truck,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, deliveryFee, total, totalItems, clearCart, isLoaded } = useCart();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    deliveryInstructions: '',
    paymentMethod: 'Cash on Delivery',
  });

  if (!isLoaded) {
    return (
      <div style={{ padding: '80px 24px', textAlign: 'center', color: 'var(--color-maroon)' }}>
        <p>Loading checkout...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div style={{ backgroundColor: 'var(--color-cream-light)', minHeight: '70vh', padding: '80px 24px' }}>
        <div
          style={{
            maxWidth: '520px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            border: '1px solid var(--color-border)',
            padding: '40px 32px',
            textAlign: 'center',
          }}
        >
          <h2 style={{ color: 'var(--color-maroon-dark)', marginBottom: '12px' }}>Your Cart is Empty</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
            Please add sweets to your basket before proceeding to checkout.
          </p>
          <Link href="/sweets" className="btn btn-primary">
            <span>Browse Sweets</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const payload = {
        customer: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
        },
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
          weight: i.weight,
        })),
        paymentMethod: formData.paymentMethod,
        deliveryInstructions: formData.deliveryInstructions,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to place order. Please check details.');
      }

      const orderNumber = data.data.orderNumber;
      clearCart();
      showToast(`Order #${orderNumber} placed successfully!`, 'success');
      router.push(`/order-success?orderId=${orderNumber}`);
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong while placing your order.');
      showToast(err.message || 'Order failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--color-cream-light)', padding: '48px 0 80px 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '2.2rem', color: 'var(--color-maroon-dark)', marginBottom: '8px' }}>
            Delivery & Checkout
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
            Enter your doorstep delivery address and confirm Cash on Delivery order.
          </p>
        </div>

        {errorMsg && (
          <div
            style={{
              backgroundColor: 'var(--color-error-bg)',
              color: 'var(--color-error)',
              padding: '14px 18px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-error)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '24px',
              fontSize: '0.92rem',
            }}
          >
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '36px',
              alignItems: 'flex-start',
            }}
          >
            {/* Left: Customer & Address Form */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
                padding: '32px',
              }}
            >
              <h2 style={{ fontSize: '1.25rem', color: 'var(--color-maroon-dark)', marginBottom: '20px' }}>
                1. Customer Contact Details
              </h2>

              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name *</label>
                <input
                  id="name"
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Rameshwar Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '16px',
                  marginBottom: '24px',
                }}
              >
                <div>
                  <label className="form-label" htmlFor="phone">10-Digit Mobile Number *</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    pattern="[6-9][0-9]{9}"
                    className="form-input"
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    For delivery OTP & WhatsApp tracking
                  </span>
                </div>

                <div>
                  <label className="form-label" htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="form-input"
                    placeholder="e.g. ramesh@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <h2 style={{ fontSize: '1.25rem', color: 'var(--color-maroon-dark)', marginBottom: '20px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
                2. Doorstep Delivery Address
              </h2>

              <div className="form-group">
                <label className="form-label" htmlFor="address">Flat / House No., Building, Street Name *</label>
                <textarea
                  id="address"
                  required
                  rows={3}
                  className="form-textarea"
                  placeholder="e.g. Flat 402, Shanti Niketan, Near Ganesh Temple, MG Road"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                  marginBottom: '18px',
                }}
              >
                <div>
                  <label className="form-label" htmlFor="city">City *</label>
                  <input
                    id="city"
                    type="text"
                    required
                    className="form-input"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>

                <div>
                  <label className="form-label" htmlFor="state">State *</label>
                  <input
                    id="state"
                    type="text"
                    required
                    className="form-input"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  />
                </div>

                <div>
                  <label className="form-label" htmlFor="pincode">6-Digit PIN *</label>
                  <input
                    id="pincode"
                    type="text"
                    required
                    pattern="[1-9][0-9]{5}"
                    className="form-input"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="deliveryInstructions">Delivery Instructions (Optional)</label>
                <input
                  id="deliveryInstructions"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Ring the bell twice, leave with security if unavailable"
                  value={formData.deliveryInstructions}
                  onChange={(e) => setFormData({ ...formData, deliveryInstructions: e.target.value })}
                />
              </div>

              <h2 style={{ fontSize: '1.25rem', color: 'var(--color-maroon-dark)', marginBottom: '16px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
                3. Payment Method
              </h2>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    border: '2px solid var(--color-maroon)',
                    backgroundColor: 'var(--color-maroon-subtle)',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Cash on Delivery"
                    checked={formData.paymentMethod === 'Cash on Delivery'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'Cash on Delivery' })}
                    style={{ accentColor: 'var(--color-maroon)', width: '18px', height: '18px' }}
                  />
                  <div>
                    <strong style={{ display: 'block', color: 'var(--color-maroon-dark)', fontSize: '0.95rem' }}>
                      Cash on Delivery (COD)
                    </strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                      Pay cash or UPI scan directly to delivery rider upon handover
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Right: Order Summary Sidebar */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
                padding: '28px',
              }}
            >
              <h2 style={{ fontSize: '1.25rem', color: 'var(--color-maroon-dark)', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--color-border)' }}>
                Order Summary ({totalItems} items)
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                {items.map((i) => (
                  <div key={`${i.productId}-${i.weight}`} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                    <div>
                      <span style={{ fontWeight: 600 }}>{i.name}</span>
                      <span style={{ color: 'var(--color-text-muted)', display: 'block', fontSize: '0.78rem' }}>
                        {i.quantity}x • {i.weight}
                      </span>
                    </div>
                    <span style={{ fontWeight: 700 }}>₹{i.price * i.quantity}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                  <span>Delivery</span>
                  <span style={{ color: deliveryFee === 0 ? 'var(--color-success)' : 'inherit', fontWeight: 600 }}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-maroon-dark)', paddingTop: '12px', borderTop: '1.5px dashed var(--color-border)' }}>
                  <span>Total Due</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-block btn-lg"
                style={{ marginBottom: '16px', boxShadow: 'var(--shadow-maroon)' }}
              >
                {loading ? 'Confirming Order...' : `Place COD Order (₹${total})`}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                <Lock size={13} />
                <span>Encrypted & Confidential Checkout</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
