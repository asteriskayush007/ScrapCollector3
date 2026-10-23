import React, { useState } from 'react';
import {
  Search,
  CheckCircle,
  Truck,
  Box,
  UploadCloud,
  FileCheck,
  CreditCard,
  CalendarCheck,
  Wrench,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import FoldText from './FoldText/FoldText';

export default function HowItWorks() {
  const { navigate } = useApp();
  const [activeTab, setActiveTab] = useState('buy');

  const flows = {
    buy: {
      title: 'Buying Certified Automotive Parts',
      description: 'Find verified OEM components matched directly to your vehicle chassis or part number.',
      cta: 'Browse All Parts',
      action: () => navigate('parts'),
      steps: [
        {
          number: '01',
          icon: Search,
          title: 'Search & Match Fitment',
          desc: 'Input your make, model, year, or OEM part number. Our database confirms fitment with 99.8% precision.',
          image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80'
        },
        {
          number: '02',
          icon: ShieldCheck,
          title: 'Verified Condition Report',
          desc: 'Inspect high-res photos, wear metrics, pressure tests, and certified refurbishment documentation.',
          image: 'https://images.unsplash.com/photo-1600793575654-910699b5e4d4?auto=format&fit=crop&w=600&q=80'
        },
        {
          number: '03',
          icon: Box,
          title: 'Express Doorstep Delivery',
          desc: 'Securely packaged with anti-shock crating and dispatched via insured automotive logistics.',
          image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80'
        },
        {
          number: '04',
          icon: CheckCircle,
          title: '180-Day Guarantee',
          desc: 'Test and install with peace of mind. Every part includes our standard hassle-free return window.',
          image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80'
        }
      ]
    },
    sell: {
      title: 'Listing Surplus Components',
      description: 'Monetize excess inventory, salvage modules, or performance take-offs with zero listing fees.',
      cta: 'Start a Listing',
      action: () => navigate('sell'),
      steps: [
        {
          number: '01',
          icon: Wrench,
          title: 'Specify Vehicle & Model',
          desc: 'Select donor vehicle category, manufacturer, year, and trim to auto-populate part attributes.',
          image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80'
        },
        {
          number: '02',
          icon: UploadCloud,
          title: 'Upload Real Photos',
          desc: 'Take multi-angle photos showing serial codes, mounting tabs, and overall cosmetic condition.',
          image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
        },
        {
          number: '03',
          icon: FileCheck,
          title: 'Set Fair Price & Publish',
          desc: 'Review market valuations, establish your asking price in ₹ INR, and publish to buyers nationwide.',
          image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80'
        },
        {
          number: '04',
          icon: CreditCard,
          title: 'Instant Verified Payout',
          desc: 'Once the buyer confirms delivery and installation, funds are settled directly to your bank account.',
          image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80'
        }
      ]
    },
    scrap: {
      title: 'Scrap & End-of-Life Vehicle Collection',
      description: 'Transparent automotive recycling with certified government depollution and top metallurgical value.',
      cta: 'Arrange Scrap Pickup',
      action: () => navigate('scrap-pickup'),
      steps: [
        {
          number: '01',
          icon: UploadCloud,
          title: 'Submit Vehicle Specs',
          desc: 'Tell us what you have: car, motorcycle, truck, or industrial scrap. Upload pictures of condition.',
          image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80'
        },
        {
          number: '02',
          icon: ShieldCheck,
          title: 'Transparent Instant Valuation',
          desc: 'Our metallurgical algorithm calculates market scrap rates based on curb weight, catalytic recovery & copper content.',
          image: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=600&q=80'
        },
        {
          number: '03',
          icon: CalendarCheck,
          title: 'Doorstep Hydraulic Pickup',
          desc: 'Our flatbed towing unit arrives with certified digital scales. Immediate instant bank transfer upon inspection.',
          image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80'
        },
        {
          number: '04',
          icon: Truck,
          title: 'Eco-Depollution & COD',
          desc: 'Fluids drained, toxic components disposed of responsibly, and official Certificate of Destruction issued for RTO cancellation.',
          image: 'https://images.unsplash.com/photo-1558441719-8d8a7cbb0299?auto=format&fit=crop&w=600&q=80'
        }
      ]
    }
  };

  const currentFlow = flows[activeTab];

  return (
    <section className="section-py" style={{ backgroundColor: '#F7F8FA' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">TRANSPARENT METHODOLOGY</span>
          <h2 className="section-title" style={{ minHeight: '1.2em' }}>
            <FoldText
              text="Three Distinct Paths. One High Standard."
              foldStyle="paper"
              hinge="top"
              fontSize="inherit"
              fontWeight={700}
              color="#17243A"
              trigger="mount"
            />
          </h2>
          <p className="section-desc">
            Whether buying components, selling excess inventory, or depolluting an entire end-of-life
            vehicle, our certified workflows guarantee precision.
          </p>

          {/* Tab Switcher */}
          <div
            style={{
              display: 'inline-flex',
              padding: '6px',
              borderRadius: '9999px',
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              marginTop: 28,
            }}
          >
            <button
              onClick={() => setActiveTab('buy')}
              style={{
                padding: '10px 24px',
                borderRadius: '9999px',
                fontSize: '0.9rem',
                fontWeight: activeTab === 'buy' ? 700 : 500,
                backgroundColor: activeTab === 'buy' ? '#3478F6' : 'transparent',
                color: activeTab === 'buy' ? '#FFFFFF' : '#737780',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              1. Buy Parts
            </button>
            <button
              onClick={() => setActiveTab('sell')}
              style={{
                padding: '10px 24px',
                borderRadius: '9999px',
                fontSize: '0.9rem',
                fontWeight: activeTab === 'sell' ? 700 : 500,
                backgroundColor: activeTab === 'sell' ? '#17243A' : 'transparent',
                color: activeTab === 'sell' ? '#FFFFFF' : '#737780',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              2. Sell Parts
            </button>
            <button
              onClick={() => setActiveTab('scrap')}
              style={{
                padding: '10px 24px',
                borderRadius: '9999px',
                fontSize: '0.9rem',
                fontWeight: activeTab === 'scrap' ? 700 : 500,
                backgroundColor: activeTab === 'scrap' ? '#24865A' : 'transparent',
                color: activeTab === 'scrap' ? '#FFFFFF' : '#737780',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              3. Scrap Pickup
            </button>
          </div>
        </div>

        {/* Dynamic Workflow Steps Grid with Images */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 22,
            marginBottom: 48,
          }}
        >
          {currentFlow.steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="card"
                style={{
                  padding: '20px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '22px',
                  border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  overflow: 'hidden',
                }}
              >
                <div>
                  {/* Step Image */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: 140,
                      borderRadius: '16px',
                      overflow: 'hidden',
                      marginBottom: 18,
                      backgroundColor: '#F3F4F6',
                    }}
                  >
                    <img
                      src={step.image}
                      alt={step.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.06)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1.0)';
                      }}
                    />

                    {/* Number Badge Overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        padding: '3px 10px',
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(23, 36, 58, 0.82)',
                        backdropFilter: 'blur(8px)',
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                      }}
                    >
                      {step.number}
                    </div>

                    {/* Step Icon Overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 10,
                        left: 10,
                        width: 36,
                        height: 36,
                        borderRadius: '10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.94)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color:
                          activeTab === 'buy'
                            ? '#3478F6'
                            : activeTab === 'sell'
                            ? '#17243A'
                            : '#24865A',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                      }}
                    >
                      <Icon size={18} />
                    </div>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: '#17243A',
                      marginBottom: 8,
                    }}
                  >
                    {step.title}
                  </h3>

                  <p style={{ fontSize: '0.875rem', color: '#737780', lineHeight: 1.55 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={currentFlow.action}
            className={`btn ${
              activeTab === 'buy'
                ? 'btn-blue'
                : activeTab === 'sell'
                ? 'btn-primary'
                : 'btn-mint'
            } btn-lg`}
            style={{ gap: 8 }}
          >
            {currentFlow.cta}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
