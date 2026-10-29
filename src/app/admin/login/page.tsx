'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Shield,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle2,
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Invalid administrative credentials');
      }

      setSuccessMsg('Authentication verified! Redirecting to Dashboard...');
      showToast('Welcome back, Admin! Redirecting...', 'success');
      setTimeout(() => {
        router.push('/admin');
      }, 600);
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed. Please check credentials.');
      showToast(err.message || 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--color-cream-light, #faf6ee)',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 20px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          border: '1px solid rgba(139, 21, 56, 0.15)',
          boxShadow: '0 20px 40px -15px rgba(59, 6, 13, 0.08), 0 0 1px 1px rgba(212, 175, 55, 0.2)',
          padding: '40px 32px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top Decorative Gold Accent Line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #8B1538 0%, #D4AF37 50%, #8B1538 100%)',
          }}
        />

        {/* Brand Emblem */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              position: 'relative',
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              overflow: 'hidden',
              margin: '0 auto 16px auto',
              border: '2.5px solid #d4af37',
              boxShadow: '0 4px 14px rgba(212, 175, 55, 0.25)',
              backgroundColor: '#fff',
            }}
          >
            <Image
              src="/images/logo.png"
              alt="Sangita Mithai Logo"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(139, 21, 56, 0.08)',
              color: '#8B1538',
              fontSize: '0.78rem',
              fontWeight: 700,
              padding: '4px 12px',
              borderRadius: '999px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '10px',
            }}
          >
            <Shield size={13} />
            <span>Authorized Management Access</span>
          </span>
          <h1
            style={{
              fontSize: '1.75rem',
              color: '#3b060d',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: '6px',
              fontFamily: 'var(--font-serif, serif)',
            }}
          >
            Owner & Admin Portal
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#6b7280', margin: 0 }}>
            Sign in to manage orders, sweets catalog & database
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div
            style={{
              backgroundColor: '#fef2f2',
              color: '#991b1b',
              padding: '12px 14px',
              borderRadius: '12px',
              border: '1px solid #fecaca',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.85rem',
              marginBottom: '20px',
            }}
          >
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div
            style={{
              backgroundColor: '#f0fdf4',
              color: '#166534',
              padding: '12px 14px',
              borderRadius: '12px',
              border: '1px solid #bbf7d0',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.85rem',
              marginBottom: '20px',
            }}
          >
            <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          {/* Email Field */}
          <div style={{ marginBottom: '18px' }}>
            <label
              htmlFor="admin-email"
              style={{
                display: 'block',
                fontSize: '0.84rem',
                fontWeight: 600,
                color: '#374151',
                marginBottom: '6px',
              }}
            >
              Admin Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail
                size={16}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af',
                }}
              />
              <input
                id="admin-email"
                type="email"
                required
                className="form-input"
                style={{
                  width: '100%',
                  paddingLeft: '40px',
                  paddingRight: '14px',
                  height: '46px',
                  borderRadius: '12px',
                  border: '1px solid #d1d5db',
                  fontSize: '0.92rem',
                }}
                placeholder="admin@sangita.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '24px' }}>
            <label
              htmlFor="admin-password"
              style={{
                display: 'block',
                fontSize: '0.84rem',
                fontWeight: 600,
                color: '#374151',
                marginBottom: '6px',
              }}
            >
              Admin Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={16}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af',
                }}
              />
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                required
                className="form-input"
                style={{
                  width: '100%',
                  paddingLeft: '40px',
                  paddingRight: '42px',
                  height: '46px',
                  borderRadius: '12px',
                  border: '1px solid #d1d5db',
                  fontSize: '0.92rem',
                }}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#9ca3af',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-block btn-lg"
            style={{
              width: '100%',
              height: '48px',
              backgroundColor: '#8B1538',
              borderColor: '#8B1538',
              borderRadius: '12px',
              fontSize: '0.95rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: '20px',
            }}
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Admin Dashboard</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Security Note */}
        <div
          style={{
            textAlign: 'center',
            fontSize: '0.78rem',
            color: '#6b7280',
            borderTop: '1px solid #f3f4f6',
            paddingTop: '16px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}
        >
          <Shield size={14} color="#16a34a" />
          <span>Encrypted Session • HMAC SHA-256 Protected</span>
        </div>

        {/* Back Link */}
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              color: '#8B1538',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={14} />
            <span>Return to Sangita Mithai Storefront</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
