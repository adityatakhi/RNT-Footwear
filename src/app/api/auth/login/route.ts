import { NextResponse } from 'next/server';
import { loginUser, setSessionCookie, toPublicUser } from '@/lib/server/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = String(body?.username ?? '');
    const password = String(body?.password ?? '');

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required.' }, { status: 400 });
    }

    const user = await loginUser({ username, password });
    const response = NextResponse.json({
      user: toPublicUser(user),
      message: user.role === 'admin' ? 'Admin login successful.' : 'Login successful.',
    });

    setSessionCookie(response, user);
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to log in.';
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
