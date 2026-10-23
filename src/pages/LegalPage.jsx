import React, { useState } from 'react';
import { Shield, FileText, Lock, RefreshCw, Truck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function LegalPage() {
  const { pageParams } = useApp();
  const [activeDoc, setActiveDoc] = useState(pageParams.doc || 'privacy');

  const docs = {
    privacy: {
      title: 'Privacy Policy',
      updated: 'October 2026',
      icon: Lock,
      content: [
        {
          heading: '1. Information We Collect',
          body: 'Autolux Loop collects information you provide directly when creating an account, browsing parts, listing automotive components, or arranging scrap vehicle collection. This includes your contact name, verified mobile phone number, delivery address, vehicle registration details (VIN / engine number where relevant for scrap depollution certificates), and transaction histories.'
        },
        {
          heading: '2. Purpose of Processing',
          body: 'We use your data strictly to facilitate mechanical compatibility verification, process secure escrow payments, coordinate insured freight delivery, and dispatch authorized hydraulic flatbed recovery vehicles for scrap logistics. We do not sell your personal data to third-party advertising brokers.'
        },
        {
          heading: '3. Data Security & Storage',
          body: 'All communications, photo uploads, and payment transactions are encrypted using AES-256 standard protocols. Vehicle location data submitted for scrap requests is retained only for logistical routing and statutory RTO depollution reporting.'
        },
        {
          heading: '4. Your Statutory Rights',
          body: 'You retain the right to access, rectify, or request the deletion of your account information at any time via your account settings dashboard or by contacting operations@autoluxloop.internal.'
        }
      ]
    },
    terms: {
      title: 'Terms & Conditions',
      updated: 'October 2026',
      icon: FileText,
      content: [
        {
          heading: '1. Marketplace Participation',
          body: 'By accessing Autolux Loop, buyers and sellers agree to uphold honest condition disclosures. Misrepresenting damaged or non-functional parts as certified OEM stock constitutes a material breach and results in immediate account termination.'
        },
        {
          heading: '2. Scrap Pickup & Valuation Quotes',
          body: 'A scrap collection request submission represents an invitation to appraise and does not constitute a binding contract until the customer explicitly accepts the valuation quote. The company reserves the right to adjust estimates if physical inspection reveals missing critical assemblies (e.g. removed engine blocks or catalytic converters).'
        },
        {
          heading: '3. Escrow Settlement',
          body: 'Payment for marketplace parts is held in secure escrow until the buyer confirms mechanical receipt or within 7 days of verified logistics delivery.'
        }
      ]
    },
    refund: {
      title: 'Return & Refund Policy',
      updated: 'October 2026',
      icon: RefreshCw,
      content: [
        {
          heading: '1. 180-Day Guarantee',
          body: 'All certified refurbished and OEM automotive components include our 180-day mechanical assurance against premature internal failure, excessive runout, or seal leakage under normal operating parameters.'
        },
        {
          heading: '2. Fitment Guarantees',
          body: 'If a component verified as compatible through our platform fails to fit your vehicle chassis, we arrange complimentary return shipping and issue a 100% refund.'
        },
        {
          heading: '3. Return Window',
          body: 'Returns must be initiated within 14 calendar days of delivery. Parts must remain in uninstalled condition with intact inspection tamper seals.'
        }
      ]
    },
    shipping: {
      title: 'Shipping & Delivery Policy',
      updated: 'October 2026',
      icon: Truck,
      content: [
        {
          heading: '1. Insured Automotive Freight',
          body: 'All mechanical assemblies, engines, and brake calipers are shipped in reinforced shock-damped crating via specialized carriers (BlueDart Air / TCI Freight) with comprehensive transit insurance.'
        },
        {
          heading: '2. Delivery Timelines',
          body: 'Metro cities: 24 to 48 hours. Regional locations: 3 to 5 business days. Hazardous high-voltage EV battery packs are transported via specialized ground dangerous-goods logistics.'
        }
      ]
    },
    cookies: {
      title: 'Cookie Policy',
      updated: 'October 2026',
      icon: Shield,
      content: [
        {
          heading: '1. Essential Technical Cookies',
          body: 'Autolux Loop uses strictly necessary local tokens to maintain your active shopping bag, saved wishlist items, and security sessions across page navigation.'
        },
        {
          heading: '2. Preferences',
          body: 'We store your preferred vehicle filters and testing role switches locally in your browser to ensure seamless performance.'
        }
      ]
    }
  };

  const currentDoc = docs[activeDoc] || docs.privacy;

  return (
    <div style={{ paddingTop: 96, paddingBottom: 100, backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: 920 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="section-eyebrow">LEGAL COMPLIANCE & GOVERNANCE</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: 800, color: '#17243A', letterSpacing: '-0.025em' }}>
            {currentDoc.title}.
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#737780', marginTop: 8 }}>
            Last revised: {currentDoc.updated} • Transparent policies for buyers, sellers, and recycling partners.
          </p>

          {/* Doc Switcher Tabs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 8,
              marginTop: 28,
            }}
          >
            {Object.keys(docs).map((key) => {
              const item = docs[key];
              const Icon = item.icon;
              const isSelected = activeDoc === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveDoc(key)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    backgroundColor: isSelected ? '#17243A' : '#F2F4F7',
                    color: isSelected ? '#FFFFFF' : '#737780',
                    fontSize: '0.85rem',
                    fontWeight: isSelected ? 700 : 500,
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                  }}
                >
                  <Icon size={14} />
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Box */}
        <div
          className="card"
          style={{
            backgroundColor: '#F8F9FA',
            borderRadius: '24px',
            padding: '40px',
            border: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {currentDoc.content.map((sec, idx) => (
              <div key={idx}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#17243A', marginBottom: 10 }}>
                  {sec.heading}
                </h3>
                <p style={{ fontSize: '0.975rem', color: '#737780', lineHeight: 1.7 }}>
                  {sec.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
