import { useState } from "react";

interface TabItem {
    id: number;
    name: string;
}

interface TabsProps {
    items: TabItem[];
    onTabChange?: (id: number) => void;
    initialActive?: number;
    className?: string;
}

const Tabs = ({ items, onTabChange, initialActive = 1, className = "" }: TabsProps) => {
    
    const [active, setActive] = useState(initialActive);

    const handleActive = (id: number) => {
        setActive(id);
        onTabChange?.(id);
    };

    return (
        <nav className={`${className}`}>
            <ul className="flex flex-wrap  gap-5 items-center border-b-2 border-[#F5F5F5]">
                {items.map((item) => (
                    <li key={item.id}
                        className={`text-xs text-black100 h-6 cursor-pointer ${active === item.id ? "font-bold border-b-2 border-primary border-solid" : ""
                            }`} onClick={() => handleActive(item.id)}>
                        {item.name}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Tabs;
