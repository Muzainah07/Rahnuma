import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const { email, code } = await req.json();

    // In a production app, this connects to Resend, SendGrid, or SMTP (Nodemailer)
    // to send a formal HTML email containing the 6-digit verification code to the user's inbox.
    console.log('========================================');
    console.log(`[RAHNUMA SECURE EMAIL DISPATCH]`);
    console.log(`Recipient: ${email}`);
    console.log(`Subject: Your Rahnuma Security Verification Code`);
    console.log(`Body: Hello, your 6-digit confirmation code is: ${code}. Please enter this code to sign in.`);
    console.log('========================================');

    return NextResponse.json({ 
      success: true, 
      message: `A formal verification email containing your 6-digit code has been successfully sent to ${email}.` 
    });
  } catch (error) {
    console.error('OTP email dispatch error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
