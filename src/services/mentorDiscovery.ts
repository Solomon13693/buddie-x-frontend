import { useQuery } from "@tanstack/react-query"
import { axiosNoAuth } from "../lib"

export type MentorDiscoveryOption = {
    label: string
    value: string
}

export type MentorDiscoveryFilterParam =
    | "country"
    | "language"
    | "level"
    | "industry"
    | "skill"
    | "expertise"
    | "tools"
    | "search"

export type MentorDiscoveryStep = {
    id: number
    question: string
    filter_param: MentorDiscoveryFilterParam | null
    options: MentorDiscoveryOption[]
}

export type MentorDiscoveryQuestionsResponse = {
    steps: MentorDiscoveryStep[]
}

export const getMentorDiscoveryQuestions = async (): Promise<MentorDiscoveryQuestionsResponse> => {
    const response = await axiosNoAuth.get("mentor-discovery/questions")
    const payload = response?.data as MentorDiscoveryQuestionsResponse & {
        data?: MentorDiscoveryQuestionsResponse
    }

    const steps = payload?.steps ?? payload?.data?.steps ?? []

    return { steps: Array.isArray(steps) ? steps : [] }
}

export const useMentorDiscoveryQuestions = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["mentor-discovery", "questions"],
        queryFn: getMentorDiscoveryQuestions,
        staleTime: 1000 * 60 * 30,
    })

    return {
        steps: data?.steps ?? [],
        isLoading,
        isError,
    }
}
