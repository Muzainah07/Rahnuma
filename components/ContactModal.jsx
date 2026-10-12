'use client';

import React, { useState } from 'react';
import { Mail, Send, X, CheckCircle2, Loader2, MessageSquare } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Career Guidance Support');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [ticketResult, setTicketResult] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
      });
      const data = await res.json();
      if (data.success) {
        setTicketResult(data.data);
      } else {
        alert(data.error || 'Failed to submit support ticket.');
      }
    } catch (e) {
      console.error(e);
      alert('Network error submitting ticket.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-y-auto max-h-[85vh] p-6 relative my-8">
        <button
          onClick={() => { setTicketResult(null); onClose(); }}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#5c1d2d]/10 text-[#5c1d2d] flex items-center justify-center mx-auto mb-3 font-bold text-xl shadow-xs">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">
            Rahnuma Support & Contact Center
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Have questions about career matching or mentorship? Send us a message and our team will respond within 24 hours.
          </p>
        </div>

        {ticketResult ? (
          <div className="space-y-4 py-4 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="font-bold text-slate-900 text-lg">Support Ticket Created Successfully!</h4>
            <p className="text-xs font-semibold text-[#5c1d2d] bg-[#fcfaf7] py-1.5 px-3 rounded-lg inline-block border border-[#5c1d2d]/20">
              Ticket ID: {ticketResult.ticket_id}
            </p>
            <p className="text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200 text-left leading-relaxed">
              "{ticketResult.acknowledgment_message}"
            </p>
            <button
              onClick={() => { setTicketResult(null); onClose(); }}
              className="w-full py-3 rounded-xl bg-[#5c1d2d] hover:bg-[#4a1525] text-white font-bold text-sm shadow-md transition-all"
            >
              Close & Return
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ayesha Siddiqui"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#5c1d2d] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ayesha@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#5c1d2d] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#5c1d2d] focus:outline-none bg-white"
              >
                <option value="Career Guidance Support">Career Guidance Support</option>
                <option value="Mentorship Booking Inquiry">Mentorship Booking Inquiry</option>
                <option value="Resume ATS Issue">Resume ATS Issue</option>
                <option value="Employer Partnership">Employer Partnership</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Message</label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe how we can help you..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#5c1d2d] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#5c1d2d] hover:bg-[#4a1525] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Ticket to Support...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Support Ticket</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
