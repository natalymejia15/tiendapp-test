'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Boxes, Home, Package, Tags } from 'lucide-react';

const links = [
  {
    href: '/',
    label: 'Home',
    icon: Home,
  },
  {
    href: '/brands',
    label: 'Brands',
    icon: Tags,
  },
  {
    href: '/products',
    label: 'Products',
    icon: Package,
  }
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <Boxes size={20} />
          </div>

          <div className="flex flex-col">
            <span className="text-base font-semibold text-slate-900">
              Inventory
            </span>

            <span className="text-xs text-slate-500">
              Management System
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={`
                  flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium
                  transition-all duration-200
                  ${active
                    ? 'bg-blue-50 text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }
                `}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}