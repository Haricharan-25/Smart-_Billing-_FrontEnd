import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-auto" id="main-footer">
      <div className="container">
        <div className="row g-4 justify-content-between">
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="d-flex align-items-center justify-content-center" style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'var(--grad-accent)',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1rem',
                fontFamily: 'Outfit'
              }}>
                BB
              </div>
              <span className="fw-bold fs-5 tracking-tight text-white" style={{ fontFamily: 'Outfit' }}>BB Smart Biller</span>
            </div>
            <p className="text-white-50 mb-4" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
              Premium billing and inventory platform for modern startups, retailers, and enterprises. Built by Binary Brians.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-white-50 text-primary-hover fs-5" aria-label="Twitter"><i className="bi bi-twitter-x"></i></a>
              <a href="#" className="text-white-50 text-primary-hover fs-5" aria-label="LinkedIn"><i className="bi bi-linkedin"></i></a>
              <a href="#" className="text-white-50 text-primary-hover fs-5" aria-label="GitHub"><i className="bi bi-github"></i></a>
              <a href="#" className="text-white-50 text-primary-hover fs-5" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="text-white fw-bold mb-3" style={{ fontFamily: 'Outfit' }}>Product</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 text-white-50" style={{ fontSize: '0.9rem' }}>
              <li><a href="#features" className="text-decoration-none text-white-50 text-white-hover">Features</a></li>
              <li><a href="#" className="text-decoration-none text-white-50 text-white-hover">Pricing</a></li>
              <li><a href="#" className="text-decoration-none text-white-50 text-white-hover">Integrations</a></li>
              <li><a href="#" className="text-decoration-none text-white-50 text-white-hover">Updates</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="text-white fw-bold mb-3" style={{ fontFamily: 'Outfit' }}>Company</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 text-white-50" style={{ fontSize: '0.9rem' }}>
              <li><a href="#about" className="text-decoration-none text-white-50 text-white-hover">About Us</a></li>
              <li><a href="#" className="text-decoration-none text-white-50 text-white-hover">Careers</a></li>
              <li><a href="#contact" className="text-decoration-none text-white-50 text-white-hover">Contact</a></li>
              <li><span className="text-white-50">Binary Brians</span></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="text-white fw-bold mb-3" style={{ fontFamily: 'Outfit' }}>Legal & Support</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 text-white-50" style={{ fontSize: '0.9rem' }}>
              <li><a href="#" className="text-decoration-none text-white-50 text-white-hover">Privacy Policy</a></li>
              <li><a href="#" className="text-decoration-none text-white-50 text-white-hover">Terms & Conditions</a></li>
              <li><a href="#" className="text-decoration-none text-white-50 text-white-hover">Documentation</a></li>
              <li><a href="#" className="text-decoration-none text-white-50 text-white-hover">Help Center</a></li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <p className="text-white-50 mb-0" style={{ fontSize: '0.85rem' }}>
            &copy; {currentYear} BB Smart Biller. All rights reserved. Designed & Engineered by <strong>Binary Brians</strong>.
          </p>
          <div className="d-flex gap-4" style={{ fontSize: '0.85rem' }}>
            <a href="#" className="text-decoration-none text-white-50 text-white-hover">Privacy</a>
            <a href="#" className="text-decoration-none text-white-50 text-white-hover">Terms</a>
            <a href="#" className="text-decoration-none text-white-50 text-white-hover">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
