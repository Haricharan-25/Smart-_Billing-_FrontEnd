import React from 'react';
import { motion } from 'framer-motion';

const floatingCards = [
  { text: 'GST Billing', className: 'animate-float-1', style: { top: '15%', left: '12%' } },
  { text: 'Inventory', className: 'animate-float-2', style: { top: '25%', right: '15%' } },
  { text: 'Reports', className: 'animate-float-3', style: { bottom: '20%', left: '15%' } },
  { text: 'Customers', className: 'animate-float-4', style: { bottom: '25%', right: '12%' } },
  { text: 'Analytics', className: 'animate-float-5', style: { top: '45%', left: '8%' } },
  { text: 'Cloud Backup', className: 'animate-float-1', style: { top: '50%', right: '8%' } },
  { text: 'QR Payments', className: 'animate-float-3', style: { top: '10%', right: '35%' } },
  { text: 'AI Assistant', className: 'animate-float-2', style: { bottom: '10%', left: '40%' } },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function WelcomeScreen({ onStart }) {
  return (
    <motion.div
      className="welcome-screen d-flex align-items-center justify-content-center"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        y: -50,
        filter: 'blur(15px)',
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
      }}
      id="welcome-screen-container"
    >
      {/* Background soft glow */}
      <div className="welcome-glow"></div>

      {/* Floating Badges */}
      {floatingCards.map((card, idx) => (
        <motion.div
          key={idx}
          className={`floating-badge ${card.className}`}
          style={card.style}
          initial={{ opacity: 0, scale: 0.7, filter: 'blur(4px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ 
            delay: 0.08 * idx + 0.5, 
            duration: 0.8, 
            ease: [0.16, 1, 0.3, 1] 
          }}
        >
          {card.text}
        </motion.div>
      ))}

      {/* Center Content */}
      <div className="container position-relative z-3 text-center text-white" style={{ maxWidth: '640px' }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo container */}
          <motion.div 
            className="d-inline-flex align-items-center justify-content-center mb-4" 
            style={{
              width: '104px',
              height: '104px',
              borderRadius: '26px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 100%)',
              border: '1.5px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}
            variants={itemVariants}
          >
            {/* Gloss shine animation */}
            <motion.div 
              style={{
                position: 'absolute',
                top: 0, left: '-150%',
                width: '100%', height: '100%',
                background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)',
                transform: 'skewX(-20deg)'
              }}
              animate={{ left: '150%' }}
              transition={{ repeat: Infinity, repeatDelay: 4, duration: 1.5, ease: 'easeInOut' }}
            />
            <span className="display-4 fw-black m-0" style={{ fontFamily: 'Outfit', letterSpacing: '-2px', color: '#FFFFFF', fontSize: '2.5rem' }}>BB</span>
          </motion.div>

          <motion.h5 
            className="text-primary fw-bold text-uppercase tracking-wider mb-2" 
            style={{ letterSpacing: '0.25em', fontSize: '0.9rem' }}
            variants={itemVariants}
          >
            Binary Brians
          </motion.h5>
          
          <motion.h1 
            className="display-4 fw-black mb-3" 
            style={{ fontFamily: 'Outfit', color: '#FFFFFF', letterSpacing: '-0.02em' }}
            variants={itemVariants}
          >
            BB Smart Biller
          </motion.h1>
          
          <motion.h3 
            className="h5 text-white-50 fw-semibold mb-4" 
            style={{ letterSpacing: '0.04em' }}
            variants={itemVariants}
          >
            Smart Business. Smarter Billing.
          </motion.h3>
          
          <motion.p 
            className="lead text-white-50 mb-5 px-4" 
            style={{ fontSize: '1.05rem', lineHeight: '1.65' }}
            variants={itemVariants}
          >
            Manage billing, inventory, GST invoices, reports, customers and business operations from one intelligent platform.
          </motion.p>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <button
              id="welcome-start-button"
              className="btn btn-start"
              onClick={onStart}
            >
              START
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
