import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

export const approveReview = async (reviewId: string) => {
    const response = await axios.post(`review/${reviewId}/accept`);
    return response.data;
};

export const useApproveReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: approveReview,
        onSuccess: () => {
            // Invalidate reviews queries to refresh the list
            queryClient.invalidateQueries({ queryKey: ['reviews'] });
            queryClient.invalidateQueries({ queryKey: ['mentors_review'] });
        }
    });
};