import React from 'react';
import { Text } from './Text';
import { twMerge } from 'tailwind-merge';

interface InputFieldPropTypes
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  variant?: string;
  inputClassName?: string;
  defaultPadding?: boolean;
  border?: boolean;
  readonly?: boolean;
}

// Refactor InputField with React.forwardRef
export const InputField = React.forwardRef<
  HTMLInputElement,
  InputFieldPropTypes
>(
  (
    {
      label,
      placeholder,
      type = 'text',
      required = false,
      border = true,
      readonly = false,
      inputClassName,
      defaultPadding = true,
      ...other
    },
    ref
  ) => (
    <div className="flex flex-col gap-2 w-full">
      <label className="flex gap-1">
        <Text variant="grey-600" size="body-sm-lg">
          {label}
        </Text>
        {required && <span className="text-red">*</span>}
      </label>
      <input
        ref={ref} // Attach the ref here
        type={type}
        placeholder={placeholder}
        className={twMerge(
          `${border && 'border'} border-grey-200 ${defaultPadding && 'py-3 px-4'} rounded ${readonly ? 'placeholder:text-black cursor-auto' : 'text-black'} outline-none w-full ${inputClassName} `
        )}
        readOnly={readonly}
        {...other}
      />
    </div>
  )
);

// Add displayName for better debugging in devtools
InputField.displayName = 'InputField';
