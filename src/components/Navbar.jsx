import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top glass-panel py-3" id="main-navbar">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="d-flex align-items-center justify-content-center" style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'var(--grad-primary)',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            fontFamily: 'Outfit'
          }}>
            BB
          </div>
          <span className="fw-bold fs-5 tracking-tight text-dark" style={{ fontFamily: 'Outfit' }}>BB Smart Biller</span>
        </Link>

        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent" 
          aria-controls="navbarContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
          id="navbar-toggle-btn"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-1 gap-lg-4">
            <li className="nav-item">
              <button 
                id="nav-link-home"
                className="nav-link btn border-0 bg-transparent text-secondary-hover fw-medium text-dark-emphasis"
                onClick={() => {
                  if (location.pathname === '/') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    navigate('/');
                  }
                }}
              >
                Home
              </button>
            </li>
            <li className="nav-item">
              <button 
                id="nav-link-features"
                className="nav-link btn border-0 bg-transparent fw-medium text-dark-emphasis"
                onClick={() => handleNavClick('features')}
              >
                Features
              </button>
            </li>
            <li className="nav-item">
              <button 
                id="nav-link-pricing"
                className="nav-link btn border-0 bg-transparent fw-medium text-dark-emphasis"
                onClick={() => handleNavClick('pricing')}
              >
                Pricing
              </button>
            </li>
            <li className="nav-item">
              <button 
                id="nav-link-about"
                className="nav-link btn border-0 bg-transparent fw-medium text-dark-emphasis"
                onClick={() => handleNavClick('about')}
              >
                About
              </button>
            </li>
            <li className="nav-item">
              <button 
                id="nav-link-contact"
                className="nav-link btn border-0 bg-transparent fw-medium text-dark-emphasis"
                onClick={() => handleNavClick('contact')}
              >
                Contact
              </button>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            <Link 
              id="navbar-login-btn"
              to="/login" 
              className="btn btn-link text-decoration-none fw-semibold text-primary px-3"
            >
              Login
            </Link>
            <Link 
              id="navbar-signup-btn"
              to="/signup" 
              className="btn btn-premium px-4"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
