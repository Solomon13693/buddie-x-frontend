import React from 'react';
import { useField, FieldInputProps, FieldMetaProps, FieldHelperProps } from 'formik';

interface CustomSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  className?: string;
  formGroupClass?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, className, formGroupClass, ...props }) => {
  
  const [field, meta]: [FieldInputProps<any>, FieldMetaProps<any>, FieldHelperProps<any>] = useField(props as any);

  return (
    <div className={`form-group ${formGroupClass || 'mb-4'}`}>
      <label className="form-label text-xs mb-1">{label}</label>
      <select {...field} {...props} className={`form-control ${meta.touched && meta.error ? 'is-invalid' : ''} ${className || ''}`} />
      {meta.touched && meta.error ? (
        <div className="text-red-600 text-xs font-light mt-2">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default CustomSelect;
