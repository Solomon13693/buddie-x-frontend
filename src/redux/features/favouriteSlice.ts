import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { axios } from "../../lib";
import { FavouriteType } from "../../types";
import { getErrorMessage } from "../../utils";
import toast from "react-hot-toast";

interface FavouritesState {
    favourites: FavouriteType[];
    loading: boolean;
    error: string | null;
}

const initialState: FavouritesState = {
    favourites: [],
    loading: false,
    error: null,
};

// Add Favourite
export const addFavourite = createAsyncThunk(
    "favourites/addFavourite",
    async (mentor_id: string, { rejectWithValue }) => {
        try {
            const response = await axios.post("/user/wishlist", { mentor_id });
            toast.success(response?.data?.message);
            return response.data?.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            toast.error(getErrorMessage(error));
            return rejectWithValue(axiosError.response?.data || axiosError.message);
        }
    }
);

// Remove Favourite
export const removeFavourite = createAsyncThunk(
    "favourites/removeFavourite",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/user/wishlist/${id}`);
            toast.success(response?.data?.message);
            return id;
        } catch (error) {
            const axiosError = error as AxiosError;
            toast.error(getErrorMessage(error));
            return rejectWithValue(axiosError.response?.data || axiosError.message);
        }
    }
);

// Get Favourites
export const getFavourites = createAsyncThunk(
    "favourites/getFavourites",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("/user/wishlist");
            return response.data?.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            toast.error(getErrorMessage(error));
            return rejectWithValue(axiosError.response?.data || axiosError.message);
        }
    }
);

const favouritesSlice = createSlice({
    name: "favourites",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addFavourite.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addFavourite.fulfilled, (state, action) => {
                state.loading = false;
                state.favourites.push(action.payload);
            })
            .addCase(addFavourite.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(removeFavourite.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeFavourite.fulfilled, (state, action) => {
                state.loading = false;
                state.favourites = state.favourites.filter(
                    (fav) => fav.wishlist_id !== action.payload
                );
            })
            .addCase(removeFavourite.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getFavourites.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFavourites.fulfilled, (state, action) => {
                state.loading = false;
                state.favourites = action.payload;
            })
            .addCase(getFavourites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const selectFavourites = (state: { favourites: FavouritesState }) => state.favourites.favourites;
export const selectFavouritesLoading = (state: { favourites: FavouritesState }) => state.favourites.loading;
export const selectFavouritesError = (state: { favourites: FavouritesState }) => state.favourites.error;

export default favouritesSlice.reducer;
