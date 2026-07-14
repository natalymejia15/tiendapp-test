export function getErrorMessage(error: unknown): string {
    if (typeof error === "string") {
        return error;
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

    if (error instanceof Error) {
        return error.message;
    }

    return "Something went wrong. Please try again.";
}