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


// Attach token from Redux store
axiosConfig.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = store.getState().auth.token;

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// Handle 401 errors globally
axiosConfig.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        if (error.response?.status === 401) {
            // Dispatch logout action
            store.dispatch(logout());

            // Check if callbackUrl is present in the current URL
            const callbackUrl = new URLSearchParams(window.location.search).get('callbackUrl') || '/';

            // Redirect to the login page with the callbackUrl
            window.location.href = `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`;
        }

        return Promise.reject(error);
    }
);

export default axiosConfig;
