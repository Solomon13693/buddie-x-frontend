import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../lib";

export const getBookings = async (params = {}) => {
    const response = await axios.get('mentor/session', {
        params
    });
    return response.data;
};

export const useGetBookings = (params = {}) => {
    const { data: response, isLoading } = useQuery({
        queryKey: ['bookings', params],
        queryFn: () => getBookings(params),
    });

    return { response, isLoading };
};

export const rejectBookings = async ({ id, reason }: { id: string; reason: string }) => {
    const response = await axios.post(`mentor/session/${id}/reject`, { reason });
    return response.data;
};
export const useRejectBookings = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: { id: string; reason: string }) => rejectBookings(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
        },
        onError: (error: unknown) => {
            return error;
        },
    });
};

export const approveBooking = async (id: string) => {
    const response = await axios.post(`mentor/session/${id}/approve`);
    return response.data;
};
export const useApproveBooking = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => approveBooking(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
        },
        onError: (error: unknown) => {
            return error;
        },
    });
};

export const markAsInProgress = async (id: string) => {
    const response = await axios.post(`mentor/session/${id}/progress`);
    return response.data;
};
export const useMarkAsInProgress = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => markAsInProgress(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
        },
        onError: (error: unknown) => {
            return error;
        },
    });
};

export const uploadSessionResources = async (id: string, formData: FormData) => {
    const response = await axios.post(`mentor/session/${id}/resources`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const useUploadSessionResources = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
            uploadSessionResources(id, formData),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
        },
        onError: (error: unknown) => {
            console.error("Upload Error:", error);
            return error;
        },
    });
};