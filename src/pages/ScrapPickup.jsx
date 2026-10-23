import React, { useState } from 'react';
import {
  Truck,
  Car,
  Bike,
  Zap,
  Wrench,
  UploadCloud,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';

export default function ScrapPickup() {
  const { createPickupRequest, navigate } = useApp();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    vehicleType: 'Car',
    vehicleDetails: '2015 Hyundai Creta 1.6 CRDi',
    condition: 'Accident front-end collision, structural frame undamaged, engine intact',
    movable: true,
    description: 'Vehicle is parked at our workshop parking lot with easy flatbed truck access. Engine turns over.',
    contactName: 'Vikram Malhotra',
    phone: '+91 98200 12345',
    address: 'Plot 18, Phase 2, Industrial Area, Okhla',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110020',
    preferredDate: '2026-10-27',
    preferredWindow: 'Morning (10:00 AM - 1:00 PM)',
    accessNotes: 'Ground floor open lot, wide gate suitable for hydraulic ramp recovery.',
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80'
    ]
  });

  const categories = [
    { id: 'Car', label: 'Passenger Car', icon: Car, desc: 'Sedans, hatchbacks, SUVs' },
    { id: 'Motorcycle', label: 'Motorcycle / Scooter', icon: Bike, desc: 'Two-wheelers & chassis' },
    { id: 'Truck', label: 'Commercial Truck', icon: Truck, desc: 'Medium & heavy transport' },
    { id: 'EV', label: 'Electric Vehicle / Battery', icon: Zap, desc: 'EV modules, high-voltage packs' },
    { id: 'Parts', label: 'Mixed Scrap & Parts', icon: Wrench, desc: 'Engine blocks, axles, copper wire' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const created = createPickupRequest({
      customerName: formData.contactName,
      phone: formData.phone,
      vehicleType: formData.vehicleType,
      vehicleDetails: formData.vehicleDetails,
      condition: formData.condition,
      movable: formData.movable,
      address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
      city: formData.city,
      preferredDate: formData.preferredDate,
      preferredWindow: formData.preferredWindow,
      images: formData.images,
      notes: formData.accessNotes,
    });

    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      navigate('my-pickups', { id: created.id });
    }, 1200);
  };

  const addSampleImage = () => {
    const samples = [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
    ];
    const nextImg = samples[formData.images.length % samples.length];
    setFormData((prev) => ({ ...prev, images: [...prev.images, nextImg] }));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <div style={{ paddingTop: 96, paddingBottom: 100, backgroundColor: '#F7F8FA', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: 840 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span className="section-eyebrow">DOORSTEP SALVAGE RECOVERY</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: 700, color: '#17243A', letterSpacing: '-0.025em' }}>
            Request Responsible Scrap Collection.
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#737780', marginTop: 8 }}>
            Share what you have. Our automotive appraisal team will inspect your documentation and generate a
            valuation quote within 4 hours.
          </p>

          {/* Stepper */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              marginTop: 32,
            }}
          >
            {[
              { num: 1, label: 'Category' },
              { num: 2, label: 'Condition' },
              { num: 3, label: 'Photos' },
              { num: 4, label: 'Logistics' },
              { num: 5, label: 'Submit' },
            ].map((s) => (
              <div key={s.num} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: step === s.num ? '#24865A' : step > s.num ? '#24865A' : '#E8EBEF',
                    color: step >= s.num ? '#FFFFFF' : '#737780',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {step > s.num ? <CheckCircle2 size={18} /> : s.num}
                </div>
                <span
                  style={{
                    fontSize: '0.825rem',
                    fontWeight: step === s.num ? 700 : 500,
                    color: step === s.num ? '#17243A' : '#86868B',
                  }}
                >
                  {s.label}
                </span>
                {s.num < 5 && (
                  <div style={{ width: 24, height: 2, backgroundColor: step > s.num ? '#24865A' : '#E8EBEF' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div
          className="card"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '28px',
            padding: ' clamp(24px, 5vw, 48px)',
            boxShadow: '0 20px 50px -15px rgba(0,0,0,0.06)',
          }}
        >
          {/* Step 1: Category Selection */}
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#17243A', marginBottom: 12 }}>
                Step 1: What do you wish to recycle or scrap?
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#737780', marginBottom: 24 }}>
                Select the primary vehicle type or scrap classification:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 28 }}>
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = formData.vehicleType === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, vehicleType: cat.id })}
                      style={{
                        padding: '20px 16px',
                        borderRadius: '16px',
                        backgroundColor: isSelected ? '#EBF8F2' : '#F8F9FA',
                        border: isSelected ? '2px solid #24865A' : '1px solid rgba(0,0,0,0.06)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: '10px',
                          backgroundColor: isSelected ? '#24865A' : '#FFFFFF',
                          color: isSelected ? '#FFFFFF' : '#17243A',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: 12,
                        }}
                      >
                        <Icon size={20} />
                      </div>
                      <div style={{ fontSize: '1rem', fontWeight: 700, color: '#17243A', marginBottom: 4 }}>
                        {cat.label}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#737780' }}>
                        {cat.desc}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => setStep(2)} className="btn btn-mint" style={{ gap: 8 }}>
                  Continue to Condition Details
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Item Details */}
          {step === 2 && (
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#17243A', marginBottom: 20 }}>
                Step 2: Vehicle & Condition Details
              </h2>

              <div className="input-group">
                <label className="input-label">Vehicle Make, Model & Year</label>
                <input
                  type="text"
                  value={formData.vehicleDetails}
                  onChange={(e) => setFormData({ ...formData, vehicleDetails: e.target.value })}
                  className="input-field"
                  placeholder="e.g., 2015 Hyundai Creta 1.6 CRDi"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Current Condition & Damage State</label>
                <input
                  type="text"
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  className="input-field"
                  placeholder="e.g., Accident front impact, flood damaged, end of life certificate expired"
                />
              </div>

              <div className="input-group">
                <label className="input-label">Can the vehicle roll / steer?</label>
                <div style={{ display: 'flex', gap: 16 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9rem', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="movable"
                      checked={formData.movable === true}
                      onChange={() => setFormData({ ...formData, movable: true })}
                    />
                    <span>Yes, wheels roll freely (Winched recovery)</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9rem', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="movable"
                      checked={formData.movable === false}
                      onChange={() => setFormData({ ...formData, movable: false })}
                    />
                    <span>No, immobilized (Hydraulic crane required)</span>
                  </label>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Additional Description</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="textarea-field"
                  placeholder="Mention missing parts, battery presence, key availability..."
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
                <button onClick={() => setStep(1)} className="btn btn-secondary">
                  Back
                </button>
                <button onClick={() => setStep(3)} className="btn btn-mint" style={{ gap: 8 }}>
                  Continue to Photographs
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Photographs */}
          {step === 3 && (
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#17243A', marginBottom: 12 }}>
                Step 3: Upload Photographs
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#737780', marginBottom: 20 }}>
                Clear pictures of the exterior, engine bay, odometer (if accessible), and overall chassis assist
                our appraisers in offering you the highest possible salvage valuation.
              </p>

              <div
                style={{
                  border: '2px dashed rgba(36, 134, 90, 0.4)',
                  borderRadius: '20px',
                  padding: '36px',
                  textAlign: 'center',
                  backgroundColor: '#EBF8F2',
                  marginBottom: 24,
                }}
              >
                <UploadCloud size={40} color="#24865A" style={{ margin: '0 auto 12px auto' }} />
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#17243A', marginBottom: 6 }}>
                  Take photos with your phone or drop files here
                </div>
                <div style={{ fontSize: '0.85rem', color: '#737780', marginBottom: 16 }}>
                  JPG, PNG or HEIC files supported
                </div>
                <button onClick={addSampleImage} className="btn btn-secondary btn-sm" style={{ gap: 6 }}>
                  <Sparkles size={14} color="#24865A" />
                  Add Photo to Submission
                </button>
              </div>

              {/* Previews */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 14, marginBottom: 24 }}>
                {formData.images.map((img, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'relative',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      height: 110,
                      backgroundColor: '#F8F9FA',
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button
                      onClick={() => removeImage(i)}
                      style={{
                        position: 'absolute',
                        top: 6,
                        right: 6,
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep(2)} className="btn btn-secondary">
                  Back
                </button>
                <button onClick={() => setStep(4)} className="btn btn-mint" style={{ gap: 8 }}>
                  Continue to Location & Date
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Location & Logistics */}
          {step === 4 && (
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#17243A', marginBottom: 20 }}>
                Step 4: Pickup Address & Preferred Window
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="input-group">
                  <label className="input-label">Contact Name</label>
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Contact Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Pickup Address & Street</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="input-field"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                <div className="input-group">
                  <label className="input-label">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">PIN Code</label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="input-group">
                  <label className="input-label">Preferred Date</label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Preferred Time Window</label>
                  <select
                    value={formData.preferredWindow}
                    onChange={(e) => setFormData({ ...formData, preferredWindow: e.target.value })}
                    className="select-field"
                  >
                    <option>Morning (10:00 AM - 1:00 PM)</option>
                    <option>Afternoon (2:00 PM - 5:00 PM)</option>
                    <option>Evening (5:00 PM - 8:00 PM)</option>
                  </select>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Site Access Notes</label>
                <input
                  type="text"
                  value={formData.accessNotes}
                  onChange={(e) => setFormData({ ...formData, accessNotes: e.target.value })}
                  className="input-field"
                  placeholder="e.g., Narrow lane, underground basement, open workshop yard"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
                <button onClick={() => setStep(3)} className="btn btn-secondary">
                  Back
                </button>
                <button onClick={() => setStep(5)} className="btn btn-mint" style={{ gap: 8 }}>
                  Review Request
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Review & Submit */}
          {step === 5 && (
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#17243A', marginBottom: 12 }}>
                Step 5: Review & Submit Pickup Request
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#737780', marginBottom: 24 }}>
                Please review your submission details. Once submitted, our engineering appraisal desk will verify
                the scrap value and propose an official estimate for your approval.
              </p>

              <div
                style={{
                  backgroundColor: '#F8F9FA',
                  borderRadius: '20px',
                  padding: '24px',
                  border: '1px solid rgba(0,0,0,0.06)',
                  marginBottom: 24,
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#86868B', textTransform: 'uppercase' }}>Vehicle / Item</div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#17243A', marginTop: 2 }}>
                      {formData.vehicleDetails}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#737780' }}>
                      Category: {formData.vehicleType} • {formData.movable ? 'Movable' : 'Immobilized'}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#86868B', textTransform: 'uppercase' }}>Pickup Location</div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#17243A', marginTop: 2 }}>
                      {formData.city}, {formData.state}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#737780' }}>
                      {formData.address} ({formData.pincode})
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: '0.8rem', color: '#86868B', textTransform: 'uppercase' }}>Scheduled Window</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#24865A', marginTop: 2 }}>
                    {formData.preferredDate} ({formData.preferredWindow})
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: '16px 20px',
                  borderRadius: '16px',
                  backgroundColor: '#EBF8F2',
                  border: '1px solid rgba(36,134,90,0.2)',
                  fontSize: '0.85rem',
                  color: '#24865A',
                  lineHeight: 1.5,
                  marginBottom: 24,
                }}
              >
                🛡️ <strong>Notice of Transparent Workflow:</strong> A submission is an appraisal request, not an
                immediate binding contract. Our team inspects your photos and responds with a guaranteed valuation
                proposal which you can accept or decline with one click.
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep(4)} className="btn btn-secondary">
                  Back
                </button>
                <button onClick={handleSubmit} className="btn btn-mint btn-lg" style={{ gap: 8 }}>
                  <Truck size={18} />
                  Submit Pickup Request
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
