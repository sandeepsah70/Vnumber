import React from 'react';
import {
  Phone,
  Home,
  ShoppingCart,
  Smartphone,
  CreditCard,
  User,
  HelpCircle,
  LogOut,
  Shield
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onLogout: () => void;
  myNumbersCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  onLogout,
  myNumbersCount
}) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'buy', label: 'Buy Number', icon: ShoppingCart },
    { id: 'my-numbers', label: 'My Numbers', icon: Smartphone, badge: myNumbersCount },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ];

  return (
    <aside className="dashboard-sidebar">
      {/* Brand Header */}
      <div className="sidebar-brand">
        <div className="sidebar-logo-icon">
          <Phone size={22} className="text-white" />
        </div>
        <div className="sidebar-brand-text">
          <h2>Virtual Number</h2>
          <span className="sidebar-tag">Supabase Connected</span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setCurrentTab(item.id)}
            >
              <div className="nav-item-icon-wrapper">
                <Icon size={19} />
              </div>
              <span className="nav-item-label">{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="nav-item-badge">{item.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Promo & Logout */}
      <div className="sidebar-footer">
        <div className="sidebar-security-badge">
          <Shield size={16} className="security-icon" />
          <div>
            <p className="sec-title">100% Encrypted</p>
            <p className="sec-sub">OTP & SMS Privacy</p>
          </div>
        </div>

        <button className="sidebar-logout-btn" onClick={onLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
