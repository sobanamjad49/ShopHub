import React, { createContext, useContext, useState, useEffect } from 'react';
import { validateCoupon, calculateDiscount } from '../utils/coupons';
import { calculateShipping } from '../utils/orderCalculations';

const CouponContext = createContext();
const COUPON_STORAGE_KEY = 'ecommerce_coupon';

export const CouponProvider = ({ children }) => {
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(COUPON_STORAGE_KEY);
    if (saved) {
      try {
        setAppliedCoupon(JSON.parse(saved));
      } catch {
        setAppliedCoupon(null);
      }
    }
  }, []);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem(COUPON_STORAGE_KEY);
    }
  }, [appliedCoupon]);

  const applyCoupon = (code, subtotal) => {
    setCouponError('');
    const result = validateCoupon(code, subtotal);
    if (!result.valid) {
      setCouponError(result.message);
      return false;
    }
    setAppliedCoupon(result.coupon);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  const getDiscountAmount = (subtotal) => {
    if (!appliedCoupon) return 0;
    const shipping = calculateShipping(subtotal);
    return calculateDiscount(appliedCoupon, subtotal, shipping);
  };

  const isFreeShipping = () => appliedCoupon?.type === 'shipping';

  const value = {
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon,
    getDiscountAmount,
    isFreeShipping,
  };

  return (
    <CouponContext.Provider value={value}>{children}</CouponContext.Provider>
  );
};

export const useCoupon = () => {
  const context = useContext(CouponContext);
  if (!context) {
    throw new Error('useCoupon must be used within CouponProvider');
  }
  return context;
};
