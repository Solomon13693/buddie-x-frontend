import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { Avatar, Button } from '@heroui/react'
import { useDispatch, useSelector } from 'react-redux';
import { useEcho } from '../../context/EchoContext';
import { clearSelectedChat } from '../../redux/features/chatSlice';
import { useNavigate } from 'react-router-dom';

const ChatHeader = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleBack = () => {
        dispatch(clearSelectedChat())
    };

    const { receiverUser } = useSelector((state: any) => state.chat);
      const { onlineUsers } = useEcho();

      const isOnline = onlineUsers.includes(receiverUser?.id);

    const handleProfileClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!receiverUser) return;

        if (receiverUser.role === 'mentor' && receiverUser.slug) {
            navigate(`/mentor/${receiverUser.slug}`);
        } else if (receiverUser.role === 'mentee' && receiverUser.handle) {
            navigate(`/mentee/${receiverUser.handle}`);
        }
    };

    return (
        <div className="px-4 lg:px-6 py-3 bg-white border-b border-[#D1D5DB]">

            <div className="flex items-center gap-x-2">

                <div className="block ltr:mr-1 rtl:ml-1 lg:hidden">
                    <Button size='sm' onPress={handleBack} isIconOnly className="bg-white">
                        <ArrowLeftIcon className="size-4" />
                    </Button>
                </div>

                <div 
                    className="flex items-center gap-x-2 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={handleProfileClick}
                >
                    <Avatar size="sm" isBordered color="primary" src={receiverUser?.avatar}
                        name={receiverUser?.fullname} />

                    <div className="-space-y-0.5">

                        <h5 className="text-sm font-medium truncate">
                            {receiverUser?.fullname}
                        </h5>

                        <p className="text-[11px]"> { isOnline ? 'Online' : 'Offline' } </p>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default ChatHeader