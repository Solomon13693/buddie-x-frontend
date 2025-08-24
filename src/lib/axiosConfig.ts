import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { store } from '../redux/store';
import { logout } from '../redux/features/authSlice';

const axiosConfig = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const axiosNoAuth = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


axiosConfig.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = store.getState().auth.token;

        if (!token) {
            console.warn("No token available. Skipping request.");
            return Promise.reject(new AxiosError("No token available", "AUTH_ERROR"));
        }

        config.headers.Authorization = `Bearer ${token}`;

        return config;

    },
    (error: AxiosError) => Promise.reject(error)
);

axiosConfig.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        if (error.response?.status === 401) {
            store.dispatch(logout());
            const callbackUrl = new URLSearchParams(window.location.search).get('callbackUrl') || '/';
            window.location.href = `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`;
        }

        return Promise.reject(error);
    }
);

export default axiosConfig;
