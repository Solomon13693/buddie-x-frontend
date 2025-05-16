import { useQuery } from "@tanstack/react-query";
import { axios } from "../../lib";

export const getStats = async () => {
    const response = await axios.get('user/stats');
    return response.data;
};

export const getViewChart = async (period: string) => {
    const response = await axios.get(`user/chart-stats?period=${period}`);
    return response.data;
};

export const useGetMenteeStats = () => {
    const { data: response, isLoading } = useQuery({
        queryKey: ['mentee_stats'],
        queryFn: getStats,
    });

    return { response, isLoading };
};

export const useGetMenteeChart = (period: string) => {
    const { data: response, isLoading } = useQuery({
        queryKey: ['mentee_overview_chart', period],
        queryFn: () => getViewChart(period),
    });

    return { response, isLoading };
};