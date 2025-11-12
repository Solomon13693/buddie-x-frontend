import { Form, Formik } from "formik"
import toast from "react-hot-toast"
import { useAddSession, useUpdateSession } from "../../../../services"
import { Button, PopupModal } from "../../../ui"
import { getErrorMessage } from "../../../../utils"
import { CustomInput, CustomSelect, TextArea } from "../../../form"
import { sessionSchema } from "../../../../utils/schema"
import type { RootState } from "../../../../redux/store"
import { useSelector } from "react-redux"
import { Chip } from "@heroui/react"
import { SessionType } from "../../../../types"

const MentorSessionModal = ({
    open,
    onClose,
    item,
}: { open: boolean; onClose: () => void; item?: SessionType | null }) => {

    const settings = useSelector((state: RootState) => state.general.settings)
    const { max_meeting_duration, commission_percentage } = settings || {}

    const isEditing = Boolean(item)

    const initialValues: SessionType = {
        id: item?.id || "",
        title: item?.title || "",
        duration: item?.duration || 30,
        sessions_count: item?.sessions_count || 1,
        frequency: item?.frequency || "one-time",
        price: item?.price || "",
        description: item?.description || "",
    }

    const { mutate: add, isPending } = useAddSession()
    const { mutate: update, isPending: updateLoading } = useUpdateSession()

    const calculateCommission = (price: number, commissionPercentage: number) => {
        const commissionAmount = (price * commissionPercentage) / 100
        const mentorEarnings = price - commissionAmount
        return { commissionAmount, mentorEarnings }
    }

    return (
        <PopupModal size="xl" isOpen={open} onClose={onClose} placement="center" className="max-h-[95vh]">
            <div className="py-5">
                <h1 className="text-xs sm:text-sm font-medium mb-5 uppercase">
                    {isEditing ? "Update Session" : "Add Session"}
                </h1>

                <Formik
                    initialValues={initialValues}
                    validationSchema={sessionSchema(max_meeting_duration)}
                    enableReinitialize
                    onSubmit={async (values) => {
                        if (isEditing && item?.id) {
                            update(
                                { id: item.id, data: values },
                                {
                                    onSuccess: () => {
                                        toast.success("Session updated successfully!")
                                        onClose()
                                    },
                                    onError: (error) => {
                                        toast.error(getErrorMessage(error))
                                    },
                                },
                            )
                        } else {
                            const { id, ...value } = values
                            add(value, {
                                onSuccess: () => {
                                    toast.success("Session added successfully!")
                                    onClose()
                                },
                                onError: (error) => {
                                    toast.error(getErrorMessage(error))
                                },
                            })
                        }
                    }}
                >
                    {({ values }) => {
                        
                        const price = Number.parseFloat(values.price as string) || 0
                        const { commissionAmount, mentorEarnings } = calculateCommission(price, commission_percentage || 0)

                        return (
                            <Form autoComplete="off" className="space-y-3">
                                <CustomInput label="Title" name="title" placeholder="Enter Session Title" />

                                <CustomInput label="Duration (minutes)" name="duration" type="number" placeholder="30" />

                                <CustomInput label="Sessions Count" name="sessions_count" type="number" placeholder="1" />

                                <CustomSelect label="Frequency" name="frequency">
                                    <option value="">Select Frequency</option>
                                    <option value="one-time">One-Time</option>
                                    {/* <option value="weekly">Weekly</option>
                                    <option value="fortnightly">Fortnightly</option>
                                    <option value="monthly">Monthly</option> */}
                                </CustomSelect>

                                <CustomInput currency label="Price (USD)" name="price" placeholder="50.00" />

                                {values.price && (
                                    <Chip size="sm" className="text-[10px]">
                                        {`Platform Commission: ${commission_percentage}% (${commissionAmount.toFixed(2)} USD) | Your Earnings: ${mentorEarnings.toFixed(2)} USD`}
                                    </Chip>
                                )}

                                <TextArea
                                    className="h-20"
                                    label="Description"
                                    name="description"
                                    placeholder="Enter session description"
                                />

                                <Button
                                    loading={updateLoading || isPending}
                                    fullWidth
                                    type="submit"
                                    className="py-6 justify-center m-auto"
                                    color="primary"
                                >
                                    {isEditing ? "Update" : "Submit"}
                                </Button>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </PopupModal>
    )
}

export default MentorSessionModal
