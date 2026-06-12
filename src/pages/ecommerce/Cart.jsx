import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useCoupon } from '../../context/CouponContext';
import { useToast } from '../../context/ToastContext';
import ProductImage from '../../components/common/ProductImage';
import AnimatedPage from '../../components/common/AnimatedPage';
import { calculateOrderTotal, getEstimatedDelivery } from '../../utils/orderCalculations';
import { COUPONS } from '../../utils/coupons';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    savedItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    saveForLater,
    moveSavedToCart,
    removeSaved,
    getTotalPrice,
  } = useCart();
  const { appliedCoupon, couponError, applyCoupon, removeCoupon, getDiscountAmount, isFreeShipping } = useCoupon();
  const { showToast } = useToast();
  const [couponCode, setCouponCode] = useState('');

  const subtotal = getTotalPrice();
  const discount = getDiscountAmount(subtotal);
  const orderCalc = calculateOrderTotal(subtotal, discount, isFreeShipping());
  const estimatedDelivery = getEstimatedDelivery();

  const handleCheckout = () => {
    if (cartItems.length > 0) navigate('/checkout');
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    const success = applyCoupon(couponCode, subtotal);
    if (success) {
      showToast(`Coupon ${couponCode.toUpperCase()} applied!`);
      setCouponCode('');
    }
  };

  const handleSaveForLater = (productId) => {
    saveForLater(productId);
    showToast('Item saved for later');
  };

  return (
    <AnimatedPage className="cart-page">
      <div className="cart-container">
        <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          Shopping Cart
        </motion.h1>

        {cartItems.length > 0 || savedItems.length > 0 ? (
          <div className="cart-content">
            <div className="cart-items-section">
              {cartItems.length > 0 && (
                <>
                  <h2 className="cart-section-title">Cart Items ({cartItems.length})</h2>
                  <table className="cart-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence>
                        {cartItems.map((item) => (
                          <motion.tr
                            key={item.id}
                            className="cart-item"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20, height: 0 }}
                            layout
                          >
                            <td className="product-col">
                              <div className="product-info-cart">
                                <ProductImage src={item.image} alt={item.name} className="cart-thumb" />
                                <div>
                                  <Link to={`/products/${item.id}`} className="product-name-link">
                                    {item.name}
                                  </Link>
                                  <p className="product-category-small">{item.category}</p>
                                </div>
                              </div>
                            </td>
                            <td className="price-col">${item.price.toFixed(2)}</td>
                            <td className="quantity-col">
                              <div className="quantity-control-cart">
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                                <input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10) || 1)}
                                />
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                              </div>
                            </td>
                            <td className="total-col">${(item.price * item.quantity).toFixed(2)}</td>
                            <td className="action-col">
                              <button className="save-later-btn" onClick={() => handleSaveForLater(item.id)} title="Save for later">
                                💾
                              </button>
                              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>🗑️</button>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </>
              )}

              {savedItems.length > 0 && (
                <div className="saved-section">
                  <h2 className="cart-section-title">Saved for Later ({savedItems.length})</h2>
                  <div className="saved-items-grid">
                    {savedItems.map((item) => (
                      <div key={item.id} className="saved-item glass-card">
                        <ProductImage src={item.image} alt={item.name} className="saved-thumb" />
                        <div className="saved-info">
                          <Link to={`/products/${item.id}`}>{item.name}</Link>
                          <p>${item.price.toFixed(2)}</p>
                          <div className="saved-actions">
                            <button type="button" onClick={() => { moveSavedToCart(item.id); showToast('Moved to cart'); }}>
                              Move to Cart
                            </button>
                            <button type="button" className="remove-saved" onClick={() => removeSaved(item.id)}>Remove</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <motion.div
                className="cart-summary glass-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2>Order Summary</h2>

                <div className="coupon-section">
                  <div className="coupon-input-row">
                    <input
                      type="text"
                      placeholder="Coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button type="button" onClick={handleApplyCoupon}>Apply</button>
                  </div>
                  {couponError && <p className="coupon-error">{couponError}</p>}
                  {appliedCoupon && (
                    <div className="coupon-applied">
                      <span>✓ {appliedCoupon.code} — {appliedCoupon.description}</span>
                      <button type="button" onClick={removeCoupon}>Remove</button>
                    </div>
                  )}
                  <div className="coupon-hints">
                    Try: {COUPONS.map((c) => c.code).join(', ')}
                  </div>
                </div>

                <div className="delivery-estimate">
                  📦 Estimated delivery: <strong>{estimatedDelivery}</strong>
                </div>

                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${orderCalc.subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="summary-row discount">
                    <span>Discount:</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="summary-row">
                  <span>Shipping:</span>
                  <span className={orderCalc.shipping === 0 ? 'shipping-free' : ''}>
                    {orderCalc.shipping === 0 ? 'Free' : `$${orderCalc.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="summary-row">
                  <span>Tax (10%):</span>
                  <span>${orderCalc.tax.toFixed(2)}</span>
                </div>
                <div className="summary-divider" />
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>${orderCalc.total.toFixed(2)}</span>
                </div>
                <motion.button
                  className="checkout-btn"
                  onClick={handleCheckout}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Proceed to Checkout →
                </motion.button>
                <Link to="/products" className="continue-shopping-btn">Continue Shopping</Link>
                <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div
            className="empty-cart glass-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Start shopping to add items to your cart</p>
            <Link to="/products" className="continue-shopping-btn">Continue Shopping</Link>
          </motion.div>
        )}
      </div>
    </AnimatedPage>
  );
};

export default Cart;
