export interface MenteeProfileType {
    id: string;
    fullname: string;
    handle: string;
    avatar: string;
    bio: string;
    title: string;
    employer: string;
    country: {
        iso: string;
        name: string;
    };
    level: string;
    skills: string[];
    expertise: string[];
    industries: string[];
    career_goals: string[];
    languages: string[];
    education: any[];
    work_experience: any[];
    created_at: string;
}

