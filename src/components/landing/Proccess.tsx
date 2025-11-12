import Container from "../Container";

const Proccess = () => {
    return (
        <section id="how" className="py-16">
            <Container width="max-w-7xl">
                <div className="text-center pb-16 fadeInUp">
                    <h3 className="border border-[#bebebe] py-2.5 px-5 rounded-3xl text-sm inline-block font-normal mb-[5px]">
                        <i className="ri-arrow-right-up-line text-primary"></i>
                        Mentorship Process
                    </h3>
                    <h2 className="lg:text-xl text-[20px] font-semibold my-2 font-lora">
                        Learn. Grow. Thrive.
                    </h2>
                    <p className="lg:text-base text-sm">Our mentorship program is designed to connect and empower.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 lg:pt-16 pt-0">

                    {/* Step 1 */}
                    <div className="flex flex-col items-center text-center relative sm:px-[25px] px-0">
                        <div className="lg:w-[65px] lg:h-[65px] w-12 h-12 rounded-full flex items-center justify-center border border-[rgba(0,0,0,.08)] relative">
                            <i className="ri-user-add-line text-[25px]"></i>
                            <div className="overlay-list absolute -right-2 -top-2 bg-primary flex justify-center items-center text-white lg:w-8 lg:h-8 w-6 h-6 rounded-full">
                                <span className="lg:font-medium text-xs">01</span>
                            </div>
                        </div>
                        <div className="lg:pt-6 pt-5">
                            <div className="title-box">
                                <h3 className="lg:text-[20px] text-[18px] font-semibold font-lora">
                                    <a href="#">Join as Mentee</a>
                                </h3>
                            </div>
                            <div className="text-box lg:mt-[22px] mt-4">
                                <p className="text-xs md:text-sm leading-6">
                                    Register as a mentee and tell us about your goals, interests, and what you want to achieve through mentorship.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center text-center relative sm:px-[25px] px-0">
                        <div className="absolute top-0 left-[-110px] opacity-50 lg:block hidden">
                            <img src="img/workprocess-shape2.png" alt="shapes" />
                        </div>
                        <div className="lg:w-[65px] lg:h-[65px] w-12 h-12 rounded-full flex items-center justify-center border border-[rgba(0,0,0,.08)] relative">
                            <i className="ri-team-line text-[25px]"></i>
                            <div className="overlay-list absolute -right-2 -top-2 bg-primary flex justify-center items-center text-white lg:w-8 lg:h-8 w-6 h-6 rounded-full">
                                <span className="lg:font-medium text-xs">02</span>
                            </div>
                        </div>
                        <div className="lg:pt-6 pt-5">
                            <div className="title-box">
                                <h3 className="lg:text-[20px] text-[18px] font-semibold font-lora">
                                    <a href="#">Connect with Mentor</a>
                                </h3>
                            </div>
                            <div className="text-box lg:mt-[22px] mt-4">
                                <p className="text-xs md:text-sm leading-6">
                                    Get matched with an experienced mentor who aligns with your interests and will guide your journey.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center text-center relative sm:px-[25px] px-0">
                        <div className="absolute top-0 left-[-110px] opacity-50 lg:block hidden">
                            <img src="img/workprocess-shape1.png" alt="shapes" />
                        </div>
                        <div className="lg:w-[65px] lg:h-[65px] w-12 h-12 rounded-full flex items-center justify-center border border-[rgba(0,0,0,.08)] relative">
                            <i className="ri-lightbulb-flash-line text-[25px]"></i>
                            <div className="overlay-list absolute -right-2 -top-2 bg-primary flex justify-center items-center text-white lg:w-8 lg:h-8 w-6 h-6 rounded-full">
                                <span className="lg:font-medium text-xs">03</span>
                            </div>
                        </div>
                        <div className="lg:pt-6 pt-5">
                            <div className="title-box">
                                <h3 className="lg:text-[20px] text-[18px] font-semibold font-lora">
                                    <a href="#">Grow & Achieve</a>
                                </h3>
                            </div>
                            <div className="text-box lg:mt-[22px] mt-4">
                                <p className="text-xs md:text-sm leading-6">
                                    Learn from real-world experience, set clear milestones, and achieve your personal and professional goals with guidance.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    );
};

export default Proccess;
