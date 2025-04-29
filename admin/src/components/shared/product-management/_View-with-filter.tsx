import { Icon } from '@iconify/react/dist/iconify.js';
import { Text } from '../Text';

interface viewWithFilterPropTypes {
  selectedView?: string;
  setSelectedView: React.Dispatch<React.SetStateAction<string>>;
  filterOption?: string[];
}
export const ViewWithFilter = ({
  selectedView,
  setSelectedView,
  filterOption,
}: viewWithFilterPropTypes) => {
  return (
    <div className="flex gap-6 place-items-center">
      <section className="flex place-items-center gap-2  bg-white py-3 px-2 rounded border border-grey-200">
        <div
          className={`${
            selectedView === 'list'
              ? 'bg-[#2275FC1A] p-1 rounded text-primary-blue'
              : 'text-grey-400'
          }`}
          onClick={() => setSelectedView('list')}
        >
          <Icon icon="tabler:layout-list" />
        </div>

        <div
          className={`${
            selectedView === 'grid'
              ? 'bg-[#2275FC1A] p-1 rounded text-primary-blue'
              : 'text-grey-400'
          }`}
          onClick={() => setSelectedView('grid')}
        >
          <Icon icon="mingcute:grid-line" />
        </div>
      </section>
      {filterOption && (
        <section
          className="flex place-items-center gap-2 border border-grey-200 py-3 bg-white px-2 rounded"
          id="filter"
        >
          <Text variant="lynch-400" size="body-base-default">
            Show:
          </Text>
          <select
            name=""
            id=""
            className="outline-none text-base text-grey-800"
          >
            {filterOption?.map((filter, index) => (
              <option value={filter} key={index} disabled={index === 0}>
                {filter}
              </option>
            ))}
          </select>
        </section>
      )}
    </div>
  );
};
