import { useQuery } from "@tanstack/react-query";
import { axios } from "../../lib";

export const getReviews = async (params = {}) => {
    const response = await axios.get('review', {
        params
    });
    return response.data;
};

export const useGetReviews = (params = {}) => {
    const { data: response, isLoading } = useQuery({
        queryKey: ['reviews', params],
        queryFn: () => getReviews(params),
    });

    return { response, isLoading };
};