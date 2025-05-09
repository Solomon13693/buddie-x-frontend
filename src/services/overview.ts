import { useQuery } from "@tanstack/react-query";
import { axios } from "../lib";

export const getStats = async () => {
    const response = await axios.get('mentor/stats');
    return response.data;
};

export const getViewChart = async (period: string) => {
    const response = await axios.get(`mentor/chart-stats?period=${period}`);
    return response.data;
};

export const useGetStats = () => {
    const { data: response, isLoading } = useQuery({
        queryKey: ['stats'],
        queryFn: getStats,
    });

    return { response, isLoading };
};

export const useGetViewChart = (period: string) => {
    const { data: response, isLoading } = useQuery({
        queryKey: ['overview_chart', period],
        queryFn: () => getViewChart(period),
    });

    return { response, isLoading };
};