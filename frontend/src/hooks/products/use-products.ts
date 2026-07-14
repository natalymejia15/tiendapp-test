import { productApi } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useProducts(search?: string) {
  return useQuery({
    queryKey: ['products', search],
    queryFn: () => productApi.getAll(search),
  });
}