import { brandApi } from '@/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCreateBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: brandApi.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['brands'],
      });
    },
  });
}