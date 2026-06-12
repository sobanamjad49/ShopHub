import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import ProductImage from '../../components/common/ProductImage';
import AnimatedPage from '../../components/common/AnimatedPage';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    showToast(`${product.name} added to cart!`);
  };

  const handleMoveAllToCart = () => {
    wishlistItems.forEach((p) => addToCart(p, 1));
    showToast(`${wishlistItems.length} items moved to cart!`);
  };

  const handleRemove = (product) => {
    removeFromWishlist(product.id);
    showToast(`${product.name} removed from wishlist`);
  };

  const handleClear = () => {
    clearWishlist();
    showToast('Wishlist cleared');
  };

  return (
    <AnimatedPage className="wishlist-page">
      <div className="wishlist-header">
        <div>
          <h1>❤️ My Wishlist</h1>
          <p>{wishlistItems.length} saved product{wishlistItems.length !== 1 ? 's' : ''}</p>
        </div>
        {wishlistItems.length > 0 && (
          <div className="wishlist-header-actions">
            <button type="button" className="wishlist-move-all" onClick={handleMoveAllToCart}>
              Move All to Cart
            </button>
            <button type="button" className="wishlist-clear-all" onClick={handleClear}>
              Clear Wishlist
            </button>
          </div>
        )}
      </div>

      {wishlistItems.length > 0 ? (
        <div className="wishlist-grid">
          {wishlistItems.map((product, i) => (
            <motion.div
              key={product.id}
              className="wishlist-card glass-card"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link to={`/products/${product.id}`} className="wishlist-card-image">
                <ProductImage src={product.image} alt={product.name} className="wishlist-img" />
              </Link>
              <div className="wishlist-card-info">
                <Link to={`/products/${product.id}`}>
                  <h3>{product.name}</h3>
                </Link>
                <p className="wishlist-price">${product.price.toFixed(2)}</p>
                <div className="wishlist-card-actions">
                  <button type="button" className="wishlist-add-btn" onClick={() => handleAddToCart(product)}>
                    Move to Cart
                  </button>
                  <button
                    type="button"
                    className="wishlist-remove-btn"
                    onClick={() => handleRemove(product)}
                    aria-label="Remove from wishlist"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="wishlist-empty glass-card">
          <span className="wishlist-empty-icon">🤍</span>
          <h2>Your wishlist is empty</h2>
          <p>Save your favorite products to find them later.</p>
          <Link to="/products" className="btn-primary">Browse Products</Link>
        </div>
      )}
    </AnimatedPage>
  );
};

export default Wishlist;
