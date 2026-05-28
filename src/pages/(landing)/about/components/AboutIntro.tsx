const AboutIntro = () => {
    return (
        <section className="container max-w-6xl">

            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">

                <div className="relative mx-auto w-full max-w-xl">

                    <img src="/img/about/about.png" alt="About Us" 
                    className="object-cover" width={500} height={641} loading="lazy" />
                    
                </div>

                <div className="max-w-lg pt-10 lg:pt-0 space-y-3">

                    <p className="text-sm font-medium text-neutral-600">About Us</p>

                    <h2 className="text-2xl font-medium tracking-tight sm:text-4xl leading-11">
                        Empowering Growth Through Expert IT Mentorship
                    </h2>

                    <p className="max-w-prose text-sm text-neutral-600 leading-6">
                        We connect aspiring and growing tech professionals with experienced mentors to
                        accelerate learning, build real-world skills, and navigate career paths with
                        confidence. Our platform is designed to provide personalized guidance,
                        practical insights, and the support needed to succeed in today’s fast-evolving
                        tech industry.
                    </p>

                </div>

            </div>

        </section>
    )
}

export default AboutIntro

