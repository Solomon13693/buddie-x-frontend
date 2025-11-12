import { useParams } from "react-router-dom";
import { Container, MentorBanner } from "../components"
import { useAvailableDates, useGetMentorDetails, useGetSessionDetails } from "../services";
import { MentorBannerSkeleton } from "../components/skeleton";
import { BookingWizard, MentorSessionCard } from "../components/mentors";
import { Spinner } from "@heroui/react";

const MentorServicesBooking = () => {

    const { slug, id } = useParams();

    const { response, isLoading } = useGetMentorDetails(slug || '')

    const mentor_id = response?.user?.mentor?.id
    const isOutOfOffice = response?.user?.mentor?.out_of_office || false

    const { response: data, isLoading: loading } = useGetSessionDetails(mentor_id, id || '')

    const { id: sessionId, frequency, sessions_count } = data || {}

    const { isLoading: isPending, data: availableDates } = useAvailableDates(mentor_id, sessionId);

    return (
        <div className="">

            {isLoading ? (
                <MentorBannerSkeleton />
            ) : (
                <MentorBanner mentor={response} />
            )}

            <Container>

                <div className="max-w-2xl -mt-5">

                    <MentorSessionCard loading={loading} full={true} session={data} />

                    { !isLoading && !loading && (
                        <div className="pt-16">

                            {isPending ? (
                                <div className="flex justify-center py-4">
                                    <Spinner size="lg" />
                                </div>
                            ) : (

                                <BookingWizard
                                    sessionId={sessionId}
                                    mentorId={mentor_id}
                                    availableDates={availableDates} 
                                    frequency={frequency} 
                                    sessions_count={sessions_count}
                                    isOutOfOffice={isOutOfOffice} />

                            )}

                        </div>
                    )}


                </div>

            </Container>

        </div>
    )
}

export default MentorServicesBooking