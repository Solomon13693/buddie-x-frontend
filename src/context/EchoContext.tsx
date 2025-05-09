import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Pusher from 'pusher-js';
import Echo from 'laravel-echo';
import { store } from '../redux/store';


interface Message {
    id: number;
    sender_id: number;
    receiver_id: number;
    message: string;
    chat_id: number;
    is_read: boolean;
    created_at: string;
}

interface EchoContextType {
    echo: Echo<any> | null;
    onlineUsers: string[];
    listenToChat: (
        chatId: string,
        callback: (message: Message) => void,
        onReadMessage?: (readData: { id: string; is_read: boolean }) => void
    ) => () => void;
}

const EchoContext = createContext<EchoContextType | undefined>(undefined);

interface EchoProviderProps {
    children: ReactNode;
}

export const EchoProvider: React.FC<EchoProviderProps> = ({ children }) => {

    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const [echo, setEcho] = useState<Echo<any> | null>(null);

    const token = store.getState().auth.token;

    useEffect(() => {

        if (!token) return;

        window.Pusher = Pusher;
        Pusher.logToConsole = true

        const echoInstance = new Echo({
            broadcaster: 'pusher',
            key: import.meta.env.VITE_PUSHER_KEY,
            cluster: import.meta.env.VITE_PUSHER_CLUSTER,
            forceTLS: true,
            debug: true,
            encrypted: true,
            authEndpoint: `${import.meta.env.VITE_API_BASE_URL_PUSHER}/broadcasting/auth`,
            auth: {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
            enabledTransports: ['ws', 'wss'],
        });

        // Log connection events
        echoInstance.connector.pusher.connection.bind('connecting', () => {
            console.log('Connecting to Pusher...');
        });

        echoInstance.connector.pusher.connection.bind('connected', () => {
            console.log('Connected to Pusher!');
        });

        echoInstance.connector.pusher.connection.bind('disconnected', () => {
            console.log('Disconnected from Pusher.');
        });

        echoInstance.connector.pusher.connection.bind('error', (error: any) => {
            console.error('Pusher connection error:', error);
        });

        setEcho(echoInstance);

        echoInstance.join('presence-chat')
            .here((users: any[]) => {
                const ids = users.map(u => u.id);
                setOnlineUsers(ids);
            })
            .joining((user: any) => {
                setOnlineUsers(prev => [...prev, user.id]);
            })
            .leaving((user: any) => {
                setOnlineUsers(prev => prev.filter(id => id !== user.id));
            });

        return () => {
            echoInstance.leave('presence-chat');
            echoInstance.disconnect();
        };

    }, [token]);

    const listenToChat = (
        chatId: string,
        onMessage: (message: Message) => void,
        onReadMessage?: (readData: { id: string; is_read: boolean }) => void
    ): (() => void) => {
        
        if (!echo || !chatId) return () => { };

        if (!echo) {
            return () => { };
        }

        if (!chatId) {
            console.warn('No chatId provided');
            return () => { };
        }

        const channelName = `chat.${chatId}`;
        const channel = echo.private(channelName);

        if (!channel) {
            return () => { };
        }

        channel.listen('.message.sent', (value: any) => {
            onMessage(value);
        });

            channel.listen(".message.read", (event: any) => {
                onReadMessage?.(event);
            });

        return () => {
            console.log('Unsubscribing from channel:', channelName);
            channel?.stopListening('.message.sent');
            channel.stopListening('.message.read');
        };
    }

    return (
        <EchoContext.Provider value={{ echo, onlineUsers, listenToChat }}>
            {children}
        </EchoContext.Provider>
    );
};

export const useEcho = (): EchoContextType => {
    const context = useContext(EchoContext);
    if (!context) {
        throw new Error('useEcho must be used within an EchoProvider');
    }
    return context;
};
