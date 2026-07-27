import { AboutView, BlogListView, BlogView, CommunityStandardsView, CommunityView, ContactView, ExploreView, HomeView, MentorDetailsView, MentorsView, PrivacyPolicyView, RefundPolicyView, TermsOfServiceView, TrustAndSafetyView } from "../pages";

export const LandingRoutes = [
    {
        path: "",
        element: <HomeView />
    },
    {
        path: "about",
        element: <AboutView />
    },
    {
        path: "community",
        element: <CommunityView />
    },
    {
        path: "blog",
        element: <BlogListView />
    },
    {
        path: "blog/:slug",
        element: <BlogView />
    },
    {
        path: "explore",
        element: <ExploreView />
    },
    {
        path: "mentors",
        element: <MentorsView />
    },
    {
        path: "mentor/:idOrSlug",
        element: <MentorDetailsView />
    },
    {
        path: "contact",
        element: <ContactView />
    },
    {
        path: "privacy-policy",
        element: <PrivacyPolicyView />
    },
    {
        path: "terms-of-service",
        element: <TermsOfServiceView />
    },
    {
        path: "refund-policy",
        element: <RefundPolicyView />
    },
    {
        path: "trust-and-safety",
        element: <TrustAndSafetyView />
    },
    {
        path: "community-standards",
        element: <CommunityStandardsView />
    }
];
