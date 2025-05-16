import { useDispatch, useSelector } from "react-redux";
import { Footer, Header } from "../components"
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { fetchProfile } from "../redux/features/authSlice";
import { Outlet } from "react-router-dom";
import { fetchGeneralData } from "../redux/features/generalDataSlice";
import { getFavourites } from "../redux/features/favouriteSlice";

const LandingPageLayout = ({ children }: { children?: React.ReactNode }) => {

    const dispatch = useDispatch<AppDispatch>();
    const { token, role } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        dispatch(fetchProfile());
        dispatch(fetchGeneralData());
    }, [dispatch]);

    useEffect(() => {
        if (token && role === "mentee") {
            dispatch(getFavourites());
        }
    }, [dispatch, token, role]);


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