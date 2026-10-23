import React, { useState, useEffect } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Truck,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import CardNav from './CardNav/CardNav';

export default function Header({ heroScrollProgress = 0 }) {
  const {
    activePage,
    navigate,
    cart,
    wishlist,
    pickupRequests,
    setIsCartOpen
  } = useApp();

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  // Determine if header should be shown:
  // - On non-home pages: ALWAYS shown
  // - On home page: Shown once the hero scroll scrub completes (heroScrollProgress >= 0.88) or when window scroll > 2000px
  const isHomePage = activePage === 'home';
  const showHeader = !isHomePage || heroScrollProgress >= 0.88 || isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1800) {
        setIsScrolled(true);
      } else if (window.scrollY < 1200 && isHomePage && heroScrollProgress < 0.88) {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage, heroScrollProgress]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;
  const pendingPickups = pickupRequests.filter(
    (p) => p.status !== 'Completed' && p.status !== 'Cancelled'
  ).length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('parts', { query: searchQuery.trim() });
      setSearchModalOpen(false);
      setSearchQuery('');
    }
  };

  const cardNavItems = [
    {
      label: 'Marketplace',
      description: 'Certified OEM parts & precision assemblies.',
      bgColor: '#17243A',
      textColor: '#FFFFFF',
      links: [
        { label: 'All Parts Catalog', onClick: () => navigate('parts') },
        { label: 'Braking Systems', onClick: () => navigate('parts', { category: 'braking' }) },
        { label: 'EV & High-Voltage', onClick: () => navigate('parts', { category: 'ev-battery' }) },
        { label: 'Powertrain & Engine', onClick: () => navigate('parts', { category: 'powertrain' }) },
        { label: 'Suspension & Steering', onClick: () => navigate('parts', { category: 'suspension' }) },
      ]
    },
    {
      label: 'Sell Parts',
      description: 'Monetize surplus components or workshop inventory.',
      links: [
        { label: 'List Auto Parts', onClick: () => navigate('sell') },
        { label: 'Instant Valuation', onClick: () => navigate('sell') },
        { label: 'Seller Verification', onClick: () => navigate('about') },
      ]
    },
    {
      label: 'Scrap & Recycling',
      description: 'Doorstep vehicle collection with zero-landfill target.',
      links: [
        { label: 'Schedule Scrap Pickup', onClick: () => navigate('scrap-pickup') },
        { label: 'Commercial Fleet Scrap', onClick: () => navigate('scrap-pickup') },
        {
          label: pendingPickups > 0 ? `Track Pickups (${pendingPickups})` : 'Track Pickups',
          onClick: () => navigate('my-pickups')
        },
        { label: 'Depollution Process', onClick: () => navigate('how-it-works') },
      ]
    },
    {
      label: 'Platform & Trust',
      description: 'Engineered for transparent circular mobility.',
      links: [
        { label: 'How It Works', onClick: () => navigate('how-it-works') },
        { label: '180-Day Guarantee', onClick: () => navigate('about') },
        { label: 'Sustainability Impact', onClick: () => navigate('about') },
        { label: 'Contact Support', onClick: () => navigate('contact') },
      ]
    }
  ];

  const brandLogo = (
    <button
      onClick={() => navigate('home')}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        textDecoration: 'none',
      }}
      aria-label="Autolux Loop Home"
    >
      

      <div style={{ textAlign: 'left' }}>
        <span
          style={{
            fontSize: '1.05rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#17243A',
            display: 'block',
            lineHeight: 1,
          }}
        >
          AUTOLUX<span style={{ color: '#3478F6', fontWeight: 600 }}>LOOP</span>
        </span>
       
      </div>
    </button>
  );

  const headerActions = (
    <>
      {/* Search Trigger */}
      <button
        onClick={() => setSearchModalOpen(true)}
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#17243A',
          background: 'rgba(0, 0, 0, 0.04)',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        aria-label="Search parts"
        title="Search catalog"
      >
        <Search size={17} />
      </button>

      {/* Wishlist */}
      <button
        onClick={() => navigate('wishlist')}
        style={{
          position: 'relative',
          width: 36,
          height: 36,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: activePage === 'wishlist' ? '#EF4444' : '#17243A',
          background: activePage === 'wishlist' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(0, 0, 0, 0.04)',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        aria-label={`Wishlist with ${wishlistCount} items`}
        title="Saved parts"
      >
        <Heart size={17} fill={wishlistCount > 0 ? '#EF4444' : 'none'} color={wishlistCount > 0 ? '#EF4444' : '#17243A'} />
        {wishlistCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: -2,
              right: -2,
              minWidth: 16,
              height: 16,
              borderRadius: '50%',
              backgroundColor: '#EF4444',
              color: '#FFFFFF',
              fontSize: '0.625rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 3px',
            }}
          >
            {wishlistCount}
          </span>
        )}
      </button>

      {/* Profile */}
      <button
        onClick={() => navigate('profile')}
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
          color: activePage === 'profile' ? '#3478F6' : '#17243A',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        aria-label="User Account Profile"
        title="Account Profile"
      >
        <User size={17} />
      </button>
    </>
  );

  return (
    <>
      {/* Floating CardNav Header */}
      <header
        role="banner"
        style={{
          position: 'fixed',
          top: 14,
          left: '50%',
          transform: `translateX(-50%) translateY(${showHeader ? '0' : '-130px'})`,
          opacity: showHeader ? 1 : 0,
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
          zIndex: 1000,
          width: 'calc(100% - 32px)',
          maxWidth: 1160,
          pointerEvents: showHeader ? 'auto' : 'none',
        }}
      >
        <CardNav
          logo={brandLogo}
          items={cardNavItems}
          theme="light"
          surface="glass"
          maxWidth={1160}
          cardHeight={195}
          accentColor="#17243A"
          menuLabel={true}
          actions={headerActions}
          cta={{
            label: `Bag (${cartCount})`,
            onClick: () => setIsCartOpen(true)
          }}
        />
      </header>

      {/* Spotlight Search Modal */}
      {searchModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 3000,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '15vh',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(16px)',
            animation: 'fadeIn 0.2s ease',
          }}
          onClick={() => setSearchModalOpen(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 620,
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '24px',
              boxShadow: '0 25px 60px -15px rgba(0,0,0,0.2)',
              border: '1px solid rgba(0,0,0,0.08)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSearchSubmit}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 16px',
                  backgroundColor: '#F8F9FB',
                  borderRadius: '16px',
                  border: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                <Search size={22} color="#737780" />
                <input
                  type="text"
                  placeholder="Search parts by name, OEM code, or car model (e.g., Brembo, Tesla, Turbo)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  style={{
                    border: 'none',
                    background: 'none',
                    outline: 'none',
                    width: '100%',
                    fontSize: '1.05rem',
                    color: '#17243A',
                    fontFamily: 'inherit',
                  }}
                />
                <button type="submit" className="btn btn-blue btn-sm">
                  Search
                </button>
              </div>
            </form>

            <div style={{ marginTop: 20 }}>
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#86868B',
                  textTransform: 'uppercase',
                  marginBottom: 10,
                }}
              >
                Popular Searches
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {[
                  'Brembo GT Calipers',
                  'Tesla Drive Unit',
                  'Garrett Turbo',
                  'Öhlins Coilovers',
                  'Nexon EV Battery',
                  'Porsche Matrix LED'
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      navigate('parts', { query: term });
                      setSearchModalOpen(false);
                    }}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      backgroundColor: '#F2F4F7',
                      fontSize: '0.825rem',
                      color: '#17243A',
                      fontWeight: 500,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
