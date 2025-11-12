import { Form, Formik } from "formik";
import { Container } from "../components";
import { CustomInput, CustomPhoneInput, TextArea } from "../components/form";
import { Button } from "../components/ui";
import { contactSchema } from "../utils/schema";
import { useState } from "react";
import toast from "react-hot-toast";
import { BoltIcon } from "@heroicons/react/24/solid";
import { submitContactForm } from "../services";
import { getErrorMessage } from "../utils";

interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    phone: string;
    message: string;
}

const ContactView = () => {
    const [loading, setLoading] = useState(false);

    const initialValues: ContactFormData = {
        name: "",
        email: "",
        subject: "",
        phone: "",
        message: "",
    };

    const onSubmit = async (data: ContactFormData) => {
        try {
            setLoading(true);
            const response = await submitContactForm(data);
            toast.success(response?.message || "Your message has been sent successfully!");
        } catch (error) {
            console.error("Contact form error:", error);
            toast.error(getErrorMessage(error) || "Failed to send message. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Container>

                <div className="max-w-6xl mx-auto py-16 md:py-20 relative flex items-center justify-center">
                    {/* Background layers */}
                    <div className="absolute bg-white p-5 rounded-xl h-32 shadow-card w-full scale-90 top-10"></div>
                    <div className="absolute bg-white p-5 rounded-xl h-32 shadow-card w-full z-8 scale-95 top-15"></div>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={contactSchema}
                        onSubmit={onSubmit}>
                        {() => (
                            <Form className="bg-white rounded-xl shadow-card w-full z-10 relative overflow-hidden flex flex-col justify-center">
                                {/* Window controls */}
                                <div className="absolute top-4 left-4 flex items-center gap-1 z-15">
                                    <div className="size-2.5 rounded-full bg-[#FF5F57]"></div>
                                    <div className="size-2.5 rounded-full bg-[#FFBD2E]"></div>
                                    <div className="size-2.5 rounded-full bg-[#28CA42]"></div>
                                </div>

                                <div className="bg-white/2 pt-12 mt-14" style={{
                                    boxShadow: '0px 4px 8px 0px #272C301F, 0px 0px 0px 1px #272C3014, 0px 14px 40px 0px #272C300D'
                                }}>
                                    <div className="container pb-5">
                                        {/* Header Section */}
                                        <div className="text-center mb-8">
                                            <div className="inline-flex items-center gap-2 mb-3">
                                                <BoltIcon className="w-5 h-5 text-primary" />
                                                <span className="text-xs font-semibold text-primary">Contact</span>
                                            </div>
                                            <h1 className="text-2xl md:text-2xl font-bold text-black mb-2 font-lora">
                                                Resolve all queries anytime, anyday.
                                            </h1>
                                            <p className="text-sm text-gray-600 max-w-sm mx-auto leading-5 lg:leading-6">
                                                Want to learn more about Buddie X, our support team is ready to help you anytime, anyday.
                                            </p>
                                        </div>

                                        <div className="max-w-lg mx-auto pt-8 space-y-5">
                                            <CustomInput
                                                label="Full name*"
                                                name="name"
                                                type="text"
                                                placeholder="Enter your full name"
                                            />

                                            <CustomInput
                                                label="Email address*"
                                                name="email"
                                                type="email"
                                                placeholder="Enter your email address"
                                            />

                                            <CustomInput
                                                label="Subject*"
                                                name="subject"
                                                type="text"
                                                placeholder="Enter subject"
                                            />

                                            <CustomPhoneInput
                                                label="Phone Number*"
                                                name="phone"
                                                placeholder="Enter your phone number"
                                            />

                                                <TextArea
                                                    label="Message*"
                                                    className="h-32"
                                                    name="message"
                                                    placeholder="Enter your message"
                                                />


                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-center p-5">
                                    <Button
                                        type="submit"
                                        className="w-full max-w-lg mx-auto"
                                        loading={loading}>
                                        Submit Report
                                    </Button>
                                </div>

                            </Form>
                        )}
                    </Formik>
                </div>
            </Container>
        </>
    );
};

export default ContactView;

