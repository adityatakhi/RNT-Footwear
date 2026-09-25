// ── Product Types ──────────────────────────────────────────────────────────

export interface ProductColor {
  name: string;
  hex: string;
  slug: string;
}

export interface ProductSize {
  uk: number;
  us: number;
  eu: number;
  available: boolean;
}

export interface ProductReview {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  comparePrice?: number;
  currency: string;
  description: string;
  shortDescription: string;
  images: string[];        // URLs — later from Cloudinary
  colors: ProductColor[];
  sizes: ProductSize[];
  features: string[];
  specifications: ProductSpecification[];
  reviews: ProductReview[];
  rating: number;
  reviewCount: number;
  stock: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  model3dUrl?: string;    // GLB/GLTF URL — later from CDN
  tags: string[];
  createdAt: string;
}

export type ProductCategory =
  | 'running'
  | 'lifestyle'
  | 'training'
  | 'casual'
  | 'basketball'
  | 'outdoor';

export type SortOption =
  | 'featured'
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'rating';

export interface ProductFilters {
  category?: ProductCategory[];
  colors?: string[];
  sizes?: number[];
  priceMin?: number;
  priceMax?: number;
  sort: SortOption;
  inStock?: boolean;
  search?: string;
}

// ── Cart Types ──────────────────────────────────────────────────────────────

export interface CartItem {
  id: string;          // unique: productId + colorSlug + sizeUk
  productId: string;
  productName: string;
  productSlug: string;
  price: number;
  currency: string;
  quantity: number;
  image: string;
  color: ProductColor;
  size: ProductSize;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  currency: string;
}

// ── User & Account Types ────────────────────────────────────────────────────

export interface UserAddress {
  id: string;
  label: string;      // e.g. "Home", "Work"
  firstName: string;
  lastName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productSlug: string;
  image: string;
  color: ProductColor;
  size: ProductSize;
  quantity: number;
  price: number;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  currency: string;
  address: UserAddress;
  trackingNumber?: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  addresses: UserAddress[];
  orders: Order[];
  wishlistIds: string[];
  createdAt: string;
}

// ── Checkout Types ──────────────────────────────────────────────────────────

export type DeliveryMethod = 'standard' | 'express' | 'overnight';

export interface CheckoutState {
  step: 1 | 2 | 3 | 4;
  contact: {
    email: string;
    phone: string;
    saveInfo: boolean;
  };
  shipping: UserAddress | null;
  delivery: DeliveryMethod;
  paymentMethod: 'card' | 'upi' | 'cod';
}

// ── UI Types ─────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
}

export interface CategoryCard {
  id: string;
  name: string;
  slug: ProductCategory;
  image: string;
  count: number;
}
