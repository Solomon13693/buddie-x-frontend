import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline"
import { ArrowRightIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid"
import { useRef, useState } from "react"
import { GradientHeroBanner } from "../components"

const MAX_CHARS = 500

const fieldBase = "w-full bg-transparent px-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none transition-all duration-300"
const labelBase = "block text-[11px] font-medium text-neutral-400 uppercase tracking-widest mb-1.5 transition-colors duration-200"

const ContactView = () => {
    const [message, setMessage] = useState("")
    const [focused, setFocused] = useState<string | null>(null)
    const [sent, setSent] = useState(false)
    const [sending, setSending] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const charsLeft = MAX_CHARS - message.length
    const isNearLimit = charsLeft <= 80
    const isAtLimit = charsLeft <= 0

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length > MAX_CHARS) return
        setMessage(e.target.value)
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSending(true)
        setTimeout(() => {
            setSending(false)
            setSent(true)
        }, 1800)
    }

    const rounded = (name: string) =>
        `rounded-2xl border transition-all duration-300 ${focused === name ? "border-primary shadow-[0px_0px_0px_3px_#FF6F0015]" : "border-[#D1D5DB]"}`

    return (
        <div className="space-y-20">

            <GradientHeroBanner
                title="Contact Us"
                description="Have a question, a partnership idea, or just want to say hello? We'd love to hear from you."
                chip="Support"
                cardTitle="We're here to help"
                cardDescription="Reach out to our team and we'll get back to you as soon as possible. Whether it's a technical question or a general enquiry, we're happy to assist."
                buttonLabel="View Mentors"
                buttonHref="/mentors"
                imageAlt="Contact Buddie-X"
            />

            <div className="container max-w-6xl pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-start">

                    {/* LEFT */}
                    <div className="space-y-10 lg:pt-4">
                        <div className="space-y-4">
                            <p className="text-xs font-medium text-primary tracking-widest uppercase">Contact</p>
                            <h1 className="text-3xl sm:text-5xl font-medium tracking-tight leading-tight">
                                Let's talk.
                            </h1>
                            <p className="text-sm text-neutral-500 leading-7 max-w-sm">
                                Have a question, a partnership idea, or just want to say hello? We'd love to hear from you.
                            </p>
                        </div>

                        <div className="space-y-5">
                            <div className="flex items-center gap-4">
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#E8E4D4]">
                                    <EnvelopeIcon className="size-5 text-primary" />
                                </span>
                                <div>
                                    <p className="text-[11px] uppercase tracking-widest text-neutral-400">Email</p>
                                    <p className="text-sm font-medium text-neutral-800">hello@buddie-x.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#E8E4D4]">
                                    <PhoneIcon className="size-5 text-primary" />
                                </span>
                                <div>
                                    <p className="text-[11px] uppercase tracking-widest text-neutral-400">Phone</p>
                                    <p className="text-sm font-medium text-neutral-800">+44 000 000 0000</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — Form */}
                    {sent ? (
                        <div className="flex flex-col items-center justify-center gap-5 py-20 text-center">
                            <span className="flex size-16 items-center justify-center rounded-full bg-[#E8E4D4]">
                                <PaperAirplaneIcon className="size-7 text-primary" />
                            </span>
                            <div className="space-y-1">
                                <h2 className="text-xl font-medium text-neutral-800">Message sent!</h2>
                                <p className="text-sm text-neutral-500">We'll get back to you as soon as possible.</p>
                            </div>
                            <button
                                onClick={() => { setSent(false); setMessage("") }}
                                className="text-xs text-primary underline underline-offset-4"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className={`${labelBase} ${focused === "first" ? "text-primary" : ""}`}>First name</label>
                                    <div className={rounded("first")}>
                                        <input className={fieldBase} placeholder="John" onFocus={() => setFocused("first")} onBlur={() => setFocused(null)} />
                                    </div>
                                </div>
                                <div>
                                    <label className={`${labelBase} ${focused === "last" ? "text-primary" : ""}`}>Last name</label>
                                    <div className={rounded("last")}>
                                        <input className={fieldBase} placeholder="Doe" onFocus={() => setFocused("last")} onBlur={() => setFocused(null)} />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className={`${labelBase} ${focused === "email" ? "text-primary" : ""}`}>Email</label>
                                <div className={rounded("email")}>
                                    <input className={fieldBase} type="email" placeholder="john@example.com" onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
                                </div>
                            </div>

                            <div>
                                <label className={`${labelBase} ${focused === "subject" ? "text-primary" : ""}`}>Subject</label>
                                <div className={rounded("subject")}>
                                    <input className={fieldBase} placeholder="How can we help?" onFocus={() => setFocused("subject")} onBlur={() => setFocused(null)} />
                                </div>
                            </div>

                            {/* Message textarea */}
                            <div className="space-y-1">
                                <label className={`${labelBase} ${focused === "message" ? "text-primary" : ""}`}>Message</label>
                                <div className={`${rounded("message")} pt-1 pb-2`}>
                                    <textarea
                                        ref={textareaRef}
                                        value={message}
                                        onChange={handleMessageChange}
                                        onFocus={() => setFocused("message")}
                                        onBlur={() => setFocused(null)}
                                        rows={4}
                                        placeholder="Write your message here..."
                                        className={`${fieldBase} resize-none overflow-hidden leading-6`}
                                    />
                                </div>
                                <div className="flex items-center justify-between pt-1">
                                    <p className="text-[10px] text-neutral-400">
                                        {message.length > 0 && !isNearLimit && "Looks good"}
                                        {isNearLimit && !isAtLimit && "Almost at the limit"}
                                        {isAtLimit && "Character limit reached"}
                                    </p>
                                    <p className={`text-[10px] tabular-nums transition-colors duration-200 ${isAtLimit ? "text-red-400" : isNearLimit ? "text-amber-400" : "text-neutral-400"}`}>
                                        {charsLeft} / {MAX_CHARS}
                                    </p>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={sending || message.trim().length === 0}
                                className="inline-flex items-center gap-2 bg-primary text-white text-sm font-medium px-7 py-3 rounded-full hover:bg-primary-dark transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {sending ? (
                                    <>
                                        <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <ArrowRightIcon className="size-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}

                </div>
            </div>

        </div>
    )
}

export default ContactView
