import { configureStore, Middleware } from '@reduxjs/toolkit';
import { queryClient } from '../lib/queryClient';
import authReducer from './features/authSlice'
import chatReducer from './features/chatSlice'
import generalReducer from './features/generalDataSlice'
import favourite from './features/favouriteSlice'

const clearCacheOnLogout: Middleware = () => (next) => (action: unknown) => {
    const result = next(action);
    if (typeof action === 'object' && action !== null && 'type' in action && (action as { type: string }).type === 'auth/logout') {
        queryClient.clear();
    }
    return result;
};

export const store = configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer,
        favourite: favourite,
        general: generalReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(clearCacheOnLogout),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
