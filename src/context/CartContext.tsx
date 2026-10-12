'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from './ToastContext';

export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  weight: string;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: any, quantity?: number, weight?: string, priceOverride?: number) => void;
  removeItem: (productId: string, weight: string) => void;
  updateQuantity: (productId: string, weight: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  isLoaded: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_STORAGE_KEY = 'sm_cart_v1';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { showToast } = useToast();

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to parse cart from localStorage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.error('Failed to save cart to localStorage:', e);
      }
    }
  }, [items, isLoaded]);

  const addItem = (
    product: any,
    quantity: number = 1,
    weight: string = 'Standard',
    priceOverride?: number
  ) => {
    const prodId = product._id || product.id || product.slug;
    let unitPrice = priceOverride !== undefined ? priceOverride : product.price;

    // Determine weight price if not provided
    if (priceOverride === undefined && product.weightOptions && product.weightOptions.length > 0) {
      const match = product.weightOptions.find((w: any) => w.label === weight);
      if (match) {
        unitPrice = match.price;
      } else {
        unitPrice = product.weightOptions[0].price;
        weight = product.weightOptions[0].label;
      }
    }

    setItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.productId === prodId && i.weight === weight
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      } else {
        return [
          ...prev,
          {
            productId: prodId,
            name: product.name,
            slug: product.slug,
            price: unitPrice,
            quantity,
            weight,
            image: (product.images && product.images[0]) || '/images/hero-sweets.jpg',
          },
        ];
      }
    });

    showToast(`Added ${product.name} (${weight}) to your cart!`, 'success');
  };

  const removeItem = (productId: string, weight: string) => {
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.weight === weight)));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId: string, weight: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, weight);
      return;
    }

    setItems((prev) =>
      prev.map((i) => {
        if (i.productId === productId && i.weight === weight) {
          return { ...i, quantity };
        }
        return i;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // Free delivery over ₹500, else ₹50
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= 500 ? 0 : 50;
  const total = subtotal + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        deliveryFee,
        total,
        isLoaded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
