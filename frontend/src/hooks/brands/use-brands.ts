import { brandApi } from '@/api';
import { useQuery } from '@tanstack/react-query';


export function useBrands(search?: string) {
  return useQuery({
    queryKey: ['brands', search],
    queryFn: () => brandApi.getAll(search),
  });
}