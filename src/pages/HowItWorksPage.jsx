import React from 'react';
import HowItWorks from '../components/HowItWorks';
import TrustSustainability from '../components/TrustSustainability';

export default function HowItWorksPage() {
  return (
    <div style={{ paddingTop: 96, paddingBottom: 60, minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: 20 }}>
        <span className="section-eyebrow">STEP-BY-STEP WORKFLOW</span>
        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, color: '#17243A', letterSpacing: '-0.025em' }}>
          Simplicity at Every Turn.
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#737780', maxWidth: 600, margin: '12px auto 0 auto' }}>
          Learn how Autolux Loop handles part matching, seller verification, and door-to-door scrap logistics.
        </p>
      </div>

      <HowItWorks />
      <TrustSustainability />
    </div>
  );
}
