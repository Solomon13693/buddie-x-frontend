import React from 'react';
import { useField, FieldInputProps, FieldMetaProps, FieldHelperProps } from 'formik';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, className, ...props }) => {

    const [field, meta]: [FieldInputProps<any>, FieldMetaProps<any>, FieldHelperProps<any>] = useField(props as any);

    return (
        <div className="form-group mb-4">
            <label className="form-label text-xs mb-1">{label}</label>
            <textarea
                {...field}
                {...props}
                className={`form-control !rounded-xl shadow-none ${meta.touched && meta.error ? 'is-invalid' : ''} ${className || ''}`}
            ></textarea>
            {meta.touched && meta.error ? (
                <div className="text-red-600 text-xs font-light mt-2">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default TextArea;
