'use client';

import { BrandTableProps } from '@/interfaces';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui';
import { TableActions } from '../common';

export function BrandTable({
  brands,
  onEdit,
  onDelete
}: BrandTableProps) {
  if (!brands.length) {
    return (
      <div className="rounded-lg border p-8 text-center text-muted-foreground">
        No brands found.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Reference</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="w-32 text-right">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {brands.map((brand) => (
          <TableRow key={brand.id}>
            <TableCell>{brand.reference}</TableCell>

            <TableCell>{brand.name}</TableCell>

            <TableCell className="text-right">
              <TableActions
                item={brand}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}