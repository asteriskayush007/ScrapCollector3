import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Grid,
  List,
  Heart,
  ShoppingBag,
  CheckCircle2,
  X,
  Eye,
  Check,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VEHICLE_TYPES, PART_CATEGORIES } from '../data/mockData';

export default function PartsMarketplace() {
  const { products, addToCart, toggleWishlist, isInWishlist, navigate, pageParams } = useApp();

  // Filters state
  const [searchQuery, setSearchQuery] = useState(pageParams.query || '');
  const [selectedVehicleType, setSelectedVehicleType] = useState(pageParams.vehicleType || 'all');
  const [selectedCategory, setSelectedCategory] = useState(pageParams.category || 'all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [maxPrice, setMaxPrice] = useState(300000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Format INR currency
  const formatINR = (amt) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amt);
  };

  // Filtered & Sorted list
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchCode = (p.oemCode || '').toLowerCase().includes(q);
          const matchNumber = (p.partNumber || '').toLowerCase().includes(q);
          const matchDesc = (p.description || '').toLowerCase().includes(q);
          const matchMake = p.compatibility.makes.some((m) => m.toLowerCase().includes(q));
          if (!matchTitle && !matchCode && !matchNumber && !matchDesc && !matchMake) return false;
        }

        // Vehicle Type
        if (selectedVehicleType !== 'all' && p.vehicleType !== selectedVehicleType) return false;

        // Category
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;

        // Condition
        if (selectedCondition !== 'all' && p.condition !== selectedCondition) return false;

        // Price
        if (p.price > maxPrice) return false;

        // In Stock
        if (inStockOnly && !p.inStock) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return 0; // featured default order
      });
  }, [products, searchQuery, selectedVehicleType, selectedCategory, selectedCondition, maxPrice, inStockOnly, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedVehicleType('all');
    setSelectedCategory('all');
    setSelectedCondition('all');
    setMaxPrice(300000);
    setInStockOnly(false);
    setSortBy('featured');
  };

  const hasActiveFilters =
    searchQuery ||
    selectedVehicleType !== 'all' ||
    selectedCategory !== 'all' ||
    selectedCondition !== 'all' ||
    maxPrice < 300000 ||
    inStockOnly;

  return (
    <div style={{ paddingTop: 96, paddingBottom: 100, backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', color: '#737780', marginBottom: 10 }}>
            <span onClick={() => navigate('home')} style={{ cursor: 'pointer' }}>Home</span>
            <span>/</span>
            <span style={{ color: '#17243A', fontWeight: 600 }}>Marketplace</span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20 }}>
            <div>
              <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: 700, color: '#17243A', letterSpacing: '-0.025em' }}>
                Automotive Parts Catalog.
              </h1>
              <p style={{ fontSize: '1.05rem', color: '#737780', marginTop: 6 }}>
                Certified OEM parts, salvaged performance assemblies, and electric propulsion components.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="btn btn-secondary mobile-filter-btn"
                style={{ gap: 8, display: 'none' }}
              >
                <SlidersHorizontal size={16} />
                Filters {hasActiveFilters && '(Active)'}
              </button>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#F2F4F7',
                  borderRadius: '12px',
                  padding: '4px',
                }}
              >
                <button
                  onClick={() => setViewMode('grid')}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '8px',
                    backgroundColor: viewMode === 'grid' ? '#FFFFFF' : 'transparent',
                    color: viewMode === 'grid' ? '#17243A' : '#737780',
                    boxShadow: viewMode === 'grid' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  }}
                  aria-label="Grid view"
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '8px',
                    backgroundColor: viewMode === 'list' ? '#FFFFFF' : 'transparent',
                    color: viewMode === 'list' ? '#17243A' : '#737780',
                    boxShadow: viewMode === 'list' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  }}
                  aria-label="List view"
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar & Quick Make Filters */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '14px 20px',
            backgroundColor: '#F8F9FB',
            borderRadius: '20px',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            marginBottom: 36,
          }}
        >
          <Search size={22} color="#737780" />
          <input
            type="text"
            placeholder="Search by part title, OEM code (e.g., 992.351), vehicle model, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              border: 'none',
              background: 'none',
              outline: 'none',
              fontSize: '1rem',
              color: '#17243A',
              fontFamily: 'inherit',
            }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} style={{ color: '#86868B', padding: 4 }}>
              <X size={18} />
            </button>
          )}
        </div>

        {/* Main Marketplace Layout: Left Sidebar Filters + Right Products Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 36, alignItems: 'start' }} className="marketplace-layout">
          {/* Left Desktop Filters Sidebar */}
          <aside
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '24px',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              position: 'sticky',
              top: 96,
            }}
            className="desktop-filter-sidebar"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#17243A' }}>Filters</h3>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  style={{ fontSize: '0.8rem', color: '#3478F6', fontWeight: 600, background: 'none' }}
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Vehicle Type Filter */}
            <div style={{ marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '0.825rem', fontWeight: 700, color: '#17243A', textTransform: 'uppercase', marginBottom: 12 }}>
                Vehicle Type
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.9rem', color: '#17243A', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="vehicleType"
                    checked={selectedVehicleType === 'all'}
                    onChange={() => setSelectedVehicleType('all')}
                  />
                  <span>All Vehicles</span>
                </label>
                {VEHICLE_TYPES.map((type) => (
                  <label key={type.id} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.9rem', color: '#17243A', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="vehicleType"
                      checked={selectedVehicleType === type.id}
                      onChange={() => setSelectedVehicleType(type.id)}
                    />
                    <span>{type.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div style={{ marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '0.825rem', fontWeight: 700, color: '#17243A', textTransform: 'uppercase', marginBottom: 12 }}>
                Category
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="select-field"
                style={{ fontSize: '0.875rem', padding: '10px 14px' }}
              >
                <option value="all">All Categories</option>
                {PART_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Condition Filter */}
            <div style={{ marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '0.825rem', fontWeight: 700, color: '#17243A', textTransform: 'uppercase', marginBottom: 12 }}>
                Part Condition
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['all', 'New OEM', 'Certified Refurbished', 'Tested Used'].map((cond) => (
                  <label key={cond} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.875rem', color: '#17243A', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="condition"
                      checked={selectedCondition === cond}
                      onChange={() => setSelectedCondition(cond)}
                    />
                    <span>{cond === 'all' ? 'Any Condition' : cond}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div style={{ marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: '0.825rem', fontWeight: 700, color: '#17243A', textTransform: 'uppercase' }}>
                  Max Price
                </span>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#3478F6' }}>
                  {formatINR(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="300000"
                step="10000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#3478F6' }}
              />
            </div>

            {/* In Stock Toggle */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.875rem', color: '#17243A', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                />
                <span style={{ fontWeight: 600 }}>In Stock Only</span>
              </label>
            </div>
          </aside>

          {/* Right Product Grid Area */}
          <div>
            {/* Results count & Sort Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 24,
                paddingBottom: 16,
                borderBottom: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ fontSize: '0.925rem', color: '#737780' }}>
                Showing <strong style={{ color: '#17243A' }}>{filteredProducts.length}</strong> parts
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: '0.85rem', color: '#737780' }}>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '10px',
                    border: '1px solid rgba(0,0,0,0.1)',
                    backgroundColor: '#FFFFFF',
                    fontSize: '0.875rem',
                    color: '#17243A',
                    fontFamily: 'inherit',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Products Render */}
            {filteredProducts.length === 0 ? (
              <div
                style={{
                  padding: '80px 24px',
                  textAlign: 'center',
                  backgroundColor: '#F8F9FA',
                  borderRadius: '24px',
                  border: '1px dashed rgba(0,0,0,0.1)',
                }}
              >
                <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', color: '#86868B' }}>
                  <Search size={24} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#17243A', marginBottom: 8 }}>
                  No matching parts found
                </h3>
                <p style={{ fontSize: '0.95rem', color: '#737780', marginBottom: 20, maxWidth: 400, margin: '0 auto 20px auto' }}>
                  Try broadening your search term or reset active filters to view all available automotive inventory.
                </p>
                <button onClick={resetFilters} className="btn btn-primary">
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: 24,
                }}
              >
                {filteredProducts.map((product) => {
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
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          paddingTop: '68%',
                          backgroundColor: '#F8F9FA',
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
                          }}
                        />
                        <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 2 }}>
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

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product.id);
                          }}
                          style={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            width: 34,
                            height: 34,
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(8px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: saved ? '#EF4444' : '#1D1D1F',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            zIndex: 2,
                          }}
                        >
                          <Heart size={16} fill={saved ? '#EF4444' : 'none'} />
                        </button>
                      </div>

                      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.725rem', fontWeight: 600, color: '#24865A', marginBottom: 6 }}>
                            <CheckCircle2 size={13} />
                            <span>Fits {product.compatibility.makes[0]} ({product.compatibility.years})</span>
                          </div>

                          <h3
                            onClick={() => navigate('product-detail', { id: product.id })}
                            style={{ fontSize: '1.05rem', fontWeight: 700, color: '#17243A', lineHeight: 1.35, marginBottom: 8, cursor: 'pointer' }}
                          >
                            {product.title}
                          </h3>

                          <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#86868B', marginBottom: 14 }}>
                            OEM: {product.oemCode || product.partNumber}
                          </div>
                        </div>

                        <div>
                          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid rgba(0,0,0,0.06)', marginBottom: 14 }}>
                            <div>
                              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#17243A' }}>
                                {formatINR(product.price)}
                              </div>
                              {product.originalPrice && (
                                <div style={{ fontSize: '0.75rem', color: '#86868B', textDecoration: 'line-through' }}>
                                  MRP {formatINR(product.originalPrice)}
                                </div>
                              )}
                            </div>

                            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#24865A', backgroundColor: '#EBF8F2', padding: '3px 8px', borderRadius: '9999px' }}>
                              In Stock
                            </span>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8 }}>
                            <button
                              onClick={() => addToCart(product, 1)}
                              className="btn btn-primary"
                              style={{ width: '100%', gap: 6, padding: '8px 14px', fontSize: '0.85rem' }}
                            >
                              <ShoppingBag size={15} />
                              Add to Bag
                            </button>
                            <button
                              onClick={() => navigate('product-detail', { id: product.id })}
                              className="btn btn-secondary"
                              style={{ padding: '8px 12px' }}
                              title="View details"
                            >
                              <Eye size={15} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* List View Mode */
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {filteredProducts.map((product) => {
                  const saved = isInWishlist(product.id);
                  return (
                    <div
                      key={product.id}
                      className="card"
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '20px',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '20px',
                        gap: 20,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          style={{
                            width: 100,
                            height: 100,
                            borderRadius: '16px',
                            objectFit: 'cover',
                            flexShrink: 0,
                            cursor: 'pointer',
                          }}
                          onClick={() => navigate('product-detail', { id: product.id })}
                        />

                        <div>
                          <span
                            className={`badge ${
                              product.condition === 'New OEM'
                                ? 'badge-blue'
                                : product.condition === 'Certified Refurbished'
                                ? 'badge-mint'
                                : 'badge-silver'
                            }`}
                            style={{ marginBottom: 6 }}
                          >
                            {product.condition}
                          </span>

                          <h3
                            onClick={() => navigate('product-detail', { id: product.id })}
                            style={{ fontSize: '1.15rem', fontWeight: 700, color: '#17243A', cursor: 'pointer', marginBottom: 4 }}
                          >
                            {product.title}
                          </h3>

                          <div style={{ fontSize: '0.8rem', color: '#737780', display: 'flex', gap: 14 }}>
                            <span>OEM: {product.oemCode || product.partNumber}</span>
                            <span>•</span>
                            <span style={{ color: '#24865A', fontWeight: 600 }}>Fits {product.compatibility.makes.join(', ')}</span>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#17243A' }}>
                            {formatINR(product.price)}
                          </div>
                          {product.originalPrice && (
                            <div style={{ fontSize: '0.8rem', color: '#86868B', textDecoration: 'line-through' }}>
                              MRP {formatINR(product.originalPrice)}
                            </div>
                          )}
                        </div>

                        <div style={{ display: 'flex', gap: 10 }}>
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className="btn btn-secondary"
                            style={{ padding: '10px 14px' }}
                          >
                            <Heart size={16} fill={saved ? '#EF4444' : 'none'} color={saved ? '#EF4444' : '#1D1D1F'} />
                          </button>
                          <button
                            onClick={() => addToCart(product, 1)}
                            className="btn btn-primary"
                            style={{ gap: 6 }}
                          >
                            <ShoppingBag size={16} />
                            Add to Bag
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .marketplace-layout {
            grid-template-columns: 1fr !important;
          }
          .desktop-filter-sidebar {
            display: none !important;
          }
          .mobile-filter-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </div>
  );
}
