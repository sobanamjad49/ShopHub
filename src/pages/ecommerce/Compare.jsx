import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCompare } from '../../context/CompareContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import ProductImage from '../../components/common/ProductImage';
import AnimatedPage from '../../components/common/AnimatedPage';
import './Compare.css';

const Compare = () => {
  const { compareItems, removeFromCompare, clearCompare, maxCompare } = useCompare();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const specs = ['price', 'rating', 'reviews', 'category', 'stock'];

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    showToast(`${product.name} added to cart!`);
  };

  return (
    <AnimatedPage className="compare-page">
      <div className="compare-container">
        <div className="compare-header">
          <div>
            <h1>⚖️ Compare Products</h1>
            <p>Compare up to {maxCompare} products side by side</p>
          </div>
          {compareItems.length > 0 && (
            <button type="button" className="compare-clear-btn" onClick={clearCompare}>
              Clear All
            </button>
          )}
        </div>

        {compareItems.length > 0 ? (
          <div className="compare-table-wrapper glass-card">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  {compareItems.map((product) => (
                    <th key={product.id} className="compare-product-col">
                      <button
                        type="button"
                        className="compare-remove"
                        onClick={() => removeFromCompare(product.id)}
                        aria-label="Remove from compare"
                      >
                        ✕
                      </button>
                      <Link to={`/products/${product.id}`}>
                        <ProductImage src={product.image} alt={product.name} className="compare-thumb" />
                        <span className="compare-product-name">{product.name}</span>
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specs.map((spec) => (
                  <tr key={spec}>
                    <td className="compare-spec-label">{spec.charAt(0).toUpperCase() + spec.slice(1)}</td>
                    {compareItems.map((product) => (
                      <td key={product.id}>
                        {spec === 'price' && `$${product.price.toFixed(2)}`}
                        {spec === 'rating' && `⭐ ${product.rating}`}
                        {spec === 'reviews' && `${product.reviews} reviews`}
                        {spec === 'category' && product.category}
                        {spec === 'stock' && `${product.stock ?? 10} units`}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="compare-spec-label">Description</td>
                  {compareItems.map((product) => (
                    <td key={product.id} className="compare-desc">{product.description}</td>
                  ))}
                </tr>
                <tr>
                  <td className="compare-spec-label">Action</td>
                  {compareItems.map((product) => (
                    <td key={product.id}>
                      <button
                        type="button"
                        className="compare-add-cart"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <motion.div
            className="compare-empty glass-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <span className="compare-empty-icon">⚖️</span>
            <h2>No products to compare</h2>
            <p>Add products from the listing or detail page to compare them here.</p>
            <Link to="/products" className="btn-primary">Browse Products</Link>
          </motion.div>
        )}

        {compareItems.length > 0 && compareItems.length < maxCompare && (
          <p className="compare-hint">
            You can add {maxCompare - compareItems.length} more product{maxCompare - compareItems.length !== 1 ? 's' : ''}.
            <Link to="/products"> Browse products →</Link>
          </p>
        )}
      </div>
    </AnimatedPage>
  );
};

export default Compare;
