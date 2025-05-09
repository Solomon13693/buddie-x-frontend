import { Skeleton } from '@mantine/core';

const TableSkeleton = ({ count = 10, height = 40 } : { count?: number, height?: number | string }) => {
    return (
        <div className='space-y-2'>
            {Array.from({ length: count }, (_, i) => (
                <div key={i} style={{ width: '100%' }}>
                    <Skeleton h={height} />
                </div>
            ))}
        </div>
    );
};

export default TableSkeleton;
