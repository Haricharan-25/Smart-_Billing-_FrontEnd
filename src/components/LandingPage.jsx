import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import Pricing from './Pricing';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';

export default function LandingPage() {
  return (
    <div className="d-flex flex-column min-vh-100" id="landing-page">
      <Navbar />
      <main className="flex-grow-1">
        <Hero />
        <Features />
        <Pricing />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
