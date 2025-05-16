import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { BaseUserProfile } from "../../types/User";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/authSlice";
import { useDispatch } from "react-redux";

const AccountDropdown = ({ profile }: { profile: BaseUserProfile }) => {

    const { fullname, email, role, avatar } = profile || {};

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const links = role === 'mentor' ? [
        { key: 'dashboard', label: 'Dashboard', url: '/mentor/dashboard' },
        { key: 'bookings', label: 'Bookings', url: '/mentor/dashboard/bookings' },
        { key: 'chats', label: 'Chats', url: '/mentor/dashboard/messages' },
        { key: 'settings', label: 'Settings', url: '/mentor/dashboard/settings' }
    ] : [
        { key: 'dashboard', label: 'Dashboard', url: '/dashboard' },
        { key: 'explore', label: 'Explore', url: '/explore' },
        { key: 'bookings', label: 'Bookings', url: '/dashboard/bookings' },
        { key: 'Wishlists', label: 'Wishlists', url: '/dashboard/wishlists' },
        { key: 'chats', label: 'Chats', url: '/dashboard/messages' },
        { key: 'settings', label: 'Settings', url: '/dashboard/settings' }
    ];

    return (
        <Dropdown size="sm" placement="bottom-end">
            <DropdownTrigger>
                <Avatar
                    size="sm"
                    isBordered
                    as="button"
                    className="transition-transform"
                    src={avatar || ''}
                />
            </DropdownTrigger>

            <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="text-sm font-medium truncate"> {fullname} </p>
                    <p className="text-xs truncate"> {email} </p>
                </DropdownItem>

                <>
                    {links.map((link) => (
                        <DropdownItem onPress={() => navigate(link.url)} key={link.key} classNames={{ title: '!text-xs' }}>
                            {link.label}
                        </DropdownItem>
                    ))}
                </>

                <DropdownItem onPress={() => dispatch(logout())} key='logout' classNames={{ title: '!text-xs' }} color="danger">
                    Log Out
                </DropdownItem>
                
            </DropdownMenu>
        </Dropdown>
    );
};

export default AccountDropdown;
