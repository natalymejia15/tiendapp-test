import { Brand } from "../brand";

export interface Product {
  id: number;
  name: string;
  unit: 'UNIT' | 'DISPLAY' | 'BOX';
  observations: string;
  inventory_quantity: number;
  brand_id?: number;

  brand: Brand;

  created_at: string;
  updated_at: string;
}