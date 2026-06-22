import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import WelcomeScreen from './components/WelcomeScreen';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import DashboardLayout from './components/DashboardLayout';
import Maintenance from './components/Maintenance';
import PersonalDetails from './components/PersonalDetails';
import CompanyDetails from './components/CompanyDetails';
import ChangePassword from './components/ChangePassword';

export default function App() {
  const [started, setStarted] = useState(() => {
    return sessionStorage.getItem('bb_biller_started') === 'true';
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('bb_biller_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleStart = () => {
    setStarted(true);
    sessionStorage.setItem('bb_biller_started', 'true');
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('bb_biller_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('bb_biller_user');
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('bb_biller_user', JSON.stringify(updatedUser));
  };

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {!started ? (
          <WelcomeScreen key="welcome" onStart={handleStart} />
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0, y: 50, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
          >
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route 
                path="/login" 
                element={user ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />} 
              />
              <Route 
                path="/signup" 
                element={user ? <Navigate to="/dashboard" replace /> : <Signup onLogin={handleLogin} />} 
              />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Protected Dashboard Routes */}
              <Route 
                path="/dashboard" 
                element={user ? <DashboardLayout user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />}
              >
                <Route index element={<Maintenance />} />
                <Route 
                  path="personal" 
                  element={<PersonalDetails user={user} onUpdateUser={handleUpdateUser} />} 
                />
                <Route 
                  path="company" 
                  element={<CompanyDetails user={user} onUpdateUser={handleUpdateUser} />} 
                />
                <Route path="change-password" element={<ChangePassword />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        )}
      </AnimatePresence>
    </BrowserRouter>
  );
}
