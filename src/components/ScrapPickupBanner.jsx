import React from 'react';
import { Truck, Shield, Calendar, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ScrapPickupBanner() {
  const { navigate } = useApp();

  return (
    <section className="section-py" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        <div
          style={{
            position: 'relative',
            backgroundColor: '#17243A',
            borderRadius: '32px',
            padding: ' clamp(36px, 6vw, 72px)',
            color: '#FFFFFF',
            overflow: 'hidden',
            boxShadow: '0 24px 60px -15px rgba(23, 36, 58, 0.3)',
          }}
        >
          {/* Subtle Ambient Radial Lighting */}
          <div
            style={{
              position: 'absolute',
              top: '-20%',
              right: '-10%',
              width: '600px',
              height: '600px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(52, 120, 246, 0.25) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              position: 'absolute',
              bottom: '-20%',
              left: '10%',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(36, 134, 90, 0.2) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 48,
              alignItems: 'center',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(221, 245, 232, 0.15)',
                  color: '#DDF5E8',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: 20,
                }}
              >
                <Sparkles size={13} color="#DDF5E8" />
                SIGNATURE RECOVERY SERVICE
              </div>

              <h2
                style={{
                  fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  letterSpacing: '-0.025em',
                  lineHeight: 1.15,
                  marginBottom: 20,
                }}
              >
                Your Scrap. <br />
                A Fresh Start.
              </h2>

              <p
                style={{
                  fontSize: '1.125rem',
                  color: '#C4C8D0',
                  lineHeight: 1.65,
                  marginBottom: 32,
                  maxWidth: 500,
                }}
              >
                Have an old vehicle, accident-damaged shell, or surplus automotive metal? Share what you have,
                and our specialized technical appraisal team will review your pickup request within 4 hours.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  marginBottom: 36,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#E8EBEF', fontSize: '0.95rem' }}>
                  <CheckCircle2 size={18} color="#DDF5E8" />
                  <span>Fair metallurgical appraisal based on verified alloy and component mass</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#E8EBEF', fontSize: '0.95rem' }}>
                  <CheckCircle2 size={18} color="#DDF5E8" />
                  <span>Doorstep hydraulic flatbed recovery with full site safety compliance</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#E8EBEF', fontSize: '0.95rem' }}>
                  <CheckCircle2 size={18} color="#DDF5E8" />
                  <span>Official RTO deregistration and depollution certificate issued</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <button
                  onClick={() => navigate('scrap-pickup')}
                  className="btn btn-mint btn-lg"
                  style={{ gap: 8 }}
                >
                  <Truck size={18} />
                  Request a Pickup
                </button>
                <button
                  onClick={() => navigate('my-pickups')}
                  className="btn btn-secondary btn-lg"
                  style={{ backgroundColor: 'transparent', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)' }}
                >
                  Track Existing Request →
                </button>
              </div>
            </div>

            {/* Right Side Visual Highlight Card */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                padding: '36px',
              }}
            >
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#DDF5E8', textTransform: 'uppercase', marginBottom: 16 }}>
                Circular Materials Recovered
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
                <div>
                  <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>
                    482.6T
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#9A9FA8' }}>High-Grade Aluminum & Steel</div>
                </div>
                <div>
                  <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#3478F6', fontFamily: 'var(--font-mono)' }}>
                    98.4%
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#9A9FA8' }}>Total Recovery Efficiency</div>
                </div>
              </div>

              <div
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(0, 0, 0, 0.25)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  fontSize: '0.875rem',
                  color: '#C4C8D0',
                  lineHeight: 1.5,
                }}
              >
                💡 <strong>Transparent Policy:</strong> A request submission is an invitation for appraisal, not an
                automatic booking confirmation. You review and approve our quote before any vehicle is touched.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
