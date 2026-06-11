import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import ProductImage from './ProductImage';
import './QuickViewModal.css';

const QuickViewModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    showToast(`${product.name} (×${quantity}) added to cart!`);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlist = () => {
    const addedToWishlist = toggleWishlist(product);
    showToast(
      addedToWishlist
        ? `${product.name} added to wishlist!`
        : `${product.name} removed from wishlist`
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        className="quick-view-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="quick-view-modal"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button type="button" className="quick-view-close" onClick={onClose} aria-label="Close">
            ✕
          </button>

          <div className="quick-view-content">
            <div className="quick-view-image">
              <ProductImage
                src={product.image}
                alt={product.name}
                className="quick-view-img-wrapper"
                imgClassName="quick-view-img"
              />
            </div>

            <div className="quick-view-info">
              <span className="quick-view-category">{product.category}</span>
              <h2>{product.name}</h2>
              <div className="quick-view-rating">
                ⭐ {product.rating} <span>({product.reviews} reviews)</span>
              </div>
              <p className="quick-view-desc">{product.description}</p>
              <p className="quick-view-price">${product.price.toFixed(2)}</p>

              <div className="quick-view-qty">
                <label htmlFor="qv-qty">Qty:</label>
                <div className="qty-control">
                  <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                  <input
                    id="qv-qty"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                  />
                  <button type="button" onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>

              <div className="quick-view-actions">
                <button
                  type="button"
                  className={`qv-add-cart ${added ? 'added' : ''}`}
                  onClick={handleAddToCart}
                >
                  {added ? '✓ Added!' : 'Add to Cart'}
                </button>
                <button
                  type="button"
                  className={`qv-wishlist ${inWishlist ? 'active' : ''}`}
                  onClick={handleWishlist}
                  aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  {inWishlist ? '❤️' : '🤍'}
                </button>
              </div>

              <Link to={`/products/${product.id}`} className="quick-view-details" onClick={onClose}>
                View Full Details →
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuickViewModal;
