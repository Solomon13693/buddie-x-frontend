import { useQuery } from "@tanstack/react-query";
import { axiosNoAuth } from "../lib";

export const getPopularIndustries = async (limit = 8) => {
    const response = await axiosNoAuth.get("industries/popular", {
        params: { limit },
    });

    return response?.data?.data;
};

export const useGetPopularIndustries = (limit = 8) => {
    const { data: response, isLoading } = useQuery({
        queryKey: ["popularIndustries", limit],
        queryFn: () => getPopularIndustries(limit),
    });

    return { response, isLoading };
};
