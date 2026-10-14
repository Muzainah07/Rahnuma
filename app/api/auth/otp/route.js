import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const { email, code } = await req.json();
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: 'Rahnuma <onboarding@resend.dev>',
        to: [email],
        subject: 'Your Rahnuma Security Verification Code',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 24px; color: #333; max-width: 600px; margin: 0 auto; background: #fcfaf7; border-radius: 12px; border: 1px solid #d4a373;">
            <h2 style="color: #5c1d2d; margin-top: 0;">Rahnuma Career Navigator</h2>
            <p>Hello,</p>
            <p>Your secure 6-digit confirmation code for signing into Rahnuma is:</p>
            <div style="font-size: 32px; font-weight: bold; color: #5c1d2d; background: #ffffff; padding: 16px 24px; text-align: center; border-radius: 8px; border: 1px solid #d4a373; letter-spacing: 6px; margin: 20px 0;">
              ${code}
            </div>
            <p style="font-size: 13px; color: #666;">If you did not request this code, please ignore this email.</p>
          </div>
        `
      });
    } else {
      console.log(`[Email Dispatch Simulation] To: ${email} | Code: ${code}`);
    }

    return NextResponse.json({ success: true, message: `Email sent to ${email}` });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
