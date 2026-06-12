# 🛒 ShopHub - Professional React E-Commerce Frontend

A modern, fully responsive e-commerce web application built with **React.js**. ShopHub provides a professional shopping experience with product browsing, wishlist management, shopping cart, checkout, order history, admin dashboard, and many advanced frontend features using **LocalStorage**.

---

## ✨ Features

### 🛍 Core E-Commerce Features

- Product Listing
- Product Details Page
- Category Filtering
- Live Search
- Advanced Filters
- Shopping Cart
- Quantity Management
- Wishlist
- Checkout
- Order History
- User Profile
- Recently Viewed Products
- Product Comparison
- Related Products
- Save For Later
- Coupon & Discount System
- QR Code Generator
- Product Sharing

---

### 🎨 User Interface

- Fully Responsive Design
- Modern Landing Page
- Sticky Header
- Responsive Sidebar
- Mobile Burger Menu
- Product Gallery Slider
- Image Zoom
- Quick View Modal
- Skeleton Loading
- Scroll Progress Bar
- Back To Top Button
- Toast Notifications
- Beautiful Hover Animations
- Smooth Page Transitions
- Glassmorphism Cards
- Empty State UI
- Loading Animations

---

### 🌙 Theme Features

- Dark Mode
- Light Mode
- Theme Toggle
- Theme Persistence (LocalStorage)

---

### 📦 Cart Features

- Add To Cart
- Remove Items
- Update Quantity
- Save For Later
- Coupon Code Support
- Shipping Calculation
- Tax Calculation
- Estimated Delivery
- Order Summary

**Available Coupons:** `WELCOME10`, `SAVE20`, `FREESHIP`, `SHOPHUB15`

---

### ❤️ Wishlist Features

- Add / Remove Wishlist
- Wishlist Counter
- Wishlist Page
- Move To Cart
- Clear Wishlist

---

### 🔍 Search & Filters

- Live Search
- Category Filter
- Price Range Filter
- Rating Filter
- Product Sorting
- Search Suggestions
- No Result Screen

---

### 👤 User Features

- User Profile
- Profile Editing
- Address Management
- Order History
- Order Timeline
- Invoice Preview
- Printable Receipt

---

### 📊 Admin Dashboard

- Dashboard Cards
- Revenue Statistics
- Product Statistics
- Sales Analytics
- Recent Orders
- Charts
- Progress Indicators

---

## 💾 Local Storage

The application stores:

| Key | Data |
|-----|------|
| `ecommerce_cart` | Shopping Cart |
| `ecommerce_saved_for_later` | Saved Items |
| `ecommerce_wishlist` | Wishlist |
| `userProfile` | User Profile |
| `userAddresses` | Saved Addresses |
| `orders` | Order History |
| `theme` | Theme Preference |
| `ecommerce_recently_viewed` | Recently Viewed Products |
| `ecommerce_coupon` | Applied Coupon |
| `ecommerce_compare` | Compare Products |

---

## 📁 Project Structure

```text
src/
├── assets/
├── components/
│   ├── common/
│   ├── product/
│   ├── cart/
│   ├── dashboard/
│   ├── wishlist/
│   └── profile/
├── context/
│   ├── CartContext.jsx
│   ├── ProductContext.jsx
│   ├── WishlistContext.jsx
│   ├── ThemeContext.jsx
│   ├── CompareContext.jsx
│   ├── ViewedContext.jsx
│   ├── CouponContext.jsx
│   └── ToastContext.jsx
├── hooks/
├── utils/
│   ├── coupons.js
│   └── orderCalculations.js
├── styles/
├── data/
├── pages/
│   └── ecommerce/
└── App.jsx
```

---

## 📄 Routes

| Route | Description |
|-------|-------------|
| `/` | Landing Page |
| `/products` | Product Listing |
| `/products/:id` | Product Details |
| `/cart` | Shopping Cart |
| `/checkout` | Checkout |
| `/wishlist` | Wishlist |
| `/compare` | Compare Products |
| `/orders` | Order History |
| `/profile` | User Profile |
| `/admin` | Admin Dashboard |
| `/invoice` | Invoice |
| `/recent` | Recently Viewed |

---

## ⚙ Technologies

- React 19
- React Router DOM
- Context API
- LocalStorage
- Axios
- Framer Motion
- Recharts
- QRCode.react
- CSS3
- HTML5
- JavaScript ES6+

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

## 🎯 Future Ready Features

- Backend Integration Ready
- Authentication Ready
- Payment Gateway Ready
- API Ready
- Database Ready

---

## 📱 Responsive

- Desktop
- Laptop
- Tablet
- Mobile

---

## 🚀 Performance

- Component Based Architecture
- Context API State Management
- LocalStorage Persistence
- Responsive Images
- Optimized Rendering
- Clean Folder Structure
- Reusable Components

---

## 🏆 Highlights

- Modern UI/UX
- Professional Folder Structure
- Fully Responsive
- LocalStorage Based
- Reusable Components
- Clean Code
- Easy To Maintain
- Easy To Scale
- Frontend Only
- Portfolio Ready
- GitHub Ready
- Vercel Ready

---

## 📌 Upcoming Features

- Product Reviews
- Multi-language Support
- AI Product Recommendation
- Voice Search
- PWA Support
- Offline Mode
- Notification Center

---

## 📜 License

MIT License

---

### ⭐ If you like this project, don't forget to give it a star.
