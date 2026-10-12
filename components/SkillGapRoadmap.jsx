'use client';

import React from 'react';
import { BookOpen, Sparkles, Clock, ArrowRight, ShieldAlert } from 'lucide-react';

export default function SkillGapRoadmap({
  skillGaps,
  recommendedCourses,
  allCourses,
  careerAdvice,
  onNavigateToJobs
}) {
  const mappedCourses = recommendedCourses
    .map(rec => {
      const fullCourse = allCourses.find(c => c.course_id === rec.course_id);
      return fullCourse ? { ...fullCourse, why_recommended: rec.why_recommended } : null;
    })
    .filter(Boolean);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Personalized Learning Roadmap</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Skill Gaps & Recommended Courses
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Bridge your missing skills with certified courses from DigiSkills, Coursera, PNY, Saylani, and top Pakistani institutes.
          </p>
        </div>

        <div className="mt-4 md:mt-0">
          <button
            onClick={onNavigateToJobs}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-semibold text-sm shadow-md hover:bg-emerald-800 transition-all"
          >
            <span>Back to Job Matches</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {careerAdvice && (
        <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl mb-10 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-48 h-48 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md shrink-0">
              <Sparkles className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2 text-emerald-100">Mentor's Guidance & Career Advice</h3>
              <p className="text-sm sm:text-base text-emerald-50/90 leading-relaxed font-light">
                "{careerAdvice}"
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 mb-10">
        <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center space-x-2">
          <ShieldAlert className="w-5 h-5 text-amber-600" />
          <span>Identified Skill Gaps</span>
        </h3>
        <p className="text-sm text-slate-600 mb-6">
          These are the key skills required by high-paying roles in your target category that you can add to your toolkit:
        </p>

        {skillGaps.length === 0 ? (
          <p className="text-sm text-slate-500 italic">No major skill gaps identified! You have strong alignment with target roles.</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {skillGaps.map((gap, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm font-medium shadow-2xs"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>{gap}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center space-x-2">
          <BookOpen className="w-6 h-6 text-emerald-600" />
          <span>Recommended Courses to Close Gaps</span>
        </h3>
        <p className="text-sm text-slate-600 mb-6">
          Enroll in these curated courses to master new skills, earn certifications, and boost your employability across Pakistan.
        </p>
      </div>

      {mappedCourses.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-slate-500">No specific course recommendations generated for this profile yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mappedCourses.map((course) => (
            <div
              key={course.course_id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200">
                    {course.provider}
                  </span>
                  <span className="px-2.5 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-800">
                    {course.cost_pkr === 'Free' ? 'Free' : `PKR ${course.cost_pkr}`}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-slate-900 mb-2">{course.title}</h4>
                <p className="text-xs text-slate-600 mb-4 line-clamp-3">{course.description}</p>

                <div className="bg-emerald-50/70 border-l-2 border-emerald-600 p-3 rounded-r-lg mb-4">
                  <p className="text-xs font-semibold text-emerald-900">
                    💡 Why recommended: {course.why_recommended}
                  </p>
                </div>

                <div className="flex items-center space-x-4 text-xs text-slate-500 mb-4">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{course.duration_weeks} Weeks Duration</span>
                  </span>
                  <span>•</span>
                  <span>{course.format}</span>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-slate-500 mb-1.5">Skills Covered:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {course.skills_covered.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">Course ID: {course.course_id}</span>
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(course.title + ' ' + course.provider)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex items-center space-x-1"
                >
                  <span>Enroll / Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
