import { Badge, Button } from "@heroui/react"
import { Container, Pagination } from "../components"
import SearchBar from "../components/SearchBar"
import { useDisclosure } from "@mantine/hooks"
import { FilterSlider, MentorCard } from "../components/explore"
import { useQueryParams } from "../utils"
import { useState } from "react"
import { useGetMentors } from "../services"
import EmptyState from "../components/EmptyState"
import { MentorType } from "../types"
import { MentorCardSkeleton } from "../components/skeleton"

function ExploreView() {


    const [search, setSearchQuery] = useState('')
    const [opened, { open, close }] = useDisclosure();

    const { searchParams } = useQueryParams();

    const currentPage = Number(searchParams.get("page")) || 1;
    const perPage = Number(searchParams.get("perPage")) || 20;
    const country = searchParams.get("country") || '';
    const level = searchParams.get("level") || '';
    const language = searchParams.get("language") || '';
    const industry = searchParams.get("industry") || '';
    const skill = searchParams.get("skill") || '';
    const tools = searchParams.get("tools") || '';
    const expertise = searchParams.get("expertise") || '';

    const rawParams = {
        page: currentPage,
        perPage,
        search,
        country,
        level,
        language,
        industry,
        skill,
        tools,
        expertise,
    };

    const params = Object.fromEntries(
        Object.entries(rawParams).filter(([_, value]) => value !== undefined && value !== null && value !== "")
    );

    const filterKeys = ["search", "country", "level", "language", "industry", "skill", "tools", "expertise"];

    const activeFilterCount = filterKeys.reduce((count, key) => {
        if (params[key] !== undefined && params[key] !== "") {
            return count + 1;
        }
        return count;
    }, 0);

    const { response, isLoading } = useGetMentors(params)
    const { total, mentors } = response || {}

    return (
        <>

            <Container>

                <div className="flex items-center gap-4 mb-12">

                    <SearchBar className="!w-full" inputClassName="py-4 bg-white" placeholder="Search by name, company, role"
                        onSearch={(q) => setSearchQuery(q)}
                    />

                    <Badge className="!text-xs !bg-black !text-white" content={activeFilterCount || ''}>
                        <Button onPress={open} variant="bordered" className="!py-7 px-6 !border-1" radius="md">

                            <svg fill="none" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.1172 17.9866H2.88306" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path fillRule="evenodd" clipRule="evenodd" d="M21.1179 17.9866C21.1179 19.5772 19.8285 20.8666 18.2379 20.8666C16.6473 20.8666 15.3579 19.5772 15.3579 17.9866C15.3579 16.3948 16.6473 15.1066 18.2379 15.1066C19.8285 15.1066 21.1179 16.3948 21.1179 17.9866Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M13.8827 6.26212H21.118" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path fillRule="evenodd" clipRule="evenodd" d="M2.8826 6.26211C2.8826 7.85388 4.17201 9.14211 5.7626 9.14211C7.35319 9.14211 8.6426 7.85388 8.6426 6.26211C8.6426 4.67152 7.35319 3.38211 5.7626 3.38211C4.17201 3.38211 2.8826 4.67152 2.8826 6.26211Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>

                            <span className="hidden md:block">
                                Filter
                            </span>

                        </Button>
                    </Badge>

                </div>

                { isLoading ? (

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-3">
                        {Array.from({ length: 12 }).map((_, index) => (
                            <MentorCardSkeleton key={index} />
                        ))}
                    </div>

                ) : mentors && mentors.length > 0 ? (

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-3">

                        {mentors?.map((mentor: MentorType, index: number) => (
                            <MentorCard key={index} mentor={mentor} />
                        ))}

                    </div>

                ) : (

                    <div className="flex justify-center items-center h-[53vh]">
                        <EmptyState
                            emptyText="No mentors available right now. 
                            Check back later or update your search." />
                    </div>

                )}

                {mentors && mentors.length > 0 && (
                    <Pagination className="mt-12" total={total || 0} perPage={perPage} />
                )}

            </Container>

            <FilterSlider isOpen={opened} onClose={close} />

        </>
    )
}

export default ExploreView