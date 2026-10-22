import React, { useState } from 'react';
import { X, ArrowLeft, CreditCard, Smartphone, Building2, Wallet, Lock } from 'lucide-react';
import type { VirtualNumber } from '../lib/supabase';

interface PaymentModalProps {
  number: VirtualNumber | null;
  isOpen: boolean;
  onClose: () => void;
  onBackToDetails: () => void;
  onPaymentSuccess: (paymentDetails: {
    number: VirtualNumber;
    method: string;
    amount: number;
  }) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  number,
  isOpen,
  onClose,
  onBackToDetails,
  onPaymentSuccess,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'netbanking' | 'wallet'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [upiId, setUpiId] = useState('user@okaxis');

  if (!isOpen || !number) return null;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess({
        number,
        method: selectedMethod.toUpperCase(),
        amount: number.price,
      });
    }, 1200);
  };

  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI',
      sub: '(Google Pay / PhonePe / Paytm / BHIM)',
      icon: Smartphone,
    },
    {
      id: 'card',
      name: 'Credit / Debit Card',
      sub: '(Visa, MasterCard, RuPay, Amex)',
      icon: CreditCard,
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      sub: '(All Indian Banks / International SWIFT)',
      icon: Building2,
    },
    {
      id: 'wallet',
      name: 'Wallet',
      sub: '(Paytm / Mobikwik / Amazon Pay)',
      icon: Wallet,
    },
  ];

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div className="modal-card-dialog payment-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header-bar">
          <button className="btn-back-icon" onClick={onBackToDetails}>
            <ArrowLeft size={20} />
          </button>
          <h2 className="modal-title-text">Payment</h2>
          <button className="btn-close-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body-content">
          {/* Selected Number Summary */}
          <div className="payment-summary-strip">
            <div className="strip-left">
              <span className="strip-flag">{number.flag}</span>
              <div>
                <span className="strip-number">{number.phone_number}</span>
                <span className="strip-sub">{number.country}</span>
              </div>
            </div>
            <div className="strip-right-price">
              <span>{number.currency}{number.price}</span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="payment-methods-section">
            <h4 className="payment-section-title">Choose Payment Method</h4>
            <div className="methods-list-group">
              {paymentMethods.map((m) => {
                const Icon = m.icon;
                const isSelected = selectedMethod === m.id;
                return (
                  <div
                    key={m.id}
                    className={`payment-method-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedMethod(m.id as any)}
                  >
                    <div className="radio-circle">
                      {isSelected && <div className="radio-dot" />}
                    </div>
                    <div className="method-icon-box">
                      <Icon size={20} className={isSelected ? 'text-primary' : 'text-slate-500'} />
                    </div>
                    <div className="method-labels">
                      <span className="method-name">{m.name}</span>
                      <span className="method-sub">{m.sub}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* UPI ID input simulation */}
          {selectedMethod === 'upi' && (
            <div className="upi-input-container animate-fade-in">
              <label>Enter Virtual Payment Address (VPA / UPI ID)</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="username@okhdfcbank"
                className="upi-input-field"
              />
            </div>
          )}

          {/* Card input simulation */}
          {selectedMethod === 'card' && (
            <div className="card-input-container animate-fade-in">
              <input type="text" placeholder="Card Number (4000 1234 5678 9010)" className="upi-input-field" defaultValue="4242 •••• •••• 4242" />
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <input type="text" placeholder="MM/YY" className="upi-input-field" defaultValue="12/28" />
                <input type="password" placeholder="CVV" className="upi-input-field" defaultValue="123" />
              </div>
            </div>
          )}

          {/* Security Notice */}
          <div className="payment-security-footer-note">
            <Lock size={15} className="text-slate-400" />
            <span>Your payment is 256-bit secure and encrypted</span>
          </div>
        </div>

        {/* Footer Pay Button */}
        <div className="modal-footer-bar">
          <button
            className="btn-modal-action-primary pay-now-btn"
            onClick={handlePay}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <span className="spinner-row">
                <span className="btn-spinner"></span>
                <span>Processing Payment...</span>
              </span>
            ) : (
              <span>Pay Now ({number.currency}{number.price})</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
