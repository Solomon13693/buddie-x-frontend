import toast from "react-hot-toast";
import { Pagination } from "../../components";
import { NotificationItem } from "../../components/dashboard";
import { NotificationItemSkeleton } from "../../components/skeleton";
import { Button } from "../../components/ui";
import { useGetNotifications, useMarkAllAsRead } from "../../services";
import { getErrorMessage, useQueryParams } from "../../utils";

const NotificationView = () => {

    const { searchParams } = useQueryParams();

    const currentPage = Number(searchParams.get("page")) || 1;
    const perPage = Number(searchParams.get("perPage")) || 20;

    const params = {
        page: currentPage,
        perPage,
    };

    const { response, isLoading } = useGetNotifications(params);
    const { data, pagination } = response || {};

    const { mutate, isPending } = useMarkAllAsRead()

    const handleAllRead = () => {
        mutate(undefined, {
            onSuccess: () => {
                toast.success("All notifications marked as read");
            },
            onError: (error) => {
                toast.error(getErrorMessage(error));
            },
        });
    };

    return (
        <>

            <div className="flex justify-end mb-4">
                <Button loading={isPending} onPress={handleAllRead}>Mark all as read</Button>
            </div>

            <div className="bg-white rounded-lg p-5">

                {isLoading ? (

                    <NotificationItemSkeleton />

                ) : (
                    <div className="space-y-3 divide-y">

                        {data?.map((notification: any[], index: number) => (

                            <NotificationItem key={index} notification={notification} />

                        ))}

                    </div>
                )}

            </div >

            {/* Pagination */}
            < Pagination
                className="mt-5"
                perPage={perPage}
                total={pagination?.total || 0
                }
            />

        </>
    )
}

export default NotificationView