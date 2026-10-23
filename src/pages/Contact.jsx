import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Contact() {
  const { addToast } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    category: 'Part Sourcing Inquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    addToast({
      type: 'success',
      title: 'Message Transmitted',
      message: 'Our technical support desk has received your ticket and will respond within 2 hours.'
    });
  };

  return (
    <div style={{ paddingTop: 96, paddingBottom: 100, backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: 940 }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="section-eyebrow">DIRECT CONTACT</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, color: '#17243A', letterSpacing: '-0.025em' }}>
            We're Here to Help.
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#737780', marginTop: 8 }}>
            Connect with our automotive technical specialists, parts sourcing team, or scrap logistics desk.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40, alignItems: 'start' }}>
          {/* Contact Details */}
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#17243A', marginBottom: 20 }}>
              National Operations Hub
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 36 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: '12px', backgroundColor: '#F0F4FF', color: '#3478F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#17243A', fontSize: '0.95rem' }}>Central Circular Depot</div>
                  <div style={{ color: '#737780', fontSize: '0.875rem', lineHeight: 1.5 }}>
                    Plot 104, MIDC Automotive Corridor, Chakan, Pune, Maharashtra 410501
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: '12px', backgroundColor: '#EBF8F2', color: '#24865A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#17243A', fontSize: '0.95rem' }}>Toll-Free Logistics Line</div>
                  <div style={{ color: '#737780', fontSize: '0.875rem' }}>
                    1800 266 8920 (Mon - Sat, 8:00 AM - 8:00 PM IST)
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: '12px', backgroundColor: '#F8F9FA', color: '#17243A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#17243A', fontSize: '0.95rem' }}>Direct Email</div>
                  <div style={{ color: '#737780', fontSize: '0.875rem' }}>
                    operations@autoluxloop.internal
                  </div>
                </div>
              </div>
            </div>

            <div style={{ padding: '20px', borderRadius: '18px', backgroundColor: '#F8F9FA', border: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#17243A', marginBottom: 6 }}>
                Commercial Fleet Inquiries
              </div>
              <p style={{ fontSize: '0.825rem', color: '#737780', lineHeight: 1.5 }}>
                Operating transit, logistics, or rental fleets? Inquire about scheduled batch decommissioning and bulk scrap contracts.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card" style={{ padding: '36px', backgroundColor: '#FFFFFF', borderRadius: '24px' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <CheckCircle2 size={48} color="#24865A" style={{ margin: '0 auto 16px auto' }} />
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#17243A', marginBottom: 8 }}>
                  Message Received
                </h3>
                <p style={{ color: '#737780', fontSize: '0.95rem' }}>
                  Thank you for reaching out. A specialized team member will review your message shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#17243A', marginBottom: 20 }}>
                  Send an Inquiry
                </h3>

                <div className="input-group">
                  <label className="input-label">Your Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-field"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="input-field"
                    placeholder="name@company.com"
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Inquiry Classification</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="select-field"
                  >
                    <option>Part Sourcing & Compatibility</option>
                    <option>Scrap Vehicle Collection</option>
                    <option>Seller Verification</option>
                    <option>Fleet Decommissioning Contract</option>
                  </select>
                </div>

                <div className="input-group">
                  <label className="input-label">Message</label>
                  <textarea
                    rows="4"
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="textarea-field"
                    placeholder="Provide details about your vehicle, part number, or request..."
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center', gap: 8, marginTop: 8 }}>
                  <Send size={18} />
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
