import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { SmoothScroll } from '@/components/animations/SmoothScroll';

export const metadata: Metadata = {
  metadataBase: new URL('https://rntfootwear.com'),
  title: {
    default: 'RNT FOOTWEAR — Premium Performance Shoes',
    template: '%s | RNT FOOTWEAR',
  },
  description:
    'Discover RNT FOOTWEAR — premium performance and lifestyle footwear engineered for every move. Shop running, training, lifestyle, and casual shoes.',
  keywords: ['RNT Footwear', 'premium shoes', 'running shoes', 'performance footwear', 'lifestyle sneakers'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://rntfootwear.com',
    siteName: 'RNT FOOTWEAR',
    title: 'RNT FOOTWEAR — Premium Performance Shoes',
    description: 'Performance meets style. Designed for every move.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#080A0C" />
      </head>
      <body>
        <SmoothScroll>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <CartDrawer />
        </SmoothScroll>
      </body>
    </html>
  );
}
