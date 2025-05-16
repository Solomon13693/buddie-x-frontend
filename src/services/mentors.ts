import { useQuery } from "@tanstack/react-query";
import { axiosNoAuth } from "../lib";

export const getMentors = async (params = {}) => {
    const response = await axiosNoAuth.get('mentors', {
        params
    });
    return response?.data;
};

export const useGetMentors = (params = {}) => {
    const { data: response, isLoading } = useQuery({
        queryKey: ['mentors', params],
        queryFn: () => getMentors(params),
    });

    return { response, isLoading };
};

export const getMentorDetails = async (slug: string) => {
    const response = await axiosNoAuth.get(`mentors/${slug}`);
    return response?.data;
};
export const useGetMentorDetails = (slug: string) => {
    const { data: response, isLoading } = useQuery({
        queryKey: ['mentors', slug],
        queryFn: () => getMentorDetails(slug),
        enabled: !!slug
    });

    return { response, isLoading };
};

export const getMentorsReviews = async (id: string) => {
    const response = await axiosNoAuth.get(`mentors/${id}/reviews`);
    return response?.data?.reviews;
};

export const useGetMentorReviews = (id: string) => {
    const { data: response, isLoading } = useQuery({
        queryKey: ['mentors_review', id],
        queryFn: () => getMentorsReviews(id),
        enabled: !!id
    });

    return { response, isLoading };
};

export const getMentorsSessions = async (id: string) => {
    const response = await axiosNoAuth.get(`mentors/${id}/sessions`);
    return response?.data?.sessions;
};

export const useGetSessions = (id: string) => {
    const { data: response, isLoading } = useQuery({
        queryKey: ['mentors_sessions', id],
        queryFn: () => getMentorsSessions(id),
        enabled: !!id
    });

    return { response, isLoading };
};