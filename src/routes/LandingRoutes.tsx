import { AboutView, BlogListView, BlogView, CommunityView, ContactView, ExploreView, HomeView, MentorDetailsView, MentorsView } from "../pages";

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
    }
];
