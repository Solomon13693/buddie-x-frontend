export interface AuthType {
    fullname?: string;
    email?: string;
    phone?: string;
    password?: string;
    role?: string;
    confirmPassword?: string;
    gender?: string;
    country?: Country | null;

    title?: string;
    employer?: string;
    bio?: string;
    yrs_of_experience?: number | null;
    months_of_experience?: number | null;
    linkedin_url?: string;
    tools?: string[];
    skills?: string[];
    expertise?: string[];
    industries?: string[];
    level?: string;

    verification_code?: string;
    token?: string;
    password_confirmation?: string;
}


export interface Country {
    label?: string;
    value?: string;
    iso: string;
    name: string;
}

export interface SocialLinks {
    twitter?: string;
    linkedin?: string;
    website?: string;
    [key: string]: string | undefined;
}

export interface Suspension {
    is_suspended: boolean;
    reason: string | null;
}

export interface BaseUserProfile {
    id: string;
    fullname: string;
    email: string;
    phone: string;
    slug: string;
    avatar: string | null;
    bio: string;
    role: string;
    status: "active" | "inactive" | string;
    timezone: string;
    country: Country;
    suspension: Suspension;
    title: string;
    employer: string;
    created_at: string;
    industries: string[];
    skills: string[];
    career_goals: string[];
    languages: string[];
    social_links: SocialLinks;
    education: any[];
    work_experience: any[];
    expertise: string[];
    level: "Beginner" | "Intermediate" | "Advanced" | string;
}

export interface MenteeProfile extends BaseUserProfile {
    role: "mentee" | "mentor";
}

export interface MentorInfo {
    id: string;
    tools: string[];
    yrs_of_experience: number;
    months_of_experience: number;
    availability: any[];
    approval_status: "pending" | "approved" | "rejected" | string;
    rejection_reason: string | null;
}

export interface MentorProfile extends BaseUserProfile {
    role: "mentee" | "mentor";
    mentor: MentorInfo;
    profile_completion: number;
    total_sessions: number;
    total_completed_sessions: number;
    rejected_sessions: number;
    total_reviews: number;
    average_rating: number;
    average_attendance: string;
    is_top_rated: boolean;
}

export type WorkExperienceType = {
    id: string;
    employer: string;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    is_current: boolean;
};

export type EducationType = {
    id: string;
    institution: string;
    degree: string;
    field_of_study: string;
    start_date: string;
    end_date: string;
};