'use client';

import type { MouseEvent } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui";


interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void | Promise<void>;
}

export function ConfirmDialog({
  open,
  title,
  description,
  loading = false,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  async function handleConfirm(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    await onConfirm();
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onCancel();
      }}
    >
      <AlertDialogContent className="rounded-2xl border border-slate-200 bg-white shadow-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-semibold">
            {title}
          </AlertDialogTitle>

          <AlertDialogDescription className="mt-2 text-slate-500">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-xl"
            onClick={onCancel}
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction className="rounded-xl bg-red-600 hover:bg-red-700"
            disabled={loading}
            onClick={handleConfirm}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}