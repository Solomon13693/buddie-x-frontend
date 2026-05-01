import { Button } from "@heroui/react"

const JoinConversation = () => {
    const conversationPrompts = [
        {
            text: "What marketing channels are effective in 2026?",
            position: "lg:col-start-1 lg:row-start-1 lg:-translate-y-4",
        },
        {
            text: "Best practices for conducting user research ?",
            position: "lg:col-start-2 lg:row-start-1 lg:-translate-y-10",
        },
        {
            text: "Best practices for conducting user research ?",
            position: "lg:col-start-3 lg:row-start-1 lg:-translate-y-1",
        },
        {
            text: "React vs Vue in 2026 which should I learn?",
            position: "lg:col-start-1 lg:row-start-2 lg:-translate-y-2",
        },
        {
            text: "How do I transition from designer to a product manager?",
            position: "lg:col-start-2 lg:row-start-2 lg:-translate-y-8",
        },
        {
            text: "Best practices for conducting user research ?",
            position: "lg:col-start-3 lg:row-start-2 lg:translate-y-2",
        },
    ]

    return (
        <div className="container relative z-10 lg:pt-12">

            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">

                <div className="max-w-md space-y-6">

                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold text-[#0E0E0E]">
                            Join the Conversation
                        </h2>
                        <p className="text-sm text-[#404145]">
                            Connect with like-minded professionals, ask questions, and
                            learn from experienced buddies in our thriving community.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1">

                        <Button className="h-10 px-6 bg-[#0E0E0E] text-white" size="sm" radius="sm">
                            Ask a Question
                        </Button>

                        <Button className="h-10 px-6 text-[#0E0E0E] border-1 border-[#DADADA]" variant="bordered" size="sm" radius="sm">
                            Browse Community
                        </Button>

                    </div>

                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                    {conversationPrompts.map((prompt, index) => (
                        <article key={prompt.text + index} className={`rounded-2xl border border-[#f3f3f3] bg-white px-4 py-8 shadow-[0px_16px_40px_0px_rgba(15,23,42,0.08)] transition-transform duration-300 hover:-translate-y-1 space-y-5 ${prompt.position}`}>
                            <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#F2F5D6]">
                                <img src="/img/home/face-id.svg" alt="Prompt icon" width={16} height={16} />
                            </div>
                            <p className="text-center text-sm sm:text-xs max-w-52 mx-auto font-medium 
                            text-[#141414]">
                                {prompt.text}
                            </p>
                        </article>
                    ))}
                </div>

            </div>
            
        </div>
    )
}

export default JoinConversation