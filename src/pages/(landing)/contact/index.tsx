import { EnvelopeIcon } from "@heroicons/react/24/outline"
import { PaperAirplaneIcon } from "@heroicons/react/24/solid"
import { useState } from "react"
import { Form, Formik } from "formik"
import toast from "react-hot-toast"
import { GradientHeroBanner } from "../components"
import { CustomInput, CustomPhoneInput, TextArea } from "../../../components/form"
import { Button } from "../../../components/ui"
import { submitContactForm } from "../../../services"
import { contactSchema } from "../../../utils/schema"
import { getErrorMessage } from "../../../utils"

const ContactView = () => {
    const [sent, setSent] = useState(false)

    const initialValues = {
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    }

    return (
        <div className="space-y-20">

            <GradientHeroBanner
                title="Contact Us"
                description="Have a question, a partnership idea, or just want to say hello? We'd love to hear from you."
                chip="Support"
                cardTitle="We're here to help"
                cardDescription="Reach out to our team and we'll get back to you as soon as possible. Whether it's a technical question or a general enquiry, we're happy to assist."
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
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                                    <EnvelopeIcon className="size-5 text-primary" />
                                </span>
                                <div>
                                    <p className="text-[11px] uppercase tracking-widest text-neutral-400">Email</p>
                                    <p className="text-sm font-medium text-neutral-800">hello@buddie-x.com</p>
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
                                onClick={() => setSent(false)}
                                className="text-xs text-primary underline underline-offset-4"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <Formik
                            initialValues={initialValues}
                            validationSchema={contactSchema}
                            enableReinitialize
                            onSubmit={async (values, { resetForm }) => {
                                try {
                                    await submitContactForm(values)
                                    resetForm()
                                    setSent(true)
                                } catch (error) {
                                    toast.error(getErrorMessage(error))
                                }
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form className="space-y-4" autoComplete="off">

                                    <CustomInput
                                        label="Full Name"
                                        name="name"
                                        placeholder="John Doe"
                                        className="rounded-md border-[#CBCAD7]"
                                    />

                                    <CustomInput
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        className="rounded-md border-[#CBCAD7]"
                                    />


                                    <CustomPhoneInput
                                        label="Phone Number"
                                        name="phone"
                                        placeholder="+44 000 000 0000"
                                        className="rounded-md border-[#CBCAD7] py-1.5"
                                    />

                                    <CustomInput
                                        label="Subject"
                                        name="subject"
                                        placeholder="How can we help?"
                                        className="rounded-md border-[#CBCAD7]"
                                    />

                                    <TextArea
                                        label="Message"
                                        name="message"
                                        rows={5}
                                        placeholder="Write your message here..."
                                        className="rounded-md border-[#CBCAD7]"
                                    />

                                    <Button
                                        type="submit"
                                        loading={isSubmitting}
                                        className="w-full py-6 rounded-md"
                                    >
                                        Send Message
                                    </Button>

                                </Form>
                            )}
                        </Formik>
                    )}

                </div>
            </div>

        </div>
    )
}

export default ContactView
