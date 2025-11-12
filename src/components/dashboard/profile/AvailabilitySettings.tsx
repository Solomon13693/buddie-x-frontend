import type React from "react";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Switch } from "@mantine/core";
import toast from "react-hot-toast";
import { Button } from "../../ui";
import { CustomInput } from "../../form";
import { fetchProfile, getUserProfile } from "../../../redux/features/authSlice";
import { updateAvailability, toggleOutOfOffice } from "../../../services";
import { getErrorMessage } from "../../../utils";
import type { AppDispatch } from "../../../redux/store";
import { AvailabilityDayType } from "../../../types";

interface FormValues {
    availability: AvailabilityDayType[];
}

const ProfileAvailability: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [outOfOfficeLoading, setOutOfOfficeLoading] = useState<boolean>(false);
    const profile = useSelector(getUserProfile);
    const dispatch = useDispatch<AppDispatch>();
    const isOutOfOffice = profile?.mentor?.out_of_office || false;

    const defaultAvailability: AvailabilityDayType[] = [
        { day: "Monday", is_available: false, start_time: "00:00", end_time: "01:00" },
        { day: "Tuesday", is_available: false, start_time: "00:00", end_time: "01:00" },
        { day: "Wednesday", is_available: false, start_time: "00:00", end_time: "01:00" },
        { day: "Thursday", is_available: false, start_time: "00:00", end_time: "01:00" },
        { day: "Friday", is_available: false, start_time: "00:00", end_time: "01:00" },
        { day: "Saturday", is_available: false, start_time: "00:00", end_time: "01:00" },
        { day: "Sunday", is_available: false, start_time: "00:00", end_time: "01:00" }
    ];

    const initialValues: FormValues = {
        availability: profile?.mentor?.availability?.length ? profile.mentor.availability : defaultAvailability,
    };
    
    const handleSubmit = async (values: FormValues): Promise<void> => {

        const isAtLeastOneAvailable = values.availability.some(day => day.is_available);

        if (!isAtLeastOneAvailable) {
            toast.error("At least one day must be available.");
            return;
        }

        setLoading(true);
        try {
            const response = await updateAvailability(values);
            toast.success(response?.message);
            dispatch(fetchProfile());
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    const handleToggleOutOfOffice = async (checked: boolean) => {
        setOutOfOfficeLoading(true);
        try {
            const response = await toggleOutOfOffice(checked);
            toast.success(response?.message || (checked ? 'Out of office mode enabled' : 'Out of office mode disabled'));
            dispatch(fetchProfile());
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setOutOfOfficeLoading(false);
        }
    };

    return (
        <Formik initialValues={initialValues} enableReinitialize onSubmit={handleSubmit}>
            {({ values, setFieldValue }) => (

                <Form>

                    <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 mb-1">Out of Office</h3>
                                <p className="text-[12px] text-gray-600">
                                    When enabled, all days will be marked as unavailable
                                </p>
                            </div>
                            <Switch
                                checked={isOutOfOffice}
                                onChange={(event) => handleToggleOutOfOffice(event.currentTarget.checked)}
                                size="md"
                                color="red"
                                disabled={outOfOfficeLoading}
                            />
                        </div>
                    </div>

                    <div className="space-y-10 md:space-y-5">

                        {values.availability.map((day, index) => (

                            <div key={day.day} className="flex items-center flex-wrap justify-between gap-4">

                                <div className="flex items-center gap-2">
                                    <Switch
                                        checked={day.is_available && !isOutOfOffice}
                                        onChange={(event) => {
                                            if (!isOutOfOffice) {
                                                setFieldValue(`availability[${index}].is_available`, event.currentTarget.checked);
                                            }
                                        }}
                                        size="xs"
                                        color="black"
                                        disabled={isOutOfOffice || outOfOfficeLoading}
                                    />
                                    <span className="font-medium text-xs text-gray-700">{day.day}</span>
                                </div>

                                {day.is_available ? (

                                    <div className="flex items-center gap-5">

                                        <CustomInput label="From" name={`availability[${index}].start_time`} type="time" className="!py-1 px-2 !rounded-xl" />

                                        <span className="text-gray-500 pt-5">-</span>

                                        <CustomInput label="To" name={`availability[${index}].end_time`} type="time" className="!py-1 px-2 !rounded-xl" />

                                    </div>

                                ) : (
                                    <span className="text-slate-500 text-xs">Closed</span>
                                )}
                            </div>
                        ))}

                    </div>

                    <Button 
                        loading={loading} 
                        type="submit" 
                        className="bg-black py-6 w-full mt-10"
                        isDisabled={isOutOfOffice || outOfOfficeLoading}
                    >
                        Update Availability
                    </Button>

                </Form>
            )}
        </Formik>
    );
};

export default ProfileAvailability;
