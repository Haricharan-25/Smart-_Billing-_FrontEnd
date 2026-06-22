import React from 'react';
import { motion } from 'framer-motion';

export default function Maintenance() {
  return (
    <div className="maintenance-container d-flex flex-column align-items-center justify-content-center" id="maintenance-page">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center"
        style={{ maxWidth: '560px' }}
      >
        {/* Animated Icon */}
        <div className="mb-4">
          <i className="bi bi-cone-striped maintenance-icon display-1 text-warning d-inline-block"></i>
        </div>

        {/* Title */}
        <h1 className="h2 fw-black text-dark mb-3" style={{ fontFamily: 'Outfit' }}>
          🚧 UNDER MAINTENANCE 🚧
        </h1>

        {/* Card for message */}
        <div className="card glass-card p-4 p-md-5 rounded-4 border border-light-subtle text-center shadow-sm">
          <h4 className="fw-bold text-dark-emphasis mb-3" style={{ fontFamily: 'Outfit' }}>
            Work in Progress
          </h4>
          
          <p className="lead text-muted mb-4 px-2" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
            The BB Smart Biller dashboard is currently under development. Our team is actively building the next generation business management experience.
          </p>

          <p className="text-secondary fw-semibold mb-3">
            Thank you for your patience.
          </p>

          <div className="d-flex align-items-center justify-content-center gap-2 text-primary fw-bold">
            <div className="spinner-grow spinner-grow-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <span style={{ fontSize: '0.9rem', letterSpacing: '0.05em' }}>— Binary Brians Team</span>
          </div>
        </div>

        {/* Extra decorative system state widgets */}
        <div className="d-flex align-items-center justify-content-center gap-3 mt-4 text-muted" style={{ fontSize: '0.8rem' }}>
          <span className="d-flex align-items-center gap-1.5"><span className="rounded-circle bg-success" style={{ width: '8px', height: '8px', display: 'inline-block' }}></span> APIs Active</span>
          <span className="text-secondary-subtle">|</span>
          <span className="d-flex align-items-center gap-1.5"><span className="rounded-circle bg-success" style={{ width: '8px', height: '8px', display: 'inline-block' }}></span> DB Connected</span>
          <span className="text-secondary-subtle">|</span>
          <span className="d-flex align-items-center gap-1.5"><span className="rounded-circle bg-warning" style={{ width: '8px', height: '8px', display: 'inline-block' }}></span> Build: v2.0.4-dev</span>
        </div>
      </motion.div>
    </div>
  );
}
