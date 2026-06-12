import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ViewedContext = createContext();
const VIEWED_STORAGE_KEY = 'ecommerce_recently_viewed';
const MAX_VIEWED = 12;

export const ViewedProvider = ({ children }) => {
  const [viewedProducts, setViewedProducts] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(VIEWED_STORAGE_KEY);
    if (saved) {
      try {
        setViewedProducts(JSON.parse(saved));
      } catch {
        setViewedProducts([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(VIEWED_STORAGE_KEY, JSON.stringify(viewedProducts));
  }, [viewedProducts]);

  const addViewedProduct = useCallback((product) => {
    if (!product?.id) return;
    setViewedProducts((prev) => {
      const filtered = prev.filter((item) => item.id !== product.id);
      return [product, ...filtered].slice(0, MAX_VIEWED);
    });
  }, []);

  const clearViewed = () => setViewedProducts([]);

  const getViewedCount = () => viewedProducts.length;

  const value = {
    viewedProducts,
    addViewedProduct,
    clearViewed,
    getViewedCount,
  };

  return (
    <ViewedContext.Provider value={value}>{children}</ViewedContext.Provider>
  );
};

export const useViewed = () => {
  const context = useContext(ViewedContext);
  if (!context) {
    throw new Error('useViewed must be used within ViewedProvider');
  }
  return context;
};
