import { BellIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import { useMarkAsRead } from "../../services";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils";
import { Badge, Button } from "@heroui/react";
import { CheckIcon } from "@heroicons/react/24/solid";

export default function NotificationItem({ notification }: { notification: any }) {

    const { title, message } = notification?.data;
    const { created_at, id, read_at } = notification || {};

    const { mutate } = useMarkAsRead();

    const handleMarkAsRead = () => {
        mutate(id, {
            onSuccess: () => {
                toast.success("Notification marked as read");
            },
            onError: (error) => {
                toast.error(getErrorMessage(error));
            },
        });
    };

    return (
        <div className="flex items-start sm:items-center gap-4 px-2 md:px-4 pt-3">


            {read_at ? (

                <div className="p-2.5 rounded-full bg-[#F2F4F4] flex-shrink-0 flex items-center justify-center">
                    <BellIcon className="size-5 text-gray-700" />
                </div>

            ) : (
                <Badge color="danger" content="" placement="top-left" shape="circle">
                    <div className="p-2.5 rounded-full bg-[#F2F4F4] flex-shrink-0 flex items-center justify-center">
                        <BellIcon className="size-5 text-gray-700" />
                    </div>
                </Badge >
            )}

            <div className="flex-1 space-y-0.5 w-full sm:w-auto">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                    <div className="flex flex-col gap-y-0.5 w-full sm:max-w-[70%]">

                        <p className="font-medium text-gray-700 text-[13px]">{title}</p>

                        <p className="text-xs text-gray-500 pt-0 mt-0">{message}</p>

                    </div>

                    <div className="flex items-center gap-3 justify-between">

                        <span className="text-[11px] text-gray-500 sm:ml-auto mt-1 sm:mt-0">
                            {moment(created_at).format('LLL')}
                        </span>

                        {!read_at && (
                            <Button size="sm" title='Mark as read' onPress={handleMarkAsRead} 
                            className="bg-gray-200 rounded-full !w-2 !size-5" isIconOnly>
                                <CheckIcon className="size-3" />
                            </Button>
                        )}

                    </div>

                </div>

            </div>

        </div >
    );
}
