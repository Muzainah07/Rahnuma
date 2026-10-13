import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const { email, code } = await req.json();

    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const data = await resend.emails.send({
        from: 'Rahnuma Security <onboarding@resend.dev>', // Free testing sender or your verified domain
        to: [email],
        subject: 'Your Rahnuma Security Verification Code',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #5c1d2d;">Rahnuma Career Navigator</h2>
            <p>Hello,</p>
            <p>Your secure 6-digit confirmation code for signing into Rahnuma is:</p>
            <div style="font-size: 28px; font-weight: bold; color: #5c1d2d; background: #fcfaf7; padding: 12px 24px; display: inline-block; border-radius: 8px; border: 1px solid #d4a373;">
              ${code}
            </div>
            <p style="margin-top: 20px; font-size: 12px; color: #666;">If you did not request this code, please ignore this email.</p>
          </div>
        `
      });

      return NextResponse.json({ 
        success: true, 
        message: `Verification email successfully sent to ${email} via Resend.` 
      });
    } else {
      // Fallback if RESEND_API_KEY is not yet added to env
      console.log(`[Resend Free Tier Not Configured] OTP Code for ${email}: ${code}`);
      return NextResponse.json({ 
        success: true, 
        message: `Verification code generated. (Tip: Add RESEND_API_KEY to your environment variables for live email delivery).` 
      });
    }
  } catch (error) {
    console.error('OTP email dispatch error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
