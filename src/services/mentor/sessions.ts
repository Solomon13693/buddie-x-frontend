import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../lib";
import { SessionType } from "../../types";

export const getMentorSession = async () => {
    const response = await axios.get('mentor/mentor_session');
    return response.data;
};

export const AddSessions = async (payload: SessionType) => {
    const response = await axios.post('mentor/mentor_session', payload);
    return response.data;
};

export const updateSession = async ({ id, data }: { id: string; data: SessionType }) => {
    const response = await axios.put(`/mentor/mentor_session/${id}`, data);
    return response.data;
};

export const deleteSession = async (payload: { id: string }) => {
    const response = await axios.delete(`mentor/mentor_session/${payload.id}`);
    return response.data;
};

// REACT QUERY
export const useGetMentorSessions = () => {
    const { data: response, isLoading } = useQuery({
        queryKey: ['mentor_session'],
        queryFn: getMentorSession,
    });

    return { response, isLoading };
};

export const useAddSession = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: SessionType) => AddSessions(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['mentor_session'] });
        },
        onError: (error: unknown) => {
            return error;
        },
    });
};

export const useUpdateSession = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateSession,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['mentor_session'] });
        },
        onError: (error: unknown) => {
            return error;
        },
    });
}

export const useDeleteSession = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: { id: string }) => deleteSession(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['mentor_session'] });
        },
        onError: (error: unknown) => {
            return error;
        },
    });
};