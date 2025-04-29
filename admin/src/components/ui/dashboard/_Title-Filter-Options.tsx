import { Text } from '../../shared';

interface _titleFilterOptionsProps {
  title: string;
  filterOption?: string[];
  onFilterOptionSelected?: (e: any) => void;
}
export const _TitleFilterOptions = ({
  filterOption,
  title,
  onFilterOptionSelected,
}: _titleFilterOptionsProps) => {
  return (
    <div className="flex place-items-center justify-between w-full">
      <section>
        <Text size="body-md-lg" variant="grey">
          {title}
        </Text>
      </section>
      {filterOption && (
        <section>
          <select
            name=""
            id=""
            className="outline-none text-xs font-bold text-[#A3AED0]"
            onChange={(e) => onFilterOptionSelected?.(e.target.value)}
          >
            {filterOption?.map((filter, index) => (
              <option value={filter} key={index}>
                {filter}
              </option>
            ))}
          </select>
        </section>
      )}
    </div>
  );
};
