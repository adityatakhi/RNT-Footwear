import { redirect } from 'next/navigation';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { readCatalogStore } from '@/lib/server/admin-store';
import { getAdminOverview } from '@/lib/server/catalog';
import { getSessionUser } from '@/lib/server/auth';

export const metadata = {
  title: 'Admin Dashboard',
  description: 'RNT Footwear admin dashboard for catalog and inventory management.',
};

export default async function AdminPage() {
  const user = await getSessionUser();

  if (!user || user.role !== 'admin') {
    redirect('/admin/login');
  }

  const [summary, products] = await Promise.all([
    getAdminOverview(),
    readCatalogStore(),
  ]);

  return <AdminDashboard summary={summary} products={products} />;
}
