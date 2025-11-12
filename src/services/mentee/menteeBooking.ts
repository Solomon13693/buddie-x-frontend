import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../lib";

export const getBookings = async (params = {}) => {
    const response = await axios.get('user/session', {
        params
    });
    return response.data;
};

export const useGetMenteeBookings = (params = {}) => {
    const { data: response, isLoading } = useQuery({
        queryKey: ['mentee_bookings', params],
        queryFn: () => getBookings(params),
    });

    return { response, isLoading };
};

export const cancelBookings = async ({ id, reason }: { id: string; reason: string }) => {
    const response = await axios.post(`user/session/${id}/cancel`, { reason });
    return response.data;
};
export const useCancelBookings = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload:  { id: string; reason: string }) => cancelBookings(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['mentee_bookings'] });
        },
        onError: (error: unknown) => {
            return error;
        },
    });
};

export const requestRefund = async ({ id, reason }: { id: string; reason: string }) => {
    const response = await axios.post(`user/session/refund/${id}`, { reason });
    return response.data;
};
export const useRequestRefund = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload:  { id: string; reason: string }) => requestRefund(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['mentee_bookings'] });
        },
        onError: (error: unknown) => {
            return error;
        },
    });
};

export const markCompleted = async (id: string) => {
    const response = await axios.post(`user/session/${id}/completed`);
    return response.data;
};
export const useMarkAsCompleted = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => markCompleted(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['mentee_bookings'] });
        },
        onError: (error: unknown) => {
            return error;
        },
    });
};

export const rescheduleSession = async (sessionId: string, dateAndTime: string) => {
    const response = await axios.post(`user/session/${sessionId}/reschedule`, {
        date_and_time: dateAndTime
    });
    return response.data;
};

export const useRescheduleSession = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ sessionId, dateAndTime }: { sessionId: string; dateAndTime: string }) =>
            rescheduleSession(sessionId, dateAndTime),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['mentee_bookings'] });
            queryClient.invalidateQueries({ queryKey: ['session'] });
        },
        onError: (error: unknown) => {
            return error;
        },
    });
};