import type { Metadata } from 'next';
import { Geist } from 'next/font/google';

import './globals.css';

import QueryProvider from '@/providers/query-provider';
import { Navbar } from '@/components/layout/navbar';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

export const metadata: Metadata = {
  title: 'Inventory Management',
  description: 'Manage brands and products efficiently.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} min-h-screen bg-slate-50 font-sans text-slate-900 antialiased`}
      >
        <QueryProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8 lg:px-8">
              {children}
            </main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}