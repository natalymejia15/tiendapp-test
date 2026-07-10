import brandApi from '@/api/brand/brand.api';
import { CreateBrandDto } from '@/interfaces';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UpdateBrandDto {
  id: number;
  data: CreateBrandDto;
}

export function useUpdateBrand() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateBrandDto) =>
      brandApi.update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['brands'],
      });
    },
  });
}