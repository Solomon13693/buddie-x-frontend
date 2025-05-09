import { Skeleton } from '@mantine/core'
const RecentChatSkeleton = () => {
    return (
        <ul className="space-y-2 px-2">
            {[...Array(10)].map((_, index) => (
                <li
                    key={index}
                    className="flex items-center justify-between py-3 rounded-lg gap-x-1">

                    <div className="flex items-center gap-3 flex-shrink-0">
                        <Skeleton height={35} circle />
                    </div>

                    <div className="flex flex-col justify-center flex-grow overflow-hidden px-2 w-full">
                        <Skeleton height={12} width="70%" mb={4} radius="sm" />
                        <Skeleton height={10} width="30%" radius="sm" />
                    </div>

                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <Skeleton height={10} width={30} radius="sm" />
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default RecentChatSkeleton