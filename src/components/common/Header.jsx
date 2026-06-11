import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';
import ProductImage from './ProductImage';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const { cartItems, getTotalItems, getTotalPrice } = useCart();
  const { getWishlistCount } = useWishlist();
  const { toggleTheme, isDark } = useTheme();
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const cartRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setShowCart(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;

  const cartCount = getTotalItems();
  const wishlistCount = getWishlistCount();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🛒</span>
          <h1>ShopHub</h1>
        </Link>

        <nav className={`nav ${showMenu ? 'active' : ''}`}>
          <Link to="/" className={isActive('/') ? 'active' : ''} onClick={() => setShowMenu(false)}>Home</Link>
          <Link to="/products" className={isActive('/products') ? 'active' : ''} onClick={() => setShowMenu(false)}>Products</Link>
          <Link to="/wishlist" className={isActive('/wishlist') ? 'active' : ''} onClick={() => setShowMenu(false)}>Wishlist</Link>
          <Link to="/orders" className={isActive('/orders') ? 'active' : ''} onClick={() => setShowMenu(false)}>Orders</Link>
          <Link to="/admin" className={isActive('/admin') ? 'active' : ''} onClick={() => setShowMenu(false)}>Admin</Link>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle theme"
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          <Link to="/profile" className="profile-link" title="Profile">
            <span className="profile-avatar-sm">👤</span>
          </Link>

          <Link to="/wishlist" className="wishlist-link" title="Wishlist">
            <span className="wishlist-icon">❤️</span>
            <AnimatePresence>
              {wishlistCount > 0 && (
                <motion.span
                  className="wishlist-count"
                  key={wishlistCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  {wishlistCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <div className="cart-wrapper" ref={cartRef}>
            <motion.button
              className="cart-btn"
              onClick={() => setShowCart(!showCart)}
              whileTap={{ scale: 0.92 }}
            >
              <span className="cart-icon">🛒</span>
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    className="cart-count"
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <AnimatePresence>
              {showCart && (
                <motion.div
                  className="cart-preview"
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="cart-preview-header">
                    <span>Your Cart</span>
                    <span className="cart-preview-count">{cartCount} items</span>
                  </div>

                  {cartItems.length > 0 ? (
                    <>
                      <div className="cart-preview-items">
                        {cartItems.slice(0, 3).map((item) => (
                          <div key={item.id} className="cart-preview-item">
                            <ProductImage src={item.image} alt={item.name} className="preview-thumb" />
                            <div className="preview-item-info">
                              <p className="preview-item-name">{item.name}</p>
                              <p className="preview-item-qty">×{item.quantity} — ${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                        {cartItems.length > 3 && (
                          <p className="cart-preview-more">+{cartItems.length - 3} more items</p>
                        )}
                      </div>
                      <div className="cart-preview-footer">
                        <p className="cart-total">Total: <strong>${getTotalPrice().toFixed(2)}</strong></p>
                        <Link to="/cart" className="view-cart-btn" onClick={() => setShowCart(false)}>View Cart</Link>
                        <Link to="/checkout" className="checkout-link-btn" onClick={() => setShowCart(false)}>Checkout →</Link>
                      </div>
                    </>
                  ) : (
                    <div className="cart-preview-empty">
                      <span>🛒</span>
                      <p>Your cart is empty</p>
                      <Link to="/products" className="view-cart-btn" onClick={() => setShowCart(false)}>Shop Now</Link>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button className="menu-toggle" onClick={() => setShowMenu(!showMenu)} aria-label="Menu">
            {showMenu ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
