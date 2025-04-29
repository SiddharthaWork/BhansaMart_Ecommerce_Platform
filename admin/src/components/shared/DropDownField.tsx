import React from 'react';
import { Text } from './Text';
import { twMerge } from 'tailwind-merge';

interface dropDownFieldPropTypes
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  firstInput?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  inputClassname?: string;
}

export const DropdownField = React.forwardRef<
  HTMLOptionElement,
  dropDownFieldPropTypes
>(
  (
    { label, options, required = false, firstInput, inputClassname, ...other },
    ref
  ) => (
    <div className="flex flex-col gap-2">
      <label className="flex gap-1">
        <Text variant="grey-600" size="body-sm-lg">
          {label}
        </Text>
        {required && <span className="text-red">*</span>}
      </label>
      <select
        className={twMerge(
          ` border border-grey-200 py-3 px-4 rounded text-black outline-none ${inputClassname}`
        )}
        {...other}
      >
        <option value="" disabled>
          Select {firstInput ?? label}
        </option>
        {options?.map((option) => (
          <option key={option.value} value={option.value} ref={ref}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
);
