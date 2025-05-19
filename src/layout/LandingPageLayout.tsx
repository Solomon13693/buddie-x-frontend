import { useDispatch, useSelector } from "react-redux";
import { Footer, Header } from "../components";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { fetchProfile } from "../redux/features/authSlice";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { fetchGeneralData } from "../redux/features/generalDataSlice";
import { getFavourites } from "../redux/features/favouriteSlice";
import { SuccessfulPayment } from "../components/modal";

const LandingPageLayout = ({ children }: { children?: React.ReactNode }) => {

    const dispatch = useDispatch<AppDispatch>();
    const { token, role } = useSelector((state: RootState) => state.auth);

    const location = useLocation();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState<"success" | "cancelled" | null>(null);

    useEffect(() => {
        dispatch(fetchProfile());
        dispatch(fetchGeneralData());
    }, [dispatch]);

    useEffect(() => {
        if (token && role === "mentee") {
            dispatch(getFavourites());
        }
    }, [dispatch, token, role]);

    useEffect(() => {

        const queryParams = new URLSearchParams(location.search);

        const statusParam = queryParams.get("status");

        if (statusParam === "success" || statusParam === "cancel") {

            setStatus(statusParam === "success" ? "success" : "cancelled");
            setOpen(true);


            const newSearchParams = new URLSearchParams(location.search);
            newSearchParams.delete("status");
            newSearchParams.delete("session_id");

            const newSearchString = newSearchParams.toString();
            navigate({
                pathname: location.pathname,
                search: newSearchString ? `?${newSearchString}` : "",
            }, { replace: true });
        }
    }, [location, navigate]);

    return (
        <>
            <Header />

            <main className="">{children ? children : <Outlet />}</main>

            <Footer />

            {status && (
                <SuccessfulPayment status={status} open={open} setOpen={setOpen} />
            )}
        </>
    );
};

export default LandingPageLayout;
