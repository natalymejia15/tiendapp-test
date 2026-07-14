import { Product } from "@/interfaces";
import { useMemo, useState } from "react";
import { useProducts } from "./use-products";
import { useBrands } from "../brands";
import { useCreateProduct } from "./use-create-product";
import { useUpdateProduct } from "./use-update-product";
import { useDeleteProduct } from "./use-delete-product";
import { ProductFormValues } from "@/schemas";
import { getProductColumns } from "@/components";
import { useToasts } from "../common";
import { getErrorMessage } from "@/lib";

export const useProductPage = () => {
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const { toasts, pushToast } = useToasts();

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

    async function handleSubmit(values: ProductFormValues) {
        try {
            if (selectedProduct) {
                await updateProduct.mutateAsync({ id: selectedProduct.id, data: values });
                pushToast("Product updated", "The product was updated successfully.");
            } else {
                await createProduct.mutateAsync(values);
                pushToast("Product created", "The product was created successfully.");
            }

            setSelectedProduct(null);
            setOpen(false);
        } catch (error) {
            pushToast("Unable to save product", getErrorMessage(error), "error");
        }
    }
    function handleDelete(product: Product) {
        setProductToDelete(product);
        setDeleteOpen(true);
    }

    async function confirmDelete() {
        if (!productToDelete) return;

        try {
            await deleteProduct.mutateAsync(productToDelete.id);
            pushToast("Product deleted", "The product was deleted successfully.");
            setProductToDelete(null);
            setDeleteOpen(false);
        } catch (error) {
            pushToast("Unable to delete product", getErrorMessage(error), "error");
        }
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
        toasts,
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