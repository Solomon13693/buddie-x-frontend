import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axios } from "../lib";

export const getNotifications = async (params = {}) => {
    const response = await axios.get('/notifications', {
        params
    });
    return response.data?.data;
};

export const getUnreadNotifications = async () => {
    const response = await axios.get('/notifications/unread');
    return response.data?.data;
};

export const markAll = async () => {
    const response = await axios.post('notifications/read-all');
    return response.data;
};

export const markAsRead = async (id: string) => {
    const response = await axios.post(`notifications/read/${id}`);
    return response.data;
};

// QUERY

export const useGetNotifications = (params = {}) => {
    const { data: response, isLoading } = useQuery({
        queryKey: ['notifications', params],
        queryFn: () => getNotifications(params),
    });

    return { response, isLoading };
};

export const useGetUnReadNotifications = () => {
    const { data: response, isLoading } = useQuery({
        queryKey: ['notifications_unread'],
        queryFn: getUnreadNotifications
    });

    return { response, isLoading };
};

export const useMarkAllAsRead = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => markAll(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            queryClient.invalidateQueries({ queryKey: ['notifications_unread'] });
        },
        onError: (error: unknown) => {
            return error;
        },
    });
};

export const useMarkAsRead = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => markAsRead(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
            queryClient.invalidateQueries({ queryKey: ['notifications_unread'] });
        },
        onError: (error: unknown) => {
            return error;
        },
    });
};