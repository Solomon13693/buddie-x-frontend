type AboutMentorProps = {
    bio?: string
    skills?: string[]
}

const AboutMentor = ({ bio, skills = [] }: AboutMentorProps) => {
    return (
        <div className="rounded-xl bg-white">
            <h2 className="border-b border-[#DADADA] px-5 py-4 text-base font-medium text-[#0E071D]">
                About Me
            </h2>

            <div className="space-y-3 p-5 text-[#29282B]">
                {bio ? (
                    <p className="whitespace-pre-line text-xs leading-5">{bio}</p>
                ) : (
                    <p className="text-xs leading-5 text-[#62646A]">No bio available.</p>
                )}

                {skills.length > 0 && (
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium">What I Can Help You With:</h3>
                        <ul className="list-disc space-y-1 pl-5 text-xs leading-5">
                            {skills.map((skill) => (
                                <li key={skill}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AboutMentor
