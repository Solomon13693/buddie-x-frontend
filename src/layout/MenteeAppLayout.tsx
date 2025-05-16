import { useEffect, useState } from 'react'
import { ProtectedRoute } from './ProtectedRoute'
import { AppDispatch } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfile, getSuspensionAndApproval, getUserProfile } from '../redux/features/authSlice'
import { DashboardNav, SideBar } from '../components/dashboard'
import {
    Squares2X2Icon,
    BookOpenIcon,
    BanknotesIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    Cog8ToothIcon,
    HeartIcon,
    RectangleGroupIcon,
} from '@heroicons/react/24/solid';
import { Alert } from '@heroui/react'
import { getFavourites } from '../redux/features/favouriteSlice'

const MenteeAppLayout = () => {

    const [open, setOpen] = useState(false)

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchProfile());
        dispatch(getFavourites());
    }, [dispatch]);

    const profile = useSelector(getUserProfile)

    const menteeLinks = [
        { href: '', icon: Squares2X2Icon, text: 'Dashboard' },
        { href: '/explore', icon: RectangleGroupIcon, text: 'Explore', isRoot: true },
        { href: '/bookings', icon: BookOpenIcon, text: 'Bookings' },
        { href: '/transactions', icon: BanknotesIcon, text: 'Transactions' },
        { href: '/wishlists', icon: HeartIcon, text: 'Wishlists' },
        { href: '/messages', icon: ChatBubbleOvalLeftEllipsisIcon, text: 'Messages' },
        { href: '/settings', icon: Cog8ToothIcon, text: 'Settings' },
    ];

    const { suspension } = useSelector(getSuspensionAndApproval);
    const hasAlerts = suspension?.is_suspended;

    return (
        <>

            <SideBar links={menteeLinks} basePath="/dashboard"
                profile={profile} open={open} setOpen={setOpen} />

            <main className="relative h-full transition-all duration-200 ease-soft-in-out xl:ml-[18.3rem] bg-[#F4F7FE]">

                <DashboardNav profile={profile} setOpen={setOpen} />

                <div className="w-full p-3 md:p-6 m-auto overflow-x-hidden  min-h-[calc(100vh-100px)]">

                    <div className={`space-y-4 ${hasAlerts && 'pb-7'} `}>

                        {suspension?.is_suspended && (
                            <Alert
                                hideIcon
                                color="danger"
                                description={suspension.reason || "Your account has been suspended. Please contact support for more information."}
                                title="Account Suspended"
                                variant="faded"
                            />
                        )}

                    </div>

                    <ProtectedRoute requiredRole="mentee" />

                </div>


            </main>


        </>
    )
}

export default MenteeAppLayout