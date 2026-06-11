import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductImage from '../../components/common/ProductImage';
import OrderTimeline from '../../components/common/OrderTimeline';
import AnimatedPage from '../../components/common/AnimatedPage';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    try {
      const storedOrders = localStorage.getItem('orders');
      if (storedOrders) {
        const parsed = JSON.parse(storedOrders);
        setOrders(parsed);
        if (parsed.length > 0) setSelectedOrder(parsed[parsed.length - 1]);
      }
    } catch {
      setOrders([]);
    }
  }, []);

  return (
    <AnimatedPage className="order-history-page">
      <div className="orders-container">
        <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          Order History
        </motion.h1>

        {orders.length > 0 ? (
          <div className="orders-content">
            <div className="orders-list">
              <h2>Your Orders</h2>
              {orders.map((order, i) => (
                <motion.div
                  key={order.id}
                  className={`order-card ${selectedOrder?.id === order.id ? 'active' : ''}`}
                  onClick={() => setSelectedOrder(order)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="order-header">
                    <span className="order-number">Order #{order.id}</span>
                    <span className="order-status">{order.status}</span>
                  </div>
                  <p className="order-date">{order.date}</p>
                  <p className="order-total">${order.total}</p>
                  <p className="order-items-count">{order.items.length} items</p>
                </motion.div>
              ))}
            </div>

            {selectedOrder && (
              <motion.div
                className="order-details"
                key={selectedOrder.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2>Order Details</h2>

                <OrderTimeline status={selectedOrder.status} />

                <div className="order-info-section">
                  <h3>Shipping Information</h3>
                  <p>
                    <strong>{selectedOrder.customerInfo.firstName} {selectedOrder.customerInfo.lastName}</strong>
                  </p>
                  <p>{selectedOrder.customerInfo.address}</p>
                  <p>{selectedOrder.customerInfo.city}, {selectedOrder.customerInfo.state} {selectedOrder.customerInfo.zip}</p>
                  <p>Email: {selectedOrder.customerInfo.email}</p>
                  <p>Phone: {selectedOrder.customerInfo.phone}</p>
                </div>

                <div className="order-items-section">
                  <h3>Items</h3>
                  <div className="order-items-grid">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="order-item-card">
                        <ProductImage src={item.image} alt={item.name} className="order-item-thumb" />
                        <div className="order-item-info">
                          <p className="order-item-name">{item.name}</p>
                          <p className="order-item-meta">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                          <p className="order-item-total">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="order-summary">
                  <div className="summary-line">
                    <span>Total:</span>
                    <span>${selectedOrder.total}</span>
                  </div>
                  <div className="summary-line status">
                    <span>Status:</span>
                    <span>{selectedOrder.status}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div
            className="no-orders"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p>You haven't placed any orders yet</p>
            <Link to="/products" className="shop-btn">Start Shopping</Link>
          </motion.div>
        )}
      </div>
    </AnimatedPage>
  );
};

export default OrderHistory;
