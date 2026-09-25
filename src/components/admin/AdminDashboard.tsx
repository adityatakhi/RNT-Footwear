'use client';

import Link from 'next/link';
import { useState } from 'react';
import { formatPrice } from '@/lib/data/products';
import type { Product } from '@/types';

const DEFAULT_PRODUCT_IMAGES = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
];

interface AdminStats {
  totalProducts: number;
  inventory: number;
  averageRating: number;
  bestSellers: number;
  lowStock: number;
  activeCategories: number;
  updatedAt: string;
}

interface AdminDashboardProps {
  summary: AdminStats;
  products: Product[];
}

export function AdminDashboard({ summary, products }: AdminDashboardProps) {
  const [inventory, setInventory] = useState(products);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: '',
    category: 'running',
    price: '2999',
    stock: '20',
    shortDescription: '',
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) {
      setUploadedImages([]);
      return;
    }

    const imageUrls = await Promise.all(
      files.map(
        file => new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result ?? ''));
          reader.onerror = () => reject(new Error('Unable to read image file.'));
          reader.readAsDataURL(file);
        }),
      ),
    );

    setUploadedImages(imageUrls.filter(Boolean));
  };
  const metrics = [
    { label: 'Products', value: summary.totalProducts.toString() },
    { label: 'Inventory', value: summary.inventory.toString() },
    { label: 'Avg rating', value: `${summary.averageRating}/5` },
    { label: 'Low stock', value: summary.lowStock.toString() },
  ];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);

    const payload = {
      name: form.name,
      category: form.category,
      price: Number(form.price),
      stock: Number(form.stock),
      currency: 'INR',
      description: form.shortDescription || 'Premium footwear built for performance and everyday wear.',
      shortDescription: form.shortDescription || 'New product added from admin panel.',
      images: uploadedImages.length ? uploadedImages : DEFAULT_PRODUCT_IMAGES,
      colors: [
        { name: 'Obsidian', hex: '#1C1C1C', slug: 'obsidian' },
        { name: 'Arctic White', hex: '#F0EFEB', slug: 'arctic-white' },
      ],
      sizes: [
        { uk: 6, us: 7, eu: 39, available: true },
        { uk: 7, us: 8, eu: 40, available: true },
        { uk: 8, us: 9, eu: 41, available: true },
      ],
      features: ['Admin managed product', 'Performance built'],
      specifications: [{ label: 'Status', value: 'Live catalog sync' }],
      rating: 4.8,
      reviewCount: 0,
      tags: [form.category],
      isNew: true,
      isBestSeller: false,
      isFeatured: false,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    const response = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const refreshed = await fetch('/api/admin/products');
      const nextData = await refreshed.json();
      setInventory(nextData.products);
      setForm({ name: '', category: 'running', price: '2999', stock: '20', shortDescription: '' });
      setUploadedImages([]);
    }

    setIsSaving(false);
  };

  const handleDeleteProduct = async (slug: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    const response = await fetch('/api/admin/products', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    });

    if (response.ok) {
      const refreshed = await fetch('/api/admin/products');
      const nextData = await refreshed.json();
      setInventory(nextData.products);
    }
  };

  return (
    <section className="section-padding" style={{ paddingTop: '7rem' }}>
      <div className="container-rnt">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <div>
            <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>Operations</p>
            <h1 className="display-md" style={{ color: '#F5F7F8' }}>Admin dashboard</h1>
          </div>
          <Link href="/shop" className="btn-outline">View storefront</Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {metrics.map(metric => (
            <div key={metric.label} style={{ backgroundColor: '#101418', border: '1px solid #283038', borderRadius: '1rem', padding: '1.25rem' }}>
              <p style={{ color: '#9AA3AB', marginBottom: '0.5rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{metric.label}</p>
              <strong style={{ fontSize: '2rem', color: '#F5F7F8' }}>{metric.value}</strong>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div style={{ backgroundColor: '#101418', border: '1px solid #283038', borderRadius: '1rem', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ color: '#F5F7F8', fontSize: '1.1rem' }}>Catalog status</h2>
              <span style={{ color: '#C8FF00', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Synced</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'grid', gap: '0.75rem', color: '#9AA3AB' }}>
              <li>Categories live: <strong style={{ color: '#F5F7F8' }}>{summary.activeCategories}</strong></li>
              <li>Best sellers flagged: <strong style={{ color: '#F5F7F8' }}>{summary.bestSellers}</strong></li>
              <li>Last cache refresh: <strong style={{ color: '#F5F7F8' }}>{new Date(summary.updatedAt).toLocaleString('en-IN')}</strong></li>
            </ul>
          </div>

          <div style={{ backgroundColor: '#101418', border: '1px solid #283038', borderRadius: '1rem', padding: '1.5rem' }}>
            <h2 style={{ color: '#F5F7F8', fontSize: '1.1rem', marginBottom: '1rem' }}>Quick actions</h2>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <a href="/api/products" className="btn-outline" style={{ justifyContent: 'center' }}>Open product API</a>
              <a href="/api/admin/products" className="btn-outline" style={{ justifyContent: 'center' }}>Open admin API</a>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#101418', border: '1px solid #283038', borderRadius: '1rem', padding: '1.25rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5F7F8', marginBottom: '1rem' }}>Create product</h2>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            <input value={form.name} onChange={event => setForm(current => ({ ...current, name: event.target.value }))} placeholder="Product name" style={inputStyle} required />
            <select value={form.category} onChange={event => setForm(current => ({ ...current, category: event.target.value }))} style={inputStyle}>
              <option value="running">Running</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="training">Training</option>
              <option value="casual">Casual</option>
              <option value="basketball">Basketball</option>
              <option value="outdoor">Outdoor</option>
            </select>
            <input type="number" value={form.price} onChange={event => setForm(current => ({ ...current, price: event.target.value }))} placeholder="Price" style={inputStyle} required />
            <input type="number" value={form.stock} onChange={event => setForm(current => ({ ...current, stock: event.target.value }))} placeholder="Stock" style={inputStyle} required />
            <div style={{ gridColumn: '1 / -1', display: 'grid', gap: '0.6rem' }}>
              <label style={{ color: '#9AA3AB', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Product image</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                style={{
                  ...inputStyle,
                  padding: '0.8rem 0.85rem',
                  cursor: 'pointer',
                }}
              />
              {uploadedImages.length > 0 && (
                <span style={{ color: '#C8FF00', fontSize: '0.75rem' }}>
                  {uploadedImages.length} image(s) selected and ready to save
                </span>
              )}
            </div>
            <input value={form.shortDescription} onChange={event => setForm(current => ({ ...current, shortDescription: event.target.value }))} placeholder="Short description" style={{ ...inputStyle, gridColumn: '1 / -1' }} required />
            <button type="submit" className="btn-primary" disabled={isSaving} style={{ justifySelf: 'start', opacity: isSaving ? 0.7 : 1 }}>
              {isSaving ? 'Saving...' : 'Save product'}
            </button>
          </form>
        </div>

        <div style={{ backgroundColor: '#101418', border: '1px solid #283038', borderRadius: '1rem', overflow: 'hidden' }}>
          <div style={{ padding: '1.1rem 1.25rem', borderBottom: '1px solid #283038' }}>
            <h2 style={{ color: '#F5F7F8' }}>Product inventory</h2>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '720px' }}>
              <thead>
                <tr style={{ backgroundColor: '#0d1217' }}>
                  <th style={{ textAlign: 'left', padding: '0.9rem 1rem', color: '#9AA3AB' }}>Product</th>
                  <th style={{ textAlign: 'left', padding: '0.9rem 1rem', color: '#9AA3AB' }}>Category</th>
                  <th style={{ textAlign: 'left', padding: '0.9rem 1rem', color: '#9AA3AB' }}>Price</th>
                  <th style={{ textAlign: 'left', padding: '0.9rem 1rem', color: '#9AA3AB' }}>Stock</th>
                  <th style={{ textAlign: 'left', padding: '0.9rem 1rem', color: '#9AA3AB' }}>Rating</th>
                  <th style={{ textAlign: 'left', padding: '0.9rem 1rem', color: '#9AA3AB' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map(product => (
                  <tr key={product.id} style={{ borderTop: '1px solid #1c242c' }}>
                    <td style={{ padding: '0.95rem 1rem', color: '#F5F7F8' }}>{product.name}</td>
                    <td style={{ padding: '0.95rem 1rem', color: '#9AA3AB', textTransform: 'capitalize' }}>{product.category}</td>
                    <td style={{ padding: '0.95rem 1rem', color: '#F5F7F8' }}>{formatPrice(product.price)}</td>
                    <td style={{ padding: '0.95rem 1rem', color: product.stock < 10 ? '#F7B267' : '#F5F7F8' }}>{product.stock}</td>
                    <td style={{ padding: '0.95rem 1rem', color: '#F5F7F8' }}>{product.rating.toFixed(1)}</td>
                    <td style={{ padding: '0.95rem 1rem' }}>
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(product.slug)}
                        style={{
                          backgroundColor: 'rgba(239, 68, 68, 0.1)',
                          color: '#FCA5A5',
                          border: '1px solid rgba(239,68,68,0.35)',
                          borderRadius: '999px',
                          padding: '0.45rem 0.75rem',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#0d1217',
  border: '1px solid #283038',
  borderRadius: '0.75rem',
  color: '#F5F7F8',
  padding: '0.85rem 1rem',
  outline: 'none',
};
