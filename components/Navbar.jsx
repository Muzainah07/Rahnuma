'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Compass, Sparkles, Briefcase, Search, MessageSquare, User, FileText, Users, LogOut, ChevronDown } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, hasResults, currentUser, onOpenAuth, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#fcfaf7]/90 backdrop-blur-md border-b border-[#d4a373]/20 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#5c1d2d] to-[#3b111c] flex items-center justify-center text-white shadow-md">
            <Compass className="w-6 h-6 animate-pulse text-[#d4a373]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="editorial-heading text-2xl font-extrabold tracking-tight text-[#5c1d2d]">
                Rahnuma
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#5c1d2d]/10 text-[#5c1d2d]">
                Pakistan & Remote
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Women Career & Employment Platform</p>
          </div>
        </div>

        <nav className="hidden xl:flex items-center space-x-1">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'home' ? 'bg-[#5c1d2d] text-white shadow-sm' : 'text-slate-700 hover:bg-[#5c1d2d]/10'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              activeTab === 'profile' ? 'bg-[#5c1d2d] text-white shadow-sm' : 'text-slate-700 hover:bg-[#5c1d2d]/10'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#d4a373]" />
            <span>AI Matcher</span>
          </button>

          {currentUser && (
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                activeTab === 'dashboard' ? 'bg-[#5c1d2d] text-white shadow-sm' : 'text-slate-700 hover:bg-[#5c1d2d]/10'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('browse')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              activeTab === 'browse' ? 'bg-[#5c1d2d] text-white shadow-sm' : 'text-slate-700 hover:bg-[#5c1d2d]/10'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Explore Jobs</span>
          </button>

          <button
            onClick={() => setActiveTab('resume')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              activeTab === 'resume' ? 'bg-[#5c1d2d] text-white shadow-sm' : 'text-slate-700 hover:bg-[#5c1d2d]/10'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume ATS</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              activeTab === 'chat' ? 'bg-[#5c1d2d] text-white shadow-sm' : 'text-slate-700 hover:bg-[#5c1d2d]/10'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>AI Companion</span>
          </button>

          <button
            onClick={() => setActiveTab('community')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              activeTab === 'community' ? 'bg-[#5c1d2d] text-white shadow-sm' : 'text-slate-700 hover:bg-[#5c1d2d]/10'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Success Stories</span>
          </button>
        </nav>

        <div className="flex items-center space-x-3 relative" ref={dropdownRef}>
          {currentUser ? (
            <div>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-2xl hover:border-[#5c1d2d] transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-[#5c1d2d] text-white font-bold text-xs flex items-center justify-center">
                  {currentUser.name.charAt(0)}
                </div>
                <span className="text-xs font-bold text-slate-800">{currentUser.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      setActiveTab('dashboard');
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all flex items-center space-x-2"
                  >
                    <User className="w-3.5 h-3.5 text-[#5c1d2d]" />
                    <span>My Career Dashboard</span>
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-all flex items-center space-x-2 border-t border-slate-100 mt-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-5 py-2.5 rounded-xl bg-[#5c1d2d] hover:bg-[#4a1525] text-white font-bold text-xs shadow-md transition-all flex items-center space-x-1.5"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In / Register</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
