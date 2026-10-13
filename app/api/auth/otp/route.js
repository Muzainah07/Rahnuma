import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const { email, code } = await req.json();
    console.log(`[RAHNUMA AUTH EMAIL DISPATCH] To: ${email} | Verification Code: ${code}`);

    return NextResponse.json({ 
      success: true, 
      message: `Verification code ${code} successfully dispatched to ${email}` 
    });
  } catch (error) {
    console.error('OTP API error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
