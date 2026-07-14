import { Search } from 'lucide-react';

import { Input } from './input';

interface TableToolbarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function TableToolbar({
  value,
  onChange,
  placeholder = 'Search...',
}: TableToolbarProps) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
      <div className="relative w-full max-w-sm">
        <Search
          size={18}
          className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
        />

        <Input
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 rounded-xl pl-10"
        />
      </div>
    </div>
  );
}