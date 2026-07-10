export interface Brand {
  id: number;
  reference: string;
  name: string;
}

export interface BrandTableProps {
  brands: Brand[];
  onEdit: (brand: Brand) => void;
  onDelete: (brand: Brand) => void;
}


export interface CreateBrandDto {
  reference: string;
  name: string;
}

export interface BrandColumnHandlers {
  onEdit: (brand: Brand) => void;
  onDelete: (brand: Brand) => void;
}
