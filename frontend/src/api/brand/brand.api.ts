import client from '@/api/client';
import { Brand, CreateBrandDto, PaginatedResponse } from '@/interfaces';

class BrandApi {
  async getAll(search?: string) {
    const { data } = await client.get<PaginatedResponse<Brand>>('/brands', {
      params: {
        search,
      },
    });

    return data;
  }
  async create(payload: CreateBrandDto) {
    const { data } = await client.post<Brand>('/brands', payload);

    return data;
  }

  async update(id: number, payload: CreateBrandDto) {
    const { data } = await client.put<Brand>(`/brands/${id}`, payload);

    return data;
  }

  async delete(id: number) {
    await client.delete(`/brands/${id}`);
  }
}

export default new BrandApi();