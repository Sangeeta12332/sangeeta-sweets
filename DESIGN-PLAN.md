# Sangita Mithai — UI/UX & Visual Design Plan

**Document Version:** 1.0.0  
**Status:** Approved for Review (Phase 1: Planning Only)  
**Author:** UI/UX Planner & Design Systems Lead  

---

## 1. Design Vision & Aesthetic Direction

### 1.1 The Concept: "Royal Indian Sweet Emporium"
The visual identity of **Sangita Mithai** merges the majestic heritage of royal Indian confectioneries with the clean, effortless usability of modern e-commerce.

- **Warmth & Hospitality:** Evokes the feeling of walking into an authentic sweet shop filled with the aroma of fresh cardamom, saffron, and pure desi cow ghee.
- **Festive Elegance:** Subtle gold foils, warm amber glows, and deep royal vermilion create an aura of celebration, gifting, and auspicious sweetness (*mithas*).
- **Simplicity & Clarity:** Never cluttered. High-resolution imagery, generous whitespace, legible price tags, and intuitive touch controls allow even first-time online shoppers to place orders with ease.

---

## 2. Brand Color Palette & Design Tokens

A carefully curated palette inspired by the culinary art of Indian sweet-making:

| Color Name | CSS Token | Hex Value | Psychological & Cultural Purpose |
| :--- | :--- | :--- | :--- |
| **Royal Vermilion (Deep Red)** | `--color-brand-primary` | `#991B1B` | Signifies celebration, warmth, and appetite; used for primary buttons and banners. |
| **Saffron Gold (Deep Orange)** | `--color-brand-secondary`| `#D97706` | Evokes Kashmiri kesar, auspiciousness, and festival lights; used for accents and ribbons. |
| **Warm Ghee Cream** | `--color-surface-light` | `#FFFDF7` | Soft, creamy background reminiscent of milk solids (*rabdi*); gentle on the eyes. |
| **Royal Cardamom Gold** | `--color-accent-gold` | `#F59E0B` | Used for gold borders, rating stars, and festive badges. |
| **Pure Vegetarian Green** | `--color-veg-indicator` | `#15803D` | The universal Indian green dot & square emblem signifying 100% vegetarian purity. |
| **Charcoal Espresso** | `--color-text-main` | `#1E1E24` | High-contrast, soft-black text for effortless readability. |
| **Cardamom Ash (Muted)** | `--color-text-muted` | `#64748B` | Secondary text for weights, ingredients, and delivery estimates. |

### 2.1 CSS Variables Foundation (Planned)
```css
:root {
  /* Brand Core Colors */
  --color-primary: #991b1b;
  --color-primary-hover: #7f1d1d;
  --color-secondary: #d97706;
  --color-secondary-hover: #b45309;
  
  /* Background Surfaces */
  --bg-cream: #fffdf7;
  --bg-card: #ffffff;
  --bg-subtle: #fef3c7;
  
  /* Text & Borders */
  --text-dark: #1e1e24;
  --text-muted: #64748b;
  --border-light: #f1e5d1;
  --border-gold: #f59e0b;
  
  /* Shadows & Elevations */
  --shadow-card: 0 4px 16px -2px rgba(153, 27, 27, 0.08);
  --shadow-hover: 0 10px 25px -4px rgba(153, 27, 27, 0.16);
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;
}
```

---

## 3. Typography Direction

The typography balances royal character with high-legibility digital readability:

1. **Display & Heading Font:** `'Cinzel'` or `'Playfair Display'` (via Google Fonts)
   - *Use:* Main brand headline, festive banner titles, and category section titles.
   - *Feel:* Regal, classical, and celebratory.
2. **Body & UI Font:** `'Outfit'` or `'Inter'` (via Google Fonts)
   - *Use:* Product names, prices, ingredients, forms, buttons, and navigation links.
   - *Feel:* Clean, modern, highly legible at small sizes on mobile devices.
3. **Numerals & Pricing:** Clear bold weights for rupee amounts (e.g., **₹320**) to prevent pricing confusion.

---

## 4. Navigation Structure & Header Layout

```
+-----------------------------------------------------------------------------------------+
| [Top Announcement Bar]: 🚚 Fresh Sweet Delivery within City Limits | Call/WhatsApp: [Phone] |
+-----------------------------------------------------------------------------------------+
| [Logo: Sangita Mithai]     [Shop]  [About Us]  [Contact]          [🔍 Search] [🛒 Cart (3)] |
+-----------------------------------------------------------------------------------------+
```

### 4.1 Header Elements (Desktop)
- **Top Announcement Bar:** Saffron banner with delivery reminder and shop contact info.
- **Brand Logo:** Distinctive typographical mark with traditional gold leaf or diya accent.
- **Main Nav Links:** Home, Sweets / Shop, About Us, Contact Us.
- **Utility Actions:**
  - Search trigger (quick modal or expander).
  - Floating Cart Pill with item counter badge (e.g., `3 items - ₹680`).

### 4.2 Mobile Bottom Navigation Bar (Thumb-Friendly)
On mobile smartphones (< 768px), the header is streamlined, and a persistent bottom sticky bar is provided:
- **Home** (Icon)
- **Menu / Shop** (Icon)
- **Cart** (Icon with floating counter)
- **Track Order** (Icon)

---

## 5. Product Card Design (The Heart of the Shop)

The product card is engineered to drive appetite and make portion selection effortless:

```
+----------------------------------------------------------+
|  [🌿 100% Veg]                       [⭐ Bestseller Ribbon]  |
|                                                          |
|                  [ High-Quality Photo ]                  |
|                 (Glistening Kaju Katli)                  |
|                                                          |
|----------------------------------------------------------|
|  Kaju Katli                                              |
|  Pure cashew fudge finished with pure silver leaf.       |
|                                                          |
|  Portion:  [ (250g) ]  [ 500g ]  [ 1kg ]                 |
|                                                          |
|  ₹320  <span class="mrp">₹350</span>                     |
|                                  [ + Add to Cart ]       |
+----------------------------------------------------------+
```

### 5.1 Card Anatomy
1. **Badges:** Pure Veg green square symbol in top-left; optional gold "Bestseller" or "Festive Special" ribbon in top-right.
2. **Photo Frame:** 1:1 square aspect ratio with subtle zoom on mouse hover.
3. **Product Title:** Bold, appetizing sweet name.
4. **Interactive Portion Selector:** Radio-style pill buttons (e.g., `250g`, `500g`, `1kg`). Tapping a pill instantly updates the price tag below.
5. **Clear Price Display:** Prominent rupee price in deep vermilion font.
6. **"Add to Cart" Action:** Full-width or prominent right-aligned button with a gentle bounce micro-animation upon clicking.

---

## 6. Forms & Checkout Layout

### 6.1 Two-Column Desktop / Single-Column Mobile
- **Left Column (Delivery Address & Contact):**
  - Full Name
  - Mobile Number (+91 prefix pre-filled)
  - House / Flat / Street Address
  - PIN Code (shows instant verification green checkmark when valid)
  - Delivery Notes ("Ring bell twice", "Deliver after 5 PM")
- **Right Column (Order Summary & Payment):**
  - Sticky list of items, chosen portions, and prices.
  - Price Summary:
    - Item Subtotal: ₹780
    - Local Delivery Charge: ₹40 (or *FREE* for orders over ₹500)
    - **Total Payable: ₹820**
  - Payment Selector:
    - 🔘 **Cash on Delivery (COD)** (selected by default)
    - 🔘 **Online Payment (Cards / UPI)** (annotated as Phase 5 / Coming Soon)
  - Prominent Gold CTA Button: **"Confirm & Place Order"**

---

## 7. State Management (UI States)

Every interactive section is designed with four clear emotional states:

| UI State | Visual Treatment & Behavior |
| :--- | :--- |
| **Loading State** | Soft shimmering skeleton placeholders shaped like product cards to eliminate layout shifts. |
| **Empty Cart State** | Warm illustration of an empty festive brass sweet thali with the message: *"Your sweet box is empty! Add some fresh ladoos or kaju katli."* and a direct *"Shop Sweets"* button. |
| **Success State** | Auspicious confetti, festive golden border, large green checkmark, and a warm *"Dhanyavaad! Your order is being prepared with pure desi ghee."* |
| **Error State** | Polite banner in soft rose red (`#FEE2E2`) with clear guidance (e.g., *"Please enter a valid 10-digit mobile number so our delivery rider can contact you."*). |

---

## 8. Accessibility Requirements (A11y)

1. **Color Contrast:** All body text meets WCAG AA standards (4.5:1 ratio against warm cream backgrounds).
2. **Keyboard Navigation:**
   - Portion selection pills can be toggled using arrow keys.
   - Modals and carts close gracefully when pressing the `Escape` key.
3. **Screen Readers:**
   - Every product image includes meaningful descriptive alt text (e.g., *"Fresh diamond-cut Kaju Katli with silver leaf"*).
   - Price updates announce the new amount to assistive devices via `aria-live="polite"`.

---

## 9. Guidance for Replaceable Sample Images

During Phase 2 & 3, the website will use high-resolution placeholder photographs representing authentic Indian sweets.

### Image Storage & Replacement Standards:
- All photos are stored under `/public/images/` with clean naming conventions:
  - `kaju-katli.webp`
  - `gulab-jamun.webp`
  - `rasgulla.webp`
  - `rasmalai.webp`
  - `motichoor-ladoo.webp`
  - `besan-ladoo.webp`
  - `milk-cake.webp`
  - `peda.webp`
  - `barfi.webp`
  - `soan-papdi.webp`
  - `jalebi.webp`
  - `dry-fruit-mithai.webp`
  - `gift-box.webp`
  - `hero-festive.webp`
- **Owner Photographic Replacement Guide:**
  - Recommended dimensions: **800 x 800 pixels** (square) for products; **1600 x 600 pixels** for hero banners.
  - Recommended lighting: Warm daylight highlighting texture, syrup shine, and dry fruit garnishes.
  - Image format: Modern WebP format under 150 KB for instant mobile loading.
  - The shop owner can simply upload their real sweet photographs using the Admin Dashboard or replace files in the folder with identical filenames without touching any code.
