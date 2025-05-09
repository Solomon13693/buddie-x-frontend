import { Link } from "react-router-dom"
import { CheckCircleIcon } from '@heroicons/react/24/solid'

const AuthBg = () => {

    const features = [
        // Mentee Features
        "Find the perfect mentor to help you grow in your career or life.",
        "Connect with experienced professionals who can guide you through challenges.",
        "Easily schedule one-on-one sessions with mentors from a variety of fields.",
        
        // Mentor Features
        "Share your knowledge and experience to help mentees grow.",
        "Become a part of a community dedicated to personal and professional development.",
        "Schedule flexible one-on-one sessions to mentor individuals who need guidance."
    ];


    return (
        <div className="fixed top-0 left-0 hidden lg:flex flex-col lg:w-[40%] xl:w-[35%] 2xl:w-1/3 h-full px-3 pl-0">

            <div className="h-full m-4 bg-primary rounded-2xl backdrop-blur-[69.09px] relative p-8 2xl:p-12 overflow-hidden flex flex-col">

                <Link to='/' className="flex-none mb-4">
                    <img src='/images/logo/logo_white.svg' className='w-20' alt='Logo' />
                </Link>

                <div className="mt-8 text-black">

                    <h2 className="text-2xl 2xl:text-3xl font-lora font-bold leading-snug">
                        Unlock Your Potential with Mentorship.
                    </h2>

                    <div className="mt-10 space-y-4">
                        {features.map((text, index) => (
                            <div className="flex items-start" key={index}>
                                <CheckCircleIcon className="size-5 flex-shrink-0" />
                                <p className="ml-3 text-[12.5px] 2xl:text-sm">{text}</p>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Background Texture */}
                <div className="absolute inset-0 -z-30 pointer-events-none">
                    <img
                        src='/img/boxy.svg'
                        alt='Boxy Texture'
                        className="object-cover w-full h-full"
                    />
                </div>

            </div>
        </div>
    )
}

export default AuthBg
