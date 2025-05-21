import { BarChart } from '@mantine/charts';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { useState, useMemo } from 'react';
import { Skeleton } from '@heroui/react';
import { Dropdown } from '../../ui';
import { useGetViewChart } from '../../../services';

type TimeRange = 'weekly' | 'monthly';

const DashboardChart = () => {

    const [timeRange, setTimeRange] = useState<TimeRange>('weekly');
    const { response, isLoading } = useGetViewChart(timeRange);

    const chartData = useMemo(() => {

        if (!response?.data || !response?.labels) return [];

        const labels = response?.labels || [];

        const { completed = [], rejected = [], pending = [], inProgress = [], confirmed = [], cancelled = [] } = response.data;

        return labels.map((month: string, index: number) => ({
            month,
            Completed: completed[index] || 0,
            Rejected: rejected[index] || 0,
            Pending: pending[index] || 0,
            InProgress: inProgress[index] || 0,
            Confirmed: confirmed[index] || 0,
            Cancelled: cancelled[index] || 0,
        }));
    }, [response]);


    return (
        <div className='bg-white rounded-lg p-5'>

            <div className="flex items-center justify-between">

                <h2 className='text-sm md:text-base font-semibold'>Session Overview</h2>

                <Dropdown
                    className='mb-5'
                    startContent={<CalendarDaysIcon className="size-5" />}
                    variant="bordered"
                    label="Select period"
                    filter
                    items={[
                        { key: 'weekly', text: 'Weekly' },
                        { key: 'monthly', text: 'Monthly' }
                    ]}
                    onChange={(key) => setTimeRange(key as TimeRange)}
                />

            </div>

            {isLoading ? (
                <Skeleton className="rounded-2xl">
                    <div className="h-[350px] rounded-2xl bg-gray-500" />
                </Skeleton>
            ) : (
                <BarChart
                    h={400}
                    minBarSize={2}
                    data={chartData}
                    dataKey="month"
                    withLegend
                    series={
                        [
                            { name: 'Completed', color: 'green.6' },
                            { name: 'Rejected', color: 'red.6' },
                            { name: 'Pending', color: 'yellow.6' },
                            { name: 'InProgress', color: 'blue.6' },
                            { name: 'Confirmed', color: 'teal.6' },
                            { name: 'Cancelled', color: 'gray.6' },
                        ]
                    }
                    tickLine="y"
                />
            )}

        </div>
    );
};

export default DashboardChart;
