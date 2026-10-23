import React, { useState } from 'react';
import {
  UploadCloud,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  X,
  Sparkles,
  ShieldCheck,
  Tag,
  Car
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { VEHICLE_TYPES, PART_CATEGORIES } from '../data/mockData';

export default function SellParts() {
  const { addProductListing, navigate } = useApp();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    vehicleType: 'cars',
    make: 'Porsche',
    model: '911 (992)',
    year: '2023',
    powertrain: 'Hybrid / Petrol',
    title: 'Porsche OEM Titanium Exhaust Muffler Assembly',
    category: 'powertrain',
    partNumber: 'POR-EXH-992-04',
    condition: 'Certified Refurbished',
    price: 85000,
    originalPrice: 160000,
    location: 'Mumbai Hub',
    description: 'Precision extracted from an executive demonstration vehicle. Zero denting or thermal fatigue. Acoustic baffles and motorized valves tested and operating at factory tolerances.',
    images: [
      'https://images.unsplash.com/photo-1600793575654-910699b5e4d4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600793575654-910699b5e4d4?auto=format&fit=crop&w=1200&q=80'
    ]
  });

  const handlePublish = (e) => {
    e.preventDefault();

    const created = addProductListing({
      title: formData.title,
      category: formData.category,
      vehicleType: formData.vehicleType,
      partNumber: formData.partNumber,
      oemCode: formData.partNumber,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice) || Number(formData.price) * 1.5,
      condition: formData.condition,
      images: formData.images.length > 0 ? formData.images : ['https://images.unsplash.com/photo-1600793575654-910699b5e4d4?auto=format&fit=crop&w=1200&q=80'],
      description: formData.description,
      location: formData.location,
      compatibility: {
        verified: true,
        makes: [formData.make],
        models: [formData.model],
        years: formData.year
      },
      specs: [
        { label: 'Vehicle Fitment', value: `${formData.make} ${formData.model}` },
        { label: 'Condition Class', value: formData.condition },
        { label: 'Inspected By', value: 'Autolux Certified Technician' }
      ],
      inStock: true,
      stockCount: 1,
      warranty: '90 Days Guarantee'
    });

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      navigate('product-detail', { id: created.id });
    }, 1200);
  };

  const addSampleImage = () => {
    const samples = [
      'https://images.unsplash.com/photo-1600793575654-910699b5e4d4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558441719-8d8a7cbb0299?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=1200&q=80'
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
          <span className="section-eyebrow">SELLER WIZARD</span>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 700, color: '#17243A', letterSpacing: '-0.025em' }}>
            List Your Automotive Component.
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#737780', marginTop: 8 }}>
            Monetize surplus automotive inventory or salvaged OEM modules across verified buyers.
          </p>

          {/* Stepper Progress Bar */}
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
              { num: 1, label: 'Vehicle' },
              { num: 2, label: 'Part Specs' },
              { num: 3, label: 'Photos' },
              { num: 4, label: 'Pricing' },
              { num: 5, label: 'Review' },
            ].map((s) => (
              <div
                key={s.num}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: step === s.num ? '#3478F6' : step > s.num ? '#24865A' : '#E8EBEF',
                    color: step >= s.num ? '#FFFFFF' : '#737780',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
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

        {/* Wizard Card Container */}
        <div
          className="card"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '28px',
            padding: ' clamp(24px, 5vw, 48px)',
            boxShadow: '0 20px 50px -15px rgba(0,0,0,0.06)',
          }}
        >
          {/* Step 1: Donor Vehicle Info */}
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#17243A', marginBottom: 20 }}>
                Step 1: Donor Vehicle Specification
              </h2>

              <div className="input-group">
                <label className="input-label">Vehicle Type</label>
                <select
                  value={formData.vehicleType}
                  onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                  className="select-field"
                >
                  {VEHICLE_TYPES.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="input-group">
                  <label className="input-label">Manufacturer / Make</label>
                  <input
                    type="text"
                    value={formData.make}
                    onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                    className="input-field"
                    placeholder="e.g., Porsche, BMW, Tata"
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Model & Chassis Code</label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="input-field"
                    placeholder="e.g., 911 (992), M3 (G80)"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="input-group">
                  <label className="input-label">Model Year</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="input-field"
                    placeholder="e.g., 2023"
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Powertrain / Fuel</label>
                  <input
                    type="text"
                    value={formData.powertrain}
                    onChange={(e) => setFormData({ ...formData, powertrain: e.target.value })}
                    className="input-field"
                    placeholder="e.g., Electric, Petrol Turbo"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
                <button onClick={() => setStep(2)} className="btn btn-primary" style={{ gap: 8 }}>
                  Continue to Part Details
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Part Information */}
          {step === 2 && (
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#17243A', marginBottom: 20 }}>
                Step 2: Component Details
              </h2>

              <div className="input-group">
                <label className="input-label">Listing Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-field"
                  placeholder="e.g., Brembo GT 6-Piston Caliper Pair"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="input-group">
                  <label className="input-label">Part Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="select-field"
                  >
                    {PART_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">OEM Part Number / Serial</label>
                  <input
                    type="text"
                    value={formData.partNumber}
                    onChange={(e) => setFormData({ ...formData, partNumber: e.target.value })}
                    className="input-field"
                    placeholder="e.g., 992.351.423.B"
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Condition Grade</label>
                <select
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  className="select-field"
                >
                  <option value="New OEM">New OEM (Unused Surplus)</option>
                  <option value="Certified Refurbished">Certified Refurbished (Ultrasonic Cleaned & Bench Tested)</option>
                  <option value="Tested Used">Tested Used (Fully Operational with Light Wear)</option>
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">Description & Wear Notes</label>
                <textarea
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="textarea-field"
                  placeholder="Describe extraction condition, mileage on donor car, cosmetic notes..."
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
                <button onClick={() => setStep(1)} className="btn btn-secondary">
                  Back
                </button>
                <button onClick={() => setStep(3)} className="btn btn-primary" style={{ gap: 8 }}>
                  Continue to Photos
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Photos */}
          {step === 3 && (
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#17243A', marginBottom: 12 }}>
                Step 3: Component Photography
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#737780', marginBottom: 20 }}>
                Upload high-definition photos showing the part from multiple angles, including mounting tabs and OEM serial labels.
              </p>

              {/* Upload Dropzone Preview */}
              <div
                style={{
                  border: '2px dashed rgba(52, 120, 246, 0.4)',
                  borderRadius: '20px',
                  padding: '36px',
                  textAlign: 'center',
                  backgroundColor: '#F0F4FF',
                  marginBottom: 24,
                }}
              >
                <UploadCloud size={40} color="#3478F6" style={{ margin: '0 auto 12px auto' }} />
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#17243A', marginBottom: 6 }}>
                  Drag and drop automotive photos here
                </div>
                <div style={{ fontSize: '0.85rem', color: '#737780', marginBottom: 16 }}>
                  PNG, JPG, or WEBP up to 25MB each
                </div>
                <button onClick={addSampleImage} className="btn btn-secondary btn-sm" style={{ gap: 6 }}>
                  <Sparkles size={14} color="#3478F6" />
                  Add Photo to Gallery
                </button>
              </div>

              {/* Image Previews */}
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
                <button onClick={() => setStep(4)} className="btn btn-primary" style={{ gap: 8 }}>
                  Continue to Pricing
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Pricing */}
          {step === 4 && (
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#17243A', marginBottom: 20 }}>
                Step 4: Valuation & Fulfillment
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="input-group">
                  <label className="input-label">Asking Price (₹ INR)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="input-field"
                    placeholder="85000"
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Original OEM MRP (₹ INR)</label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="input-field"
                    placeholder="160000"
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Dispatch Hub / Warehouse Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="input-field"
                  placeholder="e.g., Pune Auto Cluster, Mumbai"
                />
              </div>

              <div
                style={{
                  padding: '16px 20px',
                  borderRadius: '16px',
                  backgroundColor: '#EBF8F2',
                  border: '1px solid rgba(36, 134, 90, 0.2)',
                  color: '#24865A',
                  fontSize: '0.875rem',
                  marginBottom: 24,
                }}
              >
                ✓ <strong>Seller Protection Guarantee:</strong> Payout of ₹
                {Number(formData.price).toLocaleString('en-IN')} will be held in escrow and settled
                directly to your bank account within 24 hours of successful buyer fitment confirmation.
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep(3)} className="btn btn-secondary">
                  Back
                </button>
                <button onClick={() => setStep(5)} className="btn btn-primary" style={{ gap: 8 }}>
                  Review & Publish
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Review & Publish */}
          {step === 5 && (
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#17243A', marginBottom: 12 }}>
                Step 5: Review & Finalize Listing
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#737780', marginBottom: 24 }}>
                Review how your listing appears to buyers in the Autolux Loop marketplace before making it live.
              </p>

              {/* Preview Card */}
              <div
                style={{
                  border: '1px solid rgba(0,0,0,0.08)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  backgroundColor: '#F8F9FA',
                  padding: '24px',
                  marginBottom: 28,
                  display: 'flex',
                  gap: 24,
                  flexWrap: 'wrap',
                }}
              >
                <img
                  src={formData.images[0]}
                  alt=""
                  style={{ width: 140, height: 140, borderRadius: '16px', objectFit: 'cover' }}
                />

                <div style={{ flex: 1 }}>
                  <span className="badge badge-mint" style={{ marginBottom: 8 }}>
                    {formData.condition}
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#17243A', marginBottom: 6 }}>
                    {formData.title}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: '#737780', marginBottom: 12 }}>
                    Fits: {formData.make} {formData.model} ({formData.year}) • OEM: {formData.partNumber}
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#17243A' }}>
                    ₹{Number(formData.price).toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep(4)} className="btn btn-secondary">
                  Back
                </button>
                <button
                  onClick={handlePublish}
                  className="btn btn-blue btn-lg"
                  style={{ gap: 8 }}
                >
                  <Sparkles size={18} />
                  Publish to Marketplace Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
