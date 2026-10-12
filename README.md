# 🇵🇰 Rahnuma: Women Career & Skill Navigator Pakistan

> **Empowering women across Pakistan with AI-powered career matching, skill gap roadmaps, ATS resume scoring, and mentor guidance.**

---

## 🌟 Overview

Many women in Pakistan struggle to find suitable jobs and training programs. Job listings are often long, requirements are unclear, and candidates lack guidance on which skills to learn next. 

**Rahnuma** bridges this gap using Google's advanced **Gemini AI (Flash Lite)** to analyze professional profiles, match users with over 90+ verified job opportunities across Karachi, Lahore, Islamabad, Faisalabad, and Remote work, identify critical skill gaps, and recommend 37+ certified training courses from DigiSkills, Coursera, PNY, and Saylani.

---

## 🚀 Key Features

- **✨ AI Career Matching**: Instantly matches user profiles against 90 verified jobs with tailored explanations.
- **📚 Skill Gap Analysis & Roadmap**: Identifies missing skills and suggests specific training courses (with duration, provider, and PKR cost).
- **📄 AI Resume ATS Auditor**: Scores resumes out of 100, detects missing keywords, and provides actionable recruiter feedback.
- **✉️ AI Cover Letter Generator**: Instantly generates tailored cover letter variants (*Formal*, *Short*, and *Pakistani Market Style*).
- **📊 Personal Career Dashboard**: Tracks saved jobs, application history, skill growth score, and weekly career goals.
- **🤝 Community & Mentorship**: Book 1-on-1 virtual sessions with women mentors and read inspiring Pakistani success stories.
- **🌐 Bilingual Experience**: Toggle between English and Urdu cultural contexts.
- **🛠️ Admin Panel**: Manage job listings, courses, and sample profiles.

---

## 🛠️ Local Development & Installation

To run **Rahnuma** locally in your **VS Code** environment:

1. **Clone or Download the Project**:
   ```bash
   cd rahnuma
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your Google Gemini API key:
   ```env
   GEMINI_API_KEY="your_gemini_api_key_here"
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Connecting Supabase (Optional Database & Auth Integration)

If you wish to scale **Rahnuma** from a localStorage-backed app to a production-grade cloud application using **Supabase**, follow these steps:

### 1. Install Supabase Client
```bash
npm install @supabase/supabase-js
```

### 2. Add Supabase Credentials to `.env`
```env
NEXT_PUBLIC_SUPABASE_URL="https://your-supabase-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

### 3. Supabase SQL Schema Setup
Run the following SQL query in your **Supabase SQL Editor** to set up the necessary tables:

```sql
-- Profiles Table
create table public.profiles (
  id uuid references auth.users not null primary key,
  full_name text,
  city text,
  education text,
  skills text[],
  career_goal text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Saved Jobs Table
create table public.saved_jobs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  job_id text not null,
  job_title text not null,
  company text,
  salary text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Applications Table
create table public.applications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  job_id text not null,
  job_title text not null,
  company text,
  status text default 'Under Review',
  applied_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.saved_jobs enable row level security;
alter table public.applications enable row level security;

create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can view own saved jobs" on public.saved_jobs for select using (auth.uid() = user_id);
create policy "Users can insert own saved jobs" on public.saved_jobs for insert with check (auth.uid() = user_id);
create policy "Users can delete own saved jobs" on public.saved_jobs for delete using (auth.uid() = user_id);
```

---

## 🏛️ Tech Stack

- **Framework**: Next.js 15+ (App Router) / React / Pure JavaScript (JSX)
- **Styling**: Tailwind CSS & Lucide Icons
- **AI Engine**: Google Gemini API (`gemini-3.5-flash-lite`) via `@google/genai`
- **Datasets**: 90 verified Pakistani jobs, 37 courses, and 6 sample profiles (`.csv` and `.json`)

---

## 📜 License

Built with ❤️ for women empowerment in Pakistan. Open source under the MIT License.
