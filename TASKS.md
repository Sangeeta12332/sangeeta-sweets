# Sangita Mithai — Phased Implementation Tasks Checklist

**Document Version:** 1.0.0  
**Current Phase:** Phase 1 (Planning and Documentation)  
**Rule:** Implementation tasks (Phase 2 through 6) must remain **NOT STARTED** until explicit approval is received from the shop owner.

---

## Phase 1: Planning & Documentation (Current Phase)

| Task ID | Task Description | Dependencies | Priority | Status | Completion Criteria |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TASK-P1-01** | Inspect existing workspace, packages, and architecture without code changes. | None | High | **Completed** | Full inventory of existing Next.js and Mongoose dependencies recorded. |
| **TASK-P1-02** | Author `PROJECT-PLAN.md` covering vision, target personas, scope, 13-sweet catalog, and owner decisions. | TASK-P1-01 | High | **Completed** | Document created with clear business scope and open questions. |
| **TASK-P1-03** | Author `PRD.md` with requirements (FR-001+, NFR-001+), page specs, and acceptance criteria. | TASK-P1-02 | High | **Completed** | Detailed product requirements with unique IDs and beginner glossary. |
| **TASK-P1-04** | Author `TECHNICAL-PLAN.md` with Next.js/MongoDB architecture, data schemas, security, and payment plan. | TASK-P1-03 | High | **Completed** | Architecture diagram, data interfaces, and authentication strategy documented. |
| **TASK-P1-05** | Author `DESIGN-PLAN.md` with royal Indian sweets palette, card anatomy, checkout layout, and UI states. | TASK-P1-02 | High | **Completed** | Design tokens, typography guidelines, and image replacement rules established. |
| **TASK-P1-06** | Author `TASKS.md` with phased implementation checklist. | TASK-P1-04 | High | **Completed** | Phased task matrix created with dependencies and completion criteria. |
| **TASK-P1-07** | Author `README.md` linking all planning documents and recording current project status. | TASK-P1-06 | High | **Completed** | Project readme updated with document index and owner decision log. |
| **TASK-P1-08** | Review all documents for consistency and await owner approval. | TASK-P1-07 | Critical | **In Progress** | Owner explicitly reviews and approves the planning phase before code execution. |

---

## Phase 2: UI/UX Design System Foundation

*Status: NOT STARTED (Awaiting Owner Approval)*

| Task ID | Task Description | Dependencies | Priority | Status | Completion Criteria |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TASK-P2-01** | Define Global CSS tokens (`globals.css`) for royal vermilion, saffron gold, ghee cream, and fonts. | Phase 1 Approval | High | Not Started | Design tokens accessible across all components with WCAG-compliant contrast. |
| **TASK-P2-02** | Configure Google Fonts (`Cinzel` for royal headings, `Outfit` for body text). | TASK-P2-01 | Medium | Not Started | Fonts properly loaded and rendered without layout shifts. |
| **TASK-P2-03** | Build responsive Header and Navigation bar with mobile hamburger and cart pill. | TASK-P2-01 | High | Not Started | Responsive header operational on mobile (< 768px) and desktop (> 1024px). |
| **TASK-P2-04** | Build reusable Footer with traditional festive motifs, contact placeholders, and social links. | TASK-P2-01 | Low | Not Started | Clean footer displaying shop identity and legal disclaimers. |
| **TASK-P2-05** | Build base UI components: Buttons, Input Fields, Badges (Pure Veg, Bestseller), and Modals. | TASK-P2-01 | Medium | Not Started | Atomic UI components styled consistently with hover and focus states. |

---

## Phase 3: Main Website Storefront Pages

*Status: NOT STARTED (Awaiting Phase 2)*

| Task ID | Task Description | Dependencies | Priority | Status | Completion Criteria |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TASK-P3-01** | Implement Home Page (`/`) with festive hero banner, featured sweets carousel, and value propositions. | TASK-P2-03 | High | Not Started | Visually stunning homepage rendering sample sweets and clear CTAs. |
| **TASK-P3-02** | Implement Sweets / Shop Page (`/shop`) with category tabs (Milk, Bengali, Dry Fruit, Traditional, Gifts). | TASK-P2-05 | High | Not Started | Full 13-sweet catalog navigable with instant category filtering. |
| **TASK-P3-03** | Implement real-time catalog Search by sweet name. | TASK-P3-02 | Medium | Not Started | Search bar filters products dynamically without page reloading. |
| **TASK-P3-04** | Implement interactive Product Card with multi-portion selectors (250g, 500g, 1kg or pieces) and live price update. | TASK-P3-02 | High | Not Started | Switching portions dynamically updates the displayed price tag. |
| **TASK-P3-05** | Implement Product Details Page (`/shop/[slug]`) with image gallery, ingredients, and shelf-life notes. | TASK-P3-04 | Medium | Not Started | Deep-dive product page with full description and add-to-cart controls. |
| **TASK-P3-06** | Implement Cart State Context & Cart Page (`/cart`) with quantity increment/decrement, item removal, and subtotal. | TASK-P3-04 | High | Not Started | Cart persists across browser refreshes using `localStorage`. |
| **TASK-P3-07** | Implement Static Checkout Page (`/checkout`) with delivery address form and PIN code entry. | TASK-P3-06 | High | Not Started | Validates input formats (10-digit mobile, 6-digit PIN) on the client side. |
| **TASK-P3-08** | Implement Order Success Page (`/order-success`) with festive confirmation message and order summary. | TASK-P3-07 | Medium | Not Started | Success screen shows reference ID and next steps. |
| **TASK-P3-09** | Implement About Us Page (`/about`) and Contact Us Page (`/contact`). | TASK-P2-04 | Low | Not Started | Informational pages populated with clearly marked owner placeholders. |

---

## Phase 4: Database Models & Admin Management

*Status: NOT STARTED (Awaiting Phase 3)*

| Task ID | Task Description | Dependencies | Priority | Status | Completion Criteria |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TASK-P4-01** | Establish robust MongoDB connection helper with connection pooling and error resilience. | Phase 3 | High | Not Started | Server successfully connects to MongoDB using `MONGODB_URI`. |
| **TASK-P4-02** | Implement Mongoose schemas for `Product`, `Order`, and `AdminUser`. | TASK-P4-01 | High | Not Started | Schemas enforce validation, default values, and indexes. |
| **TASK-P4-03** | Create database seed script (`scripts/seed.mjs`) to populate all 13 sweets with default options and prices. | TASK-P4-02 | Medium | Not Started | Database seeds 13 core sweets reliably without duplicates. |
| **TASK-P4-04** | Implement Admin Authentication with password hashing (`bcrypt`) and secure HTTP-only session cookies. | TASK-P4-02 | Critical | Not Started | `/admin` routes reject unauthenticated requests and prevent unauthorized access. |
| **TASK-P4-05** | Build Admin Dashboard (`/admin`) displaying today's orders, revenue summary, and order status controls. | TASK-P4-04 | High | Not Started | Owner can update order status (Pending → Confirmed → Preparing → Out for Delivery → Delivered). |
| **TASK-P4-06** | Build Admin Product Manager to edit sweet prices, toggle in-stock / sold-out status, and add descriptions. | TASK-P4-04 | High | Not Started | Price and stock toggles save immediately to MongoDB. |

---

## Phase 5: Real Order Processing & Payments

*Status: NOT STARTED (Awaiting Phase 4)*

| Task ID | Task Description | Dependencies | Priority | Status | Completion Criteria |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TASK-P5-01** | Implement Server-Side Price Verification API (`/api/orders/create`) to protect against client tampering. | TASK-P4-02 | Critical | Not Started | Server recalculates totals from database before accepting any order. |
| **TASK-P5-02** | Implement Local Delivery Zone Validator (checking submitted PIN code against allowed list). | TASK-P5-01 | High | Not Started | Orders outside delivery zone are rejected with helpful messaging. |
| **TASK-P5-03** | Implement Cash on Delivery (COD) end-to-end flow with unique order number generation (`#SM-XXXX`). | TASK-P5-01 | High | Not Started | COD orders save to MongoDB with status `Pending` and trigger cart reset. |
| **TASK-P5-04** | Implement Customer Order Tracking Page (`/track-order`) with privacy verification (Order ID + Phone). | TASK-P5-03 | High | Not Started | Customers can view status progress without exposing other customer records. |
| **TASK-P5-05** | Prepare Online Payment Gateway Integration Architecture (Sandbox mode for Razorpay / Cashfree). | TASK-P5-01 | Medium | Not Started | Server-side signature verification and webhook handlers drafted for owner gateway activation. |

---

## Phase 6: Testing, Polish & Launch Preparation

*Status: NOT STARTED (Awaiting Phase 5)*

| Task ID | Task Description | Dependencies | Priority | Status | Completion Criteria |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TASK-P6-01** | Conduct cross-device responsive testing across mobile (360px–420px), tablet, and desktop. | Phase 5 | High | Not Started | Flawless rendering without horizontal overflow or overlapping text. |
| **TASK-P6-02** | Perform End-to-End ordering and cancellation audits. | TASK-P6-01 | Critical | Not Started | Full order lifecycle verified from browsing to delivery marking. |
| **TASK-P6-03** | Audit security: verify environment variables, test SQL/NoSQL injection prevention, and check rate limiting. | TASK-P6-02 | Critical | Not Started | Zero sensitive credentials exposed; admin routes fully fortified. |
| **TASK-P6-04** | Replace placeholder text with final shop owner details (address, phone, delivery PIN codes, prices). | Owner Inputs | High | Not Started | All placeholders replaced with authentic shop information. |
| **TASK-P6-05** | Production build optimization and deployment checklist execution. | TASK-P6-04 | High | Not Started | Production build compiles cleanly with zero TypeScript or lint errors. |
