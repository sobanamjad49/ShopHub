import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './AdminSidebar.css';

const NAV_ITEMS = [
  { id: 'overview', icon: '📊', label: 'Overview' },
  { id: 'orders', icon: '📦', label: 'Orders' },
  { id: 'products', icon: '🛍️', label: 'Products' },
  { id: 'analytics', icon: '📈', label: 'Analytics' },
  { id: 'settings', icon: '⚙️', label: 'Settings' },
];

const AdminSidebar = ({
  activeSection,
  onSectionChange,
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
}) => {
  const handleNavClick = (id) => {
    onSectionChange(id);
    onMobileClose?.();
  };

  return (
    <aside
      className={`admin-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
    >
      <div className="sidebar-brand">
        <Link to="/" className="brand-link">
          <span className="brand-icon">🛒</span>
          {!collapsed && <span className="brand-text">ShopHub</span>}
        </Link>
        <button
          type="button"
          className="sidebar-mobile-close"
          onClick={onMobileClose}
          aria-label="Close menu"
        >
          ✕
        </button>
        <button
          type="button"
          className="sidebar-toggle"
          onClick={onToggle}
          aria-label="Toggle sidebar"
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {!collapsed && <div className="sidebar-label">ADMIN PANEL</div>}

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item, i) => (
          <motion.button
            key={item.id}
            type="button"
            className={`sidebar-nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => handleNavClick(item.id)}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ x: collapsed ? 0 : 4 }}
            whileTap={{ scale: 0.98 }}
            title={collapsed ? item.label : undefined}
          >
            <span className="nav-icon">{item.icon}</span>
            {!collapsed && <span className="nav-label">{item.label}</span>}
            {activeSection === item.id && (
              <motion.div
                className="nav-indicator"
                layoutId="sidebar-indicator"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <Link to="/" className="back-to-store" onClick={onMobileClose}>
          <span>🏠</span>
          {!collapsed && <span>Back to Store</span>}
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
