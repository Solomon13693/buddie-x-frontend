import { useDispatch, useSelector } from "react-redux"
import { useEcho } from "../../context/EchoContext";
import { getUserId } from "../../redux/features/authSlice";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import ChatSidebar from "./ChatSidebar";
import EmptyState from "../EmptyState";
import ChatHeader from "./ChatHeader";
import MessageBody from "./MessageBody";
import ChatInput from "./ChatInput";
import { setSelectedChat } from "../../redux/features/chatSlice";

const MessageView = () => {

    const { receiverUser } = useSelector((state: any) => state.chat);
    const userId = useSelector(getUserId)
    const { echo } = useEcho();
    const queryClient = useQueryClient();
    const dispatch = useDispatch()

    useEffect(() => {

        if (!echo) return;

        const userChannel = echo.private(`user.${userId}`);

        userChannel.listen('.new-message', (event: any) => {
            
            queryClient.invalidateQueries({ queryKey: ['recent_chat'] });

            if (event?.message?.sender_id === userId) {
                dispatch(setSelectedChat({
                    selectedChat: event?.message?.chat_id,
                }));
            }

        });

        return () => {
            userChannel.stopListening('.new-message');
        };
    }, [echo, userId]);

    return (
        <div className="lg:flex h-[87vh] gap-2">

            <ChatSidebar />

            <div className="w-full overflow-hidden transition-all duration-150 bg-white rounded-lg" style={{ backgroundImage: "url(/images/shapes.svg)" }}>

                {!receiverUser ? (

                    <div className="hidden lg:grid h-full place-items-center">
                        <EmptyState img="/img/Inbox_empty.svg" emptyText="No messages yet" />
                    </div>

                ) : (

                    <div className={`h-[87vh] ${receiverUser ? "flex" : "hidden lg:flex"}`}>

                        <div className="relative w-full h-full flex flex-col pb-20">

                            <ChatHeader />

                            <MessageBody />

                            <ChatInput />

                        </div>

                    </div>

                )}

            </div>

        </div>
    )
}

export default MessageView