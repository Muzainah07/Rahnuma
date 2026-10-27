# 🇵🇰 Rahnuma (رهنما) — Women Career & Employment Platform

> **Empowering women across Pakistan and internationally with AI-powered job discovery, ATS resume auditing, passwordless Supabase auth, and AI career mentorship.**

---

## Overview

**Rahnuma** is a full-stack portfolio project that helps women in Pakistan discover remote, hybrid, and flexible job opportunities and improve their applications with AI: ATS resume scoring, tailored cover letters, and a career mentoring chatbot. 

Powered by **Google Gemini AI (Flash Lite)** and **Next.js 15 (App Router)**, Rahnuma bridges the employment gap by analyzing candidate profiles, matching them with live opportunities, auditing resumes against ATS requirements, and providing real-time mentorship.

---

## Key Features

- **Smart Job Discovery & AI Matching**: Real-time Gemini AI job recommendations tailored to skills, education, city, and pay expectations in PKR.
- **ATS Resume Auditor & Cover Letters**: Instant CV scoring out of 100, keyword breakdown, and 3 AI cover letter variants (*Formal, Short, Pakistani Market Style*).
- **AI Career Companion**: 24/7 empathetic mentorship chatbot with full `react-markdown` markdown support for tables, lists, and bold text.
- **Supabase Magic Link Authentication**: Secure passwordless email authentication with instant inbox link verification.
- **Success Stories & Alumni Network**: Searchable placement records of women working at top tech companies, banks, and remote enterprises across Pakistan.
- **Support Ticketing Center**:In-app support ticketing with a passcode-protected admin support inbox (`NEXT_PUBLIC_ADMIN_PASSCODE`) for reviewing and replying to inquiries.
- **Bilingual Support**: Seamless English and Urdu cultural context toggle.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router, Server Actions, API Routes)
- **Styling**: Tailwind CSS & Lucide Icons
- **AI Engine**: Google Gemini API (`@google/genai`)
- **Database & Auth**: Supabase (`@supabase/supabase-js`)
- **Email Delivery**: Resend REST API (`https://api.resend.com/emails`)
- **Markdown**: `react-markdown`

---

## Known Limitations & Future Work

- **Admin Access Control**: The current version uses an environment variable (`NEXT_PUBLIC_ADMIN_PASSCODE`) for lightweight admin access. Full production scaling would implement Supabase Auth Role-Based Access Control (RBAC) with Row-Level Security (RLS).
- **AI API Rate Limiting**: Client requests to Gemini AI endpoints currently do not enforce rate limiting; IP-based rate limiting is planned for future iterations.
- **Automated Testing**: Unit and end-to-end (E2E) test suites (Jest/Playwright) are not yet implemented..
## Local Development & Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Muzainah07/Rahnuma.git
   cd Rahnuma
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your API keys:
   ```env
   GEMINI_API_KEY="your_google_gemini_api_key_here"
   NEXT_PUBLIC_SUPABASE_URL="your_supabase_project_url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"
   RESEND_API_KEY="re_your_resend_api_key_here"
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment on Vercel

1. Push your repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Set the Framework Preset to **Next.js** and Build Command to `npm run build`.
4. Add your Environment Variables (`GEMINI_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `RESEND_API_KEY`) under Vercel Settings.
5. Click **Deploy**!

---


