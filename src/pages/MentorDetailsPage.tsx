import { useParams } from "react-router-dom";
import { Container, MentorBanner, Tabs } from "../components"
import { useGetMentorDetails } from "../services";
import { useState } from "react";
import { EducationHistory, MentorOverview, MentorReviews, MentorSessions, WorkExperienceHistory } from "../components/mentors";
import { MentorBannerSkeleton } from "../components/skeleton";

const navItems = [
  { id: 1, name: "About" },
  { id: 2, name: "Sessions" },
  { id: 5, name: "Experience" },
  { id: 4, name: "Education" },
  { id: 3, name: "Reviews" },
];


const MentorDetailsPage = () => {

  const [active, setActive] = useState<number | string>(1);
  const { slug } = useParams();

  const { response, isLoading } = useGetMentorDetails(slug || '')

  const mentor_id = response?.user?.mentor?.id

  const { education, work_experience } = response?.user || {}

  const getActiveComponent = () => {
    switch (active) {
      case 1:
        return <MentorOverview isLoading={isLoading} mentor={response} />;
      case 2:
        return <MentorSessions mentor_id={mentor_id} />; 
      case 5:
        return <WorkExperienceHistory workExperiences={work_experience} />;
      case 4:
        return <EducationHistory education={education} />;
      case 3:
        return <MentorReviews mentor_id={mentor_id} />;
      default:
        return null;
    }
  };
  

  return (
    <div className="pt-12">

      { isLoading ? (
        <MentorBannerSkeleton />
      ) : (
        <MentorBanner mentor={response} />
      )}

      <Container>

        <>

          <Tabs className="!text-xs md:!text-sm" items={navItems} onTabChange={setActive} />

          <main className="py-10 max-w-4xl 2xl:max-w-5xl">
            {getActiveComponent()}
          </main>

        </>

      </Container>

    </div>
  )
}

export default MentorDetailsPage