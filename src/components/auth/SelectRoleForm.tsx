import { useState } from "react";
import AccountType from "./AccountType";
import { Button } from "../ui";
import { useDispatch, useSelector } from "react-redux";
import { getRegistrationData, updateRegData } from "../../redux/features/authSlice";
import AuthRedirect from "./AuthRedirect";

type Role = "mentee" | "mentor";

interface Props {
    onSelectRole: (role: Role) => void;
}

/** @deprecated Use RegisterFirstStep for the registration flow */
const SelectRoleForm: React.FC<Props> = ({ onSelectRole }) => {

    const regData = useSelector(getRegistrationData)
    const [selectedRole, setSelectedRole] = useState<Role | null>(regData?.role);
    const dispatch = useDispatch()

    const handleSelect = () => {
        if (selectedRole) {
            onSelectRole(selectedRole);
            dispatch(updateRegData({ role: selectedRole }))
        }
    };

    return (
        <div className="flex-col flex justify-center h-[70vh]">

            <div className="pb-10 space-y-3">

                <p className="font-bold text-xl font-lora max-w-sm">
                    Empowering individuals through mentorship and learning.
                </p>

                <p className="text-slate-600 font-light text-sm">
                    Are you ready to mentor or be mentored?
                </p>

            </div>

            <p className="mb-3 text-sm text-[#62646A]">You&apos;re creating an account as?</p>

            <div className="flex flex-col gap-3 sm:flex-row mb-5">
                {(["mentee", "mentor"] as Role[]).map((role) => (
                    <AccountType
                        key={role}
                        value={role}
                        title={role === "mentee" ? "As a Mentee" : "As a Mentor"}
                        isSelected={selectedRole === role}
                        onSelect={() => setSelectedRole(role)}
                    />
                ))}
            </div>

            <Button className="px-20 rounded-md py-6" isDisabled={!selectedRole} onClick={handleSelect}>
                Continue
            </Button>

            <AuthRedirect text='Already have an account ?' linkText='Sign In' linkHref='/login' />

        </div>
    );
};

export default SelectRoleForm;
