export const TAX_RATE = 0.1;
export const FREE_SHIPPING_THRESHOLD = 50;
export const SHIPPING_COST = 9.99;

export const calculateShipping = (subtotal, freeShippingOverride = false) => {
  if (freeShippingOverride) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
};

export const calculateTax = (subtotalAfterDiscount) =>
  Math.max(0, subtotalAfterDiscount) * TAX_RATE;

export const calculateOrderTotal = (subtotal, discount = 0, freeShipping = false) => {
  const afterDiscount = Math.max(0, subtotal - discount);
  const shipping = calculateShipping(afterDiscount, freeShipping);
  const tax = calculateTax(afterDiscount);
  return {
    subtotal,
    discount,
    afterDiscount,
    shipping,
    tax,
    total: afterDiscount + shipping + tax,
  };
};

export const getEstimatedDelivery = (daysFromNow = 5) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};
