import React from 'react';
import SidebarLink from './SidebarLink';
import { Button } from '../ui';
import {
    ArrowRightStartOnRectangleIcon,
    XMarkIcon
} from '@heroicons/react/24/solid';
import { Link, useLocation } from 'react-router-dom';
import { User } from '@heroui/react';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/features/authSlice';

interface LinkItem {
    href: string;
    icon: any;
    text: string;
}

interface SidebarProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    profile: any;
    basePath: string;
    links: LinkItem[];
}

const SideBar: React.FC<SidebarProps> = ({ open, setOpen, profile, basePath, links }) => {

    const location = useLocation();
    const pathname = location.pathname;
    const dispatch = useDispatch<AppDispatch>();

    const handleLinkClick = () => {
        setTimeout(() => {
            setOpen(false);
        }, 100);
    };

    return (
        <>
            {open && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 block xl:hidden z-20"
                    onClick={() => setOpen(false)}
                />
            )}

            <aside className={`sidebar fixed inset-y-0 left-0 flex flex-col overflow-x-hidden px-5 transition-all duration-200 -translate-x-full bg-black border-0 z-10 overflow-y-auto scrollbar-thin ${open && 'translate-x-0'} max-w-72 xl:translate-x-0 w-72 z-50`}>
                <div className="sticky top-0 bg-black w-full z-10 pt-8 pb-4">
                    <div className="flex items-center">
                        <Link to={basePath} className="block ml-2 m-auto text-center text-sm whitespace-nowrap" onClick={handleLinkClick}>
                            <img
                                src='/images/logo.png'
                                width={90}
                                height={28}
                                alt="Logo"
                                className="w-[75px] transition-all duration-200 ease-soft-in-out"
                            />
                        </Link>

                        <Button onPress={() => setOpen(false)} isIconOnly className='bg-transparent border-none xl:hidden'>
                            <XMarkIcon className='size-5 text-white' />
                        </Button>
                    </div>
                </div>

                <div className="flex-grow pt-7">
                    <ul className="flex flex-col pl-0 mb-0 list-none space-y-2 2xl:space-y-3">
                        {links.map((link, index) => {
                            const fullHref = `${basePath}${link.href}`;
                            return (
                                <li key={index} className="w-full">
                                    <SidebarLink
                                        href={fullHref}
                                        Icon={link.icon}
                                        text={link.text}
                                        isActive={pathname === fullHref || (pathname.startsWith(fullHref) && !pathname.slice(fullHref.length).includes("/"))}
                                        onClick={handleLinkClick}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="pt-2.5 pb-4 w-full">
                    <div className="pt-4">
                        <div className="flex items-center justify-between bg-[#1F1F1F] p-3 rounded-xl">
                            <User
                                avatarProps={{
                                    src: profile?.avatar,
                                }}
                                className='text-white'
                                description={profile?.role}
                                name={profile?.fullname}
                            />
                            <Button onClick={() => dispatch(logout())} isIconOnly radius='full' variant='light'>
                                <ArrowRightStartOnRectangleIcon className='w-5 !text-white' />
                            </Button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default SideBar;
