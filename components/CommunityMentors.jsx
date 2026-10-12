'use client';

import React, { useState } from 'react';
import { Award, Sparkles, Search, Building2, MapPin, CheckCircle2 } from 'lucide-react';

export default function CommunityMentors() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');

  const successStories = [
    {
      name: "Amina Tariq",
      city: "Faisalabad",
      role: "Digital Marketing Specialist",
      company: "Chenab Digital Retail",
      salary: "75,000 PKR / mo",
      story: "Transitioned from a traditional homemaker to a full-time remote digital marketer after completing DigiSkills and Rahnuma guidance.",
      skills: ["SEO", "Social Media Ads", "Canva"]
    },
    {
      name: "Kinza Zahid",
      city: "Rawalpindi",
      role: "Frontend React Developer",
      company: "Systems Limited (Islamabad)",
      salary: "120,000 PKR / mo",
      story: "Secured her first tech role with an Islamabad software house within 3 weeks of using the skill gap roadmap and resume ATS optimizer.",
      skills: ["React.js", "JavaScript", "Tailwind CSS"]
    },
    {
      name: "Sana Malik",
      city: "Lahore",
      role: "Junior Accountant",
      company: "Lahore Textile Mills",
      salary: "65,000 PKR / mo",
      story: "Upgraded her B.Com degree with practical QuickBooks and bookkeeping training to secure a permanent corporate accounting position.",
      skills: ["QuickBooks", "MS Excel", "Bookkeeping"]
    },
    {
      name: "Mahnoor Baloch",
      city: "Karachi",
      role: "UI/UX Designer",
      company: "PixelCraft Studios",
      salary: "95,000 PKR / mo",
      story: "Started as a self-taught graphic designer on mobile apps and built a professional portfolio using Figma and design bootcamps.",
      skills: ["Figma", "UI Design", "Prototyping"]
    },
    {
      name: "Rabia Basri",
      city: "Multan",
      role: "Customer Success Lead",
      company: "Habib Bank Limited (HBL)",
      salary: "60,000 PKR / mo",
      story: "Leveraged her communication skills and banking operations training to land a secure counter and customer support role.",
      skills: ["Customer Service", "Banking", "Communication"]
    }
  ];

  const filteredStories = successStories.filter(s => {
    const matchesCity = selectedCity === 'All' || s.city === selectedCity;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.skills.some(sk => sk.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCity && matchesSearch;
  });

  const cities = ['All', 'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan'];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      <div className="text-center mb-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Pakistani Women Success Network</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Alumni & Success Stories
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Search and explore inspiring success stories of Pakistani women currently placed at top tech companies, banks, and remote enterprises.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, company, skill (e.g. Systems Limited, React)..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <span className="text-xs font-bold text-slate-500 shrink-0">City:</span>
          {cities.map((city, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCity(city)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCity === city
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Stories Grid */}
      {filteredStories.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <Award className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-700 mb-1">No success stories match your search</h3>
          <p className="text-sm text-slate-500">Try searching for different skills, companies, or cities.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((st, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-lg flex items-center justify-center shadow-inner">
                      {st.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{st.name}</h4>
                      <p className="text-xs text-slate-500 flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-emerald-600" />
                        <span>{st.city}, Pakistan</span>
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Placed
                  </span>
                </div>

                <div className="mb-3 bg-emerald-50/70 p-3 rounded-xl border border-emerald-100">
                  <p className="text-xs font-bold text-emerald-900">{st.role}</p>
                  <p className="text-xs text-emerald-700 font-medium flex items-center space-x-1 mt-0.5">
                    <Building2 className="w-3 h-3" />
                    <span>{st.company}</span>
                  </p>
                  <p className="text-xs font-extrabold text-emerald-800 mt-1">💰 {st.salary}</p>
                </div>

                <p className="text-xs text-slate-700 italic leading-relaxed mb-4">
                  "{st.story}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1">
                {st.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="px-2 py-0.5 rounded text-[10px] bg-slate-100 font-medium text-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
