import { useMutation, useQuery } from "@tanstack/react-query";
import { axios } from "../lib";

export const getRecentChats = async () => {
    const response = await axios.get('chat/recent');
    return response.data;
};

export const getAdminLists = async () => {
    const response = await axios.get('chat/admin-lists');
    return response.data?.data;
};

export const getMessagesByRoom = async (roomId: string) => {
    const response = await axios.get(`chat/${roomId}/messages`);
    return response.data;
};

export const sendMessage = async (payload: { receiver_id: string, message: string }) => {
    const response = await axios.post('chat/send', payload);
    return response.data;
};

export const markAsRead = async (roomId: string) => {
    const response = await axios.post(`chat/${roomId}/read`);
    return response.data;
};

// === REACT QUERY HOOKS ===
export const useGetRecentChat = () => {
    const { data: response, isLoading } = useQuery({
        queryKey: ['recent_chat'],
        queryFn: () => getRecentChats(),
    });

    return { response, isLoading };
};
export const useGetAdminLists = () => {
    const { data: response, isLoading } = useQuery({
        queryKey: ['admin_lists'],
        queryFn: () => getAdminLists(),
    });

    return { response, isLoading };
};

export const useGetMessagesByRoom = (roomId: string) => {
    const { data: response, isLoading } = useQuery({
        queryKey: ['chats', roomId],
        queryFn: () => getMessagesByRoom(roomId),
        enabled: !!roomId,
        staleTime: 0,
    });

    return { response, isLoading };
};

export const useMessageUser = () => {

    return useMutation({
        mutationFn: (payload: { receiver_id: string, message: string }) => sendMessage(payload),
        onSuccess: () => {
            
        },
        onError: (error: unknown) => {
            return error;
        },
    });
};