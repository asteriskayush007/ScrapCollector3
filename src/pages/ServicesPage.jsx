import React from 'react';
import { ShoppingBag, Tag, Truck, RefreshCw, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ServicesPage() {
  const { navigate } = useApp();

  const services = [
    {
      title: 'Automotive Parts Marketplace',
      tag: 'Core Platform',
      icon: ShoppingBag,
      desc: 'Browse thousands of certified OEM parts, tested performance upgrades, and surplus components with chassis compatibility guarantee.',
      features: ['Fitment cross-referencing', '180-Day Guarantee', 'Insured shock-resistant crating'],
      action: () => navigate('parts'),
      cta: 'Explore Parts'
    },
    {
      title: 'Seller Listing Services',
      tag: 'Zero Commission Starter',
      icon: Tag,
      desc: 'List surplus components or salvaged inventory with our 5-step guided wizard. Reach automotive workshops and enthusiasts nationwide.',
      features: ['Automated attribute tagging', 'Escrow payment protection', 'National courier pickups'],
      action: () => navigate('sell'),
      cta: 'Create Listing'
    },
    {
      title: 'Doorstep Scrap Vehicle Collection',
      tag: 'Signature Logistics',
      icon: Truck,
      desc: 'Comprehensive appraisal and collection for accident-damaged cars, total losses, and commercial trucks. Hydraulic ramp recovery on-site.',
      features: ['Appraisal quote within 4 hours', 'Certified depollution standard', 'Official RTO scrap certificate'],
      action: () => navigate('scrap-pickup'),
      cta: 'Arrange Collection'
    },
    {
      title: 'High-Voltage EV Battery Diagnostics',
      tag: 'Advanced Engineering',
      icon: Cpu,
      desc: 'State-of-Health (SoH) characterization of high-voltage lithium battery packs, modules, and silicon-carbide inverters for circular reuse.',
      features: ['Cell resistance testing', 'Thermal cycle analysis', 'Second-life solar repurposing'],
      action: () => navigate('parts', { category: 'ev-battery' }),
      cta: 'EV Battery Tech'
    }
  ];

  return (
    <div style={{ paddingTop: 96, paddingBottom: 100, backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="section-eyebrow">COMPREHENSIVE SOLUTIONS</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, color: '#17243A', letterSpacing: '-0.025em' }}>
            Engineered Services for Circular Mobility.
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#737780', maxWidth: 620, margin: '12px auto 0 auto' }}>
            From single replacement calipers to fleet-wide decommissioning, Autolux Loop delivers precision at scale.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28, marginBottom: 60 }}>
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="card" style={{ padding: '36px', backgroundColor: '#F8F9FA', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div style={{ width: 44, height: 44, borderRadius: '12px', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3478F6' }}>
                      <Icon size={22} />
                    </div>
                    <span className="badge badge-silver">{s.tag}</span>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#17243A', marginBottom: 10 }}>
                    {s.title}
                  </h3>

                  <p style={{ fontSize: '0.95rem', color: '#737780', lineHeight: 1.6, marginBottom: 20 }}>
                    {s.desc}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
                    {s.features.map((f, i) => (
                      <div key={i} style={{ fontSize: '0.85rem', color: '#17243A', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#24865A' }} />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button onClick={s.action} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'space-between' }}>
                  <span>{s.cta}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
