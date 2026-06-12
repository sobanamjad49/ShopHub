import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useViewed } from '../../context/ViewedContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import ProductCard from '../../components/common/ProductCard';
import AnimatedPage from '../../components/common/AnimatedPage';
import './RecentlyViewed.css';

const RecentlyViewed = () => {
  const { viewedProducts, clearViewed } = useViewed();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddAllToCart = () => {
    viewedProducts.forEach((p) => addToCart(p, 1));
    showToast(`${viewedProducts.length} products added to cart!`);
  };

  return (
    <AnimatedPage className="recent-page">
      <div className="recent-container">
        <div className="recent-header">
          <div>
            <h1>🕐 Recently Viewed</h1>
            <p>{viewedProducts.length} product{viewedProducts.length !== 1 ? 's' : ''} in your history</p>
          </div>
          {viewedProducts.length > 0 && (
            <div className="recent-actions">
              <button type="button" className="recent-btn secondary" onClick={handleAddAllToCart}>
                Add All to Cart
              </button>
              <button type="button" className="recent-btn danger" onClick={clearViewed}>
                Clear History
              </button>
            </div>
          )}
        </div>

        {viewedProducts.length > 0 ? (
          <div className="recent-grid">
            {viewedProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            className="recent-empty glass-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span className="recent-empty-icon">🕐</span>
            <h2>No recently viewed products</h2>
            <p>Products you browse will appear here for quick access.</p>
            <Link to="/products" className="btn-primary">Start Shopping</Link>
          </motion.div>
        )}
      </div>
    </AnimatedPage>
  );
};

export default RecentlyViewed;
