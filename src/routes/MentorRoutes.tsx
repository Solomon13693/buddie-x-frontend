import { Outlet } from 'react-router-dom';
import { MentorDashboard } from '../pages';

export const rentalRoutes = [
    {
        path: 'mentor/dashboard',
        element: <Outlet />,
        children: [
            {
                index: true,
                element: <MentorDashboard />,
            },
        ],
    },
];
