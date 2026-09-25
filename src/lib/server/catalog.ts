import { unstable_cache } from 'next/cache';
import { PRODUCTS } from '@/lib/data/products';
import { readCatalogStore } from '@/lib/server/admin-store';
import type { Product, ProductCategory } from '@/types';

const getProductCatalog = unstable_cache(
  async (): Promise<Product[]> => PRODUCTS,
  ['rnt-product-catalog'],
  {
    revalidate: 3600,
    tags: ['products'],
  },
);

export async function getCatalogProducts(): Promise<Product[]> {
  const persistedProducts = await readCatalogStore();
  if (persistedProducts.length > 0) {
    return persistedProducts;
  }

  return getProductCatalog();
}

export async function getCatalogProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getCatalogProducts();
  return products.find(product => product.slug === slug);
}

export async function getCatalogProductsByCategory(category: ProductCategory): Promise<Product[]> {
  const products = await getCatalogProducts();
  return products.filter(product => product.category === category);
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const products = await getCatalogProducts();
  return products.filter(product => product.isFeatured || product.isBestSeller).slice(0, limit);
}

export async function getAdminOverview() {
  const products = await getCatalogProducts();
  const inventory = products.reduce((total, product) => total + product.stock, 0);
  const averageRating = products.reduce((total, product) => total + product.rating, 0) / products.length || 0;
  const bestSellers = products.filter(product => product.isBestSeller).length;
  const lowStock = products.filter(product => product.stock < 10).length;
  const activeCategories = new Set(products.map(product => product.category)).size;

  return {
    totalProducts: products.length,
    inventory,
    averageRating: Number(averageRating.toFixed(2)),
    bestSellers,
    lowStock,
    activeCategories,
    updatedAt: new Date().toISOString(),
  };
}
