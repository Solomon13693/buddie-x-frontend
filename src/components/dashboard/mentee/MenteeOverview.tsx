import {
    BookOpenIcon,
    CheckCircleIcon,
    ClockIcon,
    UserIcon,
    XCircleIcon,
} from '@heroicons/react/24/solid';
import CountUp from 'react-countup';
import { Skeleton } from '@heroui/react';
import { useGetMenteeStats } from '../../../services';

type DashboardData = {
    total_sessions: number;
    total_completed_sessions: number;
    total_pending_sessions: number;
    total_confirmed_sessions: number;
    total_in_progress_sessions: number;
    total_rejected_sessions: number;
    total_cancelled_sessions: number;
    total_mentors: number;
    [key: string]: number | string;
};

type StatConfig = {
    label: string;
    icon: React.ElementType;
};

const statsConfig: Record<keyof DashboardData, StatConfig> = {
    total_sessions: { label: 'Total Sessions', icon: BookOpenIcon },
    total_completed_sessions: { label: 'Completed Sessions', icon: CheckCircleIcon },
    total_pending_sessions: { label: 'Pending Sessions', icon: ClockIcon },
    total_confirmed_sessions: { label: 'Confirmed Sessions', icon: CheckCircleIcon },
    total_in_progress_sessions: { label: 'In Progress', icon: ClockIcon },
    total_rejected_sessions: { label: 'Rejected Sessions', icon: XCircleIcon },
    total_cancelled_sessions: { label: 'Cancelled Sessions', icon: XCircleIcon },
    total_mentors: { label: 'Mentors', icon: UserIcon },
};

const MenteeOverview = () => {

    const { response, isLoading } = useGetMenteeStats();

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {isLoading ? (
                <>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Skeleton key={i} className="rounded-2xl">
                            <div className="h-20 rounded-2xl bg-gray-500" />
                        </Skeleton>
                    ))}
                </>
            ) : (
                Object.entries(response || {}).map(([key, value]) => {
                    const config = statsConfig[key as keyof DashboardData];
                    if (!config) return null;

                    const Icon = config.icon;

                    return (
                        <div key={key} className="relative flex flex-col w-full bg-white shadow-soft-xl rounded-2xl bg-clip-border">
                            <div className="flex-auto p-4">
                                <div className="flex items-center flex-row -mx-3">
                                    <div className="mx-3 flex items-center justify-center size-12 text-center rounded-full bg-primary/20 text-primary">
                                        <Icon className="size-5" />
                                    </div>
                                    <div className="flex-none ml-6 lg:ml-1">
                                        <p className="text-black text-xs sm:text-sm leading-normal">{config.label}</p>

                                        <h5 className="mb-0 font-semibold text-primary text-xl">
                                            {typeof value === 'number' ? <CountUp end={value as number} /> : String(value)}
                                        </h5>

                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default MenteeOverview;
