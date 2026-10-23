import React, { useState } from 'react';
import { Phone, LogIn, UserPlus, LogOut, Menu, X, Home, ShoppingCart, Smartphone, CreditCard, Sparkles, User } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isLoggedIn: boolean;
  userName: string;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  isLoggedIn,
  userName,
  onOpenAuth,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: string) => {
    // If not logged in and user tries to click private tabs, prompt login
    if (!isLoggedIn && (tab === 'my-numbers' || tab === 'payments' || tab === 'profile')) {
      onOpenAuth('login');
      setMobileMenuOpen(false);
      return;
    }
    setCurrentTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Logo */}
        <div className="logo-brand" onClick={() => handleNavClick('home')}>
          <div className="logo-icon-bubble">
            <Phone className="icon-phone" size={20} />
          </div>
          <div className="logo-text-group">
            <span className="logo-title">Virtual Number</span>
            <span className="logo-badge">VNUMBER</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav-links">
          <button
            className={`nav-link ${currentTab === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            Home
          </button>
          
          <button
            className={`nav-link ${currentTab === 'buy' ? 'active' : ''}`}
            onClick={() => handleNavClick('buy')}
          >
            Buy Number
          </button>

          <button
            className={`nav-link ${currentTab === 'features' ? 'active' : ''}`}
            onClick={() => handleNavClick('features')}
          >
            Features
          </button>

          {/* Private tabs: ONLY visible when logged in */}
          {isLoggedIn && (
            <>
              <button
                className={`nav-link ${currentTab === 'my-numbers' ? 'active' : ''}`}
                onClick={() => handleNavClick('my-numbers')}
              >
                My Numbers
              </button>
              <button
                className={`nav-link ${currentTab === 'payments' ? 'active' : ''}`}
                onClick={() => handleNavClick('payments')}
              >
                Payments
              </button>
            </>
          )}
        </nav>

        {/* Right Actions */}
        <div className="header-actions">
          {/* Auth State */}
          {isLoggedIn ? (
            <div className="user-profile-menu">
              <div className="user-pill" onClick={() => handleNavClick('profile')} title="My Account">
                <div className="avatar-circle">
                  {(userName || 'U').charAt(0).toUpperCase()}
                </div>
                <span className="user-name-text">{userName || 'Account'}</span>
              </div>
              <button className="logout-icon-btn" onClick={onLogout} title="Logout">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="auth-buttons-group">
              <button
                className="btn-login-outline"
                onClick={() => onOpenAuth('login')}
              >
                <LogIn size={16} />
                <span>Login</span>
              </button>
              <button
                className="btn-signup-primary"
                onClick={() => onOpenAuth('signup')}
              >
                <UserPlus size={16} />
                <span>Sign Up</span>
              </button>
            </div>
          )}

          {/* Mobile Hamburger Button */}
          <button
            className="mobile-menu-trigger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer animate-fade-in">
          <button
            className={`mobile-nav-item ${currentTab === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            <Home size={18} />
            <span>Home</span>
          </button>
          
          <button
            className={`mobile-nav-item ${currentTab === 'buy' ? 'active' : ''}`}
            onClick={() => handleNavClick('buy')}
          >
            <ShoppingCart size={18} />
            <span>Buy Number</span>
          </button>

          <button
            className={`mobile-nav-item ${currentTab === 'features' ? 'active' : ''}`}
            onClick={() => handleNavClick('features')}
          >
            <Sparkles size={18} />
            <span>Features</span>
          </button>

          {/* ONLY show dashboard links if logged in */}
          {isLoggedIn ? (
            <>
              <button
                className={`mobile-nav-item ${currentTab === 'my-numbers' ? 'active' : ''}`}
                onClick={() => handleNavClick('my-numbers')}
              >
                <Smartphone size={18} />
                <span>My Numbers</span>
              </button>
              <button
                className={`mobile-nav-item ${currentTab === 'payments' ? 'active' : ''}`}
                onClick={() => handleNavClick('payments')}
              >
                <CreditCard size={18} />
                <span>Payments</span>
              </button>
              <button
                className={`mobile-nav-item ${currentTab === 'profile' ? 'active' : ''}`}
                onClick={() => handleNavClick('profile')}
              >
                <User size={18} />
                <span>Profile ({userName})</span>
              </button>
              <button
                className="mobile-nav-item text-red-500"
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid #f1f5f9', marginTop: '6px' }}>
              <button
                className="btn-login-outline"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('login');
                }}
              >
                <LogIn size={16} />
                <span>Login</span>
              </button>
              <button
                className="btn-signup-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('signup');
                }}
              >
                <UserPlus size={16} />
                <span>Sign Up</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
