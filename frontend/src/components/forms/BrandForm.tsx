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
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="reference">
          Reference
        </Label>

        <Input
          id="reference"
          {...register('reference')}
        />

        {errors.reference && (
          <p className="text-sm text-red-500">
            {errors.reference.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">
          Name
        </Label>

        <Input
          id="name"
          {...register('name')}
        />

        {errors.name && (
          <p className="text-sm text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving...' : 'Save'}
      </Button>
    </form>
  );
}