export interface ZoomDetail {
    join_url: string;
    start_url: string;
    meeting_id: number;
    passcode: string;
    start_time: string;
}

export interface Mentor {
    id: string;
    fullname: string;
    email: string;
    avatar: string | null;
}

export interface User {
    id: string;
    fullname: string;
    email: string;
    avatar: string | null;
}

export interface SessionType {
    id?: string;
    title: string;
    description: string;
    price: string | number;
    duration: number;
    sessions_count: number;
    frequency: string;
    created_at?: string;
}

export interface SessionRequestType {
    id: string;
    status: string;
    price: string;
    zoom_meeting_link: string | null;
    zoom_details: ZoomDetail[];
    date_and_time: string[];
    payment_status: string;
    rejection_reason: string | null;
    cancellation_reason: string | null;
    mentor: Mentor;
    user: User;
    session: SessionType;
    created_at: string;
    resources: any[];
}

