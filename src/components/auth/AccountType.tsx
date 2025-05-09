import React from 'react';

interface AccountTypeProps {
    value: 'mentee' | 'mentor';
    title: string;
    description: string;
    isSelected: boolean;
    onSelect: (value: 'mentee' | 'mentor') => void;
}

const AccountType: React.FC<AccountTypeProps> = ({ value, title, description, isSelected, onSelect }) => {
    return (
        <div className={`border border-slate-300 rounded-lg py-3.5 px-4 cursor-pointer ${isSelected ? 'bg-slate-200' : ''}`} onClick={() => onSelect(value)}>

            <div className="relative flex items-center">

                <div className="block px-1">
                    <h2 className="font-bold text-sm">{title}</h2>
                    <p className="text-xs font-light text-gray-700">{description}</p>
                </div>

            </div>
        </div>
    );
};

export default AccountType;
