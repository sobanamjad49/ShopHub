# 🛒 ShopHub - Advanced React E-Commerce Frontend

A modern, production-level **React.js E-Commerce Frontend** built with advanced UI/UX, state management, and **LocalStorage** persistence. ShopHub delivers a premium shopping experience without backend dependency.

---

## ✨ Features

### 🛍️ Core E-Commerce

- Product Listing
- Product Details Page
- Category Filtering
- Live Smart Search (with fuzzy / typo tolerance)
- Shopping Cart System
- Wishlist System
- Checkout Flow (Multi-step UI)
- Order History (LocalStorage)
- Recently Viewed Products
- Save for Later
- Product Comparison
- QR Code Generator & Product Sharing

### 🧠 Smart Features

- Predictive Search Suggestions
- Fuzzy Search (typo tolerance)
- Search History (LocalStorage)
- Recommendation System (frontend logic)
- Trending Products Algorithm
- Frequently Bought Together

### 🎨 UI/UX Features

- Fully Responsive Design (Mobile First)
- Dark / Light Mode
- Smooth Page Transitions (Framer Motion)
- Skeleton Loaders
- Glassmorphism UI
- Animated Buttons & Cards
- Sticky Header
- **Bottom Navigation (Mobile App Style)**
- Scroll Progress Bar
- Back to Top Button
- Toast Notifications
- Mini Cart Drawer

### 🛒 Cart & Checkout

- Add / Remove / Update Quantity
- Save for Later
- Coupon System (frontend validation)
- Tax + Shipping Calculation (UI logic)
- Multi-step Checkout UI
- Order Summary Page
- Printable Invoice (PDF UI)
- Confetti on Purchase

**Available Coupons:** `WELCOME10`, `SAVE20`, `FREESHIP`, `SHOPHUB15`

### ❤️ Wishlist System

- Add / Remove Wishlist
- Wishlist Page
- Move to Cart
- Wishlist Counter Animation

### 📊 Admin Panel (Frontend Only)

- Dashboard Analytics UI
- Product Stats Cards
- Orders Overview UI
- Revenue Charts (dummy data)
- Recent Orders Table
- Product CRUD (LocalStorage)

### 🎮 Extra Advanced Features

- **Spin Wheel Coupon System** (daily spin)
- **Flash Sale Countdown Timer**
- **AI Chat Assistant UI** (mock)
- Gamification-ready architecture
- Confetti on Purchase

---

## 💾 LocalStorage Keys

| Key | Description |
|-----|-------------|
| `ecommerce_cart` | Cart Items |
| `ecommerce_saved_for_later` | Saved Items |
| `ecommerce_wishlist` | Wishlist |
| `orders` | Order History |
| `ecommerce_recently_viewed` | Recently Viewed |
| `ecommerce_coupon` | Applied Coupon |
| `ecommerce_compare` | Compare Products |
| `ecommerce_search_history` | Search History |
| `userProfile` | User Data |
| `userAddresses` | Saved Addresses |
| `theme` | Dark/Light Mode |
| `ecommerce_products` | Admin Product Edits |

---

## 📁 Project Folder Structure

```text
ShopHub/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── common/          # Header, Footer, Layout, BottomNav, ChatAssistant, etc.
│   │   └── admin/           # Admin layout & product form
│   ├── context/             # Cart, Wishlist, Theme, Compare, Coupon, Toast, Viewed
│   ├── pages/ecommerce/     # All main pages
│   ├── utils/               # search, coupons, orderCalculations, config
│   ├── data/                # products.js
│   ├── App.jsx
│   └── index.jsx
├── package.json
└── ECOMMERCE_README.md
```

---

## 🚀 Routes

| Route | Page |
|-------|------|
| `/` | Home / Landing |
| `/products` | Product Listing |
| `/products/:id` | Product Details |
| `/cart` | Cart Page |
| `/checkout` | Checkout |
| `/wishlist` | Wishlist |
| `/orders` | Order History |
| `/profile` | User Profile |
| `/compare` | Product Compare |
| `/invoice` | Invoice Page |
| `/recent` | Recently Viewed |
| `/admin` | Admin Dashboard |

---

## ⚙️ Technologies

- React 19
- React Router DOM
- Context API
- Framer Motion
- LocalStorage
- Recharts (Charts)
- QRCode.react
- JavaScript (ES6+)
- CSS3

---

## 🚀 Installation

```bash
npm install
npm start
```

### Production Build

```bash
npm run build
```

The app runs at `http://localhost:3000`

---

## 📌 Performance Features

- Component Based Architecture
- Context API State Management
- LocalStorage Persistence
- Memoized Rendering Patterns
- Reusable Component Architecture
- Mobile First Design

---

## 📱 Responsive Breakpoints

- **Desktop** — Full layout with sidebar filters
- **Tablet** — Adaptive grids, collapsible filters
- **Mobile** — Bottom nav, stacked layouts, touch-friendly UI

---

## 🏆 Highlights

- Production-level frontend architecture
- Fully responsive UI (mobile-first)
- Advanced state management
- No backend dependency
- Portfolio-ready project
- Scalable folder structure
- GitHub / Vercel ready

---

## 📜 License

MIT License © 2026 ShopHub

---

### ⭐ If you like this project, don't forget to give it a star.
