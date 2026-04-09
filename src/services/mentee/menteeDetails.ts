import { useQuery } from "@tanstack/react-query";
import { axios } from "../../lib";

export const getMenteeDetails = async (handle: string) => {
    const response = await axios.get(`mentor/mentee/${handle}`);
    return response?.data?.data;
};

export const useGetMenteeDetails = (handle: string) => {
    const { data: response, isLoading } = useQuery({
        queryKey: ['mentee', handle],
        queryFn: () => getMenteeDetails(handle),
        enabled: !!handle
    });

    return { response, isLoading };
};

