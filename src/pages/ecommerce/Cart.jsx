import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import ProductImage from '../../components/common/ProductImage';
import AnimatedPage from '../../components/common/AnimatedPage';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    if (cartItems.length > 0) navigate('/checkout');
  };

  return (
    <AnimatedPage className="cart-page">
      <div className="cart-container">
        <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          Shopping Cart
        </motion.h1>

        {cartItems.length > 0 ? (
          <div className="cart-content">
            <div className="cart-items-section">
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
                            <ProductImage
                              src={item.image}
                              alt={item.name}
                              className="cart-thumb"
                            />
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
                          <button className="remove-btn" onClick={() => removeFromCart(item.id)}>🗑️</button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            <motion.div
              className="cart-summary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span className="shipping-free">Free</span>
              </div>
              <div className="summary-row">
                <span>Tax:</span>
                <span>${(getTotalPrice() * 0.1).toFixed(2)}</span>
              </div>
              <div className="summary-divider" />
              <div className="summary-row total">
                <span>Total:</span>
                <span>${(getTotalPrice() * 1.1).toFixed(2)}</span>
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
          </div>
        ) : (
          <motion.div
            className="empty-cart"
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
