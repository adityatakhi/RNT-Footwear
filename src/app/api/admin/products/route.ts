import { NextResponse } from 'next/server';
import { deleteProductBySlug, readCatalogStore, upsertProduct } from '@/lib/server/admin-store';
import { getSessionUser } from '@/lib/server/auth';

async function requireAdminAccess() {
  const user = await getSessionUser();
  if (!user || user.role !== 'admin') {
    return null;
  }

  return user;
}

export async function GET() {
  const admin = await requireAdminAccess();
  if (!admin) {
    return NextResponse.json({ error: 'Admin access required.' }, { status: 403 });
  }

  const products = await readCatalogStore();
  return NextResponse.json({ products, total: products.length });
}

export async function POST(request: Request) {
  const admin = await requireAdminAccess();
  if (!admin) {
    return NextResponse.json({ error: 'Admin access required.' }, { status: 403 });
  }

  const payload = await request.json();
  const products = await upsertProduct(payload);

  return NextResponse.json({
    message: 'Product saved successfully',
    product: products.at(-1),
    total: products.length,
  });
}

export async function DELETE(request: Request) {
  const admin = await requireAdminAccess();
  if (!admin) {
    return NextResponse.json({ error: 'Admin access required.' }, { status: 403 });
  }

  const payload = await request.json();
  const slug = String(payload?.slug ?? '');

  if (!slug) {
    return NextResponse.json({ error: 'Product slug is required' }, { status: 400 });
  }

  const products = await deleteProductBySlug(slug);
  return NextResponse.json({ message: 'Product deleted successfully', total: products.length });
}
