import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PersonalDetails({ user, onUpdateUser }) {
  const [formData, setFormData] = useState({
    fullName: user.name || '',
    email: user.email || '',
    phone: user.phone || '+91 98765 43210',
    address: '102 Tech Enclave, Phase 3',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [avatar, setAvatar] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      onUpdateUser({
        ...user,
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone
      });
      setTimeout(() => setSuccess(false), 4000);
    }, 1000);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="row justify-content-center" id="personal-details-page">
      <div className="col-lg-8 col-12">
        <motion.div
          className="card glass-card p-4 p-md-5 rounded-4 shadow-sm"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ border: '1px solid rgba(255,255,255,0.7)' }}
        >
          <div className="mb-4 pb-3 border-bottom d-flex align-items-center justify-content-between">
            <div>
              <h4 className="fw-bold text-dark mb-1" style={{ fontFamily: 'Outfit' }}>Personal Details</h4>
              <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>Update your user profile and identity credentials</p>
            </div>
            <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 fw-bold" style={{ fontSize: '0.8rem' }}>
              {user.role} Account
            </span>
          </div>

          <form onSubmit={handleSave}>
            {/* Avatar Selection */}
            <div className="d-flex align-items-center gap-4 mb-4 pb-2">
              <div className="position-relative">
                <div 
                  className="rounded-circle bg-primary text-white fw-bold d-flex align-items-center justify-content-center border shadow-sm" 
                  style={{ width: '80px', height: '80px', fontSize: '2rem', overflow: 'hidden' }}
                >
                  {avatar ? (
                    <img src={avatar} alt="Avatar Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    formData.fullName.charAt(0).toUpperCase()
                  )}
                </div>
                <label 
                  htmlFor="avatar-upload" 
                  className="position-absolute bottom-0 end-0 bg-white border rounded-circle shadow-sm d-flex align-items-center justify-content-center text-primary cursor-pointer"
                  style={{ width: '28px', height: '28px', cursor: 'pointer' }}
                >
                  <i className="bi bi-camera-fill" style={{ fontSize: '0.85rem' }}></i>
                </label>
                <input 
                  type="file" 
                  id="avatar-upload" 
                  className="d-none" 
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </div>
              <div>
                <h6 className="fw-bold mb-1 text-dark">Profile Image</h6>
                <p className="text-muted mb-0" style={{ fontSize: '0.8rem' }}>Allowed formats: PNG, JPG, GIF. Max size 2MB.</p>
              </div>
            </div>

            {/* Fields Grid */}
            <div className="row g-3">
              <div className="col-md-6 col-12">
                <div className="form-floating mb-1">
                  <input 
                    type="text" 
                    className="form-control rounded-3" 
                    id="profile-name-input" 
                    placeholder="Full Name"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    disabled={loading}
                  />
                  <label htmlFor="profile-name-input">Full Name</label>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="form-floating mb-1">
                  <input 
                    type="email" 
                    className="form-control rounded-3" 
                    id="profile-email-input" 
                    placeholder="name@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={loading}
                  />
                  <label htmlFor="profile-email-input">Email Address</label>
                </div>
              </div>

              <div className="col-md-6 col-12">
                <div className="form-floating mb-1">
                  <input 
                    type="text" 
                    className="form-control rounded-3" 
                    id="profile-phone-input" 
                    placeholder="Phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={loading}
                  />
                  <label htmlFor="profile-phone-input">Phone Number</label>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="form-floating mb-1">
                  <input 
                    type="text" 
                    className="form-control rounded-3" 
                    id="profile-address-input" 
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    disabled={loading}
                  />
                  <label htmlFor="profile-address-input">Street Address</label>
                </div>
              </div>

              <div className="col-md-4 col-12">
                <div className="form-floating mb-1">
                  <input 
                    type="text" 
                    className="form-control rounded-3" 
                    id="profile-city-input" 
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    disabled={loading}
                  />
                  <label htmlFor="profile-city-input">City</label>
                </div>
              </div>
              <div className="col-md-4 col-6">
                <div className="form-floating mb-1">
                  <input 
                    type="text" 
                    className="form-control rounded-3" 
                    id="profile-state-input" 
                    placeholder="State"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    disabled={loading}
                  />
                  <label htmlFor="profile-state-input">State</label>
                </div>
              </div>
              <div className="col-md-4 col-6">
                <div className="form-floating mb-4">
                  <input 
                    type="text" 
                    className="form-control rounded-3" 
                    id="profile-country-input" 
                    placeholder="Country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    disabled={loading}
                  />
                  <label htmlFor="profile-country-input">Country</label>
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
              <button 
                type="submit" 
                id="profile-save-btn"
                className="btn btn-premium px-5 py-2.5"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Saving Changes...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>

              <AnimatePresence>
                {success && (
                  <motion.div
                    className="text-success fw-semibold d-flex align-items-center gap-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <i className="bi bi-check-circle-fill"></i>
                    Profile updated successfully!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
