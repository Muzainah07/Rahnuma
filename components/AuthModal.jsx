'use client';

import React, { useState } from 'react';
import { User, Lock, Mail, MapPin, X, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AuthModal({ isOpen, onClose, onLogin }) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('Karachi');
  
  const [step, setStep] = useState('form'); // 'form' or 'otp'
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successNotice, setSuccessNotice] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      if (supabase) {
        if (isSignUp) {
          const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: name, city } }
          });
          if (error) throw error;
        } else {
          const { error } = await supabase.auth.signInWithPassword({
            email,
            password
          });
          if (error) throw error;
        }
      }

      // Generate 6-digit confirmation code and dispatch via backend email service
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(code);

      const res = await fetch('/api/auth/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to dispatch verification email');
      }

      setLoading(false);
      setSuccessNotice(`A formal verification email with your 6-digit code has been dispatched to ${email}.`);
      setStep('otp');
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'Authentication error occurred.');
      setLoading(false);
    }
  };

  const verifyOtpAndLogin = (e) => {
    e.preventDefault();
    if (enteredOtp.trim() !== generatedOtp.trim()) {
      setErrorMessage('Invalid confirmation code. Please check your email and try again.');
      return;
    }

    const userObj = {
      name: name || email.split('@')[0] || 'Ayesha Siddiqui',
      email,
      city: city || 'Karachi',
      joinedDate: new Date().toLocaleDateString()
    };
    onLogin(userObj);
    setStep('form');
    setEnteredOtp('');
    setSuccessNotice('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-y-auto max-h-[85vh] p-6 relative my-8">
        <button
          onClick={() => { setStep('form'); setSuccessNotice(''); onClose(); }}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#5c1d2d]/10 text-[#5c1d2d] flex items-center justify-center mx-auto mb-3 font-bold text-xl shadow-xs">
            {step === 'otp' ? <ShieldCheck className="w-6 h-6" /> : 'ر'}
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">
            {step === 'otp' ? 'Check Your Email Inbox' : isSignUp ? 'Join Rahnuma Pakistan' : 'Welcome Back'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {step === 'otp'
              ? successNotice
              : 'Secure authentication with formal email verification.'}
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
            {errorMessage}
          </div>
        )}

        {step === 'otp' ? (
          <form onSubmit={verifyOtpAndLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Enter 6-Digit Email Verification Code</label>
              <input
                type="text"
                maxLength={6}
                required
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
                placeholder="123456"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-center tracking-widest text-lg font-bold focus:ring-2 focus:ring-[#5c1d2d] focus:outline-none"
              />
              <p className="text-[11px] text-slate-500 mt-2 text-center font-medium">
                Please check your email client (Gmail or Outlook) for your 6-digit confirmation code.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#5c1d2d] hover:bg-[#4a1525] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Verify & Complete Sign In</span>
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#5c1d2d] focus:outline-none"
                    placeholder="Ayesha Siddiqui"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#5c1d2d] focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#5c1d2d] focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {isSignUp && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">City in Pakistan</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#5c1d2d] focus:outline-none bg-white"
                  >
                    <option value="Karachi">Karachi</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Quetta">Quetta</option>
                    <option value="Multan">Multan</option>
                    <option value="Remote">Remote / Work from Home</option>
                  </select>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#5c1d2d] hover:bg-[#4a1525] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 mt-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending Formal Email...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isSignUp ? 'Sign Up & Send Email Code' : 'Sign In & Send Code'}</span>
                </>
              )}
            </button>
          </form>
        )}

        {step === 'form' && (
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs text-[#5c1d2d] hover:underline font-semibold"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
