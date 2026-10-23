import { useState, useEffect } from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { HeroLanding } from './components/HeroLanding';
import { BuyNumbersView } from './components/BuyNumbersView';
import { MyNumbersView } from './components/MyNumbersView';
import { PaymentsView } from './components/PaymentsView';
import { ProfileView } from './components/ProfileView';
import { NumberDetailsModal } from './components/NumberDetailsModal';
import { PaymentModal } from './components/PaymentModal';
import { PaymentSuccessModal } from './components/PaymentSuccessModal';
import { AuthModal } from './components/AuthModal';
import { Home, ShoppingCart, Smartphone, CreditCard, User, Sparkles } from 'lucide-react';
import {
  supabase,
  INITIAL_NUMBERS,
  getStoredUserNumbers,
  saveUserNumber,
  getStoredTransactions,
  saveTransaction
} from './lib/supabase';
import type {
  VirtualNumber,
  UserNumber,
  PaymentTransaction
} from './lib/supabase';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedCountryFilter, setSelectedCountryFilter] = useState<'India' | 'United States'>('India');
  
  // User Authentication - Defaults to false (User must login/signup first)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  // Numbers & Transactions Data
  const [availableNumbers, setAvailableNumbers] = useState<VirtualNumber[]>(INITIAL_NUMBERS);
  const [userNumbers, setUserNumbers] = useState<UserNumber[]>(getStoredUserNumbers());
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(getStoredTransactions());

  // Checkout Modals State
  const [activeNumberForCheckout, setActiveNumberForCheckout] = useState<VirtualNumber | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  // Sync with Supabase on mount
  useEffect(() => {
    async function initSupabase() {
      try {
        // Check active auth session
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData?.session?.user) {
          setIsLoggedIn(true);
          setUserEmail(sessionData.session.user.email || '');
          setUserName(sessionData.session.user.user_metadata?.full_name || sessionData.session.user.email?.split('@')[0] || 'User');
        }

        // Fetch virtual numbers
        const { data, error } = await supabase.from('virtual_numbers').select('*');
        if (data && data.length > 0 && !error) {
          setAvailableNumbers(data as VirtualNumber[]);
        }
      } catch (err) {
        console.log('Supabase read info:', err);
      }
    }
    initSupabase();
  }, []);

  // Checkout flow handlers: MANDATORY LOGIN REQUIRED BEFORE SELECTING A NUMBER
  const handleSelectNumber = (num: VirtualNumber) => {
    setActiveNumberForCheckout(num);
    if (!isLoggedIn) {
      setAuthModalMode('login');
      setAuthModalOpen(true);
      return;
    }
    setDetailsModalOpen(true);
  };

  const handleProceedToPayment = (num: VirtualNumber) => {
    setDetailsModalOpen(false);
    setActiveNumberForCheckout(num);
    setPaymentModalOpen(true);
  };

  const handlePaymentSuccess = async (details: {
    number: VirtualNumber;
    method: string;
    amount: number;
  }) => {
    const newUserNum: UserNumber = {
      id: 'num-' + Date.now(),
      user_id: userName ? userName.toLowerCase().replace(/\s+/g, '-') : 'user',
      phone_number: details.number.phone_number,
      country: details.number.country === 'India' ? 'Indian Number' : 'US Number',
      flag: details.number.flag,
      status: 'Active',
      purchased_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      expires_in_days: 30,
    };

    const newTx: PaymentTransaction = {
      id: 'tx-' + Date.now(),
      user_id: userName ? userName.toLowerCase().replace(/\s+/g, '-') : 'user',
      phone_number: details.number.phone_number,
      amount: details.amount,
      currency: details.number.currency,
      payment_method: details.method,
      status: 'Success',
      transaction_ref: 'VNB-' + Math.floor(100000 + Math.random() * 900000),
      created_at: new Date().toISOString(),
    };

    // Update state & LocalStorage
    const updatedUserNums = saveUserNumber(newUserNum);
    const updatedTxs = saveTransaction(newTx);
    setUserNumbers(updatedUserNums);
    setTransactions(updatedTxs);

    // Also attempt remote Supabase insert asynchronously
    try {
      await supabase.from('user_numbers').insert([
        {
          user_id: newUserNum.user_id,
          user_email: userEmail,
          phone_number: newUserNum.phone_number,
          country: newUserNum.country,
          flag: newUserNum.flag,
          status: 'Active',
        }
      ]);
      await supabase.from('payments').insert([
        {
          user_id: newTx.user_id,
          phone_number: newTx.phone_number,
          amount: newTx.amount,
          currency: newTx.currency,
          payment_method: newTx.payment_method,
          status: 'Success',
          transaction_ref: newTx.transaction_ref,
        }
      ]);
    } catch (e) {
      console.log('Supabase sync note:', e);
    }

    setPaymentModalOpen(false);
    setSuccessModalOpen(true);
  };

  const handleViewMyNumbers = () => {
    setSuccessModalOpen(false);
    setCurrentTab('my-numbers');
  };

  const handleBackToHome = () => {
    setSuccessModalOpen(false);
    setCurrentTab('home');
  };

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleLoginSuccess = (user: { name: string; email: string }) => {
    setUserName(user.name);
    setUserEmail(user.email);
    setIsLoggedIn(true);

    // If user clicked a number before logging in, now immediately open Number Details!
    if (activeNumberForCheckout) {
      setTimeout(() => {
        setDetailsModalOpen(true);
      }, 350);
    }
  };

  const handleTabChange = (tab: string) => {
    if (!isLoggedIn && (tab === 'my-numbers' || tab === 'payments' || tab === 'profile')) {
      handleOpenAuth('login');
      return;
    }
    setCurrentTab(tab);
  };

  // Redirect to home if user is logged out while on a private dashboard tab
  useEffect(() => {
    if (!isLoggedIn && (currentTab === 'my-numbers' || currentTab === 'payments' || currentTab === 'profile')) {
      setCurrentTab('home');
    }
  }, [isLoggedIn, currentTab]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.log(e);
    }
    setIsLoggedIn(false);
    setUserName('');
    setUserEmail('');
    setCurrentTab('home');
  };

  return (
    <div className="app-container">
      {/* Top Global Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={handleTabChange}
        isLoggedIn={isLoggedIn}
        userName={userName}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      {/* UNIFIED RESPONSIVE APPLICATION (DESKTOP & MOBILE FRIENDLY) */}
      <div className="dashboard-layout-wrapper">
        {/* Dark Navy Sidebar for Dashboard navigation on Desktop - ONLY when logged in */}
        {isLoggedIn && currentTab !== 'home' && (
          <Sidebar
            currentTab={currentTab}
            setCurrentTab={handleTabChange}
            onLogout={handleLogout}
            myNumbersCount={userNumbers.filter((n) => n.status === 'Active').length}
          />
        )}

        {/* Main Content Area */}
        <main className={currentTab === 'home' ? 'landing-main' : 'dashboard-main-area'}>
          {/* TAB: HOME / LANDING */}
          {currentTab === 'home' && (
            <HeroLanding
              onOpenAuth={handleOpenAuth}
              onExploreNumbers={() => setCurrentTab('buy')}
              onSelectCategory={(country) => {
                setSelectedCountryFilter(country);
                setCurrentTab('buy');
              }}
              availableNumbers={availableNumbers}
              onSelectNumber={handleSelectNumber}
            />
          )}

          {/* TAB: BUY NUMBERS (AVAILABLE NUMBERS) */}
          {currentTab === 'buy' && (
            <BuyNumbersView
              numbers={availableNumbers}
              onSelectNumber={handleSelectNumber}
              selectedCountryFilter={selectedCountryFilter}
            />
          )}

          {/* TAB: MY NUMBERS (Protected) */}
          {currentTab === 'my-numbers' && (
            <MyNumbersView
              userNumbers={userNumbers}
              onNavigateToBuy={() => setCurrentTab('buy')}
            />
          )}

          {/* TAB: PAYMENTS (Protected) */}
          {currentTab === 'payments' && (
            <PaymentsView
              transactions={transactions}
              onNavigateToBuy={() => setCurrentTab('buy')}
            />
          )}

          {/* TAB: PROFILE (Protected) */}
          {currentTab === 'profile' && (
            <ProfileView
              userName={userName}
              userEmail={userEmail}
              onNavigateTab={handleTabChange}
              onLogout={handleLogout}
              activeNumbersCount={userNumbers.filter((n) => n.status === 'Active').length}
            />
          )}

          {/* TAB: FEATURES */}
          {currentTab === 'features' && (
            <div className="animate-fade-in" style={{ padding: '20px' }}>
              <h1 className="main-page-title">Platform Features & Security</h1>
              <p className="main-page-sub">Enterprise-grade VoIP & GSM infrastructure backed by automated webhooks.</p>
              <div className="why-choose-us-section" style={{ marginTop: '24px' }}>
                <div className="features-three-grid">
                  <div className="feature-item-box">
                    <div className="feature-icon-circle">🇮🇳</div>
                    <h3>Dedicated Indian Numbers</h3>
                    <p>Full support for SMS OTPs, WhatsApp verification, UPI banking alerts and more.</p>
                  </div>
                  <div className="feature-item-box">
                    <div className="feature-icon-circle">🇺🇸</div>
                    <h3>US Toll-Free & Local</h3>
                    <p>High reputation US numbers (+1) compatible with Google, Apple, Telegram and PayPal.</p>
                  </div>
                  <div className="feature-item-box">
                    <div className="feature-icon-circle">⚡</div>
                    <h3>Real-Time Live Webhooks</h3>
                    <p>Receive incoming verification codes instantaneously with zero latency.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MOBILE RESPONSIVE BOTTOM NAVIGATION BAR */}
      <nav className="mobile-responsive-bottom-bar" aria-label="Mobile Navigation">
        <button
          className={`mob-bar-btn ${currentTab === 'home' ? 'active' : ''}`}
          onClick={() => handleTabChange('home')}
        >
          <Home size={20} />
          <span>Home</span>
        </button>
        <button
          className={`mob-bar-btn ${currentTab === 'buy' ? 'active' : ''}`}
          onClick={() => handleTabChange('buy')}
        >
          <ShoppingCart size={20} />
          <span>Buy</span>
        </button>
        {isLoggedIn ? (
          <>
            <button
              className={`mob-bar-btn ${currentTab === 'my-numbers' ? 'active' : ''}`}
              onClick={() => handleTabChange('my-numbers')}
            >
              <Smartphone size={20} />
              <span>Numbers</span>
            </button>
            <button
              className={`mob-bar-btn ${currentTab === 'payments' ? 'active' : ''}`}
              onClick={() => handleTabChange('payments')}
            >
              <CreditCard size={20} />
              <span>Payments</span>
            </button>
            <button
              className={`mob-bar-btn ${currentTab === 'profile' ? 'active' : ''}`}
              onClick={() => handleTabChange('profile')}
            >
              <User size={20} />
              <span>Profile</span>
            </button>
          </>
        ) : (
          <>
            <button
              className={`mob-bar-btn ${currentTab === 'features' ? 'active' : ''}`}
              onClick={() => handleTabChange('features')}
            >
              <Sparkles size={20} />
              <span>Features</span>
            </button>
            <button
              className="mob-bar-btn"
              onClick={() => handleOpenAuth('login')}
            >
              <User size={20} />
              <span>Login</span>
            </button>
          </>
        )}
      </nav>

      {/* MODALS */}
      {/* 1. Number Details Modal */}
      <NumberDetailsModal
        number={activeNumberForCheckout}
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        onProceedToPayment={handleProceedToPayment}
      />

      {/* 2. Payment Modal */}
      <PaymentModal
        number={activeNumberForCheckout}
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        onBackToDetails={() => {
          setPaymentModalOpen(false);
          setDetailsModalOpen(true);
        }}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* 3. Payment Success Modal */}
      <PaymentSuccessModal
        number={activeNumberForCheckout}
        isOpen={successModalOpen}
        onViewMyNumbers={handleViewMyNumbers}
        onBackToHome={handleBackToHome}
      />

      {/* 4. Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authModalMode}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        selectedNumber={activeNumberForCheckout ? activeNumberForCheckout.phone_number : null}
      />
    </div>
  );
}

export default App;
