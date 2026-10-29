'use client';

import React, { useState, useEffect, useTransition } from 'react';
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
  Database,
  Plus,
  Edit2,
  Trash2,
  Search,
  Server,
  Layers,
  FileText,
  Sparkles,
  Check,
  X,
  ExternalLink,
  ChevronRight,
  Shield,
  Phone,
  MapPin,
  Calendar,
} from 'lucide-react';
import { useToast } from '@/context/ToastContext';

type TabType = 'overview' | 'orders' | 'products' | 'categories' | 'database';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Orders State
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [orderSearch, setOrderSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  // Products State
  const [products, setProducts] = useState<any[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  // Categories State
  const [categories, setCategories] = useState<any[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);

  // Database Status State
  const [dbStatus, setDbStatus] = useState<any | null>(null);
  const [dbLoading, setDbLoading] = useState(false);
  const [customMongoUri, setCustomMongoUri] = useState('');
  const [isSeeding, setIsSeeding] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // Product Form State
  const [prodForm, setProdForm] = useState({
    name: '',
    category: 'milk-sweets',
    price: '',
    compareAtPrice: '',
    stock: '50',
    shortDescription: '',
    description: '',
    images: '/images/hero-sweets.jpg',
    tags: '',
    isFeatured: false,
    isBestSeller: false,
    isAvailable: true,
  });

  // Category Form State
  const [catForm, setCatForm] = useState({
    name: '',
    slug: '',
    description: '',
    image: '/images/hero-sweets.jpg',
    isActive: true,
  });

  // 1. Fetch Orders
  const fetchOrders = async () => {
    setOrdersLoading(true);
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
      setOrdersLoading(false);
    }
  };

  // 2. Fetch Products
  const fetchProducts = async () => {
    setProductsLoading(true);
    try {
      const res = await fetch('/api/products?limit=100');
      const data = await res.json();
      if (data.success) {
        setProducts(data.data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setProductsLoading(false);
    }
  };

  // 3. Fetch Categories
  const fetchCategories = async () => {
    setCategoriesLoading(true);
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (data.success) {
        setCategories(data.data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCategoriesLoading(false);
    }
  };

  // 4. Fetch DB Status
  const fetchDbStatus = async () => {
    setDbLoading(true);
    try {
      const res = await fetch('/api/admin/database');
      const data = await res.json();
      if (data.success) {
        setDbStatus(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setDbLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchProducts();
    fetchCategories();
    fetchDbStatus();
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

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
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

  // Seed DB Handler
  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    try {
      const res = await fetch('/api/admin/database', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'seed' }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(data.message || 'Database seeded successfully!', 'success');
        fetchDbStatus();
        fetchProducts();
        fetchCategories();
      } else {
        showToast(data.message || 'Seeding failed', 'error');
      }
    } catch (e: any) {
      showToast(e.message, 'error');
    } finally {
      setIsSeeding(false);
    }
  };

  // Test / Connect Mongo URI Handler
  const handleConnectMongo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMongoUri.trim()) {
      showToast('Please enter a valid MongoDB connection string', 'info');
      return;
    }

    setIsConnecting(true);
    try {
      const res = await fetch('/api/admin/database', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'connect', uri: customMongoUri }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('Successfully connected to MongoDB!', 'success');
        setDbStatus(data.data);
        fetchProducts();
        fetchCategories();
        fetchOrders();
      } else {
        showToast(data.message || 'MongoDB connection failed', 'error');
      }
    } catch (e: any) {
      showToast(e.message, 'error');
    } finally {
      setIsConnecting(false);
    }
  };

  // Save / Update Product
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: prodForm.name,
        category: prodForm.category,
        price: Number(prodForm.price),
        compareAtPrice: prodForm.compareAtPrice ? Number(prodForm.compareAtPrice) : undefined,
        stock: Number(prodForm.stock || 50),
        shortDescription: prodForm.shortDescription,
        description: prodForm.description || prodForm.shortDescription,
        images: prodForm.images ? prodForm.images.split(',').map((s) => s.trim()) : ['/images/hero-sweets.jpg'],
        tags: prodForm.tags ? prodForm.tags.split(',').map((s) => s.trim()) : [],
        isFeatured: prodForm.isFeatured,
        isBestSeller: prodForm.isBestSeller,
        isAvailable: prodForm.isAvailable,
      };

      let res;
      if (editingProduct) {
        res = await fetch(`/api/products/${editingProduct._id || editingProduct.slug}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (data.success) {
        showToast(editingProduct ? 'Sweet updated successfully!' : 'New sweet created in MongoDB!', 'success');
        setShowProductModal(false);
        setEditingProduct(null);
        fetchProducts();
      } else {
        showToast(data.message || 'Failed to save product', 'error');
      }
    } catch (e: any) {
      showToast(e.message, 'error');
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}" from MongoDB database?`)) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast(`"${name}" removed from database`, 'success');
        fetchProducts();
      } else {
        showToast(data.message || 'Failed to delete product', 'error');
      }
    } catch (e: any) {
      showToast(e.message, 'error');
    }
  };

  // Quick Toggle Availability
  const handleToggleProductAvailability = async (prod: any) => {
    try {
      const res = await fetch(`/api/products/${prod._id || prod.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAvailable: !prod.isAvailable }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`"${prod.name}" status updated to ${!prod.isAvailable ? 'In Stock' : 'Out of Stock'}`, 'info');
        fetchProducts();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Save / Update Category
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let res;
      if (editingCategory) {
        res = await fetch(`/api/categories/${editingCategory._id || editingCategory.slug}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(catForm),
        });
      } else {
        res = await fetch('/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(catForm),
        });
      }

      const data = await res.json();
      if (data.success) {
        showToast(editingCategory ? 'Category updated!' : 'Category created in MongoDB!', 'success');
        setShowCategoryModal(false);
        setEditingCategory(null);
        fetchCategories();
      } else {
        showToast(data.message || 'Failed to save category', 'error');
      }
    } catch (e: any) {
      showToast(e.message, 'error');
    }
  };

  // Delete Category
  const handleDeleteCategory = async (id: string, name: string) => {
    if (!confirm(`Delete category "${name}"?`)) return;
    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast(`Category "${name}" removed`, 'success');
        fetchCategories();
      } else {
        showToast(data.message || 'Failed to delete category', 'error');
      }
    } catch (e: any) {
      showToast(e.message, 'error');
    }
  };

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'All' || o.orderStatus === statusFilter;
    const matchesSearch =
      orderSearch === '' ||
      (o.orderNumber && o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase())) ||
      (o.customer?.name && o.customer.name.toLowerCase().includes(orderSearch.toLowerCase())) ||
      (o.customer?.phone && o.customer.phone.includes(orderSearch));
    return matchesStatus && matchesSearch;
  });

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesCat = productCategoryFilter === 'all' || p.category === productCategoryFilter;
    const matchesSearch =
      productSearch === '' ||
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.slug.toLowerCase().includes(productSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const totalRevenue = orders.reduce((acc, o) => acc + (o.total || 0), 0);
  const pendingCount = orders.filter((o) => o.orderStatus === 'Pending').length;
  const preparingCount = orders.filter((o) => o.orderStatus === 'Preparing').length;

  return (
    <div style={{ backgroundColor: '#fcfaf6', minHeight: '90vh', paddingBottom: '90px' }}>
      {/* Top Navbar Header */}
      <header
        style={{
          backgroundColor: '#3b060d',
          color: '#ffffff',
          padding: '18px 0',
          borderBottom: '2px solid #d4af37',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #d4af37, #aa820a)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(212, 175, 55, 0.4)',
                color: '#3b060d',
              }}
            >
              <Database size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 style={{ color: '#ffffff', fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>
                  Sangita Mithai Admin
                </h1>
                <span
                  style={{
                    backgroundColor: 'rgba(212, 175, 55, 0.2)',
                    border: '1px solid #d4af37',
                    color: '#d4af37',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  MongoDB Engine
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#e8d4a5' }}>
                Artisan Confectionery Operations • Live Kitchen & Cloud Database
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* Database Live Status Badge */}
            <button
              type="button"
              onClick={() => setActiveTab('database')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '7px 14px',
                borderRadius: '30px',
                fontSize: '0.8rem',
                fontWeight: 600,
                backgroundColor: dbStatus?.isConnected ? 'rgba(34, 197, 94, 0.15)' : 'rgba(234, 179, 8, 0.15)',
                color: dbStatus?.isConnected ? '#4ade80' : '#fde047',
                border: `1px solid ${dbStatus?.isConnected ? '#22c55e' : '#eab308'}`,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              title="Click to view Database management"
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: dbStatus?.isConnected ? '#22c55e' : '#eab308',
                  boxShadow: dbStatus?.isConnected ? '0 0 8px #22c55e' : '0 0 8px #eab308',
                }}
              />
              <span>
                {dbStatus?.isConnected
                  ? dbStatus?.isAtlas
                    ? 'Atlas Cluster Connected'
                    : 'MongoDB Connected'
                  : 'Database Fallback (Click)'}
              </span>
              {dbStatus?.pingMs !== null && dbStatus?.pingMs !== undefined && (
                <span style={{ opacity: 0.8, fontSize: '0.72rem' }}>({dbStatus.pingMs}ms)</span>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                fetchOrders();
                fetchProducts();
                fetchCategories();
                fetchDbStatus();
                showToast('Refreshed latest data', 'info');
              }}
              className="btn btn-secondary btn-sm"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                borderColor: '#d4af37',
              }}
            >
              <RefreshCw size={14} />
              <span>Refresh</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="btn btn-secondary btn-sm"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                borderColor: 'rgba(255, 255, 255, 0.25)',
              }}
            >
              <ExternalLink size={14} />
              <span>Visit Store</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="btn btn-secondary btn-sm"
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                color: '#fca5a5',
                borderColor: '#ef4444',
              }}
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="container" style={{ marginTop: '18px' }}>
          <div
            style={{
              display: 'flex',
              gap: '6px',
              borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
              overflowX: 'auto',
              paddingBottom: '2px',
            }}
          >
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'orders', label: `Orders (${orders.length})`, icon: Package },
              { id: 'products', label: `Sweets Catalog (${products.length})`, icon: ShoppingBag },
              { id: 'categories', label: `Categories (${categories.length})`, icon: Layers },
              { id: 'database', label: 'MongoDB Database', icon: Database },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as TabType)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 18px',
                    borderRadius: '8px 8px 0 0',
                    fontSize: '0.88rem',
                    fontWeight: isActive ? 700 : 500,
                    backgroundColor: isActive ? '#fcfaf6' : 'transparent',
                    color: isActive ? '#3b060d' : '#e8d4a5',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="container" style={{ marginTop: '28px' }}>
        {/* ==================================================== */}
        {/* TAB 1: OVERVIEW */}
        {/* ==================================================== */}
        {activeTab === 'overview' && (
          <div>
            {/* Live Database Alert Banner if not Atlas */}
            {!dbStatus?.isConnected && (
              <div
                style={{
                  backgroundColor: '#fef3c7',
                  border: '1px solid #f59e0b',
                  borderRadius: '14px',
                  padding: '16px 20px',
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <AlertCircle size={24} color="#d97706" />
                  <div>
                    <strong style={{ color: '#92400e', fontSize: '0.95rem' }}>
                      MongoDB Database not yet connected to Atlas Cluster0
                    </strong>
                    <div style={{ fontSize: '0.85rem', color: '#b45309' }}>
                      The store is currently running safely with our in-memory backup database. Connect your MongoDB Atlas
                      cluster to persist all edits and orders permanently.
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('database')}
                  className="btn btn-primary btn-sm"
                  style={{ backgroundColor: '#d97706', borderColor: '#b45309' }}
                >
                  <Database size={15} />
                  <span>Connect MongoDB Atlas</span>
                </button>
              </div>
            )}

            {/* Metric Cards Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                gap: '18px',
                marginBottom: '28px',
              }}
            >
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid rgba(0,0,0,0.08)',
                  padding: '22px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>
                    Gross Sales
                  </span>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(34, 197, 94, 0.1)',
                      color: '#16a34a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <TrendingUp size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111827' }}>₹{totalRevenue}</div>
                <span style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 600 }}>● Online & COD Orders</span>
              </div>

              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid rgba(0,0,0,0.08)',
                  padding: '22px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>
                    Kitchen Queue
                  </span>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(234, 179, 8, 0.1)',
                      color: '#ca8a04',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Clock size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ca8a04' }}>{pendingCount}</div>
                <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                  {preparingCount} in preparation • {orders.length} total orders
                </span>
              </div>

              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid rgba(0,0,0,0.08)',
                  padding: '22px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>
                    Catalog Inventory
                  </span>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(128, 0, 32, 0.1)',
                      color: '#800020',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ShoppingBag size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#800020' }}>{products.length}</div>
                <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                  Across {categories.length} traditional sweet categories
                </span>
              </div>

              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid rgba(0,0,0,0.08)',
                  padding: '22px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>
                    Database Status
                  </span>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      backgroundColor: dbStatus?.isConnected ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.1)',
                      color: dbStatus?.isConnected ? '#16a34a' : '#ca8a04',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Database size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: dbStatus?.isConnected ? '#16a34a' : '#ca8a04' }}>
                  {dbStatus?.isConnected ? 'Online & Synced' : 'Ready to Connect'}
                </div>
                <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                  {dbStatus?.database || 'sangita_mithai'} • {dbStatus?.productsCount || products.length} docs in Mongo
                </span>
              </div>
            </div>

            {/* Quick Actions & Recent Pipeline */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              {/* Quick Actions Card */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '18px',
                  border: '1px solid rgba(0,0,0,0.08)',
                  padding: '24px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
                }}
              >
                <h2 style={{ fontSize: '1.15rem', color: '#3b060d', marginBottom: '16px', fontWeight: 700 }}>
                  Administrative Quick Actions
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProduct(null);
                      setProdForm({
                        name: '',
                        category: categories[0]?.slug || 'milk-sweets',
                        price: '',
                        compareAtPrice: '',
                        stock: '50',
                        shortDescription: '',
                        description: '',
                        images: '/images/hero-sweets.jpg',
                        tags: '',
                        isFeatured: false,
                        isBestSeller: false,
                        isAvailable: true,
                      });
                      setShowProductModal(true);
                    }}
                    className="btn btn-primary"
                    style={{ justifyContent: 'center', width: '100%', gap: '8px' }}
                  >
                    <Plus size={16} />
                    <span>Add New Mithai to Catalog</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('database')}
                    className="btn btn-secondary"
                    style={{ justifyContent: 'center', width: '100%', gap: '8px' }}
                  >
                    <Database size={16} />
                    <span>Configure / Sync MongoDB Atlas</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSeedDatabase}
                    disabled={isSeeding}
                    className="btn btn-secondary"
                    style={{ justifyContent: 'center', width: '100%', gap: '8px' }}
                  >
                    <Sparkles size={16} />
                    <span>{isSeeding ? 'Seeding in Progress...' : 'Seed Sample Mithai & Categories'}</span>
                  </button>
                </div>
              </div>

              {/* Live Kitchen Feed */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '18px',
                  border: '1px solid rgba(0,0,0,0.08)',
                  padding: '24px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h2 style={{ fontSize: '1.15rem', color: '#3b060d', margin: 0, fontWeight: 700 }}>
                    Recent Orders Pipeline
                  </h2>
                  <button
                    type="button"
                    onClick={() => setActiveTab('orders')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#800020',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    View All <ChevronRight size={16} />
                  </button>
                </div>

                {orders.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 0', color: '#6b7280', fontSize: '0.9rem' }}>
                    No orders placed yet. Orders created by customers on checkout will stream live here.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {orders.slice(0, 4).map((ord) => (
                      <div
                        key={ord._id || ord.orderNumber}
                        style={{
                          padding: '12px 16px',
                          borderRadius: '12px',
                          backgroundColor: '#fcfaf6',
                          border: '1px solid rgba(0,0,0,0.06)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px',
                        }}
                      >
                        <div>
                          <strong style={{ color: '#3b060d', fontSize: '0.9rem' }}>#{ord.orderNumber}</strong>
                          <div style={{ fontSize: '0.8rem', color: '#4b5563' }}>
                            {ord.customer?.name} • ₹{ord.total}
                          </div>
                        </div>
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
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: ORDERS PIPELINE */}
        {/* ==================================================== */}
        {activeTab === 'orders' && (
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              overflow: 'hidden',
            }}
          >
            {/* Filter and Search Bar */}
            <div
              style={{
                padding: '20px 24px',
                borderBottom: '1px solid rgba(0,0,0,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              <div>
                <h2 style={{ fontSize: '1.25rem', color: '#3b060d', margin: 0, fontWeight: 700 }}>
                  Kitchen Order Management
                </h2>
                <span style={{ fontSize: '0.82rem', color: '#6b7280' }}>
                  Showing {filteredOrders.length} orders
                </span>
              </div>

              {/* Status Chips */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {['All', 'Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatusFilter(st)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      backgroundColor: statusFilter === st ? '#800020' : '#f3f4f6',
                      color: statusFilter === st ? '#ffffff' : '#374151',
                      border: 'none',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div style={{ position: 'relative', width: '220px' }}>
                <Search
                  size={16}
                  style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}
                />
                <input
                  type="text"
                  placeholder="Search order #, customer..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '34px', fontSize: '0.82rem' }}
                />
              </div>
            </div>

            {/* Orders Table */}
            {ordersLoading ? (
              <div style={{ padding: '60px', textAlign: 'center', color: '#6b7280' }}>
                <RefreshCw size={24} className="spin" style={{ margin: '0 auto 12px' }} />
                <div>Loading orders stream...</div>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div style={{ padding: '60px', textAlign: 'center', color: '#6b7280' }}>
                No orders found matching the filter criteria.
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#fcfaf6', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                      <th style={{ padding: '14px 20px', fontWeight: 700 }}>Order #</th>
                      <th style={{ padding: '14px 20px', fontWeight: 700 }}>Customer Details</th>
                      <th style={{ padding: '14px 20px', fontWeight: 700 }}>Delivery Location</th>
                      <th style={{ padding: '14px 20px', fontWeight: 700 }}>Mithai Items</th>
                      <th style={{ padding: '14px 20px', fontWeight: 700 }}>Amount & Mode</th>
                      <th style={{ padding: '14px 20px', fontWeight: 700 }}>Status</th>
                      <th style={{ padding: '14px 20px', fontWeight: 700 }}>Update Status</th>
                      <th style={{ padding: '14px 20px', fontWeight: 700, textAlign: 'center' }}>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((ord) => (
                      <tr key={ord._id || ord.orderNumber} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                        <td style={{ padding: '16px 20px', fontWeight: 700, color: '#3b060d' }}>
                          #{ord.orderNumber}
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <strong style={{ display: 'block' }}>{ord.customer?.name}</strong>
                          <span style={{ fontSize: '0.78rem', color: '#6b7280' }}>{ord.customer?.phone}</span>
                        </td>
                        <td style={{ padding: '16px 20px', maxWidth: '200px' }}>
                          <div style={{ fontSize: '0.82rem', color: '#374151' }}>{ord.shippingAddress?.address}</div>
                          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                            {ord.shippingAddress?.city} • PIN {ord.shippingAddress?.pincode}
                          </div>
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          {ord.items?.map((it: any, i: number) => (
                            <div key={i} style={{ fontSize: '0.8rem', color: '#374151' }}>
                              {it.quantity}x {it.name} ({it.weight})
                            </div>
                          ))}
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <strong style={{ color: '#3b060d', fontSize: '0.95rem' }}>₹{ord.total}</strong>
                          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{ord.paymentMethod}</div>
                        </td>
                        <td style={{ padding: '16px 20px' }}>
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
                        <td style={{ padding: '16px 20px' }}>
                          <select
                            value={ord.orderStatus}
                            onChange={(e) => handleUpdateOrderStatus(ord._id, e.target.value)}
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
                        <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                          <button
                            type="button"
                            onClick={() => setSelectedOrder(ord)}
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '6px 10px', fontSize: '0.8rem' }}
                            title="View Order Slip"
                          >
                            <Eye size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 3: SWEETS CATALOG (MONGODB CRUD) */}
        {/* ==================================================== */}
        {activeTab === 'products' && (
          <div>
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                border: '1px solid rgba(0,0,0,0.08)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                overflow: 'hidden',
              }}
            >
              {/* Toolbar */}
              <div
                style={{
                  padding: '20px 24px',
                  borderBottom: '1px solid rgba(0,0,0,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '16px',
                }}
              >
                <div>
                  <h2 style={{ fontSize: '1.25rem', color: '#3b060d', margin: 0, fontWeight: 700 }}>
                    Artisan Mithai Catalog ({filteredProducts.length} items)
                  </h2>
                  <span style={{ fontSize: '0.82rem', color: '#6b7280' }}>
                    Live MongoDB collection: <code>products</code>
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {/* Category Filter */}
                  <select
                    value={productCategoryFilter}
                    onChange={(e) => setProductCategoryFilter(e.target.value)}
                    className="form-select"
                    style={{ fontSize: '0.85rem', padding: '8px 12px' }}
                  >
                    <option value="all">All Categories</option>
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>

                  {/* Search */}
                  <div style={{ position: 'relative', width: '200px' }}>
                    <Search
                      size={16}
                      style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}
                    />
                    <input
                      type="text"
                      placeholder="Search sweet..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="form-input"
                      style={{ paddingLeft: '34px', fontSize: '0.85rem' }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingProduct(null);
                      setProdForm({
                        name: '',
                        category: categories[0]?.slug || 'milk-sweets',
                        price: '',
                        compareAtPrice: '',
                        stock: '50',
                        shortDescription: '',
                        description: '',
                        images: '/images/hero-sweets.jpg',
                        tags: '',
                        isFeatured: false,
                        isBestSeller: false,
                        isAvailable: true,
                      });
                      setShowProductModal(true);
                    }}
                    className="btn btn-primary btn-sm"
                    style={{ gap: '6px' }}
                  >
                    <Plus size={16} />
                    <span>Add New Sweet</span>
                  </button>
                </div>
              </div>

              {/* Table */}
              {productsLoading ? (
                <div style={{ padding: '60px', textAlign: 'center', color: '#6b7280' }}>
                  <RefreshCw size={24} className="spin" style={{ margin: '0 auto 12px' }} />
                  <div>Loading sweets catalog from database...</div>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div style={{ padding: '60px', textAlign: 'center', color: '#6b7280' }}>
                  No sweets found. Click &quot;Add New Sweet&quot; to create one or seed the database.
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#fcfaf6', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                        <th style={{ padding: '14px 20px', fontWeight: 700 }}>Sweet Name</th>
                        <th style={{ padding: '14px 20px', fontWeight: 700 }}>Category</th>
                        <th style={{ padding: '14px 20px', fontWeight: 700 }}>Base Price</th>
                        <th style={{ padding: '14px 20px', fontWeight: 700 }}>Stock</th>
                        <th style={{ padding: '14px 20px', fontWeight: 700 }}>Badges</th>
                        <th style={{ padding: '14px 20px', fontWeight: 700 }}>Availability</th>
                        <th style={{ padding: '14px 20px', fontWeight: 700, textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((p) => (
                        <tr key={p._id || p.slug} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                          <td style={{ padding: '14px 20px' }}>
                            <strong style={{ color: '#3b060d', display: 'block' }}>{p.name}</strong>
                            <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>/{p.slug}</span>
                          </td>
                          <td style={{ padding: '14px 20px' }}>
                            <span
                              style={{
                                backgroundColor: '#f3f4f6',
                                padding: '4px 8px',
                                borderRadius: '6px',
                                fontSize: '0.78rem',
                                color: '#4b5563',
                              }}
                            >
                              {p.category}
                            </span>
                          </td>
                          <td style={{ padding: '14px 20px' }}>
                            <strong style={{ color: '#16a34a' }}>₹{p.price}</strong>
                            {p.compareAtPrice && (
                              <span style={{ fontSize: '0.75rem', color: '#9ca3af', textDecoration: 'line-through', marginLeft: '6px' }}>
                                ₹{p.compareAtPrice}
                              </span>
                            )}
                          </td>
                          <td style={{ padding: '14px 20px' }}>
                            <span
                              style={{
                                fontWeight: 600,
                                color: p.stock < 20 ? '#dc2626' : '#374151',
                              }}
                            >
                              {p.stock} units
                            </span>
                          </td>
                          <td style={{ padding: '14px 20px' }}>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              {p.isFeatured && (
                                <span style={{ backgroundColor: '#fef3c7', color: '#b45309', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700 }}>
                                  Featured
                                </span>
                              )}
                              {p.isBestSeller && (
                                <span style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700 }}>
                                  Bestseller
                                </span>
                              )}
                            </div>
                          </td>
                          <td style={{ padding: '14px 20px' }}>
                            <button
                              type="button"
                              onClick={() => handleToggleProductAvailability(p)}
                              style={{
                                padding: '4px 10px',
                                borderRadius: '20px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                border: 'none',
                                backgroundColor: p.isAvailable ? '#dcfce7' : '#fee2e2',
                                color: p.isAvailable ? '#15803d' : '#b91c1c',
                              }}
                            >
                              {p.isAvailable ? 'In Stock' : 'Unavailable'}
                            </button>
                          </td>
                          <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingProduct(p);
                                  setProdForm({
                                    name: p.name,
                                    category: p.category,
                                    price: String(p.price),
                                    compareAtPrice: p.compareAtPrice ? String(p.compareAtPrice) : '',
                                    stock: String(p.stock || 50),
                                    shortDescription: p.shortDescription || '',
                                    description: p.description || '',
                                    images: Array.isArray(p.images) ? p.images.join(', ') : p.images || '/images/hero-sweets.jpg',
                                    tags: Array.isArray(p.tags) ? p.tags.join(', ') : '',
                                    isFeatured: !!p.isFeatured,
                                    isBestSeller: !!p.isBestSeller,
                                    isAvailable: p.isAvailable !== false,
                                  });
                                  setShowProductModal(true);
                                }}
                                className="btn btn-secondary btn-sm"
                                style={{ padding: '6px 10px' }}
                                title="Edit Product"
                              >
                                <Edit2 size={13} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteProduct(p._id || p.slug, p.name)}
                                className="btn btn-secondary btn-sm"
                                style={{ padding: '6px 10px', color: '#dc2626' }}
                                title="Delete Product"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 4: CATEGORIES */}
        {/* ==================================================== */}
        {activeTab === 'categories' && (
          <div>
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                border: '1px solid rgba(0,0,0,0.08)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                padding: '24px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <div>
                  <h2 style={{ fontSize: '1.25rem', color: '#3b060d', margin: 0, fontWeight: 700 }}>
                    Mithai Categories ({categories.length})
                  </h2>
                  <span style={{ fontSize: '0.82rem', color: '#6b7280' }}>
                    Live MongoDB collection: <code>categories</code>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setEditingCategory(null);
                    setCatForm({
                      name: '',
                      slug: '',
                      description: '',
                      image: '/images/hero-sweets.jpg',
                      isActive: true,
                    });
                    setShowCategoryModal(true);
                  }}
                  className="btn btn-primary btn-sm"
                  style={{ gap: '6px' }}
                >
                  <Plus size={16} />
                  <span>Add New Category</span>
                </button>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '16px',
                }}
              >
                {categories.map((c) => (
                  <div
                    key={c.slug}
                    style={{
                      border: '1px solid rgba(0,0,0,0.08)',
                      borderRadius: '14px',
                      padding: '18px',
                      backgroundColor: '#fcfaf6',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <strong style={{ fontSize: '1.05rem', color: '#3b060d' }}>{c.name}</strong>
                          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>/{c.slug}</div>
                        </div>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '10px',
                            backgroundColor: c.isActive ? '#dcfce7' : '#fee2e2',
                            color: c.isActive ? '#15803d' : '#b91c1c',
                          }}
                        >
                          {c.isActive ? 'Active' : 'Disabled'}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.82rem', color: '#4b5563', marginTop: '10px' }}>
                        {c.description || 'Traditional artisan delicacies crafted with pure ingredients.'}
                      </p>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '16px',
                        paddingTop: '12px',
                        borderTop: '1px solid rgba(0,0,0,0.06)',
                      }}
                    >
                      <span style={{ fontSize: '0.78rem', color: '#6b7280' }}>
                        {products.filter((p) => p.category === c.slug).length} sweets in catalog
                      </span>

                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCategory(c);
                            setCatForm({
                              name: c.name,
                              slug: c.slug,
                              description: c.description || '',
                              image: c.image || '/images/hero-sweets.jpg',
                              isActive: c.isActive !== false,
                            });
                            setShowCategoryModal(true);
                          }}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '4px 8px' }}
                        >
                          <Edit2 size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCategory(c._id || c.slug, c.name)}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '4px 8px', color: '#dc2626' }}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 5: MONGODB DATABASE MANAGER */}
        {/* ==================================================== */}
        {activeTab === 'database' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Live Database Overview */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                border: '1px solid rgba(0,0,0,0.08)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                padding: '24px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                  marginBottom: '20px',
                }}
              >
                <div>
                  <h2 style={{ fontSize: '1.25rem', color: '#3b060d', margin: 0, fontWeight: 700 }}>
                    MongoDB Atlas Database Center
                  </h2>
                  <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                    Live connection status, ping diagnostic, and database seeding
                  </span>
                </div>

                <button
                  type="button"
                  onClick={fetchDbStatus}
                  className="btn btn-secondary btn-sm"
                  style={{ gap: '6px' }}
                >
                  <RefreshCw size={14} className={dbLoading ? 'spin' : ''} />
                  <span>Test Connection / Ping</span>
                </button>
              </div>

              {/* Status Indicators Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '16px',
                  marginBottom: '24px',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#fcfaf6',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: '14px',
                    padding: '16px',
                  }}
                >
                  <span style={{ fontSize: '0.78rem', color: '#6b7280', textTransform: 'uppercase' }}>
                    Connection State
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                    <span
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: dbStatus?.isConnected ? '#22c55e' : '#eab308',
                      }}
                    />
                    <strong style={{ fontSize: '1.1rem', color: dbStatus?.isConnected ? '#15803d' : '#b45309' }}>
                      {dbStatus?.isConnected ? 'Active & Ready' : 'Fallback / Inactive'}
                    </strong>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '4px' }}>
                    readyState: {dbStatus?.readyState ?? 0}
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: '#fcfaf6',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: '14px',
                    padding: '16px',
                  }}
                >
                  <span style={{ fontSize: '0.78rem', color: '#6b7280', textTransform: 'uppercase' }}>
                    Database Name
                  </span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#3b060d', marginTop: '6px' }}>
                    {dbStatus?.database || 'sangita_mithai'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '4px' }}>
                    Primary Store Schema
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: '#fcfaf6',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: '14px',
                    padding: '16px',
                  }}
                >
                  <span style={{ fontSize: '0.78rem', color: '#6b7280', textTransform: 'uppercase' }}>
                    Host / Cluster
                  </span>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#374151', marginTop: '6px', wordBreak: 'break-all' }}>
                    {dbStatus?.host || 'Cluster0'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '4px' }}>
                    {dbStatus?.isAtlas ? 'MongoDB Atlas (AWS/Cloud)' : 'Local / Custom Node'}
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: '#fcfaf6',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: '14px',
                    padding: '16px',
                  }}
                >
                  <span style={{ fontSize: '0.78rem', color: '#6b7280', textTransform: 'uppercase' }}>
                    Collections & Docs
                  </span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#16a34a', marginTop: '6px' }}>
                    {products.length} Sweets • {categories.length} Cats
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '4px' }}>
                    {orders.length} Customer Orders
                  </div>
                </div>
              </div>

              {/* Seed Button Banner */}
              <div
                style={{
                  backgroundColor: '#fdfbf7',
                  border: '1px solid #d4af37',
                  borderRadius: '14px',
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '16px',
                }}
              >
                <div>
                  <strong style={{ fontSize: '1rem', color: '#3b060d', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={18} color="#d4af37" />
                    Auto-Seed Complete Artisan Mithai Catalog
                  </strong>
                  <div style={{ fontSize: '0.85rem', color: '#4b5563', marginTop: '4px' }}>
                    Populate 10 authentic sweets (Kaju Katli, Motichoor Ladoo, Rasgulla, Rasmalai, Besan Ladoo, etc.)
                    and 6 categories into MongoDB. Existing records with matching slugs are safely upserted without duplication.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSeedDatabase}
                  disabled={isSeeding}
                  className="btn btn-primary"
                  style={{ gap: '8px', minWidth: '180px', justifyContent: 'center' }}
                >
                  <Database size={16} />
                  <span>{isSeeding ? 'Seeding Database...' : 'Seed MongoDB Now'}</span>
                </button>
              </div>
            </div>

            {/* Configure MongoDB Connection Form */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                border: '1px solid rgba(0,0,0,0.08)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                padding: '24px',
              }}
            >
              <h3 style={{ fontSize: '1.15rem', color: '#3b060d', marginBottom: '8px', fontWeight: 700 }}>
                Connect / Update MongoDB Atlas Connection String
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#4b5563', marginBottom: '20px' }}>
                Paste your MongoDB Atlas connection string below to connect your application to your Atlas cluster.
                When submitted, our server verifies the credentials against the cluster and updates <code>.env.local</code>.
              </p>

              <form onSubmit={handleConnectMongo}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                    MongoDB Connection URI (SRV format)
                  </label>
                  <input
                    type="text"
                    placeholder="mongodb+srv://<username>:<password>@cluster0.mongodb.net/sangita_mithai?retryWrites=true&w=majority"
                    value={customMongoUri}
                    onChange={(e) => setCustomMongoUri(e.target.value)}
                    className="form-input"
                    style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
                  />
                  <span style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '4px', display: 'block' }}>
                    Current masked URI in environment: <code>{dbStatus?.uriMasked || 'mongodb://127.0.0.1:27017/sangita_mithai'}</code>
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    type="submit"
                    disabled={isConnecting}
                    className="btn btn-primary"
                    style={{ gap: '8px' }}
                  >
                    <CheckCircle size={16} />
                    <span>{isConnecting ? 'Verifying & Connecting...' : 'Connect to MongoDB Atlas'}</span>
                  </button>
                </div>
              </form>

              {/* Instructions Guide */}
              <div
                style={{
                  marginTop: '24px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  fontSize: '0.82rem',
                  color: '#4b5563',
                }}
              >
                <strong style={{ color: '#1f2937', display: 'block', marginBottom: '6px' }}>
                  💡 How to get your MongoDB Atlas connection string:
                </strong>
                <ol style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <li>In your open MongoDB Atlas tab for <strong>Cluster0</strong>, go to <strong>Connect</strong>.</li>
                  <li>Click <strong>Connect your application</strong> (Driver: Node.js).</li>
                  <li>Toggle <strong>Show Password</strong> on to reveal the exact password, or click <strong>Copy</strong> on the connection string.</li>
                  <li>Paste it into the field above and click <strong>Connect to MongoDB Atlas</strong>!</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ==================================================== */}
      {/* MODAL: ADD / EDIT PRODUCT */}
      {/* ==================================================== */}
      {showProductModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              maxWidth: '650px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '28px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#3b060d', margin: 0, fontWeight: 700 }}>
                {editingProduct ? `Edit Sweet: ${editingProduct.name}` : 'Add New Artisan Sweet to MongoDB'}
              </h3>
              <button
                type="button"
                onClick={() => setShowProductModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                    Sweet Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Kesar Peda"
                    value={prodForm.name}
                    onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                    Category *
                  </label>
                  <select
                    value={prodForm.category}
                    onChange={(e) => setProdForm({ ...prodForm, category: e.target.value })}
                    className="form-select"
                  >
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                    Base Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="250"
                    value={prodForm.price}
                    onChange={(e) => setProdForm({ ...prodForm, price: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                    Compare Price (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="280"
                    value={prodForm.compareAtPrice}
                    onChange={(e) => setProdForm({ ...prodForm, compareAtPrice: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                    Inventory Stock
                  </label>
                  <input
                    type="number"
                    placeholder="50"
                    value={prodForm.stock}
                    onChange={(e) => setProdForm({ ...prodForm, stock: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Short Catchy Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. Saffron-perfumed mawa pedas made with organic cow milk."
                  value={prodForm.shortDescription}
                  onChange={(e) => setProdForm({ ...prodForm, shortDescription: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Full Description & Ingredients
                </label>
                <textarea
                  rows={3}
                  placeholder="Detailed description of the heritage preparation method, pure Bilona ghee, nuts..."
                  value={prodForm.description}
                  onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Image Path (e.g. /images/kaju-katli.jpg)
                </label>
                <input
                  type="text"
                  placeholder="/images/kaju-katli.jpg"
                  value={prodForm.images}
                  onChange={(e) => setProdForm({ ...prodForm, images: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="Kaju, Festive, Desi Ghee, Gift Box"
                  value={prodForm.tags}
                  onChange={(e) => setProdForm({ ...prodForm, tags: e.target.value })}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', padding: '10px 0' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                  <input
                    type="checkbox"
                    checked={prodForm.isFeatured}
                    onChange={(e) => setProdForm({ ...prodForm, isFeatured: e.target.checked })}
                  />
                  <span>Show as Featured Sweet</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                  <input
                    type="checkbox"
                    checked={prodForm.isBestSeller}
                    onChange={(e) => setProdForm({ ...prodForm, isBestSeller: e.target.checked })}
                  />
                  <span>Mark as Best Seller</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                  <input
                    type="checkbox"
                    checked={prodForm.isAvailable}
                    onChange={(e) => setProdForm({ ...prodForm, isAvailable: e.target.checked })}
                  />
                  <span>Available for Order</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  {editingProduct ? 'Save Changes' : 'Create Sweet in Database'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL: ADD / EDIT CATEGORY */}
      {/* ==================================================== */}
      {showCategoryModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              maxWidth: '500px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#3b060d', margin: 0, fontWeight: 700 }}>
                {editingCategory ? `Edit Category: ${editingCategory.name}` : 'New Category'}
              </h3>
              <button
                type="button"
                onClick={() => setShowCategoryModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Ghee Sweets"
                  value={catForm.name}
                  onChange={(e) => setCatForm({ ...catForm, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Description of this confectionery category"
                  value={catForm.description}
                  onChange={(e) => setCatForm({ ...catForm, description: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Image URL
                </label>
                <input
                  type="text"
                  placeholder="/images/hero-sweets.jpg"
                  value={catForm.image}
                  onChange={(e) => setCatForm({ ...catForm, image: e.target.value })}
                  className="form-input"
                />
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                <input
                  type="checkbox"
                  checked={catForm.isActive}
                  onChange={(e) => setCatForm({ ...catForm, isActive: e.target.checked })}
                />
                <span>Active Category</span>
              </label>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  {editingCategory ? 'Update Category' : 'Save to MongoDB'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL: ORDER DETAILS & RECEIPT SLIP */}
      {/* ==================================================== */}
      {selectedOrder && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              maxWidth: '550px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#3b060d', margin: 0, fontWeight: 700 }}>
                  Order #{selectedOrder.orderNumber}
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                  {new Date(selectedOrder.createdAt).toLocaleString()}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}
              >
                <X size={20} />
              </button>
            </div>

            <div
              style={{
                backgroundColor: '#fcfaf6',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '16px',
                border: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Phone size={15} color="#800020" />
                <strong style={{ fontSize: '0.9rem' }}>{selectedOrder.customer?.name}</strong> •{' '}
                <span style={{ fontSize: '0.85rem' }}>{selectedOrder.customer?.phone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem', color: '#4b5563' }}>
                <MapPin size={15} color="#800020" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  {selectedOrder.shippingAddress?.address}, {selectedOrder.shippingAddress?.city},{' '}
                  {selectedOrder.shippingAddress?.state} - {selectedOrder.shippingAddress?.pincode}
                </span>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ fontSize: '0.9rem', color: '#374151', marginBottom: '8px' }}>Mithai Items</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {selectedOrder.items?.map((it: any, i: number) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.85rem',
                      padding: '6px 0',
                      borderBottom: '1px dashed #e5e7eb',
                    }}
                  >
                    <span>
                      {it.quantity}x {it.name} ({it.weight})
                    </span>
                    <strong>₹{it.price * it.quantity}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.05rem',
                fontWeight: 800,
                color: '#3b060d',
                paddingTop: '10px',
                borderTop: '2px solid #d4af37',
                marginBottom: '20px',
              }}
            >
              <span>Total Payable ({selectedOrder.paymentMethod}):</span>
              <span>₹{selectedOrder.total}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => window.print()}
                className="btn btn-secondary btn-sm"
              >
                Print Kitchen Slip
              </button>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="btn btn-primary btn-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
