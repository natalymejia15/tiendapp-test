'use client';

import {
  Button,
  ConfirmDialog,
  DataTable,
  FormDialog,
  PageHeader,
  ProductForm,
  TablePagination,
  TableToolbar,
} from '@/components';
import { useProductPage, useTable } from '@/hooks';

export default function ProductsPage() {
  const {
    open,
    deleteOpen,
    selectedProduct,
    productToDelete,
    data,
    brands,
    isLoading,
    isError,
    toasts,
    columns,
    setOpen,
    setDeleteOpen,
    setSelectedProduct,
    setProductToDelete,
    handleSubmit,
    confirmDelete,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProductPage();


  const table = useTable(
    data?.data ?? [],
    (product) =>
      `${product.name}
         ${product.brand.name}`,
  );
  if (isLoading) {
    return (
      <div className="flex h-80 items-center justify-center">
        <p className="text-sm text-slate-500">
          Loading products...
        </p>
      </div>
    );
  }

  if (isError || !data || !brands) {
    return (
      <div className="flex h-80 items-center justify-center rounded-2xl border border-red-200 bg-red-50">
        <p className="font-medium text-red-600">
          Error loading products.
        </p>
      </div>
    );
  }


  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        description="Manage your product catalog."
      >
        <FormDialog
          open={open}
          onOpenChange={(value) => {
            setOpen(value);

            if (!value) {
              setSelectedProduct(null);
            }
          }}
          title={selectedProduct ? 'Edit Product' : 'Create Product'}
          trigger={
            <Button onClick={() => setSelectedProduct(null)}>
              New Product
            </Button>
          }
        >
          <ProductForm
            brands={brands.data}
            defaultValues={
              selectedProduct
                ? {
                  brand_id: selectedProduct.brand_id ?? selectedProduct.brand?.id ?? 0,
                  name: selectedProduct.name,
                  unit: selectedProduct.unit,
                  observations: selectedProduct.observations,
                  inventory_quantity: selectedProduct.inventory_quantity,
                }
                : undefined
            }
            onSubmit={handleSubmit}
            isSubmitting={
              createProduct.isPending || updateProduct.isPending
            }
          />
        </FormDialog>
      </PageHeader>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <TableToolbar
          value={table.search}
          onChange={table.setSearch}
          placeholder="Search product..."
        />
        <DataTable
          columns={columns}
          data={table.data}
        />
        <TablePagination
          page={table.page}
          totalPages={table.totalPages}
          onPageChange={table.setPage}
        />
      </div>

      <ConfirmDialog
        open={deleteOpen}
        title="Delete Product"
        description={`Are you sure you want to delete "${productToDelete?.name}"?`}
        loading={deleteProduct.isPending}
        onCancel={() => {
          setDeleteOpen(false);
          setProductToDelete(null);
        }}
        onConfirm={confirmDelete}
      />

      <div className="fixed right-4 top-4 z-[9999] flex w-96 max-w-[calc(100vw-2rem)] flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`rounded-xl border p-4 shadow-lg transition-all ${toast.variant === 'error'
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