import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib";

interface TabItem {
    id: number | string;
    name: string;
}

interface TabsProps {
    items: TabItem[];
    onTabChange?: (id: number | string) => void;
    initialActive?: number | string;
    className?: string;
}

const Tabs = ({ items, onTabChange, initialActive = 1, className = "" }: TabsProps) => {
    const [active, setActive] = useState<number | string>(initialActive);
    const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
    const containerRef = useRef<HTMLUListElement | null>(null);

    const handleActive = (id: number | string) => {
        setActive(id);
        onTabChange?.(id);
    };

    useEffect(() => {
        const activeTab = document.querySelector(`[data-id="${active}"]`);
        if (activeTab && containerRef.current) {
            const { offsetLeft, offsetWidth } = activeTab as HTMLElement;
            setUnderlineStyle({ width: offsetWidth, left: offsetLeft });
        }
    }, [active, items]);

    return (
        <nav className={cn(className, "relative text-xs")}>
            <ul
                ref={containerRef}
                className="flex flex-wrap gap-5 items-center border-b-2 border-[#F5F5F5] relative"
            >
                {items.map((item) => (
                    <li
                        key={item.id}
                        data-id={item.id}
                        className={`text-black100 h-6 cursor-pointer relative ${
                            active === item.id ? "font-bold" : ""
                        }`}
                        onClick={() => handleActive(item.id)}
                    >
                        {item.name}
                    </li>
                ))}

                {/* Underline */}
                <AnimatePresence>
                    <motion.div
                        className="absolute bottom-[-1px] h-[2px] bg-primary"
                        style={underlineStyle}
                        initial={{ width: 0, left: 0 }}
                        animate={{
                            width: underlineStyle.width,
                            left: underlineStyle.left,
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                </AnimatePresence>
            </ul>
        </nav>
    );
};

export default Tabs;
