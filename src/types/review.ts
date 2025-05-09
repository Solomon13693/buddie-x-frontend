export interface ReviewType {
    id: string;
    rating: number;
    review: string;
    status: string;
    created_at: string;
    user: {
        id: string;
        fullname: string;
        email: string;
        avatar: string | null;
    };
    mentor: {
        mentor_id: string;
        mentor_user_id: string;
        fullname: string;
        email: string;
        phone: string;
        avatar: string | null;
    };
}
