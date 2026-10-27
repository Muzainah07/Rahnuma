'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HomeLanding from '@/components/HomeLanding';
import ProfileBuilder from '@/components/ProfileBuilder';
import JobRecommendations from '@/components/JobRecommendations';
import SkillGapRoadmap from '@/components/SkillGapRoadmap';
import BrowseDirectory from '@/components/BrowseDirectory';
import CareerCoachChat from '@/components/CareerCoachChat';
import CareerDashboard from '@/components/CareerDashboard';
import ResumeAnalyzer from '@/components/ResumeAnalyzer';
import CommunityMentors from '@/components/CommunityMentors';
import AuthModal from '@/components/AuthModal';
import ContactModal from '@/components/ContactModal';
import AdminSupportModal from '@/components/AdminSupportModal';
import { Compass, Heart, Mail, MapPin, ArrowLeft, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ClientDashboard({
  initialJobs,
  initialCourses,
  initialSampleProfiles
}) {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendationData, setRecommendationData] = useState(null);
  const [lastProfileSummary, setLastProfileSummary] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAdminSupportOpen, setIsAdminSupportOpen] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [jobsList, setJobsList] = useState(initialJobs);

  const [urduLanguage, setUrduLanguage] = useState(false);

  useEffect(() => {
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setCurrentUser({
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
            email: session.user.email,
            city: session.user.user_metadata?.city || 'Karachi',
            joinedDate: new Date().toLocaleDateString()
          });
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setCurrentUser({
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
            email: session.user.email,
            city: session.user.user_metadata?.city || 'Karachi',
            joinedDate: new Date().toLocaleDateString()
          });
        } else {
          setCurrentUser(null);
        }
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  const handleGenerateRecommendations = async (profileText, structuredData) => {
    setIsLoading(true);
    setLastProfileSummary(structuredData || { text: profileText });
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileText,
          structuredProfile: structuredData
        })
      });
      const json = await res.json();
      if (json.success && json.data) {
        setRecommendationData(json.data);
        setActiveTab('jobs');
      } else {
        alert(json.error || 'Failed to generate recommendations. Please try again.');
      }
    } catch (e) {
      console.error(e);
      alert('Network error while generating recommendations.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveJob = (job) => {
    if (!savedJobs.some(j => j.job_id === job.job_id)) {
      setSavedJobs([...savedJobs, job]);
      alert(`Saved "${job.title}" to your dashboard favorites!`);
    } else {
      alert('Job is already in your saved list.');
    }
  };

  const handleApplyJob = (job) => {
    if (!appliedJobs.some(j => j.job_id === job.job_id)) {
      setAppliedJobs([...appliedJobs, job]);
    }
  };

  const handleRemoveSavedJob = (jobId) => {
    setSavedJobs(savedJobs.filter(j => j.job_id !== jobId));
  };

  const hasResults = !!recommendationData;

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setCurrentUser(null);
    setRecommendationData(null);
    setActiveTab('home');
    alert('Logged out successfully.');
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] text-slate-900 flex flex-col font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasResults={hasResults}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
      />

      <div className="bg-[#5c1d2d] text-[#fbf9f6] py-2 px-4 text-xs font-medium flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <span>🌟 {urduLanguage ? 'رهنما - خواتین کا کیریئر اور اسکل نیویگیٹر پاکستان' : 'Rahnuma - Empowering Women Across Pakistan & Remote Globally'}</span>
          <button
            onClick={() => setUrduLanguage(!urduLanguage)}
            className="px-3 py-1 rounded bg-[#4a1525] hover:bg-[#3b111c] text-white font-bold text-[11px] transition-all"
          >
            {urduLanguage ? 'Switch to English' : 'اردو میں دیکھیے (Urdu)'}
          </button>
        </div>
      </div>

      {activeTab !== 'home' && (
        <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-8 shadow-2xs">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <button
              onClick={() => setActiveTab('home')}
              className="group inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#5c1d2d] text-white text-xs font-bold shadow-xs hover:bg-[#4a1525] transition-all transform hover:-translate-x-0.5"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </button>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Section: <span className="text-[#5c1d2d] font-bold">{activeTab}</span>
            </span>
          </div>
        </div>
      )}

      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeLanding
            onExploreJobs={() => setActiveTab('browse')}
            onSelectJob={() => setActiveTab('browse')}
            onOpenTool={(tool) => setActiveTab(tool)}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileBuilder
            sampleProfiles={initialSampleProfiles}
            onGenerateRecommendations={handleGenerateRecommendations}
            isLoading={isLoading}
            urduLanguage={urduLanguage}
          />
        )}

        {activeTab === 'dashboard' && (
          <CareerDashboard
            savedJobs={savedJobs}
            appliedJobs={appliedJobs}
            onRemoveSavedJob={handleRemoveSavedJob}
          />
        )}

        {activeTab === 'jobs' && recommendationData && (
          <JobRecommendations
            recommendedJobs={recommendationData.recommended_jobs}
            onNavigateToRoadmap={() => setActiveTab('roadmap')}
            onSaveJob={handleSaveJob}
            onApplyJob={handleApplyJob}
          />
        )}

        {activeTab === 'roadmap' && recommendationData && (
          <SkillGapRoadmap
            skillGaps={recommendationData.skill_gaps}
            recommendedCourses={recommendationData.recommended_courses}
            allCourses={initialCourses}
            careerAdvice={recommendationData.career_advice}
            onNavigateToJobs={() => setActiveTab('jobs')}
          />
        )}

        {activeTab === 'resume' && (
          <ResumeAnalyzer
            userSkills={lastProfileSummary?.skills || ['Communication', 'MS Excel', 'Basic Tech']}
          />
        )}

        {activeTab === 'browse' && (
          <BrowseDirectory
            jobs={jobsList}
            courses={initialCourses}
          />
        )}

        {activeTab === 'community' && (
          <CommunityMentors />
        )}

        {activeTab === 'chat' && (
          <CareerCoachChat
            userProfileSummary={lastProfileSummary}
          />
        )}
      </main>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={(user) => {
          setCurrentUser(user);
          alert(`Welcome back, ${user.name}! Signed in successfully.`);
        }}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <AdminSupportModal
        isOpen={isAdminSupportOpen}
        onClose={() => setIsAdminSupportOpen(false)}
      />

      <footer className="bg-[#2b2628] text-slate-300 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#5c1d2d] flex items-center justify-center text-white font-bold shadow-md">
                <Compass className="w-6 h-6 text-[#d4a373]" />
              </div>
              <span className="editorial-heading text-xl font-bold text-white">Rahnuma رهنما</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              A professional women-focused career platform dedicated to verified employment, resume ATS optimization, and career growth across Pakistan and internationally.
            </p>
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>Designed for Professional Excellence</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-wider">Platform & Tools</h4>
            <ul className="space-y-2.5 text-xs">
              <li><button onClick={() => setActiveTab('home')} className="hover:text-[#d4a373] transition-colors">Home Landing</button></li>
              <li><button onClick={() => setActiveTab('browse')} className="hover:text-[#d4a373] transition-colors">Explore Verified Jobs</button></li>
              <li><button onClick={() => setActiveTab('resume')} className="hover:text-[#d4a373] transition-colors">ATS Resume Auditor</button></li>
              <li><button onClick={() => setActiveTab('community')} className="hover:text-[#d4a373] transition-colors">Success Stories</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-wider">Active Career Hubs</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>📍 Karachi (Headquarters & Fintech Hub)</li>
              <li>📍 Lahore (Tech & Software Corridor)</li>
              <li>📍 Islamabad (Remote Work Initiative)</li>
              <li>🌐 Global Remote Opportunities</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-wider">Support & Help</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><button onClick={() => setIsContactOpen(true)} className="hover:text-[#d4a373] transition-colors flex items-center space-x-1.5"><Mail className="w-3.5 h-3.5 text-[#d4a373]" /><span>Open Support Ticket</span></button></li>
              <li><button onClick={() => setIsAdminSupportOpen(true)} className="hover:text-[#d4a373] transition-colors flex items-center space-x-1.5 text-slate-500 hover:text-slate-400"><ShieldCheck className="w-3.5 h-3.5" /><span>Admin Support Login</span></button></li>
              <li className="flex items-center space-x-2"><MapPin className="w-3.5 h-3.5 text-[#d4a373]" /><span>Karachi / Lahore, Pakistan</span></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© 2026 Rahnuma Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
