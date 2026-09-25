# RNT Footwear

A modern, premium footwear storefront built with Next.js and TypeScript. The project includes a polished storefront, secure authentication flow, protected admin dashboard, cart system, product APIs, and scalable architecture ready for real-world ecommerce growth.

## Overview

RNT Footwear is designed as a production-style storefront for sneaker and performance footwear. It combines a luxury brand aesthetic with functional ecommerce features such as:

- Landing page with premium hero section
- Product listing and detail pages
- Shopping cart flow
- Checkout UI
- User signup / login / account management
- Protected admin area with role-based access
- Product management API for admin catalog updates
- Optimized frontend structure for fast rendering and scalability

## Key Features

### Storefront
- Premium responsive landing page
- Product cards and category-based browsing
- Product detail pages with size and product context
- Cart drawer with reactive state management
- Account and profile section
- Contact and checkout flow

### Authentication & Security
- Customer signup and login
- Session-based auth using secure cookies
- Role-based admin privileges
- Protected admin route and admin-only API endpoints
- Default admin credentials for local development security gate

### Admin Panel
- Admin dashboard for product management
- Add/update/delete product catalog data
- Stats overview for admin analytics
- Protected access that is not publicly visible to normal users
- Separate route structure for admin-only operations

### Backend / Data Layer
- API routes for products, auth, and admin actions
- File-backed local storage for development fallback
- PostgreSQL-ready architecture for production migration
- Strong TypeScript typing across store and product data

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Zustand
- PostgreSQL-ready integration layer
- Node.js / Server Routes
- bcryptjs for password hashing
- Framer Motion, GSAP, Lenis for animation polish
- Lucide React for icons
- React Three Fiber / Drei for advanced visual interactions

## Project Structure

```bash
src/
  app/
    admin/
    api/
    account/
    cart/
    checkout/
    contact/
    product/
    shop/
  components/
    admin/
    animations/
    cart/
    layout/
    product/
    sections/
  lib/
    data/
    server/
    store/
  types/
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the app in development mode:

```bash
npm run dev
```

3. Open the app in the browser:

```bash
http://localhost:3000
```

## Admin Access

For local development, the app includes a hardened admin login guard.

Default admin credentials:

```bash
username: admin
password: admin
```

This ensures only admin access can reach the dashboard and admin API operations.

## Production Notes

- App is built for scalable ecommerce growth
- Auth is structured to support secure production deployment
- Admin routes are protected at route and API level
- Product catalog is designed to support future PostgreSQL migration
- Performance-optimized structure and static pages for product listings

## Helpful Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Notes

This project was built as a premium storefront with real ecommerce logic layered in, not just a static landing page. The main focus was to combine visual quality, user experience, catalog management, and secure admin workflows into a clean production-ready foundation.

## License

This project is intended for personal and portfolio/demo usage unless otherwise specified by the owner.
