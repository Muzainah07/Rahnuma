'use client';

import React, { useState } from 'react';
import { Sparkles, User, MapPin, GraduationCap, ArrowRight, Loader2, CheckCircle2, FileText, Wand2, Compass, ShieldCheck, BookOpen, Target } from 'lucide-react';

export default function ProfileBuilder({
  sampleProfiles,
  onGenerateRecommendations,
  isLoading,
  urduLanguage
}) {
  const [showGettingStarted, setShowGettingStarted] = useState(true);
  const [inputType, setInputType] = useState('samples');
  
  const [selectedSampleId, setSelectedSampleId] = useState(sampleProfiles[0]?.id || '');

  const [name, setName] = useState('');
  const [city, setCity] = useState('Karachi');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [skillsInput, setSkillsInput] = useState('');
  const [careerGoal, setCareerGoal] = useState('');
  const [preferredCategory, setPreferredCategory] = useState('Software & Tech');
  const [availability, setAvailability] = useState('Full-time');

  const [freeText, setFreeText] = useState('');

  const handleSampleSelect = (profile) => {
    setSelectedSampleId(profile.id);
    setName(profile.name);
    setCity(profile.city);
    setEducation(profile.education);
    setExperience(profile.experience);
    setSkillsInput(profile.skills.join(', '));
    setCareerGoal(profile.career_goal);
    setPreferredCategory(profile.preferred_category);
    setAvailability(profile.availability);
  };

  const handleClearForm = () => {
    setName('');
    setEducation('');
    setExperience('');
    setSkillsInput('');
    setCareerGoal('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputType === 'freetext') {
      if (!freeText.trim()) return;
      onGenerateRecommendations(freeText, null);
    } else if (inputType === 'samples' || inputType === 'form') {
      const structured = {
        name: name || 'Job Seeker',
        city,
        education,
        experience,
        skills: skillsInput.split(',').map(s => s.trim()).filter(Boolean),
        career_goal: careerGoal,
        preferred_category: preferredCategory,
        availability
      };
      const textSummary = `Name: ${name}, City: ${city}, Education: ${education}, Experience: ${experience}, Skills: ${skillsInput}, Goal: ${careerGoal}, Category: ${preferredCategory}, Availability: ${availability}`;
      onGenerateRecommendations(textSummary, structured);
    }
  };

  if (showGettingStarted) {
    return (
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-4 shadow-xs">
            <Sparkles className="w-4 h-4" />
            <span>{urduLanguage ? 'خواتین کا کیریئر اور اسکل نیویگیٹر' : 'AI Career & Skill Navigator for Women in Pakistan'}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            {urduLanguage ? 'اپنا کیریئر سنواریں اور بااختیار بنیں' : 'Discover Your Dream Career, Close Skill Gaps & Get Hired'}
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            {urduLanguage 
              ? 'رحنما ایک جدید مصنوعی ذہانت (AI) پر مبنی پلیٹ فارم ہے جو پاکستانی خواتین کو بہترین نوکریوں اور تربیت تک رسائی فراہم کرتا ہے۔'
              : 'Rahnuma helps women across Pakistan find verified remote and hybrid opportunities, analyze their resumes with ATS scoring, and bridge skill gaps with accredited courses.'}
          </p>
          <button
            onClick={() => setShowGettingStarted(false)}
            className="inline-flex items-center space-x-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#5c1d2d] to-[#3b111c] text-white font-bold text-base shadow-xl hover:bg-[#4a1525] transition-all transform hover:-translate-y-0.5"
          >
            <span>{urduLanguage ? 'شروع کریں (Get Started)' : 'Get Started Now'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* How It Works Explanation Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-extrabold text-center text-slate-900 mb-10">
            {urduLanguage ? 'یہ کیسے کام کرتا ہے؟ (How Rahnuma Works)' : 'How Rahnuma Works in 3 Simple Steps'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 text-center relative overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-[#5c1d2d]/10 text-[#5c1d2d] flex items-center justify-center mx-auto mb-5 font-bold text-xl shadow-inner">
                1
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg mb-2">Build or Select Profile</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose a sample professional profile or fill in your own education, skills, and career goals.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 text-center relative overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-[#5c1d2d]/10 text-[#5c1d2d] flex items-center justify-center mx-auto mb-5 font-bold text-xl shadow-inner">
                2
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg mb-2">AI Job Matching</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Gemini AI instantly matches your profile against verified jobs in Pakistan with PKR salary ranges and match scores.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 text-center relative overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-[#5c1d2d]/10 text-[#5c1d2d] flex items-center justify-center mx-auto mb-5 font-bold text-xl shadow-inner">
                3
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg mb-2">Skill Gaps & Courses</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Identify missing skills and get direct course recommendations from DigiSkills, PNY, and Saylani to get hired faster.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#5c1d2d]/10 text-[#5c1d2d] text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Profile & Career Matcher</span>
        </div>
        <h2 className="editorial-heading text-3xl font-extrabold text-slate-900 tracking-tight">
          Configure Your Professional Profile
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Select a sample candidate profile or fill in your own details to receive AI-powered job matches and skill gap roadmaps.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-10">
        <div className="flex items-center justify-center space-x-3 mb-8 bg-slate-100 p-1.5 rounded-2xl max-w-md mx-auto">
          <button
            type="button"
            onClick={() => {
              setInputType('samples');
              if (sampleProfiles.length > 0) handleSampleSelect(sampleProfiles[0]);
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              inputType === 'samples' ? 'bg-[#5c1d2d] text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sample Profiles
          </button>
          <button
            type="button"
            onClick={() => {
              setInputType('form');
              handleClearForm();
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              inputType === 'form' ? 'bg-[#5c1d2d] text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Custom Form
          </button>
          <button
            type="button"
            onClick={() => setInputType('freetext')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              inputType === 'freetext' ? 'bg-[#5c1d2d] text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Free Text
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {inputType === 'samples' && (
            <div className="space-y-6">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select a Representative Sample Profile:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {sampleProfiles.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSampleSelect(p)}
                    className={`cursor-pointer rounded-2xl p-5 border-2 transition-all ${
                      selectedSampleId === p.id
                        ? 'border-[#5c1d2d] bg-[#fcfaf7] shadow-md'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-[#5c1d2d] text-white font-bold text-xs flex items-center justify-center">
                        {p.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{p.name}</h4>
                        <p className="text-[11px] text-slate-500">{p.city}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-2">{p.career_goal}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {inputType === 'form' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#5c1d2d] focus:outline-none"
                    placeholder="e.g. Ayesha Siddiqui"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">City in Pakistan</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#5c1d2d] focus:outline-none bg-white"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Education Background</label>
                  <input
                    type="text"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#5c1d2d] focus:outline-none"
                    placeholder="e.g. BS Computer Science, Intermediate, MBBS..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Work Experience</label>
                  <input
                    type="text"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#5c1d2d] focus:outline-none"
                    placeholder="e.g. Fresh graduate, 1 year internship, 2 years teaching..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Skills (comma separated)</label>
                <input
                  type="text"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#5c1d2d] focus:outline-none"
                  placeholder="e.g. React.js, JavaScript, Tailwind CSS, Communication, MS Excel"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Career Goal & Expectations</label>
                <textarea
                  rows={3}
                  value={careerGoal}
                  onChange={(e) => setCareerGoal(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#5c1d2d] focus:outline-none"
                  placeholder="e.g. Looking for a remote frontend developer role with flexible hours and stable pay..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Industry</label>
                  <select
                    value={preferredCategory}
                    onChange={(e) => setPreferredCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#5c1d2d] focus:outline-none bg-white"
                  >
                    <option value="Software & Tech">Software & Tech</option>
                    <option value="Healthcare & Medical">Healthcare & Medical</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Content & Copywriting">Content & Copywriting</option>
                    <option value="Finance & Administration">Finance & Administration</option>
                    <option value="Education & Training">Education & Training</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Work Arrangement</label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#5c1d2d] focus:outline-none bg-white"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Remote / Flexible">Remote / Flexible</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {inputType === 'freetext' && (
            <div className="space-y-4">
              <label className="block text-xs font-bold text-slate-700">
                Describe your background, education, and career aspirations in your own words:
              </label>
              <textarea
                rows={6}
                value={freeText}
                onChange={(e) => setFreeText(e.target.value)}
                placeholder="e.g. I am a recent graduate in Lahore looking for remote frontend developer roles..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#5c1d2d] focus:outline-none"
              />
            </div>
          )}

          <div className="pt-4 border-t border-slate-200">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-[#5c1d2d] hover:bg-[#4a1525] text-white font-bold text-sm shadow-xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Generating AI Career Match & Recommendations...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-[#d4a373]" />
                  <span>Generate AI Job Matches & Skill Roadmap</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
