import { SessionType } from "./session";
import { BaseUserProfile } from "./User";

export type ZoomDetailType = {
    join_url: string;
    start_url: string;
    meeting_id: number;
    passcode: string;
    start_time: string;
};

export type ResourcesType = {
    type: "link" | "pdf" | "doc" | "docx" | "xls" | "xlsx" | "ppt" | "pptx" | "image" | "png" | "jpg" | "jpeg" | "gif";
    file_name: string;
    file_url: string;
    uploaded_by?: "mentor" | "mentee" | null;
};

export type BookingType = {
    id: string;
    has_reviewed?: boolean;
    status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled" | "rejected" | "rescheduled";
    price: string;
    zoom_meeting_link: string;
    zoom_details: ZoomDetailType[];
    date_and_time: string[];
    payment_status: "paid" | "unpaid" | 'refunded';
    refund_request_status?: 'pending' | 'approved' | 'rejected' | null;
    rejection_reason: string | null;
    cancellation_reason: string | null;
    rescheduled_by: "mentor" | "mentee" | null;
    mentor: BaseUserProfile;
    user: BaseUserProfile;
    session: SessionType;
    created_at: string;
    resources: ResourcesType[] | null;
};
