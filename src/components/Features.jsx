import React from 'react';
import { motion } from 'framer-motion';

const featuresList = [
  {
    title: 'Automated Billing',
    desc: 'Generate invoices quickly and accurately with automatic serialization and dynamic numbering.',
    icon: 'bi-file-earmark-spreadsheet',
  },
  {
    title: 'GST Calculation',
    desc: 'Automatic GST calculations covering CGST, SGST, and IGST components without manual inputs.',
    icon: 'bi-percent',
  },
  {
    title: 'PDF Invoices',
    desc: 'Generate, preview, and download elegant PDF invoices styled to represent your corporate brand.',
    icon: 'bi-file-pdf',
  },
  {
    title: 'Inventory Tracking',
    desc: 'Monitor stock levels in real time. Receive low-stock notifications and auto-adjust inventories.',
    icon: 'bi-boxes',
  },
  {
    title: 'Customer Management',
    desc: 'Manage customer records, purchase histories, outstanding balances, and communication histories.',
    icon: 'bi-people',
  },
  {
    title: 'Sales Analytics',
    desc: 'Track sales performance, review customer behavior, and generate accounting sheets instantly.',
    icon: 'bi-graph-up-arrow',
  },
  {
    title: 'Cloud Backup',
    desc: 'Secure cloud-based storage utilizing military-grade encryption with auto-sync capability.',
    icon: 'bi-cloud-arrow-up',
  },
  {
    title: 'QR Payments',
    desc: 'Receive payments using dynamic QR codes generated right on the invoice for faster settlements.',
    icon: 'bi-qr-code-scan',
  },
  {
    title: 'WhatsApp Sharing',
    desc: 'Share invoices instantly with your customers via integrated WhatsApp API triggers.',
    icon: 'bi-whatsapp',
  },
  {
    title: 'AI Billing Assistant',
    desc: 'AI-powered support to automate inventory entry, classify expenses, and predict inventory churn.',
    icon: 'bi-cpu',
  },
];

export default function Features() {
  return (
    <section className="py-5 bg-white border-top border-bottom border-light" id="features">
      <div className="container py-lg-5">
        <div className="text-center max-w-2xl mx-auto mb-5">
          <span className="text-primary fw-bold text-uppercase tracking-wider" style={{ letterSpacing: '0.15em', fontSize: '0.85rem' }}>
            Features
          </span>
          <h2 className="display-5 fw-black text-dark mt-2 mb-3" style={{ fontFamily: 'Outfit' }}>
            Everything You Need to Scale
          </h2>
          <p className="text-muted leading-relaxed" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Ditch the spreadsheets. BB Smart Biller centralizes all your invoicing, tax tracking, customer relations, and stock operations.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {featuresList.map((feat, idx) => (
            <div key={idx} className="col-xl-3 col-lg-4 col-md-6">
              <motion.div
                className="card h-100 p-4 glass-card border border-light-subtle"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <div className="feature-icon-wrapper">
                  <i className={`bi ${feat.icon}`}></i>
                </div>
                <h5 className="card-title fw-bold text-dark mb-2" style={{ fontFamily: 'Outfit' }}>
                  {feat.title}
                </h5>
                <p className="card-text text-muted mb-0" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                  {feat.desc}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
