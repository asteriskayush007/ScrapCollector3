import React, { useState } from 'react';
import {
  Truck,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  MapPin,
  Calendar,
  XCircle,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';

export default function MyPickups() {
  const { pickupRequests, confirmPickupQuote, navigate, pageParams } = useApp();

  const [selectedRequestId, setSelectedRequestId] = useState(
    pageParams.id || (pickupRequests[0] && pickupRequests[0].id)
  );

  const selectedRequest =
    pickupRequests.find((r) => r.id === selectedRequestId) || pickupRequests[0];

  const formatINR = (amt) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amt);
  };

  const handleConfirmQuote = (id, accepted) => {
    confirmPickupQuote(id, accepted);
    if (accepted) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Submitted':
        return { bg: '#EFF6FF', text: '#3478F6', border: 'rgba(52, 120, 246, 0.2)' };
      case 'Under Review':
        return { bg: '#FEF3C7', text: '#D97706', border: 'rgba(217, 119, 6, 0.2)' };
      case 'Quote Offered':
        return { bg: '#EDE9FE', text: '#7C3AED', border: 'rgba(124, 58, 237, 0.2)' };
      case 'Confirmed':
      case 'Scheduled':
      case 'In Progress':
        return { bg: '#EBF8F2', text: '#24865A', border: 'rgba(36, 134, 90, 0.2)' };
      case 'Completed':
        return { bg: '#F3F4F6', text: '#1F2937', border: 'rgba(31, 41, 55, 0.2)' };
      default:
        return { bg: '#FEE2E2', text: '#EF4444', border: 'rgba(239, 68, 68, 0.2)' };
    }
  };

  return (
    <div style={{ paddingTop: 96, paddingBottom: 100, backgroundColor: '#F7F8FA', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20, marginBottom: 36 }}>
          <div>
            <span className="section-eyebrow">CUSTOMER PORTAL</span>
            <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 700, color: '#17243A', letterSpacing: '-0.025em' }}>
              Scrap Collection Tracker.
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#737780', marginTop: 6 }}>
              Follow your vehicle appraisal, review scrap valuation estimates, and monitor pickup logistics.
            </p>
          </div>

          <button
            onClick={() => navigate('scrap-pickup')}
            className="btn btn-mint"
            style={{ gap: 8 }}
          >
            <Plus size={18} />
            New Pickup Request
          </button>
        </div>

        {/* 2-Column Layout: Left Requests List + Right Live Timeline & Actions */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '360px 1fr',
            gap: 32,
            alignItems: 'start',
          }}
          className="pickup-tracker-layout"
        >
          {/* Left Column: Requests Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#86868B', textTransform: 'uppercase' }}>
              Your Submissions ({pickupRequests.length})
            </div>

            {pickupRequests.map((req) => {
              const isSelected = selectedRequest && selectedRequest.id === req.id;
              const statusStyle = getStatusColor(req.status);
              return (
                <div
                  key={req.id}
                  onClick={() => setSelectedRequestId(req.id)}
                  className="card"
                  style={{
                    padding: '20px',
                    borderRadius: '20px',
                    backgroundColor: isSelected ? '#FFFFFF' : '#F8F9FB',
                    border: isSelected ? '2px solid #3478F6' : '1px solid rgba(0,0,0,0.06)',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 10px 30px -5px rgba(52, 120, 246, 0.12)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#17243A' }}>
                      {req.id}
                    </span>
                    <span
                      style={{
                        padding: '3px 10px',
                        borderRadius: '9999px',
                        fontSize: '0.725rem',
                        fontWeight: 700,
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.text,
                        border: `1px solid ${statusStyle.border}`,
                      }}
                    >
                      {req.status}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#17243A', marginBottom: 6 }}>
                    {req.vehicleDetails}
                  </h3>

                  <div style={{ fontSize: '0.825rem', color: '#737780', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <MapPin size={14} />
                    <span>{req.city}</span>
                    <span>•</span>
                    <span>{new Date(req.createdAt).toLocaleDateString()}</span>
                  </div>

                  {req.valuationEstimate && (
                    <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.75rem', color: '#86868B' }}>Appraisal Quote:</span>
                      <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#24865A' }}>
                        {formatINR(req.valuationEstimate)}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Selected Request Live Details & Timeline */}
          {selectedRequest && (
            <div
              className="card"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '28px',
                padding: ' clamp(24px, 4vw, 40px)',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.06)',
              }}
            >
              {/* Header Info */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                  paddingBottom: 24,
                  borderBottom: '1px solid rgba(0,0,0,0.06)',
                  marginBottom: 28,
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#17243A' }}>
                      {selectedRequest.id}
                    </span>
                    <span
                      style={{
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        backgroundColor: getStatusColor(selectedRequest.status).bg,
                        color: getStatusColor(selectedRequest.status).text,
                      }}
                    >
                      {selectedRequest.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#737780' }}>
                    Created on {new Date(selectedRequest.createdAt).toLocaleString()}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: '#86868B', textTransform: 'uppercase' }}>
                    Pickup City
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#17243A' }}>
                    {selectedRequest.city}
                  </div>
                </div>
              </div>

              {/* ACTION REQUIRED BANNER: When status is 'Quote Offered' */}
              {selectedRequest.status === 'Quote Offered' && (
                <div
                  style={{
                    backgroundColor: '#F5F3FF',
                    borderRadius: '20px',
                    padding: '24px',
                    border: '1px solid rgba(124, 58, 237, 0.2)',
                    marginBottom: 32,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#7C3AED', fontWeight: 700, fontSize: '0.85rem', marginBottom: 8, textTransform: 'uppercase' }}>
                    <CheckCircle2 size={16} />
                    Official Valuation Quote Ready For Confirmation
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: 14, marginBottom: 16 }}>
                    <div>
                      <div style={{ fontSize: '2rem', fontWeight: 800, color: '#17243A' }}>
                        {formatINR(selectedRequest.valuationEstimate)}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#737780', marginTop: 4 }}>
                        {selectedRequest.quoteNotes || 'Valuation based on metallurgical mass and engine salvage viability.'}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 10 }}>
                      <button
                        onClick={() => handleConfirmQuote(selectedRequest.id, false)}
                        className="btn btn-secondary"
                        style={{ color: '#EF4444', borderColor: 'rgba(239, 68, 68, 0.2)' }}
                      >
                        Decline Quote
                      </button>
                      <button
                        onClick={() => handleConfirmQuote(selectedRequest.id, true)}
                        className="btn btn-mint btn-lg"
                        style={{ gap: 8 }}
                      >
                        <CheckCircle2 size={18} />
                        Accept Quote & Confirm Pickup
                      </button>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.8rem', color: '#737780' }}>
                    Scheduled logistics: {selectedRequest.preferredDate} ({selectedRequest.preferredWindow})
                  </div>
                </div>
              )}

              {/* Item Details Summary Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: 16,
                  padding: '20px',
                  backgroundColor: '#F8F9FA',
                  borderRadius: '20px',
                  marginBottom: 32,
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#86868B', textTransform: 'uppercase' }}>Item / Vehicle</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#17243A', marginTop: 2 }}>
                    {selectedRequest.vehicleDetails}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: '#86868B', textTransform: 'uppercase' }}>Address</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#17243A', marginTop: 2 }}>
                    {selectedRequest.address}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: '#86868B', textTransform: 'uppercase' }}>Contact Person</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#17243A', marginTop: 2 }}>
                    {selectedRequest.customerName} ({selectedRequest.phone})
                  </div>
                </div>
              </div>

              {/* Live Timeline Progression */}
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#17243A', marginBottom: 20 }}>
                  Audit & Progression Timeline
                </h3>

                <div style={{ position: 'relative', paddingLeft: 28, display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {/* Vertical Track Line */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 8,
                      bottom: 8,
                      left: 11,
                      width: 2,
                      backgroundColor: '#E8EBEF',
                    }}
                  />

                  {selectedRequest.statusHistory.map((step, idx) => (
                    <div key={idx} style={{ position: 'relative' }}>
                      {/* Node Bullet */}
                      <div
                        style={{
                          position: 'absolute',
                          left: -28,
                          top: 2,
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          backgroundColor: idx === selectedRequest.statusHistory.length - 1 ? '#24865A' : '#3478F6',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 0 0 4px #FFFFFF',
                        }}
                      >
                        <CheckCircle2 size={14} />
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                          <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#17243A' }}>
                            {step.status}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: '#86868B' }}>
                            {new Date(step.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(step.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: '#737780', marginTop: 4 }}>
                          {step.note}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pickup-tracker-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
