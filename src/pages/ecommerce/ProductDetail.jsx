import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import ImageGallery from '../../components/common/ImageGallery';
import ProductQRCode from '../../components/common/ProductQRCode';
import ProductCard from '../../components/common/ProductCard';
import AnimatedPage from '../../components/common/AnimatedPage';
import { getProductImages } from '../../utils/productImages';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, products } = useProducts();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = getProductById(parseInt(id, 10));

  if (!product) {
    return (
      <AnimatedPage className="product-detail-page">
        <div className="product-not-found">
          <h2>Product Not Found</h2>
          <button type="button" onClick={() => navigate('/products')}>Back to Products</button>
        </div>
      </AnimatedPage>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const inWishlist = isInWishlist(product.id);
  const galleryImages = getProductImages(product);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    showToast(`${product.name} (×${quantity}) added to cart!`);
    setTimeout(() => setAdded(false), 2000);
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
    <AnimatedPage className="product-detail-page">
      <button type="button" className="back-btn" onClick={() => navigate('/products')}>
        ← Back to Products
      </button>

      <motion.div
        className="product-detail-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="product-image-section">
          <ImageGallery
            images={galleryImages}
            alt={product.name}
            badge={product.category}
          />
        </div>

        <div className="product-details-section">
          <h1>{product.name}</h1>

          <div className="rating-section">
            <span className="rating-stars">⭐ {product.rating}</span>
            <span className="rating-count">({product.reviews} customer reviews)</span>
          </div>

          <p className="product-description-full">{product.description}</p>

          <div className="price-section">
            <span className="price">${product.price.toFixed(2)}</span>
            <span className="stock">✓ {product.stock ?? 10} in stock</span>
          </div>

          <div className="quantity-section">
            <label htmlFor="qty">Quantity:</label>
            <div className="quantity-control">
              <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
              <input
                id="qty"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
              />
              <button type="button" onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          <div className="detail-action-buttons">
            <motion.button
              className={`add-to-cart-large-btn ${added ? 'added' : ''}`}
              onClick={handleAddToCart}
              whileTap={{ scale: 0.97 }}
            >
              {added ? '✓ Added to Cart!' : '🛒 Add to Cart'}
            </motion.button>
            <button
              type="button"
              className={`wishlist-large-btn ${inWishlist ? 'active' : ''}`}
              onClick={handleWishlist}
            >
              {inWishlist ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}
            </button>
          </div>

          <ProductQRCode productId={product.id} productName={product.name} />

          <div className="product-features">
            <h3>Product Details</h3>
            <ul>
              <li>High quality materials</li>
              <li>1 year warranty</li>
              <li>Free shipping on orders over $50</li>
              <li>30-day money back guarantee</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {related.length > 0 && (
        <section className="related-products">
          <h2>Related Products</h2>
          <div className="related-grid">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </AnimatedPage>
  );
};

export default ProductDetail;
