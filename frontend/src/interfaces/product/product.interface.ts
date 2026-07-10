import { Brand } from "../drand";

export interface Product {
  id: number;
  name: string;
  unit: 'UNIT' | 'DISPLAY' | 'BOX';
  observations: string;
  inventory_quantity: number;
  brand: Brand;
}