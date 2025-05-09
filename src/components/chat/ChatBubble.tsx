import moment from 'moment';
import { MessageType } from '../../types';

interface ChatBubbleProps {
    message: MessageType;
    isSender: boolean;
    isRead: boolean;
}

const ChatBubble = ({ message, isSender, isRead }: ChatBubbleProps) => {
    return (
        <div className={`flex text-xs ${isSender ? 'justify-end' : 'justify-start'}`}>

            <div className={`max-w-[80%] md:max-w-[60%] 2xl:max-w-[40%] p-3 text-xs ${isSender
                ? 'bg-slate-600 text-white rounded-tl-xl rounded-tr-xl rounded-bl-xl'
                : 'bg-primary/20 rounded-tr-xl rounded-tl-xl rounded-br-xl'
                }`}>

                <p className="break-words whitespace-pre-wrap">{message.message}</p>

                <div className="flex items-center justify-end mt-1 space-x-1">

                    <span className="text-[10px] opacity-80">
                        {moment(message.created_at).format('h:mm A')}
                    </span>

                    {isSender && (
                        <span className="text-[10px]">
                            {isRead ? '✓✓' : '✓'}
                        </span>
                    )}

                </div>

            </div>

        </div>
    );
};

export default ChatBubble;