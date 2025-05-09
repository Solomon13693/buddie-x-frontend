export type RecentchatType = {
    chat_id: string;
    participants: {
        user_one: {
            id: string;
            fullname: string;
            avatar: string | null;
        };
        user_two: {
            id: string;
            fullname: string;
            avatar: string | null;
        };
    };
    last_message: string;
    last_message_sender: string;
    last_message_time: string;
    is_read: boolean;
};


export interface MessageType {
    id: string;
    chat_id: string;
    sender_id: string;
    receiver_id: string;
    message: string;
    is_read: boolean;
    created_at: string;
    updated_at?: string;
}
