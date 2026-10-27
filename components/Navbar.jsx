'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Compass, Sparkles, Briefcase, Search, MessageSquare, User, FileText, Users, LogOut, ChevronDown, Menu, X } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, hasResults, currentUser, onOpenAuth, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'profile', label: 'AI Matcher', icon: Sparkles },
    ...(currentUser ? [{ id: 'dashboard', label: 'Dashboard', icon: User }] : []),
    { id: 'browse', label: 'Explore Jobs', icon: Briefcase },
    { id: 'resume', label: 'Resume ATS', icon: FileText },
    { id: 'chat', label: 'AI Companion', icon: MessageSquare },
    { id: 'community', label: 'Success Stories', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#fcfaf7]/95 backdrop-blur-md border-b border-[#d4a373]/20 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}>
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#5c1d2d] to-[#3b111c] flex items-center justify-center text-white shadow-md">
            <Compass className="w-6 h-6 animate-pulse text-[#d4a373]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="editorial-heading text-xl sm:text-2xl font-extrabold tracking-tight text-[#5c1d2d]">
                Rahnuma
              </span>
              <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#5c1d2d]/10 text-[#5c1d2d]">
                Pakistan & Remote
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Women Career & Employment Platform</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                  isActive ? 'bg-[#5c1d2d] text-white shadow-sm' : 'text-slate-700 hover:bg-[#5c1d2d]/10'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${item.id === 'profile' ? 'text-[#d4a373]' : ''}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions & Mobile Hamburger */}
        <div className="flex items-center space-x-3">
          <div className="relative" ref={dropdownRef}>
            {currentUser ? (
              <div>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 px-3 sm:px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-[#5c1d2d] transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-[#5c1d2d] text-white font-bold text-xs flex items-center justify-center">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="text-xs font-bold text-slate-800 hidden sm:inline">{currentUser.name}</span>
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
                className="px-4 sm:px-5 py-2.5 rounded-xl bg-[#5c1d2d] hover:bg-[#4a1525] text-white font-bold text-xs shadow-md transition-all flex items-center space-x-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center space-x-3 ${
                  isActive ? 'bg-[#5c1d2d] text-white shadow-sm' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
