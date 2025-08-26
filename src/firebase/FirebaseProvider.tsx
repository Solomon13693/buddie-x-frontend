'use client';

import { createContext, useEffect, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';
import {
    onFirebaseMessageListener,
    requestFirebaseNotificationPermission,
} from './notification';
import { addDeviceToken } from '../services';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface FirebaseNotificationContextType {
    token: string | null;
    message: any;
}

export const FirebaseNotificationContext =
    createContext<FirebaseNotificationContextType>({
        token: null,
        message: null,
    });

export default function FirebaseNotificationProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [token, setToken] = useState<string | null>(null);
    const [message, setMessage] = useState<any>(null);

    // ✅ call useSelector at the top level
    const authToken = useSelector((state: RootState) => state.auth.token) || Cookies.get('token');

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (!authToken) return;

        const initialize = async () => {
            try {
                const fcmToken = await requestFirebaseNotificationPermission();

                if (fcmToken) {
                    setToken(fcmToken);

                    // Save device token to backend
                    await addDeviceToken({ device_token: fcmToken });
                }

                // Listen for foreground messages
                onFirebaseMessageListener().then((payload) => {
                    setMessage(payload);
                });
            } catch (error) {
                console.error('Firebase notification setup error:', error);
            }
        };

        initialize();
    }, [authToken]); 

    return (
        <FirebaseNotificationContext.Provider value={{ token, message }}>
            {children}
        </FirebaseNotificationContext.Provider>
    );
}
