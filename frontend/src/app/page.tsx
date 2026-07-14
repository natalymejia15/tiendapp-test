import Link from 'next/link';
import { Boxes, Package, Tags } from 'lucide-react';
import { Button } from '@/components';

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-12 shadow-sm">
        <div className="space-y-3 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Inventory System
          </h1>

          <p className="mx-auto max-w-xl text-base text-slate-500">
            Manage your brands and products from a clean and centralized
            dashboard designed to keep your inventory organized.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Button
            render={
              <Link href="/brands" />
            }
            size="lg"
            className="h-14 rounded-xl bg-blue-600 text-base font-medium shadow-sm"
          >
            <Boxes size={20} />
            Brands
          </Button>

          <Button
            render={
              <Link href="/products" />
            }
            size="lg"
            variant="outline"
            className="h-14 rounded-xl"
          >
            <Package size={20} />
            Products
          </Button>
        </div>
      </div>
    </main>
  );
}