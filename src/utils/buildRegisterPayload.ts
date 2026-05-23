import { AuthType } from "../types"

type RegistrationDraft = Record<string, unknown>

const toStringArray = (value: unknown): string[] => {
    if (!Array.isArray(value)) return []
    return value
        .map((item) => {
            if (typeof item === "string") return item
            if (item && typeof item === "object" && "value" in item) {
                return String((item as { value: string }).value)
            }
            if (item && typeof item === "object" && "label" in item) {
                return String((item as { label: string }).label)
            }
            return ""
        })
        .filter(Boolean)
}

const normalizeCountry = (country: unknown): { iso: string; name: string } | null => {
    if (!country || typeof country !== "object") return null

    const c = country as Record<string, string>

    if (c.iso && c.name) {
        return { iso: c.iso, name: c.name }
    }

    if (c.value && c.label) {
        return { iso: c.value, name: c.label }
    }

    return null
}

/**
 * Shape registration data for POST /auth/register (matches backend validator).
 */
export const buildRegisterPayload = (draft: RegistrationDraft): AuthType => {
    const role = draft.role === "mentor" || draft.role === "mentee" ? draft.role : undefined
    const country = normalizeCountry(draft.country)

    const payload: AuthType = {
        role,
        fullname: typeof draft.fullname === "string" ? draft.fullname.trim() : "",
        email: typeof draft.email === "string" ? draft.email.trim() : "",
        phone: typeof draft.phone === "string" ? draft.phone.trim() : "",
        password: typeof draft.password === "string" ? draft.password : "",
        gender: typeof draft.gender === "string" ? draft.gender : "",
        country: country ?? undefined,
        title: typeof draft.title === "string" ? draft.title.trim() : "",
        employer: typeof draft.employer === "string" ? draft.employer.trim() : "",
        level: typeof draft.level === "string" ? draft.level : "",
        bio: typeof draft.bio === "string" ? draft.bio.trim() : "",
        expertise: toStringArray(draft.expertise),
    }

    if (role === "mentor") {
        payload.linkedin_url =
            typeof draft.linkedin_url === "string" ? draft.linkedin_url.trim() : ""
        payload.yrs_of_experience = Number(draft.yrs_of_experience ?? 0)
        payload.months_of_experience = Number(draft.months_of_experience ?? 0)
        payload.skills = toStringArray(draft.skills)
        payload.industries = toStringArray(draft.industries)
        payload.tools = toStringArray(draft.tools)
    }

    return payload
}
