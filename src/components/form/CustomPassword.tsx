'use client'

import React, { useState } from 'react';
import { useField } from 'formik';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface CustomPasswordProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
}

const CustomPassword: React.FC<CustomPasswordProps> = ({ label, className, name, ...props }) => {
    const [field, meta] = useField(name);
    const [show, setShow] = useState(false);

    return (
        <div className="form-group mb-1">
            <label className="form-label text-xs mb-1">{label}</label>
            <div className="relative">
                <input
                    type={show ? 'text' : 'password'}
                    className={`form-control pr-11 shadow-none ${meta.touched && meta.error ? 'is-invalid' : ''} ${className || ''}`}
                    {...field}
                    {...props}
                />
                <div
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer z-10"
                >
                    {show ? (
                        <EyeSlashIcon className="size-5 text-gray-600" />
                    ) : (
                        <EyeIcon className="size-5 text-gray-600" />
                    )}
                </div>
            </div>
            {meta.touched && meta.error && (
                <div className="text-red-600 text-xs font-light mt-2">{meta.error}</div>
            )}
        </div>
    );
};

export default CustomPassword;
