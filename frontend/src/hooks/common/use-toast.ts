import { useState } from "react";

export interface ToastItem {
    id: number;
    title: string;
    description?: string;
    variant: "success" | "error";
}

export function useToasts() {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    function pushToast(
        title: string,
        description?: string,
        variant: ToastItem["variant"] = "success",
    ) {
        const id = Date.now() + Math.random();

        setToasts((current) => [...current, { id, title, description, variant }]);

        window.setTimeout(() => {
            setToasts((current) => current.filter((toast) => toast.id !== id));
        }, 4000);
    }

    return { toasts, pushToast };
}