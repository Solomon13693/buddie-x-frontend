import { axiosNoAuth } from "../lib";

export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    phone: string;
    message: string;
}

export const submitContactForm = async (data: ContactFormData) => {
    const response = await axiosNoAuth.post('contact', data);
    return response.data;
};

