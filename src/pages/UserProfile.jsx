import React, { useState } from 'react';
import {
  User,
  ShoppingBag,
  Heart,
  Truck,
  MapPin,
  Settings,
  Shield,
  Tag,
  Package,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function UserProfile() {
  const { orders, wishlist, products, pickupRequests, navigate } = useApp();
  const [activeTab, setActiveTab] = useState('orders');

  const formatINR = (amt) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amt);
  };

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div style={{ paddingTop: 96, paddingBottom: 100, backgroundColor: '#F7F8FA', minHeight: '100vh' }}>
      <div className="container">
        {/* Profile Card Header */}
        <div
          className="card"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '28px',
            padding: '36px',
            marginBottom: 36,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                backgroundColor: '#17243A',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.6rem',
                fontWeight: 700,
              }}
            >
              AY
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#17243A' }}>
                  Ansh Yadav
                </h1>
                <span className="badge badge-mint">Verified Member</span>
              </div>
              <p style={{ color: '#737780', fontSize: '0.9rem', marginTop: 2 }}>
                ansh.yadav@autoluxloop.internal • Member since 2025
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => navigate('sell')} className="btn btn-secondary">
              List a Part
            </button>
            <button onClick={() => navigate('scrap-pickup')} className="btn btn-mint">
              Request Pickup
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            marginBottom: 28,
            borderBottom: '1px solid rgba(0,0,0,0.06)',
            paddingBottom: 12,
            overflowX: 'auto',
          }}
        >
          {[
            { id: 'orders', label: `Orders (${orders.length})`, icon: Package },
            { id: 'pickups', label: `Scrap Requests (${pickupRequests.length})`, icon: Truck },
            { id: 'wishlist', label: `Wishlist (${wishlist.length})`, icon: Heart },
            { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 18px',
                  borderRadius: '9999px',
                  backgroundColor: isActive ? '#17243A' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#737780',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.875rem',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'orders' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {orders.length === 0 ? (
              <div className="card" style={{ padding: '60px', textAlign: 'center', backgroundColor: '#FFFFFF', borderRadius: '24px' }}>
                <p>No orders placed yet.</p>
              </div>
            ) : (
              orders.map((ord) => (
                <div
                  key={ord.id}
                  className="card"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '24px',
                    padding: '28px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingBottom: 14, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                    <div>
                      <span style={{ fontSize: '1rem', fontWeight: 800, color: '#17243A' }}>
                        Order #{ord.id}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#86868B', marginLeft: 10 }}>
                        {new Date(ord.date).toLocaleDateString()}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span className="badge badge-mint">{ord.status}</span>
                      <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#17243A' }}>
                        {formatINR(ord.total)}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {ord.items.map((it, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <img
                          src={it.product.images[0]}
                          alt=""
                          style={{ width: 60, height: 60, borderRadius: '12px', objectFit: 'cover' }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, color: '#17243A' }}>{it.product.title}</div>
                          <div style={{ fontSize: '0.8rem', color: '#737780' }}>
                            Qty: {it.quantity} • OEM: {it.product.partNumber}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'pickups' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {pickupRequests.map((req) => (
              <div
                key={req.id}
                className="card"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 20,
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#17243A' }}>
                      {req.id}
                    </span>
                    <span className="badge badge-blue">{req.status}</span>
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#17243A' }}>
                    {req.vehicleDetails}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: '#737780' }}>
                    Location: {req.address}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  {req.valuationEstimate && (
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.75rem', color: '#86868B' }}>Estimate</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#24865A' }}>
                        {formatINR(req.valuationEstimate)}
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => navigate('my-pickups', { id: req.id })}
                    className="btn btn-secondary btn-sm"
                    style={{ gap: 6 }}
                  >
                    View Status
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 20,
            }}
          >
            {savedProducts.map((p) => (
              <div key={p.id} className="card" style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '20px' }}>
                <img src={p.images[0]} alt="" style={{ width: '100%', height: 160, borderRadius: '14px', objectFit: 'cover', marginBottom: 12 }} />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#17243A', marginBottom: 6 }}>{p.title}</h3>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#17243A', marginBottom: 14 }}>{formatINR(p.price)}</div>
                <button onClick={() => navigate('product-detail', { id: p.id })} className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
                  View Component
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'addresses' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '20px' }}>
              <span className="badge badge-blue" style={{ marginBottom: 12 }}>Primary Delivery Hub</span>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#17243A', marginBottom: 4 }}>
                Ansh Yadav (Automotive Studio)
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#737780', lineHeight: 1.5 }}>
                402, Signature Towers, Bandra Kurla Complex, Mumbai, Maharashtra 400051 <br />
                Phone: +91 98199 87654
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
