import { SessionType } from '../../types';
import { PopupModal } from '../ui'

const BookMentorModal = ({ open, close, session }: { open: boolean; close: () => void; session: SessionType }) => {

    console.log(session)

    return (
        <PopupModal
            size="4xl"
            isOpen={open}
            onClose={close}
            placement="center"
            className="max-h-[95vh]">

            <div className="py-5">

                <h1 className="text-xs sm:text-sm font-medium mb-5 uppercase">Session Resources</h1>

            </div>

        </PopupModal>
    )
}

export default BookMentorModal