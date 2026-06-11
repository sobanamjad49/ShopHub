import React from 'react';
import { motion } from 'framer-motion';
import './OrderTimeline.css';

const STEPS = [
  { key: 'placed', label: 'Order Placed', icon: '📋' },
  { key: 'processing', label: 'Processing', icon: '⚙️' },
  { key: 'shipped', label: 'Shipped', icon: '🚚' },
  { key: 'delivered', label: 'Delivered', icon: '✅' },
];

const STATUS_INDEX = {
  Processing: 1,
  Shipped: 2,
  Delivered: 3,
};

const OrderTimeline = ({ status = 'Processing' }) => {
  const activeIndex = STATUS_INDEX[status] ?? 1;

  return (
    <div className="order-timeline">
      {STEPS.map((step, index) => {
        const isComplete = index <= activeIndex;
        const isActive = index === activeIndex;

        return (
          <div key={step.key} className={`timeline-step ${isComplete ? 'complete' : ''} ${isActive ? 'active' : ''}`}>
            <motion.div
              className="timeline-icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.15, type: 'spring', stiffness: 200 }}
            >
              {step.icon}
            </motion.div>
            <span className="timeline-label">{step.label}</span>
            {index < STEPS.length - 1 && (
              <motion.div
                className="timeline-line"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isComplete ? 1 : 0 }}
                transition={{ delay: index * 0.15 + 0.1, duration: 0.4 }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OrderTimeline;
