'use client';

import { Product } from '@/interfaces';
import type { ColumnDef } from '@tanstack/react-table';
import { TableActions } from '../common';

interface ProductColumnHandlers {
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function getProductColumns({
  onEdit,
  onDelete,
}: ProductColumnHandlers): ColumnDef<Product>[] {
  return [
    {
      accessorKey: 'reference',
      header: 'Reference',
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorFn: (row) => row.brand.name,
      id: 'brand',
      header: 'Brand',
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) =>
        new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
        }).format(row.original.price),
    },
    {
      accessorKey: 'stock',
      header: 'Stock',
    },
    {
      id: 'actions',
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => (
        <TableActions
          item={row.original}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ),
    },
  ];
}