# Sangita Mithai (संगीता मिठाई) — Online Indian Sweets Shop

> **Current Status: PHASE 1 — PLANNING & ARCHITECTURE ONLY**  
> ⚠️ **Important Notice:** No application implementation or coding has started. All active work is strictly confined to architectural planning and technical specifications. We are awaiting the shop owner's explicit review and approval before beginning Phase 2 (UI/UX Design).

---

## 1. Project Purpose & Vision

**Sangita Mithai** is an online e-commerce storefront and order management platform designed for an authentic Indian sweet shop. The application enables local customers to:
- Browse a curated catalog of 13 handcrafted Indian sweets (*mithai*).
- Select custom portions (by weight such as 250g/500g/1kg, by pieces, or festive gift boxes).
- Manage a shopping cart with real-time price updates.
- Place orders for local doorstep delivery with Cash on Delivery (COD) or future online payment.
- Track their order status securely using their Order Reference ID and phone number.

The platform also includes a secure, password-protected **Admin Dashboard** allowing the shop owner to update sweet prices, toggle product availability, view customer orders, and manage order fulfillment stages.

---

## 2. Planned Technology Stack

The project is architected using modern, battle-tested technologies designed for speed, security, and developer clarity:

- **Frontend & Server Framework:** [Next.js](https://nextjs.org) (App Router) — Provides fast server-side rendering, SEO readiness, and optimized image delivery.
- **UI Library:** [React](https://react.js.org) — Powers reusable product cards, interactive quantity selectors, and reactive shopping carts.
- **Language:** [TypeScript](https://www.typescriptlang.org) — Ensures type safety across product models, order statuses, and checkout data.
- **Styling:** Custom Vanilla CSS & CSS Modules — Built with a royal Indian color palette (Deep Vermilion Red, Saffron Gold, Warm Cream) without unnecessary framework bloat.
- **Database:** [MongoDB](https://www.mongodb.com) with [Mongoose](https://mongoosejs.com) — Handles flexible product catalogs, portion tiers, and order records.
- **Icons:** [Lucide React](https://lucide.dev) — Clean, modern iconography for carts, badges, and delivery status trackers.
- **Environment Configuration:** Secure `.env.local` configuration for database URIs and authentication secrets.

---

## 3. Project Documentation Index

All architectural and planning deliverables are organized in the following documents:

| Document | Purpose & Summary |
| :--- | :--- |
| 📋 [**PROJECT-PLAN.md**](file:///c:/Users/DELL/OneDrive/Documents/sangita%20mithai/PROJECT-PLAN.md) | High-level roadmap, business goals, target personas, scope, 13 core sweets catalog, and risk mitigations. |
| 📄 [**PRD.md**](file:///c:/Users/DELL/OneDrive/Documents/sangita%20mithai/PRD.md) | Product Requirements Document detailing functional requirements (`FR-001+`), non-functional requirements (`NFR-001+`), page-by-page specifications, and acceptance criteria. |
| 🏗️ [**TECHNICAL-PLAN.md**](file:///c:/Users/DELL/OneDrive/Documents/sangita%20mithai/TECHNICAL-PLAN.md) | Technical architecture, data schemas (Product, Order, Admin), server-side price validation, authentication strategy, environment variables, and testing plan. |
| 🎨 [**DESIGN-PLAN.md**](file:///c:/Users/DELL/OneDrive/Documents/sangita%20mithai/DESIGN-PLAN.md) | UI/UX visual design system, royal Indian color palette, typography guidelines, product card anatomy, checkout layout, and sample image replacement guide. |
| ✅ [**TASKS.md**](file:///c:/Users/DELL/OneDrive/Documents/sangita%20mithai/TASKS.md) | Phased, actionable task matrix covering Phases 1 through 6 with dependencies, priority ratings, and completion criteria. |

---

## 4. Current Development Phase

```
[ Phase 1: Planning & Docs ]  <-- (WE ARE HERE: Complete & Awaiting Owner Approval)
            ↓
[ Phase 2: UI/UX Design System ]
            ↓
[ Phase 3: Main Storefront Pages ]
            ↓
[ Phase 4: Database & Admin Portal ]
            ↓
[ Phase 5: Real Orders & Payments ]
            ↓
[ Phase 6: Testing & Launch ]
```

- **Phase 1 (Current):** Complete. All architectural specifications and requirements have been documented.
- **Phase 2–6 (Implementation):** Strictly **NOT STARTED**. Will commence only upon explicit user/owner instruction.

---

## 5. Decisions Needed from the Shop Owner

Before proceeding to Phase 4 and Phase 5 implementation, the shop owner will need to provide the following operational decisions:

1. **Physical Shop Information:**
   - Exact shop street address, city, and state for the Contact page and receipts.
   - Primary customer support phone number and WhatsApp number.
2. **Delivery Operations & Boundaries:**
   - Operating city and list of eligible 6-digit delivery PIN codes.
   - Delivery fee policy (e.g., flat ₹40 delivery fee, or free delivery for orders above ₹500).
   - Minimum order amount (e.g., ₹150 or ₹200).
3. **Product Catalog Customization:**
   - Final prices and available portion sizes (250g, 500g, 1kg, or pieces) for each of the 13 sweets.
   - High-resolution photographs of actual shop sweets (replaceable sample images are used initially).
4. **Online Payment Gateway Selection:**
   - Preferred digital payment gateway for Phase 5 (e.g., Razorpay, PhonePe, Cashfree) or if initial launch should be Cash on Delivery (COD) only.
   - Availability of business bank account / GSTIN for payment gateway merchant registration.
