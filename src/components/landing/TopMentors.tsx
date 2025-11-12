import { Card, Image, Button } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { useGetTopMentors } from "../../services/mentors";
import { MentorType } from "../../types";
import { MentorCardSkeleton } from "../skeleton";
import Container from "../Container";

const TopMentors = () => {
    const navigate = useNavigate();
    const { response, isLoading } = useGetTopMentors(6);
    const { mentors } = response || {};

    return (
        <section className="py-16">

            <Container width="max-w-7xl">

                <div className="text-center pb-12">
                    <h3 className="border border-[#bebebe] py-2.5 px-5 rounded-3xl text-sm inline-block font-normal mb-[5px]">
                        <i className="ri-arrow-right-up-line text-primary"></i>
                        Top Mentors
                    </h3>
                    <h2 className="lg:text-xl text-[20px] font-semibold my-2 font-lora">
                        Meet Our Expert Mentors
                    </h2>
                    <p className="lg:text-base text-sm">
                        Connect with experienced professionals ready to guide your journey.
                    </p>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, index) => (
                            <MentorCardSkeleton key={index} />
                        ))}
                    </div>
                ) : mentors && mentors.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mentors.slice(0, 6).map((mentor: MentorType) => (
                                <Card
                                    key={mentor.mentor_id}
                                    isFooterBlurred
                                    className="border-none"
                                    radius="lg">
                                    <Image
                                        alt={mentor.name}
                                        className="object-cover object-top"
                                        height={310}
                                        src={mentor.avatar}
                                        width="100%"
                                    />
                                    <div className="pl-3 pr-2 h-auto flex items-center color-inherit subpixel-antialiased bg-gray-900/40 backdrop-blur backdrop-saturate-150 before:bg-gray-900/10 border-gray-900/10 border-1 overflow-hidden py-1.5 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%-10px)] shadow-small ml-[5px] z-10">
                                        <div className="flex flex-col grow">
                                            <p className="text-tiny text-white">{mentor.name}</p>
                                            <p className="text-tiny text-white/80">
                                                {mentor.title}
                                            </p>
                                        </div>
                                        <Button
                                            as={Link}
                                            to={`/mentor/${mentor.slug}`}
                                            className="text-tiny text-white bg-black/30"
                                            color="default"
                                            radius="lg"
                                            size="sm"
                                            variant="flat">
                                            View
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <div className="flex justify-center mt-10">
                            <Button
                                onPress={() => navigate('/explore')}
                                size="lg"
                                color="primary"
                                className="text-xs px-6 h-10"
                            >
                                Show More
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No mentors available at the moment.</p>
                    </div>
                )}

            </Container>

        </section>
    );
};

export default TopMentors;

