import { AnimatePresence, motion } from "framer-motion"
import { Button, Progress } from "@heroui/react"
import { useMemo, useState } from "react"
import { NeedsHelpOption } from "../components"

const questionSteps = [
    {
        id: 1,
        question: "What are you looking to improve?",
        options: [
            "Career transition",
            "Interview preparation",
            "Technical skills",
            "Business growth",
            "Personal branding",
        ],
    },
    {
        id: 2,
        question: "What level are you currently at?",
        options: [
            "Beginner",
            "Intermediate",
            "Advanced",
            "Returning after a break",
            "Not sure yet",
        ],
    },
    {
        id: 3,
        question: "How do you prefer to learn?",
        options: [
            "1:1 mentorship sessions",
            "Hands-on projects",
            "Structured learning plan",
            "Career roadmap guidance",
            "Live mock interviews",
        ],
    },
] as const

const NeedsHelpwith = () => {

    const [stepIndex, setStepIndex] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const currentStep = questionSteps[stepIndex]
    const currentSelection = selectedAnswers[currentStep.id]
    const totalSteps = questionSteps.length
    const progressValue = useMemo(() => ((stepIndex + 1) / totalSteps) * 100, [stepIndex, totalSteps])

    const handleSelectOption = (value: string) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [currentStep.id]: value,
        }))
    }

    const handleNext = () => {
        if (!currentSelection) return
        if (stepIndex < totalSteps - 1) {
            setStepIndex((prev) => prev + 1)
        }
    }

    const handleSubmit = async () => {
        if (!currentSelection || isSubmitting) return
        setIsSubmitting(true)

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000))
            setStepIndex(0)
            setSelectedAnswers({})
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="container max-w-3xl mx-auto space-y-6">

            <div className="space-y-1.5 text-center">
                <h2 className="text-xl font-semibold text-[#141B34]">What Do You Need Help With?</h2>
                <p className="text-xs text-[#29282B]">
                    We offer a wide range of services to help you achieve your goals.
                </p>
            </div>

            <div className="space-y-3">

                {/* ======================== PROGRESS BAR AND STEPS ======================== */}
                <div className="flex items-center gap-x-5 whitespace-nowrap">
                    <p className="text-sm font-medium text-[#141B34]">Step {stepIndex + 1} of {totalSteps}</p>
                    <Progress classNames={{
                        track: "bg-[#FFE9D6] h-2",
                        indicator: "bg-[#FF9900]",
                    }} value={progressValue} />
                </div>

                {/* ======================== QUESTIONS AND ANSWERS ======================== */}
                <div className="space-y-3 pt-2">

                    <AnimatePresence mode="wait">

                        <motion.div
                            key={currentStep.id}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="space-y-4">
                            <h2 className="text-sm font-medium text-[#141B34] text-center">
                                {currentStep.question}
                            </h2>

                            {/* ======================== ANSWERS OPTIONS ======================== */}
                            <div className="space-y-3 pt-1">
                                {currentStep.options.map((option, index) => (
                                    <motion.div
                                        key={option}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.2, delay: index * 0.04 }}>
                                        <NeedsHelpOption
                                            label={option}
                                            selected={currentSelection === option}
                                            onSelect={() => handleSelectOption(option)}
                                        />
                                    </motion.div>
                                ))}
                            </div>

                        </motion.div>

                    </AnimatePresence>

                    <div className="flex items-center justify-center pt-4">
                        <Button className="h-12 text-xs mx-auto px-14" color="primary"
                            radius="sm" onPress={stepIndex === totalSteps - 1 ? handleSubmit : handleNext}
                            isDisabled={!currentSelection || isSubmitting}
                            isLoading={isSubmitting}>
                            {stepIndex === totalSteps - 1 ? "Submit" : "Next Question"}
                        </Button>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default NeedsHelpwith