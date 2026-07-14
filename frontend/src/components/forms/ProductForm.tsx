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
    defaultValues: defaultValues ?? {
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
      className="space-y-5"
    >
      <div>
        <Label className="mb-2 block font-medium text-slate-700">Reference</Label>

        <Input
          className="h-11 rounded-xl"
          {...register('reference')} />

        {errors.reference && (
          <p className="mt-1 text-sm font-medium text-red-500">
            {errors.reference.message}
          </p>
        )}
      </div>

      <div>
        <Label className="mb-2 block font-medium text-slate-700">Name</Label>

        <Input
          className="h-11 rounded-xl"
          {...register('name')} />

        {errors.name && (
          <p className="mt-1 text-sm font-medium text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <Label className="mb-2 block font-medium text-slate-700">Description</Label>

        <Input
          className="h-11 rounded-xl"
          {...register('description')} />

        {errors.description && (
          <p className="mt-1 text-sm font-medium text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <Label className="mb-2 block font-medium text-slate-700">Price</Label>

        <Input
          className="h-11 rounded-xl"
          type="number"
          {...register('price')}
        />

        {errors.price && (
          <p className="mt-1 text-sm font-medium text-red-500">
            {errors.price.message}
          </p>
        )}
      </div>

      <div>
        <Label className="mb-2 block font-medium text-slate-700">Stock</Label>

        <Input
          className="h-11 rounded-xl"
          type="number"
          {...register('stock')}
        />

        {errors.stock && (
          <p className="mt-1 text-sm font-medium text-red-500">
            {errors.stock.message}
          </p>
        )}
      </div>

      <div>
        <Label className="mb-2 block font-medium text-slate-700">Brand</Label>

        <Select
          value={String(watch('brand_id'))}
          onValueChange={(value) =>
            setValue('brand_id', Number(value))
          }
        >
          <SelectTrigger className="h-11 rounded-xl">
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
          <p className="mt-1 text-sm font-medium text-red-500">
            {errors.brand_id.message}
          </p>
        )}
      </div>

      <Button
        className="mt-3 h-11 w-full rounded-xl"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving...' : 'Save'}
      </Button>
    </form>
  );
}