import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import './BottomNav.css';

const navItems = [
  { path: '/', label: 'Home', icon: '🏠' },
  { path: '/products', label: 'Shop', icon: '🛍️' },
  { path: '/wishlist', label: 'Wishlist', icon: '❤️', countKey: 'wishlist' },
  { path: '/cart', label: 'Cart', icon: '🛒', countKey: 'cart' },
  { path: '/profile', label: 'Profile', icon: '👤' },
];

const BottomNav = () => {
  const location = useLocation();
  const { getTotalItems } = useCart();
  const { getWishlistCount } = useWishlist();

  const counts = {
    cart: getTotalItems(),
    wishlist: getWishlistCount(),
  };

  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">
      {navItems.map((item) => {
        const isActive =
          item.path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.path);
        const count = item.countKey ? counts[item.countKey] : 0;

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="bottom-nav-icon-wrap">
              <span className="bottom-nav-icon">{item.icon}</span>
              {count > 0 && (
                <motion.span
                  className="bottom-nav-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={count}
                >
                  {count > 99 ? '99+' : count}
                </motion.span>
              )}
            </span>
            <span className="bottom-nav-label">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
