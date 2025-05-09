import { useEffect, useState } from 'react';
import { PersonnalInfo, RegLayout, SelectRoleForm, MenteeProfessionalInfo, MentorProInfo, MentorExpertises } from '../../components/auth';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { fetchGeneralData } from '../../redux/features/generalDataSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';

type Role = 'mentee' | 'mentor' | null;

interface Step {
    id: string;
    component: React.FC<StepProps>;
}

interface StepProps {
    onNextStep: () => void;
    onPrevStep?: () => void;
}

const Registeration = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [role, setRole] = useState<Role>(null);
    const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

    const stepsMap: Record<NonNullable<Role>, Step[]> = {
        mentee: [
            { id: 'personal_info', component: PersonnalInfo },
            { id: 'professional_info', component: MenteeProfessionalInfo },
        ],
        mentor: [
            { id: 'personal_info', component: PersonnalInfo },
            { id: 'professional_background', component: MentorProInfo },
            { id: 'expertise_and_skills', component: MentorExpertises },
        ],
    };

    const handleNextStep = () => {
        setCurrentStepIndex(prev => prev + 1);
    };

    const handlePrevStep = () => {
        if (currentStepIndex === 0) {
            navigate('/');
        } else {
            setCurrentStepIndex(prev => Math.max(prev - 1, 0));
        }
    };

    const renderStepContent = () => {
        if (currentStepIndex === 0) {
            return (
                <div>
                    <SelectRoleForm
                        onSelectRole={(selectedRole) => {
                            setRole(selectedRole);
                            setCurrentStepIndex(1);
                        }}
                    />
                </div>
            );
        }

        const steps = stepsMap[role!];
        const currentStepObj = steps[currentStepIndex - 1];

        if (!currentStepObj) return null;

        const StepComponent = currentStepObj.component;

        return (
            <StepComponent
                onNextStep={handleNextStep}
                onPrevStep={handlePrevStep}
            />
        );
    };

    const totalSteps = role ? stepsMap[role].length : 0;

    useEffect(() => {
        dispatch(fetchGeneralData());
    }, [dispatch]);

    return (
        <RegLayout>

            <div className="py-12">

                <div className="flex justify-between items-center">

                    <div className="flex items-center text-sm text-slate-500 cursor-pointer"
                        onClick={handlePrevStep}>

                        <ChevronLeftIcon className="w-4 h-4 mr-2" />

                        {currentStepIndex === 0 ? (

                            <Link to="/" className="text-sm text-slate-500">
                                Back to homepage
                            </Link>

                        ) : (

                            'Back to previous step'

                        )}
                    </div>

                    {currentStepIndex !== 0 && (
                        <p className="text-slate-500 text-sm">
                            Step {currentStepIndex} of {totalSteps}
                        </p>
                    )}

                </div>

                <div className="pt-6">
                    {renderStepContent()}
                </div>

            </div>

        </RegLayout>
    );
};

export default Registeration;
