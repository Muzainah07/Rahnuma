'use client';

import React, { useState } from 'react';
import { Briefcase, BookOpen, CheckCircle2, TrendingUp, Target, Award, Sparkles, Trash2, ExternalLink } from 'lucide-react';

export default function CareerDashboard({
  savedJobs = [],
  appliedJobs = [],
  completedCourses = [],
  onRemoveSavedJob
}) {
  const [weeklyGoal, setWeeklyGoal] = useState('Apply to at least 3 remote roles and complete 2 modules of DigiSkills.');
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [tempGoal, setTempGoal] = useState(weeklyGoal);

  const saveGoal = () => {
    setWeeklyGoal(tempGoal);
    setIsEditingGoal(false);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Personal Career Progress</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Your Career Dashboard
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Track your saved jobs, application history, course progress, and weekly goals.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Saved Jobs</p>
            <h4 className="text-2xl font-extrabold text-slate-900">{savedJobs.length}</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Applications Sent</p>
            <h4 className="text-2xl font-extrabold text-slate-900">{appliedJobs.length}</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Courses Enrolled</p>
            <h4 className="text-2xl font-extrabold text-slate-900">4</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Skill Growth Score</p>
            <h4 className="text-2xl font-extrabold text-slate-900">85%</h4>
          </div>
        </div>
      </div>

      {/* Weekly Career Goal Section */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white rounded-2xl p-6 sm:p-8 shadow-lg mb-8 relative">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2.5 bg-white/10 rounded-xl">
              <Target className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Weekly Career Goal</h3>
              <p className="text-xs text-emerald-100">Set and achieve milestones every single week.</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditingGoal(!isEditingGoal)}
            className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-xs font-semibold transition-all"
          >
            {isEditingGoal ? 'Cancel' : 'Edit Goal'}
          </button>
        </div>

        {isEditingGoal ? (
          <div className="mt-4 space-y-3">
            <input
              type="text"
              value={tempGoal}
              onChange={(e) => setTempGoal(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-slate-900 text-sm bg-white focus:outline-none"
            />
            <button
              onClick={saveGoal}
              className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-sm transition-all"
            >
              Save Goal
            </button>
          </div>
        ) : (
          <p className="mt-3 text-sm sm:text-base font-light text-emerald-50 bg-white/10 p-4 rounded-xl border border-white/10">
            "{weeklyGoal}"
          </p>
        )}
      </div>

      {/* Grid of Saved Jobs & History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Saved Jobs */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
            <Briefcase className="w-5 h-5 text-emerald-600" />
            <span>Shortlisted & Saved Jobs ({savedJobs.length})</span>
          </h3>

          {savedJobs.length === 0 ? (
            <p className="text-sm text-slate-500 italic py-8 text-center">No saved jobs yet. Shortlist jobs from your matches or browse directory.</p>
          ) : (
            <div className="space-y-3">
              {savedJobs.map((job, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-all">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{job.title}</h4>
                    <p className="text-xs text-slate-500">{job.company} • {job.location}</p>
                    <span className="text-xs font-semibold text-emerald-700 mt-1 inline-block">PKR {job.salary_pkr}</span>
                  </div>
                  <button
                    onClick={() => onRemoveSavedJob(job.job_id)}
                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Application History */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-teal-600" />
            <span>Application History ({appliedJobs.length})</span>
          </h3>

          {appliedJobs.length === 0 ? (
            <p className="text-sm text-slate-500 italic py-8 text-center">No applications submitted yet. Click 'Quick Apply' on any job match.</p>
          ) : (
            <div className="space-y-3">
              {appliedJobs.map((job, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-teal-50/30">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{job.title}</h4>
                    <p className="text-xs text-slate-500">{job.company} • Applied on {new Date().toLocaleDateString()}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                    Under Review
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
