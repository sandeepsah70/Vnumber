import React from 'react';
import {
  Smartphone,
  CreditCard,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  CheckCircle2,
  KeyRound,
  ExternalLink
} from 'lucide-react';

interface ProfileViewProps {
  userName: string;
  userEmail: string;
  onNavigateTab: (tab: string) => void;
  onLogout: () => void;
  activeNumbersCount?: number;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userName,
  userEmail,
  onNavigateTab,
  onLogout,
  activeNumbersCount = 0,
}) => {
  const displayName = userName || (userEmail ? userEmail.split('@')[0] : 'User');

  return (
    <div className="profile-view-container animate-fade-in">
      <div className="profile-card-main">
        {/* User Info Header */}
        <div className="profile-header-strip">
          <div className="profile-big-avatar">
            <span style={{ fontSize: '28px', fontWeight: 700 }}>
              {displayName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="profile-user-meta">
            <h2 className="profile-name">{displayName}</h2>
            <p className="profile-email">{userEmail || 'Active User'}</p>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '6px' }}>
              <span className="profile-badge-tier" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={12} /> Verified Account
              </span>
              <span style={{ fontSize: '11px', color: '#64748b', background: '#f1f5f9', padding: '3px 8px', borderRadius: '6px' }}>
                ID: {userEmail ? userEmail.slice(0, 4) + '***' : 'USR-1029'}
              </span>
            </div>
          </div>
        </div>

        {/* User Stats Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '12px',
          padding: '16px 20px',
          background: '#f8fafc',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <div
            onClick={() => onNavigateTab('my-numbers')}
            style={{
              background: '#ffffff',
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>Active Numbers</span>
            <span style={{ fontSize: '20px', fontWeight: 700, color: '#1b64f2' }}>{activeNumbersCount}</span>
          </div>

          <div
            onClick={() => onNavigateTab('payments')}
            style={{
              background: '#ffffff',
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>Billing & Orders</span>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', marginTop: '4px', display: 'block' }}>View History</span>
          </div>

          <div style={{
            background: '#ffffff',
            padding: '12px',
            borderRadius: '10px',
            border: '1px solid #e2e8f0'
          }}>
            <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>Security</span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              <Shield size={14} /> 256-Bit SSL
            </span>
          </div>
        </div>

        {/* Profile Navigation Links */}
        <div className="profile-menu-stack">
          <button className="profile-menu-row" onClick={() => onNavigateTab('my-numbers')}>
            <div className="menu-icon-box">
              <Smartphone size={20} className="text-primary" />
            </div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div className="menu-row-label">My Virtual Numbers</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Check active numbers and live incoming SMS OTPs</div>
            </div>
            <ChevronRight size={18} className="text-slate-400" />
          </button>

          <button className="profile-menu-row" onClick={() => onNavigateTab('payments')}>
            <div className="menu-icon-box">
              <CreditCard size={20} className="text-slate-600" />
            </div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div className="menu-row-label">Payment & Invoices</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Review transaction history and payment receipts</div>
            </div>
            <ChevronRight size={18} className="text-slate-400" />
          </button>

          <button className="profile-menu-row" onClick={() => onNavigateTab('buy')}>
            <div className="menu-icon-box">
              <ExternalLink size={20} className="text-slate-600" />
            </div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div className="menu-row-label">Buy New Virtual Number</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Choose Indian (+91) or US (+1) numbers</div>
            </div>
            <ChevronRight size={18} className="text-slate-400" />
          </button>

          <button className="profile-menu-row" onClick={() => alert('Password & security preferences can be managed via your registered email address.')}>
            <div className="menu-icon-box">
              <KeyRound size={20} className="text-slate-600" />
            </div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div className="menu-row-label">Security & Password</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Update password and session preferences</div>
            </div>
            <ChevronRight size={18} className="text-slate-400" />
          </button>

          <button className="profile-menu-row" onClick={() => alert('Support Desk: Contact us 24/7 at support@vnumber.com for instant assistance.')}>
            <div className="menu-icon-box">
              <HelpCircle size={20} className="text-slate-600" />
            </div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div className="menu-row-label">Help & 24/7 Support</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Instant resolution for OTP & number activation</div>
            </div>
            <ChevronRight size={18} className="text-slate-400" />
          </button>

          {/* Logout Action */}
          <button className="profile-menu-row logout-row" onClick={onLogout}>
            <div className="menu-icon-box text-red-500">
              <LogOut size={20} />
            </div>
            <span className="menu-row-label text-red-500 font-semibold">Logout Account</span>
            <ChevronRight size={18} className="text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
