import { CreateProductDto, productApi } from '@/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UpdateProductDto {
  id: number;
  data: CreateProductDto;
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateProductDto) =>
      productApi.update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
  });
}