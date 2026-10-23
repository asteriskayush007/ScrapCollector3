import React, { useState } from 'react';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const [search, setSearch] = useState('');

  const faqs = [
    {
      q: 'How does Autolux Loop verify part compatibility with my specific vehicle?',
      a: 'We cross-reference the original manufacturer OEM code and donor chassis VIN against certified global catalog databases. Our live compatibility tool on every product page tests your make, model, and year with 99.8% precision.'
    },
    {
      q: 'What is the condition difference between "New OEM", "Certified Refurbished", and "Tested Used"?',
      a: '"New OEM" items are uninstalled manufacturer surplus stock in original packaging. "Certified Refurbished" components are ultrasonic-cleaned, resealed with fresh OE compounds, and pressure-tested on test benches. "Tested Used" parts are low-mileage components that pass strict visual, dimensional, and diagnostic inspections.'
    },
    {
      q: 'How does the scrap vehicle appraisal and pickup process work?',
      a: 'When you submit a pickup request with photos and vehicle details, our metallurgical and salvage appraisers review the data. Within 4 hours, we issue an official valuation quote. You can review the quote and accept or decline with one click. Only upon confirmation is a hydraulic flatbed scheduled.'
    },
    {
      q: 'What warranty is provided with purchased parts?',
      a: 'Unless otherwise noted, all certified automotive parts include Autolux Loop’s 180-Day Mechanical Assurance. If an item fails bench testing or does not match fitment specifications, we provide immediate exchange or 100% refund.'
    },
    {
      q: 'How does payment escrow protect buyers and sellers?',
      a: 'When a buyer places an order, payment is secured in escrow. The seller dispatches the part with insured tracking. Once the buyer or certified installer confirms mechanical fitment, the payout is settled directly to the seller’s bank account.'
    },
    {
      q: 'Do you issue official RTO scrap and deregistration certificates?',
      a: 'Yes. For complete end-of-life or accident write-off vehicles, our certified recycling facilities process the chassis according to national scrappage policies and provide you with an authorized Certificate of Deposit / Destruction.'
    }
  ];

  const filtered = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ paddingTop: 96, paddingBottom: 100, backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: 840 }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="section-eyebrow">FREQUENTLY ASKED QUESTIONS</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: 800, color: '#17243A', letterSpacing: '-0.025em' }}>
            Answers to Common Queries.
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#737780', marginTop: 8 }}>
            Everything you need to know about compatibility, warranties, and doorstep scrap logistics.
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 18px',
              backgroundColor: '#F8F9FA',
              borderRadius: '16px',
              maxWidth: 500,
              margin: '28px auto 0 auto',
              border: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <Search size={18} color="#737780" />
            <input
              type="text"
              placeholder="Search questions (e.g. warranty, fitment, scrap)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                border: 'none',
                background: 'none',
                outline: 'none',
                width: '100%',
                fontSize: '0.95rem',
                fontFamily: 'inherit',
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {filtered.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="card"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1px solid rgba(0,0,0,0.06)',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    background: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#17243A' }}>
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={20}
                    color="#737780"
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                      flexShrink: 0,
                      marginLeft: 12,
                    }}
                  />
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 24px 20px 24px',
                      fontSize: '0.95rem',
                      color: '#737780',
                      lineHeight: 1.6,
                      borderTop: '1px solid rgba(0,0,0,0.04)',
                      paddingTop: 16,
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
