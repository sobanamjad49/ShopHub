import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';
import { useViewed } from '../../context/ViewedContext';
import { useToast } from '../../context/ToastContext';
import ImageGallery from '../../components/common/ImageGallery';
import ImageZoom from '../../components/common/ImageZoom';
import ProductQRCode from '../../components/common/ProductQRCode';
import ProductShare from '../../components/common/ProductShare';
import ProductCard from '../../components/common/ProductCard';
import AnimatedPage from '../../components/common/AnimatedPage';
import { getProductImages } from '../../utils/productImages';
import { getFrequentlyBoughtTogether } from '../../utils/search';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, products } = useProducts();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toggleCompare, isInCompare, maxCompare } = useCompare();
  const { addViewedProduct } = useViewed();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [showZoom, setShowZoom] = useState(false);

  const product = getProductById(parseInt(id, 10));

  useEffect(() => {
    if (product) {
      addViewedProduct(product);
    }
  }, [product, addViewedProduct]);

  if (!product) {
    return (
      <AnimatedPage className="product-detail-page">
        <div className="product-not-found glass-card">
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist.</p>
          <button type="button" onClick={() => navigate('/products')}>Back to Products</button>
        </div>
      </AnimatedPage>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const boughtTogether = getFrequentlyBoughtTogether(products, product.id, 3);

  const inWishlist = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);
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

  const handleCompare = () => {
    const result = toggleCompare(product);
    if (result === null) {
      showToast(`Maximum ${maxCompare} products can be compared`);
      return;
    }
    showToast(
      result
        ? `${product.name} added to compare!`
        : `${product.name} removed from compare`
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
          {showZoom ? (
            <ImageZoom src={galleryImages[0]} alt={product.name} className="detail-zoom" />
          ) : (
            <ImageGallery
              images={galleryImages}
              alt={product.name}
              badge={product.category}
            />
          )}
          <button
            type="button"
            className="zoom-toggle-btn"
            onClick={() => setShowZoom(!showZoom)}
          >
            {showZoom ? '🖼️ Gallery View' : '🔍 Zoom View'}
          </button>
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
            <button
              type="button"
              className={`compare-large-btn ${inCompare ? 'active' : ''}`}
              onClick={handleCompare}
            >
              {inCompare ? '⚖️ In Compare' : '⚖️ Compare'}
            </button>
          </div>

          <ProductShare product={product} />
          <ProductQRCode productId={product.id} productName={product.name} />

          <div className="product-features glass-card">
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

      {boughtTogether.length > 0 && (
        <section className="frequently-bought">
          <h2>Frequently Bought Together</h2>
          <div className="fbt-grid">
            <div className="fbt-main">
              <ProductCard product={product} index={0} />
            </div>
            <span className="fbt-plus">+</span>
            <div className="fbt-others">
              {boughtTogether.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i + 1} />
              ))}
            </div>
          </div>
        </section>
      )}

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
