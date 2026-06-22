import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const pricingPlans = [
  {
    name: 'Starter',
    price: '$0',
    period: 'forever',
    desc: 'Perfect for small retailers and freelancers getting started.',
    features: [
      'Up to 50 invoices / month',
      'Basic GST Calculation',
      'Standard PDF invoices',
      'Local storage sync',
      'Email support'
    ],
    buttonText: 'Get Started',
    popular: false,
    colorClass: 'text-secondary'
  },
  {
    name: 'Growth',
    price: '$29',
    period: 'per month',
    desc: 'Ideal for growing businesses needing advanced compliance.',
    features: [
      'Unlimited invoices',
      'Automated GST reporting (CGST/SGST/IGST)',
      'Custom branding & PDF design',
      'Real-time inventory tracking',
      'WhatsApp & Email invoice sharing',
      'AI assistant integrations',
      'Priority 24/7 support'
    ],
    buttonText: 'Start Free Trial',
    popular: true,
    colorClass: 'text-primary'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'tailored pricing',
    desc: 'For large enterprises requiring multi-terminal setups.',
    features: [
      'Everything in Growth',
      'Multi-warehouse synchronization',
      'Dedicated database host',
      'Custom API endpoints',
      'SLA-guaranteed support',
      'Personal account engineer'
    ],
    buttonText: 'Contact Sales',
    popular: false,
    colorClass: 'text-dark'
  }
];

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <section className="py-5" id="pricing" style={{ background: 'radial-gradient(circle at 10% 90%, rgba(59, 130, 246, 0.04) 0%, transparent 60%)' }}>
      <div className="container py-lg-5">
        <div className="text-center max-w-2xl mx-auto mb-5">
          <span className="text-primary fw-bold text-uppercase tracking-wider" style={{ letterSpacing: '0.15em', fontSize: '0.85rem' }}>
            Pricing Plans
          </span>
          <h2 className="display-5 fw-black text-dark mt-2 mb-3" style={{ fontFamily: 'Outfit' }}>
            Transparent, Scale-friendly Pricing
          </h2>
          <p className="text-muted leading-relaxed" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Choose a plan that fits your current operational scale. Upgrade or downgrade at any time.
          </p>
        </div>

        <div className="row g-4 align-items-stretch justify-content-center">
          {pricingPlans.map((plan, idx) => (
            <div key={idx} className="col-lg-4 col-md-6 col-12">
              <motion.div
                className={`card h-100 p-4 rounded-4 position-relative ${
                  plan.popular ? 'border-primary shadow-lg' : 'border-light-subtle glass-card'
                }`}
                style={{
                  borderWidth: plan.popular ? '2px' : '1px',
                  boxShadow: plan.popular ? '0 20px 40px rgba(37, 99, 235, 0.15)' : 'none'
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                {plan.popular && (
                  <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-primary px-3 py-2 fw-bold uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                    MOST POPULAR
                  </span>
                )}

                <div className="mb-4">
                  <h4 className="fw-bold text-dark mb-2" style={{ fontFamily: 'Outfit' }}>{plan.name}</h4>
                  <p className="text-muted mb-4" style={{ fontSize: '0.85rem', minHeight: '40px' }}>{plan.desc}</p>
                  <div className="d-flex align-items-baseline gap-1">
                    <span className="display-5 fw-black text-dark" style={{ fontFamily: 'Outfit' }}>{plan.price}</span>
                    <span className="text-muted" style={{ fontSize: '0.9rem' }}>/ {plan.period}</span>
                  </div>
                </div>

                <hr className="border-secondary opacity-10 my-4" />

                <div className="mb-4 flex-grow-1">
                  <h6 className="fw-bold text-dark mb-3" style={{ fontSize: '0.9rem' }}>Key Features Include:</h6>
                  <ul className="list-unstyled d-flex flex-column gap-2 text-muted" style={{ fontSize: '0.85rem' }}>
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="d-flex align-items-start gap-2">
                        <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '0.95rem', marginTop: '1px' }}></i>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  id={`pricing-btn-${plan.name.toLowerCase()}`}
                  className={`btn w-100 py-3 rounded-pill fw-bold tracking-wide transition-all ${
                    plan.popular ? 'btn-premium' : 'btn-outline-primary border-2 btn-premium-outline'
                  }`}
                  style={{ fontSize: '0.9rem' }}
                  onClick={() => navigate('/signup')}
                >
                  {plan.buttonText}
                </button>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
