const Features = () => {
    return (
        <section id="features" className="pt-16">
            <div className="container m-auto max-w-6xl">
                <div className="text-center pb-14 fadeInUp">
                    <h3 className="border border-[#bebebe] py-2.5 px-5 rounded-3xl text-sm inline-block font-normal mb-[5px]">
                        <i className="ri-arrow-right-up-line text-primary"></i>
                        Program Highlights
                    </h3>
                    <h2 className="xl:text-[40px] font-lora md:text-[30px] text-black-100 font-medium">
                        Mentorship Benefits
                    </h2>
                    <p className="text-sm md:leading-7 md:text-base mt-2">
                        Unlock your full potential through guidance, support, and networking in our mentorship program.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
                    <div className="text-center py-10 px-6 rounded-[15px] border border-[#bebebe] hover:border-primary transition-all duration-500 fadeInUp">
                        <i className="ri-group-fill text-[50px] text-primary"></i>
                        <h4 className="lg:text-xl text-[20px] font-semibold my-2 font-lora">One-on-One Guidance</h4>
                        <p className="lg:text-base text-sm">
                            Personalized mentorship sessions tailored to your career and personal development goals.
                        </p>
                    </div>

                    <div className="text-center py-10 px-6 rounded-[15px] border border-[#bebebe] hover:border-primary transition-all duration-500 fadeInUp">
                        <i className="ri-lightbulb-flash-line text-[50px] text-primary"></i>
                        <h4 className="lg:text-xl text-[20px] font-semibold my-2 font-lora">Skill Development</h4>
                        <p className="lg:text-base text-sm">
                            Enhance both technical and soft skills with real-world projects and expert feedback.
                        </p>
                    </div>

                    <div className="text-center py-10 px-6 rounded-[15px] border border-[#bebebe] hover:border-primary transition-all duration-500 fadeInUp">
                        <i className="ri-links-line text-[50px] text-primary"></i>
                        <h4 className="lg:text-xl text-[20px] font-semibold my-2 font-lora">Professional Networking</h4>
                        <p className="lg:text-base text-sm">
                            Connect with industry leaders and peers to expand your career opportunities.
                        </p>
                    </div>

                    <div className="text-center py-10 px-6 rounded-[15px] border border-[#bebebe] hover:border-primary transition-all duration-500 fadeInUp">
                        <i className="ri-shield-check-line text-[50px] text-primary"></i>
                        <h4 className="lg:text-xl text-[20px] font-semibold my-2 font-lora">Trusted Support</h4>
                        <p className="lg:text-base text-sm">
                            Receive continuous encouragement and accountability from your mentor throughout the journey.
                        </p>
                    </div>

                    <div className="text-center py-10 px-6 rounded-[15px] border border-[#bebebe] hover:border-primary transition-all duration-500 fadeInUp">
                        <i className="ri-star-smile-fill text-[50px] text-primary"></i>
                        <h4 className="lg:text-xl text-[20px] font-semibold my-2 font-lora">Real-World Experience</h4>
                        <p className="lg:text-base text-sm">
                            Participate in hands-on activities and projects that mimic real professional environments.
                        </p>
                    </div>

                    <div className="text-center py-10 px-6 rounded-[15px] border border-[#bebebe] hover:border-primary transition-all duration-500 fadeInUp">
                        <i className="ri-refresh-line text-[50px] text-primary"></i>
                        <h4 className="lg:text-xl text-[20px] font-semibold my-2 font-lora">Continuous Learning</h4>
                        <p className="lg:text-base text-sm">
                            Stay updated with resources, workshops, and learning materials throughout your mentorship.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
