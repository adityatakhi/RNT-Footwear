import { NextResponse } from 'next/server';
import { registerUser, setSessionCookie, toPublicUser } from '@/lib/server/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = await registerUser({
      username: String(body?.username ?? ''),
      email: body?.email ? String(body.email) : undefined,
      password: String(body?.password ?? ''),
    });

    const response = NextResponse.json({
      user: toPublicUser(user),
      message: 'Account created successfully.',
    });

    setSessionCookie(response, user);
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create account.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
