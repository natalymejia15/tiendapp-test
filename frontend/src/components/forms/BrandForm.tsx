'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BrandFormValues, brandSchema } from '@/schemas';
import { Button, Input, Label } from '../ui';

interface BrandFormProps {
  defaultValues?: BrandFormValues;
  isSubmitting?: boolean;
  onSubmit: (values: BrandFormValues) => void | Promise<void>;
}

export function BrandForm({
  defaultValues,
  isSubmitting = false,
  onSubmit,
}: BrandFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: defaultValues ?? {
      reference: '',
      name: '',
    },
  });

  useEffect(() => {
    reset(defaultValues ?? {
      reference: '',
      name: '',
    });
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <Label className="mb-2 block font-medium text-slate-700" htmlFor="reference">
          Reference
        </Label>

        <Input
          className="h-11 rounded-xl"
          id="reference"
          {...register('reference')}
        />

        {errors.reference && (
          <p className="mt-1 text-sm font-medium text-red-500">
            {errors.reference.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label className="mb-2 block font-medium text-slate-700" htmlFor="name">
          Name
        </Label>

        <Input
          className="h-11 rounded-xl"
          id="name"
          {...register('name')}
        />

        {errors.name && (
          <p className="mt-1 text-sm font-medium text-red-500">
            {errors.name.message}
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