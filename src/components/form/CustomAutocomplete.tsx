import React from "react";
import { useField } from "formik";
import Select from "react-select";

interface Option {
    value: string;
    label: string;
}

interface CustomAutocompleteProps {
    name: string;
    label: string;
    options: Option[];
    placeholder?: string;
    formGroupClass?: string;
    multiple?: boolean;
    returnObject?: boolean;
}

const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({
    name,
    label,
    options,
    placeholder = "Select",
    formGroupClass = "mb-4",
    multiple = false,
    returnObject = false,
}) => {
    const [field, meta, helpers] = useField(name);
    const { touched, error } = meta;
    const { setValue } = helpers;

    // Determine selected value(s)
    const selectedValue = (() => {
        if (multiple) {
            const valuesArray = Array.isArray(field.value) ? field.value : [];
            return returnObject
                ? options.filter((opt) =>
                    valuesArray.some((val: Option) => val?.value === opt.value)
                )
                : options.filter((opt) => valuesArray.includes(opt.value));
        } else {
            return returnObject
                ? options.find((opt) => opt.value === field.value?.value)
                : options.find((opt) => opt.value === field.value);
        }
    })();

    return (
        <div className={`form-group ${formGroupClass}`}>
            <label className="form-label text-xs mb-1">{label}</label>
            <Select
                isMulti={multiple}
                name={name}
                options={options}
                placeholder={placeholder}
                classNamePrefix="react-select"
                value={selectedValue}
                onChange={(selected: any) => {
                    if (multiple) {
                        const values = selected.map((opt: Option) =>
                            returnObject ? opt : opt.value
                        );
                        setValue(values);
                    } else {
                        setValue(returnObject ? selected : selected?.value || "");
                    }
                }}
                styles={{
                    control: (provided, state) => ({
                        ...provided,
                        padding: '0.2rem 0.5rem',
                        borderRadius: '0.8rem', 
                        borderColor: state.isFocused ? '#F97316' : '#F97316', 
                        fontSize: '0.75rem', 
                        color: '#000',
                    }),
                    placeholder: (provided) => ({
                        ...provided,
                        fontSize: '0.75rem',
                    }),
                    menu: (provided) => ({
                        ...provided,
                        borderRadius: '1rem',
                        fontSize: '0.75rem',
                        zIndex: '9999'
                    }),
                    multiValue: (provided) => ({
                        ...provided,
                        borderRadius: '9999px',
                        backgroundColor: '#e5e7eb',
                    }),
                }}
            />
            {touched && error && (
                <div className="text-red-600 text-xs font-light mt-2">{error}</div>
            )}
        </div>
    );
};

export default CustomAutocomplete;
