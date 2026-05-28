import { Button, Chip } from "@heroui/react"
import { Link } from "react-router-dom"

const AboutBanner = () => {
    return (
        <div>

            <section className="relative overflow-hidden bg-[linear-gradient(147.5deg,_#FBA852_-11.72%,_#BE764F_109.97%)] py-12 lg:py-24 pb-16 lg:pb-24 text-white">

                <div className="container">

                    <div className="flex gap-6">

                        <div className="w-[2px] shrink-0 rounded-full bg-white" />

                        <div className="max-w-2xl space-y-2 py-2 lg:py-4">

                            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                                About Us
                            </h1>

                            <p className="text-sm text-white/90 sm:text-base">
                                Connect with like-minded mentors, ask questions, and learn from experienced buddies in our thriving community.
                            </p>

                            <p className="text-[13px] text-white/80">
                                23,500+ tools. 1,000+ startups. Hundreds of communities, jobs, newsletters, ideas. All in one place.
                            </p>
                        </div>
                    </div>
                </div>

            </section>

            <div className="container -mt-10 lg:-mt-16 relative z-10">

                <div className="rounded-[10px] bg-white p-5 shadow-[0px_4px_114px_0px_#00000017] px-8 lg:px-14">

                    <div className="grid items-center gap-x-8 gap-y-10 md:grid-cols-2">

                        <div className="w-full max-w-md space-y-2">

                            <Chip className="bg-[#FFF2DE] text-[#EF7420] text-[9px] font-semibold uppercase">
                                <div className="flex items-center gap-2">
                                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.33593 8.66842C1.20978 8.66885 1.08609 8.63348 0.979235 8.56641C0.872383 8.49934 0.786755 8.40333 0.732299 8.28953C0.677843 8.17573 0.656794 8.04881 0.671599 7.92353C0.686403 7.79824 0.736452 7.67973 0.815932 7.58176L7.41593 0.781757C7.46544 0.724611 7.53291 0.685994 7.60725 0.672245C7.6816 0.658496 7.75842 0.670432 7.82509 0.706093C7.89176 0.741754 7.94432 0.799021 7.97416 0.868495C8.00399 0.937969 8.00932 1.01552 7.98927 1.08842L6.70927 5.10176C6.67152 5.20277 6.65885 5.31144 6.67233 5.41843C6.68581 5.52542 6.72504 5.62754 6.78666 5.71604C6.84828 5.80454 6.93045 5.87677 7.02612 5.92653C7.12178 5.97629 7.2281 6.00211 7.33593 6.00176H12.0026C12.1288 6.00133 12.2524 6.0367 12.3593 6.10377C12.4661 6.17084 12.5518 6.26685 12.6062 6.38065C12.6607 6.49445 12.6817 6.62137 12.6669 6.74665C12.6521 6.87194 12.6021 6.99045 12.5226 7.08842L5.9226 13.8884C5.87309 13.9456 5.80563 13.9842 5.73128 13.9979C5.65693 14.0117 5.58012 13.9997 5.51345 13.9641C5.44678 13.9284 5.39421 13.8712 5.36438 13.8017C5.33454 13.7322 5.32921 13.6547 5.34927 13.5818L6.62927 9.56842C6.66701 9.46741 6.67969 9.35874 6.66621 9.25175C6.65273 9.14476 6.61349 9.04264 6.55187 8.95414C6.49025 8.86564 6.40808 8.79341 6.31242 8.74365C6.21675 8.69389 6.11044 8.66807 6.0026 8.66842H1.33593Z" stroke="black" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Featured SPACE
                                </div>
                            </Chip>

                            <p className="text-xs text-[#29282B]">
                                Career Guidance | Portfolio Reviews | Interview Preparation | Skill Development | Project Mentorship | Job Search Strategy
                            </p>

                            <h2 className="text-xl font-medium tracking-tight text-[#111827]">How can we help you?</h2>

                            <p className="text-xs text-[#29282B] pb-2">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo </p>

                            <Button as={Link} to="/contact" color="primary" size="sm" className="h-10 px-6 text-xs bg-black text-white" radius="sm">
                                Contact Us
                            </Button>

                        </div>

                        <div className="flex justify-center md:justify-end">
                            <img src="/img/community.svg" alt="Community" className="lg:w-[80%]" width={494} height={213} loading="lazy" />
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default AboutBanner