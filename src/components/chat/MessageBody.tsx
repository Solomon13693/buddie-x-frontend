import { useEffect, useRef, useState } from "react"
import ChatBubble from "./ChatBubble"
import { markAsRead, useGetMessagesByRoom } from "../../services/chat"
import { useSelector } from "react-redux";
import { LoadingOverlay } from "@mantine/core";
import { getUserId } from "../../redux/features/authSlice";
import { MessageType } from "../../types";
import { useEcho } from "../../context/EchoContext";

const MessageBody = () => {

    const userId = useSelector(getUserId);
    const { selectedChat } = useSelector((state: any) => state.chat);
    const { response: initialMessages, isLoading } = useGetMessagesByRoom(selectedChat || '');
    const [messages, setMessages] = useState<MessageType[]>([]);
    const { listenToChat } = useEcho();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initialize messages with the API response
    useEffect(() => {
        if (initialMessages) {
            setMessages(initialMessages);
        }
    }, [initialMessages]);

    // MARK MESSAGE AS READ
    useEffect(() => {

        if (initialMessages) {
            setMessages(initialMessages);

            // Only mark unread messages from other users as read
            if (initialMessages.some((m: MessageType) => !m.is_read && m.sender_id !== userId)) {
                markAsRead(selectedChat);
            }

        }

    }, [initialMessages, selectedChat, userId]);

    useEffect(() => {
        const unsubscribe = listenToChat(
            selectedChat,
            (newMessage: any) => {
                setMessages(prevMessages => {
                    if (!prevMessages.some(msg => msg.id === newMessage.id)) {
                        return [...prevMessages, newMessage];
                    }
                    return prevMessages;
                });
            },
            (readData) => {
                setMessages(prevMessages =>
                    prevMessages.map(msg =>
                        msg.id === readData.id
                            ? { ...msg, is_read: readData.is_read }
                            : msg
                    )
                );
            }
        );

        return () => {
            unsubscribe();
        };
    }, [selectedChat, listenToChat]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <div className='flex-1 p-4 lg:p-6 overflow-y-auto space-y-2 relative'>

            {messages?.map((message: MessageType) => (
                <ChatBubble
                    key={message.id}
                    message={message}
                    isSender={message.sender_id === userId}
                    isRead={message.is_read}
                />
            ))}

            <div ref={messagesEndRef} className="h-0" />

            <LoadingOverlay
                visible={isLoading}
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 1 }}
                loaderProps={{ color: 'orange', type: 'bars' }}
            />

        </div>
    )
}

export default MessageBody