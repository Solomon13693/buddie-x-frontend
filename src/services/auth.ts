import { axiosNoAuth } from "../lib";
import { AuthType } from "../types";

export const registerUser = async (payload: AuthType) => {
    const response = await axiosNoAuth.post('auth/register', payload);
    return response.data;
};

export const loginUser = async (payload: AuthType) => {
    const response = await axiosNoAuth.post('auth/login', payload);
    return response.data;
};

export const verifyAccount = async (payload: AuthType) => {
    const response = await axiosNoAuth.post('auth/verify', payload);
    return response.data;
};

export const ResendVerifyCode = async (email: string) => {
    const response = await axiosNoAuth.post('auth/send-verification-code', { email });
    return response.data;
};

export const forgotPassword = async (email: string) => {
    const response = await axiosNoAuth.post('auth/forgotten-password', { email });
    return response.data;
};

export const resetPassword = async (payload: AuthType) => {
    const response = await axiosNoAuth.post('auth/reset-password', payload);
    return response.data;
};
