const SessionCardSkeleton = () => {
    return (
        <div className="border-l-3 border-l-primary border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
                <div className="w-24 h-5 bg-gray-300 animate-pulse rounded"></div>
                <div className="w-20 h-5 bg-gray-300 animate-pulse rounded"></div>
            </div>
            <div className="text-[13px] space-y-2">
                <div className="w-32 h-5 bg-gray-300 animate-pulse rounded"></div>
                <div className="w-full h-5 bg-gray-300 animate-pulse rounded"></div>
                <div className="w-24 h-5 bg-gray-300 animate-pulse rounded"></div>
            </div>
        </div>
    );
};

export default SessionCardSkeleton;
