import React, { useState } from 'react';
import {
  Shield,
  Zap,
  Lock,
  Headphones,
  CheckCircle2,
  ArrowRight,
  Search,
  ChevronDown,
  Star
} from 'lucide-react';
import type { VirtualNumber } from '../lib/supabase';

interface HeroLandingProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onExploreNumbers: () => void;
  onSelectCategory: (country: 'India' | 'United States') => void;
  availableNumbers: VirtualNumber[];
  onSelectNumber: (num: VirtualNumber) => void;
}

export const HeroLanding: React.FC<HeroLandingProps> = ({
  onOpenAuth,
  onExploreNumbers,
  onSelectCategory,
  availableNumbers,
  onSelectNumber,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'India' | 'United States'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [mockPreviewTab, setMockPreviewTab] = useState<'whatsapp' | 'google' | 'telegram'>('whatsapp');

  const filteredNumbers = availableNumbers.filter((n) => {
    const matchesCountry = selectedFilter === 'All' ? true : n.country === selectedFilter;
    const matchesSearch = n.phone_number.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCountry && matchesSearch;
  });

  const faqs = [
    {
      q: 'Can I receive WhatsApp, Telegram & Banking verification OTPs?',
      a: 'Yes! All Indian (+91) and US (+1) virtual numbers provided on VNumber are genuine carrier-routed mobile numbers, fully compatible with WhatsApp, Telegram, Google, Banking apps, and social media.'
    },
    {
      q: 'How fast do incoming SMS and OTP codes arrive?',
      a: 'OTPs are delivered in real time (< 10-15 seconds) directly to your private web dashboard receiver via high-speed automated webhooks.'
    },
    {
      q: 'Do I need to submit physical KYC documents or identity proof?',
      a: 'No physical SIM card or paperwork is required. You can choose a number, complete instant checkout via UPI or Card, and start receiving SMS immediately.'
    },
    {
      q: 'How long does my purchased virtual number stay active?',
      a: 'Every purchased number comes with an initial 30 days active validity period, with the option to renew or extend whenever you need.'
    }
  ];

  const supportedPlatforms = [
    { name: 'WhatsApp', icon: '💬', color: '#25D366' },
    { name: 'Telegram', icon: '✈️', color: '#0088cc' },
    { name: 'Google', icon: '🔍', color: '#4285F4' },
    { name: 'OpenAI / ChatGPT', icon: '🤖', color: '#10a37f' },
    { name: 'Amazon', icon: '📦', color: '#FF9900' },
    { name: 'Instagram', icon: '📸', color: '#E1306C' },
    { name: 'UPI / Banking', icon: '🏦', color: '#1b64f2' },
    { name: 'PayPal', icon: '💳', color: '#003087' },
    { name: 'Discord', icon: '🎮', color: '#5865F2' },
    { name: 'Netflix', icon: '🍿', color: '#E50914' },
  ];

  return (
    <div className="landing-container">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Shield size={15} className="text-primary" />
            <span>Enterprise Virtual SIM Platform • 100% Privacy</span>
          </div>

          <h1 className="hero-title">
            Secure Virtual Numbers <br />
            <span className="text-gradient">For Instant OTPs & Calls</span>
          </h1>

          <p className="hero-subtitle">
            Bypass SMS verifications and protect your personal phone number. Receive instant verification codes for WhatsApp, Telegram, Google, and banking with zero hassle.
          </p>

          <ul className="hero-features-list">
            <li>
              <CheckCircle2 size={18} className="feature-check-icon" />
              <span>Dedicated Indian (+91) & US (+1)</span>
            </li>
            <li>
              <CheckCircle2 size={18} className="feature-check-icon" />
              <span>Real-Time Webhook (&lt; 10s OTPs)</span>
            </li>
            <li>
              <CheckCircle2 size={18} className="feature-check-icon" />
              <span>Zero KYC Hassle • No Physical SIM</span>
            </li>
            <li>
              <CheckCircle2 size={18} className="feature-check-icon" />
              <span>24/7 Support & 256-Bit Encryption</span>
            </li>
          </ul>

          <div className="hero-cta-group">
            <button className="btn-hero-primary" onClick={onExploreNumbers}>
              <span>Explore Available Numbers</span>
              <ArrowRight size={17} />
            </button>
            <button className="btn-hero-secondary" onClick={() => onOpenAuth('signup')}>
              Sign Up Free
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '24px' }}>
            <div style={{ display: 'flex', color: '#f59e0b' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#f59e0b" />
              ))}
            </div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>
              Rated 4.9/5 by 15,000+ satisfied users
            </span>
          </div>
        </div>

        {/* HERO GRAPHIC: SLEEK PHONE SIMULATOR MOCKUP */}
        <div className="hero-graphic-container">
          <div className="phone-graphic-mockup">
            <div className="phone-screen-inner">
              <div className="phone-speaker-notch"></div>

              {/* Status Bar */}
              <div style={{
                position: 'absolute',
                top: '20px',
                width: '88%',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '11px',
                color: 'rgba(255, 255, 255, 0.75)',
                fontWeight: 600
              }}>
                <span>VNumber 5G</span>
                <span>100% 🔋</span>
              </div>

              {/* Center Shield Graphic */}
              <div className="shield-illustration-card">
                <div className="big-shield-icon">
                  <Lock size={38} className="text-white" />
                </div>
              </div>

              {/* Floating Pill: Active Number */}
              <div className="float-pill-number animate-float" style={{ animationDelay: '0s' }}>
                <span className="dot-active"></span>
                <span style={{ fontWeight: 700, fontSize: '13px' }}>+91 98765 43210</span>
                <span style={{ fontSize: '10px', background: '#ecfdf5', color: '#059669', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                  ACTIVE
                </span>
              </div>

              {/* Floating Pill: Live Incoming OTP Demo */}
              <div className="float-pill-otp animate-float" style={{ animationDelay: '1.5s', width: '220px', padding: '10px 14px' }}>
                <div style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#1b64f2' }}>
                      {mockPreviewTab === 'whatsapp' ? '💬 WhatsApp' : mockPreviewTab === 'google' ? '🔍 Google' : '✈️ Telegram'}
                    </span>
                    <span style={{ fontSize: '9px', color: '#64748b' }}>Just now</span>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', letterSpacing: '1px' }}>
                    {mockPreviewTab === 'whatsapp' ? 'OTP: 839-201' : mockPreviewTab === 'google' ? 'G-491024' : 'Code: 73921'}
                  </div>
                </div>
              </div>

              {/* Interactive Demo Selector inside Mockup */}
              <div style={{
                position: 'absolute',
                bottom: '16px',
                display: 'flex',
                gap: '6px',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(8px)',
                padding: '4px',
                borderRadius: '10px'
              }}>
                <button
                  onClick={() => setMockPreviewTab('whatsapp')}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '10px',
                    color: '#fff',
                    background: mockPreviewTab === 'whatsapp' ? '#2563eb' : 'transparent',
                    fontWeight: 600
                  }}
                >
                  WhatsApp
                </button>
                <button
                  onClick={() => setMockPreviewTab('google')}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '10px',
                    color: '#fff',
                    background: mockPreviewTab === 'google' ? '#2563eb' : 'transparent',
                    fontWeight: 600
                  }}
                >
                  Google
                </button>
                <button
                  onClick={() => setMockPreviewTab('telegram')}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '10px',
                    color: '#fff',
                    background: mockPreviewTab === 'telegram' ? '#2563eb' : 'transparent',
                    fontWeight: 600
                  }}
                >
                  Telegram
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRIC TRUST COUNTERS */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        margin: '20px 0 60px 0'
      }}>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#1b64f2', letterSpacing: '-0.5px' }}>99.98%</div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', marginTop: '4px' }}>SMS Delivery Rate</div>
        </div>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#10b981', letterSpacing: '-0.5px' }}>&lt; 15 Sec</div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', marginTop: '4px' }}>Instant OTP Webhook</div>
        </div>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px' }}>50,000+</div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', marginTop: '4px' }}>Active Numbers Delivered</div>
        </div>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#8b5cf6', letterSpacing: '-0.5px' }}>24/7</div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', marginTop: '4px' }}>Dedicated Priority Support</div>
        </div>
      </section>

      {/* SUPPORTED PLATFORMS BADGE MARQUEE */}
      <section style={{ margin: '40px 0 60px 0', textAlign: 'center' }}>
        <h3 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1.2px', color: '#64748b', fontWeight: 700, marginBottom: '20px' }}>
          Fully Compatible With Over 100+ Major Services
        </h3>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '12px',
          maxWidth: '960px',
          margin: '0 auto'
        }}>
          {supportedPlatforms.map((p, idx) => (
            <div
              key={idx}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#334155',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
              }}
            >
              <span>{p.icon}</span>
              <span>{p.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK CATEGORY SELECTION CARDS */}
      <section className="categories-preview-section">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">Select Number Country</h2>
            <p className="section-subtitle">Pick high-reputation dedicated Indian or US numbers with instant activation.</p>
          </div>
          <button className="btn-view-all" onClick={onExploreNumbers}>
            <span>View All ({availableNumbers.length})</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="category-cards-grid">
          {/* Indian Number Card */}
          <div className="country-hero-card card-indian" onClick={() => onSelectCategory('India')}>
            <div className="country-card-header">
              <div className="flag-badge">🇮🇳</div>
              <div>
                <h3 className="country-card-title">Indian Virtual Number</h3>
                <div className="price-tag">
                  <span className="price-amount">₹150</span>
                  <span className="price-unit">/ 30 Days</span>
                </div>
              </div>
            </div>
            <p className="country-card-desc">
              Perfect for WhatsApp, Telegram, Indian UPI, Banking alerts, IRCTC, Flipkart and Amazon.
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
              <span style={{ fontSize: '11px', background: '#f1f5f9', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>WhatsApp Ready</span>
              <span style={{ fontSize: '11px', background: '#f1f5f9', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>UPI & Bank Alerts</span>
              <span style={{ fontSize: '11px', background: '#f1f5f9', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>30 Days Validity</span>
            </div>
            <div className="country-card-footer">
              <span className="stock-badge">
                {availableNumbers.filter((n) => n.country === 'India').length} Available Now
              </span>
              <button className="btn-buy-card">Select & Buy</button>
            </div>
          </div>

          {/* US Number Card */}
          <div className="country-hero-card card-us" onClick={() => onSelectCategory('United States')}>
            <div className="country-card-header">
              <div className="flag-badge">🇺🇸</div>
              <div>
                <h3 className="country-card-title">US Virtual Number</h3>
                <div className="price-tag">
                  <span className="price-amount">₹250</span>
                  <span className="price-unit">/ 30 Days</span>
                </div>
              </div>
            </div>
            <p className="country-card-desc">
              High reputation global US numbers (+1) compatible with Google 2FA, PayPal, OpenAI ChatGPT, and Apple.
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
              <span style={{ fontSize: '11px', background: '#f1f5f9', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>Google 2-Step</span>
              <span style={{ fontSize: '11px', background: '#f1f5f9', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>PayPal & Discord</span>
              <span style={{ fontSize: '11px', background: '#f1f5f9', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>30 Days Validity</span>
            </div>
            <div className="country-card-footer">
              <span className="stock-badge">
                {availableNumbers.filter((n) => n.country === 'United States').length} Available Now
              </span>
              <button className="btn-buy-card">Select & Buy</button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED NUMBERS LIVE CATALOG ON FRONT PAGE */}
      <section className="numbers-preview-section">
        <div className="section-header-row" style={{ flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 className="section-title">Popular Numbers Ready For Instant Use</h2>
            <p className="section-subtitle">Select any number below to verify and complete quick activation.</p>
          </div>

          {/* Live Filter & Search Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', background: '#f1f5f9', padding: '3px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              {(['All', 'India', 'United States'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '7px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: selectedFilter === filter ? '#1b64f2' : '#64748b',
                    background: selectedFilter === filter ? '#ffffff' : 'transparent',
                    boxShadow: selectedFilter === filter ? '0 1px 3px rgba(0,0,0,0.06)' : 'none'
                  }}
                >
                  {filter === 'India' ? '🇮🇳 India' : filter === 'United States' ? '🇺🇸 USA' : '🌐 All'}
                </button>
              ))}
            </div>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search size={15} style={{ position: 'absolute', left: '10px', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Search digits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '7px 12px 7px 32px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  fontSize: '13px',
                  background: '#ffffff',
                  width: '160px'
                }}
              />
            </div>
          </div>
        </div>

        {/* Live Grid */}
        <div className="available-numbers-grid">
          {filteredNumbers.slice(0, 8).map((num) => (
            <div key={num.id} className="number-preview-card" style={{ transition: 'all 0.2s', cursor: 'pointer' }} onClick={() => onSelectNumber(num)}>
              <div className="num-flag">{num.flag}</div>
              <div className="num-info">
                <span className="num-digits">{num.phone_number}</span>
                <span className="num-type">{num.country} • {num.currency}{num.price}</span>
              </div>
              <button
                className="btn-select-number"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectNumber(num);
                }}
              >
                Select
              </button>
            </div>
          ))}
        </div>

        {filteredNumbers.length === 0 && (
          <div style={{ textAlign: 'center', padding: '36px', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', color: '#64748b', fontSize: '14px' }}>
            No virtual numbers match your search. Try changing the country filter or search digits.
          </div>
        )}
      </section>

      {/* HOW IT WORKS (3 SIMPLE STEPS) */}
      <section style={{ margin: '70px 0 50px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 className="section-title">How VNumber Works</h2>
          <p className="section-subtitle">Get your private virtual phone number running in 3 straightforward steps.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '32px 24px', position: 'relative', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#eff6ff', color: '#1b64f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '16px', marginBottom: '18px' }}>
              1
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Choose a Number</h3>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5 }}>
              Browse our verified pool of Indian (+91) and US (+1) numbers and select the one that fits your need.
            </p>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '32px 24px', position: 'relative', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#eff6ff', color: '#1b64f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '16px', marginBottom: '18px' }}>
              2
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Instant Fast Checkout</h3>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5 }}>
              Complete easy, safe checkout via UPI (Google Pay, PhonePe, Paytm) or Card. Instant number allocation.
            </p>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '32px 24px', position: 'relative', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#eff6ff', color: '#1b64f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '16px', marginBottom: '18px' }}>
              3
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Receive OTPs Live</h3>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.5 }}>
              Enter the number into WhatsApp or your desired service and receive verification codes instantly on your dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US (SECURITY & PRIVACY) */}
      <section className="why-choose-us-section">
        <h2 className="section-title text-center">Built For Complete Privacy & Security</h2>
        <p className="section-subtitle text-center">Engineered with high security VoIP routing to protect your identity.</p>

        <div className="features-three-grid">
          <div className="feature-item-box">
            <div className="feature-icon-circle blue-glow">
              <Shield size={26} />
            </div>
            <h3>100% Identity Protection</h3>
            <p>Keep your personal mobile number private. Never suffer from annoying telemarketing calls or leaked database spam.</p>
          </div>

          <div className="feature-item-box">
            <div className="feature-icon-circle blue-glow">
              <Zap size={26} />
            </div>
            <h3>Instant Delivery</h3>
            <p>Activate your virtual number in under 30 seconds. Instant automated carrier provisioning with high OTP delivery rate.</p>
          </div>

          <div className="feature-item-box">
            <div className="feature-icon-circle blue-glow">
              <Headphones size={26} />
            </div>
            <h3>24/7 Dedicated Support</h3>
            <p>Our priority telecom support team is always available to assist you with number activation, renewals, and queries.</p>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section style={{ margin: '70px 0 50px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Everything you need to know about VNumber virtual numbers.</p>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'all 0.2s'
              }}
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                style={{
                  width: '100%',
                  padding: '18px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'left',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#0f172a'
                }}
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={18}
                  style={{
                    transform: activeFaq === idx ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.2s',
                    color: '#64748b'
                  }}
                />
              </button>
              {activeFaq === idx && (
                <div style={{ padding: '0 20px 18px 20px', fontSize: '14px', color: '#64748b', lineHeight: 1.6, borderTop: '1px solid #f1f5f9' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section style={{
        marginTop: '60px',
        padding: '48px 36px',
        background: 'linear-gradient(135deg, #1b64f2 0%, #172554 100%)',
        borderRadius: '24px',
        color: '#ffffff',
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(27, 100, 242, 0.25)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '14px', letterSpacing: '-0.5px' }}>
            Ready to Protect Your Personal Phone Number?
          </h2>
          <p style={{ fontSize: '16px', opacity: 0.9, lineHeight: 1.6, marginBottom: '28px' }}>
            Choose your dedicated Indian or US virtual number now and start receiving OTPs and verification codes within seconds.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={onExploreNumbers}
              style={{
                padding: '14px 28px',
                background: '#ffffff',
                color: '#1b64f2',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: 700,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              Get Your Number Now
            </button>
            <button
              onClick={() => onOpenAuth('signup')}
              style={{
                padding: '14px 26px',
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: '#ffffff',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: 600,
                backdropFilter: 'blur(8px)'
              }}
            >
              Create Free Account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroLanding;
