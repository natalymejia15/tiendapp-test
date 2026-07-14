'use client';

import { useState } from 'react';
import { Package } from 'lucide-react';
import { useProducts } from '@/hooks';
import { TablePagination, TableToolbar } from '@/components';

const ITEMS_PER_PAGE = 6;

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const { data, isLoading } = useProducts();
  const products = data?.data ?? [];
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.brand?.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(
    filteredProducts.length / ITEMS_PER_PAGE
  );
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );


  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            Product Catalog
          </h1>
          <p className="mt-2 text-slate-500">
            Browse available products.
          </p>
        </div>
        <div className="mb-6">
          <TableToolbar
            value={search}
            onChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
            placeholder="Search products..."
          />
        </div>

        {isLoading ? (
          <p>Loading products...</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedProducts.map((product) => (
              <div
                key={product.id}
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-6
                  shadow-sm
                "
              >
                <div className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-50
                  text-blue-600
                ">
                  <Package />
                </div>

                <h2 className="mt-4 font-semibold text-slate-900">
                  {product.name}
                </h2>

                <p className="text-sm text-slate-500">
                  {product.brand?.name}
                </p>

                <p className="mt-3 text-sm text-slate-700">
                  Stock: {product.inventory_quantity}
                </p>

                <span className="
                  mt-3
                  inline-block
                  rounded-full
                  bg-slate-100
                  px-3
                  py-1
                  text-xs
                ">
                  {product.unit}
                </span>
              </div>
            ))}
          </div>
        )}


        <div className="mt-8">
          <TablePagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>

      </div>
    </main>
  );
}