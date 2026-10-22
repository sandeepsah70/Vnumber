import React from 'react';
import { Shield, Zap, Lock, Headphones, CheckCircle2, ArrowRight } from 'lucide-react';
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
  return (
    <div className="landing-container">
      {/* Hero Banner Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Shield size={16} className="text-primary" />
            <span>Virtual Number Platform</span>
          </div>

          <h1 className="hero-title">
            Get a Virtual Number <br />
            <span className="text-gradient">for a Safer You</span>
          </h1>

          <p className="hero-subtitle">
            Call, text and receive OTPs with a virtual number. Keep your real number private and secure.
          </p>

          <ul className="hero-features-list">
            <li>
              <CheckCircle2 size={18} className="feature-check-icon" />
              <span>Indian & US Numbers</span>
            </li>
            <li>
              <CheckCircle2 size={18} className="feature-check-icon" />
              <span>Instant Activation</span>
            </li>
            <li>
              <CheckCircle2 size={18} className="feature-check-icon" />
              <span>100% Secure</span>
            </li>
            <li>
              <CheckCircle2 size={18} className="feature-check-icon" />
              <span>24/7 Support</span>
            </li>
          </ul>

          <div className="hero-cta-group">
            <button className="btn-hero-primary" onClick={() => onOpenAuth('login')}>
              Login
            </button>
            <button className="btn-hero-secondary" onClick={() => onOpenAuth('signup')}>
              Sign Up
            </button>
          </div>
        </div>

        {/* Hero Visual Mockup matching the screenshot */}
        <div className="hero-graphic-container">
          <div className="phone-graphic-mockup">
            <div className="phone-screen-inner">
              <div className="phone-speaker-notch"></div>
              
              {/* Security Shield Centerpiece */}
              <div className="shield-illustration-card">
                <div className="big-shield-icon">
                  <Lock size={42} className="text-white" />
                </div>
              </div>

              {/* Float Card 1: Virtual Number Display */}
              <div className="float-pill-number animate-float">
                <span className="dot-active"></span>
                <span className="font-semibold">+1 201 555 0123</span>
              </div>

              {/* Float Card 2: OTP Bubble */}
              <div className="float-pill-otp">
                <span className="otp-label">OTP</span>
                <span className="otp-number">123456</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Category Selection Cards */}
      <section className="categories-preview-section">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">Select Your Number</h2>
            <p className="section-subtitle">Choose from verified Indian and US numbers with instant activation.</p>
          </div>
          <button className="btn-view-all" onClick={onExploreNumbers}>
            <span>View All Numbers</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="category-cards-grid">
          {/* Indian Number Card */}
          <div className="country-hero-card card-indian" onClick={() => onSelectCategory('India')}>
            <div className="country-card-header">
              <div className="flag-badge">🇮🇳</div>
              <div>
                <h3 className="country-card-title">Indian Number</h3>
                <div className="price-tag">
                  <span className="price-amount">₹150</span>
                  <span className="price-unit">/ Number</span>
                </div>
              </div>
            </div>
            <p className="country-card-desc">
              Perfect for WhatsApp, Banking OTPs, Amazon, IRCTC & Indian services.
            </p>
            <div className="country-card-footer">
              <span className="stock-badge">8 Available</span>
              <button className="btn-buy-card">Buy Now</button>
            </div>
          </div>

          {/* US Number Card */}
          <div className="country-hero-card card-us" onClick={() => onSelectCategory('United States')}>
            <div className="country-card-header">
              <div className="flag-badge">🇺🇸</div>
              <div>
                <h3 className="country-card-title">US Number</h3>
                <div className="price-tag">
                  <span className="price-amount">₹250</span>
                  <span className="price-unit">/ Number</span>
                </div>
              </div>
            </div>
            <p className="country-card-desc">
              Global reliability for Google, PayPal, Telegram, Discord, and US apps.
            </p>
            <div className="country-card-footer">
              <span className="stock-badge">7 Available</span>
              <button className="btn-buy-card">Buy Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Numbers Grid Preview */}
      <section className="numbers-preview-section">
        <div className="section-header-row">
          <h2 className="section-title">Popular Numbers Ready for Instant Use</h2>
          <span className="tag-live-badge">🟢 Real-Time Sync</span>
        </div>

        <div className="available-numbers-grid">
          {availableNumbers.slice(0, 8).map((num) => (
            <div key={num.id} className="number-preview-card">
              <div className="num-flag">{num.flag}</div>
              <div className="num-info">
                <span className="num-digits">{num.phone_number}</span>
                <span className="num-type">{num.country}</span>
              </div>
              <button className="btn-select-number" onClick={() => onSelectNumber(num)}>
                Select
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us-section">
        <h2 className="section-title text-center">Why Choose Us?</h2>
        <div className="features-three-grid">
          <div className="feature-item-box">
            <div className="feature-icon-circle blue-glow">
              <Shield size={26} />
            </div>
            <h3>100% Secure</h3>
            <p>End-to-end encrypted routing. No call records or sensitive personal data is stored.</p>
          </div>

          <div className="feature-item-box">
            <div className="feature-icon-circle blue-glow">
              <Zap size={26} />
            </div>
            <h3>Instant Delivery</h3>
            <p>Activate your virtual number in less than 30 seconds right after seamless checkout.</p>
          </div>

          <div className="feature-item-box">
            <div className="feature-icon-circle blue-glow">
              <Headphones size={26} />
            </div>
            <h3>24/7 Support</h3>
            <p>Our dedicated support team is available round-the-clock for instant assistance.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
