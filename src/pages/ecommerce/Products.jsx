import React from 'react';
import { motion } from 'framer-motion';
import { useProducts } from '../../context/ProductContext';
import Sidebar from '../../components/common/Sidebar';
import ProductCard from '../../components/common/ProductCard';
import AnimatedPage from '../../components/common/AnimatedPage';
import './Products.css';

const Products = () => {
  const { filteredProducts, searchTerm, setSearchTerm, isLoading } = useProducts();

  return (
    <AnimatedPage className="products-page">
      <div className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="search-btn" aria-label="Search">🔍</button>
        </div>
      </div>

      <div className="products-container">
        <Sidebar />

        <main className="products-main">
          <motion.div
            className="results-header"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1>Products</h1>
            <p className="results-count">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
          </motion.div>

          {isLoading ? (
            <div className="products-grid">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="product-skeleton-card">
                  <div className="skeleton-image" />
                  <div className="skeleton-text" />
                  <div className="skeleton-text short" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <motion.div
              className="no-products"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="no-products-icon">🔍</div>
              <h3>No products found</h3>
              <p>Try adjusting your search or filters</p>
            </motion.div>
          )}
        </main>
      </div>
    </AnimatedPage>
  );
};

export default Products;
