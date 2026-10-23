import React from 'react';
import { ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { navigate } = useApp();

  return (
    <footer
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        paddingTop: 80,
        paddingBottom: 48,
        color: '#1D1D1F',
      }}
    >
      <div className="container">
        {/* Top Branding & Mission */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 32,
            paddingBottom: 56,
            borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
            marginBottom: 56,
          }}
        >
          <div style={{ maxWidth: 420 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #17243A 0%, #3478F6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" strokeDasharray="5 3" />
                  <circle cx="12" cy="12" r="3" fill="#DDF5E8" />
                </svg>
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#17243A' }}>
                AUTOLUX<span style={{ color: '#3478F6' }}>LOOP</span>
              </span>
            </div>

            <p style={{ fontSize: '0.95rem', color: '#737780', lineHeight: 1.6, marginBottom: 16 }}>
              "Automotive parts, given a second life." <br />
              Keep vehicles moving. Keep materials in motion.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.825rem', color: '#24865A', fontWeight: 600 }}>
              <ShieldCheck size={16} />
              <span>Certified Circular Automotive Platform</span>
            </div>
          </div>

          <div
            style={{
              padding: '24px 28px',
              borderRadius: '20px',
              backgroundColor: '#F7F8FA',
              border: '1px solid rgba(0,0,0,0.04)',
              maxWidth: 380,
            }}
          >
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#17243A', textTransform: 'uppercase', marginBottom: 6 }}>
              Need Scrap Collection?
            </div>
            <p style={{ fontSize: '0.875rem', color: '#737780', marginBottom: 16, lineHeight: 1.5 }}>
              Submit your vehicle or component photos for a rapid appraisal and free doorstep pickup.
            </p>
            <button
              onClick={() => navigate('scrap-pickup')}
              className="btn btn-mint btn-sm"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Start Pickup Request →
            </button>
          </div>
        </div>

        {/* 5-Column Navigation Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 36,
            marginBottom: 60,
          }}
        >
          {/* Marketplace */}
          <div>
            <h4 style={{ fontSize: '0.825rem', fontWeight: 700, color: '#17243A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 18 }}>
              Marketplace
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li>
                <button onClick={() => navigate('parts')} style={{ color: '#737780', fontSize: '0.9rem' }}>
                  Buy Parts
                </button>
              </li>
              <li>
                <button onClick={() => navigate('sell')} style={{ color: '#737780', fontSize: '0.9rem' }}>
                  Sell Your Parts
                </button>
              </li>
              <li>
                <button onClick={() => navigate('parts', { category: 'ev-battery' })} style={{ color: '#737780', fontSize: '0.9rem' }}>
                  EV & High-Voltage
                </button>
              </li>
              <li>
                <button onClick={() => navigate('parts', { category: 'braking' })} style={{ color: '#737780', fontSize: '0.9rem' }}>
                  Braking Systems
                </button>
              </li>
              <li>
                <button onClick={() => navigate('parts', { category: 'powertrain' })} style={{ color: '#737780', fontSize: '0.9rem' }}>
                  Powertrains
                </button>
              </li>
            </ul>
          </div>

          {/* Scrap Services */}
          <div>
            <h4 style={{ fontSize: '0.825rem', fontWeight: 700, color: '#17243A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 18 }}>
              Scrap Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li>
                <button onClick={() => navigate('scrap-pickup')} style={{ color: '#737780', fontSize: '0.9rem' }}>
                  Arrange Pickup
                </button>
              </li>
              <li>
                <button onClick={() => navigate('my-pickups')} style={{ color: '#737780', fontSize: '0.9rem' }}>
                  Track Requests
                </button>
              </li>
              <li>
                <button onClick={() => navigate('services')} style={{ color: '#737780', fontSize: '0.9rem' }}>
                  Depollution Standard
                </button>
              </li>
              <li>
                <button onClick={() => navigate('contact')} style={{ color: '#737780', fontSize: '0.9rem' }}>
                  Fleet Logistics
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: '0.825rem', fontWeight: 700, color: '#17243A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 18 }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li>
                <button onClick={() => navigate('about')} style={{ color: '#737780', fontSize: '0.9rem' }}>
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => navigate('how-it-works')} style={{ color: '#737780', fontSize: '0.9rem' }}>
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => navigate('services')} style={{ color: '#737780', fontSize: '0.9rem' }}>
                  Circularity Impact
                </button>
              </li>
              <li>
                <button onClick={() => navigate('contact')} style={{ color: '#737780', fontSize: '0.9rem' }}>
                  Contact Team
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 style={{ fontSize: '0.825rem', fontWeight: 700, color: '#17243A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 18 }}>
              Support
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li>
                <button onClick={() => navigate('faq')} style={{ color: '#737780', fontSize: '0.9rem' }}>
                  FAQs
                </button>
              </li>
              <li>
                <button onClick={() => navigate('contact')} style={{ color: '#737780', fontSize: '0.9rem' }}>
                  Customer Care
                </button>
              </li>
              <li>
                <button onClick={() => navigate('legal', { doc: 'shipping' })} style={{ color: '#737780', fontSize: '0.9rem' }}>
                  Shipping Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('legal', { doc: 'refund' })} style={{ color: '#737780', fontSize: '0.9rem' }}>
                  Returns & Refunds
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontSize: '0.825rem', fontWeight: 700, color: '#17243A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 18 }}>
              Legal & Privacy
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li>
                <button onClick={() => navigate('legal', { doc: 'privacy' })} style={{ color: '#737780', fontSize: '0.9rem' }}>
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('legal', { doc: 'terms' })} style={{ color: '#737780', fontSize: '0.9rem' }}>
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => navigate('legal', { doc: 'cookies' })} style={{ color: '#737780', fontSize: '0.9rem' }}>
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            paddingTop: 32,
            borderTop: '1px solid rgba(0, 0, 0, 0.06)',
            fontSize: '0.8125rem',
            color: '#86868B',
          }}
        >
          <div>
            © {new Date().getFullYear()} AUTOLUX LOOP Inc. All rights reserved. Precision Automotive Circular Systems.
          </div>

          <div style={{ display: 'flex', gap: 20 }}>
            <span>India / Global English</span>
            <span>Security Encrypted</span>
            <span>ISO 14001 Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
