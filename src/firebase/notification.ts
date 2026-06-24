import { messaging } from './firebase';
import { getToken, isSupported, onMessage } from 'firebase/messaging';

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY!;

async function getServiceWorkerRegistration(): Promise<ServiceWorkerRegistration> {
    const existing = await navigator.serviceWorker.getRegistration('/firebase-messaging-sw.js');
    if (existing) return existing;

    return navigator.serviceWorker.register('/firebase-messaging-sw.js', {
        scope: '/',
    });
}

export const requestFirebaseNotificationPermission = async (): Promise<string | null> => {
    try {
        if (typeof window === 'undefined' || !('Notification' in window)) {
            console.warn('Notifications are not supported in this browser.');
            return null;
        }

        const supported = await isSupported();
        if (!supported || !messaging) {
            console.warn('Firebase messaging is not supported in this environment.');
            return null;
        }

        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
            console.warn('Notification permission:', permission);
            return null;
        }

        const registration = await getServiceWorkerRegistration();
        await navigator.serviceWorker.ready;

        const token = await getToken(messaging, {
            vapidKey: VAPID_KEY,
            serviceWorkerRegistration: registration,
        });

        return token || null;
    } catch (error) {
        console.error('Error getting FCM token:', error);
        return null;
    }
};

export const onFirebaseMessageListener = (callback: (payload: unknown) => void): (() => void) => {
    if (!messaging) {
        console.warn('Firebase messaging is not available.');
        return () => {};
    }

    return onMessage(messaging, (payload) => {
        callback(payload);

        if (payload.notification?.title) {
            new Notification(payload.notification.title, {
                body: payload.notification.body,
                icon: '/logo/BX_4.png',
            });
        }
    });
};
