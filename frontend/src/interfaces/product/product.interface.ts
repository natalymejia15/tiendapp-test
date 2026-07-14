import { Brand } from "../brand";

export interface Product {
  id: number;
  reference: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  brand_id: number;

  brand: Brand;

  created_at: string;
  updated_at: string;
}