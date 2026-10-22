import React from 'react';
import { CreditCard, CheckCircle2, ShieldCheck } from 'lucide-react';
import type { PaymentTransaction } from '../lib/supabase';

interface PaymentsViewProps {
  transactions: PaymentTransaction[];
  onNavigateToBuy: () => void;
}

export const PaymentsView: React.FC<PaymentsViewProps> = ({
  transactions,
  onNavigateToBuy,
}) => {
  return (
    <div className="payments-view-container animate-fade-in">
      <div className="view-header-title-bar">
        <div>
          <h1 className="main-page-title">Payment History</h1>
          <p className="main-page-sub">View all your purchase receipts, invoice references and billing records.</p>
        </div>
        <button className="btn-buy-another" onClick={onNavigateToBuy}>
          New Purchase
        </button>
      </div>

      {transactions.length === 0 ? (
        <div className="empty-state-card">
          <CreditCard size={40} className="text-slate-300" />
          <h3>No payment records yet</h3>
          <p>When you purchase a virtual number, your receipts will appear here.</p>
        </div>
      ) : (
        <div className="transactions-table-card">
          <div className="table-responsive-wrapper">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Virtual Number</th>
                  <th>Method</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td>
                      <span className="tx-ref-code">{tx.transaction_ref}</span>
                    </td>
                    <td>
                      <span className="tx-phone-number font-semibold">{tx.phone_number}</span>
                    </td>
                    <td>
                      <span className="tx-payment-method">{tx.payment_method}</span>
                    </td>
                    <td>
                      <span className="tx-date-text">
                        {new Date(tx.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </td>
                    <td>
                      <span className="tx-amount font-bold">
                        {tx.currency}{tx.amount}
                      </span>
                    </td>
                    <td>
                      <span className="tx-status-badge success">
                        <CheckCircle2 size={13} />
                        <span>{tx.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Security Banner */}
      <div className="payment-guarantee-banner">
        <ShieldCheck size={24} className="text-primary" />
        <div>
          <h4>30-Day Money-Back Guarantee</h4>
          <p>If your assigned virtual number does not receive OTP within 24 hours of purchase, we offer immediate replacement or a full refund.</p>
        </div>
      </div>
    </div>
  );
};
