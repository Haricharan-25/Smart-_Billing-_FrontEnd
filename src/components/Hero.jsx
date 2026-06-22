import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="py-5 position-relative overflow-hidden" id="hero-section" style={{ background: 'radial-gradient(circle at 90% 10%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)' }}>
      <div className="container py-lg-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6 text-center text-lg-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill mb-3" style={{ background: 'rgba(37, 99, 235, 0.08)', border: '1px solid rgba(37, 99, 235, 0.15)' }}>
                <span className="badge rounded-pill bg-primary" style={{ padding: '0.4em 0.8em', fontSize: '0.75rem' }}>NEW v2.0</span>
                <span className="text-primary fw-semibold" style={{ fontSize: '0.8rem' }}>Intelligent AI Billing Assistant is Live</span>
              </div>
              
              <h1 className="display-3 fw-black text-dark mb-3" style={{ fontFamily: 'Outfit', lineHeight: '1.15', letterSpacing: '-0.03em' }}>
                Business Billing <br className="d-none d-md-block" />
                <span className="text-primary">Made Simple</span>
              </h1>
              
              <p className="lead text-muted mb-4 px-lg-0 px-md-5" style={{ fontSize: '1.15rem', lineHeight: '1.7' }}>
                Manage GST billing, inventory, customers and business reports from one intelligent platform. Build professional invoices, track stock in real time, and scale your business effortlessly.
              </p>
              
              <div className="d-flex flex-sm-row flex-column justify-content-center justify-content-lg-start gap-3 mb-5">
                <button
                  id="hero-get-started-btn"
                  className="btn btn-premium px-5 py-3"
                  onClick={() => navigate('/signup')}
                >
                  Get Started
                </button>
                <button
                  id="hero-watch-demo-btn"
                  className="btn btn-premium-outline px-5 py-3"
                  onClick={() => {
                    const feat = document.getElementById('features');
                    if (feat) feat.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Watch Demo
                </button>
              </div>

              {/* Trust markers */}
              <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-4 text-muted">
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-shield-check text-success fs-4"></i>
                  <span className="fw-semibold" style={{ fontSize: '0.9rem' }}>GST Compliant</span>
                </div>
                <div className="vr bg-secondary opacity-25" style={{ height: '24px' }}></div>
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-cloud-arrow-up text-primary fs-4"></i>
                  <span className="fw-semibold" style={{ fontSize: '0.9rem' }}>Secure Cloud</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="col-lg-6">
            <motion.div
              className="position-relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Decorative glows */}
              <div className="position-absolute bg-primary rounded-circle filter blur-3xl opacity-10" style={{ width: '300px', height: '300px', top: '10%', right: '10%', zIndex: -1 }}></div>
              <div className="position-absolute bg-accent rounded-circle filter blur-3xl opacity-10" style={{ width: '250px', height: '250px', bottom: '10%', left: '10%', zIndex: -1 }}></div>

              {/* Premium Dashboard Visual Mockup */}
              <div className="glass-card p-4 rounded-4" style={{ border: '1px solid rgba(255,255,255,0.7)', boxShadow: '0 30px 60px rgba(15,23,42,0.1)' }}>
                {/* Visual Header */}
                <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-light">
                  <div className="d-flex gap-1.5">
                    <span className="rounded-circle bg-danger opacity-75" style={{ width: '12px', height: '12px', display: 'inline-block' }}></span>
                    <span className="rounded-circle bg-warning opacity-75" style={{ width: '12px', height: '12px', display: 'inline-block' }}></span>
                    <span className="rounded-circle bg-success opacity-75" style={{ width: '12px', height: '12px', display: 'inline-block' }}></span>
                  </div>
                  <span className="badge bg-light text-muted border border-light-subtle rounded-pill px-3 py-1.5" style={{ fontSize: '0.75rem' }}>
                    <i className="bi bi-shield-fill-check text-success me-1"></i> bb-smart-biller-v2.cloud
                  </span>
                </div>

                {/* Dashboard grid mock */}
                <div className="row g-3">
                  <div className="col-12">
                    <div className="p-3 bg-light rounded-3 d-flex align-items-center justify-content-between">
                      <div>
                        <span className="text-muted d-block mb-1" style={{ fontSize: '0.75rem' }}>Total Revenue</span>
                        <h4 className="fw-black m-0" style={{ fontFamily: 'Outfit' }}>$142,580.00</h4>
                      </div>
                      <span className="badge bg-success-subtle text-success rounded-pill px-2.5 py-1" style={{ fontSize: '0.8rem' }}>
                        <i className="bi bi-arrow-up-right me-1"></i> +14.2%
                      </span>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="p-3 bg-light rounded-3">
                      <span className="text-muted d-block mb-1" style={{ fontSize: '0.75rem' }}>GST Collected</span>
                      <h5 className="fw-bold m-0" style={{ fontFamily: 'Outfit' }}>$25,482.50</h5>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="p-3 bg-light rounded-3">
                      <span className="text-muted d-block mb-1" style={{ fontSize: '0.75rem' }}>Active Invoices</span>
                      <h5 className="fw-bold m-0" style={{ fontFamily: 'Outfit' }}>1,842</h5>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="p-3 bg-light rounded-3">
                      <span className="text-muted d-block mb-3.5" style={{ fontSize: '0.75rem' }}>Sales Chart (Last 5 Months)</span>
                      {/* CSS-only chart representation */}
                      <div className="d-flex align-items-end justify-content-between pt-4 px-2" style={{ height: '100px' }}>
                        <div className="w-10 bg-primary opacity-50 rounded-top" style={{ height: '35%' }} title="Jan"></div>
                        <div className="w-10 bg-primary opacity-60 rounded-top" style={{ height: '50%' }} title="Feb"></div>
                        <div className="w-10 bg-primary opacity-75 rounded-top" style={{ height: '45%' }} title="Mar"></div>
                        <div className="w-10 bg-primary opacity-90 rounded-top" style={{ height: '75%' }} title="Apr"></div>
                        <div className="w-10 bg-primary rounded-top" style={{ height: '95%' }} title="May"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating visual cards */}
              <motion.div
                className="position-absolute bg-white p-3 rounded-3 shadow-lg d-flex align-items-center gap-3 animate-float-1"
                style={{ top: '15%', left: '-40px', width: '200px', border: '1px solid var(--border)' }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="rounded-circle bg-success-subtle text-success p-2.5 fs-4 d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                  <i className="bi bi-file-earmark-check"></i>
                </div>
                <div>
                  <span className="text-muted d-block" style={{ fontSize: '0.7rem' }}>Invoice Paid</span>
                  <span className="fw-bold text-dark" style={{ fontSize: '0.9rem' }}>+$1,250.00</span>
                </div>
              </motion.div>

              <motion.div
                className="position-absolute bg-white p-3 rounded-3 shadow-lg d-flex align-items-center gap-3 animate-float-2"
                style={{ bottom: '15%', right: '-30px', width: '210px', border: '1px solid var(--border)' }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="rounded-circle bg-primary-subtle text-primary p-2.5 fs-4 d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                  <i className="bi bi-cpu-fill"></i>
                </div>
                <div>
                  <span className="text-muted d-block" style={{ fontSize: '0.7rem' }}>AI Agent Actions</span>
                  <span className="fw-bold text-dark" style={{ fontSize: '0.85rem' }}>Auto-categorized stock</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
