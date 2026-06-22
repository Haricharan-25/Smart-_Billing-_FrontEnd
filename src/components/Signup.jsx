import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15, filter: 'blur(3px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

const leftItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function Signup({ onLogin }) {
  const navigate = useNavigate();
  const [role, setRole] = useState('Admin');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    if (!agree) {
      setErrorMsg('You must agree to the Terms & Conditions.');
      return;
    }

    setLoading(true);
    // Simulate user creation API
    setTimeout(() => {
      setLoading(false);
      onLogin({
        role,
        email,
        name: fullName,
        phone,
        companyName,
        gstNumber
      });
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="auth-split-container d-flex flex-lg-row flex-column" id="signup-page">
      {/* Left Panel: Unified benefits list */}
      <div className="auth-left-panel col-lg-5 col-12 d-flex flex-column justify-content-center">
        <motion.div 
          style={{ maxWidth: '440px', margin: '0 auto' }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={leftItemVariants}>
            <Link to="/" className="d-flex align-items-center gap-2 mb-5 text-decoration-none text-white">
              <div className="d-flex align-items-center justify-content-center" style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'white',
                color: 'var(--primary)',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                fontFamily: 'Outfit'
              }}>
                BB
              </div>
              <span className="fw-bold fs-4 tracking-tight" style={{ fontFamily: 'Outfit' }}>BB Smart Biller</span>
            </Link>
          </motion.div>

          <motion.h2 className="display-6 fw-bold mb-4" style={{ fontFamily: 'Outfit' }} variants={leftItemVariants}>
            Elevate Your Business Billing Workflow
          </motion.h2>
          
          <motion.p className="text-white-50 mb-5" variants={leftItemVariants}>
            Join thousands of modern operators managing invoicing, customer databases, tax configurations, and stock items on autopilot.
          </motion.p>

          <div className="d-flex flex-column gap-3 mb-4">
            {[
              'Automated Billing',
              'GST Management',
              'Inventory Tracking',
              'Cloud Backup',
              'Secure Access'
            ].map((benefit, bIdx) => (
              <motion.div 
                key={bIdx}
                className="d-flex align-items-center gap-3"
                variants={leftItemVariants}
              >
                <i className="bi bi-patch-check-fill text-primary fs-5"></i>
                <span className="fw-medium">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Panel: Signup Glass Card */}
      <div className="auth-right-panel col-lg-7 col-12">
        <motion.div 
          className="card glass-card p-4 p-md-5 rounded-4 shadow-sm w-100" 
          style={{ maxWidth: '560px', border: '1px solid rgba(255,255,255,0.7)' }}
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Back to Home Link */}
            <motion.div variants={itemVariants}>
              <Link to="/" className="text-decoration-none text-primary fw-semibold d-inline-flex align-items-center gap-2 mb-4 hover-primary" id="signup-back-home">
                <i className="bi bi-arrow-left"></i> Back to Home
              </Link>
            </motion.div>

            {/* Title headers */}
            <motion.div className="mb-4" variants={itemVariants}>
              <h3 className="fw-bold text-dark mb-1" style={{ fontFamily: 'Outfit' }}>Create Account</h3>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>Fill in details to setup your merchant profile</p>
            </motion.div>

            <form onSubmit={handleSubmit}>
              {errorMsg && (
                <motion.div className="alert alert-danger py-2" role="alert" style={{ fontSize: '0.85rem' }} variants={itemVariants}>
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {errorMsg}
                </motion.div>
              )}

              {/* Role Selection */}
              <motion.div className="mb-4" variants={itemVariants}>
                <label className="form-label text-muted fw-semibold mb-2" style={{ fontSize: '0.75rem', uppercase: 'true' }}>Select Your Role</label>
                <div className="row g-2">
                  {['Admin', 'Retailer', 'Customer'].map((r) => (
                    <div key={r} className="col-4">
                      <button
                        type="button"
                        id={`signup-role-btn-${r.toLowerCase()}`}
                        className={`btn w-100 py-2 rounded-3 fw-semibold border transition-all ${
                          role === r 
                            ? 'btn-primary border-primary shadow-sm' 
                            : 'btn-light border-light-subtle text-dark-emphasis'
                        }`}
                        style={{ fontSize: '0.85rem' }}
                        onClick={() => setRole(r)}
                      >
                        {r}
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Info Grid */}
              <div className="row g-2">
                <div className="col-md-6 col-12">
                  <motion.div className="form-floating mb-2" variants={itemVariants}>
                    <input 
                      type="text" 
                      className="form-control rounded-3" 
                      id="signup-fullname-input" 
                      placeholder="Full Name"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      disabled={loading}
                    />
                    <label htmlFor="signup-fullname-input">Full Name</label>
                  </motion.div>
                </div>
                <div className="col-md-6 col-12">
                  <motion.div className="form-floating mb-2" variants={itemVariants}>
                    <input 
                      type="email" 
                      className="form-control rounded-3" 
                      id="signup-email-input" 
                      placeholder="name@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                    />
                    <label htmlFor="signup-email-input">Email Address</label>
                  </motion.div>
                </div>

                <div className="col-md-6 col-12">
                  <motion.div className="form-floating mb-2" variants={itemVariants}>
                    <input 
                      type="tel" 
                      className="form-control rounded-3" 
                      id="signup-phone-input" 
                      placeholder="Phone Number"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={loading}
                    />
                    <label htmlFor="signup-phone-input">Phone Number</label>
                  </motion.div>
                </div>
                <div className="col-md-6 col-12">
                  <motion.div className="form-floating mb-2" variants={itemVariants}>
                    <input 
                      type="text" 
                      className="form-control rounded-3" 
                      id="signup-company-input" 
                      placeholder="Company Name"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      disabled={loading}
                    />
                    <label htmlFor="signup-company-input">Company Name</label>
                  </motion.div>
                </div>

                <div className="col-12">
                  <motion.div className="form-floating mb-2" variants={itemVariants}>
                    <input 
                      type="text" 
                      className="form-control rounded-3" 
                      id="signup-gst-input" 
                      placeholder="GST Number"
                      value={gstNumber}
                      onChange={(e) => setGstNumber(e.target.value)}
                      disabled={loading}
                    />
                    <label htmlFor="signup-gst-input">GST Number (Optional)</label>
                  </motion.div>
                </div>

                <div className="col-md-6 col-12">
                  <motion.div className="form-floating mb-2" variants={itemVariants}>
                    <input 
                      type="password" 
                      className="form-control rounded-3" 
                      id="signup-password-input" 
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                    />
                    <label htmlFor="signup-password-input">Password</label>
                  </motion.div>
                </div>
                <div className="col-md-6 col-12">
                  <motion.div className="form-floating mb-3" variants={itemVariants}>
                    <input 
                      type="password" 
                      className="form-control rounded-3" 
                      id="signup-confirm-input" 
                      placeholder="Confirm Password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={loading}
                    />
                    <label htmlFor="signup-confirm-input">Confirm Password</label>
                  </motion.div>
                </div>
              </div>

              {/* Terms and Conditions Checkbox */}
              <motion.div className="form-check mb-4" variants={itemVariants}>
                <input 
                  type="checkbox" 
                  className="form-check-input" 
                  id="signup-agree-checkbox"
                  required
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  disabled={loading}
                />
                <label className="form-check-label text-muted" htmlFor="signup-agree-checkbox" style={{ fontSize: '0.85rem' }}>
                  I agree to the <a href="#" className="text-primary text-decoration-none fw-semibold">Terms & Conditions</a>
                </label>
              </motion.div>

              {/* Create Account Submit */}
              <motion.div variants={itemVariants} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <button 
                  type="submit" 
                  id="signup-submit-btn"
                  className="btn btn-premium w-100 py-3 mb-4"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </motion.div>
            </form>

            {/* Login redirect link */}
            <motion.div className="text-center" variants={itemVariants}>
              <span className="text-muted" style={{ fontSize: '0.9rem' }}>Already have an account? </span>
              <Link 
                id="signup-login-link"
                to="/login" 
                className="text-primary fw-bold text-decoration-none"
                style={{ fontSize: '0.9rem' }}
              >
                Login
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
