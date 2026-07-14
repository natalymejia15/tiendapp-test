'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Brand } from '@/interfaces';
import { ProductFormInput, ProductFormValues, productSchema } from '@/schemas';
import { Button, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui';

interface ProductFormProps {
  brands: Brand[];
  defaultValues?: ProductFormValues;
  isSubmitting?: boolean;
  onSubmit: (values: ProductFormValues) => void | Promise<void>;
}

export function ProductForm({
  brands,
  defaultValues,
  isSubmitting = false,
  onSubmit,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormInput, unknown, ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      reference: '',
      name: '',
      description: '',
      price: 0,
      stock: 0,
      brand_id: 0,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div>
        <Label>Reference</Label>

        <Input {...register('reference')} />

        {errors.reference && (
          <p className="text-sm text-red-500">
            {errors.reference.message}
          </p>
        )}
      </div>

      <div>
        <Label>Name</Label>

        <Input {...register('name')} />

        {errors.name && (
          <p className="text-sm text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <Label>Description</Label>

        <Input {...register('description')} />

        {errors.description && (
          <p className="text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <Label>Price</Label>

        <Input
          type="number"
          {...register('price')}
        />

        {errors.price && (
          <p className="text-sm text-red-500">
            {errors.price.message}
          </p>
        )}
      </div>

      <div>
        <Label>Stock</Label>

        <Input
          type="number"
          {...register('stock')}
        />

        {errors.stock && (
          <p className="text-sm text-red-500">
            {errors.stock.message}
          </p>
        )}
      </div>

      <div>
        <Label>Brand</Label>

        <Select
          value={String(watch('brand_id'))}
          onValueChange={(value) =>
            setValue('brand_id', Number(value))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a brand" />
          </SelectTrigger>

          <SelectContent>
            {brands.map((brand) => (
              <SelectItem
                key={brand.id}
                value={String(brand.id)}
              >
                {brand.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {errors.brand_id && (
          <p className="text-sm text-red-500">
            {errors.brand_id.message}
          </p>
        )}
      </div>

      <Button
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving...' : 'Save'}
      </Button>
    </form>
  );
}