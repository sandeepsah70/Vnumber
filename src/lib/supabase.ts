import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gvrumecnpzltviwavfmp.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2cnVtZWNucHpsdHZpd2F2Zm1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI2Nzc2MDgsImV4cCI6MjEwODI1MzYwOH0.4A5ZJ9ArruwWAkXxTXIqknsbiQkbkRikiAlaRvAmzyY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface VirtualNumber {
  id: string;
  phone_number: string;
  country: 'India' | 'United States';
  country_code: 'IN' | 'US';
  flag: string;
  price: number;
  currency: '₹' | '$';
  status: 'available' | 'allocated';
  features: string[];
}

export interface UserNumber {
  id: string;
  user_id: string;
  phone_number: string;
  country: string;
  flag: string;
  status: 'Active' | 'Expired';
  purchased_at: string;
  expires_at: string;
  expires_in_days: number;
  auto_renew?: boolean;
}

export interface PaymentTransaction {
  id: string;
  user_id: string;
  phone_number: string;
  amount: number;
  currency: string;
  payment_method: string;
  status: 'Success' | 'Pending' | 'Failed';
  transaction_ref: string;
  created_at: string;
}

export interface OTPMessage {
  id: string;
  phone_number: string;
  sender: string;
  otp_code: string;
  message: string;
  received_at: string;
}

// Initial catalog matching the user's design image perfectly
export const INITIAL_NUMBERS: VirtualNumber[] = [
  // Indian Numbers (₹150)
  { id: 'in-1', phone_number: '+91 98765 43210', country: 'India', country_code: 'IN', flag: '🇮🇳', price: 150, currency: '₹', status: 'available', features: ['Receive Calls', 'Receive SMS', 'Receive OTP', 'Valid for 30 Days'] },
  { id: 'in-2', phone_number: '+91 87654 32109', country: 'India', country_code: 'IN', flag: '🇮🇳', price: 150, currency: '₹', status: 'available', features: ['Receive Calls', 'Receive SMS', 'Receive OTP', 'Valid for 30 Days'] },
  { id: 'in-3', phone_number: '+91 76543 21098', country: 'India', country_code: 'IN', flag: '🇮🇳', price: 150, currency: '₹', status: 'available', features: ['Receive Calls', 'Receive SMS', 'Receive OTP', 'Valid for 30 Days'] },
  { id: 'in-4', phone_number: '+91 65432 10987', country: 'India', country_code: 'IN', flag: '🇮🇳', price: 150, currency: '₹', status: 'available', features: ['Receive Calls', 'Receive SMS', 'Receive OTP', 'Valid for 30 Days'] },
  { id: 'in-5', phone_number: '+91 54321 09876', country: 'India', country_code: 'IN', flag: '🇮🇳', price: 150, currency: '₹', status: 'available', features: ['Receive Calls', 'Receive SMS', 'Receive OTP', 'Valid for 30 Days'] },
  { id: 'in-6', phone_number: '+91 43210 98765', country: 'India', country_code: 'IN', flag: '🇮🇳', price: 150, currency: '₹', status: 'available', features: ['Receive Calls', 'Receive SMS', 'Receive OTP', 'Valid for 30 Days'] },
  { id: 'in-7', phone_number: '+91 32109 87654', country: 'India', country_code: 'IN', flag: '🇮🇳', price: 150, currency: '₹', status: 'available', features: ['Receive Calls', 'Receive SMS', 'Receive OTP', 'Valid for 30 Days'] },
  { id: 'in-8', phone_number: '+91 66421 09876', country: 'India', country_code: 'IN', flag: '🇮🇳', price: 150, currency: '₹', status: 'available', features: ['Receive Calls', 'Receive SMS', 'Receive OTP', 'Valid for 30 Days'] },

  // US Numbers (₹250)
  { id: 'us-1', phone_number: '+1 201 555 0123', country: 'United States', country_code: 'US', flag: '🇺🇸', price: 250, currency: '₹', status: 'available', features: ['Receive Calls', 'Receive SMS', 'Receive OTP', 'Valid for 30 Days'] },
  { id: 'us-2', phone_number: '+1 305 555 0187', country: 'United States', country_code: 'US', flag: '🇺🇸', price: 250, currency: '₹', status: 'available', features: ['Receive Calls', 'Receive SMS', 'Receive OTP', 'Valid for 30 Days'] },
  { id: 'us-3', phone_number: '+1 415 555 0199', country: 'United States', country_code: 'US', flag: '🇺🇸', price: 250, currency: '₹', status: 'available', features: ['Receive Calls', 'Receive SMS', 'Receive OTP', 'Valid for 30 Days'] },
  { id: 'us-4', phone_number: '+1 702 555 0168', country: 'United States', country_code: 'US', flag: '🇺🇸', price: 250, currency: '₹', status: 'available', features: ['Receive Calls', 'Receive SMS', 'Receive OTP', 'Valid for 30 Days'] },
  { id: 'us-5', phone_number: '+1 310 555 0134', country: 'United States', country_code: 'US', flag: '🇺🇸', price: 250, currency: '₹', status: 'available', features: ['Receive Calls', 'Receive SMS', 'Receive OTP', 'Valid for 30 Days'] },
  { id: 'us-6', phone_number: '+1 646 555 0172', country: 'United States', country_code: 'US', flag: '🇺🇸', price: 250, currency: '₹', status: 'available', features: ['Receive Calls', 'Receive SMS', 'Receive OTP', 'Valid for 30 Days'] },
  { id: 'us-7', phone_number: '+1 773 555 0156', country: 'United States', country_code: 'US', flag: '🇺🇸', price: 250, currency: '₹', status: 'available', features: ['Receive Calls', 'Receive SMS', 'Receive OTP', 'Valid for 30 Days'] },
];

const LOCAL_STORAGE_KEY_USER_NUMBERS = 'vnumber_user_numbers_v1';
const LOCAL_STORAGE_KEY_TRANSACTIONS = 'vnumber_transactions_v1';
const LOCAL_STORAGE_KEY_MESSAGES = 'vnumber_messages_v1';

// Seed demo purchased number if none exist (matching image: +91 98765 43210 Active Expires in 29 Days)
export function getStoredUserNumbers(): UserNumber[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_USER_NUMBERS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  const defaultNumbers: UserNumber[] = [
    {
      id: 'demo-num-1',
      user_id: 'john-doe',
      phone_number: '+91 98765 43210',
      country: 'Indian Number',
      flag: '🇮🇳',
      status: 'Active',
      purchased_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      expires_at: new Date(Date.now() + 29 * 24 * 60 * 60 * 1000).toISOString(),
      expires_in_days: 29,
    }
  ];
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_USER_NUMBERS, JSON.stringify(defaultNumbers));
  } catch (e) {
    console.error(e);
  }
  return defaultNumbers;
}

export function saveUserNumber(num: UserNumber) {
  const existing = getStoredUserNumbers();
  const updated = [num, ...existing.filter(n => n.phone_number !== num.phone_number)];
  localStorage.setItem(LOCAL_STORAGE_KEY_USER_NUMBERS, JSON.stringify(updated));
  return updated;
}

export function getStoredTransactions(): PaymentTransaction[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_TRANSACTIONS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  const defaultTx: PaymentTransaction[] = [
    {
      id: 'tx_01',
      user_id: 'john-doe',
      phone_number: '+91 98765 43210',
      amount: 150,
      currency: '₹',
      payment_method: 'UPI (GPay)',
      status: 'Success',
      transaction_ref: 'UPI-' + Math.floor(100000 + Math.random() * 900000),
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    }
  ];
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_TRANSACTIONS, JSON.stringify(defaultTx));
  } catch (e) {
    console.error(e);
  }
  return defaultTx;
}

export function saveTransaction(tx: PaymentTransaction) {
  const existing = getStoredTransactions();
  const updated = [tx, ...existing];
  localStorage.setItem(LOCAL_STORAGE_KEY_TRANSACTIONS, JSON.stringify(updated));
  return updated;
}

export function getStoredMessages(phoneNumber?: string): OTPMessage[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_MESSAGES);
    let msgs: OTPMessage[] = raw ? JSON.parse(raw) : [];
    if (!raw || msgs.length === 0) {
      msgs = [
        {
          id: 'otp-1',
          phone_number: '+91 98765 43210',
          sender: 'Google',
          otp_code: '849203',
          message: 'G-849203 is your Google verification code. Do not share it with anyone.',
          received_at: '2 mins ago',
        },
        {
          id: 'otp-2',
          phone_number: '+91 98765 43210',
          sender: 'WhatsApp',
          otp_code: '123456',
          message: 'Your WhatsApp code: 123-456. You can also tap on this link to verify your phone.',
          received_at: '10 mins ago',
        },
        {
          id: 'otp-3',
          phone_number: '+1 201 555 0123',
          sender: 'Telegram',
          otp_code: '58291',
          message: 'Telegram code: 58291. You may use this to sign in.',
          received_at: '1 hour ago',
        }
      ];
      localStorage.setItem(LOCAL_STORAGE_KEY_MESSAGES, JSON.stringify(msgs));
    }
    if (phoneNumber) {
      return msgs.filter(m => m.phone_number.replace(/\s+/g, '') === phoneNumber.replace(/\s+/g, ''));
    }
    return msgs;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export function addIncomingOTP(phoneNumber: string, sender: string = 'Verification OTP'): OTPMessage {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const newMsg: OTPMessage = {
    id: 'msg-' + Date.now(),
    phone_number: phoneNumber,
    sender,
    otp_code: code,
    message: `${sender} verification code is: ${code}. Valid for 10 minutes.`,
    received_at: 'Just now',
  };
  const existing = getStoredMessages();
  const updated = [newMsg, ...existing];
  localStorage.setItem(LOCAL_STORAGE_KEY_MESSAGES, JSON.stringify(updated));
  return newMsg;
}
