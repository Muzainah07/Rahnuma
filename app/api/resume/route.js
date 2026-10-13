import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'GEMINI_API_KEY is missing.' },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });
    const { action, resumeText, jobTitle, jobDescription, userSkills } = await req.json();

    if (action === 'ats_score') {
      const prompt = `
You are an expert ATS (Applicant Tracking System) and career recruiter for the Pakistani job market.
Analyze the following resume text against the target job title "${jobTitle || 'General Professional Role'}" and skills [${(userSkills || []).join(', ')}].

RESUME TEXT:
${resumeText}

Return ONLY valid JSON in the following format:
{
  "ats_score": 78,
  "keyword_match_percentage": 82,
  "strengths": ["Strength 1", "Strength 2"],
  "missing_keywords": ["Keyword 1", "Keyword 2"],
  "formatting_tips": ["Tip 1", "Tip 2"],
  "summary_feedback": "..."
}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash-lite',
        contents: prompt,
        config: { responseMimeType: 'application/json', temperature: 0.2 }
      });

      const text = response.text || '{}';
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return NextResponse.json({ success: true, data: JSON.parse(cleaned) });
    }

    if (action === 'cover_letter') {
      const prompt = `
Write a professional, compelling cover letter for the job "${jobTitle}" at company "${jobDescription || 'Leading Firm'}".
User profile skills: ${(userSkills || []).join(', ')}.
Provide three variants in JSON format:
{
  "formal": "...",
  "short": "...",
  "pakistani_market_style": "..."
}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash-lite',
        contents: prompt,
        config: { responseMimeType: 'application/json', temperature: 0.4 }
      });

      const text = response.text || '{}';
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return NextResponse.json({ success: true, data: JSON.parse(cleaned) });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Resume API error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
