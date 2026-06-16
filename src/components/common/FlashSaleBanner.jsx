import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './FlashSaleBanner.css';

const getTimeLeft = () => {
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  const diff = end - Date.now();
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { h, m, s };
};

const FlashSaleBanner = () => {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <motion.section
      className="flash-sale-banner"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flash-sale-inner">
        <div className="flash-sale-text">
          <span className="flash-badge">⚡ Flash Sale</span>
          <p>Up to 40% off — ends tonight!</p>
        </div>
        <div className="flash-countdown">
          <div className="countdown-unit">
            <span>{pad(time.h)}</span>
            <small>hrs</small>
          </div>
          <span className="countdown-sep">:</span>
          <div className="countdown-unit">
            <span>{pad(time.m)}</span>
            <small>min</small>
          </div>
          <span className="countdown-sep">:</span>
          <div className="countdown-unit">
            <span>{pad(time.s)}</span>
            <small>sec</small>
          </div>
        </div>
        <Link to="/products" className="flash-shop-btn">Shop Now</Link>
      </div>
    </motion.section>
  );
};

export default FlashSaleBanner;
