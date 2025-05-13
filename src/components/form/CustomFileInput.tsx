import React from "react";
import { useField } from "formik";

interface CustomFileInputProps {
    name: string;
    label: string;
    className?: string;
    formGroupClass?: string;
}

const CustomFileInput: React.FC<CustomFileInputProps> = ({
    name,
    label,
    className,
    formGroupClass,
}) => {
    const [_, meta, helpers] = useField(name);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files ? e.currentTarget.files[0] : null;
        helpers.setValue(file);
    };

    return (
        <div className={`form-group ${formGroupClass || "mb-4"}`}>
            <label className="form-label text-xs mb-1">{label}</label>
            <input
                type="file"
                className={`form-control shadow-none ${meta.touched && meta.error ? "is-invalid" : ""} ${className || ""}`}
                onChange={handleChange}
            />

            {meta.touched && meta.error ? (
                <div className="text-red-600 text-xs font-light mt-2">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default CustomFileInput;
