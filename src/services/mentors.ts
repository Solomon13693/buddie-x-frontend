import { useQuery } from "@tanstack/react-query";
import { axios, axiosNoAuth } from "../lib";

export const getMentors = async (params = {}) => {
    const response = await axiosNoAuth.get('mentors', {
        params
    });
    return response?.data;
};

export const getTopMentors = async (limit = 6) => {
    const response = await axiosNoAuth.get('mentors/top', {
        params: { limit }
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

export const useGetTopMentors = (limit = 6) => {
    const { data: response, isLoading } = useQuery({
        queryKey: ['topMentors', limit],
        queryFn: () => getTopMentors(limit),
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

export const getMentorCommunities = async (id: string) => {
    const response = await axiosNoAuth.get(`mentors/${id}/communities`);
    return response?.data?.communities;
};

export const useGetMentorCommunities = (id: string) => {
    const { data: response, isLoading } = useQuery({
        queryKey: ['mentor_communities', id],
        queryFn: () => getMentorCommunities(id),
        enabled: !!id
    });

    return { response, isLoading };
};


export const getSessionDetails = async (mentorId: string, sessionId: string) => {
    const response = await axiosNoAuth.get(`mentors/${mentorId}/sessions/${sessionId}`);
    return response?.data?.session;
};

export const useGetSessionDetails = (mentorId: string, sessionId: string) => {
    const { data: response, isLoading } = useQuery({
        queryKey: ['session_details', mentorId, sessionId],
        queryFn: () => getSessionDetails(mentorId, sessionId),
        enabled: !!mentorId && !!sessionId
    });

    return { response, isLoading };
};


// GET AVAILABLE DATES
export const fetchVendorAvailableDate = async (params: {}) => {
    const { data } = await axiosNoAuth.post('mentors/available/day', params);
    return data?.data;
};

export const useAvailableDates = (mentorId: string, mentorSessionId: string) => {
    return useQuery({
        queryKey: ['available_date', mentorId, mentorSessionId],
        queryFn: () =>
            fetchVendorAvailableDate({
                mentor_id: mentorId,
                mentor_session_id: mentorSessionId,
            }),
        enabled: !!mentorId && !!mentorSessionId,
    });
};

// GET AVAILABLE TIME
export const fetchVendorAvailableTime = async (params: {}) => {
    const { data } = await axiosNoAuth.post('mentors/available/time', params);
    return data?.data;
};

export const useAvailableTime = (mentorId: string, mentorSessionId: string, date: string) => {
    return useQuery({
        queryKey: ['available_date', mentorId, mentorSessionId, date],
        queryFn: () =>
            fetchVendorAvailableTime({
                mentor_id: mentorId,
                mentor_session_id: mentorSessionId,
                date: date,
            }),
        enabled: !!mentorId && !!mentorSessionId && !!date,
        retry: 1
    });
};

// BOOK SESSION
export const bookSession = async (payload: { date_and_time: string; mentor_session_id: string }) => {
    const { data } = await axios.post('user/session/book', payload);
    return data;
};
