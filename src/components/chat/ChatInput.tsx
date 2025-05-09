import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { Button } from '@heroui/react'
import { useMessageUser } from '../../services/chat'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../utils';

const ChatInput = () => {

    const { receiverUser } = useSelector((state: any) => state.chat);

    const [message, setMessage] = useState<string>('')
    const { mutate, isPending } = useMessageUser()

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault()
        if (!message.trim() || !receiverUser) return false

        const payload = {
            receiver_id: receiverUser?.id,
            message
        }

        mutate(payload, {
            onSuccess: () => {
                setMessage('')
            },
            onError: (error) => {
                toast.error(getErrorMessage(error));
            }
        });

    }

    return (
        <div className="absolute !bottom-0 left-0 right-0 py-4 px-4 z-40 w-full lg:p-6 bg-white border-tborder-gray-50 ">

            <form onSubmit={handleSubmit} className="flex gap-2">

                <div className="flex-grow">
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        className="form-control !py-2 rounded-lg"
                        placeholder="Enter Message..."
                        disabled={isPending}
                    />
                </div>

                <div className="flex items-center gap-x-2">

                    <Button
                        isLoading={isPending}
                        radius='sm'
                        isIconOnly
                        color='primary'
                        type="submit">
                        <PaperAirplaneIcon className='size-4 text-white' />
                    </Button>

                </div>

            </form>

        </div>
    )
}

export default ChatInput