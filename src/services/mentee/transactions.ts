import { useQuery } from "@tanstack/react-query";
import { axios } from "../../lib";

export const getTransactions = async (params = {}) => {
    const response = await axios.get('user/transactions', {
        params
    });
    return response.data;
};

export const useGetTransactions = (params = {}) => {
    const { data: response, isLoading } = useQuery({
        queryKey: ['mentee_transactions', params],
        queryFn: () => getTransactions(params),
    });

    return { response, isLoading };
};

export const getTransactionsStats = async () => {
    const response = await axios.get('user/transactions/stats');
    return response.data?.stats;
};

export const useGetTransactionsStats = () => {
    const { data: response, isLoading } = useQuery({
        queryKey: ['mentee_transaction_stats'],
        queryFn: () => getTransactionsStats(),
    });

    return { response, isLoading };
};
