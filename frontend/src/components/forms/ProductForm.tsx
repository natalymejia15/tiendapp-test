'use client';

import { useEffect } from 'react';
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
    reset,
    formState: { errors },
  } = useForm<ProductFormInput, unknown, ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues ?? {
      brand_id: 0,
      name: '',
      unit: 'UNIT',
      observations: '',
      inventory_quantity: 0,
    },
  });

  useEffect(() => {
    reset(
      defaultValues ?? {
        brand_id: 0,
        name: '',
        unit: 'UNIT',
        observations: '',
        inventory_quantity: 0,
      },
    );
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <Label className="mb-2 block font-medium text-slate-700">Brand</Label>

        <Select
          value={watch('brand_id') ? String(watch('brand_id')) : ''}
          onValueChange={(value) => setValue('brand_id', Number(value))}
        >
          <SelectTrigger className="h-11 rounded-xl">
            <SelectValue placeholder="Select a brand" />
          </SelectTrigger>

          <SelectContent>
            {brands.map((brand) => (
              <SelectItem key={brand.id} value={String(brand.id)}>
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

      <div>
        <Label className="mb-2 block font-medium text-slate-700">Name</Label>

        <Input className="h-11 rounded-xl" {...register('name')} />

        {errors.name && (
          <p className="mt-1 text-sm font-medium text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <Label className="mb-2 block font-medium text-slate-700">Unit</Label>

        <Select
          value={watch('unit')}
          onValueChange={(value) => setValue('unit', value as ProductFormValues['unit'])}
        >
          <SelectTrigger className="h-11 rounded-xl">
            <SelectValue placeholder="Select a unit" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="UNIT">Unit</SelectItem>
            <SelectItem value="DISPLAY">Display</SelectItem>
            <SelectItem value="BOX">Box</SelectItem>
          </SelectContent>
        </Select>

        {errors.unit && (
          <p className="mt-1 text-sm font-medium text-red-500">
            {errors.unit.message}
          </p>
        )}
      </div>

      <div>
        <Label className="mb-2 block font-medium text-slate-700">Observations</Label>

        <Input className="h-11 rounded-xl" {...register('observations')} />

        {errors.observations && (
          <p className="mt-1 text-sm font-medium text-red-500">
            {errors.observations.message}
          </p>
        )}
      </div>

      <div>
        <Label className="mb-2 block font-medium text-slate-700">Inventory quantity</Label>

        <Input
          className="h-11 rounded-xl"
          type="number"
          {...register('inventory_quantity')}
        />

        {errors.inventory_quantity && (
          <p className="mt-1 text-sm font-medium text-red-500">
            {errors.inventory_quantity.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="mt-3 h-11 w-full rounded-xl"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving...' : 'Save'}
      </Button>
    </form>
  );
}