import React, { useState } from 'react';
import { Smartphone, Clock, Copy, MessageSquare, Check } from 'lucide-react';
import { getStoredMessages, addIncomingOTP } from '../lib/supabase';
import type { UserNumber, OTPMessage } from '../lib/supabase';

interface MyNumbersViewProps {
  userNumbers: UserNumber[];
  onNavigateToBuy: () => void;
}

export const MyNumbersView: React.FC<MyNumbersViewProps> = ({
  userNumbers,
  onNavigateToBuy,
}) => {
  const [activeTab, setActiveTab] = useState<'active' | 'expired'>('active');
  const [selectedNumber, setSelectedNumber] = useState<UserNumber | null>(
    userNumbers.length > 0 ? userNumbers[0] : null
  );
  const [copiedOtpId, setCopiedOtpId] = useState<string | null>(null);
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [messages, setMessages] = useState<OTPMessage[]>(() => {
    return selectedNumber ? getStoredMessages(selectedNumber.phone_number) : getStoredMessages();
  });
  const [isSimulating, setIsSimulating] = useState(false);

  const activeNumbers = userNumbers.filter((n) => n.status === 'Active');
  const expiredNumbers = userNumbers.filter((n) => n.status === 'Expired');

  const displayedList = activeTab === 'active' ? activeNumbers : expiredNumbers;

  const handleSelectNumber = (num: UserNumber) => {
    setSelectedNumber(num);
    setMessages(getStoredMessages(num.phone_number));
  };

  const handleSimulateOTP = (senderName: string) => {
    if (!selectedNumber) return;
    setIsSimulating(true);
    setTimeout(() => {
      const newMsg = addIncomingOTP(selectedNumber.phone_number, senderName);
      setMessages([newMsg, ...messages]);
      setIsSimulating(false);
    }, 700);
  };

  const copyToClipboard = (text: string, id?: string) => {
    navigator.clipboard.writeText(text);
    if (id) {
      setCopiedOtpId(id);
      setTimeout(() => setCopiedOtpId(null), 2000);
    } else {
      setCopiedNumber(true);
      setTimeout(() => setCopiedNumber(false), 2000);
    }
  };

  return (
    <div className="my-numbers-container animate-fade-in">
      <div className="view-header-title-bar">
        <div>
          <h1 className="main-page-title">My Virtual Numbers</h1>
          <p className="main-page-sub">Manage your active numbers, view live incoming SMS and test OTP codes.</p>
        </div>
        <button className="btn-buy-another" onClick={onNavigateToBuy}>
          + Buy New Number
        </button>
      </div>

      {/* Tabs: Active / Expired */}
      <div className="status-tabs-pill-box">
        <button
          className={`status-tab-btn ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          <span>Active</span>
          <span className="badge-count">{activeNumbers.length}</span>
        </button>
        <button
          className={`status-tab-btn ${activeTab === 'expired' ? 'active' : ''}`}
          onClick={() => setActiveTab('expired')}
        >
          <span>Expired</span>
          <span className="badge-count">{expiredNumbers.length}</span>
        </button>
      </div>

      {displayedList.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-icon-circle">
            <Smartphone size={32} className="text-slate-400" />
          </div>
          <h3>No {activeTab} numbers found</h3>
          <p>You haven't activated any virtual numbers under this category yet.</p>
          <button className="btn-primary-action" onClick={onNavigateToBuy}>
            Browse Available Numbers
          </button>
        </div>
      ) : (
        <div className="my-numbers-split-layout">
          {/* Left Column: Number List Cards */}
          <div className="numbers-list-column">
            {displayedList.map((num) => {
              const isSelected = selectedNumber?.id === num.id;
              return (
                <div
                  key={num.id}
                  className={`user-number-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelectNumber(num)}
                >
                  <div className="user-num-top">
                    <span className="user-num-flag">{num.flag}</span>
                    <div className="user-num-details">
                      <span className="user-phone-digits">{num.phone_number}</span>
                      <span className="user-country-name">{num.country}</span>
                    </div>
                    <span className={`status-badge-tag ${num.status.toLowerCase()}`}>
                      {num.status}
                    </span>
                  </div>

                  <div className="user-num-bottom">
                    <div className="expiry-indicator">
                      <Clock size={14} className="text-slate-400" />
                      <span>Expires in {num.expires_in_days || 30} Days</span>
                    </div>
                    <button
                      className="btn-copy-mini"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(num.phone_number);
                      }}
                      title="Copy phone number"
                    >
                      {copiedNumber ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Live OTP & SMS Inbox for Selected Number */}
          {selectedNumber && (
            <div className="otp-inbox-column">
              <div className="inbox-header-card">
                <div className="inbox-title-meta">
                  <div className="active-dot-ping"></div>
                  <div>
                    <h3 className="inbox-active-number">{selectedNumber.phone_number}</h3>
                    <span className="inbox-live-label">Live SMS & OTP Receiver</span>
                  </div>
                </div>

                <div className="simulation-actions-bar">
                  <span className="test-prompt">Send Test OTP:</span>
                  <button
                    className="btn-test-otp"
                    disabled={isSimulating}
                    onClick={() => handleSimulateOTP('Google')}
                  >
                    Google
                  </button>
                  <button
                    className="btn-test-otp"
                    disabled={isSimulating}
                    onClick={() => handleSimulateOTP('WhatsApp')}
                  >
                    WhatsApp
                  </button>
                  <button
                    className="btn-test-otp"
                    disabled={isSimulating}
                    onClick={() => handleSimulateOTP('Telegram')}
                  >
                    Telegram
                  </button>
                  <button
                    className="btn-test-otp"
                    disabled={isSimulating}
                    onClick={() => handleSimulateOTP('Bank OTP')}
                  >
                    Bank
                  </button>
                </div>
              </div>

              {/* Messages Feed */}
              <div className="messages-stream-list">
                {messages.length === 0 ? (
                  <div className="empty-messages-box">
                    <MessageSquare size={32} className="text-slate-300" />
                    <p>No messages received yet for this number.</p>
                    <span className="empty-tip">Click any 'Send Test OTP' button above to simulate incoming verification codes.</span>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div key={msg.id} className="otp-message-card animate-fade-in">
                      <div className="msg-top-row">
                        <div className="msg-sender-group">
                          <span className="sender-avatar">{msg.sender.charAt(0)}</span>
                          <span className="sender-name">{msg.sender}</span>
                        </div>
                        <span className="msg-timestamp">{msg.received_at}</span>
                      </div>

                      <p className="msg-text-content">{msg.message}</p>

                      {msg.otp_code && (
                        <div className="otp-highlight-row">
                          <div className="otp-code-box">
                            <span className="otp-title">Code:</span>
                            <span className="otp-digits">{msg.otp_code}</span>
                          </div>
                          <button
                            className="btn-copy-code"
                            onClick={() => copyToClipboard(msg.otp_code, msg.id)}
                          >
                            {copiedOtpId === msg.id ? (
                              <span className="copied-tag">
                                <Check size={14} /> Copied!
                              </span>
                            ) : (
                              <span>
                                <Copy size={14} /> Copy OTP
                              </span>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
