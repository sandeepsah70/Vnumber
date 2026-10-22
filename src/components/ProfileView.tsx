import React, { useState, useEffect } from 'react';
import {
  User,
  Smartphone,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Database,
  RefreshCw,
  ShieldCheck
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ProfileViewProps {
  userName: string;
  userEmail: string;
  onNavigateTab: (tab: string) => void;
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userName,
  userEmail,
  onNavigateTab,
  onLogout,
}) => {
  const [supabaseUsers, setSupabaseUsers] = useState<any[]>([]);
  const [loginHistory, setLoginHistory] = useState<any[]>([]);
  const [isLoadingDb, setIsLoadingDb] = useState(false);

  const fetchDatabaseRecords = async () => {
    setIsLoadingDb(true);
    try {
      // 1. Fetch profiles table from Supabase
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (profilesData) {
        setSupabaseUsers(profilesData);
      }

      // 2. Fetch login_history table from Supabase
      const { data: logsData } = await supabase
        .from('login_history')
        .select('*')
        .order('login_time', { ascending: false })
        .limit(10);

      if (logsData) {
        setLoginHistory(logsData);
      }
    } catch (e) {
      console.error('Error fetching Supabase users:', e);
    } finally {
      setIsLoadingDb(false);
    }
  };

  useEffect(() => {
    fetchDatabaseRecords();
  }, []);

  const profileLinks = [
    { label: 'My Numbers', icon: Smartphone, action: () => onNavigateTab('my-numbers') },
    { label: 'Payment History', icon: CreditCard, action: () => onNavigateTab('payments') },
    { label: 'Settings', icon: Settings, action: () => alert('Settings: Account preferences and notification settings.') },
    { label: 'Help & Support', icon: HelpCircle, action: () => alert('Support: 24/7 Priority Desk - support@vnumber.com') },
  ];

  return (
    <div className="profile-view-container animate-fade-in">
      <div className="profile-card-main">
        {/* User Info Header */}
        <div className="profile-header-strip">
          <div className="profile-big-avatar">
            <User size={38} className="text-white" />
          </div>
          <div className="profile-user-meta">
            <h2 className="profile-name">{userName}</h2>
            <p className="profile-email">{userEmail}</p>
            <span className="profile-badge-tier">Verified Account</span>
          </div>
        </div>

        {/* Links Menu matching the design image */}
        <div className="profile-menu-stack">
          {profileLinks.map((link, idx) => {
            const Icon = link.icon;
            return (
              <button key={idx} className="profile-menu-row" onClick={link.action}>
                <div className="menu-icon-box">
                  <Icon size={20} className="text-slate-600" />
                </div>
                <span className="menu-row-label">{link.label}</span>
                <ChevronRight size={18} className="text-slate-400" />
              </button>
            );
          })}

          {/* Logout Action */}
          <button className="profile-menu-row logout-row" onClick={onLogout}>
            <div className="menu-icon-box text-red-500">
              <LogOut size={20} />
            </div>
            <span className="menu-row-label text-red-500 font-semibold">Logout</span>
            <ChevronRight size={18} className="text-red-400" />
          </button>
        </div>
      </div>

      {/* Supabase Integration Status Card */}
      <div className="supabase-status-widget">
        <div className="db-icon-box">
          <Database size={24} className="text-emerald-500" />
        </div>
        <div style={{ flex: 1 }}>
          <h4>Supabase Project: Vnumber</h4>
          <p>Connected with ID: <code>gvrumecnpzltviwavfmp</code> (Region: ap-southeast-1)</p>
          <span className="status-live-pill">● Database Connected & Ready</span>
        </div>
        <button
          onClick={fetchDatabaseRecords}
          disabled={isLoadingDb}
          style={{
            padding: '6px 12px',
            background: '#f1f5f9',
            border: '1px solid #cbd5e1',
            borderRadius: '6px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer'
          }}
          title="Refresh Supabase data"
        >
          <RefreshCw size={13} className={isLoadingDb ? 'btn-spinner' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Live Supabase Login & Signup Data Table */}
      <div style={{
        background: '#ffffff',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Supabase: Registered Users & Signups</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Live data from <code>public.profiles</code> table in project <b>Vnumber</b>
            </p>
          </div>
          <span style={{ fontSize: '11px', background: '#ecfdf5', color: '#059669', padding: '3px 8px', borderRadius: '999px', fontWeight: 700 }}>
            {supabaseUsers.length} Users Found
          </span>
        </div>

        {supabaseUsers.length === 0 ? (
          <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px', background: '#f8fafc', borderRadius: '10px' }}>
            <p>No registered users in <code>profiles</code> table yet.</p>
            <p style={{ fontSize: '12px', marginTop: '4px', color: 'var(--text-light)' }}>
              Click <b>Logout</b> and test <b>Sign Up</b> or <b>Login</b> to see your data populate here live!
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--text-muted)' }}>Name</th>
                  <th style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--text-muted)' }}>Email</th>
                  <th style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--text-muted)' }}>Phone</th>
                  <th style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--text-muted)' }}>Registered At</th>
                </tr>
              </thead>
              <tbody>
                {supabaseUsers.map((u) => (
                  <tr key={u.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 600 }}>{u.full_name || '—'}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--primary)' }}>{u.email}</td>
                    <td style={{ padding: '10px 12px' }}>{u.phone_number || '—'}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-muted)', fontSize: '12px' }}>
                      {new Date(u.created_at || u.last_login).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Login Activity Logs */}
        {loginHistory.length > 0 && (
          <div style={{ marginTop: '20px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px' }}>
              Recent Login Activity (<code>login_history</code>)
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {loginHistory.slice(0, 5).map((log) => (
                <div key={log.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={14} className="text-primary" />
                    <span style={{ fontWeight: 600 }}>{log.user_email}</span>
                    <span style={{ color: 'var(--text-muted)' }}>via {log.auth_provider}</span>
                  </div>
                  <span style={{ color: 'var(--text-light)' }}>
                    {new Date(log.login_time).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
