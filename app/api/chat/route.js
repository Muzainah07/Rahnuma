import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'GEMINI_API_KEY is missing. Please make sure you created a .env file in your project root with GEMINI_API_KEY="your_api_key" and restarted your server (use "npm run dev").' 
        },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const { messages, userProfile } = await req.json();

    const systemInstruction = `
You are Rahnuma AI, an empathetic, encouraging, and knowledgeable career mentor and employment coach for women in Pakistan. 
You help women navigate job searches, resume building, interview preparation, salary negotiation, balancing family with remote work, and skill development in Pakistan's job market (Karachi, Lahore, Islamabad, Faisalabad, Remote, etc.).
Keep your advice practical, respectful, uplifting, and actionable.
User profile context: ${JSON.stringify(userProfile || {})}
`;

    const chatHistory = messages.map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const chat = ai.chats.create({
      model: 'gemini-3.5-flash-lite',
      config: {
        systemInstruction,
        temperature: 0.7,
      },
      history: chatHistory.length > 1 ? chatHistory.slice(0, -1) : []
    });

    const lastMessage = messages[messages.length - 1]?.content || 'Hello';
    const result = await chat.sendMessage({ message: lastMessage });

    return NextResponse.json({ success: true, reply: result.text });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Chat error' },
      { status: 500 }
    );
  }
}
