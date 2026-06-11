import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import Confetti from '../../components/common/Confetti';
import AnimatedPage from '../../components/common/AnimatedPage';
import './Checkout.css';

const STEPS = ['Shipping', 'Payment', 'Review'];

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redirectProgress, setRedirectProgress] = useState(0);

  useEffect(() => {
    try {
      const profile = localStorage.getItem('userProfile');
      if (profile) {
        const parsed = JSON.parse(profile);
        setFormData((prev) => ({
          ...prev,
          firstName: parsed.firstName || prev.firstName,
          lastName: parsed.lastName || prev.lastName,
          email: parsed.email || prev.email,
          phone: parsed.phone || prev.phone,
          address: parsed.address || prev.address,
          city: parsed.city || prev.city,
          state: parsed.state || prev.state,
          zip: parsed.zip || prev.zip,
        }));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (!orderPlaced) return;
    const interval = setInterval(() => {
      setRedirectProgress((p) => Math.min(p + 2, 100));
    }, 60);
    const timeout = setTimeout(() => navigate('/orders'), 3000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [orderPlaced, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((r) => setTimeout(r, 800));

    const id = Date.now();
    const { cardNumber, cvv, expiry, ...safeCustomerInfo } = formData;

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const newOrder = {
      id,
      date: new Date().toLocaleDateString(),
      items: cartItems,
      total: (getTotalPrice() * 1.1).toFixed(2),
      customerInfo: {
        ...safeCustomerInfo,
        paymentLast4: cardNumber.slice(-4) || '****',
      },
      status: 'Processing',
    };
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));

    setOrderId(id);
    setOrderPlaced(true);
    clearCart();
    setIsSubmitting(false);
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 2));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  if (!cartItems.length && !orderPlaced) {
    return (
      <AnimatedPage className="checkout-page">
        <div className="empty-checkout">
          <h2>Your cart is empty</h2>
          <button onClick={() => navigate('/products')}>Back to Shopping</button>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage className="checkout-page">
      <Confetti active={orderPlaced} />

      <AnimatePresence>
        {orderPlaced && (
          <motion.div
            className="success-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="success-card"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <svg className="checkmark-svg" viewBox="0 0 52 52" width="80" height="80">
                <motion.circle
                  cx="26" cy="26" r="25"
                  fill="none"
                  stroke="#48bb78"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.path
                  fill="none"
                  stroke="#48bb78"
                  strokeWidth="3"
                  strokeLinecap="round"
                  d="M14 27l8 8 16-16"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                />
              </svg>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Order Placed Successfully!
              </motion.h2>

              <motion.p
                className="order-id-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Order #{orderId}
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Redirecting to your orders...
              </motion.p>

              <div className="redirect-progress">
                <motion.div
                  className="redirect-progress-bar"
                  style={{ width: `${redirectProgress}%` }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!orderPlaced && (
        <div className="checkout-container">
          <h1>Checkout</h1>

          <div className="checkout-steps">
            {STEPS.map((label, i) => (
              <div key={label} className={`checkout-step ${i <= step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
                <div className="step-circle">{i < step ? '✓' : i + 1}</div>
                <span>{label}</span>
                {i < STEPS.length - 1 && <div className="step-line" />}
              </div>
            ))}
          </div>

          <div className="checkout-content">
            <div className="checkout-form-section">
              <form onSubmit={handleSubmit} className="checkout-form">
                <AnimatePresence mode="wait">
                  {step === 0 && (
                    <motion.fieldset
                      key="shipping"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <legend>Shipping Information</legend>
                      <div className="form-row">
                        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                      </div>
                      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                      <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
                      <input type="text" name="address" placeholder="Street Address" value={formData.address} onChange={handleChange} required />
                      <div className="form-row">
                        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
                        <input type="text" name="zip" placeholder="ZIP Code" value={formData.zip} onChange={handleChange} required />
                      </div>
                    </motion.fieldset>
                  )}

                  {step === 1 && (
                    <motion.fieldset
                      key="payment"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <legend>Payment Information</legend>
                      <input type="text" name="cardNumber" placeholder="Card Number (4111 1111 1111 1111)" value={formData.cardNumber} onChange={handleChange} required />
                      <div className="form-row">
                        <input type="text" name="expiry" placeholder="MM/YY" value={formData.expiry} onChange={handleChange} required />
                        <input type="text" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleChange} required />
                      </div>
                    </motion.fieldset>
                  )}

                  {step === 2 && (
                    <motion.fieldset
                      key="review"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <legend>Review Your Order</legend>
                      <div className="review-summary">
                        <p><strong>Ship to:</strong> {formData.firstName} {formData.lastName}</p>
                        <p>{formData.address}, {formData.city}, {formData.state} {formData.zip}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>Items:</strong> {cartItems.length} product(s)</p>
                        <p className="review-total"><strong>Total:</strong> ${(getTotalPrice() * 1.1).toFixed(2)}</p>
                      </div>
                    </motion.fieldset>
                  )}
                </AnimatePresence>

                <div className="step-actions">
                  {step > 0 && (
                    <button type="button" className="btn-back" onClick={prevStep}>← Back</button>
                  )}
                  {step < 2 ? (
                    <button type="button" className="place-order-btn" onClick={nextStep}>Continue →</button>
                  ) : (
                    <button type="submit" className="place-order-btn" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span className="btn-loading">
                          <span className="spinner" /> Placing Order...
                        </span>
                      ) : 'Place Order'}
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="order-summary-section">
              <h2>Order Summary</h2>
              <div className="order-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="order-item">
                    <div className="item-info">
                      <p className="item-name">{item.name}</p>
                      <p className="item-qty">Qty: {item.quantity}</p>
                    </div>
                    <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="order-calculation">
                <div className="calc-row">
                  <span>Subtotal:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="calc-row">
                  <span>Shipping:</span>
                  <span className="free">Free</span>
                </div>
                <div className="calc-row">
                  <span>Tax (10%):</span>
                  <span>${(getTotalPrice() * 0.1).toFixed(2)}</span>
                </div>
                <div className="calc-divider" />
                <div className="calc-row total">
                  <span>Total:</span>
                  <span>${(getTotalPrice() * 1.1).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AnimatedPage>
  );
};

export default Checkout;
