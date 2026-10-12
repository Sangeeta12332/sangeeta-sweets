'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Package,
  TrendingUp,
  Clock,
  LogOut,
  ShoppingBag,
  CheckCircle,
  Eye,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders');
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await res.json();
      if (data.success) {
        setOrders(data.data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      showToast('Logged out successfully', 'info');
      router.push('/admin/login');
    } catch (e) {
      router.push('/admin/login');
    }
  };

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderStatus: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Order status updated to "${newStatus}"`, 'success');
        fetchOrders();
      } else {
        showToast(data.message || 'Status update failed', 'error');
      }
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const filteredOrders =
    statusFilter === 'All' ? orders : orders.filter((o) => o.orderStatus === statusFilter);

  const totalRevenue = orders.reduce((acc, o) => acc + (o.total || 0), 0);
  const pendingCount = orders.filter((o) => o.orderStatus === 'Pending').length;

  return (
    <div style={{ backgroundColor: 'var(--color-cream-light)', minHeight: '85vh', paddingBottom: '80px' }}>
      {/* Admin Top Header */}
      <div
        style={{
          backgroundColor: 'var(--color-maroon-dark)',
          color: '#ffffff',
          padding: '24px 0',
          borderBottom: '2px solid var(--color-gold)',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ color: '#ffffff', fontSize: '1.6rem', marginBottom: '4px' }}>
              Sangita Mithai • Owner Command Center
            </h1>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-gold-light)' }}>
              Live Order Management & Kitchen Pipeline
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              onClick={fetchOrders}
              className="btn btn-secondary btn-sm"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff', borderColor: 'var(--color-gold)' }}
            >
              <RefreshCw size={14} />
              <span>Refresh</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="btn btn-secondary btn-sm"
              style={{ backgroundColor: 'transparent', color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.3)' }}
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '36px' }}>
        {/* Metric Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            marginBottom: '36px',
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid var(--color-border)',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--color-maroon-subtle)', color: 'var(--color-maroon)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Package size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Total Orders</span>
              <strong style={{ display: 'block', fontSize: '1.6rem', color: 'var(--color-maroon-dark)' }}>{orders.length}</strong>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid var(--color-border)',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--color-warning-bg)', color: 'var(--color-warning)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Kitchen Pending</span>
              <strong style={{ display: 'block', fontSize: '1.6rem', color: 'var(--color-warning)' }}>{pendingCount}</strong>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid var(--color-border)',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--color-success-bg)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={24} />
            </div>
            <div>
              <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Gross Revenue</span>
              <strong style={{ display: 'block', fontSize: '1.6rem', color: 'var(--color-success)' }}>₹{totalRevenue}</strong>
            </div>
          </div>
        </div>

        {/* Orders Table Container */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
            overflow: 'hidden',
          }}
        >
          {/* Filter Bar */}
          <div
            style={{
              padding: '16px 24px',
              borderBottom: '1px solid var(--color-border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <h2 style={{ fontSize: '1.25rem', color: 'var(--color-maroon-dark)' }}>Customer Order Stream</h2>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['All', 'Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    backgroundColor: statusFilter === st ? 'var(--color-maroon)' : 'var(--color-cream)',
                    color: statusFilter === st ? '#ffffff' : 'var(--color-text-main)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Orders Table */}
          {loading ? (
            <div style={{ padding: '60px 24px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
              Loading orders pipeline...
            </div>
          ) : filteredOrders.length === 0 ? (
            <div style={{ padding: '60px 24px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
              No orders found matching filter &quot;{statusFilter}&quot;.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--color-cream)', borderBottom: '1px solid var(--color-border)' }}>
                    <th style={{ padding: '14px 20px', fontWeight: 700 }}>Order #</th>
                    <th style={{ padding: '14px 20px', fontWeight: 700 }}>Customer</th>
                    <th style={{ padding: '14px 20px', fontWeight: 700 }}>Address / PIN</th>
                    <th style={{ padding: '14px 20px', fontWeight: 700 }}>Items</th>
                    <th style={{ padding: '14px 20px', fontWeight: 700 }}>Amount</th>
                    <th style={{ padding: '14px 20px', fontWeight: 700 }}>Status</th>
                    <th style={{ padding: '14px 20px', fontWeight: 700 }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((ord) => (
                    <tr key={ord._id || ord.orderNumber} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                      <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--color-maroon-dark)' }}>
                        #{ord.orderNumber}
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        <strong>{ord.customer?.name}</strong>
                        <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{ord.customer?.phone}</div>
                      </td>
                      <td style={{ padding: '14px 20px', maxWidth: '200px' }}>
                        <div style={{ fontSize: '0.85rem' }}>{ord.shippingAddress?.address}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                          {ord.shippingAddress?.city} • PIN {ord.shippingAddress?.pincode}
                        </div>
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        {ord.items?.map((it: any, i: number) => (
                          <div key={i} style={{ fontSize: '0.82rem' }}>
                            {it.quantity}x {it.name} ({it.weight})
                          </div>
                        ))}
                      </td>
                      <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--color-maroon-dark)' }}>
                        ₹{ord.total}
                        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{ord.paymentMethod}</div>
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        <span
                          className={`badge ${
                            ord.orderStatus === 'Delivered'
                              ? 'badge-success'
                              : ord.orderStatus === 'Pending'
                              ? 'badge-warning'
                              : 'badge-maroon'
                          }`}
                        >
                          {ord.orderStatus}
                        </span>
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        <select
                          value={ord.orderStatus}
                          onChange={(e) => handleUpdateStatus(ord._id, e.target.value)}
                          className="form-select"
                          style={{ padding: '6px 10px', fontSize: '0.82rem' }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Preparing">Preparing</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
