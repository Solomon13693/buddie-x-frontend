import React from 'react'
import { Badge, Button, User } from '@heroui/react';
import { Bars2Icon } from '@heroicons/react/24/solid';
import { BellIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useGetUnReadNotifications } from '../../services';


interface DashboardNavProps {
    setOpen: (open: boolean) => void;
    profile: any
}

const DashboardNav: React.FC<DashboardNavProps> = ({ setOpen, profile }) => {

    const navigate = useNavigate()
    const { response } = useGetUnReadNotifications()

    return (
        <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full py-3 !bg-white">

            <nav className="flex basis-full items-center w-full mx-auto px-3 md:px-6">

                <div className="w-full flex items-center ml-auto justify-between sm:gap-x-3 ">

                    <div className="mr-5 md:mr-8">

                        <User
                            avatarProps={{
                                src: profile?.avatar,
                            }}
                            className='text-black'
                            description={profile?.email}
                            name={profile?.fullname}
                        />

                    </div>

                    {/* MENU BAR ICON */}
                    <div className="xl:hidden">
                        <Button onPress={() => setOpen(true)} isIconOnly radius='full' className='text-black bg-transparent border-none'>
                            <Bars2Icon className='size-5 text-black' />
                        </Button>
                    </div>

                    <Badge className='!text-[11px]' color="danger" content={response?.unread_count} placement="top-right">
                        <Button onPress={() => navigate('notifications')} className='bg-gray-200 rounded-full' isIconOnly>
                            <BellIcon className='size-5' />
                        </Button>
                    </Badge>

                </div>

            </nav>

        </header>
    )
}

export default DashboardNav