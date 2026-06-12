import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductImage from '../../components/common/ProductImage';
import AnimatedPage from '../../components/common/AnimatedPage';
import './Invoice.css';

const Invoice = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const found = orders.find((o) => String(o.id) === String(orderId));
      setOrder(found || orders[orders.length - 1] || null);
    } catch {
      setOrder(null);
    }
  }, [orderId]);

  const handlePrint = () => window.print();

  if (!order) {
    return (
      <AnimatedPage className="invoice-page">
        <div className="invoice-empty glass-card">
          <h2>Invoice Not Found</h2>
          <p>No order found. Place an order first or select one from order history.</p>
          <Link to="/orders" className="btn-primary">View Orders</Link>
        </div>
      </AnimatedPage>
    );
  }

  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = parseFloat(order.total) - subtotal;

  return (
    <AnimatedPage className="invoice-page">
      <div className="invoice-toolbar no-print">
        <Link to="/orders" className="invoice-back">← Back to Orders</Link>
        <button type="button" className="invoice-print-btn" onClick={handlePrint}>
          🖨️ Print Receipt
        </button>
      </div>

      <div className="invoice-document glass-card" id="invoice-print">
        <header className="invoice-header">
          <div>
            <h1>ShopHub</h1>
            <p className="invoice-tagline">Professional E-Commerce</p>
          </div>
          <div className="invoice-meta">
            <h2>INVOICE</h2>
            <p><strong>Order #:</strong> {order.id}</p>
            <p><strong>Date:</strong> {order.date}</p>
            <p><strong>Status:</strong> {order.status}</p>
          </div>
        </header>

        <div className="invoice-parties">
          <div>
            <h3>Bill To</h3>
            <p>{order.customerInfo.firstName} {order.customerInfo.lastName}</p>
            <p>{order.customerInfo.email}</p>
            <p>{order.customerInfo.phone}</p>
          </div>
          <div>
            <h3>Ship To</h3>
            <p>{order.customerInfo.address}</p>
            <p>{order.customerInfo.city}, {order.customerInfo.state} {order.customerInfo.zip}</p>
          </div>
        </div>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, idx) => (
              <tr key={idx}>
                <td className="invoice-product">
                  <ProductImage src={item.image} alt={item.name} className="invoice-thumb" />
                  <span>{item.name}</span>
                </td>
                <td>{item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="invoice-totals">
          <div className="invoice-total-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="invoice-total-row">
            <span>Tax & Shipping</span>
            <span>${Math.max(0, tax).toFixed(2)}</span>
          </div>
          <div className="invoice-total-row grand">
            <span>Total Paid</span>
            <span>${order.total}</span>
          </div>
        </div>

        <footer className="invoice-footer">
          <p>Thank you for shopping with ShopHub!</p>
          <p className="invoice-note">This is a demo invoice. No real payment was processed.</p>
        </footer>
      </div>
    </AnimatedPage>
  );
};

export default Invoice;
