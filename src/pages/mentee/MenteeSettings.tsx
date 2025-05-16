import { useEffect, useState } from "react";
import { Tabs } from "../../components";
import { ChangePassword, MenteeProfile, ProfilePersonalInfo } from "../../components/dashboard/profile";
import { fetchGeneralData } from "../../redux/features/generalDataSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

const navItems = [
    { id: 1, name: "Personal Info" },
    { id: 2, name: "Mentee Profile" },
    { id: 3, name: "Login & Security" },
];

const MenteeSettings = () => {

    const dispatch = useDispatch<AppDispatch>();
    const [active, setActive] = useState<number | string>(1);

    const getActiveComponent = () => {
        switch (active) {
            case 1:
                return <ProfilePersonalInfo />;
            case 2:
                return <MenteeProfile />;
            case 3:
                return <ChangePassword />;
        }
    };

    useEffect(() => {
        dispatch(fetchGeneralData());
    }, [dispatch]);

    return (
        <div className="w-full max-w-2xl">
            <section className='board'>
                <Tabs items={navItems} onTabChange={setActive} />
                {getActiveComponent()}
            </section>
        </div>
    );
};

export default MenteeSettings;
