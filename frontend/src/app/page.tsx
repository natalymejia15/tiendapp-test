import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">
        Inventory System
      </h1>

      <div className="flex gap-4">
        <Button asChild>
          <Link href="/brands">
            Brands
          </Link>
        </Button>

        <Button asChild>
          <Link href="/products">
            Products
          </Link>
        </Button>
      </div>
    </main>
  );
}