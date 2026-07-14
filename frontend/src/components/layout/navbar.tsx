'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, Tags } from 'lucide-react';

import { Button } from '@/components/ui/button';

const links = [
  {
    href: '/brands',
    label: 'Brands',
    icon: Tags,
  },
  {
    href: '/products',
    label: 'Products',
    icon: Package,
  },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/brands"
          className="text-xl font-bold"
        >
          Inventory Management
        </Link>

        <nav className="flex items-center gap-2">
          {links.map(({ href, label, icon: Icon }) => (
            <Link href={href}>
              <Button variant={pathname === href ? 'default' : 'ghost'}>
                <Icon className="h-4 w-4" />
                {label}
              </Button>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}