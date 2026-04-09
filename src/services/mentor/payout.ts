import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../lib";

export type PayoutStatus = {
    has_setup: boolean;
    charges_enabled: boolean;
    payouts_enabled: boolean;
    details_submitted: boolean;
    status_message: "enabled" | "pending" | "action_required" | null;
};

export const getPayoutStatus = async (): Promise<{ data: PayoutStatus }> => {
    const response = await axios.get("mentor/payout-status");
    return response.data;
};

export const createOnboardingLink = async (params?: {
    return_url?: string;
    refresh_url?: string;
}): Promise<{ data: { url: string } }> => {
    const response = await axios.post("mentor/payout/onboarding-link", params || {});
    return response.data;
};

export const getPayoutLoginLink = async (): Promise<{ data: { url: string } }> => {
    const response = await axios.post("mentor/payout/login-link");
    return response.data;
};

export const useGetPayoutStatus = () => {
    return useQuery({
        queryKey: ["payout-status"],
        queryFn: () => getPayoutStatus(),
    });
};

export const useCreateOnboardingLink = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (params?: { return_url?: string; refresh_url?: string }) =>
            createOnboardingLink(params),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["payout-status"] });
        },
    });
};

