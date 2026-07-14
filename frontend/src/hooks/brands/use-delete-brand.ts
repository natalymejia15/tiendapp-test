import { brandApi } from '@/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: brandApi.delete,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['brands'],
      });
    },
  });
}