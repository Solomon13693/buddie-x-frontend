import React from 'react';
import { useField, FieldHookConfig } from 'formik';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface CustomPhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    className?: string;
    disabled?: boolean;
}

const CustomPhoneInput: React.FC<CustomPhoneInputProps> = ({ label, className, disabled, ...props }) => {

    const [field, meta, helpers] = useField(props as FieldHookConfig<string>);

    const valueAsString = field.value ? field.value.toString() : '';

    const handlePhoneChange = (value: string | undefined) => {
        helpers.setValue(value || '');
        helpers.setTouched(true);
    };

    return (
        <div className="form-group mb-1">
            <label className="form-label text-xs mb-1">{label}</label>
            <PhoneInput
                disabled={disabled}
                {...field}
                value={valueAsString}
                onChange={handlePhoneChange}
                onBlur={() => helpers.setTouched(true)}
                placeholder={props?.placeholder}
                className={`form-control ${meta.touched && meta.error ? 'is-invalid' : ''} ${className || ''}`}
            />
            {meta.touched && meta.error ? (
                <div className="text-red-600 text-xs font-light mt-2">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default CustomPhoneInput;
