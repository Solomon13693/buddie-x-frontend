export function getErrorMessage(error: unknown): string {
    if (error && typeof error === "object" && "message" in error && !("response" in error)) {
        return (error as Error).message;
    }

    if (error && typeof error === "object" && "response" in error) {
        const response = (error as { response?: { data?: any } }).response?.data;

        // Case 1: Laravel-style { errors: { field: [...] } }
        if (response?.errors) {
            const errorMessages = Object.values(response.errors).flat();
            return errorMessages.length > 0 ? String(errorMessages[0]) : "An unknown error occurred";
        }

        // Case 2: Your new format { data: { field: [...] } }
        if (response?.data && typeof response.data === "object") {
            const errorMessages = Object.values(response.data).flat();
            return errorMessages.length > 0 ? String(errorMessages[0]) : response?.message || "An unknown error occurred";
        }

        // Case 3: Just a single message
        return response?.message || "An unknown error occurred";
    }

    return "An unknown error occurred";
}
