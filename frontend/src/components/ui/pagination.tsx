import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from './button';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function TablePagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between border-t border-slate-100 bg-white px-6 py-4">
      <p className="text-sm text-slate-500">
        Page{' '}
        <span className="font-semibold text-slate-700">
          {page}
        </span>{' '}
        of{' '}
        <span className="font-semibold text-slate-700">
          {totalPages}
        </span>
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft size={16} />
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}