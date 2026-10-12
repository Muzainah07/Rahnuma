'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Plus, Briefcase, BookOpen, Mail, CheckCircle2, Trash2, Send } from 'lucide-react';

export default function AdminPanel({ jobs = [], courses = [], onAddJob }) {
  const [activeSubTab, setActiveSubTab] = useState('tickets');
  const [tickets, setTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newSalary, setNewSalary] = useState('50,000 - 80,000');
  const [newLocation, setNewLocation] = useState('Remote');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setLoadingTickets(true);
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (data.success) {
        setTickets(data.tickets || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingTickets(false);
    }
  };

  const resolveTicket = (ticketId) => {
    setTickets(tickets.map(t => t.id === ticketId ? { ...t, status: 'Resolved' } : t));
    alert(`Support ticket ${ticketId} marked as resolved.`);
  };

  const handleCreateJob = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newJob = {
      job_id: `J-${Date.now().toString().slice(-3)}`,
      title: newTitle,
      category: 'Software & Tech',
      location: newLocation,
      job_type: 'Full-time',
      company: newCompany || 'Tech Corp PK',
      salary_pkr: newSalary,
      required_skills: ['Communication', 'Problem Solving'],
      description: 'Newly added verified job opportunity in Pakistan.'
    };
    onAddJob(newJob);
    setNewTitle('');
    setNewCompany('');
    alert(`Successfully published job: "${newTitle}"!`);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#5c1d2d]/10 text-[#5c1d2d] text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Administrator Control Center</span>
          </div>
          <h2 className="editorial-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Employer & Support Admin Panel
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Review incoming user support tickets, reply to customer inquiries, and manage job listings.
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2 mb-6">
        <button
          onClick={() => setActiveSubTab('tickets')}
          className={`px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center space-x-1.5 ${
            activeSubTab === 'tickets' ? 'bg-[#5c1d2d] text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-700'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Support Tickets ({tickets.filter(t => t.status === 'Open').length} Open)</span>
        </button>
        <button
          onClick={() => setActiveSubTab('jobs')}
          className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${
            activeSubTab === 'jobs' ? 'bg-[#5c1d2d] text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-700'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Manage Jobs ({jobs.length})</span>
        </button>
        <button
          onClick={() => setActiveSubTab('add')}
          className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${
            activeSubTab === 'add' ? 'bg-[#5c1d2d] text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-700'
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Post Job</span>
        </button>
      </div>

      {activeSubTab === 'tickets' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Incoming User Support Tickets</h3>
            <button onClick={fetchTickets} className="text-xs text-[#5c1d2d] font-bold hover:underline">
              Refresh Inbox
            </button>
          </div>

          {tickets.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <Mail className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p className="text-sm font-medium">No support tickets submitted yet. Try submitting one from the footer!</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
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
                    <a
                      href={`mailto:${t.email}?subject=Re: Support Ticket ${t.id} - Rahnuma`}
                      className="px-3.5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-xs transition-all flex items-center space-x-1"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Reply via Email</span>
                    </a>
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

      {activeSubTab === 'jobs' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4">All Current Verified Jobs</h3>
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {jobs.map((job) => (
              <div key={job.job_id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{job.title}</h4>
                  <p className="text-xs text-slate-500">{job.company} • {job.location} • PKR {job.salary_pkr}</p>
                </div>
                <span className="px-2.5 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-800">
                  Verified Active
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'add' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 max-w-xl">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Publish a New Job Listing</h3>
          <form onSubmit={handleCreateJob} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Job Title</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Remote Social Media Specialist"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5c1d2d]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Company Name</label>
              <input
                type="text"
                required
                value={newCompany}
                onChange={(e) => setNewCompany(e.target.value)}
                placeholder="e.g. Karachi Digital Hub"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5c1d2d]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Salary Range (PKR)</label>
              <input
                type="text"
                required
                value={newSalary}
                onChange={(e) => setNewSalary(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5c1d2d]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Location / Mode</label>
              <input
                type="text"
                required
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5c1d2d]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#5c1d2d] hover:bg-[#4a1525] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Job Listing</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
