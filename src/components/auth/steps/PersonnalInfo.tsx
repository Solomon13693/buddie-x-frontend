import { Form, Formik } from "formik";
import { CustomAutocomplete, CustomInput, CustomPassword, CustomPhoneInput, CustomSelect } from "../../form";
import { Button } from "../../ui";
import { personalInfoSchema } from "../../../utils/schema";
import { countries } from "../../../constant";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { getRegistrationData, updateRegData } from "../../../redux/features/authSlice";


const PersonnalInfo = ({ onNextStep }: { onNextStep: () => void }) => {

    const regData = useSelector(getRegistrationData)
    const dispatch = useDispatch<AppDispatch>()

    const initialValues: any = {
        fullname: regData?.fullname || '',
        email: regData?.email || '',
        phone: regData?.phone || '',
        password: regData.password || '',
        confirmPassword: regData.confirmPassword || '',
        gender: regData?.gender || '',
        country: regData?.country
            ? { value: regData.country.iso, label: regData.country.name }
            : null,
    };

    return (
        <>

            <div className="flex-col flex justify-center h-full">

                <div className="pb-6">

                    <h3 className='pt-3 font-bold text-lg font-lora'>Personal Information</h3>

                    <p className='pt-1 text-slate-400 font-light text-sm'>Please provide the required deatils</p>

                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={personalInfoSchema}
                    enableReinitialize
                    onSubmit={async (values) => {

                        const payload = {
                            ...values,
                            country: {
                                iso: values.country?.value || '',
                                name: values.country?.label || '',
                            },
                        };

                        dispatch(updateRegData(payload))

                        onNextStep()

                    }}>

                    {() => (

                        <Form className="space-y-4" autoComplete="off">

                            <CustomInput
                                label="Full name"
                                name="fullname"
                                type="text"
                                placeholder="Jone Doe"
                            />

                            <CustomInput
                                label="Email address"
                                name="email"
                                type="email"
                                placeholder="jonedoe@example.com"
                            />

                            <CustomPhoneInput className='py-1.5' name="phone" label="Phone number" placeholder="Enter phone number" />

                            <CustomSelect label="Gender"
                                name="gender">
                                <option value=""> Select Gender </option>
                                <option value="male"> Male </option>
                                <option value="female"> Female </option>
                            </CustomSelect>

                            <CustomAutocomplete
                                name="country"
                                label="Country"
                                options={countries}
                                returnObject
                            />

                            <CustomPassword
                                label="Password"
                                name="password"
                                placeholder="*************"
                            />

                            <CustomPassword
                                label="Confirm password"
                                name="confirmPassword"
                                placeholder="**************"
                            />

                            <Button type="submit" className="py-6 w-full" >
                                Continue
                            </Button>

                        </Form>
                    )}
                </Formik>

            </div >

        </>
    )
}

export default PersonnalInfo