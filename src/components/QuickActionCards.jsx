import React from 'react';
import { ShoppingBag, Tag, Truck, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ReflectiveCard from './ReflectiveCard/ReflectiveCard';
import FoldText from './FoldText/FoldText';

export default function QuickActionCards() {
  const { navigate } = useApp();

  const cards = [
    {
      id: 'buy',
      eyebrow: 'CERTIFIED INVENTORY',
      title: 'Buy Automotive Parts',
      description: 'Precision-tested OEM parts, electric drive motors, and performance upgrades with fitment guarantee.',
      cta: 'Explore Marketplace',
      icon: ShoppingBag,
      accentColor: '#3478F6',
      badge: '180-Day Warranty',
      status: 'Active Inventory',
      image: 'https://images.unsplash.com/photo-1600793575654-910699b5e4d4?auto=format&fit=crop&w=900&q=80',
      highlights: ['99.8% Fitment Guaranteed', 'Ultrasonic Cleaned & Certified', 'Nationwide Insured Delivery'],
      action: () => navigate('parts')
    },
    {
      id: 'sell',
      eyebrow: 'ZERO HASSLE LISTING',
      title: 'Sell Your Parts',
      description: 'List surplus components or salvaged modules. Connect directly with verified buyers nationwide.',
      cta: 'Create Part Listing',
      icon: Tag,
      accentColor: '#17243A',
      badge: 'Direct Payouts',
      status: 'Instant Appraisal',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeJxUk2gGss0Xgmo9K69MjZ9v3wh5DRbnXnrCtAOOmkw&s=10',
      highlights: ['Zero Upfront Listing Fee', 'Automated Pricing Recommendation', 'Escrow-Protected Settlement'],
      action: () => navigate('sell')
    },
    {
      id: 'scrap',
      eyebrow: 'RESPONSIBLE RECOVERY',
      title: 'Arrange Scrap Pickup',
      description: 'Accidental, end-of-life, or flood vehicles. Get a verified appraisal and doorstep hydraulic recovery.',
      cta: 'Request Doorstep Pickup',
      icon: Truck,
      accentColor: '#24865A',
      badge: 'Zero Landfill Target',
      status: 'Govt Certified Recycler',
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=900&q=80',
      highlights: ['Doorstep Hydraulic Winch Lift', 'Transparent Metallurgical Weighing', 'Official RTO De-Registration'],
      action: () => navigate('scrap-pickup')
    }
  ];

  return (
    <section id="three-pillars-section" className="section-py" style={{ backgroundColor: '#F7F8FA' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">THE THREE PILLARS</span>
          <h2 className="section-title" style={{ minHeight: '1.2em' }}>
            <FoldText
              text="One Unified Ecosystem for Every Component."
              foldStyle="paper"
              hinge="top"
              fontSize="inherit"
              fontWeight={700}
              color="#17243A"
              trigger="mount"
            />
          </h2>
          <p className="section-desc">
            Whether you are restoring a sports sedan, clearing workshop inventory, or recycling an entire
            commercial fleet, Autolux Loop simplifies the process with certified reliability.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 28,
            alignItems: 'stretch',
          }}
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <ReflectiveCard
                key={card.id}
                theme="light"
                width="100%"
                height="auto"
                radius={24}
                glare={0.4}
                shine={0.9}
                bevel={3}
                enableTilt={true}
                tiltStrength={8}
                style={{
                  minHeight: 540,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    padding: '24px 22px 20px',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  <div>
                    {/* Visual Card Image Banner */}
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: 200,
                        borderRadius: 18,
                        overflow: 'hidden',
                        marginBottom: 20,
                        backgroundColor: '#EBECEF',
                        boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
                      }}
                    >
                      <img
                        src={card.image}
                        alt={card.title}
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

                      {/* Pill Badge Overlay on Image */}
                      <div
                        style={{
                          position: 'absolute',
                          top: 12,
                          left: 12,
                          padding: '5px 12px',
                          borderRadius: '9999px',
                          backgroundColor: 'rgba(255, 255, 255, 0.92)',
                          backdropFilter: 'blur(12px)',
                          WebkitBackdropFilter: 'blur(12px)',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                          fontSize: '0.725rem',
                          fontWeight: 700,
                          color: card.accentColor,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                        }}
                      >
                        <Icon size={14} />
                        {card.badge}
                      </div>

                      {/* Status indicator pill */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 12,
                          right: 12,
                          padding: '4px 10px',
                          borderRadius: '9999px',
                          backgroundColor: 'rgba(23, 36, 58, 0.78)',
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          color: '#FFFFFF',
                          fontSize: '0.675rem',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                        }}
                      >
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            backgroundColor: '#24865A',
                            boxShadow: '0 0 6px #24865A',
                          }}
                        />
                        {card.status}
                      </div>
                    </div>

                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: card.accentColor,
                        display: 'block',
                        marginBottom: 6,
                      }}
                    >
                      {card.eyebrow}
                    </span>

                    <h3
                      style={{
                        fontSize: '1.45rem',
                        fontWeight: 700,
                        color: '#17243A',
                        marginBottom: 10,
                        lineHeight: 1.25,
                      }}
                    >
                      {card.title}
                    </h3>

                    <p
                      style={{
                        fontSize: '0.925rem',
                        lineHeight: 1.55,
                        color: '#737780',
                        marginBottom: 18,
                      }}
                    >
                      {card.description}
                    </p>

                    {/* Key Assurance Highlights List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 24 }}>
                      {card.highlights.map((h, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.825rem', color: '#4B5563' }}>
                          <CheckCircle2 size={15} color={card.accentColor} style={{ flexShrink: 0 }} />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={card.action}
                      className="btn btn-secondary"
                      style={{
                        width: '100%',
                        justifyContent: 'space-between',
                        padding: '12px 20px',
                        borderRadius: '14px',
                        fontWeight: 600,
                        backgroundColor: '#FFFFFF',
                        border: '1px solid rgba(0,0,0,0.08)',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                        cursor: 'pointer',
                      }}
                    >
                      <span>{card.cta}</span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </ReflectiveCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
