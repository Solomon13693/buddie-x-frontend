import React from "react"
import { useField } from "formik"
import Select from "react-select"

interface Option {
    value: string
    label: string
}

interface GroupedOption {
    label: string
    options: Option[]
}

type SelectOptions = Option[] | GroupedOption[]

const flattenOptions = (opts: SelectOptions): Option[] => {
    if (!opts.length) return []
    if ("options" in opts[0]) return (opts as GroupedOption[]).flatMap((g) => g.options)
    return opts as Option[]
}

interface CustomAutocompleteProps {
    name: string
    label: string
    options: SelectOptions
    placeholder?: string
    formGroupClass?: string
    multiple?: boolean
    returnObject?: boolean
}

const BORDER_DEFAULT = "#CBCAD7"
const BORDER_FOCUS = "#FF6F00"
const BORDER_ERROR = "#EF4444"

const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({
    name,
    label,
    options,
    placeholder = "Select",
    formGroupClass = "mb-4",
    multiple = false,
    returnObject = false,
}) => {
    const [field, meta, helpers] = useField(name)
    const { touched, error } = meta
    const { setValue } = helpers
    const hasError = Boolean(touched && error)

    const flat = flattenOptions(options)

    const selectedValue = (() => {
        if (multiple) {
            const valuesArray = Array.isArray(field.value) ? field.value : []
            return returnObject
                ? flat.filter((opt) => valuesArray.some((val: Option) => val?.value === opt.value))
                : flat.filter((opt) => valuesArray.includes(opt.value))
        }
        return returnObject
            ? flat.find((opt) => opt.value === field.value?.value)
            : flat.find((opt) => opt.value === field.value)
    })()

    return (
        <div className={`form-group ${formGroupClass}`}>
            <label className="form-label mb-1 text-xs">{label}</label>
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
                            returnObject ? opt : opt.value,
                        )
                        setValue(values)
                    } else {
                        setValue(returnObject ? selected : selected?.value || "")
                    }
                }}
                styles={{
                    control: (provided, state) => ({
                        ...provided,
                        minHeight: "3rem",
                        padding: "0 0.25rem",
                        borderRadius: "0.375rem",
                        borderColor: hasError
                            ? BORDER_ERROR
                            : state.isFocused
                                ? BORDER_FOCUS
                                : BORDER_DEFAULT,
                        borderWidth: "1px",
                        boxShadow: state.isFocused && !hasError ? `0 0 0 1px ${BORDER_FOCUS}` : "none",
                        fontSize: "0.875rem",
                        color: "#1B1D21",
                        backgroundColor: "#fff",
                        cursor: "pointer",
                        "&:hover": {
                            borderColor: hasError
                                ? BORDER_ERROR
                                : state.isFocused
                                    ? BORDER_FOCUS
                                    : BORDER_DEFAULT,
                        },
                    }),
                    valueContainer: (provided) => ({
                        ...provided,
                        padding: "0 0.5rem",
                    }),
                    placeholder: (provided) => ({
                        ...provided,
                        fontSize: "0.875rem",
                        color: "#9CA3AF",
                    }),
                    singleValue: (provided) => ({
                        ...provided,
                        fontSize: "0.875rem",
                        color: "#1B1D21",
                    }),
                    indicatorSeparator: () => ({
                        display: "none",
                    }),
                    dropdownIndicator: (provided, state) => ({
                        ...provided,
                        color: state.isFocused ? BORDER_FOCUS : "#62646A",
                        padding: "0 0.5rem",
                        "&:hover": {
                            color: BORDER_FOCUS,
                        },
                    }),
                    menu: (provided) => ({
                        ...provided,
                        borderRadius: "0.5rem",
                        fontSize: "0.875rem",
                        zIndex: 9999,
                        overflow: "hidden",
                        border: `1px solid ${BORDER_DEFAULT}`,
                    }),
                    option: (provided, state) => ({
                        ...provided,
                        fontSize: "0.875rem",
                        backgroundColor: state.isSelected
                            ? "#FFF6ED"
                            : state.isFocused
                                ? "#F9FAFB"
                                : "#fff",
                        color: "#1B1D21",
                        cursor: "pointer",
                    }),
                    multiValue: (provided) => ({
                        ...provided,
                        borderRadius: "9999px",
                        backgroundColor: "#e5e7eb",
                    }),
                }}
            />
            {hasError && <div className="mt-2 text-xs font-light text-red-600">{error}</div>}
        </div>
    )
}

export default CustomAutocomplete
