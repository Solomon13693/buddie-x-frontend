import React from 'react';
import { Button, PopupModal } from '../ui';

interface ConfirmationModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    description: string;
    onConfirm: () => void;
    confirmText?: string;
    confirmClassName?: string;
    loading?: boolean
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    loading,
    open,
    setOpen,
    title,
    description,
    onConfirm,
    confirmText = 'Confirm',
    confirmClassName = 'bg-error-500',
}) => {
    return (
        <PopupModal
            size='lg'
            isOpen={open}
            onClose={() => setOpen(false)}
            placement='center'
            className='max-h-[95vh] bg-[#fafcfc]'>

            <div className="py-6 space-y-10 mt-3">

                <div>
                    <h2 className='text-black font-medium text-sm sm:text-base'>
                        {title}
                    </h2>
                    <div className="text-gray-700 text-xs sm:text-sm leading-normal pt-0.5">{description}</div>
                </div>

                <Button
                    loading={loading}
                    className={`${confirmClassName} h-12 w-full`}
                    onClick={() => {
                        onConfirm();
                    }}>
                    {confirmText}
                </Button>
            </div>
        </PopupModal>
    );
};

export default ConfirmationModal;
