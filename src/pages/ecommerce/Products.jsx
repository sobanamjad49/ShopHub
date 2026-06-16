import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts } from '../../context/ProductContext';
import Sidebar from '../../components/common/Sidebar';
import ProductCard from '../../components/common/ProductCard';
import AnimatedPage from '../../components/common/AnimatedPage';
import {
  productMatchesSearch,
  getSearchHistory,
  addSearchHistory,
  clearSearchHistory,
} from '../../utils/search';
import './Products.css';

const Products = () => {
  const { filteredProducts, products, searchTerm, setSearchTerm, isLoading } = useProducts();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    setSearchHistory(getSearchHistory());
  }, []);

  const suggestions = searchTerm.trim()
    ? products.filter((p) => productMatchesSearch(p, searchTerm)).slice(0, 6)
    : [];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      addSearchHistory(searchTerm);
      setSearchHistory(getSearchHistory());
    }
    setShowSuggestions(false);
  };

  const handleHistoryClick = (term) => {
    setSearchTerm(term);
    addSearchHistory(term);
    setSearchHistory(getSearchHistory());
    setShowSuggestions(false);
  };

  const handleClearHistory = () => {
    clearSearchHistory();
    setSearchHistory([]);
  };

  return (
    <AnimatedPage className="products-page">
      <div className="search-section">
        <form className="search-container" ref={searchRef} onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Smart search — try 'headphnes' (typo OK)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            className="search-input"
          />
          <button className="search-btn" type="submit" aria-label="Search">🔍</button>

          {showSuggestions && suggestions.length > 0 && (
            <ul className="search-suggestions glass-card">
              {suggestions.map((product) => (
                <li key={product.id}>
                  <Link
                    to={`/products/${product.id}`}
                    className="suggestion-item"
                    onClick={() => {
                      addSearchHistory(searchTerm);
                      setSearchHistory(getSearchHistory());
                      setShowSuggestions(false);
                    }}
                  >
                    <span className="suggestion-name">{product.name}</span>
                    <span className="suggestion-meta">{product.category} · ${product.price.toFixed(2)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {showSuggestions && !searchTerm.trim() && searchHistory.length > 0 && (
            <div className="search-history glass-card">
              <div className="search-history-header">
                <span>Recent Searches</span>
                <button type="button" onClick={handleClearHistory}>Clear</button>
              </div>
              <ul>
                {searchHistory.map((term) => (
                  <li key={term}>
                    <button type="button" onClick={() => handleHistoryClick(term)}>
                      🕐 {term}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </div>

      <div className="products-container">
        <button
          type="button"
          className="filters-toggle-btn"
          onClick={() => setShowFilters(!showFilters)}
          aria-expanded={showFilters}
        >
          {showFilters ? '✕ Close Filters' : '⚙️ Filters & Sort'}
        </button>

        <div className={`sidebar-wrapper ${showFilters ? 'open' : ''}`}>
          <Sidebar />
        </div>

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
              className="no-products glass-card"
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
