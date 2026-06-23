import React from 'react';
import { useField, FieldInputProps, FieldMetaProps, FieldHelperProps } from 'formik';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, className, maxLength, ...props }) => {

    const [field, meta]: [FieldInputProps<any>, FieldMetaProps<any>, FieldHelperProps<any>] = useField(props as any);

    const charCount = typeof field.value === 'string' ? field.value.length : 0;
    const isNearLimit = maxLength && charCount >= maxLength * 0.85;
    const isOverLimit = maxLength && charCount > maxLength;

    return (
        <div className="form-group mb-4">
            <label className="form-label text-xs mb-1">{label}</label>
            <textarea
                {...field}
                {...props}
                maxLength={maxLength}
                className={`form-control !rounded-xl shadow-none ${meta.touched && meta.error ? 'is-invalid' : ''} ${className || ''}`}
            ></textarea>
            <div className="flex items-start justify-between mt-2">
                {meta.touched && meta.error ? (
                    <div className="text-red-600 text-xs font-light">{meta.error}</div>
                ) : <span />}
                {maxLength && (
                    <span className={`text-xs tabular-nums ${isOverLimit ? 'text-red-500' : isNearLimit ? 'text-orange-400' : 'text-gray-400'}`}>
                        {charCount}/{maxLength}
                    </span>
                )}
            </div>
        </div>
    );
};

export default TextArea;
