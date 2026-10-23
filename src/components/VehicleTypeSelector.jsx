import React from 'react';
import { Car, Zap, Bike, Truck, Bus, Wrench, ArrowRight } from 'lucide-react';
import { VEHICLE_TYPES } from '../data/mockData';
import { useApp } from '../context/AppContext';
import FoldText from './FoldText/FoldText';

const ICON_MAP = {
  Car,
  Zap,
  Bike,
  Truck,
  Bus,
  Wrench,
};

const VEHICLE_IMAGES = {
  cars: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=700&q=80',
  ev: 'https://www.shutterstock.com/image-photo/produce-high-quality-visually-clear-260nw-2693251499.jpg',
  motorcycles: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=700&q=80',
  trucks: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=700&q=80',
  buses: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=700&q=80',
  equipment: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=700&q=80'
};

export default function VehicleTypeSelector() {
  const { navigate } = useApp();

  return (
    <section className="section-py" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">FLEET ARCHITECTURE</span>
          <h2 className="section-title" style={{ minHeight: '1.2em' }}>
            <FoldText
              text="Shop by Vehicle Type."
              foldStyle="paper"
              hinge="top"
              fontSize="inherit"
              fontWeight={700}
              color="#17243A"
              trigger="mount"
            />
          </h2>
          <p className="section-desc">
            Direct OEM replacements and high-grade salvaged assemblies categorized by automotive mobility platform.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
          }}
        >
          {VEHICLE_TYPES.map((type) => {
            const Icon = ICON_MAP[type.icon] || Car;
            const imgSrc = VEHICLE_IMAGES[type.id] || VEHICLE_IMAGES.cars;

            return (
              <button
                key={type.id}
                onClick={() => navigate('parts', { vehicleType: type.id })}
                className="card"
                style={{
                  padding: '16px',
                  borderRadius: '22px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div>
                  {/* Visual Card Image Banner */}
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: 140,
                      borderRadius: '16px',
                      overflow: 'hidden',
                      marginBottom: 16,
                      backgroundColor: '#EBECEF',
                    }}
                  >
                    <img
                      src={imgSrc}
                      alt={type.name}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1.0)';
                      }}
                    />

                    {/* Gradient Overlay for Contrast */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                          'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(23,36,58,0.5) 100%)',
                      }}
                    />

                    {/* Floating Icon Pill */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        width: 38,
                        height: 38,
                        borderRadius: '10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.94)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#3478F6',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                      }}
                    >
                      <Icon size={20} />
                    </div>

                    {/* Parts count overlay badge */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        padding: '3px 8px',
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(255, 255, 255, 0.92)',
                        backdropFilter: 'blur(8px)',
                        color: '#17243A',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                      }}
                    >
                      {type.count}
                    </div>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: '#17243A',
                      marginBottom: 6,
                    }}
                  >
                    {type.name}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.825rem',
                      color: '#737780',
                      lineHeight: 1.45,
                      marginBottom: 12,
                    }}
                  >
                    {type.desc}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: 12,
                    borderTop: '1px solid rgba(0,0,0,0.06)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#3478F6',
                    }}
                  >
                    Explore Components
                  </span>
                  <ArrowRight size={15} color="#3478F6" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
