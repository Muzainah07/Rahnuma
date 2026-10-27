'use client';

import React, { useState } from 'react';
import { FileText, Sparkles, CheckCircle2, Loader2, Wand2, ArrowLeft } from 'lucide-react';

export default function ResumeAnalyzer({ userSkills = [], onBack }) {
  const [resumeText, setResumeText] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const analyzeResume = async (e) => {
    e.preventDefault();
    if (!resumeText.trim()) return;
    setLoading(true);

    try {
      const res = await fetch('/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'ats_score',
          resumeText,
          jobTitle: targetRole || 'Professional Role',
          userSkills
        })
      });

      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await res.text();
        throw new Error(text.slice(0, 100) || 'Server response was not JSON');
      }

      const data = await res.json();
      if (data.success) {
        setResult(data.data);
      } else {
        alert(data.error || 'Failed to analyze resume.');
      }
    } catch (err) {
      console.error(err);
      alert('Error analyzing resume: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {onBack && (
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      )}

      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#5c1d2d]/10 text-[#5c1d2d] text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Resume & ATS Optimizer</span>
        </div>
        <h2 className="editorial-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Resume ATS Scoring & Feedback
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Paste your resume text and target role to get an instant ATS score, keyword breakdown, and suggestions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <form onSubmit={analyzeResume} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Job Title</label>
              <input
                type="text"
                required
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#5c1d2d] focus:outline-none"
                placeholder="e.g. Frontend React Developer, Digital Marketer..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Paste Your Resume Content</label>
              <textarea
                rows={8}
                required
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#5c1d2d] focus:outline-none font-mono text-xs"
                placeholder="Paste your education, skills, work experience, and projects here..."
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
                  <span>Analyzing ATS Score with AI...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>Run ATS Resume Audit</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 flex flex-col justify-between">
          {!result ? (
            <div className="text-center py-20 text-slate-400">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm font-medium">Paste your resume text on the left and click "Run ATS Resume Audit" to view your score.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#fcfaf7] border border-[#5c1d2d]/20">
                <div>
                  <p className="text-xs font-bold text-[#5c1d2d] uppercase tracking-wider">Overall ATS Score</p>
                  <h3 className="text-3xl font-extrabold text-[#5c1d2d] mt-1">{result.ats_score} / 100</h3>
                </div>
                <div className="w-14 h-14 rounded-full bg-[#5c1d2d] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  {result.ats_score}%
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Key Strengths</h4>
                <ul className="space-y-1.5">
                  {(result.strengths || []).map((s, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-xs font-medium text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Missing Keywords to Add</h4>
                <div className="flex flex-wrap gap-1.5">
                  {(result.missing_keywords || []).map((k, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-900 border border-amber-200">
                      + {k}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="text-xs font-bold text-slate-700 mb-1">AI Recommendation Summary</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{result.summary_feedback}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
