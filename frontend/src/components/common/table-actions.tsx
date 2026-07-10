'use client';

import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '../ui';


interface TableActionsProps<T> {
  item: T;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
}

export function TableActions<T>({
  item,
  onEdit,
  onDelete,
}: TableActionsProps<T>) {
  return (
    <div className="flex justify-end gap-2">
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => onEdit(item)}
      >
        <Pencil className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="destructive"
        size="icon"
        onClick={() => onDelete(item)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}