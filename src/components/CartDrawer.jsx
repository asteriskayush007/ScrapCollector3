import React from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CartDrawer() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartShipping,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    navigate,
  } = useApp();

  if (!isCartOpen) return null;

  const formatINR = (amt) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amt);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2500,
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        backdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={() => setIsCartOpen(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 460,
          height: '100%',
          backgroundColor: '#FFFFFF',
          boxShadow: '-15px 0 50px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          padding: '28px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 20,
            borderBottom: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShoppingBag size={22} color="#17243A" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#17243A' }}>
              Your Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              backgroundColor: '#F1F3F5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#202124',
            }}
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Line Items List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            paddingTop: 20,
            paddingBottom: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {cart.length === 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
                color: '#737780',
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  backgroundColor: '#F7F8FA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                  color: '#86868B',
                }}
              >
                <ShoppingBag size={28} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#17243A', marginBottom: 6 }}>
                Your bag is empty
              </h3>
              <p style={{ fontSize: '0.9rem', marginBottom: 24, maxWidth: 260 }}>
                Explore certified components and OEM assemblies across all vehicle types.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('parts');
                }}
                className="btn btn-blue"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                style={{
                  display: 'flex',
                  gap: 16,
                  padding: '16px',
                  borderRadius: '16px',
                  backgroundColor: '#F8F9FA',
                  border: '1px solid rgba(0,0,0,0.04)',
                }}
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.title}
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: '12px',
                    objectFit: 'cover',
                    flexShrink: 0,
                  }}
                />

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4
                        style={{
                          fontSize: '0.925rem',
                          fontWeight: 700,
                          color: '#17243A',
                          lineHeight: 1.3,
                          marginBottom: 4,
                          maxWidth: 190,
                        }}
                      >
                        {item.product.title}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        style={{ color: '#86868B', padding: 4 }}
                        title="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: '#737780', marginBottom: 8 }}>
                      Condition: {item.product.condition}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        backgroundColor: '#FFFFFF',
                        borderRadius: '8px',
                        padding: '2px 6px',
                        border: '1px solid rgba(0,0,0,0.08)',
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        style={{ padding: 4, color: '#17243A' }}
                      >
                        <Minus size={13} />
                      </button>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, minWidth: 16, textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        style={{ padding: 4, color: '#17243A' }}
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#17243A' }}>
                      {formatINR(item.product.price * item.quantity)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer / Summary */}
        {cart.length > 0 && (
          <div
            style={{
              paddingTop: 20,
              borderTop: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.9rem', color: '#737780' }}>
              <span>Subtotal</span>
              <span style={{ color: '#17243A', fontWeight: 600 }}>{formatINR(cartSubtotal)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontSize: '0.9rem', color: '#737780' }}>
              <span>Insured Freight</span>
              <span style={{ color: cartShipping === 0 ? '#24865A' : '#17243A', fontWeight: 600 }}>
                {cartShipping === 0 ? 'Free (Orders > ₹50,000)' : formatINR(cartShipping)}
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: 14,
                borderTop: '1px dashed rgba(0,0,0,0.08)',
                marginBottom: 20,
                fontSize: '1.2rem',
                fontWeight: 800,
                color: '#17243A',
              }}
            >
              <span>Estimated Total</span>
              <span>{formatINR(cartTotal)}</span>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                navigate('checkout');
              }}
              className="btn btn-blue btn-lg"
              style={{ width: '100%', justifyContent: 'center', gap: 8 }}
            >
              Proceed to Checkout
              <ArrowRight size={18} />
            </button>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                marginTop: 12,
                fontSize: '0.75rem',
                color: '#86868B',
              }}
            >
              <ShieldCheck size={14} color="#24865A" />
              <span>180-Day Guarantee & Insured Transit Protection</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
