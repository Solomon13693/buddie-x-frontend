export interface SessionType {
    id?: string;
    mentor_id?: string;
    title: string;
    duration: number;
    sessions_count: number;
    frequency: "one-time" | "fortnightly" | "weekly" | "monthly";
    price: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
}


export type FrequencyType = "one-time" | "weekly" | "fortnightly" | "monthly"