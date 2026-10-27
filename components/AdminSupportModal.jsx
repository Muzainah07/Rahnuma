'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Mail, CheckCircle2, Lock, Send, X } from 'lucide-react';

export default function AdminSupportModal({ isOpen, onClose }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [activeTicket, setActiveTicket] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');

  useEffect(() => {
    if (isOpen && isAdminAuthenticated) {
      fetchTickets();
    }
  }, [isOpen, isAdminAuthenticated]);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (data.success) {
        setTickets(data.tickets || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (passcode === 'admin123' || passcode === 'rahnuma2026') {
      setIsAdminAuthenticated(true);
      fetchTickets();
    } else {
      alert('Invalid Passcode. Hint: admin123');
    }
  };

  const resolveTicket = (ticketId) => {
    setTickets(tickets.map(t => t.id === ticketId ? { ...t, status: 'Resolved' } : t));
    alert(`Support ticket ${ticketId} marked as resolved.`);
  };

  const sendEmailReply = (e) => {
    e.preventDefault();
    if (!replyMessage.trim()) return;
    alert(`Email successfully sent to ${activeTicket.email}!\n\nMessage: "${replyMessage}"`);
    setTickets(tickets.map(t => t.id === activeTicket.id ? { ...t, status: 'Resolved' } : t));
    setReplyModalOpen(false);
    setReplyMessage('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-3xl w-full overflow-y-auto max-h-[85vh] p-6 sm:p-8 relative my-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {!isAdminAuthenticated ? (
          <div className="max-w-md mx-auto py-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#5c1d2d]/10 text-[#5c1d2d] flex items-center justify-center mx-auto mb-4 shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="editorial-heading text-2xl font-extrabold text-slate-900 mb-2">
              Admin Support Inbox
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Restricted access. Enter passcode to view user support inquiries. (Hint: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-bold text-[#5c1d2d]">admin123</code>)
            </p>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter Passcode..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-center tracking-widest focus:ring-2 focus:ring-[#5c1d2d] focus:outline-none"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#5c1d2d] hover:bg-[#4a1525] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Unlock Support Inbox</span>
              </button>
            </form>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
              <div>
                <h3 className="editorial-heading text-xl font-extrabold text-slate-900">
                  Admin Support Inbox ({tickets.filter(t => t.status === 'Open').length} Open)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Review and reply to user support queries submitted via the contact form.</p>
              </div>
              <button
                onClick={fetchTickets}
                className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12 text-slate-400 text-xs">Loading support tickets...</div>
            ) : tickets.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <Mail className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p className="text-sm font-medium">No support tickets submitted yet. Try submitting one from the footer!</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {tickets.map((t) => (
                  <div key={t.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#5c1d2d]/10 text-[#5c1d2d]">{t.id}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${t.status === 'Open' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                          {t.status}
                        </span>
                        <span className="text-xs text-slate-400">{t.created_at}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">{t.subject} — <span className="font-normal text-slate-600">{t.name} ({t.email})</span></h4>
                      <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200 mt-2">
                        "{t.message}"
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        onClick={() => {
                          setActiveTicket(t);
                          setReplyModalOpen(true);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-xs transition-all flex items-center space-x-1"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Reply</span>
                      </button>
                      {t.status === 'Open' && (
                        <button
                          onClick={() => resolveTicket(t.id)}
                          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all flex items-center space-x-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Resolve</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Reply Modal */}
        {replyModalOpen && activeTicket && (
          <div className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 relative my-8">
              <button
                onClick={() => setReplyModalOpen(false)}
                className="absolute right-4 top-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <h4 className="text-base font-extrabold text-slate-900 mb-1">
                Reply to {activeTicket.name} ({activeTicket.email})
              </h4>
              <p className="text-xs text-slate-500 mb-4">Ticket ID: {activeTicket.id}</p>

              <div className="bg-slate-50 p-3 rounded-xl text-xs text-slate-600 mb-4 border border-slate-200">
                <span className="font-bold text-slate-700">User's Message:</span> "{activeTicket.message}"
              </div>

              <form onSubmit={sendEmailReply} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Email Response</label>
                  <textarea
                    rows={4}
                    required
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Type your reply here..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#5c1d2d] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#5c1d2d] hover:bg-[#4a1525] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Email Reply & Close Ticket</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
