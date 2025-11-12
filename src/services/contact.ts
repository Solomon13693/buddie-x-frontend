import { axios } from "../lib";

export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    phone: string;
    message: string;
}

export const submitContactForm = async (data: ContactFormData) => {
    const response = await axios.post('contact', data);
    return response.data;
};

