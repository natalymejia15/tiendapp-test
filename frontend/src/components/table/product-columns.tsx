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
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorFn: (row) => row.brand.name,
      id: 'brand',
      header: 'Brand',
    },
    {
      accessorKey: 'unit',
      header: 'Unit',
    },
    {
      accessorKey: 'observations',
      header: 'Observations',
    },
    {
      accessorKey: 'inventory_quantity',
      header: 'Inventory quantity',
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