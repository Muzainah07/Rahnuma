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
  const [city, setCity] = useState('Lahore');
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

  React.useEffect(() => {
    if (sampleProfiles.length > 0 && !name) {
      handleSampleSelect(sampleProfiles[0]);
    }
  }, [sampleProfiles]);

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
            className="inline-flex items-center space-x-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold text-base shadow-xl shadow-emerald-600/30 hover:from-emerald-700 hover:to-teal-800 transition-all transform hover:-translate-y-0.5"
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
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-5 font-bold text-xl shadow-inner">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-3">Share Profile & Goals</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Enter your education, city, skills, and career preferences, or select one of our pre-loaded sample profiles representing women across Pakistan.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 text-center relative overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mx-auto mb-5 font-bold text-xl shadow-inner">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-3">AI Matching & Skill Gaps</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Gemini AI instantly evaluates 90+ verified job opportunities and 37+ courses to pinpoint your exact skill gaps and recommend top matches.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 text-center relative overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mx-auto mb-5 font-bold text-xl shadow-inner">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-3">Upskill & Get Hired</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Optimize your resume with ATS scoring, generate custom cover letters, track applications in your dashboard, and connect with mentors.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => setShowGettingStarted(true)}
          className="text-xs font-bold text-emerald-700 hover:underline flex items-center space-x-1"
        >
          ← Back to How It Works
        </button>
        <span className="text-xs text-slate-500 font-medium">Step 1 of 3: Profile Configuration</span>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          {urduLanguage ? 'اپنا پروفایل درج کریں' : 'Build Your Professional Profile'}
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          {urduLanguage ? 'اپنی معلومات درج کریں تاکہ ہماری اے آئی آپ کو بہترین نوکریوں سے ملا سکے۔' : 'Choose a sample profile, fill out the interactive form, or paste your resume details below.'}
        </p>
      </div>

      {/* Input Mode Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1.5 rounded-xl bg-slate-200/75 shadow-inner">
          <button
            onClick={() => setInputType('samples')}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              inputType === 'samples'
                ? 'bg-white text-emerald-800 shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ✨ Choose Sample Profile
          </button>
          <button
            onClick={() => setInputType('form')}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              inputType === 'form'
                ? 'bg-white text-emerald-800 shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📝 Interactive Form
          </button>
          <button
            onClick={() => setInputType('freetext')}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              inputType === 'freetext'
                ? 'bg-white text-emerald-800 shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            💬 Free Text / Resume
          </button>
        </div>
      </div>

      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden p-6 sm:p-8">
        {inputType === 'samples' && (
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
              <User className="w-5 h-5 text-emerald-600" />
              <span>Select a Sample Profile from Pakistan</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {sampleProfiles.map((profile) => {
                const isSelected = selectedSampleId === profile.id;
                return (
                  <div
                    key={profile.id}
                    onClick={() => handleSampleSelect(profile)}
                    className={`cursor-pointer rounded-xl p-5 border-2 transition-all ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-emerald-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-slate-900">{profile.name}</h4>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />}
                    </div>
                    <div className="flex items-center text-xs text-slate-500 space-x-3 mb-3">
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{profile.city}</span>
                      </span>
                      <span>•</span>
                      <span>{profile.preferred_category}</span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                      {profile.career_goal}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {profile.skills.slice(0, 3).map((s, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-slate-100 font-medium text-slate-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold shadow-lg shadow-emerald-600/30 hover:from-emerald-700 hover:to-teal-800 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing Jobs & Skill Gaps with AI...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    <span>Generate Job Matches & Learning Roadmap</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {inputType === 'form' && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center space-x-2">
              <GraduationCap className="w-5 h-5 text-emerald-600" />
              <span>Enter Your Professional Background</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ayesha Khan"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">City in Pakistan</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm bg-white"
                >
                  <option value="Lahore">Lahore</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Faisalabad">Faisalabad</option>
                  <option value="Peshawar">Peshawar</option>
                  <option value="Quetta">Quetta</option>
                  <option value="Multan">Multan</option>
                  <option value="Remote">Remote / Work from Home</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Education Background</label>
                <input
                  type="text"
                  required
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  placeholder="e.g. BS Computer Science, Intermediate"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Prior Experience</label>
                <input
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="e.g. 1 year teaching, freelance writing"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Current Skills (comma separated)</label>
                <input
                  type="text"
                  required
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  placeholder="e.g. MS Excel, English Writing, Communication"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Preferred Job Category</label>
                <select
                  value={preferredCategory}
                  onChange={(e) => setPreferredCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm bg-white"
                >
                  <option value="Software & Tech">Software & Tech</option>
                  <option value="Content & Copywriting">Content & Copywriting</option>
                  <option value="Marketing">Marketing & Social Media</option>
                  <option value="Education & Training">Education & Training</option>
                  <option value="Design & Creative">Design & Creative</option>
                  <option value="Finance & Accounting">Finance & Accounting</option>
                  <option value="Customer Service">Customer Service</option>
                  <option value="Administrative">Administrative</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Work Availability</label>
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm bg-white"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Remote / Flexible">Remote / Flexible Hours</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Career Goal</label>
                <textarea
                  rows={3}
                  value={careerGoal}
                  onChange={(e) => setCareerGoal(e.target.value)}
                  placeholder="e.g. I want to secure a remote job to work from home."
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm"
                />
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold shadow-lg shadow-emerald-600/30 hover:from-emerald-700 hover:to-teal-800 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing Profile & Matching Jobs...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    <span>Generate Recommendations & Roadmap</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {inputType === 'freetext' && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              <span>Describe Your Profile in Free Text</span>
            </h3>

            <div>
              <textarea
                rows={6}
                required
                value={freeText}
                onChange={(e) => setFreeText(e.target.value)}
                placeholder="e.g. My name is Sana. I live in Karachi and have a Bachelor degree. I have good communication skills and want to work remotely."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold shadow-lg shadow-emerald-600/30 hover:from-emerald-700 hover:to-teal-800 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing Profile with AI...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    <span>Analyze Profile & Find Matches</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
