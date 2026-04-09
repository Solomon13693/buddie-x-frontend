import React from "react";
import { Form, Formik } from "formik";
import { Button, PopupModal } from "../ui";
import { CustomFileInput, CustomInput, CustomSelect } from "../form";
import { fileResourcesSchema } from "../../utils/schema";
import { useUploadSessionResources, useUploadSessionResourcesMentee } from "../../services";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils";

type RoleType = "mentor" | "mentee";

const UploadSessionResources = ({ open, close, sessionId, role = "mentor" }: { open: boolean; close: () => void; sessionId: string; role?: RoleType }) => {

    const initialValues = {
        id: sessionId || "",
        type: "",
        file_name: "",
        file: null,
        link: "",
    }

    const { mutate: uploadResourcesMentor, isPending: isPendingMentor } = useUploadSessionResources();
    const { mutate: uploadResourcesMentee, isPending: isPendingMentee } = useUploadSessionResourcesMentee();
    const uploadResources = role === "mentee" ? uploadResourcesMentee : uploadResourcesMentor;
    const isPending = role === "mentee" ? isPendingMentee : isPendingMentor;

    return (
        <PopupModal
            size="2xl"
            isOpen={open}
            onClose={close}
            placement="center"
            className="max-h-[95vh]">

            <div className="py-5">

                <h1 className="text-xs sm:text-sm font-medium mb-5 uppercase">{role === "mentee" ? "Upload document for mentor" : "Meeting Details"}</h1>

                <Formik
                    initialValues={initialValues}
                    enableReinitialize
                    validationSchema={fileResourcesSchema}
                    onSubmit={async (values) => {

                        const { id, type, file_name, file, link } = values;

                        const formData = new FormData();
                        formData.append("type", type);
                        formData.append("file_name", file_name);

                        if (file) {
                            formData.append("file", file);
                        }

                        if (link) {
                            formData.append("link", link);
                        }

                        uploadResources(
                            { id, formData },
                            {
                                onSuccess: () => {
                                    toast.success(role === "mentee" ? "Document uploaded. Your mentor will be notified." : "Session resources uploaded successfully!");
                                    close();
                                },
                                onError: (err) => {
                                    toast.error(getErrorMessage(err));
                                },
                            });

                    }}>

                    {({ values, setFieldValue }) => {

                        const showFileInput = values.type && values.type !== "link";
                        const showLinkInput = values.type === "link";

                        // Get accept attribute based on file type
                        const getAcceptAttribute = () => {
                            if (values.type === "pdf") {
                                return ".pdf,application/pdf";
                            } else if (values.type === "doc" || values.type === "docx") {
                                return ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                            } else if (values.type === "xls" || values.type === "xlsx") {
                                return ".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                            } else if (values.type === "ppt" || values.type === "pptx") {
                                return ".ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation";
                            } else if (["image", "png", "jpg", "jpeg", "gif"].includes(values.type)) {
                                return "image/*,.png,.jpg,.jpeg,.gif";
                            }
                            return undefined;
                        };

                        const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
                            const newType = e.target.value;
                            setFieldValue("type", newType);
                            
                            // Clear file when switching to link
                            if (newType === "link") {
                                setFieldValue("file", null);
                            }
                            
                            // Clear link when switching to file types
                            if (newType && newType !== "link") {
                                setFieldValue("link", "");
                            }
                            
                            // Clear both when no type is selected
                            if (!newType) {
                                setFieldValue("file", null);
                                setFieldValue("link", "");
                            }
                        };

                        return (
                            <Form className="space-y-4" autoComplete="off">

                                <CustomSelect label="File Type" name="type" onChange={handleTypeChange}>
                                    <option value="">Select type</option>
                                    <option value="pdf">PDF</option>
                                    <option value="doc">Word Document (.doc)</option>
                                    <option value="docx">Word Document (.docx)</option>
                                    <option value="xls">Excel Spreadsheet (.xls)</option>
                                    <option value="xlsx">Excel Spreadsheet (.xlsx)</option>
                                    <option value="ppt">PowerPoint (.ppt)</option>
                                    <option value="pptx">PowerPoint (.pptx)</option>
                                    <option value="image">Image (PNG, JPG, JPEG, GIF)</option>
                                    <option value="link">Link</option>
                                </CustomSelect>

                                <CustomInput
                                    label="File name"
                                    name="file_name"
                                    type="text"
                                    placeholder="Enter file name"
                                />

                                {showFileInput && (
                                    <CustomFileInput 
                                        name="file" 
                                        label="Upload File" 
                                        accept={getAcceptAttribute()}
                                    />
                                )}

                                {showLinkInput && (
                                    <CustomInput
                                        label="Link"
                                        name="link"
                                        type="url"
                                        placeholder="Enter url"
                                    />
                                )}

                                <Button isLoading={isPending} type="submit" className="py-6 w-full" >
                                    Upload
                                </Button>

                            </Form>
                        );
                    }}
                </Formik>

            </div>

        </PopupModal>
    )
}

export default UploadSessionResources