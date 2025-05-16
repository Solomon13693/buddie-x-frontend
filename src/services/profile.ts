import { axios } from "../lib";
import { PasswordResetValues } from "../types";

export const updateProfile = async (payload: any) => {
    const response = await axios.post('profile', payload);
    return response.data;
};

export const uploadAvatar = async (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await axios.post('profile/avatar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};


export const updateAvailability = async (payload: any) => {
    const response = await axios.post('profile/availability', payload);
    return response.data;
};

export const updatePassword = async (payload: PasswordResetValues) => {
    const response = await axios.put('profile/password', payload);
    return response.data;
};