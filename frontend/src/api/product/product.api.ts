import client from '@/api/client';
import { PaginatedResponse, Product } from '@/interfaces';

export interface CreateProductDto {
  brand_id: number;
  name: string;
  unit: 'UNIT' | 'DISPLAY' | 'BOX';
  observations: string;
  inventory_quantity: number;
}

class ProductApi {
  async getAll(search?: string) {
    const { data } = await client.get<PaginatedResponse<Product>>('/products', {
      params: {
        search,
      },
    });

    return data;
  }

  async create(payload: CreateProductDto) {
    const { data } = await client.post<Product>('/products', payload);

    return data;
  }

  async update(id: number, payload: CreateProductDto) {
    const { data } = await client.put<Product>(`/products/${id}`, payload);

    return data;
  }

  async delete(id: number) {
    await client.delete(`/products/${id}`);
  }
}

export default new ProductApi();