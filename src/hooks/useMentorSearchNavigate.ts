import { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { buildMentorsUrl } from "../utils/buildMentorsUrl"

/** Navigate to `/mentors` with a search query (header / home search). */
export const useMentorSearchNavigate = () => {
    const navigate = useNavigate()

    return useCallback(
        (search: string) => {
            const trimmed = search.trim()
            if (!trimmed) return
            navigate(buildMentorsUrl({ search: trimmed }))
        },
        [navigate]
    )
}
