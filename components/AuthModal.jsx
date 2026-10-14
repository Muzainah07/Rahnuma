'use client';

import React, { useState } from 'react';
import { User, Lock, Mail, MapPin, X, CheckCircle2, Loader2, ShieldCheck, MailCheck, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AuthModal({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [linkSent, setLinkSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSendMagicLink = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    setLoading(true);

    try {
      if (!supabase) {
        throw new Error('Supabase is not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env file.');
      }

      // Send Supabase Magic Link / Email OTP
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) throw error;

      setLoading(false);
      setLinkSent(true);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'Failed to send confirmation link.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-y-auto max-h-[85vh] p-6 relative my-8">
        <button
          onClick={() => { setLinkSent(false); onClose(); }}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#5c1d2d]/10 text-[#5c1d2d] flex items-center justify-center mx-auto mb-3 font-bold text-xl shadow-xs">
            {linkSent ? <MailCheck className="w-6 h-6" /> : 'ر'}
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">
            {linkSent ? 'Check Your Email Inbox' : 'Sign In with Supabase Magic Link'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {linkSent
              ? `We have sent a secure confirmation link to ${email}. Click the link in your email to open and sign in instantly.`
              : 'Enter your email to receive a passwordless sign-in link via Supabase.'}
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
            {errorMessage}
          </div>
        )}

        {linkSent ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <MailCheck className="w-8 h-8" />
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Check your Gmail or Outlook inbox for the email from Supabase. Clicking the link will open your Rahnuma dashboard automatically!
            </p>
            <button
              onClick={() => {
                onLogin({
                  name: email.split('@')[0],
                  email,
                  city: 'Karachi',
                  joinedDate: new Date().toLocaleDateString()
                });
                setLinkSent(false);
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-[#5c1d2d] hover:bg-[#4a1525] text-white font-bold text-sm shadow-md transition-all"
            >
              Simulate Successful Click & Open
            </button>
          </div>
        ) : (
          <form onSubmit={handleSendMagicLink} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#5c1d2d] focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#5c1d2d] hover:bg-[#4a1525] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 mt-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending Magic Link...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#d4a373]" />
                  <span>Send Magic Link to Email</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
