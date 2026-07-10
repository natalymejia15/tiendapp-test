'use client';

import { BrandForm, BrandTable, Button, ConfirmDialog, FormDialog, PageHeader } from '@/components';
import { useBrandsPage, } from '@/hooks';

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
    toasts, } = useBrandsPage();
  if (isLoading) {
    return <p className="p-6">Loading...</p>;
  }

  if (isError || !data) {
    return <p className="p-6">Error loading brands.</p>;
  }

  return (
    <main className="mx-auto max-w-6xl p-6">
      <PageHeader
        title="Brands"
        description="Manage available brands."
      >
        <FormDialog
          open={open}
          onOpenChange={(value) => {
            setOpen(value);

            if (!value) {
              setSelectedBrand(null);
            }
          }}
          title={
            selectedBrand
              ? 'Edit Brand'
              : 'Create Brand'
          }
          trigger={
            <Button
              onClick={() => setSelectedBrand(null)}
            >
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
              createBrand.isPending ||
              updateBrand.isPending
            }
          />
        </FormDialog>
      </PageHeader>

      <BrandTable
        brands={data.data}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
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

      <div className="fixed inset-x-4 top-4 z-[9999] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2 md:right-4 md:left-auto">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`rounded-lg border p-4 shadow-lg ${toast.variant === 'error' ? 'border-red-200 bg-red-50 text-red-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}
          >
            <p className="font-medium">{toast.title}</p>
            {toast.description ? <p className="mt-1 text-sm">{toast.description}</p> : null}
          </div>
        ))}
      </div>
    </main>
  );
}