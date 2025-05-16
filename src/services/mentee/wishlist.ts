import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../lib";

export const getWishLists = async () => {
    const response = await axios.get('user/wishlist');
    return response.data?.data;
};

export const useGetWishlist = () => {
    const { data: response, isLoading } = useQuery({
        queryKey: ['wishlists'],
        queryFn: getWishLists,
    });

    return { response, isLoading };
};

export const removeWishlist = async (id: string) => {
    const response = await axios.delete(`user/wishlist/${id}`);
    return response.data;
};
export const useRemoveWishlist = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => removeWishlist(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlists'] });
        },
        onError: (error: unknown) => {
            return error;
        },
    });
};

export const addWishlist = async (mentor_id: string) => {
    const response = await axios.post('user/wishlist', { mentor_id });
    return response.data;
};
export const useAddWishlist = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (mentor_id: string) => addWishlist(mentor_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlists'] });
        },
        onError: (error: unknown) => {
            return error;
        },
    });
};