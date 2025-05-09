import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarLinkProps {
    href: string;
    text: string;
    isActive?: boolean;
    Icon: React.ElementType;
    onClick?: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, Icon, text, isActive, onClick }) => {
    const handleClick = () => {
        if (onClick) onClick();
    };

    return (
        <Link
            to={href}
            onClick={handleClick}
            className={`text-xs my-0 flex items-center px-4 py-3 whitespace-nowrap rounded-lg transition-all gap-x-2 ${isActive ? 'bg-slate-800 text-white' : 'text-gray-300'}`}>

            <div className="stroke-none text-lg flex items-center justify-center text-center">
                <Icon className={`h-5 w-5 ${isActive ? 'text-primary' : 'text-gray-300'}`} />
            </div>

            <span className="duration-300 pointer-events-none text-xs ease-soft tracking-wider font-light">
                {text}
            </span>

        </Link>
    );
};

export default SidebarLink;
