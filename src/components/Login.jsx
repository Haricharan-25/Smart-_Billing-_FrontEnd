import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15, filter: 'blur(4px)' },
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

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [role, setRole] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    // Simulate API authorization
    setTimeout(() => {
      setLoading(false);
      onLogin({
        role,
        email,
        name: role === 'Admin' ? 'Admin User' : role === 'Retailer' ? 'Retailer Shop owner' : 'Customer Client',
        companyName: role === 'Admin' ? 'Binary Brians Corp' : role === 'Retailer' ? 'Express Mart' : ''
      });
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="auth-split-container d-flex flex-lg-row flex-column" id="login-page">
      {/* Left Panel: Benefits list */}
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

      {/* Right Panel: Login Glass Card */}
      <div className="auth-right-panel col-lg-7 col-12">
        <motion.div 
          className="card glass-card p-4 p-md-5 rounded-4 shadow-sm w-100" 
          style={{ maxWidth: '520px', border: '1px solid rgba(255,255,255,0.7)' }}
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Back to home arrow */}
            <motion.div variants={itemVariants}>
              <Link to="/" className="text-decoration-none text-primary fw-semibold d-inline-flex align-items-center gap-2 mb-4 hover-primary" id="login-back-home">
                <i className="bi bi-arrow-left"></i> Back to Home
              </Link>
            </motion.div>

            {/* Welcome messages */}
            <motion.div className="mb-4" variants={itemVariants}>
              <h3 className="fw-bold text-dark mb-1" style={{ fontFamily: 'Outfit' }}>Welcome back</h3>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>Please enter your credentials to login</p>
            </motion.div>

            <form onSubmit={handleSubmit}>
              {/* Role Selection */}
              <motion.div className="mb-4" variants={itemVariants}>
                <label className="form-label text-muted fw-semibold mb-2" style={{ fontSize: '0.75rem', uppercase: 'true' }}>Select Your Role</label>
                <div className="row g-2">
                  {['Admin', 'Retailer', 'Customer'].map((r) => (
                    <div key={r} className="col-4">
                      <button
                        type="button"
                        id={`role-btn-${r.toLowerCase()}`}
                        className={`btn w-100 py-2.5 rounded-3 fw-semibold border transition-all ${
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

              {/* Email Field */}
              <motion.div className="form-floating mb-3" variants={itemVariants}>
                <input 
                  type="email" 
                  className="form-control rounded-3" 
                  id="login-email-input" 
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
                <label htmlFor="login-email-input">Email Address</label>
              </motion.div>

              {/* Password Field */}
              <motion.div className="form-floating mb-3" variants={itemVariants}>
                <input 
                  type="password" 
                  className="form-control rounded-3" 
                  id="login-password-input" 
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <label htmlFor="login-password-input">Password</label>
              </motion.div>

              {/* Options */}
              <motion.div className="d-flex align-items-center justify-content-between mb-4" variants={itemVariants}>
                <div className="form-check">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="login-remember-me"
                    disabled={loading}
                  />
                  <label className="form-check-label text-muted" htmlFor="login-remember-me" style={{ fontSize: '0.85rem' }}>Remember Me</label>
                </div>
                <Link 
                  id="login-forgot-password-link"
                  to="/forgot-password" 
                  className="text-primary text-decoration-none fw-semibold" 
                  style={{ fontSize: '0.85rem' }}
                >
                  Forgot Password?
                </Link>
              </motion.div>

              {/* Login Button */}
              <motion.div variants={itemVariants} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <button 
                  type="submit" 
                  id="login-submit-btn"
                  className="btn btn-premium w-100 py-3 mb-3 d-flex align-items-center justify-content-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Logging in...
                    </>
                  ) : (
                    <>
                      Login
                      <i className="bi bi-box-arrow-in-right"></i>
                    </>
                  )}
                </button>
              </motion.div>

              {/* Continue with Google */}
              <motion.div variants={itemVariants} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <button 
                  type="button" 
                  id="login-google-btn"
                  className="btn btn-light border border-light-subtle w-100 py-3 rounded-pill fw-semibold text-dark-emphasis mb-4 d-flex align-items-center justify-content-center gap-2"
                  onClick={() => {
                    onLogin({ role, email: 'google.user@gmail.com', name: 'Google User', companyName: 'Google Partner Co' });
                    navigate('/dashboard');
                  }}
                  disabled={loading}
                >
                  <i className="bi bi-google text-danger"></i>
                  Continue with Google
                </button>
              </motion.div>
            </form>

            {/* Create Account link */}
            <motion.div className="text-center" variants={itemVariants}>
              <span className="text-muted" style={{ fontSize: '0.9rem' }}>Don't have an account? </span>
              <Link 
                id="login-create-account-link"
                to="/signup" 
                className="text-primary fw-bold text-decoration-none"
                style={{ fontSize: '0.9rem' }}
              >
                Create Account
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
