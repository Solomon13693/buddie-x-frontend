import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../lib";

interface PostReviewData {
    mentor_id: string;
    rating: number;
    review: string;
}

export const postReview = async (data: PostReviewData) => {
    const response = await axios.post('/user/review', data);
    return response.data;
};

export const usePostReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: postReview,
        onSuccess: (_, variables) => {
            // Invalidate mentor reviews to refresh the list
            queryClient.invalidateQueries({ queryKey: ['mentors_review', variables.mentor_id] });
            queryClient.invalidateQueries({ queryKey: ['reviews'] });
        }
    });
};

