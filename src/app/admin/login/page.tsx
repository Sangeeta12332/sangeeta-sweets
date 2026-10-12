'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Shield, Lock, Mail, ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Invalid administrator credentials');
      }

      showToast('Admin authentication successful!', 'success');
      router.push('/admin');
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
        backgroundColor: 'var(--color-cream-light)',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-lg)',
          padding: '40px 32px',
        }}
      >
        {/* Emblem */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              position: 'relative',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              overflow: 'hidden',
              margin: '0 auto 16px auto',
              border: '2px solid var(--color-gold)',
            }}
          >
            <Image
              src="/images/logo.png"
              alt="Sangita Mithai Logo"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <h1
            style={{
              fontSize: '1.6rem',
              color: 'var(--color-maroon-dark)',
              marginBottom: '6px',
            }}
          >
            Owner Portal
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
            Authorized management access for Sangita Mithai
          </p>
        </div>

        {errorMsg && (
          <div
            style={{
              backgroundColor: 'var(--color-error-bg)',
              color: 'var(--color-error)',
              padding: '12px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-error)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.85rem',
              marginBottom: '20px',
            }}
          >
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label" htmlFor="admin-email">Admin Email</label>
            <div style={{ position: 'relative' }}>
              <Mail
                size={16}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-text-muted)',
                }}
              />
              <input
                id="admin-email"
                type="email"
                required
                className="form-input"
                style={{ paddingLeft: '38px' }}
                placeholder="admin@sangitamithai.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="admin-password">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={16}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-text-muted)',
                }}
              />
              <input
                id="admin-password"
                type="password"
                required
                className="form-input"
                style={{ paddingLeft: '38px' }}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-block btn-lg"
            style={{ marginTop: '8px', marginBottom: '20px' }}
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <div style={{ textAlign: 'center', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '16px' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              color: 'var(--color-text-secondary)',
            }}
          >
            <ArrowLeft size={14} />
            <span>Back to Public Storefront</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
