import { useSelector } from 'react-redux';
import SearchBar from '../SearchBar'
import RecentChat from './RecentChat'
import { useState } from 'react';

const ChatSidebar = () => {

    const { receiverUser } = useSelector((state: any) => state.chat);
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <>

            <div className={`w-full lg:max-w-[350px] 2xl:max-w-[400px] bg-white rounded-lg h-[87vh] py-5 flex-col ${receiverUser ? "hidden lg:flex" : "flex"}`}>

                <div className="px-4 space-y-4 mb-4">
                    <SearchBar  onSearch={(query) => setSearchQuery(query)} className="w-full" placeholder="Search users" />
                </div>

                {/* Section Header */}
                <div className="flex items-center justify-between px-4 pb-5">

                    <h5 className="text-sm font-medium">
                        Recent chats
                    </h5>

                </div>

                {/* LIST BODY */}
                <ul className="flex flex-col pb-4 px-3 overflow-y-auto">

                    <RecentChat searchQuery={searchQuery} />

                </ul>

            </div>

        </>
    )
}

export default ChatSidebar