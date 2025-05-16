import { useDispatch } from "react-redux";
import { Footer, Header } from "../components"
import { AppDispatch } from "../redux/store";
import { useEffect } from "react";
import { fetchProfile } from "../redux/features/authSlice";
import { Outlet } from "react-router-dom";
import { fetchGeneralData } from "../redux/features/generalDataSlice";
import { getFavourites } from "../redux/features/favouriteSlice";

const LandingPageLayout = ({ children }: { children?: React.ReactNode }) => {

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchProfile());
        dispatch(fetchGeneralData());
        dispatch(getFavourites());
    }, [dispatch]);

    return (
        <>

            <Header />

            <main className="py-12">
                {children ? children : <Outlet />}
            </main>

            <Footer />

        </>
    )
}

export default LandingPageLayout