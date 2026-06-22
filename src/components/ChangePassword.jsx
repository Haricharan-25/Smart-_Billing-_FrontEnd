import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Password strength logic
  const checkPasswordStrength = (pwd) => {
    let score = 0;
    if (!pwd) return { score, label: 'None', colorClass: 'bg-transparent' };
    
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    switch (score) {
      case 1:
        return { score, label: 'Weak', colorClass: 'bg-danger' };
      case 2:
        return { score, label: 'Fair', colorClass: 'bg-warning' };
      case 3:
        return { score, label: 'Good', colorClass: 'bg-info' };
      case 4:
        return { score, label: 'Strong', colorClass: 'bg-success' };
      default:
        return { score: 0, label: 'Weak', colorClass: 'bg-danger' };
    }
  };

  const strength = checkPasswordStrength(newPassword);

  const handleUpdate = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setErrorMsg('New passwords do not match.');
      return;
    }

    if (strength.score < 2) {
      setErrorMsg('Please choose a stronger password.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setSuccess(false), 4000);
    }, 1000);
  };

  return (
    <div className="row justify-content-center" id="change-password-page">
      <div className="col-lg-7 col-12">
        <motion.div
          className="card glass-card p-4 p-md-5 rounded-4 shadow-sm"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ border: '1px solid rgba(255,255,255,0.7)' }}
        >
          <div className="mb-4 pb-3 border-bottom">
            <h4 className="fw-bold text-dark mb-1" style={{ fontFamily: 'Outfit' }}>Change Password</h4>
            <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>Secure your account by updating your current password credentials</p>
          </div>

          <form onSubmit={handleUpdate}>
            {errorMsg && (
              <div className="alert alert-danger py-2" role="alert" style={{ fontSize: '0.85rem' }}>
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {errorMsg}
              </div>
            )}

            {success && (
              <div className="alert alert-success py-2" role="alert" style={{ fontSize: '0.85rem' }}>
                <i className="bi bi-check-circle-fill me-2"></i>
                Password updated successfully!
              </div>
            )}

            {/* Current Password */}
            <div className="form-floating mb-3">
              <input 
                type="password" 
                className="form-control rounded-3" 
                id="password-current-input" 
                placeholder="Current Password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                disabled={loading}
              />
              <label htmlFor="password-current-input">Current Password</label>
            </div>

            {/* New Password */}
            <div className="form-floating mb-2">
              <input 
                type="password" 
                className="form-control rounded-3" 
                id="password-new-input" 
                placeholder="New Password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={loading}
              />
              <label htmlFor="password-new-input">New Password</label>
            </div>

            {/* Strength Meter */}
            {newPassword && (
              <div className="mb-3 px-1">
                <div className="d-flex justify-content-between align-items-center mb-1.5" style={{ fontSize: '0.75rem' }}>
                  <span className="text-muted">Password Strength:</span>
                  <span className={`fw-bold ${
                    strength.label === 'Strong' ? 'text-success' :
                    strength.label === 'Good' ? 'text-info' :
                    strength.label === 'Fair' ? 'text-warning' : 'text-danger'
                  }`}>{strength.label}</span>
                </div>
                <div className="progress rounded-pill" style={{ height: '6px' }}>
                  <div 
                    className={`progress-bar strength-bar rounded-pill ${strength.colorClass}`} 
                    role="progressbar" 
                    style={{ width: `${(strength.score / 4) * 100}%` }}
                    aria-valuenow={strength.score} 
                    aria-valuemin="0" 
                    aria-valuemax="4"
                  ></div>
                </div>
              </div>
            )}

            {/* Confirm Password */}
            <div className="form-floating mb-4">
              <input 
                type="password" 
                className="form-control rounded-3" 
                id="password-confirm-input" 
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
              <label htmlFor="password-confirm-input">Confirm New Password</label>
            </div>

            {/* Submit */}
            <button 
              type="submit" 
              id="password-submit-btn"
              className="btn btn-premium px-5 py-2.5"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Updating...
                </>
              ) : (
                'Update Password'
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
