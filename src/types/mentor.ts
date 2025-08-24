export type MentorType = {
    mentor_id: string;
    slug: string;
    name: string;
    bio: string;
    title: string;
    avatar: string;
    employer: string;
    country: {
        iso: string;
        name: string;
    };
    level: string;
    yrs_of_experience: number;
    total_sessions: number;
    total_completed_sessions: number;
    total_reviews: number;
    average_rating: number;
    average_attendance: string;
    is_top_rated: boolean;
}

export interface FavouriteType {
    wishlist_id: string;
    mentor_id: string;
    slug: string;
    name: string;
    title: string;
    employer: string;
    country: {
        iso: string;
        name: string;
    };
    level: string;
    yrs_of_experience: number;
    total_sessions: number;
    total_completed_sessions: number;
    total_reviews: number;
    average_rating: number;
    average_attendance: string;
    is_top_rated: boolean;
}

export interface Country {
    iso: string;
    name: string;
}

export interface SocialLinks {
    twitter?: string;
    linkedin?: string;
    website?: string;
}

export interface EducationType {
    id: string;
    institution: string;
    degree: string;
    field_of_study: string;
    start_date: string;
    end_date?: string | null;
}

export interface WorkExperienceType {
    id: string;
    employer: string;
    title: string;
    description: string;
    start_date: string;
    end_date?: string | null;
    is_current: boolean;
}

export interface Availability {
    day: string;
    is_available: boolean;
    start_time: string;
    end_time: string;
}

export interface Mentor {
    id: string;
    tools: string[];
    yrs_of_experience: number;
    months_of_experience: number;
    availability: Availability[];
    approval_status: string;
    rejection_reason?: string | null;
}

export interface Suspension {
    is_suspended: boolean;
    reason?: string | null;
}

export interface User {
    id: string;
    fullname: string;
    email: string;
    phone: string;
    avatar: string;
    bio: string;
    role: string;
    status: string;
    gender: string;
    timezone: string;
    country: Country;
    title: string;
    employer: string;
    industries: string[];
    skills: string[];
    career_goals: string[];
    languages: string[];
    social_links?: SocialLinks;
    education: EducationType[];
    work_experience: WorkExperienceType[];
    mentor?: Mentor;
    expertise: string[];
    level: string;
    suspension: Suspension;
    created_at: string;
    profile_completion: number;
}

export interface MentorProfileType {
    user: User;
    profile_completion: number;
    total_sessions: number;
    total_completed_sessions: number;
    total_reviews: number;
    average_rating: number;
    average_attendance: string;
    is_top_rated: boolean;
    availability: Availability[];
}
