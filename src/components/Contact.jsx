import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1200);
  };

  return (
    <section className="py-5" id="contact" style={{ background: '#F8FAFC' }}>
      <div className="container py-lg-5">
        <div className="row g-5 align-items-stretch">
          <div className="col-lg-5 d-flex flex-column justify-content-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary fw-bold text-uppercase tracking-wider" style={{ letterSpacing: '0.15em', fontSize: '0.85rem' }}>
                Contact
              </span>
              <h2 className="display-5 fw-black text-dark mt-2 mb-4" style={{ fontFamily: 'Outfit' }}>
                Let's Start a Conversation
              </h2>
              <p className="text-muted mb-4" style={{ lineHeight: '1.6' }}>
                Have questions about scaling with BB Smart Biller, custom integrations, or custom enterprise requirements? Reach out directly and our engineers will get back to you within 2 business hours.
              </p>
            </motion.div>

            <div className="d-flex flex-column gap-3 mt-4">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-3 bg-white border p-2.5 text-primary fs-5 shadow-sm d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                  <i className="bi bi-geo-alt"></i>
                </div>
                <div>
                  <span className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Global HQ</span>
                  <span className="fw-semibold text-dark" style={{ fontSize: '0.9rem' }}>102 Innovation Way, Tech Park, India</span>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3">
                <div className="rounded-3 bg-white border p-2.5 text-primary fs-5 shadow-sm d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                  <i className="bi bi-envelope"></i>
                </div>
                <div>
                  <span className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Support Email</span>
                  <span className="fw-semibold text-dark" style={{ fontSize: '0.9rem' }}>support@binarybrians.com</span>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3">
                <div className="rounded-3 bg-white border p-2.5 text-primary fs-5 shadow-sm d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }}>
                  <i className="bi bi-telephone"></i>
                </div>
                <div>
                  <span className="text-muted d-block" style={{ fontSize: '0.75rem' }}>Business Hotline</span>
                  <span className="fw-semibold text-dark" style={{ fontSize: '0.9rem' }}>+91 (800) 555-0199</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <motion.div
              className="card glass-card p-4 p-md-5 h-100 rounded-4 border border-light-subtle"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="fw-bold text-dark mb-4" style={{ fontFamily: 'Outfit' }}>Send a Message</h4>
              
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input 
                        type="text" 
                        className="form-control bg-light-subtle border-light-subtle rounded-3" 
                        id="contact-name-input" 
                        placeholder="John Doe"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={loading}
                      />
                      <label htmlFor="contact-name-input">Full Name</label>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input 
                        type="email" 
                        className="form-control bg-light-subtle border-light-subtle rounded-3" 
                        id="contact-email-input" 
                        placeholder="name@example.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={loading}
                      />
                      <label htmlFor="contact-email-input">Email Address</label>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-floating mb-4">
                      <textarea 
                        className="form-control bg-light-subtle border-light-subtle rounded-3" 
                        placeholder="Leave a message here" 
                        id="contact-message-input" 
                        style={{ height: '140px' }}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        disabled={loading}
                      ></textarea>
                      <label htmlFor="contact-message-input">Your Message</label>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                  <button 
                    type="submit" 
                    id="contact-submit-btn"
                    className="btn btn-premium px-5 py-2.5 d-flex align-items-center gap-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <i className="bi bi-send-fill"></i>
                      </>
                    )}
                  </button>

                  <AnimatePresence>
                    {submitted && (
                      <motion.div
                        className="text-success fw-semibold d-flex align-items-center gap-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <i className="bi bi-check-circle-fill"></i>
                        Thank you! Your message was sent successfully.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
