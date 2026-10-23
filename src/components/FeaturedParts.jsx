import React, { useState } from 'react';
import {
  Heart,
  ShoppingBag,
  ShieldCheck,
  Check,
  ArrowRight,
  Eye,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import FoldText from './FoldText/FoldText';

export default function FeaturedParts() {
  const { products, addToCart, toggleWishlist, isInWishlist, navigate, setQuickViewProduct } = useApp();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'All Featured' },
    { id: 'braking', label: 'Braking' },
    { id: 'ev-battery', label: 'EV & High-Voltage' },
    { id: 'powertrain', label: 'Powertrain' },
    { id: 'suspension', label: 'Suspension' },
    { id: 'lighting', label: 'Lighting' },
  ];

  const filtered = products.filter((p) => {
    if (selectedFilter === 'all') return true;
    return p.category === selectedFilter;
  });

  const formatINR = (amt) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amt);
  };

  return (
    <section id="marketplace-preview" className="section-py" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">CURATED INVENTORY</span>
          <h2 className="section-title" style={{ minHeight: '1.2em' }}>
            <FoldText
              text="Featured Parts & Assemblies."
              foldStyle="paper"
              hinge="top"
              fontSize="inherit"
              fontWeight={700}
              color="#17243A"
              trigger="mount"
            />
          </h2>
          <p className="section-desc">
            Directly salvaged and benchmarked against OEM tolerances. Backed by Autolux verification.
          </p>

          {/* Minimalist Filter Pill Tabs */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px',
              borderRadius: '9999px',
              backgroundColor: '#F7F8FA',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              marginTop: 28,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: selectedFilter === tab.id ? 700 : 500,
                  backgroundColor: selectedFilter === tab.id ? '#17243A' : 'transparent',
                  color: selectedFilter === tab.id ? '#FFFFFF' : '#737780',
                  boxShadow: selectedFilter === tab.id ? '0 2px 8px rgba(23, 36, 58, 0.15)' : 'none',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 24,
          }}
        >
          {filtered.slice(0, 8).map((product) => {
            const saved = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Image Area with Aspect Ratio */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    paddingTop: '68%',
                    backgroundColor: '#F8F9FA',
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate('product-detail', { id: product.id })}
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    loading="lazy"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1.0)';
                    }}
                  />

                  {/* Condition Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 14,
                      left: 14,
                      zIndex: 2,
                    }}
                  >
                    <span
                      className={`badge ${
                        product.condition === 'New OEM'
                          ? 'badge-blue'
                          : product.condition === 'Certified Refurbished'
                          ? 'badge-mint'
                          : 'badge-silver'
                      }`}
                    >
                      {product.condition}
                    </span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    style={{
                      position: 'absolute',
                      top: 14,
                      right: 14,
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(8px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: saved ? '#EF4444' : '#1D1D1F',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      zIndex: 2,
                      transition: 'transform 0.2s ease',
                    }}
                    aria-label="Save to wishlist"
                  >
                    <Heart size={18} fill={saved ? '#EF4444' : 'none'} />
                  </button>
                </div>

                {/* Content Area */}
                <div
                  style={{
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    {/* Compatibility pill */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: '#24865A',
                        marginBottom: 8,
                      }}
                    >
                      <CheckCircle2 size={13} />
                      <span>Fits {product.compatibility.makes.slice(0, 2).join(', ')} ({product.compatibility.years})</span>
                    </div>

                    {/* Part Title */}
                    <h3
                      onClick={() => navigate('product-detail', { id: product.id })}
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: '#17243A',
                        lineHeight: 1.35,
                        marginBottom: 10,
                        cursor: 'pointer',
                      }}
                    >
                      {product.title}
                    </h3>

                    {/* OEM Code */}
                    <div
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        color: '#86868B',
                        marginBottom: 16,
                      }}
                    >
                      OEM: {product.oemCode || product.partNumber}
                    </div>
                  </div>

                  <div>
                    {/* Price & Action row */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        justifyContent: 'space-between',
                        paddingTop: 16,
                        borderTop: '1px solid rgba(0,0,0,0.06)',
                        marginBottom: 16,
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#17243A' }}>
                          {formatINR(product.price)}
                        </div>
                        {product.originalPrice && (
                          <div
                            style={{
                              fontSize: '0.8rem',
                              color: '#86868B',
                              textDecoration: 'line-through',
                            }}
                          >
                            MRP {formatINR(product.originalPrice)}
                          </div>
                        )}
                      </div>

                      <span
                        style={{
                          fontSize: '0.725rem',
                          fontWeight: 600,
                          color: '#24865A',
                          backgroundColor: '#EBF8F2',
                          padding: '3px 8px',
                          borderRadius: '9999px',
                        }}
                      >
                        In Stock ({product.stockCount})
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 10 }}>
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="btn btn-primary"
                        style={{ width: '100%', gap: 6, padding: '10px 16px' }}
                      >
                        <ShoppingBag size={16} />
                        Add to Bag
                      </button>

                      <button
                        onClick={() => navigate('product-detail', { id: product.id })}
                        className="btn btn-secondary"
                        style={{ padding: '10px 14px' }}
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All CTA */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <button
            onClick={() => navigate('parts')}
            className="btn btn-secondary btn-lg"
            style={{ gap: 8 }}
          >
            Explore Complete Inventory ({products.length} Parts Available)
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
