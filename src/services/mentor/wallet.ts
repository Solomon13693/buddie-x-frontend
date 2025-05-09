import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../lib";

export const getMentorTransactions = async (params = {}) => {
    const response = await axios.get('mentor/transactions', {
        params
    });
    return response.data;
};

export const getMentorWithdrawal = async (params = {}) => {
    const response = await axios.get('mentor/withdrawals', {
        params
    });
    return response.data;
};

export const getWallet = async () => {
    const response = await axios.get('mentor/wallet');
    return response.data?.data;
};

export const WithdrawalRequest = async (payload: { amount: string; password: string }) => {
    const response = await axios.post('mentor/withdraw', payload);
    return response.data;
};

// REACT QUERY
export const useGetMentorTransactions = (params = {}) => {
    const { data: response, isLoading } = useQuery({
        queryKey: ['mentor_trans', params],
        queryFn: () => getMentorTransactions(params),
    });

    return { response, isLoading };
};
export const useGetMentorWithdrawal = (params = {}) => {
    const { data: response, isLoading } = useQuery({
        queryKey: ['mentor_withdrawal', params],
        queryFn: () => getMentorWithdrawal(params),
    });

    return { response, isLoading };
};
export const useGetWallet = () => {
    const { data: response, isLoading } = useQuery({
        queryKey: ['wallet'],
        queryFn: getWallet,
    });

    return { response, isLoading };
};

export const usePlaceWithdrawal = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: { amount: string; password: string }) => WithdrawalRequest(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['mentor_withdrawal'] });
        },
        onError: (error: unknown) => {
            return error;
        },
    });
};