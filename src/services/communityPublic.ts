import { useQuery } from '@tanstack/react-query';
import { axiosNoAuth } from '../lib';
import type { TopCommunityCard } from '../types/community';

export const getTopCommunities = async (limit = 3) => {
    const response = await axiosNoAuth.get<{ data: TopCommunityCard[] }>('communities/top', {
        params: { limit },
    });
    return response.data.data ?? [];
};

export const useTopCommunities = (limit = 3) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['top-communities', limit],
        queryFn: () => getTopCommunities(limit),
        staleTime: 60_000,
    });

    return {
        communities: data ?? [],
        isLoading,
        isError,
    };
};
