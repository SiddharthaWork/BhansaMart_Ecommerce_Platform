import React, { useState } from "react";
import { Field, FormikProvider, useFormik } from "formik";
import { Icon } from "@iconify/react";
import DotSpinner from "../ui/DotSpinner";

interface FieldProps {
    name: string;
    label: string;
    type: string;
    placeholder?: string;
    icon?: string;
    options?: { value: string; label: string }[];

}

interface MasterFormProps {
    fields: FieldProps[];
    validationSchema: any;
    onSubmit: (values: Record<string, string>) => void;
    buttonLabel?: string;
    additionalContent?: React.ReactNode;
    fieldStyle?: string;
    selectStyle?: string;
    buttonStyle?: string;
}

const MasterForm: React.FC<MasterFormProps> = ({
    fields,
    validationSchema,
    onSubmit,
    buttonLabel,
    additionalContent,
    fieldStyle,
    selectStyle,
    buttonStyle

}) => {

    const [passwordVisibility, setPasswordVisibility] = useState<Record<string, boolean>>(
        {}
    );

    const togglePasswordVisibility = (fieldName: string) => {
        setPasswordVisibility((prev: any) => ({
            ...prev,
            [fieldName]: !prev[fieldName],
        }));
    };

    const formik = useFormik({
        initialValues: fields.reduce((acc, field) => {
            acc[field.name] = "";
            return acc;
        }, {} as Record<string, string>),
        validationSchema,
        onSubmit,
    });

    const { errors, touched, getFieldProps, isSubmitting, handleSubmit } = formik;

    return (
        <FormikProvider value={formik}>
            <form onSubmit={handleSubmit} autoComplete="off">
                {fields.map(({ name, label, type, placeholder, icon, options }, index) => (
                    <div className="mb-3" key={index}>
                        <label htmlFor={name} className="block mb-1 text-sm text-gray-600">
                            {label}
                        </label>
                        <div className="relative flex flex-col gap-0">
                            {icon && (
                                <div className="absolute inset-y-0 flex items-center left-3 ">
                                    <Icon icon={icon} width="24" height="24" style={{ color: "#353537" }} />
                                </div>
                            )}
                            {type === 'select' ? (
                                <Field
                                    as="select"
                                    id={name}
                                    {...getFieldProps(name)}
                                    className={`w-full ${selectStyle} py-2 ${icon ? "pl-12" : "pl-1"} text-sm`}
                                >
                                    <option value="" disabled>
                                        {placeholder || "Select an option"}
                                    </option>
                                    {options?.map((option) => (
                                        <option key={option.value} value={option.value} className={``}>
                                            {option.label}
                                        </option>
                                    ))}
                                </Field>
                            ) : (
                                <div className="">
                                    <Field
                                        id={name}
                                        type={type === "password" && passwordVisibility[name] ? "text" : type}
                                        placeholder={placeholder}
                                        {...getFieldProps(name)}
                                        className={`w-full ${fieldStyle} py-2 ${icon ? "pl-12" : "pl-1"
                                            } text-sm `}
                                    />
                                    {type === "password" && (
                                        <button
                                            type="button"
                                            onClick={() => togglePasswordVisibility(name)}
                                            className="absolute inset-y-0 flex items-center right-3"
                                        >
                                            <Icon
                                                icon={passwordVisibility[name] ? "mdi:eye-off" : "mdi:eye"}
                                                width="20"
                                                height="20"
                                                style={{ color: "#024756" }}
                                            />
                                        </button>
                                    )}
                                </div>
                            )}

                        </div>
                        <div>
                            {errors[name] && touched[name] && (
                                <span className="block mt-1 text-sm font-medium text-red-500">{errors[name]}</span>
                            )}
                        </div>
                    </div>
                ))}

                {additionalContent}

                <button
                    type="submit"
                    className={`${buttonStyle} w-full flex items-center justify-center bg-[#024756] hover:bg-teal-700 text-white font-medium py-2.5 rounded-lg mb-4`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <DotSpinner customClassName="w-10" /> : buttonLabel}
                </button>
            </form>
        </FormikProvider>
    );
};

export default MasterForm;
