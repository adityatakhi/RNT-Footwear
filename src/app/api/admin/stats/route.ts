import { NextResponse } from 'next/server';
import { getAdminOverview } from '@/lib/server/catalog';
import { getSessionUser } from '@/lib/server/auth';

export async function GET() {
  const user = await getSessionUser();

  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Admin access required.' }, { status: 403 });
  }

  const summary = await getAdminOverview();
  return NextResponse.json(summary);
}
