'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useMemo, useEffect, Suspense } from 'react';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { CATEGORIES, formatPrice } from '@/lib/data/products';
import { useWishlistStore } from '@/lib/store/wishlist';
import type { Product, ProductCategory, SortOption } from '@/types';

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Featured', value: 'featured' },
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Top Rated', value: 'rating' },
];

const SIZE_OPTIONS = [6, 7, 8, 9, 10, 11, 12];
const PRICE_MAX = 12000;

export default function ShopPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', backgroundColor: '#080A0C', paddingTop: '6rem' }} /> }>
      <ShopPageContent />
    </Suspense>
  );
}

function ShopPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const wishlistIds = useWishlistStore(state => state.ids);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('search') ?? '');
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [priceMax, setPriceMax] = useState(PRICE_MAX);
  const [sort, setSort] = useState<SortOption>('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const nextSearch = searchParams.get('search') ?? '';
    setSearchQuery(nextSearch);
  }, [searchParams]);

  useEffect(() => {
    let active = true;

    const loadProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        if (active) {
          setProducts(data.products ?? []);
        }
      } catch {
        if (active) {
          setProducts([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadProducts();
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    let nextProducts = [...products];
    const isWishlistOnly = searchParams.get('wishlist') === '1';

    if (isWishlistOnly) {
      nextProducts = nextProducts.filter(p => wishlistIds.includes(p.id));
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      nextProducts = nextProducts.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q)) ||
        p.category.includes(q)
      );
    }

    if (selectedCategories.length > 0) {
      nextProducts = nextProducts.filter(p => selectedCategories.includes(p.category));
    }

    if (selectedSizes.length > 0) {
      nextProducts = nextProducts.filter(p =>
        p.sizes.some(s => selectedSizes.includes(s.uk) && s.available)
      );
    }

    nextProducts = nextProducts.filter(p => p.price <= priceMax);

    switch (sort) {
      case 'newest':
        nextProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'price-asc':
        nextProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        nextProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        nextProducts.sort((a, b) => b.rating - a.rating);
        break;
    }

    return nextProducts;
  }, [products, searchQuery, selectedCategories, selectedSizes, priceMax, sort, searchParams, wishlistIds]);

  const toggleCategory = (cat: ProductCategory) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleSize = (size: number) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedSizes([]);
    setPriceMax(PRICE_MAX);
    setSort('featured');
  };

  const hasFilters = searchQuery || selectedCategories.length > 0 || selectedSizes.length > 0 || priceMax < PRICE_MAX;

  return (
    <div style={{ backgroundColor: '#080A0C', minHeight: '100vh', paddingTop: '80px' }}>
      {/* Page header */}
      <div
        style={{
          backgroundColor: '#080A0C',
          borderBottom: '1px solid #283038',
          padding: '3rem 0 2rem',
        }}
      >
        <div className="container-rnt">
          <nav aria-label="Breadcrumb" style={{ marginBottom: '1rem' }}>
            <ol style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', padding: 0, color: '#9AA3AB', fontSize: '0.8125rem' }}>
              <li><Link href="/" style={{ color: '#9AA3AB', textDecoration: 'none' }}>Home</Link></li>
              <li style={{ color: '#283038' }}>/</li>
              <li style={{ color: '#F5F7F8' }}>Shop</li>
            </ol>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 className="display-md" style={{ color: '#F5F7F8' }}>ALL SHOES</h1>
              <p style={{ color: '#9AA3AB', fontSize: '0.9375rem', marginTop: '0.25rem' }}>
                {loading ? 'Loading catalog...' : `${filtered.length} product${filtered.length !== 1 ? 's' : ''}`}
              </p>
            </div>

            {/* Sort */}
            <div style={{ position: 'relative' }}>
              <select
                aria-label="Sort products"
                value={sort}
                onChange={e => setSort(e.target.value as SortOption)}
                style={{
                  appearance: 'none',
                  padding: '0.625rem 2.5rem 0.625rem 1rem',
                  backgroundColor: '#151A1F',
                  border: '1px solid #283038',
                  borderRadius: '0.25rem',
                  color: '#F5F7F8',
                  fontSize: '0.8125rem',
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown
                size={14}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9AA3AB',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container-rnt" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* Search + Filter bar */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {/* Search input */}
          <div style={{ position: 'relative', flex: '1 1 280px' }}>
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '0.875rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9AA3AB',
                pointerEvents: 'none',
              }}
            />
            <input
              type="search"
              placeholder="Search shoes..."
              aria-label="Search products"
              value={searchQuery}
              onChange={e => {
                const nextValue = e.target.value;
                setSearchQuery(nextValue);
                const params = new URLSearchParams(window.location.search);
                if (nextValue.trim()) {
                  params.set('search', nextValue.trim());
                } else {
                  params.delete('search');
                }
                const queryString = params.toString();
                router.replace(queryString ? `?${queryString}` : '/shop', { scroll: false });
              }}
              style={{
                width: '100%',
                padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                backgroundColor: '#151A1F',
                border: '1px solid #283038',
                borderRadius: '0.25rem',
                color: '#F5F7F8',
                fontSize: '0.875rem',
                outline: 'none',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={e => (e.target.style.borderColor = '#C8FF00')}
              onBlur={e => (e.target.style.borderColor = '#283038')}
            />
          </div>

          {/* Filter toggle */}
          <button
            aria-expanded={filtersOpen}
            aria-label="Toggle filters"
            onClick={() => setFiltersOpen(prev => !prev)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.25rem',
              backgroundColor: filtersOpen ? '#C8FF00' : '#151A1F',
              border: '1px solid #283038',
              borderRadius: '0.25rem',
              color: filtersOpen ? '#080A0C' : '#F5F7F8',
              fontSize: '0.8125rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <SlidersHorizontal size={15} />
            Filters
            {hasFilters && (
              <span
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: filtersOpen ? '#080A0C' : '#C8FF00',
                  color: filtersOpen ? '#C8FF00' : '#080A0C',
                  fontSize: '0.625rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {(selectedCategories.length + selectedSizes.length + (priceMax < PRICE_MAX ? 1 : 0) + (searchQuery ? 1 : 0))}
              </span>
            )}
          </button>

          {hasFilters && (
            <button
              onClick={clearFilters}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
                padding: '0.75rem 1rem',
                backgroundColor: 'transparent',
                border: '1px solid #283038',
                borderRadius: '0.25rem',
                color: '#9AA3AB',
                fontSize: '0.8125rem',
                cursor: 'pointer',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#F5F7F8')}
              onMouseLeave={e => (e.currentTarget.style.color = '#9AA3AB')}
            >
              <X size={14} /> Clear all
            </button>
          )}
        </div>

        {/* Filter panel */}
        {filtersOpen && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
              padding: '1.5rem',
              backgroundColor: '#151A1F',
              border: '1px solid #283038',
              borderRadius: '0.5rem',
              marginBottom: '2rem',
            }}
          >
            {/* Category filter */}
            <div>
              <h3 style={{ color: '#F5F7F8', fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                Category
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {CATEGORIES.map(cat => (
                  <label
                    key={cat.slug}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer' }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.slug)}
                      onChange={() => toggleCategory(cat.slug)}
                      style={{ accentColor: '#C8FF00', width: '14px', height: '14px' }}
                    />
                    <span style={{ color: selectedCategories.includes(cat.slug) ? '#F5F7F8' : '#9AA3AB', fontSize: '0.875rem', transition: 'color 0.2s' }}>
                      {cat.name}
                    </span>
                    <span style={{ marginLeft: 'auto', color: '#283038', fontSize: '0.75rem' }}>{cat.count}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Size filter */}
            <div>
              <h3 style={{ color: '#F5F7F8', fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                UK Size
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {SIZE_OPTIONS.map(size => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    aria-pressed={selectedSizes.includes(size)}
                    style={{
                      padding: '0.375rem 0.75rem',
                      backgroundColor: selectedSizes.includes(size) ? '#C8FF00' : 'transparent',
                      border: `1px solid ${selectedSizes.includes(size) ? '#C8FF00' : '#283038'}`,
                      borderRadius: '0.25rem',
                      color: selectedSizes.includes(size) ? '#080A0C' : '#9AA3AB',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price filter */}
            <div>
              <h3 style={{ color: '#F5F7F8', fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                Max Price
              </h3>
              <input
                type="range"
                min={1000}
                max={PRICE_MAX}
                step={500}
                value={priceMax}
                onChange={e => setPriceMax(Number(e.target.value))}
                aria-label="Maximum price filter"
                style={{ width: '100%', accentColor: '#C8FF00' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                <span style={{ color: '#9AA3AB', fontSize: '0.75rem' }}>₹1,000</span>
                <span style={{ color: '#C8FF00', fontSize: '0.875rem', fontWeight: 600 }}>
                  {formatPrice(priceMax)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Product grid */}
        {filtered.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 4} />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '5rem 2rem',
              color: '#9AA3AB',
            }}
          >
            <p
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '1.5rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: '#F5F7F8',
                marginBottom: '0.5rem',
              }}
            >
              No products found
            </p>
            <p style={{ marginBottom: '1.5rem' }}>Try adjusting your filters or search query.</p>
            <button onClick={clearFilters} className="btn-primary">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
