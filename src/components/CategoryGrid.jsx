import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PART_CATEGORIES } from '../data/mockData';
import { useApp } from '../context/AppContext';
import FoldText from './FoldText/FoldText';

export default function CategoryGrid() {
  const { navigate } = useApp();

  return (
    <section className="section-py" style={{ backgroundColor: '#F7F8FA' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">COMPONENT CLASSIFICATION</span>
          <h2 className="section-title" style={{ minHeight: '1.2em' }}>
            <FoldText
              text="Engineered by Category."
              foldStyle="paper"
              hinge="top"
              fontSize="inherit"
              fontWeight={700}
              color="#17243A"
              trigger="mount"
            />
          </h2>
          <p className="section-desc">
            Explore authentic automotive assemblies, each pressure-tested and certified by master technicians.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 20,
          }}
        >
          {PART_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate('parts', { category: cat.id })}
              className="card"
              style={{
                position: 'relative',
                height: 280,
                borderRadius: '24px',
                cursor: 'pointer',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '24px',
              }}
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                style={{
                  position: 'absolute',
                  inset: 0,
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

              {/* Dark Gradient Overlay for text contrast */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(23,36,58,0.4) 40%, rgba(23,36,58,0.92) 100%)',
                }}
              />

              {/* Category Info */}
              <div style={{ position: 'relative', zIndex: 2, color: '#FFFFFF' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      color: '#DDF5E8',
                    }}
                  >
                    {cat.count}
                  </span>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                    }}
                  >
                    <ArrowUpRight size={17} />
                  </div>
                </div>

                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    letterSpacing: '-0.015em',
                  }}
                >
                  {cat.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
