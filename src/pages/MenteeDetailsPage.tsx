import { useParams } from "react-router-dom";
import { Container, Tabs } from "../components"
import { useGetMenteeDetails } from "../services";
import { useState } from "react";
import { EducationHistory, WorkExperienceHistory } from "../components/mentors";
import MenteeBanner from "../components/mentees/MenteeBanner";
import MenteeOverview from "../components/mentees/MenteeOverview";
import { Skeleton } from "@heroui/react";

const navItems = [
  { id: 1, name: "About" },
  { id: 2, name: "Experience" },
  { id: 3, name: "Education" },
];

const MenteeDetailsPage = () => {
  const [active, setActive] = useState<number | string>(1);
  const { slug } = useParams();

  const { response, isLoading } = useGetMenteeDetails(slug || '')

  const { education, work_experience } = response || {}

  const getActiveComponent = () => {
    switch (active) {
      case 1:
        return <MenteeOverview isLoading={isLoading} mentee={response} />;
      case 2:
        return <WorkExperienceHistory workExperiences={work_experience} />;
      case 3:
        return <EducationHistory education={education} />;
      default:
        return null;
    }
  };

  if (!response && !isLoading) {
    return (
      <Container>
        <div className="py-10 text-center">
          <p className="text-gray-500">Mentee profile not found</p>
        </div>
      </Container>
    );
  }

  return (
    <div className="">
      {isLoading ? (
        <div className="relative overflow-hidden mb-12">
          <div className="relative py-4 sm:py-6 px-5 xl:px-14 2xl:px-28 h-36 sm:h-44 bg-no-repeat bg-cover flex justify-between items-start overflow-hidden" style={{ backgroundImage: `url('https://adplist.org/photos/cover-photo.png')` }}>
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
          <div className="flex items-start gap-x-3 mt-4 px-5 xl:px-14 2xl:px-28">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>
      ) : response ? (
        <MenteeBanner mentee={response} />
      ) : null}

      <Container>
        <>
          <Tabs className="!text-xs md:!text-sm" items={navItems} onTabChange={setActive} />

          <main className="py-10">
            {getActiveComponent()}
          </main>
        </>
      </Container>
    </div>
  )
}

export default MenteeDetailsPage

