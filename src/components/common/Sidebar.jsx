import React from 'react';
import { useProducts } from '../../context/ProductContext';
import './Sidebar.css';

const Sidebar = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    priceMin,
    setPriceMin,
    priceMax,
    setPriceMax,
    minRating,
    setMinRating,
    sortBy,
    setSortBy,
    resetFilters,
  } = useProducts();

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'electronics', label: 'Electronics' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'office', label: 'Office' },
  ];

  const ratingOptions = [
    { value: 0, label: 'All Ratings' },
    { value: 4.5, label: '4.5+ ⭐' },
    { value: 4, label: '4+ ⭐' },
    { value: 3, label: '3+ ⭐' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3>Categories</h3>
        <ul className="category-list">
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                type="button"
                className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section">
        <h3>Sort By</h3>
        <select
          className="sidebar-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Highest Rated</option>
        </select>
      </div>

      <div className="sidebar-section">
        <h3>Price Range</h3>
        <div className="price-range">
          <div className="price-inputs">
            <label>
              Min
              <input
                type="number"
                min="0"
                max={priceMax}
                value={priceMin}
                onChange={(e) => setPriceMin(Math.max(0, Number(e.target.value) || 0))}
              />
            </label>
            <span className="price-sep">—</span>
            <label>
              Max
              <input
                type="number"
                min={priceMin}
                value={priceMax}
                onChange={(e) => setPriceMax(Math.max(priceMin, Number(e.target.value) || 0))}
              />
            </label>
          </div>
          <p className="price-display">${priceMin} — ${priceMax}</p>
        </div>
      </div>

      <div className="sidebar-section">
        <h3>Rating</h3>
        <div className="rating-filters">
          {ratingOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`rating-btn ${minRating === opt.value ? 'active' : ''}`}
              onClick={() => setMinRating(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <button type="button" className="reset-btn" onClick={resetFilters}>
          Reset Filters
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
