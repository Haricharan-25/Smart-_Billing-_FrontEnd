import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setErrorMsg('');
    // Simulate sending OTP
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg(`A mock 6-digit OTP has been sent to ${email}`);
      setStep(2);
    }, 1000);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (!otp) return;

    setLoading(true);
    setErrorMsg('');
    // Simulate OTP verification
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg('');
      setStep(3);
    }, 1000);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setLoading(true);
    // Simulate password resetting
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg('Your password has been reset successfully. Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }, 1000);
  };

  return (
    <div className="auth-split-container d-flex flex-lg-row flex-column" id="forgot-password-page">
      {/* Left Panel: Unified branding */}
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
        </motion.div>
      </div>

      {/* Right Panel: OTP Recovery Card */}
      <div className="auth-right-panel col-lg-7 col-12">
        <motion.div 
          className="card glass-card p-4 p-md-5 rounded-4 shadow-sm w-100" 
          style={{ maxWidth: '500px', border: '1px solid rgba(255,255,255,0.7)' }}
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
              <Link to="/" className="text-decoration-none text-primary fw-semibold d-inline-flex align-items-center gap-2 mb-4 hover-primary" id="recover-back-home">
                <i className="bi bi-arrow-left"></i> Back to Home
              </Link>
            </motion.div>

            <motion.div className="mb-4" variants={itemVariants}>
              <h3 className="fw-bold text-dark mb-1" style={{ fontFamily: 'Outfit' }}>Reset Password</h3>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>Follow the steps to recover your access</p>
              
              {/* Step Indicator */}
              <div className="d-flex align-items-center gap-2 mt-3">
                {[1, 2, 3].map((s) => (
                  <div 
                    key={s} 
                    className={`rounded-pill transition-all ${step >= s ? 'bg-primary' : 'bg-secondary opacity-25'}`}
                    style={{ height: '6px', width: step === s ? '24px' : '6px' }}
                  ></div>
                ))}
              </div>
            </motion.div>

            {errorMsg && (
              <motion.div className="alert alert-danger py-2" role="alert" style={{ fontSize: '0.85rem' }} variants={itemVariants}>
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {errorMsg}
              </motion.div>
            )}

            {successMsg && (
              <motion.div className="alert alert-success py-2" role="alert" style={{ fontSize: '0.85rem' }} variants={itemVariants}>
                <i className="bi bi-info-circle-fill me-2"></i>
                {successMsg}
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.form
                  key="step-1"
                  onSubmit={handleSendOTP}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div className="form-floating mb-4" variants={itemVariants}>
                    <input 
                      type="email" 
                      className="form-control rounded-3" 
                      id="recover-email-input" 
                      placeholder="name@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                    />
                    <label htmlFor="recover-email-input">Email Address</label>
                  </motion.div>

                  <motion.div variants={itemVariants} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <button 
                      type="submit" 
                      id="recover-send-otp-btn"
                      className="btn btn-premium w-100 py-3 mb-4"
                      disabled={loading}
                    >
                      {loading ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                  </motion.div>
                </motion.form>
              )}

              {step === 2 && (
                <motion.form
                  key="step-2"
                  onSubmit={handleVerifyOTP}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div className="form-floating mb-4" variants={itemVariants}>
                    <input 
                      type="text" 
                      className="form-control rounded-3 text-center fs-4 tracking-widest" 
                      id="recover-otp-input" 
                      placeholder="123456"
                      required
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      disabled={loading}
                    />
                    <label htmlFor="recover-otp-input">6-Digit Verification Code</label>
                  </motion.div>

                  <motion.div variants={itemVariants} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <button 
                      type="submit" 
                      id="recover-verify-otp-btn"
                      className="btn btn-premium w-100 py-3 mb-4"
                      disabled={loading}
                    >
                      {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                  </motion.div>
                </motion.form>
              )}

              {step === 3 && (
                <motion.form
                  key="step-3"
                  onSubmit={handleResetPassword}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div className="form-floating mb-3" variants={itemVariants}>
                    <input 
                      type="password" 
                      className="form-control rounded-3" 
                      id="recover-new-password-input" 
                      placeholder="New Password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      disabled={loading}
                    />
                    <label htmlFor="recover-new-password-input">New Password</label>
                  </motion.div>

                  <motion.div className="form-floating mb-4" variants={itemVariants}>
                    <input 
                      type="password" 
                      className="form-control rounded-3" 
                      id="recover-confirm-password-input" 
                      placeholder="Confirm Password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={loading}
                    />
                    <label htmlFor="recover-confirm-password-input">Confirm Password</label>
                  </motion.div>

                  <motion.div variants={itemVariants} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <button 
                      type="submit" 
                      id="recover-reset-pwd-btn"
                      className="btn btn-premium w-100 py-3 mb-4"
                      disabled={loading}
                    >
                      {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Return to Login link */}
            <motion.div className="text-center" variants={itemVariants}>
              <Link 
                id="recover-login-link"
                to="/login" 
                className="text-primary fw-semibold text-decoration-none"
                style={{ fontSize: '0.9rem' }}
              >
                <i className="bi bi-arrow-left me-1"></i>
                Back to Login
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
