import React from 'react';
import { ShieldCheck, Cpu, Leaf, Eye, Lock, Clock } from 'lucide-react';

export default function TrustSustainability() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Verified Compatibility',
      desc: 'Chassis and part number cross-referencing ensures accurate vehicle fitment prior to order dispatch.'
    },
    {
      icon: Eye,
      title: 'Transparent Diagnostics',
      desc: 'Real, high-resolution condition photography and laboratory pressure reports. No stock imagery mockups.'
    },
    {
      icon: Leaf,
      title: 'Responsible Depollution',
      desc: 'All hazardous battery electrolytes, brake fluids, and refrigerants neutralized under strict environmental standards.'
    },
    {
      icon: Clock,
      title: 'Auditable Pickup Tracking',
      desc: 'Every scrap request timeline is documented from initial photo appraisal to RTO certificate issuance.'
    },
    {
      icon: Cpu,
      title: 'EV Battery Life Cycle',
      desc: 'Prismatic and cylindrical modules tested for State-of-Health (SoH), repurposing Grade-B cells for solar storage.'
    },
    {
      icon: Lock,
      title: 'Secure Direct Settlement',
      desc: 'Funds held securely until part receipt and mechanical validation are confirmed by the customer.'
    }
  ];

  return (
    <section className="section-py" style={{ backgroundColor: '#F7F8FA' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">CIRCULAR INTEGRITY</span>
          <h2 className="section-title">Built on Trust, Precision & Science.</h2>
          <p className="section-desc">
            We hold automotive reuse to the same exacting standards as primary aerospace and OEM engineering.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24,
          }}
        >
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="card"
                style={{
                  padding: '32px 28px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 20,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '14px',
                    backgroundColor: '#F0F4FF',
                    color: '#3478F6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={24} />
                </div>

                <div>
                  <h3
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: '#17243A',
                      marginBottom: 8,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.925rem', color: '#737780', lineHeight: 1.55 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
