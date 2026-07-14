import { useMemo, useState } from "react";
import { useDeleteBrand } from "./use-delete-brand";
import { useBrands } from "./use-brands";
import { useCreateBrand } from "./use-create-brand";
import { useUpdateBrand } from "./use-update-brand";
import { Brand } from "@/interfaces";
import { BrandFormValues } from "@/schemas";
import { useToasts } from "../common";
import { getErrorMessage } from "@/lib";
import { getBrandColumns} from "@/components";


export function useBrandsPage() {
    const [open, setOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [brandToDelete, setBrandToDelete] = useState<Brand | null>(null);
    const deleteBrand = useDeleteBrand();
    const createBrand = useCreateBrand();
    const updateBrand = useUpdateBrand();
    const { data, isLoading, isError } = useBrands();
    const { toasts, pushToast } = useToasts();

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
    const columns = useMemo(
        () =>
            getBrandColumns({
                onEdit: handleEdit,
                onDelete: handleDelete,
            }),
        [],
    );


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
        columns
    }
}