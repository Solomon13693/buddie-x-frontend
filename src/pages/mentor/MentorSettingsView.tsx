import { useEffect, useState } from "react";
import { Tabs } from "../../components";
import { ChangePassword, EducationInfo, MentorProfile, ProfileAvailability, ProfileExpertise, ProfilePersonalInfo, WorkExperience } from "../../components/dashboard/profile";
import { fetchGeneralData } from "../../redux/features/generalDataSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

const navItems = [
  { id: 1, name: "Personal Info" },
  { id: 2, name: "Mentor Profile" },
  { id: 3, name: "Availability" },
  { id: 4, name: "Education" },
  { id: 5, name: "Work Experience" },
  { id: 6, name: "Expertises" },
  { id: 7, name: "Login & Security" },
];

const MentorSettingsView = () => {
  
  const dispatch = useDispatch<AppDispatch>();
  const [active, setActive] = useState<number |  string>(1);

  const getActiveComponent = () => {
    switch (active) {
      case 1:
        return <ProfilePersonalInfo />;
      case 2:
        return <MentorProfile />;
      case 3:
        return <ProfileAvailability />;
      case 4:
        return <EducationInfo />;
      case 5:
        return <WorkExperience />;
      case 6:
        return <ProfileExpertise />;
      case 7:
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

export default MentorSettingsView;
