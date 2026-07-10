import { useMutation, useQueryClient } from '@tanstack/react-query';
import BrandApi from '@/api/brand/brand.api';

export function useCreateBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: BrandApi.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['brands'],
      });
    },
  });
}