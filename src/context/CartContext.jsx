import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'ecommerce_cart';
const SAVED_STORAGE_KEY = 'ecommerce_saved_for_later';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch {
        setCartItems([]);
      }
    }
    const savedLater = localStorage.getItem(SAVED_STORAGE_KEY);
    if (savedLater) {
      try {
        setSavedItems(JSON.parse(savedLater));
      } catch {
        setSavedItems([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(savedItems));
  }, [savedItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const saveForLater = (productId) => {
    const item = cartItems.find((i) => i.id === productId);
    if (!item) return;
    removeFromCart(productId);
    setSavedItems((prev) => {
      if (prev.some((i) => i.id === productId)) return prev;
      return [...prev, item];
    });
  };

  const moveSavedToCart = (productId) => {
    const item = savedItems.find((i) => i.id === productId);
    if (!item) return;
    setSavedItems((prev) => prev.filter((i) => i.id !== productId));
    addToCart(item, item.quantity);
  };

  const removeSaved = (productId) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const getTotalItems = () =>
    cartItems.reduce((total, item) => total + item.quantity, 0);

  const value = {
    cartItems,
    savedItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    saveForLater,
    moveSavedToCart,
    removeSaved,
    getTotalPrice,
    getTotalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
