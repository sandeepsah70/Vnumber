import React, { useEffect } from 'react';
import { Check, ArrowRight, Home } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { VirtualNumber } from '../lib/supabase';

interface PaymentSuccessModalProps {
  number: VirtualNumber | null;
  isOpen: boolean;
  onViewMyNumbers: () => void;
  onBackToHome: () => void;
}

export const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  number,
  isOpen,
  onViewMyNumbers,
  onBackToHome,
}) => {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#1b64f2', '#10b981', '#f59e0b', '#6366f1'],
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, [isOpen]);

  if (!isOpen || !number) return null;

  return (
    <div className="modal-backdrop-overlay">
      <div className="modal-card-dialog success-dialog animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="modal-body-content text-center success-body">
          {/* Big Green Success Circle */}
          <div className="success-circle-icon">
            <Check size={44} className="text-white" strokeWidth={3} />
          </div>

          <h2 className="success-title">Payment Successful!</h2>
          <p className="success-subtitle">
            Your virtual number has been activated and is ready to receive OTPs & calls.
          </p>

          {/* Activated Number Badge */}
          <div className="activated-number-pill">
            <span className="pill-flag">{number.flag}</span>
            <div className="pill-info">
              <span className="pill-number">{number.phone_number}</span>
              <span className="pill-type">{number.country}</span>
            </div>
            <span className="active-status-badge">Active</span>
          </div>

          <div className="success-validity-note">
            <span>Validity: 30 Days (Expires in 30 days)</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="modal-footer-bar success-footer">
          <button className="btn-modal-action-primary" onClick={onViewMyNumbers}>
            <span>View My Numbers</span>
            <ArrowRight size={18} />
          </button>
          <button className="btn-modal-action-secondary" onClick={onBackToHome}>
            <Home size={18} />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};
