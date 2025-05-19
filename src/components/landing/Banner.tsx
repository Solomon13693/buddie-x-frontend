import { Button } from "@heroui/react"
import { useNavigate } from "react-router-dom"

const Banner = () => {

    const navigate = useNavigate()

    return (
        <section id="home" className="py-20 bg-[#FFF6EC]">

            <div className="container m-auto">

                <div className="lg:w-[70%] !mx-auto text-center relative fadeInUp" data-delay="0.2" >

                    <h3 className="border border-[#bebebe] py-2.5 px-5 rounded-3xl text-sm inline-block font-normal mb-[5px]">
                        <i className="ri-lightbulb-line me-1"></i> Learn with guidance. Achieve with confidence.
                    </h3>

                    <h2 className="py-10 font-semibold xl:leading-[70px] xl:text-[60px] md:leading-[50px] md:text-[40px] leading-[40px] text-[30px] font-lora">
                        Unlock Your Potential with 1-on-1 Mentorship
                    </h2>

                    <p className="text-sm md:text-base md:text-lg leading-7 mb-[5px] px-15 text-black max-w-2xl m-auto">
                        Connect with experienced mentors in tech, design, and more.
                        Build real-world skills, track your progress, and accelerate your growth — all in one platform.
                    </p>

                    <div className="mt-10 flex justify-center">
                        <Button onPress={() => navigate('/explore')} size="lg" color="primary" className="!text-xs">Find Your Mentor</Button>
                    </div>

                    <div className="absolute lg:right-[-25%] top-1/2 right-0">
                        <img src="/img/shape1.png" alt="Shape" className="lg:max-w-[300px] max-w-[70px]" />
                    </div>

                    <div className="absolute lg:-left-[30%] top-[0%] left-0">
                        <img src="/img/shape2.png" alt="Shape" className="lg:max-w-[200px] max-w-[60px]" />
                    </div>

                </div>

            </div>

        </section>
    )
}

export default Banner