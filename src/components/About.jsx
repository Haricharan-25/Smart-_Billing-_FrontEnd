import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section className="py-5" id="about" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)' }}>
      <div className="container py-lg-5">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary fw-bold text-uppercase tracking-wider" style={{ letterSpacing: '0.15em', fontSize: '0.85rem' }}>
                About Us
              </span>
              <h2 className="display-5 fw-black text-dark mt-2 mb-4" style={{ fontFamily: 'Outfit' }}>
                Why BB Smart Biller?
              </h2>
              <p className="text-muted mb-4" style={{ lineHeight: '1.7', fontSize: '1.05rem' }}>
                BB Smart Biller was designed by <strong>Binary Brians</strong> to solve the complex friction point of modern business transactions. Our platform automates invoicing, taxes, inventory synchronization, and analytics, empowering operators to spend less time on administration and more time on product and growth.
              </p>
              
              <div className="row g-4 mt-2">
                <div className="col-sm-6">
                  <div className="d-flex align-items-start gap-3">
                    <div className="p-2 bg-primary-subtle text-primary rounded-3">
                      <i className="bi bi-bullseye fs-4"></i>
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1 text-dark" style={{ fontFamily: 'Outfit' }}>Our Mission</h6>
                      <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>
                        To democratize intelligent commerce workflows for micro-retailers and scaling corporations alike.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="d-flex align-items-start gap-3">
                    <div className="p-2 bg-success-subtle text-success rounded-3">
                      <i className="bi bi-eye fs-4"></i>
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1 text-dark" style={{ fontFamily: 'Outfit' }}>Our Vision</h6>
                      <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>
                        Creating an interconnected global financial ledger where billing is immediate, smart, and zero-effort.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="col-lg-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="card glass-card p-4 rounded-4" style={{ border: '1px solid rgba(255,255,255,0.8)' }}>
                <h4 className="fw-bold text-dark mb-4" style={{ fontFamily: 'Outfit' }}>Business Value & Benefits</h4>
                
                <div className="d-flex flex-column gap-4">
                  <div className="d-flex gap-3">
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px', flexShrink: 0, fontSize: '0.9rem' }}>
                      <i className="bi bi-check-lg"></i>
                    </div>
                    <div>
                      <h6 className="fw-semibold mb-1 text-dark">Save Up to 80% Admin Hours</h6>
                      <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>
                        Auto-generate invoices, compute local GST, and dispatch PDF drafts to customers in single clicks.
                      </p>
                    </div>
                  </div>

                  <div className="d-flex gap-3">
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px', flexShrink: 0, fontSize: '0.9rem' }}>
                      <i className="bi bi-check-lg"></i>
                    </div>
                    <div>
                      <h6 className="fw-semibold mb-1 text-dark">Prevent Inventory Shrinkage</h6>
                      <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>
                        Instantly sync stock items across multi-terminal billing counters and warehouse depots.
                      </p>
                    </div>
                  </div>

                  <div className="d-flex gap-3">
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px', flexShrink: 0, fontSize: '0.9rem' }}>
                      <i className="bi bi-check-lg"></i>
                    </div>
                    <div>
                      <h6 className="fw-semibold mb-1 text-dark">Eliminate Audit Compliance Risks</h6>
                      <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>
                        Maintain robust, cloud-backed audit logs compatible with national GST filing standards.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
