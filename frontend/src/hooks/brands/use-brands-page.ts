import { useState } from "react";
import { useDeleteBrand } from "./use-delete-brand";
import { useBrands } from "./use-brands";
import { useCreateBrand } from "./use-create-brand";
import { useUpdateBrand } from "./use-update-brand";
import { Brand } from "@/interfaces";
import { BrandFormValues } from "@/schemas";

interface ToastItem {
    id: number;
    title: string;
    description?: string;
    variant: "success" | "error";
}

export function useBrandsPage() {
    const [open, setOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [brandToDelete, setBrandToDelete] = useState<Brand | null>(null);
    const [toasts, setToasts] = useState<ToastItem[]>([]);
    const deleteBrand = useDeleteBrand();
    const createBrand = useCreateBrand();
    const updateBrand = useUpdateBrand();
    const { data, isLoading, isError } = useBrands();

    function pushToast(title: string, description: string, variant: ToastItem["variant"] = "success") {
        const id = Date.now() + Math.random();

        setToasts((current) => [...current, { id, title, description, variant }]);

        window.setTimeout(() => {
            setToasts((current) => current.filter((toast) => toast.id !== id));
        }, 4000);
    }

    function getErrorMessage(error: unknown) {
        if (typeof error === "string") {
            return error;
        }

        if (error instanceof Error) {
            return error.message;
        }

        const maybeError = error as {
            response?: {
                data?: {
                    message?: string;
                    errors?: unknown;
                };
            };
        };

        if (maybeError.response?.data?.message) {
            return maybeError.response.data.message;
        }

        if (maybeError.response?.data?.errors) {
            const errors = maybeError.response.data.errors;

            if (typeof errors === "string") {
                return errors;
            }

            if (Array.isArray(errors)) {
                return errors.join(", ");
            }

            if (typeof errors === "object") {
                return Object.values(errors).flat().join(", ");
            }
        }

        return "Something went wrong. Please try again.";
    }

    function handleEdit(brand: Brand) {
        setSelectedBrand(brand);
        setOpen(true);
    }

    async function handleSubmit(values: BrandFormValues) {
        try {
            if (selectedBrand) {
                await updateBrand.mutateAsync({
                    id: selectedBrand.id,
                    data: values,
                });

                pushToast("Brand updated", "The brand was updated successfully.");
            } else {
                await createBrand.mutateAsync(values);

                pushToast("Brand created", "The brand was created successfully.");
            }

            setOpen(false);
            setSelectedBrand(null);
        } catch (error) {
            pushToast("Unable to save brand", getErrorMessage(error), "error");
        }
    }

    function handleDelete(brand: Brand) {
        setBrandToDelete(brand);
        setDeleteOpen(true);
    }

    async function confirmDelete() {
        if (!brandToDelete) return;

        try {
            await deleteBrand.mutateAsync(brandToDelete.id);

            pushToast("Brand deleted", "The brand was deleted successfully.");
            setDeleteOpen(false);
            setBrandToDelete(null);
        } catch (error) {
            pushToast("Unable to delete brand", getErrorMessage(error), "error");
        }
    }

    return {
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
    }
}