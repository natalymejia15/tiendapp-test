'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { Brand, BrandColumnHandlers } from '@/interfaces';
import { TableActions } from '@/components/common/table-actions';


export function getBrandColumns({
  onEdit,
  onDelete,
}: BrandColumnHandlers): ColumnDef<Brand>[] {
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