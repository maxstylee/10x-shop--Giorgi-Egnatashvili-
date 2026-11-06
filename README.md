# 🛍️ 10x Tech Shop — Modern Electronics E-Commerce Storefront

A high-performance, responsive e-commerce web application built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **React Router v7**. The application connects to the **DummyJSON API** to deliver a seamless shopping experience for modern technology products, consumer gadgets, smartphones, laptops, and accessories.

---

## 🌐 Live Demo & Deployment

- **Live URL:** [Deploy on Vercel](#) *(Add your deployed Vercel/Netlify URL here)*
- **GitHub Repository:** [github.com/maxstylee/10x-shop--Giorgi-Egnatashvili-](https://github.com/maxstylee/10x-shop--Giorgi-Egnatashvili-)

> **Note on SPA Routing:** Direct navigation or refreshing sub-routes (e.g. `/products/5`, `/cart`, `/checkout`) is fully configured for production deployment via `vercel.json` and Netlify `_redirects` to eliminate `404 Not Found` errors.

---

## ✨ What We Offer to the User (Value Proposition & Features)

**10x Tech Shop** provides users with an intuitive, fast, and accessible digital shopping environment:

1. **Curated Tech Catalog (`/`):**
   - Categorized browsing: Smartphones, Laptops, Tablets, and Mobile Accessories.
   - Interactive category filter tabs with real-time API queries.
   - Comprehensive UI states: shimmer loading skeletons, graceful error banners with a "Retry" button, empty catalog fallback, and success cards.

2. **Detailed Product Experience (`/products/:id`):**
   - Interactive multi-image gallery with real-time thumbnail switching.
   - Live pricing calculation, discount percentages, and original MSRP strikethroughs.
   - Stock-aware quantity counter with boundary protection (cannot order less than 1 or exceed in-stock quantity).
   - "Add to Cart" button with instant visual feedback badge.
   - Safe 404 fallback (`NotFoundPage`) when querying non-existent product IDs.

3. **Persistent Cart Management (`/cart`):**
   - Global cart state preserved across sessions via `localStorage`.
   - Dynamic quantity adjustments (`+` / `-`), individual item removal, and one-click cart clearing.
   - Real-time subtotal, item counter badge in the navigation bar, and order summary.

4. **Seamless Authentication & Route Protection (`/login` & `/checkout`):**
   - Protected checkout route: guests attempting to visit `/checkout` are smoothly redirected to `/login` with location memory (`state={{ from: '/checkout' }}`).
   - Upon valid login, users are automatically returned to their intended checkout destination.
   - Controlled login form with robust field-level validation.

5. **Smooth Checkout & Order Confirmation (`/checkout`):**
   - Controlled shipping information form (Full Name, Phone, City, Address, Postal Code).
   - Pre-filled customer profile details for logged-in users.
   - Instant order processing generating a unique order tracking code (e.g., `ORD-XXXXXX`), clearing the cart, and presenting an accessible confirmation screen.

6. **Accessibility & Responsive Design (Mobile 375px to 4K):**
   - Pixel-perfect layout verified from 375px mobile screens to large desktop monitors with zero horizontal overflow.
   - Interactive micro-states: comprehensive `hover`, `focus-visible`, and `disabled` states across all inputs and buttons.
   - Semantic HTML5 landmark tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).

---

## 🛠️ Tech Stack & Architecture

- **Framework:** [React 19](https://react.dev/)
- **Language:** [TypeScript 5+ / Strict Mode](https://www.typescriptlang.org/)
- **Bundler & Tooling:** [Vite 8](https://vitejs.dev/) with `@tailwindcss/vite`
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing:** [React Router v7](https://reactrouter.com/) (BrowserRouter, Routes, Route, Outlet, NavLink, useNavigate, useParams, useLocation)
- **Data Source:** [DummyJSON API](https://dummyjson.com/)
- **State Architecture:** React Context API (`AuthContext`, `CartContext`) + Custom Hooks (`useAuth`, `useCart`)

---

## 🚀 Getting Started (How to Run Locally)

Follow these steps to clone, install, and run the project locally on your machine:

### 1. Prerequisites
Ensure you have **Node.js** (v18.0.0 or later) and **npm** installed:
```bash
node -v
npm -v
```

### 2. Clone the Repository
```bash
git clone https://github.com/maxstylee/10x-shop--Giorgi-Egnatashvili-.git
cd 10x-shop--Giorgi-Egnatashvili-
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start Development Server
```bash
npm run dev
```
Open your browser and navigate to the local server URL (typically `http://localhost:5173/`).

### 5. Run Type Checking
Verify strict TypeScript types without emitting files:
```bash
npm run typecheck
```

### 6. Build for Production
Generate the optimized production bundle in the `dist/` directory:
```bash
npm run build
```

### 7. Preview Production Build
```bash
npm run preview
```

---

## 📁 Project Structure

```text
10x-shop/
├── public/
│   ├── _redirects             # Netlify SPA redirect rules
│   └── favicon.svg
├── src/
│   ├── api/
│   │   └── products.ts        # DummyJSON client methods & category constants
│   ├── components/
│   │   ├── Header.tsx         # Sticky banner, brand logo & active NavLinks
│   │   ├── Footer.tsx         # Footer landmarks & secondary links
│   │   ├── ProductCard.tsx    # Responsive product card with compact CTA
│   │   ├── ProductSkeleton.tsx# Loading shimmer placeholder
│   │   └── ScrollToTop.tsx    # Route change window scroll reset
│   ├── context/
│   │   ├── AuthProvider.tsx   # User session provider & localStorage persistence
│   │   ├── authContext.ts     # Auth context definitions
│   │   ├── CartProvider.tsx   # Shopping cart provider & localStorage sync
│   │   └── cartContext.ts     # Cart context definitions
│   ├── hooks/
│   │   ├── useAuth.ts         # Hook consumer for AuthContext
│   │   └── useCart.ts         # Hook consumer for CartContext
│   ├── layouts/
│   │   └── MainLayout.tsx     # Shell layout embedding <Outlet />
│   ├── pages/
│   │   ├── HomePage.tsx       # Tech catalog with category tabs & 4 UI states
│   │   ├── ProductDetailPage.tsx # Image gallery, quantity selector & add-to-cart
│   │   ├── CartPage.tsx       # Line-item list, quantity modifier & totals
│   │   ├── LoginPage.tsx      # Controlled login form with redirect return
│   │   ├── CheckoutPage.tsx   # Protected checkout form & order confirmation
│   │   └── NotFoundPage.tsx   # 404 error page with navigation back home
│   ├── types/
│   │   ├── auth.ts            # User and Auth credentials models
│   │   ├── cart.ts            # CartItem and Cart state interfaces
│   │   ├── checkout.ts        # Checkout form schema
│   │   └── product.ts         # DummyJSON Product and Category types
│   ├── App.tsx                # Route registry wrapped in MainLayout
│   ├── main.tsx               # Root entry mounting BrowserRouter & Providers
│   └── index.css              # Tailwind CSS v4 entry
├── vercel.json                # Vercel SPA rewrite configuration
├── PLAN.md                    # Project requirements & verification roadmap
├── REPORT.md                  # Implementation summary, debugging & results
└── package.json
```

---

## 🎯 Results & Known Limitations

### Results:
- **Clean Architecture:** Strict separation between Presentation (`components`), Business Logic (`hooks` / `context`), API Services (`api`), and Views (`pages`).
- **Zero Build / Lint Errors:** Strict TypeScript checks pass with 0 errors (`npm run build` and `npm run typecheck`).
- **Reliable UX:** Graceful handling of asynchronous network errors and non-existent IDs.

### Known Limitations:
- **Backend Mocking:** DummyJSON does not persist mutations (e.g. creating real orders or database user accounts) server-side; cart and user authentication are persisted in `localStorage`.
- **Payment Processing:** Checkout simulates the final transaction and generates an internal order code without actual credit card processor integration (Stripe/PayPal).
