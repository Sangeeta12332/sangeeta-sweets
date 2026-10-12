# Sangita Mithai — Product Requirements Document (PRD)

**Document Version:** 1.0.0  
**Status:** Approved for Review (Phase 1: Planning Only)  
**Author:** Senior Product Manager & Software Architect  

---

## 1. Document Purpose & Beginner's Guide

This document defines what the **Sangita Mithai** website must do, how it must behave for customers and the shop owner, and the quality standards it must meet.

### 💡 Beginner's Terminology Guide
To make this document easy to understand for non-technical readers, here are simple definitions for common technical terms used below:
- **Client-Side (Frontend):** Everything that runs inside the user's web browser (the visual design, buttons, animations, and immediate click responses).
- **Server-Side (Backend):** The secure computer programs running behind the scenes that talk to the database, verify prices, and send emails/notifications.
- **Database:** A digital filing cabinet (here, MongoDB) that permanently stores product lists, customer orders, and shop settings.
- **Local Storage:** A small storage locker inside the customer's web browser that remembers what they put in their shopping cart even if they refresh the page.
- **PIN Code (Postal Index Number):** The 6-digit postal code used across India to identify delivery post offices and areas.
- **COD (Cash on Delivery):** Payment mode where the customer pays cash directly to the delivery person upon arrival.
- **Authentication:** Verifying who a user is (e.g., logging in with an owner password).
- **Authorization:** Checking what a logged-in user is allowed to do (e.g., only the owner can delete sweets or see customer addresses).

---

## 2. Functional Requirements (FR)

Every feature requirement is given a unique reference code (`FR-XXX`).

### 2.1 Product Catalog & Browsing
- **FR-CAT-001 (13 Core Sweets):** The system must display the 13 core sweets: *Kaju Katli, Gulab Jamun, Rasgulla, Rasmalai, Motichoor Ladoo, Besan Ladoo, Milk Cake, Peda, Barfi, Soan Papdi, Jalebi, Dry Fruit Mithai, and Mithai Gift Boxes*.
- **FR-CAT-002 (Categorization):** Sweets must be organized into logical categories:
  - Milk Sweets
  - Bengali Sweets
  - Dry Fruit Sweets
  - Traditional Mithai
  - Gift Boxes
- **FR-CAT-003 (Search Functionality):** Customers must be able to search for sweets by typing any part of the sweet name (e.g., typing *"ladoo"* shows both Motichoor and Besan Ladoo).
- **FR-CAT-004 (Visual Presentation):** Each sweet must show a high-quality product photo, name, short description, category badge, and starting price.
- **FR-CAT-005 (Availability Indicator):** Products marked as "Out of Stock" must visibly show a badge and disable the "Add to Cart" button.

### 2.2 Quantity and Flexible Pricing Rules
- **FR-QTY-001 (Multi-Unit Model):** Different sweets must support different selling methods:
  - **Weight-based:** 250 g, 500 g, 1 kg.
  - **Piece-based:** e.g., 4 pieces, 8 pieces, 16 pieces (used for syrup sweets like Rasmalai and Gulab Jamun).
  - **Box-based:** e.g., 500 g Festive Box, 1 kg Royal Hamper.
- **FR-QTY-002 (Product-Specific Customization):** The owner can specify which quantity types and price tiers apply to each sweet individually (e.g., Rasgulla can sell by 500g / 1kg containers, while Kaju Katli sells by 250g, 500g, 1kg).
- **FR-QTY-003 (Dynamic Price Calculation):** When a customer clicks a different portion option on the product card or details page, the displayed price must update instantly.
- **FR-QTY-004 (Server-Side Price Validation):** When submitting an order, the server must calculate totals using prices stored in the database, never trusting price values submitted from the user's browser.

### 2.3 Shopping Cart System
- **FR-CRT-001 (Add to Cart):** Customers can add any available sweet with their selected quantity option to the shopping cart.
- **FR-CRT-002 (Quantity Modification):** Customers can increase or decrease the item count directly inside the cart (from 1 to 20 units).
- **FR-CRT-003 (Item Removal):** Customers can remove individual items from the cart with a single click.
- **FR-CRT-004 (Real-Time Subtotal):** The cart must instantly recalculate and display the subtotal, estimated delivery fee, and grand total.
- **FR-CRT-005 (Cart Persistence):** Cart contents must be preserved in the browser's local storage so items remain if the customer refreshes the page or returns later.

### 2.4 Checkout & Delivery Information
- **FR-CHK-001 (Customer Information Fields):** The checkout form must collect:
  1. Full Name (minimum 2 characters).
  2. Mobile Phone Number (10 digits, valid Indian mobile format).
  3. Street Address / House or Flat Number.
  4. Landmark (optional).
  5. City.
  6. PIN Code (strictly 6 digits).
  7. Special Delivery Instructions / Notes (optional, up to 200 characters).
- **FR-CHK-002 (Delivery Eligibility Check):** The system must check the entered PIN Code against the shop's supported delivery zone. If outside the zone, an informative alert must be displayed before order placement.
- **FR-CHK-003 (Payment Selection):** The checkout page must present payment options:
  - Option 1: Cash on Delivery (COD) - enabled at launch.
  - Option 2: Online Payment (UPI / Cards / Net Banking) - designated as "Coming Soon" or active in Phase 5.
- **FR-CHK-004 (Form Validation):** Incomplete or malformed phone numbers, empty addresses, or invalid PIN codes must highlight input fields with red helper messages.

### 2.5 Order Processing & Order Lifecycle
- **FR-ORD-001 (Order Reference ID):** Every created order must receive a unique, friendly identifier (e.g., `#SM-1042`).
- **FR-ORD-002 (Order Success Screen):** After placing an order, the customer must be directed to an order success screen showing their order number, delivery address summary, items ordered, total amount, and estimated preparation time.
- **FR-ORD-003 (Order Status Stages):** An order must progress through the following standardized statuses:
  1. `Pending` — Order received; waiting for shop owner confirmation.
  2. `Confirmed` — Shop owner accepted the order.
  3. `Preparing` — Kitchen is packing fresh sweets.
  4. `Out for Delivery` — Delivery rider is on the way.
  5. `Delivered` — Sweets handed over and payment collected.
  6. `Cancelled` — Order cancelled by shop or customer (with reason recorded).
- **FR-ORD-004 (Customer Order Tracking):** Customers must be able to view their order status on `/track-order` by entering:
  - Their Order Reference ID, AND
  - The 10-digit Phone Number used at checkout.
- **FR-ORD-005 (Customer Privacy Protection):** Under no circumstances may a user browse, view, or guess another customer's name, phone number, address, or sweets order.

### 2.6 Admin Dashboard & Management
- **FR-ADM-001 (Restricted Access):** `/admin` and all administrative actions must require authentication. Unauthenticated requests must redirect to `/admin/login`.
- **FR-ADM-002 (Product Management):** The shop owner can:
  - View all sweets in the catalog.
  - Edit sweet name, description, ingredients, and categories.
  - Update prices for each quantity tier (250g, 500g, 1kg, etc.).
  - Toggle sweet availability (*In Stock* vs. *Sold Out*).
- **FR-ADM-003 (Order Oversight):** The shop owner can:
  - View all active and past orders sorted by newest first.
  - Filter orders by status (`Pending`, `Preparing`, etc.).
  - Click into an order to see customer details, items, delivery notes, and payment mode.
- **FR-ADM-004 (Status Updating):** The owner can advance an order from `Pending` → `Confirmed` → `Preparing` → `Out for Delivery` → `Delivered` with one click.

---

## 3. Non-Functional Requirements (NFR)

### 3.1 Security & Privacy
- **NFR-SEC-001 (No Secrets in Code):** No passwords, database URIs, or API keys may be committed to code or sent to the browser. All secrets reside in `.env.local`.
- **NFR-SEC-002 (Authorization Check on APIs):** All admin API endpoints (`/api/admin/*`) must verify owner session cookies on the server before executing changes.
- **NFR-SEC-003 (Input Sanitization):** All checkout form fields must be cleaned and validated to prevent injection or malicious inputs.

### 3.2 Performance
- **NFR-PRF-001 (Fast Page Loads):** Pages must achieve First Contentful Paint (FCP) under 1.5 seconds on desktop and under 2.5 seconds on standard 4G mobile networks.
- **NFR-PRF-002 (Image Optimization):** Product photos must use modern formats (WebP/AVIF) with responsive image sizing to minimize mobile data consumption.

### 3.3 Usability & Mobile Responsiveness
- **NFR-RSP-001 (Mobile First Layout):** Because 70%+ of Indian food and sweets orders occur on smartphones, all navigation, cards, and forms must be fully thumb-friendly on screens as small as 360px wide.
- **NFR-RSP-002 (Touch Targets):** All buttons and interactive tabs must have a minimum clickable area of 44px x 44px.

### 3.4 Accessibility (A11y)
- **NFR-ACC-001 (Readable Contrast):** Text on colored backgrounds must adhere to WCAG 2.1 AA standards (minimum 4.5:1 contrast ratio for body text).
- **NFR-ACC-002 (Keyboard Friendly):** Every dropdown, quantity pill, and modal must be operable via keyboard (`Tab`, `Enter`, `Escape`).

---

## 4. Page-by-Page Detailed Requirements

| Page | Route | Key Features & Requirements |
| :--- | :--- | :--- |
| **Home Page** | `/` | Hero banner with warm Indian motif, "Order Sweets Now" CTA button, Featured Sweets carousel, Festive Gift Box highlight, Trust badges ("100% Pure Desi Ghee", "Fresh Daily", "Zero Preservatives"), Customer reviews. |
| **Shop Catalog** | `/shop` | Category tabs (All, Milk Sweets, Bengali Sweets, Dry Fruit, Traditional Mithai, Gift Boxes), search bar with live filtering, responsive 2 to 4-column product grid, quick portion selector, Add-to-Cart button. |
| **Product Details** | `/shop/[slug]` | High-res image gallery, sweet name, culinary description, ingredients list, shelf-life advice, portion size radio/buttons, real-time price display, quantity stepper (+/-), "Add to Cart" button. |
| **Cart** | `/cart` | List of added sweets with thumbnail, chosen portion (e.g., 500g), item price, quantity increment/decrement, remove item icon, pricing breakdown (Subtotal, Delivery Fee, Total), "Proceed to Checkout" button. Empty state with "Start Shopping" button. |
| **Checkout** | `/checkout` | 2-column desktop / 1-column mobile layout. Delivery address form with validation, PIN code zone check, COD / Online payment selection, order summary sidebar, "Place Order" button. |
| **Order Success** | `/order-success` | Auspicious festive greeting ("Dhanyavaad! Your order is placed"), Order reference ID, order summary, shop contact number for urgent assistance, link to "Track Order". |
| **Order Status** | `/track-order` | Verification lookup form (Order ID + Mobile Phone Number). Visual progress stepper: Received → Confirmed → In the Kitchen → On the Way → Delivered. Masked customer address for privacy. |
| **About Us** | `/about` | Story of Sangita Mithai, heritage recipes, promise of purity and hygiene, kitchen photo placeholders. |
| **Contact Us** | `/contact` | Shop address placeholder, Google Map embed placeholder, telephone number, WhatsApp quick chat link, opening hours (e.g., 9:00 AM – 9:30 PM), general inquiry form. |
| **Admin Login** | `/admin/login` | Secure login interface with email/username and password. Protected with rate limiting. |
| **Admin Dashboard** | `/admin` | Summary cards (Total Orders Today, Revenue Today, Pending Orders), order management table with status dropdown, sweet catalog editor with price and stock controls. |

---

## 5. Acceptance Criteria Checklist (By Feature)

### Catalog & Search
- [ ] Displays all 13 sweets accurately with photos, names, and starting prices.
- [ ] Clicking a category filters the catalog in under 200 milliseconds.
- [ ] Typing in the search bar updates product cards in real time.
- [ ] Out-of-stock items disable ordering and show a "Sold Out" badge.

### Quantity & Cart
- [ ] Switching between 250g, 500g, and 1kg updates the price immediately on screen.
- [ ] Adding an item updates the navbar cart badge counter.
- [ ] Cart retains its items across browser page refreshes.
- [ ] Deleting an item removes it from the subtotal calculation.

### Checkout & Order Creation
- [ ] Entering an invalid 5-digit PIN code prevents submission and prompts the user.
- [ ] Submitting a valid order with COD creates an order in the database and clears the cart.
- [ ] Customer is redirected to the Order Success page with their unique order ID.

### Security & Privacy
- [ ] Accessing `/admin` without logging in redirects to `/admin/login`.
- [ ] Accessing `/track-order` with an incorrect phone number rejects access to order details.
- [ ] No database passwords or private API keys appear in client JavaScript bundles.
