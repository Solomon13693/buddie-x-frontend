import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axios, destroyAllCookies } from '../../lib';

interface AuthState {
    user: any | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    registration: Record<string, any>; 
    role: string | null
}

const storedUser = sessionStorage.getItem('user');
const storedRegistration = sessionStorage.getItem('registration');
const storedRole = localStorage.getItem('role');

const initialState: AuthState = {
    user: storedUser && storedUser !== 'undefined' ? JSON.parse(storedUser) : null,
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
    registration: storedRegistration ? JSON.parse(storedRegistration) : {},
    role: storedRole ? storedRole : null,
};

export const fetchProfile = createAsyncThunk(
    'auth/fetchProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/profile');
            const data = response.data?.data;

            if (data?.role) {
                localStorage.setItem('role', data.role);
            }

            return data;

        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch profile');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ token: string }>) => {
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
        },
        logout: (state) => {

            state.token = null;
            state.user = null;
            state.registration = {}; 
            state.role = null;
            
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            sessionStorage.removeItem('user');

            destroyAllCookies()

        },
        updateRegData: (state, action: PayloadAction<Record<string, any>>) => {
            const incoming = action.payload;
            if ('role' in incoming && incoming.role !== state.registration.role) {
                state.registration = { role: incoming.role };
            } else {
                state.registration = { ...state.registration, ...incoming };
            }
            sessionStorage.setItem('registration', JSON.stringify(state.registration));
        },        
        resetRegistrationData: (state) => {
            state.registration = {};
            sessionStorage.removeItem('registration');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.user = action.payload;

                if (action.payload?.role) {
                    state.role = action.payload.role;
                    localStorage.setItem('role', action.payload.role);
                }

                sessionStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const getUserProfile = (state: { auth: AuthState }) => state.auth.user;
export const getUserId = (state: { auth: AuthState }) => state.auth.user?.id;
export const getRegistrationData = (state: { auth: AuthState }) => state.auth.registration;
export const getProfileProgress = (state: { auth: AuthState }) => state.auth.user?.profile_completion;

export const getSuspensionAndApproval = (state: { auth: AuthState }) => {
    const user = state.auth.user;
    return {
        suspension: user?.suspension,
        approval: {
            status: user?.mentor?.approval_status,
            rejectionReason: user?.mentor?.rejection_reason,
        },
    };
};

export const { setCredentials, logout, updateRegData, resetRegistrationData } = authSlice.actions;
export default authSlice.reducer;
