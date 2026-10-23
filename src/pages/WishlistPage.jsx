import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function WishlistPage() {
  const { wishlist, products, toggleWishlist, addToCart, navigate } = useApp();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  const formatINR = (amt) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amt);
  };

  return (
    <div style={{ paddingTop: 96, paddingBottom: 100, backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: 1040 }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <span className="section-eyebrow">SAVED SPECIFICATIONS</span>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#17243A', letterSpacing: '-0.025em' }}>
            Your Wishlist ({savedProducts.length})
          </h1>
          <p style={{ fontSize: '1rem', color: '#737780', marginTop: 6 }}>
            Saved OEM assemblies and components ready for direct fitment review or purchase.
          </p>
        </div>

        {savedProducts.length === 0 ? (
          <div
            style={{
              padding: '80px 24px',
              textAlign: 'center',
              backgroundColor: '#F8F9FA',
              borderRadius: '24px',
              border: '1px dashed rgba(0,0,0,0.1)',
            }}
          >
            <Heart size={44} color="#86868B" style={{ margin: '0 auto 16px auto' }} />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#17243A', marginBottom: 8 }}>
              No saved parts in your wishlist
            </h2>
            <p style={{ color: '#737780', marginBottom: 24, maxWidth: 360, margin: '0 auto 24px auto' }}>
              Explore our marketplace and tap the heart icon to bookmark parts for quick comparison.
            </p>
            <button onClick={() => navigate('parts')} className="btn btn-blue btn-lg">
              Explore Parts Marketplace
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 24,
            }}
          >
            {savedProducts.map((p) => (
              <div
                key={p.id}
                className="card"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ position: 'relative', width: '100%', paddingTop: '68%', backgroundColor: '#F8F9FA' }}>
                  <img
                    src={p.images[0]}
                    alt=""
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <button
                    onClick={() => toggleWishlist(p.id)}
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#EF4444',
                    }}
                    title="Remove from wishlist"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <span className="badge badge-mint" style={{ marginBottom: 8 }}>
                      {p.condition}
                    </span>
                    <h3
                      onClick={() => navigate('product-detail', { id: p.id })}
                      style={{ fontSize: '1.1rem', fontWeight: 700, color: '#17243A', marginBottom: 6, cursor: 'pointer' }}
                    >
                      {p.title}
                    </h3>
                    <div style={{ fontSize: '0.8rem', color: '#737780', marginBottom: 16 }}>
                      Fits {p.compatibility.makes.join(', ')} ({p.compatibility.years})
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#17243A', marginBottom: 14 }}>
                      {formatINR(p.price)}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 10 }}>
                      <button
                        onClick={() => addToCart(p, 1)}
                        className="btn btn-primary"
                        style={{ gap: 6 }}
                      >
                        <ShoppingBag size={16} />
                        Add to Bag
                      </button>
                      <button
                        onClick={() => navigate('product-detail', { id: p.id })}
                        className="btn btn-secondary"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
