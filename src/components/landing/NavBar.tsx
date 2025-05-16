import { Bars3Icon } from "@heroicons/react/24/outline";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {

    const navigate = useNavigate();

    const links = [
        { key: 'find', label: 'Find a mentor', url: '/explore' },
        { key: 'mentor', label: 'Become a mentor', url: '/register' },
        { key: 'login', label: 'Login', url: '/login' },
        { key: 'register', label: 'Sign up', url: '/register' }
    ];

    return (
        <Dropdown size="sm" placement="bottom-end">
            <DropdownTrigger>
                <Button variant="light" isIconOnly>
                    <Bars3Icon className="size-5" />
                </Button>
            </DropdownTrigger>

            <DropdownMenu aria-label="Profile Actions" variant="flat">

                <>
                    {links.map((link) => (
                        <DropdownItem onPress={() => navigate(link.url)} key={link.key} classNames={{ title: '!text-xs' }}>
                            {link.label}
                        </DropdownItem>
                    ))}
                </>
                
            </DropdownMenu>
        </Dropdown>
    );
};

export default NavBar;
