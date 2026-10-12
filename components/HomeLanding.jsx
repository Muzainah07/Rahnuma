'use client';

import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Sparkles, ShieldCheck, ArrowRight, Building2, DollarSign, Filter, ExternalLink } from 'lucide-react';

export default function HomeLanding({ onExploreJobs, onOpenTool }) {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('All');

  const featuredJobs = [
    {
      job_id: 'J-101',
      title: 'Senior Frontend React Developer',
      company: 'Systems Limited',
      location: 'Lahore / Remote',
      work_mode: 'Hybrid',
      employment_type: 'Full-time',
      salary_pkr: '150,000 - 220,000',
      verified: true,
      category: 'Software & Tech',
      posted: '2 days ago',
      apply_url: 'https://www.systemsltd.com/careers',
      description: 'Lead frontend development for enterprise web applications using React, Tailwind CSS, and Next.js. Flexible working hours for women returning to tech.'
    },
    {
      job_id: 'J-102',
      title: 'Digital Marketing & E-Commerce Lead',
      company: 'Daraz PK',
      location: 'Karachi',
      work_mode: 'Onsite',
      employment_type: 'Full-time',
      salary_pkr: '90,000 - 130,000',
      verified: true,
      category: 'Marketing',
      posted: 'Yesterday',
      apply_url: 'https://www.daraz.pk/careers',
      description: 'Manage seller growth campaigns, performance marketing, and digital outreach across Pakistan.'
    },
    {
      job_id: 'J-103',
      title: 'Remote Content Writer & Copywriter',
      company: 'Creative Hive Global',
      location: 'Remote',
      work_mode: 'Remote',
      employment_type: 'Part-time',
      salary_pkr: '60,000 - 85,000',
      verified: true,
      category: 'Content & Copywriting',
      posted: '3 hours ago',
      apply_url: 'https://www.upwork.com',
      description: 'Create high-engagement blogs, newsletters, and social media copy with completely flexible remote working hours.'
    },
    {
      job_id: 'J-104',
      title: 'Junior Data Analyst & BI Specialist',
      company: 'Habib Bank Limited (HBL)',
      location: 'Islamabad / Hybrid',
      work_mode: 'Hybrid',
      employment_type: 'Full-time',
      salary_pkr: '80,000 - 110,000',
      verified: true,
      category: 'Finance & Administration',
      posted: '4 days ago',
      apply_url: 'https://www.hbl.com/careers',
      description: 'Transform banking operational datasets into interactive executive dashboards using Power BI and SQL.'
    }
  ];

  const handleApplyJob = (job) => {
    const url = job.apply_url || `https://www.google.com/search?q=${encodeURIComponent(job.company + ' ' + job.title + ' careers apply')}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#5c1d2d] to-[#3b111c] text-white py-20 px-4 sm:px-6 lg:px-8 rounded-b-3xl shadow-xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4a373_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[#fbf9f6] text-xs font-semibold mb-6 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-[#d4a373]" />
            <span>Pakistan’s Premier Women Career & Employment Platform</span>
          </div>
          
          <h1 className="editorial-heading text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Where Ambition Meets Opportunity, <br />
            <span className="text-[#d4a373]">Without Compromise.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Discover verified remote, hybrid, and flexible employment opportunities, optimize your resume with AI ATS scoring, and grow your career with trusted mentorship.
          </p>

          {/* Functional Search Bar */}
          <div className="bg-white p-3 rounded-2xl shadow-2xl max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-2 border border-slate-200">
            <div className="flex items-center space-x-2 px-3 py-2 w-full sm:w-auto flex-1 border-b sm:border-b-0 sm:border-r border-slate-200">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search job role, doctor, engineer, skills..."
                className="w-full text-slate-800 text-sm focus:outline-none bg-transparent"
              />
            </div>

            <div className="flex items-center space-x-2 px-3 py-2 w-full sm:w-44">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-slate-800 text-sm focus:outline-none bg-transparent"
              >
                <option value="All">All Locations</option>
                <option value="Lahore">Lahore</option>
                <option value="Karachi">Karachi</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <button
              onClick={() => onExploreJobs(keyword)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#5c1d2d] hover:bg-[#4a1525] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <span>Search Jobs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="editorial-heading text-2xl sm:text-3xl font-extrabold text-slate-900">Explore by Industry</h2>
            <p className="text-xs text-slate-500 mt-1">Browse verified career categories with active employer listings.</p>
          </div>
          <button
            onClick={() => onExploreJobs('')}
            className="text-xs font-bold text-[#5c1d2d] hover:underline flex items-center space-x-1"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Software & Tech', count: '24+ Jobs', icon: Briefcase },
            { name: 'Marketing & Communications', count: '18+ Jobs', icon: Sparkles },
            { name: 'Content & Copywriting', count: '15+ Jobs', icon: Filter },
            { name: 'Finance & Administration', count: '12+ Jobs', icon: Building2 },
          ].map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                onClick={() => onExploreJobs(cat.name)}
                className="cursor-pointer bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#5c1d2d]/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#fcfaf7] text-[#5c1d2d] flex items-center justify-center mb-4 group-hover:bg-[#5c1d2d] group-hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{cat.name}</h3>
                <p className="text-xs text-slate-500 font-medium">{cat.count}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Featured Curated Opportunities */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="editorial-heading text-2xl sm:text-3xl font-extrabold text-slate-900">Verified Opportunities</h2>
            <p className="text-xs text-slate-500 mt-1">Hand-curated employment listings with transparent salary ranges.</p>
          </div>
          <button
            onClick={() => onExploreJobs('')}
            className="text-xs font-bold text-[#5c1d2d] hover:underline flex items-center space-x-1"
          >
            <span>Explore All Jobs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredJobs.map((job) => (
            <div
              key={job.job_id}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#fcfaf7] text-[#5c1d2d] border border-[#5c1d2d]/20">
                      {job.category}
                    </span>
                    {job.verified && (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Verified Employer</span>
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{job.posted}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">{job.title}</h3>
                
                <div className="flex flex-wrap items-center gap-y-1 text-xs text-slate-600 mb-4 space-x-3">
                  <span className="font-semibold text-slate-800 flex items-center space-x-1">
                    <Building2 className="w-3.5 h-3.5 text-[#5c1d2d]" />
                    <span>{job.company}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-[#5c1d2d]" />
                    <span>{job.location} ({job.work_mode})</span>
                  </span>
                </div>

                <div className="flex items-center space-x-1 text-xs font-bold text-[#5c1d2d] bg-[#fcfaf7] px-3 py-2 rounded-lg mb-4 border border-[#5c1d2d]/10">
                  <DollarSign className="w-4 h-4 text-[#5c1d2d] shrink-0" />
                  <span>PKR {job.salary_pkr} / month</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                  {job.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">{job.employment_type}</span>
                <button
                  onClick={() => handleApplyJob(job)}
                  className="px-4 py-2 rounded-xl bg-[#5c1d2d] hover:bg-[#4a1525] text-white font-bold text-xs shadow-sm transition-all flex items-center space-x-1.5"
                >
                  <span>Apply via Company Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Career Tools & AI Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#fbf9f6] to-[#f5efe9] p-8 sm:p-12 rounded-3xl border border-[#d4a373]/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#5c1d2d]/10 text-[#5c1d2d] text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Advanced AI Career Suite</span>
            </div>
            <h2 className="editorial-heading text-3xl font-extrabold text-slate-900 mb-4">
              Not Just Job Listings. A Complete Career Growth Ecosystem.
            </h2>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Use our AI Resume ATS Auditor to optimize your CV for keyword matching, generate multi-variant cover letters, and track your interview pipeline effortlessly.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onOpenTool('resume')}
                className="px-6 py-3 rounded-xl bg-[#5c1d2d] hover:bg-[#4a1525] text-white font-bold text-xs shadow-md transition-all"
              >
                Try ATS Resume Audit
              </button>
              <button
                onClick={() => onOpenTool('chat')}
                className="px-6 py-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs shadow-xs transition-all"
              >
                Ask AI Career Companion
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm mb-1">ATS Resume Score</h3>
              <p className="text-xs text-slate-500 mb-3">Instant keyword matching & formatting analysis.</p>
              <span className="text-2xl font-extrabold text-[#5c1d2d]">88 / 100</span>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm mb-1">Cover Letters</h3>
              <p className="text-xs text-slate-500 mb-3">Formal, short & Pakistani market styles.</p>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">3 Variants</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
