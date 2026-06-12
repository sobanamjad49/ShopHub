import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SearchSuggestions.css';

const SearchSuggestions = ({ searchTerm, products, onSelect, onSearchChange }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

  const suggestions = searchTerm.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 6)
    : [];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (product) => {
    onSearchChange(product.name);
    onSelect?.(product);
    setShowSuggestions(false);
  };

  return (
    <div className="search-suggestions-wrapper" ref={wrapperRef}>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="search-suggestions glass-card">
          {suggestions.map((product) => (
            <li key={product.id}>
              <button
                type="button"
                className="suggestion-item"
                onClick={() => handleSelect(product)}
              >
                <span className="suggestion-name">{product.name}</span>
                <span className="suggestion-meta">{product.category} · ${product.price.toFixed(2)}</span>
              </button>
            </li>
          ))}
          <li className="suggestion-footer">
            <Link to="/products" onClick={() => setShowSuggestions(false)}>
              View all results →
            </Link>
          </li>
        </ul>
      )}
      <input type="hidden" value={showSuggestions ? 'open' : 'closed'} readOnly />
      {/* Expose setter via render prop pattern - parent controls input */}
    </div>
  );
};

export const useSearchSuggestions = () => {
  const [focused, setFocused] = useState(false);
  return { focused, setFocused, show: focused };
};

export default SearchSuggestions;
