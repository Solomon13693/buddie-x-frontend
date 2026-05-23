import { AnimatePresence, motion } from "framer-motion"
import { Button, Progress } from "@heroui/react"
import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useMentorDiscoveryQuestions } from "../../../../services/mentorDiscovery"
import { buildMentorsUrl } from "../../../../utils/buildMentorsUrl"
import { NeedsHelpOption } from "../components"

const NeedsHelpwith = () => {
    const navigate = useNavigate()
    const { steps, isLoading, isError } = useMentorDiscoveryQuestions()

    const [stepIndex, setStepIndex] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})

    const currentStep = steps[stepIndex]
    const currentSelection = currentStep ? selectedAnswers[currentStep.id] : undefined
    const totalSteps = steps.length
    const progressValue = useMemo(
        () => (totalSteps ? ((stepIndex + 1) / totalSteps) * 100 : 0),
        [stepIndex, totalSteps]
    )

    const handleSelectOption = (value: string) => {
        if (!currentStep) return
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

    const handleSubmit = () => {
        if (!currentSelection || !steps.length) return

        const filterParams: Record<string, string> = {}

        steps.forEach((step) => {
            const value = selectedAnswers[step.id]
            if (value && step.filter_param) {
                filterParams[step.filter_param] = value
            }
        })

        navigate(buildMentorsUrl(filterParams))
    }

    if (isLoading || isError || !currentStep) {
        return null
    }

    return (
        <div className="container mx-auto max-w-2xl space-y-6">
            <div className="space-y-1.5 text-center">
                <h2 className="text-xl font-semibold text-[#141B34]">What Do You Need Help With?</h2>
                <p className="text-xs text-[#29282B]">
                    We offer a wide range of services to help you achieve your goals.
                </p>
            </div>

            <div className="space-y-3">
                <div className="flex items-center gap-x-5 whitespace-nowrap">
                    <p className="text-sm font-medium text-[#141B34]">
                        Step {stepIndex + 1} of {totalSteps}
                    </p>
                    <Progress
                        classNames={{
                            track: "bg-[#FFE9D6] h-2",
                            indicator: "bg-[#FF9900]",
                        }}
                        value={progressValue}
                    />
                </div>

                <div className="space-y-3 pt-2">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep.id}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="space-y-4">
                            <h2 className="text-center text-sm font-medium text-[#141B34]">
                                {currentStep.question}
                            </h2>

                            <div className="space-y-3 pt-1">
                                {currentStep.options.map((option, index) => (
                                    <motion.div
                                        key={option.value}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.2, delay: index * 0.04 }}>
                                        <NeedsHelpOption
                                            label={option.label}
                                            selected={currentSelection === option.value}
                                            onSelect={() => handleSelectOption(option.value)}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="flex items-center justify-center pt-4">
                        <Button className="mx-auto h-12 px-14 text-xs"
                            color="primary" radius="sm" onPress={stepIndex === totalSteps - 1 ? handleSubmit : handleNext}
                            isDisabled={!currentSelection}>
                            {stepIndex === totalSteps - 1 ? "Submit" : "Next Question"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NeedsHelpwith
