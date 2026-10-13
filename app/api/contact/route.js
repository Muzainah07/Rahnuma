import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

global.supportTickets = global.supportTickets || [];

export async function GET() {
  return NextResponse.json({ success: true, tickets: global.supportTickets });
}

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
    const { name, email, subject, message } = await req.json();

    const ticketId = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
    const newTicket = {
      id: ticketId,
      name,
      email,
      subject,
      message,
      status: 'Open',
      created_at: new Date().toLocaleString()
    };

    global.supportTickets.unshift(newTicket);

    const prompt = `
You are Rahnuma Support Assistant, an official support agent for Rahnuma Women Career Navigator Pakistan.
A user has submitted a support query or contact message.
Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}
Ticket ID: ${ticketId}

Generate a polite, professional, and empathetic support acknowledgment message in English confirming that their ticket has been received and our team will respond to ${email} within 24 hours.

Return ONLY valid JSON in the following format:
{
  "ticket_id": "${ticketId}",
  "acknowledgment_message": "..."
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: prompt,
      config: { responseMimeType: 'application/json', temperature: 0.3 }
    });

    const text = response.text || '{}';
    const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const ticketData = JSON.parse(cleaned);

    // Send real email via Resend if API key is configured
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: 'Rahnuma Support <onboarding@resend.dev>',
        to: [email],
        subject: `Support Ticket Received: ${ticketData.ticket_id} (${subject})`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #5c1d2d;">Rahnuma Support Center</h2>
            <p>Dear ${name},</p>
            <p>${ticketData.acknowledgment_message}</p>
            <div style="background: #fcfaf7; padding: 12px 16px; border-radius: 8px; border: 1px solid #d4a373; margin-top: 15px;">
              <strong>Ticket ID:</strong> ${ticketData.ticket_id}<br/>
              <strong>Subject:</strong> ${subject}
            </div>
          </div>
        `
      });
    }

    return NextResponse.json({ success: true, data: ticketData });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
