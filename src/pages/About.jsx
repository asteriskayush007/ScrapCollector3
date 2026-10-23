import React from 'react';
import { ShieldCheck, RefreshCw, Cpu, Award, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function About() {
  const { navigate } = useApp();

  return (
    <div style={{ paddingTop: 96, paddingBottom: 100, backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: 960 }}>
        {/* Editorial Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="section-eyebrow">OUR PHILOSOPHY</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 800, color: '#17243A', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            "Automotive parts, <br />
            given a second life."
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#737780', marginTop: 16, maxWidth: 640, margin: '16px auto 0 auto', lineHeight: 1.6 }}>
            Autolux Loop was conceived to bridge the gap between high-performance automotive engineering and
            responsible circular metallurgy.
          </p>
        </div>

        {/* Cinematic Imagery Card */}
        <div
          style={{
            borderRadius: '28px',
            overflow: 'hidden',
            height: 380,
            marginBottom: 56,
            position: 'relative',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80"
            alt="Automotive craft"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent 50%, rgba(23,36,58,0.85) 100%)',
            }}
          />
          <div style={{ position: 'absolute', bottom: 32, left: 32, color: '#FFFFFF' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#DDF5E8', textTransform: 'uppercase' }}>
              Precision Metallurgy
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>
              Zero compromise on mechanical integrity.
            </div>
          </div>
        </div>

        {/* Narrative Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 36, fontSize: '1.1rem', color: '#737780', lineHeight: 1.7, marginBottom: 56 }}>
          <p>
            Modern vehicles are extraordinary feats of precision engineering. When a vehicle reaches the end
            of its journey or suffers an insurance write-off, tens of thousands of dollars worth of surgical
            OEM components—forged control arms, high-voltage silicon carbide inverters, monobloc calipers, and
            turbines—remain in pristine condition.
          </p>
          <p>
            Historically, the salvage sector has been chaotic, opaque, and inefficient. Autolux Loop replaces
            disorganized scrapyards with a streamlined, Apple-inspired digital ecosystem. We benchmark, test,
            ultrasonic-clean, and certify every component so workshops, enthusiasts, and fleet operators can
            source with absolute confidence.
          </p>
        </div>

        {/* 4 Pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, marginBottom: 64 }}>
          <div className="card" style={{ padding: '28px', borderRadius: '20px', backgroundColor: '#F8F9FA' }}>
            <RefreshCw size={28} color="#3478F6" style={{ marginBottom: 14 }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#17243A', marginBottom: 8 }}>
              Circular Motion
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#737780' }}>
              Every component reused prevents dozens of kilograms of virgin mining and smelter emissions.
            </p>
          </div>

          <div className="card" style={{ padding: '28px', borderRadius: '20px', backgroundColor: '#F8F9FA' }}>
            <ShieldCheck size={28} color="#24865A" style={{ marginBottom: 14 }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#17243A', marginBottom: 8 }}>
              180-Day Guarantee
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#737780' }}>
              Laboratory pressure tests and laser vibration benchmarks protect every purchase.
            </p>
          </div>

          <div className="card" style={{ padding: '28px', borderRadius: '20px', backgroundColor: '#F8F9FA' }}>
            <Cpu size={28} color="#17243A" style={{ marginBottom: 14 }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#17243A', marginBottom: 8 }}>
              EV Battery Repurposing
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#737780' }}>
              We test cells for State-of-Health (SoH), transitioning automotive packs into second-life energy storage.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <button onClick={() => navigate('parts')} className="btn btn-primary btn-lg" style={{ gap: 8 }}>
            Explore Verified Catalog
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
