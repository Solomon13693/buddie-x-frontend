import { Button } from "@heroui/react";
import { ResourcesType } from "../../types";
import EmptyState from "../EmptyState";
import { PopupModal } from "../ui";
import { saveAs } from "file-saver";
import { useState } from "react";

const BookingResourcesModal = ({ open, close, resources }: { open: boolean; close: () => void; resources: ResourcesType[] }) => {

    const [downloadProgress, setDownloadProgress] = useState<number | null>(null);

    const downloadFile = (url: string) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "blob";

        xhr.onprogress = (event) => {
            if (event.lengthComputable) {
                const percentCompleted = Math.round((event.loaded / event.total) * 100);
                setDownloadProgress(percentCompleted);
            }
        };

        xhr.onload = () => {
            if (xhr.status === 200) {
                saveAs(xhr.response, url.split("/").pop());
                setDownloadProgress(null);
            }
        };

        xhr.onerror = () => {
            setDownloadProgress(null);
            console.error("File download failed.");
        };

        xhr.send();
    };

    return (
        <PopupModal
            size="4xl"
            isOpen={open}
            onClose={close}
            placement="center"
            className="max-h-[95vh]">

            <div className="py-5">

                <h1 className="text-xs sm:text-sm font-medium mb-5 uppercase">Session Resources</h1>

                {resources.length > 0 ? (
                    resources.map((data, index) => {

                        const { type, file_name, file_url, uploaded_by } = data;

                        return (
                            <div key={`${file_name}-${index}`} className='grid grid-cols-2 gap-2 mb-2 p-3 border rounded-lg bg-white'>

                                <div className="flex flex-col gap-1">
                                    <label className="text-[#6E7E8D] text-xs">File Name</label>
                                    <h1 className="font-medium text-xs">{file_name}</h1>
                                    {uploaded_by && (
                                        <span className="text-[10px] text-[#6E7E8D] mt-0.5">
                                            Uploaded by {uploaded_by === "mentee" ? "mentee" : "mentor"}
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-[#6E7E8D] text-xs">File</label>

                                    {type === "link" ? (
                                        <a href={file_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-medium text-xs underline">
                                            Open Link
                                        </a>
                                    ) : (
                                        <div className="flex flex-col gap-1">
                                            {/* Show image preview for image types */}
                                            {["image", "png", "jpg", "jpeg", "gif"].includes(type) && (
                                                <div className="mb-2">
                                                    <img 
                                                        src={file_url} 
                                                        alt={file_name}
                                                        className="max-w-xs max-h-48 rounded-lg object-contain border border-gray-200"
                                                        onError={(e) => {
                                                            // Hide image if it fails to load
                                                            (e.target as HTMLImageElement).style.display = 'none';
                                                        }}
                                                    />
                                                </div>
                                            )}
                                            <Button size="sm"
                                                onPress={() => downloadFile(file_url)}
                                                className="bg-black max-w-xs text-xs text-white">
                                                Download {file_name}
                                            </Button>
                                            {downloadProgress !== null && (
                                                <div className="text-xs text-black">Downloading: {downloadProgress}%</div>
                                            )}
                                        </div>
                                    )}
                                </div>

                            </div>
                        );
                    })
                ) : (
                    <EmptyState emptyText="No Session Resources available." />
                )}
            </div>
        </PopupModal>
    );
};

export default BookingResourcesModal;
