import React, { useState } from 'react';
import {
  Phone,
  Shield,
  Zap,
  Globe,
  Home,
  Smartphone,
  CreditCard,
  User,
  ArrowLeft,
  CheckCircle,
  Clock,
  ChevronRight,
  LogOut,
  Settings,
  HelpCircle,
  Lock
} from 'lucide-react';
import { INITIAL_NUMBERS } from '../lib/supabase';
import type { VirtualNumber, UserNumber, PaymentTransaction } from '../lib/supabase';
import confetti from 'canvas-confetti';

interface MobileSimulatorProps {
  onClose: () => void;
  userNumbers: UserNumber[];
  onAddUserNumber: (num: UserNumber, tx: PaymentTransaction) => void;
  transactions: PaymentTransaction[];
}

export const MobileSimulator: React.FC<MobileSimulatorProps> = ({
  onClose,
  userNumbers,
  onAddUserNumber,
  transactions,
}) => {
  // Mobile app navigation state:
  // 'splash' | 'login' | 'signup' | 'home' | 'indian-numbers' | 'us-numbers' | 'details' | 'payment' | 'success' | 'my-numbers' | 'profile'
  const [screen, setScreen] = useState<string>('home');
  const [selectedNum, setSelectedNum] = useState<VirtualNumber>(INITIAL_NUMBERS[0]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'wallet'>('upi');
  const [activeTab, setActiveTab] = useState<'active' | 'expired'>('active');
  const [bottomNav, setBottomNav] = useState<'home' | 'my-numbers' | 'payments' | 'profile'>('home');

  const indianNumbers = INITIAL_NUMBERS.filter((n) => n.country === 'India');
  const usNumbers = INITIAL_NUMBERS.filter((n) => n.country === 'United States');

  const handleSelectNumber = (num: VirtualNumber) => {
    setSelectedNum(num);
    setScreen('details');
  };

  const handlePayNow = () => {
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch (e) {
      console.error(e);
    }
    const newUserNum: UserNumber = {
      id: 'num-' + Date.now(),
      user_id: 'john-doe',
      phone_number: selectedNum.phone_number,
      country: selectedNum.country === 'India' ? 'Indian Number' : 'US Number',
      flag: selectedNum.flag,
      status: 'Active',
      purchased_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      expires_in_days: 30,
    };
    const newTx: PaymentTransaction = {
      id: 'tx-' + Date.now(),
      user_id: 'john-doe',
      phone_number: selectedNum.phone_number,
      amount: selectedNum.price,
      currency: selectedNum.currency,
      payment_method: selectedPaymentMethod.toUpperCase(),
      status: 'Success',
      transaction_ref: 'REF-' + Math.floor(100000 + Math.random() * 900000),
      created_at: new Date().toISOString(),
    };
    onAddUserNumber(newUserNum, newTx);
    setScreen('success');
  };

  const navigateBottom = (tab: 'home' | 'my-numbers' | 'payments' | 'profile') => {
    setBottomNav(tab);
    if (tab === 'home') setScreen('home');
    if (tab === 'my-numbers') setScreen('my-numbers');
    if (tab === 'payments') setScreen('payments');
    if (tab === 'profile') setScreen('profile');
  };

  return (
    <div className="mobile-simulator-wrapper animate-fade-in">
      {/* Device Frame */}
      <div className="iphone-outer-frame">
        {/* Notch / Dynamic Island */}
        <div className="iphone-notch">
          <span className="notch-time">9:41</span>
          <div className="notch-speaker-pill"></div>
          <div className="notch-icons">
            <span className="notch-signal">●●●●</span>
            <span className="notch-wifi">📶</span>
            <span className="notch-battery">🔋</span>
          </div>
        </div>

        {/* Screen View Container */}
        <div className="iphone-screen-viewport">

          {/* SCREEN 1: SPLASH */}
          {screen === 'splash' && (
            <div className="m-screen-splash animate-fade-in">
              <div className="m-splash-center">
                <div className="m-phone-bubble">
                  <Phone size={44} className="text-white" />
                </div>
                <h1 className="m-app-name">Virtual Number</h1>
                <p className="m-splash-sub">
                  Get a virtual number for calls, SMS and OTP. Keep your real number private and secure.
                </p>

                <div className="m-splash-features-row">
                  <div className="m-feat-item">
                    <Shield size={18} className="text-primary" />
                    <span>Privacy First</span>
                  </div>
                  <div className="m-feat-item">
                    <Globe size={18} className="text-primary" />
                    <span>Global Coverage</span>
                  </div>
                  <div className="m-feat-item">
                    <Zap size={18} className="text-primary" />
                    <span>Instant Activation</span>
                  </div>
                </div>
              </div>

              <div className="m-splash-bottom">
                <button className="m-btn-primary" onClick={() => setScreen('home')}>
                  Get Started
                </button>
              </div>
            </div>
          )}

          {/* SCREEN 2: LOGIN */}
          {screen === 'login' && (
            <div className="m-screen-auth animate-fade-in">
              <div className="m-auth-header">
                <div className="m-phone-bubble small">
                  <Phone size={24} className="text-white" />
                </div>
                <h2>Virtual Number</h2>
                <p>Login to your account</p>
              </div>

              <div className="m-tab-toggle-pill">
                <button className="active">Login</button>
                <button onClick={() => setScreen('signup')}>Sign Up</button>
              </div>

              <div className="m-form-inputs">
                <input type="text" placeholder="Email or Phone Number" defaultValue="john@example.com" />
                <input type="password" placeholder="Password" defaultValue="••••••••" />
                <div className="m-forgot-pass">
                  <a href="#forgot">Forgot Password?</a>
                </div>
                <button className="m-btn-primary" onClick={() => setScreen('home')}>
                  Login
                </button>
              </div>

              <div className="m-switch-auth-link">
                Don't have an account? <span onClick={() => setScreen('signup')}>Sign Up</span>
              </div>
            </div>
          )}

          {/* SCREEN 3: SIGN UP */}
          {screen === 'signup' && (
            <div className="m-screen-auth animate-fade-in">
              <div className="m-auth-header">
                <div className="m-phone-bubble small">
                  <Phone size={24} className="text-white" />
                </div>
                <h2>Virtual Number</h2>
                <p>Create your account</p>
              </div>

              <div className="m-tab-toggle-pill">
                <button onClick={() => setScreen('login')}>Login</button>
                <button className="active">Sign Up</button>
              </div>

              <div className="m-form-inputs">
                <input type="text" placeholder="Full Name" defaultValue="John Doe" />
                <input type="email" placeholder="Email Address" defaultValue="john@example.com" />
                <input type="tel" placeholder="Phone Number" defaultValue="+91 98765 43210" />
                <input type="password" placeholder="Password" defaultValue="••••••••" />
                <button className="m-btn-primary" onClick={() => setScreen('home')}>
                  Sign Up
                </button>
              </div>

              <div className="m-switch-auth-link">
                Already have an account? <span onClick={() => setScreen('login')}>Login</span>
              </div>
            </div>
          )}

          {/* SCREEN 5: HOME DASHBOARD */}
          {screen === 'home' && (
            <div className="m-screen-content animate-fade-in">
              {/* App Bar */}
              <div className="m-top-appbar">
                <div className="m-appbar-left">
                  <div className="m-mini-logo">
                    <Phone size={16} className="text-white" />
                  </div>
                  <span className="m-appbar-title">Virtual Number</span>
                </div>
                <div className="m-appbar-right" onClick={() => navigateBottom('profile')}>
                  <div className="m-avatar-small">JD</div>
                </div>
              </div>

              <div className="m-scrollable-body">
                {/* Privacy Hero Card */}
                <div className="m-privacy-card">
                  <div className="m-priv-text">
                    <h3>Your Privacy Our Priority</h3>
                    <p>Get a virtual number and stay connected worldwide.</p>
                  </div>
                  <div className="m-priv-shield">
                    <Shield size={32} className="text-white" />
                  </div>
                </div>

                {/* Country Quick Cards */}
                <div className="m-countries-row">
                  <div className="m-country-card" onClick={() => setScreen('indian-numbers')}>
                    <span className="m-flag">🇮🇳</span>
                    <span className="m-country-label">Indian Number</span>
                    <span className="m-country-price">₹150 <small>/ Number</small></span>
                  </div>

                  <div className="m-country-card" onClick={() => setScreen('us-numbers')}>
                    <span className="m-flag">🇺🇸</span>
                    <span className="m-country-label">US Number</span>
                    <span className="m-country-price">$250 <small>/ Number</small></span>
                  </div>
                </div>

                {/* Why Choose Us */}
                <div className="m-why-choose-block">
                  <h4 className="m-section-heading">Why Choose Us?</h4>
                  <div className="m-why-grid">
                    <div className="m-why-box">
                      <Shield size={20} className="text-primary" />
                      <span>100% Secure</span>
                    </div>
                    <div className="m-why-box">
                      <Zap size={20} className="text-primary" />
                      <span>Instant Delivery</span>
                    </div>
                    <div className="m-why-box">
                      <Clock size={20} className="text-primary" />
                      <span>24/7 Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 6: INDIAN NUMBERS */}
          {screen === 'indian-numbers' && (
            <div className="m-screen-content animate-fade-in">
              <div className="m-subpage-appbar">
                <button className="m-back-btn" onClick={() => setScreen('home')}>
                  <ArrowLeft size={18} />
                </button>
                <span className="m-page-heading">Indian Numbers</span>
              </div>

              <div className="m-rate-banner">
                <span>₹150 <small>/ Number</small></span>
              </div>

              <div className="m-scrollable-body m-numbers-list">
                {indianNumbers.map((item) => (
                  <div key={item.id} className="m-number-row-card">
                    <div className="m-num-left">
                      <span className="m-item-flag">🇮🇳</span>
                      <span className="m-item-phone">{item.phone_number}</span>
                    </div>
                    <button className="m-btn-select-pill" onClick={() => handleSelectNumber(item)}>
                      Select
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SCREEN 7: US NUMBERS */}
          {screen === 'us-numbers' && (
            <div className="m-screen-content animate-fade-in">
              <div className="m-subpage-appbar">
                <button className="m-back-btn" onClick={() => setScreen('home')}>
                  <ArrowLeft size={18} />
                </button>
                <span className="m-page-heading">US Numbers</span>
              </div>

              <div className="m-rate-banner">
                <span>$250 <small>/ Number</small></span>
              </div>

              <div className="m-scrollable-body m-numbers-list">
                {usNumbers.map((item) => (
                  <div key={item.id} className="m-number-row-card">
                    <div className="m-num-left">
                      <span className="m-item-flag">🇺🇸</span>
                      <span className="m-item-phone">{item.phone_number}</span>
                    </div>
                    <button className="m-btn-select-pill" onClick={() => handleSelectNumber(item)}>
                      Select
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SCREEN 8: NUMBER DETAILS */}
          {screen === 'details' && (
            <div className="m-screen-content animate-fade-in">
              <div className="m-subpage-appbar">
                <button className="m-back-btn" onClick={() => setScreen('home')}>
                  <ArrowLeft size={18} />
                </button>
                <span className="m-page-heading">Number Details</span>
              </div>

              <div className="m-scrollable-body">
                <div className="m-details-hero-card">
                  <div className="m-d-top">
                    <span className="m-d-flag">{selectedNum.flag}</span>
                    <div>
                      <h4>{selectedNum.phone_number}</h4>
                      <span>{selectedNum.country}</span>
                    </div>
                  </div>
                  <div className="m-d-price">
                    {selectedNum.currency}{selectedNum.price}
                  </div>
                </div>

                <div className="m-features-group">
                  <h5>Features</h5>
                  <div className="m-feat-check-item">
                    <CheckCircle size={18} className="text-green-500" />
                    <span>Receive Calls</span>
                  </div>
                  <div className="m-feat-check-item">
                    <CheckCircle size={18} className="text-green-500" />
                    <span>Receive SMS</span>
                  </div>
                  <div className="m-feat-check-item">
                    <CheckCircle size={18} className="text-green-500" />
                    <span>Receive OTP</span>
                  </div>
                  <div className="m-feat-check-item">
                    <CheckCircle size={18} className="text-green-500" />
                    <span>Valid for 30 Days</span>
                  </div>
                </div>

                <div className="m-details-action">
                  <button className="m-btn-primary" onClick={() => setScreen('payment')}>
                    Proceed to Payment
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 9: PAYMENT */}
          {screen === 'payment' && (
            <div className="m-screen-content animate-fade-in">
              <div className="m-subpage-appbar">
                <button className="m-back-btn" onClick={() => setScreen('details')}>
                  <ArrowLeft size={18} />
                </button>
                <span className="m-page-heading">Payment</span>
              </div>

              <div className="m-scrollable-body">
                <div className="m-payment-summary-strip">
                  <div className="m-strip-info">
                    <span>{selectedNum.flag}</span>
                    <div>
                      <strong>{selectedNum.phone_number}</strong>
                      <small>{selectedNum.country}</small>
                    </div>
                  </div>
                  <span className="m-strip-cost">{selectedNum.currency}{selectedNum.price}</span>
                </div>

                <h5 className="m-pm-title">Choose Payment Method</h5>
                <div className="m-payment-options">
                  <label className={`m-opt-row ${selectedPaymentMethod === 'upi' ? 'active' : ''}`} onClick={() => setSelectedPaymentMethod('upi')}>
                    <input type="radio" checked={selectedPaymentMethod === 'upi'} readOnly />
                    <span>UPI (Google Pay / PhonePe / Paytm)</span>
                  </label>
                  <label className={`m-opt-row ${selectedPaymentMethod === 'card' ? 'active' : ''}`} onClick={() => setSelectedPaymentMethod('card')}>
                    <input type="radio" checked={selectedPaymentMethod === 'card'} readOnly />
                    <span>Credit / Debit Card</span>
                  </label>
                  <label className={`m-opt-row ${selectedPaymentMethod === 'netbanking' ? 'active' : ''}`} onClick={() => setSelectedPaymentMethod('netbanking')}>
                    <input type="radio" checked={selectedPaymentMethod === 'netbanking'} readOnly />
                    <span>Net Banking</span>
                  </label>
                  <label className={`m-opt-row ${selectedPaymentMethod === 'wallet' ? 'active' : ''}`} onClick={() => setSelectedPaymentMethod('wallet')}>
                    <input type="radio" checked={selectedPaymentMethod === 'wallet'} readOnly />
                    <span>Wallet (Paytm / Mobikwik)</span>
                  </label>
                </div>

                <button className="m-btn-primary m-btn-pay-now" onClick={handlePayNow}>
                  Pay Now
                </button>

                <div className="m-secure-tag">
                  <Lock size={13} />
                  <span>Your payment is secure and encrypted</span>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 10: PAYMENT SUCCESSFUL */}
          {screen === 'success' && (
            <div className="m-screen-success animate-fade-in">
              <div className="m-success-check-bubble">
                <CheckCircle size={52} className="text-white" />
              </div>

              <h3>Payment Successful!</h3>
              <p>Your virtual number has been activated.</p>

              <div className="m-success-num-card">
                <span>{selectedNum.flag}</span>
                <div>
                  <strong>{selectedNum.phone_number}</strong>
                  <small>{selectedNum.country}</small>
                </div>
              </div>

              <div className="m-success-buttons">
                <button className="m-btn-primary" onClick={() => navigateBottom('my-numbers')}>
                  View My Numbers
                </button>
                <button className="m-btn-outline" onClick={() => navigateBottom('home')}>
                  Back to Home
                </button>
              </div>
            </div>
          )}

          {/* SCREEN 11: MY NUMBERS */}
          {screen === 'my-numbers' && (
            <div className="m-screen-content animate-fade-in">
              <div className="m-subpage-appbar">
                <button className="m-back-btn" onClick={() => setScreen('home')}>
                  <ArrowLeft size={18} />
                </button>
                <span className="m-page-heading">My Numbers</span>
              </div>

              <div className="m-status-tabs">
                <button className={activeTab === 'active' ? 'active' : ''} onClick={() => setActiveTab('active')}>Active</button>
                <button className={activeTab === 'expired' ? 'active' : ''} onClick={() => setActiveTab('expired')}>Expired</button>
              </div>

              <div className="m-scrollable-body">
                {userNumbers.map((un) => (
                  <div key={un.id} className="m-my-number-card">
                    <div className="m-card-top">
                      <div className="m-card-num-info">
                        <span>{un.flag}</span>
                        <div>
                          <strong>{un.phone_number}</strong>
                          <small>{un.country}</small>
                        </div>
                      </div>
                      <span className="m-active-chip">Active</span>
                    </div>
                    <div className="m-card-bottom">
                      <small>Expires in {un.expires_in_days || 29} Days</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SCREEN 12: PROFILE */}
          {screen === 'profile' && (
            <div className="m-screen-content animate-fade-in">
              <div className="m-subpage-appbar">
                <button className="m-back-btn" onClick={() => setScreen('home')}>
                  <ArrowLeft size={18} />
                </button>
                <span className="m-page-heading">Profile</span>
              </div>

              <div className="m-scrollable-body">
                <div className="m-profile-user-card">
                  <div className="m-profile-avatar">
                    <User size={30} className="text-white" />
                  </div>
                  <div className="m-profile-meta">
                    <h4>John Doe</h4>
                    <p>john@example.com</p>
                  </div>
                </div>

                <div className="m-profile-nav-stack">
                  <div className="m-p-row" onClick={() => navigateBottom('my-numbers')}>
                    <Smartphone size={18} />
                    <span>My Numbers</span>
                    <ChevronRight size={16} />
                  </div>
                  <div className="m-p-row" onClick={() => navigateBottom('payments')}>
                    <CreditCard size={18} />
                    <span>Payment History</span>
                    <ChevronRight size={16} />
                  </div>
                  <div className="m-p-row">
                    <Settings size={18} />
                    <span>Settings</span>
                    <ChevronRight size={16} />
                  </div>
                  <div className="m-p-row">
                    <HelpCircle size={18} />
                    <span>Help & Support</span>
                    <ChevronRight size={16} />
                  </div>
                  <div className="m-p-row text-red-500" onClick={() => setScreen('login')}>
                    <LogOut size={18} />
                    <span>Logout</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN: PAYMENTS HISTORY (MOBILE) */}
          {screen === 'payments' && (
            <div className="m-screen-content animate-fade-in">
              <div className="m-subpage-appbar">
                <button className="m-back-btn" onClick={() => setScreen('home')}>
                  <ArrowLeft size={18} />
                </button>
                <span className="m-page-heading">Payment History</span>
              </div>

              <div className="m-scrollable-body">
                {transactions.map((tx) => (
                  <div key={tx.id} className="m-tx-card">
                    <div className="m-tx-info">
                      <strong>{tx.phone_number}</strong>
                      <small>{tx.payment_method} • {tx.transaction_ref}</small>
                    </div>
                    <div className="m-tx-price font-bold">
                      {tx.currency}{tx.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BOTTOM NAVIGATION BAR */}
          {['home', 'indian-numbers', 'us-numbers', 'my-numbers', 'profile', 'payments'].includes(screen) && (
            <div className="m-bottom-nav-bar">
              <button
                className={`m-nav-tab ${bottomNav === 'home' && screen === 'home' ? 'active' : ''}`}
                onClick={() => navigateBottom('home')}
              >
                <Home size={20} />
                <span>Home</span>
              </button>
              <button
                className={`m-nav-tab ${bottomNav === 'my-numbers' && screen === 'my-numbers' ? 'active' : ''}`}
                onClick={() => navigateBottom('my-numbers')}
              >
                <Smartphone size={20} />
                <span>My Numbers</span>
              </button>
              <button
                className={`m-nav-tab ${bottomNav === 'payments' && screen === 'payments' ? 'active' : ''}`}
                onClick={() => navigateBottom('payments')}
              >
                <CreditCard size={20} />
                <span>Payments</span>
              </button>
              <button
                className={`m-nav-tab ${bottomNav === 'profile' && screen === 'profile' ? 'active' : ''}`}
                onClick={() => navigateBottom('profile')}
              >
                <User size={20} />
                <span>Profile</span>
              </button>
            </div>
          )}

        </div>

        {/* iPhone Home Indicator */}
        <div className="iphone-home-indicator"></div>
      </div>

      {/* Simulator Control floating badge */}
      <div className="simulator-floating-controls">
        <div className="simulator-badge-title">
          <span>📱 Interactive Mobile Simulator</span>
          <span className="device-spec">iPhone 15 Pro • 390x844</span>
        </div>
        <p className="simulator-hint">
          Fully interactive replication of all 12 mobile screens from your UI design.
        </p>
        <button className="btn-exit-simulator" onClick={onClose}>
          Switch to Desktop View
        </button>
      </div>
    </div>
  );
};
