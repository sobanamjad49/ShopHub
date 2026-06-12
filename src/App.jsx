import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RouteScrollToTop from './components/common/RouteScrollToTop';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { CompareProvider } from './context/CompareContext';
import { ViewedProvider } from './context/ViewedContext';
import { CouponProvider } from './context/CouponContext';
import Layout from './components/common/Layout';
import AdminLayout from './components/admin/AdminLayout';

import Landing from './pages/ecommerce/Landing';
import Products from './pages/ecommerce/Products';
import ProductDetail from './pages/ecommerce/ProductDetail';
import Cart from './pages/ecommerce/Cart';
import Checkout from './pages/ecommerce/Checkout';
import Profile from './pages/ecommerce/Profile';
import OrderHistory from './pages/ecommerce/OrderHistory';
import Wishlist from './pages/ecommerce/Wishlist';
import Compare from './pages/ecommerce/Compare';
import RecentlyViewed from './pages/ecommerce/RecentlyViewed';
import Invoice from './pages/ecommerce/Invoice';
import AdminDashboard from './pages/ecommerce/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <RouteScrollToTop />
      <ThemeProvider>
        <ProductProvider>
          <CartProvider>
            <WishlistProvider>
              <CompareProvider>
                <ViewedProvider>
                  <CouponProvider>
                    <ToastProvider>
                      <Routes>
                        <Route element={<Layout />}>
                          <Route path="/" element={<Landing />} />
                          <Route path="/products" element={<Products />} />
                          <Route path="/products/:id" element={<ProductDetail />} />
                          <Route path="/cart" element={<Cart />} />
                          <Route path="/checkout" element={<Checkout />} />
                          <Route path="/profile" element={<Profile />} />
                          <Route path="/orders" element={<OrderHistory />} />
                          <Route path="/wishlist" element={<Wishlist />} />
                          <Route path="/compare" element={<Compare />} />
                          <Route path="/recent" element={<RecentlyViewed />} />
                          <Route path="/invoice" element={<Invoice />} />
                          <Route path="/about" element={<Landing />} />
                          <Route path="/contact" element={<Landing />} />
                        </Route>

                        <Route element={<AdminLayout />}>
                          <Route path="/admin" element={<AdminDashboard />} />
                        </Route>

                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </ToastProvider>
                  </CouponProvider>
                </ViewedProvider>
              </CompareProvider>
            </WishlistProvider>
          </CartProvider>
        </ProductProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
