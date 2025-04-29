import { DropdownField } from './DropDownField';
import { InputField } from './Input-Field';

export interface FilterConfig {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  className?: string;
  options?: { value: string; label: string }[];
}

interface MasterFilterFormProps {
  config: FilterConfig[];
  filters: Record<string, string>;
  onFilterChange: (name: string, value: string) => void;
  onHandleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onApply: () => void;
  onClear: () => void;
  gridConfig?: string;
}

export const MasterFilterForm: React.FC<MasterFilterFormProps> = ({
  config,
  filters,
  onFilterChange,
  onHandleChange,
  onApply,
  onClear,
  gridConfig = 'grid grid-cols-5 gap-4'
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onHandleChange) {
      onHandleChange(e);
    } else {
      const { name, value } = e.target;
      onFilterChange(name, value);
    }
  };

  return (
    <div className="bg-white p-4 border-b border-gray-400">
      <div className={gridConfig}>
        {config.map((field) =>
          field.type === 'select' ? (
            <DropdownField
              key={field.name}
              label={field.label}
              name={field.name}
              value={filters[field.name] || ''}
              onChange={(e) => onFilterChange(field.name, e.target.value)}
              options={field.options}
              firstInput={field.placeholder}
              inputClassname={field.className || 'p-2 border rounded w-full bg-white'}
            />
          ) : (
            <InputField
              key={field.name}
              type={field.type}
              label={field.label}
              name={field.name}
              placeholder={field.placeholder}
              value={filters[field.name] || ''}
              onChange={handleChange}
              className={field.className || 'p-2 border rounded w-full'}
            />
          )
        )}
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={onClear}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Clear
        </button>
        <button
          onClick={onApply}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};
