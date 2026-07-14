'use client';

import {
  BrandForm,
  BrandTable,
  Button,
  ConfirmDialog,
  FormDialog,
  PageHeader,
} from '@/components';
import { useBrandsPage } from '@/hooks';

export default function BrandsPage() {
  const {
    open,
    setOpen,
    selectedBrand,
    setSelectedBrand,
    deleteOpen,
    setDeleteOpen,
    brandToDelete,
    setBrandToDelete,
    deleteBrand,
    createBrand,
    updateBrand,
    data,
    isLoading,
    isError,
    handleEdit,
    handleSubmit,
    handleDelete,
    confirmDelete,
    toasts,
  } = useBrandsPage();

  if (isLoading) {
    return (
      <div className="flex h-80 items-center justify-center">
        <p className="text-sm text-slate-500">
          Loading brands...
        </p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex h-80 items-center justify-center rounded-2xl border border-red-200 bg-red-50">
        <p className="font-medium text-red-600">
          Error loading brands.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Brands"
        description="Manage your available brands."
      >
        <FormDialog
          open={open}
          onOpenChange={(value) => {
            setOpen(value);

            if (!value) {
              setSelectedBrand(null);
            }
          }}
          title={selectedBrand ? 'Edit Brand' : 'Create Brand'}
          trigger={
            <Button onClick={() => setSelectedBrand(null)}>
              New Brand
            </Button>
          }
        >
          <BrandForm
            key={selectedBrand?.id ?? 'new'}
            defaultValues={
              selectedBrand
                ? {
                    reference: selectedBrand.reference,
                    name: selectedBrand.name,
                  }
                : undefined
            }
            onSubmit={handleSubmit}
            isSubmitting={
              createBrand.isPending || updateBrand.isPending
            }
          />
        </FormDialog>
      </PageHeader>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <BrandTable
          brands={data.data}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <ConfirmDialog
        open={deleteOpen}
        title="Delete Brand"
        description={`Are you sure you want to delete "${brandToDelete?.name}"?`}
        loading={deleteBrand.isPending}
        onCancel={() => {
          setDeleteOpen(false);
          setBrandToDelete(null);
        }}
        onConfirm={confirmDelete}
      />

      <div className="fixed right-4 top-4 z-[9999] flex w-96 max-w-[calc(100vw-2rem)] flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`rounded-xl border p-4 shadow-lg transition-all ${
              toast.variant === 'error'
                ? 'border-red-200 bg-red-50 text-red-700'
                : 'border-emerald-200 bg-emerald-50 text-emerald-700'
            }`}
          >
            <p className="font-semibold">
              {toast.title}
            </p>

            {toast.description && (
              <p className="mt-1 text-sm opacity-90">
                {toast.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}