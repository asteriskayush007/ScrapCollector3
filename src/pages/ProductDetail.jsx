import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Zap,
  Info,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ProductDetail() {
  const { products, pageParams, addToCart, toggleWishlist, isInWishlist, navigate } = useApp();

  const product = products.find((p) => p.id === pageParams.id) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedQty, setSelectedQty] = useState(1);
  const [compatMake, setCompatMake] = useState('');
  const [compatResult, setCompatResult] = useState(null);

  const isSaved = isInWishlist(product.id);

  const formatINR = (amt) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amt);
  };

  const checkCompatibility = () => {
    if (!compatMake.trim()) return;
    const isFit = product.compatibility.makes.some((m) =>
      m.toLowerCase().includes(compatMake.toLowerCase().trim())
    );
    setCompatResult(isFit);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedQty);
    navigate('checkout');
  };

  return (
    <div style={{ paddingTop: 96, paddingBottom: 100, backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: '#737780', marginBottom: 28 }}>
          <button onClick={() => navigate('parts')} style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#3478F6', fontWeight: 600 }}>
            <ArrowLeft size={16} />
            Back to Marketplace
          </button>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span style={{ color: '#17243A', fontWeight: 600 }}>{product.title}</span>
        </div>

        {/* 2-Column Product Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: 48,
            marginBottom: 64,
          }}
        >
          {/* Left Column: Image Gallery */}
          <div>
            <div
              style={{
                width: '100%',
                paddingTop: '75%',
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                backgroundColor: '#F8F9FA',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                marginBottom: 16,
              }}
            >
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <div style={{ position: 'absolute', top: 16, left: 16 }}>
                <span
                  className={`badge ${
                    product.condition === 'New OEM'
                      ? 'badge-blue'
                      : product.condition === 'Certified Refurbished'
                      ? 'badge-mint'
                      : 'badge-silver'
                  }`}
                  style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                >
                  {product.condition}
                </span>
              </div>
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: 12 }}>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: '14px',
                      overflow: 'hidden',
                      border: activeImageIndex === idx ? '2px solid #3478F6' : '1px solid rgba(0,0,0,0.08)',
                      padding: 0,
                      cursor: 'pointer',
                      opacity: activeImageIndex === idx ? 1 : 0.65,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}

            {/* Seller Verification Box */}
            <div
              style={{
                marginTop: 24,
                padding: '20px',
                borderRadius: '18px',
                backgroundColor: '#F8F9FA',
                border: '1px solid rgba(0,0,0,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#86868B', textTransform: 'uppercase' }}>
                  Certified Disassembly Facility
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#17243A', marginTop: 2 }}>
                  {product.seller.name}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#737780' }}>
                  {product.seller.location} • ★ {product.seller.rating} / 5.0
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 12px',
                  borderRadius: '9999px',
                  backgroundColor: '#EBF8F2',
                  color: '#24865A',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                }}
              >
                <ShieldCheck size={16} />
                <span>Verified Partner</span>
              </div>
            </div>
          </div>

          {/* Right Column: Specs, Fitment, Price & Purchase Actions */}
          <div>
            <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: '#86868B', marginBottom: 6 }}>
              OEM CODE: {product.oemCode || product.partNumber}
            </div>

            <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 700, color: '#17243A', lineHeight: 1.2, marginBottom: 16 }}>
              {product.title}
            </h1>

            {/* Pricing Section */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 20 }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: '#17243A', letterSpacing: '-0.02em' }}>
                {formatINR(product.price)}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '1.1rem', color: '#86868B', textDecoration: 'line-through' }}>
                  MRP {formatINR(product.originalPrice)}
                </span>
              )}
              <span style={{ padding: '4px 10px', borderRadius: '9999px', backgroundColor: '#EBF8F2', color: '#24865A', fontSize: '0.8rem', fontWeight: 700 }}>
                Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            </div>

            <p style={{ fontSize: '1.05rem', color: '#737780', lineHeight: 1.6, marginBottom: 28 }}>
              {product.description}
            </p>

            {/* Live Vehicle Fitment Verification Tool */}
            <div
              style={{
                padding: '20px',
                borderRadius: '20px',
                backgroundColor: '#F8F9FA',
                border: '1px solid rgba(0,0,0,0.06)',
                marginBottom: 28,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', fontWeight: 700, color: '#17243A', marginBottom: 12 }}>
                <CheckCircle2 size={16} color="#3478F6" />
                <span>Verify Fitment with Your Vehicle</span>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <input
                  type="text"
                  placeholder="Enter your vehicle make (e.g., Porsche, BMW, Tesla)..."
                  value={compatMake}
                  onChange={(e) => {
                    setCompatMake(e.target.value);
                    setCompatResult(null);
                  }}
                  className="input-field"
                  style={{ padding: '10px 14px', fontSize: '0.875rem' }}
                />
                <button onClick={checkCompatibility} className="btn btn-secondary btn-sm" style={{ flexShrink: 0 }}>
                  Check Fitment
                </button>
              </div>

              {compatResult !== null && (
                <div
                  style={{
                    marginTop: 12,
                    padding: '10px 14px',
                    borderRadius: '12px',
                    backgroundColor: compatResult ? '#EBF8F2' : '#FEE2E2',
                    color: compatResult ? '#24865A' : '#EF4444',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  {compatResult ? <Check size={16} /> : <Info size={16} />}
                  <span>
                    {compatResult
                      ? `Confirmed! Guaranteed fitment for ${compatMake} models (${product.compatibility.years}).`
                      : `Potential mismatch: This part is documented for ${product.compatibility.makes.join(', ')}. Contact us to verify your chassis.`}
                  </span>
                </div>
              )}

              <div style={{ fontSize: '0.8rem', color: '#86868B', marginTop: 10 }}>
                Documented fits: {product.compatibility.makes.join(', ')} ({product.compatibility.models.join(', ')}) [{product.compatibility.years}]
              </div>
            </div>

            {/* Purchase Row */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
              <button
                onClick={() => addToCart(product, selectedQty)}
                className="btn btn-blue btn-lg"
                style={{ flex: 1, gap: 8 }}
              >
                <ShoppingBag size={18} />
                Add to Bag
              </button>

              <button
                onClick={handleBuyNow}
                className="btn btn-primary btn-lg"
                style={{ flex: 1 }}
              >
                Buy Now
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className="btn btn-secondary btn-lg"
                style={{ padding: '16px 20px' }}
                aria-label="Wishlist"
              >
                <Heart size={20} fill={isSaved ? '#EF4444' : 'none'} color={isSaved ? '#EF4444' : '#1D1D1F'} />
              </button>
            </div>

            {/* Guarantee Guarantees */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, paddingTop: 20, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.85rem', color: '#737780' }}>
                <ShieldCheck size={18} color="#24865A" />
                <span>{product.warranty || '180-Day Guarantee'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.85rem', color: '#737780' }}>
                <Truck size={18} color="#3478F6" />
                <span>Insured Automotive Dispatch</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications & Lab Inspection Table */}
        <div
          style={{
            backgroundColor: '#F8F9FA',
            borderRadius: '24px',
            padding: '40px',
            border: '1px solid rgba(0,0,0,0.06)',
            marginBottom: 64,
          }}
        >
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#17243A', marginBottom: 20 }}>
            Technical Benchmark Specifications
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 16,
            }}
          >
            {product.specs.map((spec, i) => (
              <div
                key={i}
                style={{
                  padding: '16px 20px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ fontSize: '0.8rem', color: '#86868B', textTransform: 'uppercase', marginBottom: 4 }}>
                  {spec.label}
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#17243A' }}>
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
