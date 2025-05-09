export type TransactionType = {
    id: string;
    amount: string;
    status: 'pending' | 'processing' | 'successful' | 'failed' | 'canceled' | 'refunded';
    payment_method: string;
    transaction_reference: string;
    refund_date: string | null;
    created_at: string;
    user: {
        id: string;
        name: string;
        email: string;
        avatar: string;
    };
    mentor: {
        id: string;
        name: string;
        email: string;
    };
    session: {
        id: string;
        title: string;
        price: string;
    };
};



export type MentorTransaction = {
    id: string;
    type: 'credit' | 'debit';
    status: 'completed' | 'pending' | 'processing' | 'failed' | 'cancelled'; 
    amount: string;
    event: string;
    previous_balance: string;
    new_balance: string;
    created_at: string; 
    mentor: {
        id: string;
        fullname: string;
        email: string;
        avatar: string;
    };
    session: {
        title: string;
        price: string;
    };
}