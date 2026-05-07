import { MentorDashboard, MentorChats, MentorSessions, MentorTransaction, WalletView, MentorReviewsView, NotificationView, MentorSettingsView, BookingView } from "./mentor";
import {Registeration, LoginView, VerifyAccount, ForgotPassword, ResetPassword } from "./auth";

import { MenteeDashboard, MenteeChat, MenteeSettings, MenteeBookingView, MenteeTransactionView, WishListView } from "./mentee";

import CommunitiesView from "./CommunitiesView";
import CommunityDetailsView from "./CommunityDetailsView";
import PostDetailsView from "./PostDetailsView";

export * from "./(landing)";

export {
    MentorDashboard,
    MentorChats,
    MentorSessions,
    MentorTransaction,
    WalletView,
    MentorReviewsView,
    NotificationView,
    MentorSettingsView,
    BookingView,
    
    Registeration,
    LoginView,
    VerifyAccount,
    ForgotPassword,
    ResetPassword,

    // MENTEE DASHBOARD
    MenteeDashboard,
    MenteeChat,
    MenteeSettings,
    MenteeBookingView,
    MenteeTransactionView,
    WishListView,
    
    CommunitiesView,
    CommunityDetailsView,
    PostDetailsView,
}