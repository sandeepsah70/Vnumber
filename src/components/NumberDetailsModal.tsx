import React from 'react';
import { X, ShieldCheck, ArrowLeft, Clock, PhoneCall, MessageSquare, KeyRound } from 'lucide-react';
import type { VirtualNumber } from '../lib/supabase';

interface NumberDetailsModalProps {
  number: VirtualNumber | null;
  isOpen: boolean;
  onClose: () => void;
  onProceedToPayment: (number: VirtualNumber) => void;
}

export const NumberDetailsModal: React.FC<NumberDetailsModalProps> = ({
  number,
  isOpen,
  onClose,
  onProceedToPayment,
}) => {
  if (!isOpen || !number) return null;

  const featureItems = [
    { label: 'Receive Calls', icon: PhoneCall, desc: 'Crystal clear voice call forwarding' },
    { label: 'Receive SMS', icon: MessageSquare, desc: 'Instant 2-way text reception' },
    { label: 'Receive OTP', icon: KeyRound, desc: 'Optimized for instant app verification codes' },
    { label: 'Valid for 30 Days', icon: Clock, desc: '30-day billing cycle with easy renewal' },
  ];

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="modal-card-dialog number-details-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header-bar">
          <button className="btn-back-icon" onClick={onClose}>
            <ArrowLeft size={20} />
          </button>
          <h2 className="modal-title-text">Number Details</h2>
          <button className="btn-close-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body-content">
          {/* Main Selected Number Card */}
          <div className="selected-number-hero-card">
            <div className="number-id-pill">
              <span className="flag-circle">{number.flag}</span>
              <div>
                <h3 className="hero-phone-digits">{number.phone_number}</h3>
                <span className="country-sublabel">{number.country}</span>
              </div>
            </div>
            <div className="number-price-tag">
              <span className="price-currency">{number.currency}</span>
              <span className="price-val">{number.price}</span>
            </div>
          </div>

          {/* Features Checklist */}
          <div className="features-checklist-block">
            <h4 className="checklist-heading">Included Features</h4>
            <div className="checklist-items-stack">
              {featureItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="feature-check-row">
                    <div className="check-icon-bubble">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <div className="feature-row-text">
                      <span className="feature-name">{item.label}</span>
                      <span className="feature-desc">{item.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="security-notice-box">
            <ShieldCheck size={18} className="text-primary" />
            <span>Private & confidential. No KYC needed for temporary OTP numbers.</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="modal-footer-bar">
          <button
            className="btn-modal-action-primary"
            onClick={() => onProceedToPayment(number)}
          >
            <span>Proceed to Payment</span>
          </button>
        </div>
      </div>
    </div>
  );
};
