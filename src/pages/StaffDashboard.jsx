import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Truck,
  FileText,
  DollarSign,
  AlertCircle,
  Eye,
  Send,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { METRICS } from '../data/mockData';

export default function StaffDashboard() {
  const { pickupRequests, updatePickupStatus, products, navigate } = useApp();

  const [filterStatus, setFilterStatus] = useState('all');
  const [activeRequestId, setActiveRequestId] = useState(
    pickupRequests[0] ? pickupRequests[0].id : null
  );

  const [quoteInput, setQuoteInput] = useState('');
  const [noteInput, setNoteInput] = useState('');
  const [nextStatus, setNextStatus] = useState('Quote Offered');

  const activeRequest =
    pickupRequests.find((r) => r.id === activeRequestId) || pickupRequests[0];

  const filteredRequests = pickupRequests.filter((r) => {
    if (filterStatus === 'all') return true;
    return r.status === filterStatus;
  });

  const formatINR = (amt) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amt);
  };

  const handleUpdateStatus = (e) => {
    e.preventDefault();
    if (!activeRequest) return;

    const numQuote = quoteInput ? Number(quoteInput) : activeRequest.valuationEstimate;
    updatePickupStatus(
      activeRequest.id,
      nextStatus,
      noteInput || `Company appraisal updated status to ${nextStatus}.`,
      numQuote
    );

    setQuoteInput('');
    setNoteInput('');
  };

  return (
    <div style={{ paddingTop: 96, paddingBottom: 100, backgroundColor: '#F7F8FA', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20, marginBottom: 36 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: '9999px', backgroundColor: '#EBF8F2', color: '#24865A', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>
              <ShieldCheck size={14} />
              Authorized Staff Workstation
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 700, color: '#17243A', letterSpacing: '-0.025em' }}>
              Appraisal & Dispatch Operations.
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#737780', marginTop: 4 }}>
              Inspect incoming scrap documentation, issue certified quotes, and route recovery flatbeds.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => navigate('parts')} className="btn btn-secondary">
              View Public Catalog
            </button>
            <button onClick={() => navigate('my-pickups')} className="btn btn-primary">
              Switch to Customer View
            </button>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 18,
            marginBottom: 36,
          }}
        >
          <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '20px' }}>
            <div style={{ fontSize: '0.8rem', color: '#86868B', textTransform: 'uppercase', marginBottom: 6 }}>
              Pending Scrap Reviews
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#17243A' }}>
              {pickupRequests.filter((p) => p.status === 'Submitted' || p.status === 'Under Review').length}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#3478F6', marginTop: 4 }}>Requires technician evaluation</div>
          </div>

          <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '20px' }}>
            <div style={{ fontSize: '0.8rem', color: '#86868B', textTransform: 'uppercase', marginBottom: 6 }}>
              Confirmed Scheduled
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#24865A' }}>
              {pickupRequests.filter((p) => p.status === 'Confirmed' || p.status === 'Scheduled').length}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#24865A', marginTop: 4 }}>Logistics assigned</div>
          </div>

          <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '20px' }}>
            <div style={{ fontSize: '0.8rem', color: '#86868B', textTransform: 'uppercase', marginBottom: 6 }}>
              Total Recovered Metal
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#17243A', fontFamily: 'var(--font-mono)' }}>
              482.6T
            </div>
            <div style={{ fontSize: '0.8rem', color: '#737780', marginTop: 4 }}>High-grade alloys & iron</div>
          </div>

          <div className="card" style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: '20px' }}>
            <div style={{ fontSize: '0.8rem', color: '#86868B', textTransform: 'uppercase', marginBottom: 6 }}>
              Active Catalog Listings
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#17243A' }}>
              {products.length}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#737780', marginTop: 4 }}>OEM & refurbished parts</div>
          </div>
        </div>

        {/* Main Workstation Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '380px 1fr',
            gap: 32,
            alignItems: 'start',
          }}
          className="staff-workstation-layout"
        >
          {/* Left Column: Request Submissions List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Status Filter Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
              {['all', 'Submitted', 'Under Review', 'Quote Offered', 'Confirmed', 'Completed'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: filterStatus === st ? 700 : 500,
                    backgroundColor: filterStatus === st ? '#17243A' : '#FFFFFF',
                    color: filterStatus === st ? '#FFFFFF' : '#737780',
                    border: '1px solid rgba(0,0,0,0.06)',
                  }}
                >
                  {st}
                </button>
              ))}
            </div>

            {filteredRequests.map((req) => {
              const isSelected = activeRequest && activeRequest.id === req.id;
              return (
                <div
                  key={req.id}
                  onClick={() => setActiveRequestId(req.id)}
                  className="card"
                  style={{
                    padding: '20px',
                    borderRadius: '20px',
                    backgroundColor: isSelected ? '#FFFFFF' : '#F8F9FA',
                    border: isSelected ? '2px solid #24865A' : '1px solid rgba(0,0,0,0.06)',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#17243A' }}>
                      {req.id}
                    </span>
                    <span className="badge badge-silver" style={{ fontSize: '0.7rem' }}>
                      {req.status}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#17243A', marginBottom: 4 }}>
                    {req.vehicleDetails}
                  </h3>

                  <div style={{ fontSize: '0.8rem', color: '#737780' }}>
                    Customer: {req.customerName} ({req.city})
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Appraisal & Status Update Action Center */}
          {activeRequest && (
            <div
              className="card"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '28px',
                padding: '36px',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 20, borderBottom: '1px solid rgba(0,0,0,0.06)', marginBottom: 24 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#17243A' }}>
                      Appraisal for {activeRequest.id}
                    </h2>
                    <span className="badge badge-mint">{activeRequest.status}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#737780', marginTop: 4 }}>
                    {activeRequest.vehicleDetails} • Category: {activeRequest.vehicleType}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: '#86868B', textTransform: 'uppercase' }}>
                    Scheduled Target
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#17243A' }}>
                    {activeRequest.preferredDate}
                  </div>
                </div>
              </div>

              {/* Photos Gallery */}
              <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#17243A', marginBottom: 12 }}>
                  Customer Submitted Photographs ({activeRequest.images.length})
                </div>
                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                  {activeRequest.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt=""
                      style={{
                        width: 140,
                        height: 100,
                        borderRadius: '14px',
                        objectFit: 'cover',
                        border: '1px solid rgba(0,0,0,0.08)',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Appraisal Form */}
              <form onSubmit={handleUpdateStatus}>
                <div style={{ backgroundColor: '#F8F9FA', borderRadius: '20px', padding: '24px', marginBottom: 24 }}>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#17243A', marginBottom: 16 }}>
                    Technician Action Desk
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div className="input-group">
                      <label className="input-label">Appraisal Quote Valuation (₹ INR)</label>
                      <input
                        type="number"
                        placeholder={activeRequest.valuationEstimate ? String(activeRequest.valuationEstimate) : 'e.g. 52000'}
                        value={quoteInput}
                        onChange={(e) => setQuoteInput(e.target.value)}
                        className="input-field"
                      />
                    </div>

                    <div className="input-group">
                      <label className="input-label">Move To Next Status</label>
                      <select
                        value={nextStatus}
                        onChange={(e) => setNextStatus(e.target.value)}
                        className="select-field"
                      >
                        <option value="Under Review">Under Review (Inspection in progress)</option>
                        <option value="Quote Offered">Quote Offered (Send valuation to customer)</option>
                        <option value="Confirmed">Confirmed (Customer approved quote)</option>
                        <option value="Scheduled">Scheduled (Flatbed truck assigned)</option>
                        <option value="In Progress">In Progress (Driver dispatched to site)</option>
                        <option value="Completed">Completed (Dismantled & payment settled)</option>
                      </select>
                    </div>
                  </div>

                  <div className="input-group">
                    <label className="input-label">Audit Note for Customer & Dispatch Log</label>
                    <input
                      type="text"
                      placeholder="e.g. Verified aluminum engine block salvage value. Hydraulic ramp flatbed dispatched."
                      value={noteInput}
                      onChange={(e) => setNoteInput(e.target.value)}
                      className="input-field"
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                    <button type="submit" className="btn btn-mint btn-lg" style={{ gap: 8 }}>
                      <Send size={18} />
                      Commit Status & Notify Customer
                    </button>
                  </div>
                </div>
              </form>

              {/* Auditable History */}
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#17243A', marginBottom: 12 }}>
                  Auditable Status Log
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {activeRequest.statusHistory.map((h, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '12px',
                        backgroundColor: '#F8F9FB',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.85rem',
                      }}
                    >
                      <div>
                        <strong style={{ color: '#17243A' }}>{h.status}</strong>: {h.note}
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#86868B' }}>
                        {new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
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
          .staff-workstation-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
