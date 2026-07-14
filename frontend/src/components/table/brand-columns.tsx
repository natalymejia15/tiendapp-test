'use client';

import { Brand, Product } from '@/interfaces';
import type { ColumnDef } from '@tanstack/react-table';
import { TableActions } from '../common';

interface BrandColumnHandlers {
  onEdit: (brand: Brand) => void;
  onDelete: (brand: Brand) => void;
}

export function getBrandColumns({
  onEdit,
  onDelete,
}: BrandColumnHandlers): ColumnDef<Brand>[] {
  return [
    {
      accessorKey: 'reference',
      header: 'References',
    },
    {
      accessorKey: 'name',
      header: 'Name',
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