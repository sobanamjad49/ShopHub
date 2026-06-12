import React, { createContext, useContext, useState, useEffect } from 'react';

const CompareContext = createContext();
const COMPARE_STORAGE_KEY = 'ecommerce_compare';
const MAX_COMPARE = 4;

export const CompareProvider = ({ children }) => {
  const [compareItems, setCompareItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(COMPARE_STORAGE_KEY);
    if (saved) {
      try {
        setCompareItems(JSON.parse(saved));
      } catch {
        setCompareItems([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(compareItems));
  }, [compareItems]);

  const addToCompare = (product) => {
    setCompareItems((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev;
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, product];
    });
    return !compareItems.some((item) => item.id === product.id) && compareItems.length < MAX_COMPARE;
  };

  const removeFromCompare = (productId) => {
    setCompareItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const toggleCompare = (product) => {
    if (isInCompare(product.id)) {
      removeFromCompare(product.id);
      return false;
    }
    if (compareItems.length >= MAX_COMPARE) return null;
    addToCompare(product);
    return true;
  };

  const clearCompare = () => setCompareItems([]);

  const isInCompare = (productId) =>
    compareItems.some((item) => item.id === productId);

  const getCompareCount = () => compareItems.length;

  const value = {
    compareItems,
    addToCompare,
    removeFromCompare,
    toggleCompare,
    clearCompare,
    isInCompare,
    getCompareCount,
    maxCompare: MAX_COMPARE,
  };

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within CompareProvider');
  }
  return context;
};
