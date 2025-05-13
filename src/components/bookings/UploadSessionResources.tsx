import { Form, Formik } from "formik";
import { Button, PopupModal } from "../ui";
import { CustomFileInput, CustomInput, CustomSelect } from "../form";
import { fileResourcesSchema } from "../../utils/schema";
import { useUploadSessionResources } from "../../services";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils";

const UploadSessionResources = ({ open, close, sessionId }: { open: boolean; close: () => void; sessionId: string }) => {

    const initialValues = {
        id: sessionId || "",
        type: "",
        file_name: "",
        file: null,
        link: "",
    }

    const { mutate: uploadResources, isPending } = useUploadSessionResources();

    return (
        <PopupModal
            size="2xl"
            isOpen={open}
            onClose={close}
            placement="center"
            className="max-h-[95vh]">

            <div className="py-5">

                <h1 className="text-xs sm:text-sm font-medium mb-5 uppercase">Meeting Details</h1>

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
                                    toast.success("Session resources uploaded successfully!");
                                    close();
                                },
                                onError: (err) => {
                                    toast.error(getErrorMessage(err));
                                },
                            });

                    }}>

                    {() => (

                        <Form className="space-y-4" autoComplete="off">

                            <CustomSelect label="File Type" name="type">
                                <option value="">Select type</option>
                                <option value="pdf">PDF</option>
                                <option value="video">Video</option>
                                <option value="link">Link</option>
                            </CustomSelect>

                            <CustomInput
                                label="File name"
                                name="file_name"
                                type="text"
                                placeholder="Enter file name"
                            />

                            <CustomFileInput name="file" label="Upload File" />

                            <CustomInput
                                label="Link"
                                name="link"
                                type="url"
                                placeholder="Enter url"
                            />

                            <Button isLoading={isPending} type="submit" className="py-6 w-full" >
                                Upload
                            </Button>

                        </Form>
                    )}
                </Formik>

            </div>

        </PopupModal>
    )
}

export default UploadSessionResources