import { NextResponse } from 'next/server';
import { getCatalogProducts } from '@/lib/server/catalog';

export async function GET() {
  const products = await getCatalogProducts();

  return NextResponse.json(
    {
      products,
      total: products.length,
      generatedAt: new Date().toISOString(),
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    },
  );
}
