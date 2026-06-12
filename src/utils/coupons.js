export const COUPONS = [
  { code: 'WELCOME10', discount: 10, type: 'percent', description: '10% off your order' },
  { code: 'SAVE20', discount: 20, type: 'fixed', description: '$20 off orders over $100' },
  { code: 'FREESHIP', discount: 0, type: 'shipping', description: 'Free shipping on any order' },
  { code: 'SHOPHUB15', discount: 15, type: 'percent', description: '15% off — limited time' },
];

export const validateCoupon = (code, subtotal) => {
  const coupon = COUPONS.find((c) => c.code === code.toUpperCase().trim());
  if (!coupon) return { valid: false, message: 'Invalid coupon code' };

  if (coupon.code === 'SAVE20' && subtotal < 100) {
    return { valid: false, message: 'Minimum order of $100 required for SAVE20' };
  }

  return { valid: true, coupon, message: coupon.description };
};

export const calculateDiscount = (coupon, subtotal, shippingCost) => {
  if (!coupon) return 0;

  if (coupon.type === 'percent') {
    return (subtotal * coupon.discount) / 100;
  }
  if (coupon.type === 'fixed') {
    return Math.min(coupon.discount, subtotal);
  }
  if (coupon.type === 'shipping') {
    return shippingCost;
  }
  return 0;
};
