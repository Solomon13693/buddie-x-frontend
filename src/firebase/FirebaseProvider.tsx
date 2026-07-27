'use client';

import { createContext, useEffect, useState, ReactNode } from 'react';
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

    const authToken = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (!authToken) return;

        let unsubscribe = () => {};

        const initialize = async () => {
            try {
                const fcmToken = await requestFirebaseNotificationPermission();
                console.log('FCM token:', fcmToken);

                if (!fcmToken) return;

                setToken(fcmToken);

                if (authToken) {
                    await addDeviceToken({ device_token: fcmToken });
                    console.log('Device token saved to backend');
                }

                unsubscribe = onFirebaseMessageListener((payload) => {
                    setMessage(payload);
                });
            } catch (error) {
                console.error('Firebase notification setup error:', error);
            }
        };

        initialize();

        return () => unsubscribe();
    }, [authToken]);

    return (
        <FirebaseNotificationContext.Provider value={{ token, message }}>
            {children}
        </FirebaseNotificationContext.Provider>
    );
}
