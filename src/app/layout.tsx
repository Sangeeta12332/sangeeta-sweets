import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";

export const metadata: Metadata = {
  title: "Sangita Mithai | Authentic Royal Indian Sweets & Mithai",
  description:
    "Experience the royal heritage of pure desi ghee Indian sweets. Handcrafted Kaju Katli, Gulab Jamun, Rasgulla, Motichoor Ladoo, and luxury gift hampers made fresh daily.",
  keywords: [
    "Sangita Mithai",
    "Indian Sweets",
    "Mithai",
    "Kaju Katli",
    "Gulab Jamun",
    "Rasgulla",
    "Motichoor Ladoo",
    "Pure Desi Ghee",
    "Diwali Sweets",
    "Sweet Box",
  ],
  icons: {
    icon: "/images/logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#681324",
};

import React, { Suspense } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ToastProvider>
          <CartProvider>
            <Suspense fallback={<div style={{ height: "var(--header-height)", backgroundColor: "var(--color-cream-light)" }} />}>
              <Header />
            </Suspense>
            <main id="main-content" style={{ minHeight: "calc(100vh - 120px)" }}>
              {children}
            </main>
            <Footer />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}

