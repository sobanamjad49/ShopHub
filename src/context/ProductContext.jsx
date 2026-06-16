import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PRODUCTS } from '../data/products';
import { PRODUCTS_STORAGE_KEY } from '../utils/config';
import { productMatchesSearch } from '../utils/search';

const ProductContext = createContext();

const loadProducts = () => {
  try {
    const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // fall through to defaults
  }
  return PRODUCTS;
};

const persistProducts = (products) => {
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
};

const DEFAULT_FILTERS = {
  priceMin: 0,
  priceMax: 500,
  minRating: 0,
  sortBy: 'default',
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceMin, setPriceMin] = useState(DEFAULT_FILTERS.priceMin);
  const [priceMax, setPriceMax] = useState(DEFAULT_FILTERS.priceMax);
  const [minRating, setMinRating] = useState(DEFAULT_FILTERS.minRating);
  const [sortBy, setSortBy] = useState(DEFAULT_FILTERS.sortBy);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initial = loadProducts();
    setProducts(initial);
    setFilteredProducts(initial);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter((p) => productMatchesSearch(p, searchTerm));
    }

    filtered = filtered.filter(
      (p) => p.price >= priceMin && p.price <= priceMax
    );

    if (minRating > 0) {
      filtered = filtered.filter((p) => p.rating >= minRating);
    }

    if (sortBy === 'price-asc') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating-desc') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products, priceMin, priceMax, minRating, sortBy]);

  const resetFilters = useCallback(() => {
    setSelectedCategory('all');
    setSearchTerm('');
    setPriceMin(DEFAULT_FILTERS.priceMin);
    setPriceMax(DEFAULT_FILTERS.priceMax);
    setMinRating(DEFAULT_FILTERS.minRating);
    setSortBy(DEFAULT_FILTERS.sortBy);
  }, []);

  const getProductById = useCallback(
    (id) => products.find((p) => p.id === id),
    [products]
  );

  const addProduct = useCallback((productData) => {
    setProducts((prev) => {
      const newId = prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 1;
      const newProduct = {
        id: newId,
        rating: 4.0,
        reviews: 0,
        stock: 10,
        ...productData,
        price: parseFloat(productData.price),
      };
      const updated = [...prev, newProduct];
      persistProducts(updated);
      return updated;
    });
  }, []);

  const updateProduct = useCallback((id, productData) => {
    setProducts((prev) => {
      const updated = prev.map((p) =>
        p.id === id
          ? {
              ...p,
              ...productData,
              id,
              price: parseFloat(productData.price ?? p.price),
            }
          : p
      );
      persistProducts(updated);
      return updated;
    });
  }, []);

  const deleteProduct = useCallback((id) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      persistProducts(updated);
      return updated;
    });
  }, []);

  const resetProducts = useCallback(() => {
    setProducts(PRODUCTS);
    persistProducts(PRODUCTS);
  }, []);

  const value = {
    products,
    filteredProducts,
    searchTerm,
    setSearchTerm,
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
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProducts,
    isLoading,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};
