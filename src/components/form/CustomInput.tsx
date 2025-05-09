import React from 'react';
import { useField } from 'formik';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    className?: string;
    formGroupClass?: string;
    name: string;
    currency?: boolean;
}

const formatCurrencyForDisplay = (value: number | string) => {
    // Remove any non-numeric characters, and format it as a number with commas
    const numberValue = parseFloat(value.toString().replace(/[^0-9.-]+/g, ''));
    if (isNaN(numberValue)) return '';
    return numberValue.toLocaleString('en-US');
};

const CustomInput: React.FC<CustomInputProps> = ({ label, className, formGroupClass, name, currency, ...props }) => {
    const [field, meta, helpers] = useField(name);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { value } = e.target;

        if (currency) {
            // Remove any non-numeric characters except for the decimal point
            const numericValue = value.replace(/[^0-9.-]+/g, '');
            helpers.setValue(numericValue ? parseFloat(numericValue) : '');
        } else {
            helpers.setValue(value);
        }
    };

    return (
        <div className={`form-group ${formGroupClass || 'mb-1'}`}>
            <label className="form-label text-xs mb-1">{label}</label>
            <input
                {...field}
                {...props}
                value={currency ? formatCurrencyForDisplay(field.value || '') : field.value}
                onChange={handleChange}
                className={`form-control shadow-none ${meta.touched && meta.error ? 'is-invalid' : ''} ${className || ''}`}
            />
            {meta.touched && meta.error ? (
                <div className="text-red-600 text-xs font-light mt-2">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default CustomInput;
