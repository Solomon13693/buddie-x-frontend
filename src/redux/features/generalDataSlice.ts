import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosNoAuth } from '../../lib';
import { CategoryType } from '../../types';

export const fetchGeneralData = createAsyncThunk(
    'generalData/fetchGeneralData',
    async (_, { rejectWithValue }) => {
        try {
            const [skillsRes, industriesRes, expertisesRes, toolsRes] = await Promise.all([
                axiosNoAuth.get('/skills'),
                axiosNoAuth.get('/industries'),
                axiosNoAuth.get('/expertises'),
                axiosNoAuth.get('/tools'),
            ]);

            return {
                skills: skillsRes?.data?.data,
                industries: industriesRes?.data?.data,
                expertises: expertisesRes?.data?.data,
                tools: toolsRes?.data?.data,
            };
        } catch (error) {
            return rejectWithValue('Failed to fetch general data');
        }
    }
);

export const fetchSettings = createAsyncThunk(
    'generalData/fetchSettings',
    async (_, { rejectWithValue }) => {
        try {
            const settingsRes = await axiosNoAuth.get('/settings');
            const settingsData = settingsRes?.data?.data;
            // Save to sessionStorage
            sessionStorage.setItem('settings', JSON.stringify(settingsData));
            return settingsData;
        } catch (error) {
            return rejectWithValue('Failed to fetch settings');
        }
    }
);

interface GeneralDataState {
    skills: CategoryType[];
    industries: CategoryType[];
    expertises: CategoryType[];
    tools: CategoryType[];
    settings: any;
    loading: boolean;
    error: string | null;
}

const initialState: GeneralDataState = {
    skills: [],
    industries: [],
    expertises: [],
    tools: [],
    settings: JSON.parse(sessionStorage.getItem('settings') || 'null'),  // Initialize state with sessionStorage data
    loading: false,
    error: null,  // Set error to null initially
};

const generalDataSlice = createSlice({
    name: 'generalData',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGeneralData.pending, (state) => {
                state.loading = true;
                state.error = null;  // Reset error on pending
            })
            .addCase(fetchGeneralData.fulfilled, (state, action) => {
                state.loading = false;
                state.skills = action.payload.skills;
                state.industries = action.payload.industries;
                state.expertises = action.payload.expertises;
                state.tools = action.payload.tools;
            })
            .addCase(fetchGeneralData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Handle fetchSettings
            .addCase(fetchSettings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSettings.fulfilled, (state, action) => {
                state.loading = false;
                state.settings = action.payload; 
            })
            .addCase(fetchSettings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default generalDataSlice.reducer;
