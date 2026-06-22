import React, { useState } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardLayout({ user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Mock notifications
  const notifications = [
    { id: 1, title: 'Server Synchronized', desc: 'Cloud storage fully synced successfully.', time: '5m ago' },
    { id: 2, title: 'Compliance Check Passed', desc: 'No errors detected in your GST logs.', time: '1h ago' },
    { id: 3, title: 'Welcome to BB Smart Biller', desc: 'Your merchant profile is set up.', time: '2h ago' }
  ];

  const handleLogoutClick = (e) => {
    e.preventDefault();
    onLogout();
    navigate('/');
  };

  return (
    <div className="min-height-100vh d-flex flex-column bg-light" id="dashboard-layout">
      {/* Top Navbar */}
      <nav className="navbar navbar-expand-lg bg-white border-bottom border-lightsticky-top py-3 shadow-sm z-3">
        <div className="container">
          <div className="navbar-brand d-flex align-items-center gap-2">
            <div className="d-flex align-items-center justify-content-center" style={{
              width: '38px',
              height: '38px',
              borderRadius: '9px',
              background: 'var(--grad-primary)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              fontFamily: 'Outfit'
            }}>
              BB
            </div>
            <span className="fw-bold fs-5 tracking-tight text-dark" style={{ fontFamily: 'Outfit' }}>BB Smart Biller</span>
          </div>

          <div className="d-flex align-items-center gap-3 ms-auto">
            {/* Notifications Trigger */}
            <div className="position-relative">
              <button 
                id="dashboard-notifications-btn"
                className="btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center border" 
                style={{ width: '40px', height: '40px' }}
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <i className="bi bi-bell-fill text-muted"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light" style={{ fontSize: '0.6rem', padding: '0.3em 0.5em' }}>
                  {notifications.length}
                </span>
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div 
                    id="dashboard-notifications-dropdown"
                    className="position-absolute end-0 mt-2 bg-white rounded-3 border shadow-lg p-3" 
                    style={{ width: '300px', zIndex: 1000 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h6 className="fw-bold mb-0" style={{ fontFamily: 'Outfit' }}>Notifications</h6>
                      <button className="btn btn-link btn-sm text-decoration-none p-0" style={{ fontSize: '0.8rem' }} onClick={() => setNotificationsOpen(false)}>Close</button>
                    </div>
                    <div className="d-flex flex-column gap-2">
                      {notifications.map((n) => (
                        <div key={n.id} className="p-2 border-bottom border-light-subtle">
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <span className="fw-semibold text-dark" style={{ fontSize: '0.85rem' }}>{n.title}</span>
                            <span className="text-muted" style={{ fontSize: '0.7rem' }}>{n.time}</span>
                          </div>
                          <p className="text-muted mb-0" style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>{n.desc}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown */}
            <div className="dropdown">
              <button 
                id="dashboard-avatar-dropdown-trigger"
                className="btn btn-link p-0 border-0 dropdown-toggle d-flex align-items-center gap-2 text-decoration-none" 
                type="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                <div className="rounded-circle bg-primary-subtle text-primary fw-bold d-flex align-items-center justify-content-center border" style={{ width: '40px', height: '40px' }}>
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
              </button>
              
              <ul className="dropdown-menu dropdown-menu-end profile-dropdown-menu mt-2" aria-labelledby="dashboard-avatar-dropdown-trigger">
                <li className="px-3 py-2 border-bottom">
                  <span className="fw-bold d-block text-dark" style={{ fontSize: '0.9rem' }}>{user.name}</span>
                  <span className="text-muted d-block" style={{ fontSize: '0.75rem' }}>{user.role}</span>
                </li>
                <li>
                  <Link id="dropdown-link-personal" className="dropdown-item profile-dropdown-item d-flex align-items-center gap-2" to="/dashboard/personal">
                    <i className="bi bi-person text-muted"></i> Personal Details
                  </Link>
                </li>
                <li>
                  <Link id="dropdown-link-company" className="dropdown-item profile-dropdown-item d-flex align-items-center gap-2" to="/dashboard/company">
                    <i className="bi bi-building text-muted"></i> Company Details
                  </Link>
                </li>
                <li>
                  <Link id="dropdown-link-password" className="dropdown-item profile-dropdown-item d-flex align-items-center gap-2" to="/dashboard/change-password">
                    <i className="bi bi-key text-muted"></i> Change Password
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <a id="dropdown-link-logout" className="dropdown-item profile-dropdown-item text-danger d-flex align-items-center gap-2" href="#" onClick={handleLogoutClick}>
                    <i className="bi bi-box-arrow-right"></i> Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Main View Container */}
      <main className="flex-grow-1 py-4">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
