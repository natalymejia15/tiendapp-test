'use client';

import { Button, ConfirmDialog, DataTable, FormDialog, PageHeader, ProductForm } from '@/components';
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
    return <p className="p-6">Loading...</p>;
  }

  if (isError || !data || !brands) {
    return <p className="p-6">Error loading products.</p>;
  }

  return (
    <main className="mx-auto max-w-7xl p-6">
      <PageHeader
        title="Products"
        description="Manage products."
      >
        <FormDialog
          open={open}
          onOpenChange={(value) => {
            setOpen(value);

            if (!value) {
              setSelectedProduct(null);
            }
          }}
          title={
            selectedProduct
              ? 'Edit Product'
              : 'Create Product'
          }
          trigger={
            <Button
              onClick={() =>
                setSelectedProduct(null)
              }
            >
              New Product
            </Button>
          }
        >
          <ProductForm
            brands={brands.data}
            defaultValues={
              selectedProduct
                ? {
                  reference:
                    selectedProduct.reference,
                  name: selectedProduct.name,
                  description:
                    selectedProduct.description,
                  price: selectedProduct.price,
                  stock: selectedProduct.stock,
                  brand_id:
                    selectedProduct.brand_id,
                }
                : undefined
            }
            onSubmit={handleSubmit}
            isSubmitting={
              createProduct.isPending ||
              updateProduct.isPending
            }
          />
        </FormDialog>
      </PageHeader>

      <DataTable
        columns={columns}
        data={data.data}
      />

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
    </main>
  );
}