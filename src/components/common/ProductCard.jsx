import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import ProductImage from './ProductImage';
import QuickViewModal from './QuickViewModal';
import './ProductCard.css';

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const [justAdded, setJustAdded] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
    setJustAdded(true);
    showToast(`${product.name} added to cart!`);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product);
    showToast(
      added ? `${product.name} added to wishlist!` : `${product.name} removed from wishlist`
    );
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickView(true);
  };

  return (
    <>
      <motion.div
        className="product-card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.06 }}
        whileHover={{ y: -6, transition: { duration: 0.2 } }}
      >
        <div className="product-card-actions-top">
          <button
            type="button"
            className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
            onClick={handleWishlist}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {inWishlist ? '❤️' : '🤍'}
          </button>
          <button
            type="button"
            className="quick-view-btn"
            onClick={handleQuickView}
          >
            Quick View
          </button>
        </div>

        <Link to={`/products/${product.id}`} className="product-card-link">
          <div className="product-image">
            <ProductImage
              src={product.image}
              alt={`${product.name} - ${product.description}`}
              className="product-image-container"
            />
            <span className="product-category">{product.category}</span>
          </div>

          <div className="product-info">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>

            <div className="product-rating">
              <span className="stars">⭐ {product.rating}</span>
              <span className="reviews">({product.reviews} reviews)</span>
            </div>

            <div className="product-footer">
              <span className="product-price">${product.price.toFixed(2)}</span>
            </div>
          </div>
        </Link>

        <motion.button
          className={`add-to-cart-btn ${justAdded ? 'added' : ''}`}
          onClick={handleAddToCart}
          whileTap={{ scale: 0.95 }}
        >
          {justAdded ? '✓ Added!' : 'Add to Cart'}
        </motion.button>
      </motion.div>

      {showQuickView && (
        <QuickViewModal product={product} onClose={() => setShowQuickView(false)} />
      )}
    </>
  );
};

export default ProductCard;
