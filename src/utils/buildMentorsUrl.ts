/** Build `/mentors` path with filter query string (matches mentors page + API params). */
export const buildMentorsUrl = (params: Record<string, string | undefined | null>) => {
    const search = new URLSearchParams()

    Object.entries(params).forEach(([key, value]) => {
        const trimmed = value?.trim()
        if (trimmed) {
            search.set(key, trimmed)
        }
    })

    const query = search.toString()
    return query ? `/mentors?${query}` : "/mentors"
}
