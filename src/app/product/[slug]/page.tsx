import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { formatPrice } from '@/lib/data/products';
import { getCatalogProductBySlug, getCatalogProducts } from '@/lib/server/catalog';
import { ProductDetailClient } from '@/components/product/ProductDetailClient';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getCatalogProducts();
  return products.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getCatalogProductBySlug(slug);
  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.name} — ${formatPrice(product.price)}`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | RNT FOOTWEAR`,
      description: product.shortDescription,
      images: [{ url: product.images[0], width: 800, height: 600, alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getCatalogProductBySlug(slug);
  if (!product) notFound();

  const catalog = await getCatalogProducts();
  const related = catalog
    .filter(item => item.id !== product.id && item.category === product.category)
    .slice(0, 4);

  return (
    <>
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.description,
            image: product.images,
            offers: {
              '@type': 'Offer',
              price: product.price,
              priceCurrency: 'INR',
              availability: product.stock > 0
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: product.rating,
              reviewCount: product.reviewCount,
            },
          }),
        }}
      />
      <ProductDetailClient product={product} related={related} />
    </>
  );
}
