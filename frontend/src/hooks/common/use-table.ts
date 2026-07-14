import { useEffect, useMemo, useState } from 'react';

export function useTable<T>(
  data: T[],
  searchBy: (item: T) => string,
  pageSize = 10,
) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const normalizedSearch = search.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!normalizedSearch) return data;

    return data.filter((item) =>
      searchBy(item)
        .toLowerCase()
        .includes(normalizedSearch),
    );
  }, [data, normalizedSearch, searchBy]);

  useEffect(() => {
    setPage(1);
  }, [normalizedSearch]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;

    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  return {
    search,
    setSearch,
    page,
    setPage,
    totalPages,
    data: paginated,
    total: filtered.length,
  };
}