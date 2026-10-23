import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  CreditCard,
  Truck,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';

export default function Checkout() {
  const { cart, cartSubtotal, cartShipping, cartTotal, placeOrder, navigate } = useApp();

  const [paymentMethod, setPaymentMethod] = useState('apple-pay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const [shippingDetails, setShippingDetails] = useState({
    fullName: 'Rahul Sharma',
    phone: '+91 98199 87654',
    address: '402, Signature Towers, Bandra Kurla Complex',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400051',
  });

  const formatINR = (amt) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amt);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const order = placeOrder({
        shipping: shippingDetails,
        paymentMethod,
      });

      setIsProcessing(false);
      setCompletedOrder(order);

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.55 }
      });
    }, 1500);
  };

  if (completedOrder) {
    return (
      <div style={{ paddingTop: 120, paddingBottom: 100, backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
        <div className="container" style={{ maxWidth: 640, textAlign: 'center' }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              backgroundColor: '#EBF8F2',
              color: '#24865A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              boxShadow: '0 8px 24px rgba(36, 134, 90, 0.2)',
            }}
          >
            <CheckCircle2 size={38} />
          </div>

          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#24865A', textTransform: 'uppercase', marginBottom: 8 }}>
            Order Authenticated & Dispatched
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: '#17243A', marginBottom: 12 }}>
            Thank You for Your Order.
          </h1>

          <p style={{ fontSize: '1.05rem', color: '#737780', marginBottom: 32, lineHeight: 1.6 }}>
            Your automotive order reference is <strong style={{ color: '#17243A' }}>{completedOrder.id}</strong>.
            Insured tracking code: <span style={{ fontFamily: 'var(--font-mono)', color: '#3478F6' }}>{completedOrder.trackingNumber}</span>.
          </p>

          <div
            style={{
              padding: '24px',
              borderRadius: '20px',
              backgroundColor: '#F8F9FA',
              border: '1px solid rgba(0,0,0,0.06)',
              textAlign: 'left',
              marginBottom: 32,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ color: '#737780' }}>Total Paid:</span>
              <span style={{ fontWeight: 800, color: '#17243A' }}>{formatINR(completedOrder.total)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ color: '#737780' }}>Destination:</span>
              <span style={{ fontWeight: 600, color: '#17243A' }}>
                {completedOrder.shippingDetails.city}, {completedOrder.shippingDetails.state}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#737780' }}>Estimated Delivery:</span>
              <span style={{ fontWeight: 600, color: '#24865A' }}>Within 48 Hours via BlueDart Air</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 14 }}>
            <button onClick={() => navigate('profile')} className="btn btn-primary btn-lg">
              View in My Orders
            </button>
            <button onClick={() => navigate('parts')} className="btn btn-secondary btn-lg">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={{ paddingTop: 120, paddingBottom: 100, textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 480 }}>
          <ShoppingBag size={48} color="#86868B" style={{ margin: '0 auto 16px auto' }} />
          <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#17243A', marginBottom: 8 }}>
            Your bag is empty
          </h2>
          <p style={{ color: '#737780', marginBottom: 24 }}>
            Please select an automotive part from our catalog to proceed with checkout.
          </p>
          <button onClick={() => navigate('parts')} className="btn btn-blue btn-lg">
            Explore Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 96, paddingBottom: 100, backgroundColor: '#F7F8FA', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: 1040 }}>
        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <button onClick={() => navigate('parts')} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#3478F6', fontWeight: 600, marginBottom: 12 }}>
            <ArrowLeft size={16} />
            Back to Marketplace
          </button>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', fontWeight: 700, color: '#17243A' }}>
            Secure Checkout
          </h1>
        </div>

        {/* 2-Column Checkout Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 36,
            alignItems: 'start',
          }}
        >
          {/* Left Column: Shipping & Payment Selection */}
          <form onSubmit={handlePlaceOrder}>
            {/* Shipping Address */}
            <div
              className="card"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: '32px',
                marginBottom: 24,
              }}
            >
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#17243A', marginBottom: 20 }}>
                1. Shipping & Installation Address
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="input-group">
                  <label className="input-label">Full Name</label>
                  <input
                    type="text"
                    value={shippingDetails.fullName}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, fullName: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Contact Phone</label>
                  <input
                    type="text"
                    value={shippingDetails.phone}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, phone: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Street Address & Landmark</label>
                <input
                  type="text"
                  value={shippingDetails.address}
                  onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                <div className="input-group">
                  <label className="input-label">City</label>
                  <input
                    type="text"
                    value={shippingDetails.city}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">State</label>
                  <input
                    type="text"
                    value={shippingDetails.state}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, state: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">PIN Code</label>
                  <input
                    type="text"
                    value={shippingDetails.pincode}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, pincode: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div
              className="card"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: '32px',
                marginBottom: 24,
              }}
            >
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#17243A', marginBottom: 20 }}>
                2. Payment Method
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* Apple Pay / Card Option */}
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    borderRadius: '16px',
                    border: paymentMethod === 'apple-pay' ? '2px solid #17243A' : '1px solid rgba(0,0,0,0.08)',
                    backgroundColor: paymentMethod === 'apple-pay' ? '#F8F9FA' : '#FFFFFF',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'apple-pay'}
                      onChange={() => setPaymentMethod('apple-pay')}
                    />
                    <span style={{ fontWeight: 700, color: '#17243A' }}>
                      Pay (Apple Pay One-Touch Biometric)
                    </span>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#737780' }}>Recommended</span>
                </label>

                {/* UPI Option */}
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    borderRadius: '16px',
                    border: paymentMethod === 'upi' ? '2px solid #3478F6' : '1px solid rgba(0,0,0,0.08)',
                    backgroundColor: paymentMethod === 'upi' ? '#F8F9FA' : '#FFFFFF',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                    />
                    <span style={{ fontWeight: 700, color: '#17243A' }}>
                      UPI (Google Pay / PhonePe / Paytm QR)
                    </span>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#24865A', fontWeight: 600 }}>Instant Verified</span>
                </label>

                {/* NetBanking / Card */}
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    borderRadius: '16px',
                    border: paymentMethod === 'card' ? '2px solid #17243A' : '1px solid rgba(0,0,0,0.08)',
                    backgroundColor: paymentMethod === 'card' ? '#F8F9FA' : '#FFFFFF',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                    />
                    <span style={{ fontWeight: 700, color: '#17243A' }}>
                      Credit / Debit Card (Visa, Mastercard, Amex)
                    </span>
                  </div>
                  <CreditCard size={18} color="#737780" />
                </label>
              </div>

              <div style={{ marginTop: 28 }}>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', justifyContent: 'center', gap: 8 }}
                >
                  {isProcessing ? (
                    'Processing Secure Authorization...'
                  ) : paymentMethod === 'apple-pay' ? (
                    'Pay with Pay Now'
                  ) : (
                    `Authorize Payment • ${formatINR(cartTotal)}`
                  )}
                  {!isProcessing && <ArrowRight size={18} />}
                </button>
              </div>
            </div>
          </form>

          {/* Right Column: Order Summary Card */}
          <div
            className="card"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '32px',
              position: 'sticky',
              top: 96,
            }}
          >
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#17243A', marginBottom: 20 }}>
              Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} items)
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
              {cart.map((item) => (
                <div key={item.product.id} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  <img
                    src={item.product.images[0]}
                    alt=""
                    style={{ width: 56, height: 56, borderRadius: '12px', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#17243A', lineHeight: 1.3 }}>
                      {item.product.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#737780' }}>
                      Qty: {item.quantity} • {item.product.condition}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#17243A' }}>
                    {formatINR(item.product.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#737780' }}>
                <span>Subtotal</span>
                <span>{formatINR(cartSubtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#737780' }}>
                <span>Insured Freight</span>
                <span>{cartShipping === 0 ? 'Free' : formatINR(cartShipping)}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: 14,
                  borderTop: '1px dashed rgba(0,0,0,0.08)',
                  marginTop: 6,
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: '#17243A',
                }}
              >
                <span>Total Amount</span>
                <span>{formatINR(cartTotal)}</span>
              </div>
            </div>

            <div
              style={{
                marginTop: 24,
                padding: '14px',
                borderRadius: '14px',
                backgroundColor: '#F8F9FA',
                fontSize: '0.8rem',
                color: '#737780',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Lock size={15} color="#24865A" />
              <span>256-bit SSL encrypted escrow settlement</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
