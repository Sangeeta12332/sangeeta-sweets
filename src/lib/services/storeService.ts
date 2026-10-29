import { connectToDatabase } from '@/lib/mongodb';
import { Product, IProduct } from '@/lib/models/Product';
import { Category, ICategory } from '@/lib/models/Category';
import { Order, IOrder, OrderStatus } from '@/lib/models/Order';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, InitialProduct, InitialCategory } from '@/lib/data/initialData';

// In-memory runtime fallback storage (used when MongoDB is not connected or in-flight)
let memoryCategories: (InitialCategory & { _id: string; createdAt: Date; updatedAt: Date })[] = [
  ...INITIAL_CATEGORIES.map((cat, idx) => ({
    ...cat,
    _id: `mem_cat_${idx + 1}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  })),
];

let memoryProducts: (InitialProduct & { _id: string; createdAt: Date; updatedAt: Date })[] = [
  ...INITIAL_PRODUCTS.map((prod, idx) => ({
    ...prod,
    _id: `mem_prod_${idx + 1}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  })),
];

let memoryOrders: any[] = [];
let memoryOrderSeq = 1001;

// Helper to auto-seed MongoDB if connected but empty
async function ensureDbSeeded() {
  const db = await connectToDatabase();
  if (!db) return false;

  try {
    const prodCount = await Product.countDocuments();
    if (prodCount === 0) {
      console.log('Seeding initial categories into MongoDB...');
      for (const cat of INITIAL_CATEGORIES) {
        await Category.findOneAndUpdate({ slug: cat.slug }, cat, { upsert: true, new: true });
      }

      console.log('Seeding initial products into MongoDB...');
      for (const prod of INITIAL_PRODUCTS) {
        await Product.findOneAndUpdate({ slug: prod.slug }, prod, { upsert: true, new: true });
      }
    }
    return true;
  } catch (err) {
    console.warn('Auto-seed check encountered error:', (err as Error).message);
    return false;
  }
}

// ==========================================
// CATEGORIES
// ==========================================

export async function getCategories() {
  const db = await connectToDatabase();
  if (db) {
    try {
      await ensureDbSeeded();
      const categories = await Category.find({ isActive: true }).sort({ name: 1 }).lean();
      if (categories && categories.length > 0) {
        return JSON.parse(JSON.stringify(categories));
      }
    } catch (err) {
      console.warn('Error fetching categories from MongoDB, falling back to memory:', (err as Error).message);
    }
  }

  return memoryCategories.filter((c) => c.isActive);
}

export async function getCategoryBySlug(slug: string) {
  const db = await connectToDatabase();
  if (db) {
    try {
      const cat = await Category.findOne({ slug, isActive: true }).lean();
      if (cat) return JSON.parse(JSON.stringify(cat));
    } catch (err) {
      console.warn('Error querying category by slug from MongoDB:', (err as Error).message);
    }
  }

  return memoryCategories.find((c) => c.slug === slug && c.isActive) || null;
}

export async function createCategory(catData: any) {
  const db = await connectToDatabase();
  if (db) {
    try {
      const newCat = await Category.create(catData);
      return JSON.parse(JSON.stringify(newCat));
    } catch (err) {
      console.error('MongoDB createCategory failed:', err);
      throw err;
    }
  }

  const newCat = {
    ...catData,
    _id: `mem_cat_${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  memoryCategories.push(newCat);
  return newCat;
}

export async function updateCategory(id: string, updateData: any) {
  const db = await connectToDatabase();
  if (db) {
    try {
      const updated = await Category.findByIdAndUpdate(id, updateData, { new: true }).lean();
      if (updated) return JSON.parse(JSON.stringify(updated));
    } catch (err) {
      console.error('MongoDB updateCategory failed:', err);
      throw err;
    }
  }

  const idx = memoryCategories.findIndex((c) => c._id === id || c.slug === id);
  if (idx !== -1) {
    memoryCategories[idx] = { ...memoryCategories[idx], ...updateData, updatedAt: new Date() };
    return memoryCategories[idx];
  }
  return null;
}

export async function deleteCategory(id: string) {
  const db = await connectToDatabase();
  if (db) {
    try {
      await Category.findByIdAndDelete(id);
      return true;
    } catch (err) {
      console.error('MongoDB deleteCategory failed:', err);
      throw err;
    }
  }

  const initialLen = memoryCategories.length;
  memoryCategories = memoryCategories.filter((c) => c._id !== id && c.slug !== id);
  return memoryCategories.length < initialLen;
}

export async function forceSeedDatabase() {
  const db = await connectToDatabase();
  if (!db) {
    throw new Error('Database is not connected. Please verify your MongoDB connection string first.');
  }

  let catCount = 0;
  for (const cat of INITIAL_CATEGORIES) {
    await Category.findOneAndUpdate({ slug: cat.slug }, cat, { upsert: true, new: true });
    catCount++;
  }

  let prodCount = 0;
  for (const prod of INITIAL_PRODUCTS) {
    await Product.findOneAndUpdate({ slug: prod.slug }, prod, { upsert: true, new: true });
    prodCount++;
  }

  return { success: true, seededCategories: catCount, seededProducts: prodCount };
}

export async function getDatabaseSummary() {
  const db = await connectToDatabase();
  if (db) {
    try {
      const [productsCount, categoriesCount, ordersCount] = await Promise.all([
        Product.countDocuments(),
        Category.countDocuments(),
        Order.countDocuments(),
      ]);

      return {
        isConnected: true,
        source: 'MongoDB Database',
        productsCount,
        categoriesCount,
        ordersCount,
      };
    } catch (e: any) {
      return {
        isConnected: false,
        source: 'Memory Fallback Store',
        productsCount: memoryProducts.length,
        categoriesCount: memoryCategories.length,
        ordersCount: memoryOrders.length,
        error: e.message,
      };
    }
  }

  return {
    isConnected: false,
    source: 'Memory Fallback Store (Offline)',
    productsCount: memoryProducts.length,
    categoriesCount: memoryCategories.length,
    ordersCount: memoryOrders.length,
  };
}

// ==========================================
// PRODUCTS
// ==========================================

export interface ProductFilters {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  isAvailable?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  sort?: 'popular' | 'price-asc' | 'price-desc' | 'newest';
  page?: number;
  limit?: number;
}

export async function getProducts(filters: ProductFilters = {}) {
  const db = await connectToDatabase();

  if (db) {
    try {
      await ensureDbSeeded();
      const query: any = {};

      if (filters.category && filters.category !== 'all') {
        query.category = filters.category;
      }

      if (filters.isAvailable !== undefined) {
        query.isAvailable = filters.isAvailable;
      }

      if (filters.isFeatured !== undefined) {
        query.isFeatured = filters.isFeatured;
      }

      if (filters.isBestSeller !== undefined) {
        query.isBestSeller = filters.isBestSeller;
      }

      if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
        query.price = {};
        if (filters.minPrice !== undefined) query.price.$gte = Number(filters.minPrice);
        if (filters.maxPrice !== undefined) query.price.$lte = Number(filters.maxPrice);
      }

      if (filters.search && filters.search.trim() !== '') {
        const regex = new RegExp(filters.search.trim(), 'i');
        query.$or = [
          { name: regex },
          { description: regex },
          { shortDescription: regex },
          { tags: regex },
          { category: regex },
        ];
      }

      let sortQuery: any = { createdAt: -1 };
      if (filters.sort === 'price-asc') sortQuery = { price: 1 };
      else if (filters.sort === 'price-desc') sortQuery = { price: -1 };
      else if (filters.sort === 'popular') sortQuery = { isBestSeller: -1, rating: -1 };
      else if (filters.sort === 'newest') sortQuery = { createdAt: -1 };

      const page = filters.page || 1;
      const limit = filters.limit || 50;
      const skip = (page - 1) * limit;

      const [products, total] = await Promise.all([
        Product.find(query).sort(sortQuery).skip(skip).limit(limit).lean(),
        Product.countDocuments(query),
      ]);

      return {
        products: JSON.parse(JSON.stringify(products)),
        total,
        page,
        totalPages: Math.ceil(total / limit),
      };
    } catch (err) {
      console.warn('Error fetching products from MongoDB, using memory fallback:', (err as Error).message);
    }
  }

  // Memory fallback query logic
  let prods = [...memoryProducts];

  if (filters.category && filters.category !== 'all') {
    prods = prods.filter((p) => p.category === filters.category);
  }

  if (filters.isAvailable !== undefined) {
    prods = prods.filter((p) => p.isAvailable === filters.isAvailable);
  }

  if (filters.isFeatured !== undefined) {
    prods = prods.filter((p) => p.isFeatured === filters.isFeatured);
  }

  if (filters.isBestSeller !== undefined) {
    prods = prods.filter((p) => p.isBestSeller === filters.isBestSeller);
  }

  if (filters.minPrice !== undefined) {
    prods = prods.filter((p) => p.price >= Number(filters.minPrice));
  }
  if (filters.maxPrice !== undefined) {
    prods = prods.filter((p) => p.price <= Number(filters.maxPrice));
  }

  if (filters.search && filters.search.trim() !== '') {
    const s = filters.search.toLowerCase().trim();
    prods = prods.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s) ||
        p.shortDescription.toLowerCase().includes(s) ||
        p.category.toLowerCase().includes(s) ||
        p.tags.some((t) => t.toLowerCase().includes(s))
    );
  }

  if (filters.sort === 'price-asc') prods.sort((a, b) => a.price - b.price);
  else if (filters.sort === 'price-desc') prods.sort((a, b) => b.price - a.price);
  else if (filters.sort === 'popular') prods.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0) || b.rating - a.rating);
  else prods.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const page = filters.page || 1;
  const limit = filters.limit || 50;
  const total = prods.length;
  const pagedProds = prods.slice((page - 1) * limit, page * limit);

  return {
    products: pagedProds,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getProductBySlug(slug: string) {
  const db = await connectToDatabase();
  if (db) {
    try {
      const prod = await Product.findOne({ slug }).lean();
      if (prod) return JSON.parse(JSON.stringify(prod));
    } catch (err) {
      console.warn('Error fetching product by slug from MongoDB:', (err as Error).message);
    }
  }

  return memoryProducts.find((p) => p.slug === slug) || null;
}

export async function getProductById(id: string) {
  const db = await connectToDatabase();
  if (db) {
    try {
      let prod = null;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        prod = await Product.findById(id).lean();
      }
      if (!prod) {
        prod = await Product.findOne({ slug: id }).lean();
      }
      if (prod) return JSON.parse(JSON.stringify(prod));
    } catch (err) {
      console.warn('Error fetching product by ID/slug from MongoDB:', (err as Error).message);
    }
  }

  return memoryProducts.find((p) => p._id === id || p.id === id || p.slug === id) || null;
}

export async function createProduct(productData: any) {
  const db = await connectToDatabase();
  if (db) {
    try {
      const newProd = await Product.create(productData);
      return JSON.parse(JSON.stringify(newProd));
    } catch (err) {
      console.error('MongoDB product create failed:', err);
      throw err;
    }
  }

  const newProd = {
    ...productData,
    _id: `mem_prod_${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  memoryProducts.unshift(newProd);
  return newProd;
}

export async function updateProduct(id: string, updateData: any) {
  const db = await connectToDatabase();
  if (db) {
    try {
      const updated = await Product.findByIdAndUpdate(id, updateData, { new: true }).lean();
      if (updated) return JSON.parse(JSON.stringify(updated));
    } catch (err) {
      console.error('MongoDB product update failed:', err);
      throw err;
    }
  }

  const idx = memoryProducts.findIndex((p) => p._id === id || p.id === id);
  if (idx !== -1) {
    memoryProducts[idx] = { ...memoryProducts[idx], ...updateData, updatedAt: new Date() };
    return memoryProducts[idx];
  }
  return null;
}

export async function deleteProduct(id: string) {
  const db = await connectToDatabase();
  if (db) {
    try {
      await Product.findByIdAndDelete(id);
      return true;
    } catch (err) {
      console.error('MongoDB product delete failed:', err);
      throw err;
    }
  }

  const initialLen = memoryProducts.length;
  memoryProducts = memoryProducts.filter((p) => p._id !== id && p.id !== id);
  return memoryProducts.length < initialLen;
}

// ==========================================
// ORDERS & CHECKOUT SERVER VALIDATION
// ==========================================

export async function createOrder(orderInput: {
  customer: { name: string; phone: string; email: string };
  shippingAddress: { address: string; city: string; state: string; pincode: string };
  items: { productId: string; quantity: number; weight: string }[];
  paymentMethod: 'Cash on Delivery' | 'Pay Online';
  deliveryInstructions?: string;
}) {
  // CRITICAL SECURITY REQUIREMENT:
  // "Do NOT trust prices sent by the browser."
  // "Recalculate product totals on the server."
  // "Calculate subtotal, delivery fee, final total on server."

  if (!orderInput.items || orderInput.items.length === 0) {
    throw new Error('Order must contain at least one item');
  }

  let serverSubtotal = 0;
  const verifiedItems: any[] = [];

  for (const item of orderInput.items) {
    if (!item.quantity || item.quantity <= 0) {
      throw new Error('Invalid item quantity');
    }

    // Fetch genuine product from store
    const product = await getProductById(item.productId);
    if (!product) {
      throw new Error(`Product not found: ${item.productId}`);
    }

    if (!product.isAvailable) {
      throw new Error(`Product "${product.name}" is currently out of stock`);
    }

    // Determine correct price based on weight option or base price
    let unitPrice = product.price;
    if (item.weight && product.weightOptions && product.weightOptions.length > 0) {
      const matchedOpt = product.weightOptions.find(
        (opt: any) => opt.label.toLowerCase() === item.weight.toLowerCase()
      );
      if (matchedOpt) {
        unitPrice = matchedOpt.price;
      }
    }

    const itemSubtotal = unitPrice * item.quantity;
    serverSubtotal += itemSubtotal;

    verifiedItems.push({
      productId: product._id || product.id,
      name: product.name,
      price: unitPrice,
      quantity: item.quantity,
      weight: item.weight || 'Standard',
      subtotal: itemSubtotal,
      image: (product.images && product.images[0]) || '/images/hero-sweets.jpg',
    });
  }

  // Delivery fee rule: Free delivery for orders >= ₹500, otherwise ₹50
  const deliveryFee = serverSubtotal >= 500 ? 0 : 50;
  const total = serverSubtotal + deliveryFee;

  // Generate unique order number (SM-2026-XXXXX)
  const currentYear = new Date().getFullYear();
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  const orderNumber = `SM-${currentYear}-${randomSuffix}`;

  const orderPayload = {
    orderNumber,
    customer: orderInput.customer,
    shippingAddress: orderInput.shippingAddress,
    items: verifiedItems,
    subtotal: serverSubtotal,
    deliveryFee,
    total,
    paymentMethod: (orderInput.paymentMethod || 'Cash on Delivery') as 'Cash on Delivery' | 'Pay Online',
    paymentStatus: (orderInput.paymentMethod === 'Pay Online' ? 'Pending' : 'COD') as 'Pending' | 'COD' | 'Paid' | 'Failed',
    orderStatus: 'Pending' as OrderStatus,
    deliveryInstructions: orderInput.deliveryInstructions || '',
  };

  const db = await connectToDatabase();
  if (db) {
    try {
      const created = await Order.create(orderPayload);
      return JSON.parse(JSON.stringify(created));
    } catch (err) {
      console.warn('MongoDB order insert failed, saving to memory fallback:', (err as Error).message);
    }
  }

  // Fallback memory order
  const memOrder = {
    ...orderPayload,
    _id: `mem_order_${memoryOrderSeq++}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  memoryOrders.unshift(memOrder);
  return memOrder;
}

export async function getOrders(statusFilter?: string) {
  const db = await connectToDatabase();
  if (db) {
    try {
      const query: any = {};
      if (statusFilter && statusFilter !== 'all') {
        query.orderStatus = statusFilter;
      }
      const orders = await Order.find(query).sort({ createdAt: -1 }).lean();
      return JSON.parse(JSON.stringify(orders));
    } catch (err) {
      console.warn('Error querying orders from MongoDB:', (err as Error).message);
    }
  }

  let list = [...memoryOrders];
  if (statusFilter && statusFilter !== 'all') {
    list = list.filter((o) => o.orderStatus === statusFilter);
  }
  return list;
}

export async function getOrderByNumber(orderNumber: string) {
  const db = await connectToDatabase();
  if (db) {
    try {
      const order = await Order.findOne({ orderNumber }).lean();
      if (order) return JSON.parse(JSON.stringify(order));
    } catch (err) {
      console.warn('Error querying order by number from MongoDB:', (err as Error).message);
    }
  }

  return memoryOrders.find((o) => o.orderNumber === orderNumber) || null;
}

export async function getOrderById(id: string) {
  const db = await connectToDatabase();
  if (db) {
    try {
      const order = await Order.findById(id).lean();
      if (order) return JSON.parse(JSON.stringify(order));
    } catch (err) {
      console.warn('Error querying order by ID from MongoDB:', (err as Error).message);
    }
  }

  return memoryOrders.find((o) => o._id === id || o.orderNumber === id) || null;
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  const validStatuses: OrderStatus[] = [
    'Pending',
    'Confirmed',
    'Preparing',
    'Out for Delivery',
    'Delivered',
    'Cancelled',
  ];

  if (!validStatuses.includes(status)) {
    throw new Error(`Invalid order status: ${status}`);
  }

  const db = await connectToDatabase();
  if (db) {
    try {
      const updated = await Order.findByIdAndUpdate(id, { orderStatus: status }, { new: true }).lean();
      if (updated) return JSON.parse(JSON.stringify(updated));
    } catch (err) {
      console.warn('Error updating order status in MongoDB:', (err as Error).message);
    }
  }

  const target = memoryOrders.find((o) => o._id === id || o.orderNumber === id);
  if (target) {
    target.orderStatus = status;
    target.updatedAt = new Date();
    return target;
  }
  return null;
}

// ==========================================
// ADMIN DASHBOARD ANALYTICS
// ==========================================

export async function getAdminStats() {
  const db = await connectToDatabase();
  if (db) {
    try {
      const [totalProducts, totalOrders, pendingOrders, deliveredOrders, revenueAgg, recentOrders] =
        await Promise.all([
          Product.countDocuments(),
          Order.countDocuments(),
          Order.countDocuments({ orderStatus: 'Pending' }),
          Order.countDocuments({ orderStatus: 'Delivered' }),
          Order.aggregate([
            { $match: { orderStatus: { $ne: 'Cancelled' } } },
            { $group: { _id: null, totalSales: { $sum: '$total' } } },
          ]),
          Order.find().sort({ createdAt: -1 }).limit(5).lean(),
        ]);

      const totalSales = revenueAgg.length > 0 ? revenueAgg[0].totalSales : 0;

      return {
        totalProducts,
        totalOrders,
        pendingOrders,
        deliveredOrders,
        totalSales,
        recentOrders: JSON.parse(JSON.stringify(recentOrders)),
      };
    } catch (err) {
      console.warn('Error calculating admin stats from MongoDB:', (err as Error).message);
    }
  }

  // Memory fallback stats
  const totalProducts = memoryProducts.length;
  const totalOrders = memoryOrders.length;
  const pendingOrders = memoryOrders.filter((o) => o.orderStatus === 'Pending').length;
  const deliveredOrders = memoryOrders.filter((o) => o.orderStatus === 'Delivered').length;
  const totalSales = memoryOrders
    .filter((o) => o.orderStatus !== 'Cancelled')
    .reduce((sum, o) => sum + (o.total || 0), 0);
  const recentOrders = memoryOrders.slice(0, 5);

  return {
    totalProducts,
    totalOrders,
    pendingOrders,
    deliveredOrders,
    totalSales,
    recentOrders,
  };
}
