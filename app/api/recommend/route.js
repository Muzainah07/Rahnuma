import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'GEMINI_API_KEY is missing. Please add GEMINI_API_KEY to your .env file.' 
        },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const body = await req.json();
    const { profileText, structuredProfile } = body;

    const userProfileDescription = profileText 
      ? profileText 
      : JSON.stringify(structuredProfile, null, 2);

    const prompt = `
You are an expert career counselor and AI employment advisor specializing in empowering women in Pakistan.
The user has submitted their profile, education, skills, preferred work mode (remote/hybrid/on-site), city, and pay expectations.

USER PROFILE:
${userProfileDescription}

INSTRUCTIONS:
1. Dynamically generate 6 highly tailored, realistic job opportunities in Pakistan (spanning cities like Lahore, Karachi, Islamabad, Faisalabad, or Remote) that match the user's education, skills, work mode, and pay expectations.
2. For each recommended job, provide:
   - job_id: A unique code (e.g. "JOB-01", "JOB-02")
   - title: Job title
   - category: Job category (e.g., Software & Tech, Content, Marketing, Finance, Healthcare)
   - location: City or Remote
   - job_type: Full-time / Part-time / Remote
   - company: A realistic company name in Pakistan or international remote employer
   - salary_pkr: Estimated monthly salary range in PKR (e.g. "50,000 - 75,000")
   - match_score: Integer between 70 and 98
   - required_skills: Array of 3-4 required skills
   - explanation: A warm, encouraging 2-3 sentence explanation of why this job matches her profile, skills, and pay expectations.
3. Identify 3-4 key skill gaps (skills she needs to learn to advance further in her target field).
4. Dynamically generate 4 certified online/hybrid courses (e.g., from DigiSkills, Coursera, PNY, Saylani, Google) that directly close those skill gaps.
   - For each course, provide: course_id, title, provider, duration_weeks, cost_pkr, skills_covered (array), and why_recommended (1 sentence).
5. Provide an encouraging, personalized career advice summary for her journey in Pakistan.

Return ONLY valid JSON in the following format:
{
  "recommended_jobs": [
    {
      "job_id": "JOB-01",
      "title": "...",
      "category": "...",
      "location": "...",
      "job_type": "...",
      "company": "...",
      "salary_pkr": "...",
      "match_score": 92,
      "required_skills": ["Skill 1", "Skill 2"],
      "explanation": "..."
    }
  ],
  "skill_gaps": ["Gap 1", "Gap 2"],
  "recommended_courses": [
    {
      "course_id": "CRS-01",
      "title": "...",
      "provider": "...",
      "duration_weeks": 6,
      "cost_pkr": "Free",
      "skills_covered": ["Skill 1"],
      "why_recommended": "..."
    }
  ],
  "career_advice": "..."
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.3,
      }
    });

    const text = response.text || '{}';
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const data = JSON.parse(cleanedText);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error in recommend API:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to generate recommendations' },
      { status: 500 }
    );
  }
}
