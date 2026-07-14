'use client';

import {
  Button,
  ConfirmDialog,
  DataTable,
  FormDialog,
  PageHeader,
  ProductForm,
} from '@/components';
import { useProductPage } from '@/hooks';

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
                    reference: selectedProduct.reference,
                    name: selectedProduct.name,
                    description: selectedProduct.description,
                    price: selectedProduct.price,
                    stock: selectedProduct.stock,
                    brand_id: selectedProduct.brand_id,
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
        <DataTable
          columns={columns}
          data={data.data}
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
    </div>
  );
}