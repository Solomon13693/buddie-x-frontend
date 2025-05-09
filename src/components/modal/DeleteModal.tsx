import { ShieldExclamationIcon } from '@heroicons/react/24/outline';
import { Button, PopupModal } from '../ui';

const DeleteModal: React.FC<{ title?: string; loading: boolean; open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>>; onDelete?: () => void }> = ({ open, setOpen, title, onDelete, loading }) => {

    const handleDelete = async () => {
        await onDelete?.();
    };

    return (
        <PopupModal
            size='lg'
            isOpen={open}
            onClose={() => setOpen(false)}
            placement='center'
            backdrops='opaque'
            showCloseButton={false}
            className='max-h-[95vh] py-5'>

            <div className="text-center flex flex-col justify-center">

                <ShieldExclamationIcon className='size-12 text-error-400 mb-10 m-auto' />

                <h2 className="text-black text-sm pb-1.5">Are you sure you want to delete this {title} ?</h2>
                <p className="text-gray-800 text-xs">Deleting this {title} is permanent and cannot be undone</p>

                <div className="grid grid-cols-2 gap-4 mt-8">

                    <Button onPress={() => setOpen(false)} variant='bordered' className='border !text-black border-black h-12 w-full'>Cancel</Button>

                    <Button loading={loading} onPress={handleDelete} className='!bg-error-400 !text-white h-12 w-full'>Confirm </Button>

                </div>

            </div>

        </PopupModal>
    )
}

export default DeleteModal