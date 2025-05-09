export interface AvailabilityDayType {
    day: string;
    is_available: boolean;
    start_time: string;
    end_time: string;
}

export interface PasswordResetValues {
    old_password: string;
    password: string;
    password_confirmation: string;
}
