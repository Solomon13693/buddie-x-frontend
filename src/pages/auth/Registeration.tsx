import { useEffect, useState } from "react"
import {
    RegLayout,
    RegisterFirstStep,
    MenteeProfessionalInfo,
    MentorProInfo,
    MentorExpertises,
} from "../../components/auth"
import { useNavigate } from "react-router-dom"
import { ChevronLeftIcon } from "@heroicons/react/24/solid"
import { fetchGeneralData } from "../../redux/features/generalDataSlice"
import { usePageTitle } from "../../hooks/usePageTitle"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../redux/store"
import { getRegistrationData } from "../../redux/features/authSlice"

type Role = "mentee" | "mentor" | null

interface Step {
    id: string
    component: React.FC<StepProps>
}

interface StepProps {
    onNextStep: () => void
    onPrevStep?: () => void
}

const Registeration = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const regData = useSelector(getRegistrationData)
    const [role, setRole] = useState<Role>(
        regData?.role === "mentee" || regData?.role === "mentor" ? regData.role : null,
    )
    const [currentStepIndex, setCurrentStepIndex] = useState(0)

    const stepsMap: Record<NonNullable<Role>, Step[]> = {
        mentee: [{ id: "professional_info", component: MenteeProfessionalInfo }],
        mentor: [
            { id: "professional_background", component: MentorProInfo },
            { id: "expertise_and_skills", component: MentorExpertises },
        ],
    }

    const totalSteps = role === "mentor" ? 3 : 2

    const handleNextStep = () => {
        setCurrentStepIndex((prev) => prev + 1)
    }

    const handlePrevStep = () => {
        if (currentStepIndex === 0) {
            navigate("/")
            return
        }
        setCurrentStepIndex((prev) => prev - 1)
    }

    const renderStepContent = () => {
        if (currentStepIndex === 0) {
            return (
                <RegisterFirstStep
                    onNextStep={(selectedRole) => {
                        setRole(selectedRole)
                        setCurrentStepIndex(1)
                    }}
                />
            )
        }

        const steps = stepsMap[role!]
        const currentStepObj = steps[currentStepIndex - 1]

        if (!currentStepObj) return null

        const StepComponent = currentStepObj.component

        return <StepComponent onNextStep={handleNextStep} onPrevStep={handlePrevStep} />
    }

    usePageTitle("Create account")

    useEffect(() => {
        dispatch(fetchGeneralData())
    }, [dispatch])

    return (
        <RegLayout>
            <div>
                {currentStepIndex > 0 && (
                    <div className="mb-6 flex items-center justify-between">
                        <button
                            type="button"
                            onClick={handlePrevStep}
                            className="flex cursor-pointer items-center text-sm text-[#62646A] hover:text-[#1B1D21]"
                        >
                            <ChevronLeftIcon className="mr-2 size-4" />
                            Back to previous step
                        </button>

                        <p className="text-sm text-[#62646A]">
                            Step {currentStepIndex + 1} of {totalSteps}
                        </p>
                    </div>
                )}

                {renderStepContent()}
            </div>
        </RegLayout>
    )
}

export default Registeration
