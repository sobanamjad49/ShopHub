import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { useProducts } from '../../context/ProductContext';
import ProductImage from '../../components/common/ProductImage';
import ProductFormModal from '../../components/admin/ProductFormModal';
import AdminSidebar from '../../components/admin/AdminSidebar';
import OrderTimeline from '../../components/common/OrderTimeline';
import CountUp from '../../components/common/CountUp';
import { useToast } from '../../context/ToastContext';
import './AdminDashboard.css';

const PIE_COLORS = ['#667eea', '#764ba2', '#f6ad55', '#48bb78', '#fc8181'];

const sectionVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const AdminDashboard = () => {
  const { products, addProduct, updateProduct, deleteProduct, resetProducts } = useProducts();
  const { showToast } = useToast();
  const [orders, setOrders] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('orders');
      if (stored) setOrders(JSON.parse(stored));
    } catch {
      setOrders([]);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMobileSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileSidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileSidebarOpen]);

  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((sum, o) => sum + parseFloat(o.total), 0);
    const customers = new Set(orders.map((o) => o.customerInfo?.email)).size;
    const avgOrder = orders.length ? totalRevenue / orders.length : 0;
    const lowStock = products.filter((p) => (p.stock ?? 99) < 10).length;
    return { totalOrders: orders.length, totalRevenue, totalProducts: products.length, totalCustomers: customers, avgOrder, lowStock };
  }, [orders, products]);

  const revenueData = useMemo(() => {
    return orders.slice(-7).map((o, i) => ({
      name: `#${String(o.id).slice(-4)}`,
      revenue: parseFloat(o.total),
      date: o.date,
    }));
  }, [orders]);

  const categoryData = useMemo(() => {
    const counts = {};
    products.forEach((p) => { counts[p.category] = (counts[p.category] || 0) + 1; });
    return Object.entries(counts).map(([name, count]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      count,
    }));
  }, [products]);

  const statusData = useMemo(() => {
    const counts = {};
    orders.forEach((o) => { counts[o.status || 'Processing'] = (counts[o.status || 'Processing'] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [orders]);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const q = searchQuery.toLowerCase();
    return products.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }, [products, searchQuery]);

  const recentOrders = orders.slice(-5).reverse();

  const handleSaveProduct = (data) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, data);
      showToast('Product updated successfully!');
    } else {
      addProduct(data);
      showToast('Product added successfully!');
    }
    setEditingProduct(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this product?')) {
      deleteProduct(id);
      showToast('Product deleted', 'error');
    }
  };

  const handleExport = () => {
    const data = { products, orders, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shophub-data.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Data exported successfully!');
  };

  const handleReset = () => {
    if (window.confirm('Reset all products to defaults?')) {
      resetProducts();
      showToast('Products reset to defaults');
    }
  };

  const sectionTitles = {
    overview: 'Dashboard Overview',
    orders: 'Order Management',
    products: 'Product Management',
    analytics: 'Analytics & Reports',
    settings: 'Settings',
  };

  const renderOverview = () => (
    <>
      <div className="stats-grid">
        {[
          { icon: '📦', label: 'Total Orders', value: stats.totalOrders, trend: '+12%', color: '#667eea' },
          { icon: '💰', label: 'Revenue', value: stats.totalRevenue, prefix: '$', decimals: 2, trend: '+8%', color: '#48bb78' },
          { icon: '🛍️', label: 'Products', value: stats.totalProducts, trend: `${stats.lowStock} low stock`, color: '#f6ad55' },
          { icon: '👥', label: 'Customers', value: stats.totalCustomers, trend: 'Active', color: '#fc8181' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className="stat-card glass"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -6, boxShadow: '0 12px 40px rgba(102,126,234,0.2)' }}
          >
            <div className="stat-card-accent" style={{ background: stat.color }} />
            <div className="stat-icon-wrap" style={{ background: `${stat.color}18` }}>{stat.icon}</div>
            <div className="stat-info">
              <p className="stat-label">{stat.label}</p>
              <p className="stat-value">
                <CountUp value={stat.value} prefix={stat.prefix || ''} decimals={stat.decimals || 0} />
              </p>
              <span className="stat-trend">{stat.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="charts-row">
        <div className="chart-section glass">
          <div className="section-header">
            <h2>Revenue Trend</h2>
            <span className="section-badge">Last 7 orders</span>
          </div>
          <div className="chart-container">
            {revenueData.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={revenueData}>
                  <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#667eea" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#667eea" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e8ecf4" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v) => [`$${Number(v).toFixed(2)}`, 'Revenue']} />
                  <Line type="monotone" dataKey="revenue" stroke="#667eea" strokeWidth={3} dot={{ fill: '#667eea', r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="empty-chart"><span>📊</span><p>Place orders to see revenue data</p></div>
            )}
          </div>
        </div>

        <div className="chart-section glass">
          <div className="section-header">
            <h2>Quick Stats</h2>
          </div>
          <div className="quick-stats">
            <div className="quick-stat-item">
              <span className="qs-label">Avg. Order Value</span>
              <span className="qs-value">${stats.avgOrder.toFixed(2)}</span>
            </div>
            <div className="quick-stat-item">
              <span className="qs-label">Low Stock Items</span>
              <span className="qs-value warning">{stats.lowStock}</span>
            </div>
            <div className="quick-stat-item">
              <span className="qs-label">Categories</span>
              <span className="qs-value">{categoryData.length}</span>
            </div>
            {recentOrders[0] && (
              <div className="latest-order-mini">
                <span className="qs-label">Latest Order</span>
                <p>#{recentOrders[0].id} — ${recentOrders[0].total}</p>
                <OrderTimeline status={recentOrders[0].status} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );

  const renderOrders = () => (
    <div className="orders-section glass">
      <div className="section-header">
        <h2>All Orders</h2>
        <span className="section-badge">{orders.length} total</span>
      </div>
      {orders.length > 0 ? (
        <div className="orders-table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice().reverse().map((order, i) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <td><span className="order-id-badge">#{order.id}</span></td>
                  <td>{order.customerInfo.firstName} {order.customerInfo.lastName}</td>
                  <td>{order.customerInfo.email}</td>
                  <td>{order.items.length}</td>
                  <td className="price-cell">${order.total}</td>
                  <td><span className={`status-badge status-${(order.status || 'processing').toLowerCase()}`}>{order.status}</span></td>
                  <td>{order.date}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-chart"><span>📦</span><p>No orders yet</p></div>
      )}
    </div>
  );

  const renderProducts = () => (
    <div className="products-section glass">
      <div className="section-header">
        <h2>Products</h2>
        <div className="section-actions">
          <input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="admin-search"
          />
          <button className="action-btn" onClick={() => { setEditingProduct(null); setModalOpen(true); }}>
            + Add Product
          </button>
        </div>
      </div>
      <div className="products-table-wrapper">
        <table className="products-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, i) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02 }}
                layout
              >
                <td>
                  <ProductImage src={product.image} alt={product.name} className="admin-product-thumb" />
                </td>
                <td className="product-name-cell">{product.name}</td>
                <td><span className="category-tag">{product.category}</span></td>
                <td className="price-cell">${product.price.toFixed(2)}</td>
                <td>
                  <span className={`stock-badge ${(product.stock ?? 99) < 10 ? 'low' : ''}`}>
                    {product.stock ?? '—'}
                  </span>
                </td>
                <td>⭐ {product.rating}</td>
                <td className="action-cell">
                  <button className="edit-product-btn" onClick={() => { setEditingProduct(product); setModalOpen(true); }}>Edit</button>
                  <button className="delete-product-btn" onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="analytics-grid">
      <div className="chart-section glass full-width">
        <div className="section-header"><h2>Revenue Over Time</h2></div>
        <div className="chart-container tall">
          {revenueData.length > 0 ? (
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8ecf4" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(v) => [`$${Number(v).toFixed(2)}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="url(#barGrad)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#667eea" />
                    <stop offset="100%" stopColor="#764ba2" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty-chart"><span>📈</span><p>No analytics data yet</p></div>
          )}
        </div>
      </div>

      <div className="chart-section glass">
        <div className="section-header"><h2>Products by Category</h2></div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={categoryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e8ecf4" />
              <XAxis type="number" allowDecimals={false} />
              <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#667eea" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-section glass">
        <div className="section-header"><h2>Order Status</h2></div>
        <div className="chart-container">
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                  {statusData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty-chart"><span>🥧</span><p>No order status data</p></div>
          )}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="settings-section">
      <div className="settings-card glass">
        <div className="settings-icon">📦</div>
        <h3>Product Catalog</h3>
        <p>Reset all products to the default catalog. This cannot be undone.</p>
        <button className="action-btn danger" onClick={handleReset}>Reset Products</button>
      </div>
      <div className="settings-card glass">
        <div className="settings-icon">💾</div>
        <h3>Export Data</h3>
        <p>Download all products and orders as a JSON file for backup.</p>
        <button className="action-btn" onClick={handleExport}>Export JSON</button>
      </div>
      <div className="settings-card glass">
        <div className="settings-icon">📊</div>
        <h3>Store Stats</h3>
        <ul className="settings-stats-list">
          <li><span>Total Products</span><strong>{stats.totalProducts}</strong></li>
          <li><span>Total Orders</span><strong>{stats.totalOrders}</strong></li>
          <li><span>Total Revenue</span><strong>${stats.totalRevenue.toFixed(2)}</strong></li>
          <li><span>Storage Keys</span><strong>ecommerce_products, orders, ecommerce_cart</strong></li>
        </ul>
      </div>
    </div>
  );

  const sections = {
    overview: renderOverview,
    orders: renderOrders,
    products: renderProducts,
    analytics: renderAnalytics,
    settings: renderSettings,
  };

  return (
    <div className={`admin-dashboard ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {mobileSidebarOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          aria-label="Close menu"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <AdminSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="topbar-left">
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="Open menu"
            >
              ☰
            </button>
            <div>
              <h1>{sectionTitles[activeSection]}</h1>
              <p className="topbar-subtitle">Welcome back, Admin</p>
            </div>
          </div>
          <div className="topbar-right">
            <span className="live-badge"><span className="live-dot" /> Live</span>
            <span className="topbar-date">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
        </header>

        <div className="admin-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              {sections[activeSection]()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <ProductFormModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingProduct(null); }}
        onSave={handleSaveProduct}
        product={editingProduct}
      />
    </div>
  );
};

export default AdminDashboard;
