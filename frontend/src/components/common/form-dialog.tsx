'use client';

import type { ReactElement, ReactNode } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui';

interface FormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  trigger: ReactElement;
  children: ReactNode;
}

export function FormDialog({
  open,
  onOpenChange,
  title,
  trigger,
  children,
}: FormDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogTrigger render={trigger} />
      <DialogContent className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-900">
            {title}
          </DialogTitle>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
}