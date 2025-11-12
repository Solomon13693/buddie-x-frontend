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
    WalletIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    Cog8ToothIcon,
    StarIcon,
    UserGroupIcon,
    EnvelopeIcon,
} from '@heroicons/react/24/solid';
import { Alert } from '@heroui/react'

const AppLayout = () => {

    const [open, setOpen] = useState(false)

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    const profile = useSelector(getUserProfile)

    const mentorLinks = [
        { href: '', icon: Squares2X2Icon, text: 'Dashboard' },
        { href: '/communities', icon: UserGroupIcon, text: 'Communities' },
        { href: '/sessions', icon: BookOpenIcon, text: 'Sessions' },
        { href: '/bookings', icon: BookOpenIcon, text: 'Bookings' },
        { href: '/wallet', icon: WalletIcon, text: 'Wallet' },
        { href: '/reviews', icon: StarIcon, text: 'Reviews' },
        { href: '/transactions', icon: BanknotesIcon, text: 'Transactions' },
        { href: '/messages', icon: ChatBubbleOvalLeftEllipsisIcon, text: 'Messages' },
        { href: '/settings', icon: Cog8ToothIcon, text: 'Settings' },
        { href: '/contact', icon: EnvelopeIcon, text: 'Contact', isRoot: true },
    ];

    const { suspension, approval } = useSelector(getSuspensionAndApproval);
    const hasAlerts = suspension?.is_suspended || approval.status === "rejected" || approval.status === "pending";

    return (
        <>

            <SideBar links={mentorLinks} basePath="/mentor/dashboard"
                profile={profile} open={open} setOpen={setOpen} />

            <main className="relative h-full transition-all duration-200 ease-soft-in-out xl:ml-[18.3rem] bg-[#F4F7FE]">

                <DashboardNav profile={profile} setOpen={setOpen} />

                <div className="w-full p-3 md:p-6 m-auto overflow-x-hidden  min-h-[calc(100vh-100px)]">

                    <div className={`space-y-4 ${hasAlerts && 'pb-7'} `}>
                        {/* Suspension Alert */}
                        {suspension?.is_suspended && (
                            <Alert
                                hideIcon
                                color="danger"
                                description={suspension.reason || "Your account has been suspended. Please contact support for more information."}
                                title="Account Suspended"
                                variant="faded"
                            />
                        )}

                        {/* Approval Rejected Alert */}
                        {approval.status === "rejected" && (
                            <Alert
                                hideIcon
                                color="danger"
                                description={approval.rejectionReason || "Your mentor application was rejected. Please check your profile for more details."}
                                title="Approval Rejected"
                                variant="faded"
                            />
                        )}

                        {/* Approval Pending Alert */}
                        {approval.status === "pending" && (
                            <Alert
                                hideIcon
                                color="secondary"
                                description="Your mentor application is currently under review. You will be notified once the review is complete."
                                title="Approval Pending"
                                variant="faded"
                            />
                        )}
                    </div>

                    <ProtectedRoute requiredRole="mentor" />

                </div>


            </main>


        </>
    )
}

export default AppLayout