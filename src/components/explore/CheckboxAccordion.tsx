import React, { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import SearchBar from "../SearchBar";

interface DataItem {
    key: string;
    label: string;
}

interface CheckboxAccordionProps {
    title: string;
    data: DataItem[];
    onChange?: (selectedCsv: string) => void;
    initialSelectedKeys?: string[];
    maxHeight?: number;
}

const CheckboxAccordion: React.FC<CheckboxAccordionProps> = ({
    title,
    data,
    onChange,
    initialSelectedKeys = [],
    maxHeight = 250,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedKeys, setSelectedKeys] = useState<string[]>(initialSelectedKeys);

    const filteredData = data.filter((item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleSelect = (key: string) => {
        let updatedSelected: string[];
        if (selectedKeys.includes(key)) {
            updatedSelected = selectedKeys.filter((k) => k !== key);
        } else {
            updatedSelected = [...selectedKeys, key];
        }
        setSelectedKeys(updatedSelected);
        if (onChange) {
            onChange(updatedSelected.join(","));
        }
    };

    const clearAll = () => {
        setSelectedKeys([]);
        if (onChange) {
            onChange("");
        }
    };

    return (
        <>
            <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setIsOpen((prev) => !prev)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setIsOpen((prev) => !prev);
                }}
            >
                <span className="text-sm font-medium">{title}</span>

                {selectedKeys.length > 0 ? (
                    <button
                        type="button"
                        className="text-xs font-medium text-danger"
                        onClick={(e) => {
                            e.stopPropagation();
                            clearAll();
                        }}
                    >
                        Clear All
                    </button>
                ) : (
                    <ChevronRightIcon
                        className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-90" : ""
                            }`}
                    />
                )}
            </div>

            {isOpen && (
                <>
                    <SearchBar placeholder="Search" onSearch={setSearchTerm} />

                    <div
                        className="overflow-auto scrollbar-thin flex flex-col gap-y-4 py-2"
                        style={{ maxHeight }}>

                        {filteredData.length > 0 ? (
                            filteredData.map(({ key, label }) => (
                                <label
                                    key={key}
                                    className="flex items-center gap-2 cursor-pointer select-none"
                                >
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded-md !ring-0"
                                        checked={selectedKeys.includes(key)}
                                        onChange={() => toggleSelect(key)}
                                    />
                                    <span className="text-xs font-medium text-gray-600">{label}</span>
                                </label>
                            ))
                        ) : (
                            <p className="text-xs text-gray-400">No results found.</p>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default CheckboxAccordion;
