const PraticeSkills = () => {
    return (
        <div className="bg-[#FCFCFC] py-10 px-5">

            <div className="container bg-[#FAFAFA] p-6 md:p-10">

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-8">

                    <div className="max-w-sm space-y-1.5">
                        <img src="/img/explore/skill.svg" alt="Pratical skills" width={30} height={35} />
                        <h3 className="text-base font-medium text-[#333333]">Pratical skills</h3>
                        <p className="text-xs text-[#74767E] leading-5">
                            Learn proven methods, processes, and best practices - and apply them to your work immediately.
                        </p>
                    </div>

                    <div className="max-w-sm space-y-1.5">
                        <img src="/img/explore/cup.svg" alt="Learn from the best" width={30} height={35} />
                        <h3 className="text-base font-medium text-[#333333]">Learn from the best</h3>
                        <p className="text-xs text-[#74767E] leading-5">
                            Sessions  tailored for your professional needs, led by handpicked, industry Mentors.
                        </p>
                    </div>

                    <div className="max-w-sm space-y-1.5">
                        <img src="/img/explore/card.svg" alt="No subscription fees" width={42} height={29} />
                        <h3 className="text-base font-medium text-[#333333]">No subscription fees</h3>
                        <p className="text-xs text-[#74767E] leading-5">
                            Pay only for sessions you want to take, no monthly fees. Know the exact cost upfront.
                        </p>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default PraticeSkills