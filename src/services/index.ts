import { registerUser, loginUser, ResendVerifyCode, verifyAccount, forgotPassword, resetPassword } from "./auth";
import { useGetStats, useGetViewChart } from "./overview";

import { useGetMentorSessions, useAddSession, useDeleteSession, useUpdateSession, useGetMentorTransactions, useGetMentorWithdrawal, useGetWallet, usePlaceWithdrawal, useGetReviews } from "./mentor";

import { useGetNotifications, useGetUnReadNotifications, useMarkAllAsRead, useMarkAsRead } from "./notification";

import { updateProfile, updateAvailability, updatePassword } from "./profile";

export {

    registerUser,
    loginUser,
    ResendVerifyCode,
    verifyAccount,
    forgotPassword,
    resetPassword,

    // MENTOR
    useGetStats,
    useGetViewChart,
    useGetMentorSessions,
    useAddSession,
    useDeleteSession,
    useUpdateSession,
    useGetMentorTransactions,
    useGetMentorWithdrawal,
    useGetWallet,
    usePlaceWithdrawal,
    useGetReviews,

    // GENERAL
    useGetNotifications,
    useGetUnReadNotifications,
    useMarkAllAsRead, 
    useMarkAsRead,

    // PROFILE
    updateProfile,
    updateAvailability,
    updatePassword

}