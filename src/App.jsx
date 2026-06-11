import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";

// Pages
import Landing from "./pages/ecommerce/Landing";
import Products from "./pages/ecommerce/Products";
import ProductDetail from "./pages/ecommerce/ProductDetail";
import Cart from "./pages/ecommerce/Cart";
import Checkout from "./pages/ecommerce/Checkout";
import Profile from "./pages/ecommerce/Profile";
import OrderHistory from "./pages/ecommerce/OrderHistory";
import AdminDashboard from "./pages/ecommerce/AdminDashboard";
import Footer from "./components/common/Footer";

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/about" element={<Landing />} />
            <Route path="/contact" element={<Landing />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </CartProvider>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
