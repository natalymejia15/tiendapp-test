import { useMutation, useQueryClient } from '@tanstack/react-query';
import BrandApi from '@/api/brand/brand.api';

export function useDeleteBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: BrandApi.delete,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['brands'],
      });
    },
  });
}