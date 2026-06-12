import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedPage from '../../components/common/AnimatedPage';
import './Profile.css';

const defaultProfile = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '+1 (555) 123-4567',
  address: '123 Main Street',
  city: 'New York',
  state: 'NY',
  zip: '10001',
};

const ADDRESSES_KEY = 'userAddresses';

const Profile = () => {
  const [profile, setProfile] = useState(defaultProfile);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(defaultProfile);
  const [showToast, setShowToast] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({ label: 'Home', address: '', city: '', state: '', zip: '' });

  useEffect(() => {
    try {
      const stored = localStorage.getItem('userProfile');
      if (stored) {
        const parsed = JSON.parse(stored);
        setProfile(parsed);
        setFormData(parsed);
      }
      const storedAddresses = localStorage.getItem(ADDRESSES_KEY);
      if (storedAddresses) {
        setAddresses(JSON.parse(storedAddresses));
      }
    } catch {
      // use defaults
    }
  }, []);

  const saveAddresses = (updated) => {
    setAddresses(updated);
    localStorage.setItem(ADDRESSES_KEY, JSON.stringify(updated));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setProfile(formData);
    setEditMode(false);
    localStorage.setItem('userProfile', JSON.stringify(formData));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCancel = () => {
    setFormData(profile);
    setEditMode(false);
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddress.address.trim()) return;
    const updated = [...addresses, { ...newAddress, id: Date.now() }];
    saveAddresses(updated);
    setNewAddress({ label: 'Home', address: '', city: '', state: '', zip: '' });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDeleteAddress = (id) => {
    saveAddresses(addresses.filter((a) => a.id !== id));
  };

  const tabs = [
    { id: 'profile', label: 'My Profile' },
    { id: 'addresses', label: 'Addresses' },
    { id: 'orders', label: 'My Orders', link: '/orders' },
  ];

  return (
    <AnimatedPage className="profile-page">
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="profile-toast"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            ✓ Saved successfully!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="profile-container">
        <motion.div
          className="profile-sidebar glass-card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="profile-avatar">
            <div className="avatar-placeholder">👤</div>
            <h2>{profile.firstName} {profile.lastName}</h2>
            <p className="user-email">{profile.email}</p>
          </div>
          <nav className="profile-nav">
            {tabs.map((tab) =>
              tab.link ? (
                <Link key={tab.id} to={tab.link} className="nav-btn">{tab.label}</Link>
              ) : (
                <button
                  key={tab.id}
                  type="button"
                  className={`nav-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              )
            )}
          </nav>
        </motion.div>

        <motion.div
          className="profile-content glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {activeTab === 'profile' && (
            <>
              <h1>My Profile</h1>

              {!editMode ? (
                <div className="profile-info">
                  <div className="info-section">
                    <h3>Personal Information</h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <label>First Name</label>
                        <p>{profile.firstName}</p>
                      </div>
                      <div className="info-item">
                        <label>Last Name</label>
                        <p>{profile.lastName}</p>
                      </div>
                      <div className="info-item">
                        <label>Email</label>
                        <p>{profile.email}</p>
                      </div>
                      <div className="info-item">
                        <label>Phone</label>
                        <p>{profile.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="info-section">
                    <h3>Default Address</h3>
                    <div className="info-grid">
                      <div className="info-item full">
                        <label>Street Address</label>
                        <p>{profile.address}</p>
                      </div>
                      <div className="info-item">
                        <label>City</label>
                        <p>{profile.city}</p>
                      </div>
                      <div className="info-item">
                        <label>State</label>
                        <p>{profile.state}</p>
                      </div>
                      <div className="info-item">
                        <label>ZIP Code</label>
                        <p>{profile.zip}</p>
                      </div>
                    </div>
                  </div>

                  <button className="edit-btn" onClick={() => setEditMode(true)}>
                    ✏️ Edit Profile
                  </button>
                </div>
              ) : (
                <form className="profile-form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                  <fieldset>
                    <legend>Personal Information</legend>
                    <div className="form-row">
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
                    </div>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" />
                  </fieldset>

                  <fieldset>
                    <legend>Address</legend>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Street Address" />
                    <div className="form-row">
                      <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
                      <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" />
                      <input type="text" name="zip" value={formData.zip} onChange={handleChange} placeholder="ZIP Code" />
                    </div>
                  </fieldset>

                  <div className="form-actions">
                    <button type="submit" className="save-btn">Save Changes</button>
                    <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
                  </div>
                </form>
              )}
            </>
          )}

          {activeTab === 'addresses' && (
            <>
              <h1>Address Management</h1>

              {addresses.length > 0 ? (
                <div className="addresses-list">
                  {addresses.map((addr) => (
                    <div key={addr.id} className="address-card">
                      <div className="address-label">{addr.label}</div>
                      <p>{addr.address}</p>
                      <p>{addr.city}, {addr.state} {addr.zip}</p>
                      <button type="button" className="delete-address" onClick={() => handleDeleteAddress(addr.id)}>
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-addresses">No saved addresses yet. Add one below.</p>
              )}

              <form className="add-address-form" onSubmit={handleAddAddress}>
                <h3>Add New Address</h3>
                <select
                  value={newAddress.label}
                  onChange={(e) => setNewAddress((prev) => ({ ...prev, label: e.target.value }))}
                >
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
                </select>
                <input
                  type="text"
                  placeholder="Street Address"
                  value={newAddress.address}
                  onChange={(e) => setNewAddress((prev) => ({ ...prev, address: e.target.value }))}
                  required
                />
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="City"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress((prev) => ({ ...prev, city: e.target.value }))}
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={newAddress.state}
                    onChange={(e) => setNewAddress((prev) => ({ ...prev, state: e.target.value }))}
                  />
                  <input
                    type="text"
                    placeholder="ZIP"
                    value={newAddress.zip}
                    onChange={(e) => setNewAddress((prev) => ({ ...prev, zip: e.target.value }))}
                  />
                </div>
                <button type="submit" className="save-btn">Add Address</button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatedPage>
  );
};

export default Profile;
