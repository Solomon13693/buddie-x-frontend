export default function NotificationItemSkeleton() {
    return (
        <div className="space-y-2">
            {Array.from({ length: 12 }).map((_, index) => (

                <div key={index} className="flex items-start sm:items-center gap-4 px-2 md:px-4 pt-3 animate-pulse">
                    <div className="p-2.5 rounded-full bg-gray-300 flex-shrink-0 w-9 h-9" />
                    <div className="flex-1 space-y-2 w-full sm:w-auto">
                        <div className="h-6 bg-gray-300 rounded w-3/5" />
                        <div className="h-4 bg-gray-300 rounded w-4/5" />
                    </div>
                </div>

            ))}
        </div>
    );
}
