import { NextRequest, NextResponse } from 'next/server';
import { authenticateAdmin, signSessionToken, COOKIE_NAME } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Please provide both email and password' },
        { status: 400 }
      );
    }

    const isValid = await authenticateAdmin(email, password);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid administrative credentials' },
        { status: 401 }
      );
    }

    const token = signSessionToken({ email });

    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      user: { email, role: 'admin' },
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Authentication failed', error: error.message },
      { status: 500 }
    );
  }
}
