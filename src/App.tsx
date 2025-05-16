import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import { Error, PageNotFound } from "./components";
import { AppLayout, LandingPageLayout, MenteeAppLayout } from "./layout";
import { ForgotPassword, LoginView, Registeration, ResetPassword, VerifyAccount } from "./pages";
import { AuthDirect } from "./components/auth";
import { MenteeRoutes } from "./routes/MenteeRoutes";
import { LandingPageRoutes } from "./routes/LandingPageRoutes";

const router = createBrowserRouter([
  {
    path: "/register",
    element: (
      <AuthDirect>
        <Registeration />
      </AuthDirect>
    ),
  },
  {
    path: "/login",
    element: (
      <AuthDirect>
        <LoginView />
      </AuthDirect>
    ),
  },
  {
    path: "/verify",
    element: (
      <AuthDirect>
        <VerifyAccount />
      </AuthDirect>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <AuthDirect>
        <ForgotPassword />
      </AuthDirect>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <AuthDirect>
        <ResetPassword />
      </AuthDirect>
    ),
  },
  {
    path: "/mentor/dashboard",
    element: <AppLayout />,
    errorElement: <Error />,
    children: AppRoutes,
  },
  {
    path: "/dashboard",
    element: <MenteeAppLayout />,
    errorElement: <Error />,
    children: MenteeRoutes,
  },
  {
    path: "/",
    element: <LandingPageLayout />,
    errorElement: <Error />,
    children: LandingPageRoutes,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
