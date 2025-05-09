export function getErrorMessage(error: unknown): string {
    if (error && typeof error === "object" && "message" in error && !("response" in error)) {
        return (error as Error).message;
    }

    if (error && typeof error === "object" && "response" in error) {
        const response = (error as { response?: { data?: { message?: string, errors?: Record<string, any> } } }).response?.data;

        if (response?.errors) {
            const errorMessages = Object.values(response.errors).flat();
            return errorMessages.length > 0 ? errorMessages[0] : "An unknown error occurred";
        }

        return response?.message || "An unknown error occurred";
    }

    return "An unknown error occurred";
}
