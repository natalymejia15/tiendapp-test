import { Product } from "@/interfaces";
import { useMemo, useState } from "react";
import { useProducts } from "./use-products";
import { useBrands } from "../brands";
import { useCreateProduct } from "./use-create-product";
import { useUpdateProduct } from "./use-update-product";
import { useDeleteProduct } from "./use-delete-product";
import { ProductFormValues } from "@/schemas";
import { getProductColumns } from "@/components";

export const useProductPage = () => {
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [selectedProduct, setSelectedProduct] =
        useState<Product | null>(null);

    const [productToDelete, setProductToDelete] =
        useState<Product | null>(null);

    const { data, isLoading, isError } = useProducts();
    const { data: brands } = useBrands();

    const createProduct = useCreateProduct();
    const updateProduct = useUpdateProduct();
    const deleteProduct = useDeleteProduct();

    function handleEdit(product: Product) {
        setSelectedProduct(product);
        setOpen(true);
    }

    function handleDelete(product: Product) {
        setProductToDelete(product);
        setDeleteOpen(true);
    }

    async function handleSubmit(values: ProductFormValues) {
        if (selectedProduct) {
            await updateProduct.mutateAsync({
                id: selectedProduct.id,
                data: values,
            });
        } else {
            await createProduct.mutateAsync(values);
        }

        setSelectedProduct(null);
        setOpen(false);
    }

    async function confirmDelete() {
        if (!productToDelete) return;

        await deleteProduct.mutateAsync(productToDelete.id);

        setProductToDelete(null);
        setDeleteOpen(false);
    }

    const columns = useMemo(
        () =>
            getProductColumns({
                onEdit: handleEdit,
                onDelete: handleDelete,
            }),
        [],
    );

    return {
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
    }
}