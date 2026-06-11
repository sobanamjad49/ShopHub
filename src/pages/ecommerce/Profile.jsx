import React, { useState, useEffect } from 'react';
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

const Profile = () => {
  const [profile, setProfile] = useState(defaultProfile);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(defaultProfile);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('userProfile');
      if (stored) {
        const parsed = JSON.parse(stored);
        setProfile(parsed);
        setFormData(parsed);
      }
    } catch {
      // use defaults
    }
  }, []);

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
            ✓ Profile updated successfully!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="profile-container">
        <motion.div
          className="profile-sidebar"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="profile-avatar">
            <div className="avatar-placeholder">👤</div>
            <h2>{profile.firstName} {profile.lastName}</h2>
            <p className="user-email">{profile.email}</p>
          </div>
          <nav className="profile-nav">
            <button className="nav-btn active">My Profile</button>
            <button className="nav-btn">My Orders</button>
            <button className="nav-btn">Addresses</button>
            <button className="nav-btn">Payment Methods</button>
            <button className="nav-btn">Settings</button>
          </nav>
        </motion.div>

        <motion.div
          className="profile-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
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
                <h3>Address</h3>
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
        </motion.div>
      </div>
    </AnimatedPage>
  );
};

export default Profile;
