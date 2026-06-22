import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CompanyDetails({ user, onUpdateUser }) {
  const [formData, setFormData] = useState({
    companyName: user.companyName || 'Binary Brians LLC',
    gstNumber: user.gstNumber || '29AAAAA1111A1Z1',
    businessEmail: 'billing@binarybrians.com',
    businessPhone: '+91 (80) 555-0199',
    businessAddress: 'Building A, Tech Innovations Park, Outer Ring Road, Bangalore, 560103',
    website: 'https://binarybrians.com'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      onUpdateUser({
        ...user,
        companyName: formData.companyName,
        gstNumber: formData.gstNumber
      });
      setTimeout(() => setSuccess(false), 4000);
    }, 1000);
  };

  return (
    <div className="row justify-content-center" id="company-details-page">
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
              <h4 className="fw-bold text-dark mb-1" style={{ fontFamily: 'Outfit' }}>Company Details</h4>
              <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>Configure details for invoice metadata and tax headers</p>
            </div>
            <span className="badge bg-secondary-subtle text-secondary-emphasis rounded-pill px-3 py-2 fw-bold" style={{ fontSize: '0.8rem' }}>
              Merchant Registry
            </span>
          </div>

          <form onSubmit={handleSave}>
            <div className="row g-3">
              <div className="col-md-6 col-12">
                <div className="form-floating mb-1">
                  <input 
                    type="text" 
                    className="form-control rounded-3" 
                    id="company-name-input" 
                    placeholder="Company Name"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    disabled={loading}
                  />
                  <label htmlFor="company-name-input">Company Name</label>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="form-floating mb-1">
                  <input 
                    type="text" 
                    className="form-control rounded-3" 
                    id="company-gst-input" 
                    placeholder="GST Number"
                    required
                    value={formData.gstNumber}
                    onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                    disabled={loading}
                  />
                  <label htmlFor="company-gst-input">GST Number</label>
                </div>
              </div>

              <div className="col-md-6 col-12">
                <div className="form-floating mb-1">
                  <input 
                    type="email" 
                    className="form-control rounded-3" 
                    id="company-email-input" 
                    placeholder="billing@company.com"
                    required
                    value={formData.businessEmail}
                    onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                    disabled={loading}
                  />
                  <label htmlFor="company-email-input">Business Email</label>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="form-floating mb-1">
                  <input 
                    type="text" 
                    className="form-control rounded-3" 
                    id="company-phone-input" 
                    placeholder="Business Phone"
                    required
                    value={formData.businessPhone}
                    onChange={(e) => setFormData({ ...formData, businessPhone: e.target.value })}
                    disabled={loading}
                  />
                  <label htmlFor="company-phone-input">Business Phone</label>
                </div>
              </div>

              <div className="col-12">
                <div className="form-floating mb-2">
                  <input 
                    type="url" 
                    className="form-control rounded-3" 
                    id="company-website-input" 
                    placeholder="Website"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    disabled={loading}
                  />
                  <label htmlFor="company-website-input">Website URL</label>
                </div>
              </div>

              <div className="col-12">
                <div className="form-floating mb-4">
                  <textarea 
                    className="form-control rounded-3" 
                    placeholder="Business Address" 
                    id="company-address-input" 
                    style={{ height: '100px' }}
                    required
                    value={formData.businessAddress}
                    onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
                    disabled={loading}
                  ></textarea>
                  <label htmlFor="company-address-input">Business Address</label>
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
              <button 
                type="submit" 
                id="company-save-btn"
                className="btn btn-premium px-5 py-2.5"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Saving...
                  </>
                ) : (
                  'Save Details'
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
                    Company details saved successfully!
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
