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
    type: "link";
    file_name: string;
    file_url: string;
};

export type BookingType = {
    id: string;
    status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled" | "rejected";
    price: string;
    zoom_meeting_link: string;
    zoom_details: ZoomDetailType[];
    date_and_time: string[];
    payment_status: "paid" | "unpaid" | 'refunded';
    rejection_reason: string | null;
    cancellation_reason: string | null;
    mentor: BaseUserProfile;
    user: BaseUserProfile;
    session: SessionType;
    created_at: string;
    resources: ResourcesType[] | null;
};
