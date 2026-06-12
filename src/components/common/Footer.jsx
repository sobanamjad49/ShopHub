import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-section">
          <h3>ShopHub</h3>
          <p>Your trusted destination for quality products</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li><Link to="/compare">Compare</Link></li>
            <li><Link to="/recent">Recently Viewed</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li><Link to="/orders">Order History</Link></li>
            <li><Link to="/profile">My Profile</Link></li>
            <li><Link to="/cart">Shopping Cart</Link></li>
            <li><Link to="/checkout">Checkout</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/admin">Admin Dashboard</Link></li>
            <li><Link to="/invoice">Invoice</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 ShopHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
