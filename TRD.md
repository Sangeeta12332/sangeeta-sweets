# Sangita Mithai — Technical Requirements Document (TRD)

**Document Version:** 1.0.0  
**Status:** Approved for Review (Phase 1: Planning & Architecture Only)  
**Author:** Software Architect & Technical Lead  
**Scope:** Complete Technical Specifications for Engineering Implementation  

---

## 1. Executive Summary & Document Purpose

This **Technical Requirements Document (TRD)** translates the product requirements ([PRD.md](file:///c:/Users/DELL/OneDrive/Documents/sangita%20mithai/PRD.md)), visual guidelines ([DESIGN-PLAN.md](file:///c:/Users/DELL/OneDrive/Documents/sangita%20mithai/DESIGN-PLAN.md)), and architectural strategy ([TECHNICAL-PLAN.md](file:///c:/Users/DELL/OneDrive/Documents/sangita%20mithai/TECHNICAL-PLAN.md)) into an unambiguous technical blueprint for developers.

It details:
- Exact component hierarchies and client/server boundaries in Next.js 16.
- Complete API route contracts and request/response specifications.
- Exact Mongoose data models and validation constraints.
- Multi-tier security, authentication, and customer privacy architecture.
- Order calculation logic and payment handling (COD + future Online Gateway).
- Environment configurations and deployment readiness criteria.

> ⚠️ **Implementation Notice:** No application source code has been implemented, no packages installed, and no live database connected. This document serves strictly as an engineering specification.

---

## 2. Frontend Architecture & Interface Requirements

### 2.1 Technology Stack & Rendering Paradigm
- **Framework:** Next.js 16 (App Router paradigm).
- **Core Library:** React 19.
- **Language:** TypeScript 5 (strict type checking enabled).
- **Styling Architecture:** Vanilla CSS with CSS Modules and CSS Variables. Zero utility class bloat.
- **Iconography:** Lucide React icons.

```
+-----------------------------------------------------------------------------------+
| Next.js App Router Architecture                                                   |
|                                                                                   |
|  Server Components (Default)                 Client Components ('use client')     |
|  - Layout shell (SEO, Head, Metadata)       - Navbar interactive drawer & cart    |
|  - Static content (About Us, Contact Info)   - Portion selector pills             |
|  - Server-rendered catalog data              - Cart drawer & quantity steppers    |
|                                              - Checkout validation forms          |
|                                              - Admin interactive tables & modals  |
+-----------------------------------------------------------------------------------+
```

### 2.2 Responsive Design & Viewport Breakpoints
The frontend must follow a **mobile-first design approach**, supporting viewports from 360px up to 4K displays:

| Viewport Category | Breakpoint Range | Key UX Adaptations |
| :--- | :--- | :--- |
| **Mobile (Compact)** | `360px` – `639px` | Single-column cards, sticky bottom navigation bar, full-screen cart drawer, thumb-friendly 44px+ touch targets. |
| **Tablet (Medium)** | `640px` – `1023px` | 2-column product grid, standard top navigation bar with hamburger menu, slide-out cart sidebar. |
| **Desktop (Large)** | `1024px` – `1439px` | 3 to 4-column product grid, 2-column checkout page (Form on left, Sticky Order Summary on right). |
| **Wide Desktop** | `1440px+` | Constrained maximum container width (`1280px`) centered with generous breathing room. |

### 2.3 Reusable Component Hierarchy

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx              # Top bar, logo, desktop links, search trigger, cart pill
│   │   ├── MobileNav.tsx           # Sticky bottom navigation bar for mobile
│   │   ├── Footer.tsx              # Traditional footer, legal disclaimers, contact info
│   │   └── Container.tsx           # Standardized responsive page container wrapper
│   ├── common/
│   │   ├── Button.tsx              # Primary vermilion, secondary saffron, outline variants
│   │   ├── Input.tsx               # Controlled form input with floating label & error message
│   │   ├── Badge.tsx               # Pure Veg green emblem, Bestseller ribbon, Stock badge
│   │   ├── Modal.tsx               # Accessible dialog modal with ESC & backdrop dismissal
│   │   ├── StatusStepper.tsx       # Visual progress bar for order tracking milestones
│   │   └── LoadingSkeleton.tsx     # Shimmer skeleton for product cards and tables
│   ├── shop/
│   │   ├── ProductCard.tsx         # 1:1 image, title, portion radio pills, price, Add button
│   │   ├── CategoryFilter.tsx      # Horizontal scrollable category pill bar
│   │   ├── SearchBar.tsx           # Debounced sweet search input
│   │   └── PortionSelector.tsx     # Weight / Piece / Box selector radio pills
│   ├── cart/
│   │   ├── CartDrawer.tsx          # Slide-out or standalone cart view
│   │   ├── CartItemRow.tsx         # Image, sweet name, selected portion, qty (+/-), remove
│   │   └── CartSummary.tsx         # Subtotal, delivery fee calculation, grand total, checkout CTA
│   └── checkout/
│       ├── AddressForm.tsx         # Name, 10-digit mobile, address, landmark, PIN code
│       ├── PaymentSelector.tsx     # COD radio button (active) and Online Payment (phase 5)
│       └── OrderReviewCard.tsx     # Compact line-item list for final submission
```

### 2.4 Page-Specific Frontend Specifications

#### 1. Home Page (`/`)
- **Hero Section:** Large visual banner with traditional decorative motifs, appetizing sweets imagery, primary CTA (*"Order Fresh Sweets"*), and trust highlights (*"100% Pure Desi Ghee"*, *"Prepared Daily"*).
- **Featured Sweets Carousel / Grid:** Highlights signature sweets (Kaju Katli, Motichoor Ladoo, Rasmalai).
- **Festival Gift Hampers Banner:** Callout for festive and wedding gift packaging.
- **Customer Testimonials:** Social proof cards with star ratings.

#### 2. Sweets / Shop Page (`/shop`)
- **Category Filter Tabs:** All, Milk Sweets, Bengali Sweets, Dry Fruit Sweets, Traditional Mithai, Gift Boxes.
- **Search Bar:** Real-time client-side filter with 250ms debounce against sweet name, category, and tags.
- **Product Grid:** Responsive CSS grid displaying all 13 core sweets with live portion selector pills.

#### 3. Product Details Page (`/shop/[slug]`)
- **Media Gallery:** Main high-resolution image with thumbnail selector.
- **Product Information:** Name, category badge, vegetarian emblem, rich culinary description, ingredients list, allergen notes, and storage recommendations.
- **Portion Selection:** Radio buttons for configurable options (e.g., 250g, 500g, 1kg, or pieces) with instant price updates.
- **Quantity Selector:** Stepper (`-` / `+`) with minimum 1 and maximum 20 per line item.
- **Action Button:** Full-width *"Add to Sweet Box"* button with celebratory micro-feedback.

#### 4. Cart Page (`/cart`) & Slide-Out Drawer
- **Item Breakdown:** List showing thumbnail, sweet title, chosen portion (e.g., 500g), unit price, current quantity stepper, line total, and remove button.
- **Empty State:** Illustrated empty brass platter with warm copy and *"Browse Sweets"* button.
- **Cart Context & Persistence:** Powered by React Context API and synchronized with `window.localStorage` (`key: 'sm_cart_items'`).

#### 5. Checkout Page (`/checkout`)
- **Single-Page Form:** Form fields organized into clear sections:
  1. Customer Contact (Full Name, 10-digit Mobile Number).
  2. Delivery Address (House/Flat, Street, Landmark, City, 6-digit PIN code).
  3. Delivery Notes (Optional, max 200 characters).
  4. Payment Mode (Cash on Delivery default; Online Payment marked as Phase 5).
- **Inline Validation:** Validates mobile format (`/^[6-9]\d{9}$/`) and PIN code format (`/^\d{6}$/`) on blur.
- **PIN Code Zone Check:** Triggers client-side verification against allowed delivery PIN codes.

#### 6. Order Success Page (`/order-success`)
- **Access Control:** Rendered immediately post-checkout using temporary session state or secure token.
- **Contents:** Auspicious confirmation headline, Order Reference ID (`#SM-XXXX`), delivery address summary, items list, estimated delivery window, and shop contact helpline.

#### 7. Order Status / Tracking Page (`/track-order`)
- **Authentication Wall:** Dual-field lookup form requiring:
  1. Order Reference ID (e.g., `SM-1042`).
  2. 10-digit Mobile Phone Number.
- **Visual Progress Stepper:** Five milestones: `Order Placed` → `Confirmed` → `Preparing` → `Out for Delivery` → `Delivered`.
- **Privacy Masking:** Customer street address is masked (e.g., *"H.No. 45, Sector ***, Local City"*) to prevent privacy leakage.

#### 8. About Us (`/about`) & Contact Us (`/contact`) Pages
- Clean, SEO-optimized informational pages.
- Contact page features telephone, WhatsApp click-to-chat, shop hours, and placeholder Google Map embed.

#### 9. Admin Dashboard (`/admin` and `/admin/login`)
- **Login Screen:** Clean username/email and password entry with rate-limiting feedback.
- **Dashboard Overview:** Metric cards (Today's Orders, Revenue, Pending Dispatch, Out of Stock items).
- **Orders Table:** Filterable by status; expands to show items, delivery notes, and single-click status advancement buttons.
- **Product Inventory Manager:** Modal or inline table to update prices, stock quantities, and availability toggles.

---

## 3. Backend Architecture & API Specifications

All backend operations run inside Next.js Server Route Handlers (`src/app/api/.../route.ts`).

### 3.1 API Route Directory & Contracts

| Endpoint | HTTP Method | Access Level | Description |
| :--- | :--- | :--- | :--- |
| `/api/products` | `GET` | Public | Returns list of all available sweets with portion options and prices. Supports `?category=` and `?search=` query parameters. |
| `/api/products/[slug]` | `GET` | Public | Returns detailed product data for a single sweet. |
| `/api/categories` | `GET` | Public | Returns active category list with item counts. |
| `/api/orders` | `POST` | Public | Validates cart items, verifies prices against DB, checks delivery PIN, and creates an order. |
| `/api/orders/track` | `POST` | Public (Verified) | Verifies Order ID + Phone Number and returns order status and masked delivery details. |
| `/api/admin/login` | `POST` | Public | Validates admin credentials; issues HTTP-only JWT cookie on success. |
| `/api/admin/logout` | `POST` | Authenticated | Clears the session cookie. |
| `/api/admin/orders` | `GET` | Authenticated | Returns paginated list of all orders with status filters. |
| `/api/admin/orders/[id]/status` | `PATCH` | Authenticated | Updates the fulfillment status (`Pending` → `Confirmed` → `Preparing` → etc.). |
| `/api/admin/products` | `POST` | Authenticated | Adds a new sweet to the catalog. |
| `/api/admin/products/[id]` | `PUT` | Authenticated | Updates existing sweet details, categories, or portion prices. |
| `/api/admin/products/[id]/stock` | `PATCH` | Authenticated | Toggles availability (`isAvailable: true/false`). |
| `/api/payments/create-order` | `POST` | Public (Phase 5) | Creates a payment gateway order with verified server amounts. |
| `/api/payments/verify` | `POST` | Public (Phase 5) | Cryptographically verifies payment signature before marking order as PAID. |
| `/api/payments/webhook` | `POST` | Gateway Only (Phase 5)| Server-to-server webhook receiver with HMAC signature verification. |

### 3.2 Key API Payloads & Contracts

#### `POST /api/orders` (Order Creation)
**Request Body:**
```json
{
  "customer": {
    "name": "Rajesh Sharma",
    "phone": "9876543210",
    "address": "Flat 302, Krishna Heights, Station Road",
    "landmark": "Near Hanuman Temple",
    "city": "Local City Placeholder",
    "pincode": "110001",
    "deliveryNotes": "Please ring bell and leave with security if unavailable."
  },
  "items": [
    {
      "productId": "651234abcd5678ef01234567",
      "selectedOption": "500g",
      "quantity": 2
    },
    {
      "productId": "651234abcd5678ef01234589",
      "selectedOption": "250g",
      "quantity": 1
    }
  ],
  "paymentMethod": "COD"
}
```

**Server Processing Logic:**
1. Validates `customer.phone` matches Indian 10-digit mobile pattern.
2. Validates `customer.pincode` matches 6-digit format and exists in the allowed delivery zone list.
3. For each item in `items`:
   - Fetches true product from MongoDB using `productId`.
   - Checks `product.isAvailable === true`.
   - Finds matching `selectedOption` (e.g., `"500g"`) in `product.weightOptions`.
   - Reads authoritative `option.price` from DB.
   - Calculates `lineTotal = option.price * quantity`.
4. Computes `subtotal = sum(lineTotals)`.
5. Computes `deliveryFee` based on configured rules (e.g., ₹0 if subtotal ≥ threshold, else standard fee).
6. Computes `totalAmount = subtotal + deliveryFee`.
7. Generates human-friendly Order ID (e.g., `SM-1042`).
8. Saves order document with `orderStatus: "Pending"` and `paymentStatus: "PENDING"`.
9. Returns response:
```json
{
  "success": true,
  "orderNumber": "SM-1042",
  "totalAmount": 1420,
  "paymentMethod": "COD",
  "orderStatus": "Pending",
  "message": "Order placed successfully."
}
```

#### `POST /api/orders/track` (Secure Lookup)
**Request Body:**
```json
{
  "orderNumber": "SM-1042",
  "phone": "9876543210"
}
```
**Response (Success):**
```json
{
  "success": true,
  "order": {
    "orderNumber": "SM-1042",
    "orderStatus": "Preparing",
    "createdAt": "2026-10-09T14:30:00.000Z",
    "items": [
      { "name": "Kaju Katli", "selectedOption": "500g", "quantity": 2, "lineTotal": 1240 },
      { "name": "Motichoor Ladoo", "selectedOption": "250g", "quantity": 1, "lineTotal": 180 }
    ],
    "subtotal": 1420,
    "deliveryFee": 0,
    "totalAmount": 1420,
    "paymentMethod": "COD",
    "customer": {
      "name": "Rajesh Sharma",
      "maskedAddress": "Flat 302, Kr**** He****, Local City, PIN: 110001"
    },
    "statusHistory": [
      { "status": "Pending", "timestamp": "2026-10-09T14:30:00.000Z" },
      { "status": "Confirmed", "timestamp": "2026-10-09T14:35:00.000Z" },
      { "status": "Preparing", "timestamp": "2026-10-09T14:40:00.000Z" }
    ]
  }
}
```

---

## 4. Database Architecture & Data Models (MongoDB / Mongoose)

### 4.1 Connection Management (Next.js Serverless Resilience)
Next.js server route handlers run in ephemeral environments. To prevent connection exhaustion, MongoDB connections must be cached globally:

```typescript
// Architectural Pattern: Cached Mongoose Connection
// File: src/lib/mongodb.ts (To be implemented in Phase 4)
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };
if (!global.mongooseCache) {
  global.mongooseCache = cached;
}
```

### 4.2 Data Models

#### 1. Product Model (`products` collection)
```typescript
interface IWeightOption {
  label: string;             // e.g., "250g", "500g", "1kg", "4 pcs", "1 box"
  price: number;             // Price in INR (minimum: 0)
}

interface IProduct {
  _id: mongoose.Types.ObjectId;
  name: string;              // Required, trimmed. e.g., "Kaju Katli"
  slug: string;              // Required, unique, trimmed, lowercase. e.g., "kaju-katli"
  description: string;       // Required rich text description
  shortDescription: string;  // Required concise card summary
  price: number;             // Required base starting price
  compareAtPrice?: number;   // Optional strikethrough MRP for festival offers
  category: string;          // Required category slug (indexed)
  images: string[];          // Array of relative image paths (default: ["/images/hero-sweets.jpg"])
  ingredients: string[];     // Array of key ingredients
  weightOptions: IWeightOption[]; // Array of configurable portion tiers
  isFeatured: boolean;       // Indexed boolean for hero section
  isBestSeller: boolean;     // Indexed boolean for highlight ribbons
  isAvailable: boolean;      // Indexed boolean for stock toggle
  stock: number;             // Inventory count (default: 50, minimum: 0)
  tags: string[];            // Search tags e.g., ["Kaju", "Silver Leaf", "Diwali"]
  rating: number;            // Visual display rating (default: 4.8)
  reviewCount: number;       // Visual display reviews (default: 12)
  createdAt: Date;
  updatedAt: Date;
}
```
**Database Indexes:**
- Compound Text Index: `{ name: 'text', description: 'text', shortDescription: 'text', tags: 'text' }`
- Unique Index: `{ slug: 1 }`
- Single Field Indexes: `{ category: 1 }`, `{ isFeatured: 1 }`, `{ isAvailable: 1 }`

#### 2. Order Model (`orders` collection)
```typescript
interface IOrderItem {
  productId: mongoose.Types.ObjectId;
  name: string;              // Snapshot of sweet name at time of purchase
  selectedOption: string;    // Snapshot of portion label (e.g., "500g")
  unitPrice: number;         // Snapshot of price per portion at time of purchase
  quantity: number;          // Minimum: 1
  lineTotal: number;         // unitPrice * quantity
}

interface ICustomerDetails {
  name: string;              // Required, minimum 2 characters
  phone: string;             // Required, validated 10-digit Indian mobile
  address: string;           // Required street address
  landmark?: string;         // Optional landmark
  city: string;              // Required delivery city
  pincode: string;           // Required 6-digit PIN code
  deliveryNotes?: string;    // Optional instructions
}

interface IOrder {
  _id: mongoose.Types.ObjectId;
  orderNumber: string;       // Unique human-readable code e.g., "SM-1042" (indexed)
  customer: ICustomerDetails;
  items: IOrderItem[];
  subtotal: number;          // Total of items
  deliveryFee: number;       // Applied delivery charge
  totalAmount: number;       // subtotal + deliveryFee
  paymentMethod: 'COD' | 'ONLINE';
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
  paymentDetails?: {
    gateway?: string;        // "Razorpay", "Cashfree", etc.
    orderId?: string;        // Gateway Order ID
    paymentId?: string;      // Gateway Transaction / Payment ID
    signature?: string;      // Gateway verification signature
    paidAt?: Date;
  };
  orderStatus: 'Pending' | 'Confirmed' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  cancellationReason?: string;
  statusHistory: Array<{
    status: string;
    timestamp: Date;
    note?: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}
```
**Database Indexes:**
- Unique Index: `{ orderNumber: 1 }`
- Compound Index for Tracking Lookup: `{ orderNumber: 1, "customer.phone": 1 }`
- Index: `{ orderStatus: 1, createdAt: -1 }` (for Admin Dashboard listing)

#### 3. Admin User Model (`admins` collection)
```typescript
interface IAdminUser {
  _id: mongoose.Types.ObjectId;
  username: string;          // Required, unique, trimmed, lowercase
  email: string;             // Required, unique, trimmed, lowercase
  passwordHash: string;      // Salted bcrypt hash (12 rounds)
  role: 'OWNER';             // Role-based access control
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 5. Authentication, Authorization & Security Architecture

### 5.1 Admin Authentication Flow
1. **Login Request:** Owner posts credentials to `/api/admin/login`.
2. **Credential Verification:** Server retrieves admin record from DB and executes `bcrypt.compare(inputPassword, admin.passwordHash)`.
3. **Session Token Issuance:** Server generates a signed JWT payload `{ sub: admin._id, username: admin.username, role: 'OWNER' }` signed with `process.env.JWT_SECRET` (24-hour expiration).
4. **Secure Cookie:** Token is stored in a cookie with strict attributes:
   - `HttpOnly: true` (inaccessible to JavaScript; prevents XSS theft).
   - `Secure: true` (transmitted strictly over HTTPS in production).
   - `SameSite: 'Strict'` (prevents Cross-Site Request Forgery - CSRF).
   - `Path: '/'`.
5. **Route Protection (Middleware):** Next.js Edge Middleware inspects requests matching `/admin/:path*` (except `/admin/login`) and `/api/admin/:path*` (except `/api/admin/login`). If the session cookie is missing or invalid, browser routes redirect to `/admin/login`, and API requests return `401 Unauthorized`.

### 5.2 Protection of Customer Order Data & Privacy
- **No Predictable Public URLs:** Orders are not accessible by merely changing an ID in the URL.
- **Dual-Credential Verification:** The order status API endpoint (`/api/orders/track`) strictly requires both the `orderNumber` and matching `phone` number. If the phone does not match, the system responds with a generic `404 Order Not Found` to prevent timing or enumeration attacks.
- **Address Masking:** When displaying order status publicly, sensitive street numbers and recipient details are masked.
- **Data Minimization:** Customer information is stored strictly for order fulfillment and never shared with third-party tracking scripts.

### 5.3 Input Validation & Rate Limiting
- **Server Input Sanitization:** All string inputs are trimmed and stripped of dangerous HTML/script tags.
- **Rate Limiting Plan:**
  - `/api/admin/login`: Maximum 5 failed attempts per IP per 15 minutes.
  - `/api/orders`: Maximum 10 order creation requests per IP per hour.
  - `/api/orders/track`: Maximum 20 status lookups per IP per 10 minutes to prevent brute-forcing order IDs.

### 5.4 Safe Error Handling
- Server errors must log detailed stack traces to server logs only.
- Client responses must return standardized, polite, opaque error JSON:
```json
{
  "success": false,
  "error": "Unable to process your order at this moment. Please check your delivery details or contact our shop directly."
}
```

---

## 6. Payment Architecture (COD & Future Online Gateway)

```mermaid
sequenceDiagram
    autonumber
    actor C as Customer
    participant FE as Frontend
    participant BE as Next.js API Server
    participant DB as MongoDB
    participant PG as Payment Gateway (Phase 5)

    Note over C,DB: Phase 1-4: Cash on Delivery (COD) Flow
    C->>FE: Selects COD & Submits Order
    FE->>BE: POST /api/orders (cart items + address)
    BE->>BE: Server validates prices & zone
    BE->>DB: Save Order (status: Pending, payment: PENDING)
    BE-->>FE: Return orderNumber
    FE->>C: Display Order Success Screen

    Note over C,PG: Phase 5: Online Payment Flow
    C->>FE: Selects Online Payment & Clicks "Pay Now"
    FE->>BE: POST /api/payments/create-order
    BE->>BE: Recalculate true order total from DB
    BE->>PG: Create Gateway Order (amount, currency INR)
    PG-->>BE: Returns gatewayOrderId
    BE-->>FE: Returns gatewayOrderId & publicKey
    FE->>PG: Opens Gateway Secure Checkout Modal
    C->>PG: Pays via UPI / Card / NetBanking
    PG-->>FE: Returns paymentId & signature
    FE->>BE: POST /api/payments/verify (signature payload)
    BE->>BE: Validate HMAC signature with private secret
    BE->>DB: Update Order (status: Confirmed, payment: PAID)
    BE-->>FE: Verification Successful
    FE->>C: Display Order Success Screen
```

### 6.1 Critical Payment Security Rules
1. **Zero Client Trust:** Never trust payment amounts or success flags sent by the browser. Only cryptographic signatures verified on the server or direct webhooks are authoritative.
2. **No Card Data Storage:** The website will never collect, process, or store raw 16-digit credit/debit card numbers or CVVs. All card inputs take place within the payment gateway's PCI-DSS Level 1 compliant hosted modal.
3. **Idempotency Protection:** Payment webhooks and verification endpoints must be idempotent; receiving duplicate webhook notifications for the same transaction must not create duplicate orders or credit multiple times.
4. **Sandbox-First Mandate:** Real customer transactions will not be processed until end-to-end flows pass in the gateway sandbox/test environment.

---

## 7. Order Management, Pricing & Delivery Logic

### 7.1 Server-Side Price Verification Algorithm
The server enforces a strict pricing algorithm:

$$\text{Line Total} = \text{Authoritative DB Option Price} \times \text{Quantity}$$
$$\text{Order Subtotal} = \sum_{i=1}^{n} \text{Line Total}_i$$
$$\text{Delivery Fee} = \begin{cases} 0 & \text{if Subtotal} \ge \text{Threshold} \\ \text{Standard Delivery Fee} & \text{otherwise} \end{cases}$$
$$\text{Total Amount} = \text{Order Subtotal} + \text{Delivery Fee}$$

Any price submitted by the browser is discarded and recalculated on the server.

### 7.2 Delivery Zone Validation
- Customer's 6-digit PIN code is checked against the configured zone list (`SHOP_ALLOWED_PINCODES`).
- If the PIN code is not found, the order creation returns a descriptive error:
  `"Delivery is currently available only in selected local PIN codes. Please verify your address."`

### 7.3 Order Lifecycle State Machine
```
[ Pending ] -----------> [ Confirmed ] -----------> [ Preparing ]
     |                         |                          |
     v                         v                          v
[ Cancelled ]            [ Cancelled ]           [ Out for Delivery ]
                                                          |
                                                          v
                                                    [ Delivered ]
```

---

## 8. Configuration & Environment Variables

All sensitive values must reside in `.env.local` during development and within hosting platform secret managers in production.

### Planned Environment Variables

| Variable Key | Type | Description | Sample / Default |
| :--- | :--- | :--- | :--- |
| `MONGODB_URI` | Secret | Connection string for MongoDB Atlas / local database. | `mongodb+srv://user:pass@cluster.mongodb.net/sangita_mithai` |
| `NEXT_PUBLIC_APP_URL` | Public | Base URL for metadata and canonical links. | `http://localhost:3000` (Dev) / `https://sangitamithai.com` (Prod) |
| `JWT_SECRET` | Secret | 64-character secret key for signing admin session tokens. | Secure randomly generated string |
| `ADMIN_EMAIL` | Config | Initial email address for shop owner account. | `admin@sangitamithai.com` |
| `ADMIN_PASSWORD` | Secret | Initial seed password (hashed immediately in DB). | Strong passphrase |
| `SHOP_DELIVERY_CITY` | Config | Name of local city for delivery validation. | *To be decided by owner* |
| `SHOP_ALLOWED_PINCODES`| Config | Comma-separated list of approved 6-digit PIN codes. | *To be decided by owner* |
| `SHOP_DELIVERY_FEE` | Config | Standard delivery charge in INR. | `40` (Placeholder, *To be decided*) |
| `SHOP_FREE_DELIVERY_THRESHOLD` | Config | Minimum subtotal for free delivery in INR. | `500` (Placeholder, *To be decided*) |
| `SHOP_MIN_ORDER_AMOUNT`| Config | Minimum order subtotal required to checkout. | `150` (Placeholder, *To be decided*) |
| `PAYMENT_GATEWAY_PROVIDER` | Config | Chosen digital gateway provider. | `RAZORPAY` (*To be decided*) |
| `PAYMENT_GATEWAY_KEY_ID` | Public/Config | Public API key for gateway client modal. | *To be decided in Phase 5* |
| `PAYMENT_GATEWAY_KEY_SECRET` | Secret | Private secret key for HMAC signature verification. | *To be decided in Phase 5* |
| `PAYMENT_GATEWAY_WEBHOOK_SECRET` | Secret | Secret for authenticating incoming webhooks. | *To be decided in Phase 5* |

---

## 9. Testing Strategy & Quality Assurance Plan

### 9.1 Test Categories & Scope

| Category | Target Scenarios | Verification Method |
| :--- | :--- | :--- |
| **Responsive UI** | Mobile (360px, 390px, 412px), Tablet (768px, 820px), Desktop (1024px, 1440px). | Visual regression and viewport audits; ensure no horizontal scrollbars. |
| **Form Validation** | Invalid phone numbers (`12345`), empty addresses, invalid 5-digit PIN codes. | Client-side feedback tests and server-side HTTP 400 rejection tests. |
| **Cart & Pricing** | Changing portion options, incrementing/decrementing quantities, removing items, subtotal math. | Unit tests for calculation utilities and UI cart tests. |
| **COD Ordering** | Complete checkout flow with valid details under Cash on Delivery. | End-to-end order placement test; verify order appears in DB as `Pending`. |
| **Payment Sandbox** | Successful payments, cancelled transactions, network timeouts, signature verification. | Gateway mock/sandbox testing with test cards and simulated UPI handles. |
| **Admin Security** | Accessing `/admin` without cookie; expired JWT; brute force attempts. | Middleware boundary tests; verify redirect to `/admin/login`. |
| **Order Privacy** | Attempting to track order with invalid phone number; brute forcing order IDs. | Security testing; verify access is strictly denied. |

---

## 10. Deployment & Production Readiness Plan

### 10.1 Production Hosting Requirements
- **Runtime Support:** Modern Node.js 18+ or 20+ runtime capable of executing Next.js 16 App Router SSR, Server Components, and API Route Handlers.
- **HTTPS Enforcement:** Mandatory TLS/SSL certificate (HTTPS) for encrypted transmission of checkout data and Secure session cookies.
- **Hosting Options (To be decided):**
  - *Option A (Vercel):* Native Next.js serverless deployment with automated CI/CD and edge caching.
  - *Option B (Containerized VPS / Cloud):* Docker container on AWS / DigitalOcean with Nginx reverse proxy.
  *(Final hosting provider will be confirmed with the owner in Phase 6).*

### 10.2 Database Deployment & Backups
- **Managed Database Service:** MongoDB Atlas (M0 Free tier for staging, M10+ for production).
- **Network Security:** IP Access List restricted to hosting environment CIDR blocks or secure VPC peering.
- **Automated Backups:** Daily automated snapshots with 7-day retention and Point-in-Time Recovery (PITR).

---

## 11. Implementation Phases & Separation of Concerns

Implementation will proceed sequentially through six clearly delineated phases:

```
[ Phase 1: Planning & Architecture ]  <-- (Current Phase: Specifications & Approvals)
           ↓
[ Phase 2: UI/UX Design System Foundation ]
  - CSS tokens, typography, atomic components (Buttons, Inputs, Badges)
           ↓
[ Phase 3: Storefront Frontend Implementation ]
  - 10 pages, 13 core sweets catalog, client-side cart, static checkout flow
           ↓
[ Phase 4: Database & Admin Backend ]
  - MongoDB connection, Mongoose schemas, seed script, Admin authentication, Order management
           ↓
[ Phase 5: Real Orders, Validation & Payments ]
  - Server price recalculation, PIN delivery zone check, COD pipeline, Payment Gateway integration
           ↓
[ Phase 6: Testing, Hardening & Deployment ]
  - Cross-device QA, security audit, replacement of owner details, production launch
```

---

## 12. Unresolved Technical Decisions (Marked as To Be Decided — TBD)

The following operational and technical parameters require confirmation from the shop owner before implementation in Phase 4 and Phase 5:

1. **Delivery Zone & PIN Codes:**
   - Exact operating city and list of valid 6-digit delivery PIN codes (*Status: TBD*).
2. **Delivery Fee Policy:**
   - Standard delivery fee amount and minimum order threshold for free delivery (*Status: TBD*).
3. **Minimum Order Value:**
   - Minimum cart total required before checkout is allowed (*Status: TBD*).
4. **Online Payment Gateway Provider:**
   - Selection between Razorpay, Cashfree, or PhonePe, or launching with COD only in initial release (*Status: TBD*).
5. **Customer Notification Service:**
   - Whether SMS or WhatsApp notifications (e.g., Twilio / Gupshup / Fast2SMS) should be integrated for order tracking (*Status: TBD*).
6. **Production Hosting Platform:**
   - Final choice between Vercel, Node.js VPS, or AWS (*Status: TBD*).
7. **Shop Physical Address & Contact Number:**
   - Actual street address, telephone, and WhatsApp support contact (*Status: TBD*).
