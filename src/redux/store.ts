import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice'
import chatReducer from './features/chatSlice'
import generalReducer from './features/generalDataSlice'
import favourite from './features/favouriteSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer,
        favourite: favourite,
        general: generalReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
