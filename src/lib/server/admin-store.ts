import { promises as fs } from 'fs';
import path from 'path';
import { PRODUCTS } from '@/lib/data/products';
import type { Product } from '@/types';

const STORAGE_PATH = path.join(process.cwd(), 'src', 'data', 'catalog-store.json');

async function ensureStore() {
  const directory = path.dirname(STORAGE_PATH);
  await fs.mkdir(directory, { recursive: true });

  try {
    await fs.access(STORAGE_PATH);
  } catch {
    await fs.writeFile(STORAGE_PATH, JSON.stringify(PRODUCTS, null, 2), 'utf8');
  }
}

export async function readCatalogStore(): Promise<Product[]> {
  await ensureStore();

  try {
    const file = await fs.readFile(STORAGE_PATH, 'utf8');
    const parsed = JSON.parse(file) as Product[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : PRODUCTS;
  } catch {
    return PRODUCTS;
  }
}

export async function writeCatalogStore(products: Product[]) {
  await ensureStore();
  await fs.writeFile(STORAGE_PATH, JSON.stringify(products, null, 2), 'utf8');
  return products;
}

export async function upsertProduct(input: Partial<Product> & Pick<Product, 'name' | 'price' | 'category' | 'currency'>): Promise<Product[]> {
  const current = await readCatalogStore();
  const slug = input.slug ?? input.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const payload: Product = {
    id: input.id ?? `prod-${Date.now()}`,
    slug,
    name: input.name,
    category: input.category,
    price: input.price,
    currency: input.currency ?? 'INR',
    description: input.description ?? 'Premium footwear crafted for everyday performance.',
    shortDescription: input.shortDescription ?? 'Premium product',
    images: input.images ?? PRODUCTS[0].images,
    colors: input.colors ?? PRODUCTS[0].colors,
    sizes: input.sizes ?? PRODUCTS[0].sizes,
    features: input.features ?? ['Built for performance'],
    specifications: input.specifications ?? [],
    reviews: input.reviews ?? [],
    rating: input.rating ?? 4.7,
    reviewCount: input.reviewCount ?? 0,
    stock: input.stock ?? 20,
    isNew: input.isNew ?? true,
    isBestSeller: input.isBestSeller ?? false,
    isFeatured: input.isFeatured ?? false,
    tags: input.tags ?? [input.category],
    createdAt: input.createdAt ?? new Date().toISOString().slice(0, 10),
    comparePrice: input.comparePrice,
  };

  const next = current.some(product => product.slug === slug)
    ? current.map(product => product.slug === slug ? payload : product)
    : [...current, payload];

  await writeCatalogStore(next);
  return next;
}

export async function deleteProductBySlug(slug: string): Promise<Product[]> {
  const current = await readCatalogStore();
  const next = current.filter(product => product.slug !== slug);
  await writeCatalogStore(next);
  return next;
}
