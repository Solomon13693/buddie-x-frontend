import { Avatar, Badge } from '@heroui/react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserId } from '../../redux/features/authSlice';
import { useGetRecentChat } from '../../services/chat';
import EmptyState from '../EmptyState';
import { RecentchatType } from '../../types';
import { useEcho } from '../../context/EchoContext';
import { setSelectedChat } from '../../redux/features/chatSlice';
import { formatChatTime } from '../../utils';
import { RecentChatSkeleton } from '../skeleton';

const RecentChat = ({ searchQuery } : { searchQuery: string }) => {

    const dispatch = useDispatch();
    const { selectedChat } = useSelector((state: any) => state.chat);

    const userId = useSelector(getUserId);
    const { onlineUsers } = useEcho();
    const { response: recentChats, isLoading } = useGetRecentChat()

    if (isLoading) return <RecentChatSkeleton />;

    if (recentChats.length < 1)
        return (
            <div className="pt-24">
                <EmptyState emptyText="No recent chats found." />
            </div>
        );

    const filteredChats = searchQuery
        ? recentChats.filter((chat: RecentchatType) => {
            const isUserOne = chat.participants.user_one.id === userId;
            const otherUser = isUserOne ? chat.participants.user_two : chat.participants.user_one;
            return otherUser.fullname.toLowerCase().includes(searchQuery.toLowerCase());
        })
        : recentChats;

    if (filteredChats.length < 1) {
        return (
            <div className="pt-24">
                <EmptyState emptyText="No matching chats found." />
            </div>
        );
    }

    return (
        <ul className="!space-y-2">

            {filteredChats.map((chat: RecentchatType, index: number) => {

                const isUserOne = chat.participants.user_one.id === userId;
                const otherUser = isUserOne ? chat.participants.user_two : chat.participants.user_one;
                const isOnline = onlineUsers.includes(otherUser?.id);

                const active = selectedChat === chat.chat_id;

                return (
                    <li key={index} className={`flex items-center justify-between py-3 px-4 relative rounded-lg gap-x-1 cursor-pointer ${active ? 'bg-slate-100' : 'hover:bg-gray-100'
                        }`} onClick={() => dispatch(setSelectedChat({
                            selectedChat: chat?.chat_id,
                            receiverUser: otherUser
                        }))}>

                        <div className="flex items-center gap-3 flex-shrink-0">
                            <Badge
                                title={isOnline ? 'Online' : 'Offline'}
                                color={isOnline ? 'success' : 'default'}
                                content=""
                                placement="bottom-right"
                                shape="circle">
                                <Avatar
                                    size="sm"
                                    isBordered
                                    color="primary"
                                    src={otherUser.avatar || ''}
                                    name={otherUser.fullname}
                                />
                            </Badge>
                        </div>

                        <div className="flex flex-col justify-center flex-grow overflow-hidden px-2">
                            <h5 className="text-[13px] font-medium truncate">{otherUser.fullname}</h5>
                            <p className="text-gray-500 text-xs truncate capitalize">
                                {chat.last_message}
                            </p>
                        </div>

                        <div className="flex flex-col items-end gap-1 flex-shrink-0">

                            <span className="text-gray-800 text-[11px]">
                                {formatChatTime(chat.last_message_time)}
                            </span>

                            {!chat.is_read && (
                                <span className="text-[10px] p-0.5 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                                    {/* Unread indicator */}
                                </span>
                            )}

                        </div>
                    </li>
                );
            })}

        </ul>
    )
}

export default RecentChat;
