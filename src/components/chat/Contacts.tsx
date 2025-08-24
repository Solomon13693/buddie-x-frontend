import { Avatar, Badge } from '@heroui/react'
import { useDispatch } from 'react-redux';
import { useEcho } from "../../context/EchoContext";
import { useGetAdminLists } from "../../services/chat";
import EmptyState from "../EmptyState";
import { RecentChatSkeleton } from "../skeleton";
import { setSelectedChat } from '../../redux/features/chatSlice';

const Contacts = ({ searchQuery }: { searchQuery: string }) => {
    const dispatch = useDispatch();
    const { onlineUsers } = useEcho();

    const { response: contacts, isLoading } = useGetAdminLists();

    if (isLoading) return <RecentChatSkeleton />;

    if (!contacts || contacts.length < 1) {
        return (
            <div className="pt-24">
                <EmptyState emptyText="No admin found." />
            </div>
        );
    }

    // filter by search query
    const filteredContacts = searchQuery
        ? contacts.filter((user: any) =>
            user.fullname.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : contacts;

    if (filteredContacts.length < 1) {
        return (
            <div className="pt-24">
                <EmptyState emptyText="No matching admins found." />
            </div>
        );
    }

    return (
        <ul className="!space-y-2">
            {filteredContacts.map((admin: any, index: number) => {
                const isOnline = onlineUsers.includes(admin.id);

                return (
                    <li
                        key={index}
                        className="flex items-center justify-between py-3 px-4 rounded-lg gap-x-1 cursor-pointer hover:bg-gray-100"
                        onClick={() =>
                            dispatch(setSelectedChat({
                                selectedChat: null,
                                receiverUser: admin
                            }))
                        }>
                            
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
                                    src={admin.avatar || ''}
                                    name={admin.fullname}
                                />
                            </Badge>
                        </div>

                        {/* Info */}
                        <div className="flex flex-col justify-center flex-grow overflow-hidden px-2">
                            <h5 className="text-[13px] font-medium truncate">{admin.fullname}</h5>
                            <p className="text-gray-500 text-xs truncate capitalize">
                                {admin.role}
                            </p>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default Contacts;
