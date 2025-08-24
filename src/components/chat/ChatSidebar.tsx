import { useSelector } from 'react-redux';
import SearchBar from '../SearchBar'
import RecentChat from './RecentChat'
import { useState } from 'react';
import { Tabs } from '../ui';
import Contacts from './Contacts';

const navItems = [
    { id: 1, name: "Recent Chats" },
    { id: 2, name: "Admins" },
];

const ChatSidebar = () => {

    const { receiverUser } = useSelector((state: any) => state.chat);
    const [searchQuery, setSearchQuery] = useState('')

    const [active, setActive] = useState<number | string>(1);

    return (
        <>

            <div className={`w-full lg:max-w-[350px] 2xl:max-w-[400px] bg-white rounded-lg h-[87vh] py-5 flex-col ${receiverUser ? "hidden lg:flex" : "flex"}`}>

                <div className="px-4 space-y-6 mb-3">

                    <Tabs className="!text-xs md:!text-sm" items={navItems} onTabChange={setActive} />

                    <SearchBar onSearch={(query) => setSearchQuery(query)} className="w-full" placeholder="Search users" />

                    <h5 className="text-sm font-medium">
                        {active === 1 ? "Recent chats" : "Admins"}
                    </h5>

                </div>

                {/* LIST BODY */}
                <ul className="flex flex-col pb-4 px-3 overflow-y-auto">

                    {active === 1 ? (
                        <RecentChat searchQuery={searchQuery} />
                    ) : (
                        <Contacts searchQuery={searchQuery} />
                    )}

                </ul>

            </div>

        </>
    )
}

export default ChatSidebar