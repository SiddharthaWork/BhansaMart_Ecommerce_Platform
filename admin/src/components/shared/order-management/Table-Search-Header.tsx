import { Icon } from '@iconify/react/dist/iconify.js';
import { Text } from '../Text';
import { filterActions } from '@/store/globalFilterStore';
import { memo, useEffect } from 'react';

interface tableHeaderPropTypes {
  onFilterClick?: () => void;
  onSearchChange?: (value: string) => void;
  showButton?: boolean;
  buttonAction?: () => void;
  showDate?: boolean;
  showfilter?: boolean;
  buttonName?: string;
  filterKey?: string;
  originalData?: any[];
  setFilteredData?: (data: any[]) => void;
  setPagination?: (prev: any) => void;
}

export const TableSearchHeader = memo(({
  onFilterClick,
  onSearchChange,
  showButton = false,
  buttonAction,
  showDate,
  showfilter = true,
  buttonName,
  filterKey,
  originalData,
  setFilteredData,
  setPagination,
}: tableHeaderPropTypes) => {
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (filterKey && originalData && setFilteredData && setPagination) {
      filterActions.registerFilter(filterKey, (item, val) =>
        item?.[filterKey]?.toLowerCase().includes(val.toLowerCase())
      );
      filterActions.setFilter(filterKey, value);
      const filtered = filterActions.applyFilters(originalData);
      setFilteredData(filtered);
      setPagination((prev: any) => ({
        ...prev,
        currentPage: 1,
        limit: value ? 100 : 10
      }));
    }
    else if (onSearchChange) {
      onSearchChange(value);
    }
  };

  useEffect(() => {
    if (filterKey) {
      filterActions.registerFilter(filterKey, (item, val) =>
        item?.[filterKey]?.toLowerCase().includes(val.toLowerCase())
      );
    }
  }, [filterKey]);

  return (
    <form
      className="flex place-items-center justify-between p-4 border-b border-grey-100 gap-6"
      id="search-filter"
      onSubmit={(e) => e.preventDefault()}
    >
      <section
        className="flex place-items-center gap-2 border border-border rounded py-2 px-4 w-full shadow-sm"
        id="search"
      >
        <Icon icon="iconamoon:search-light" color="#8695AA" />
        <input
          type="text"
          className="outline-none text-lynch-400 text-sm w-full"
          placeholder="search here..."
          onChange={handleSearchInput}
        />
      </section>
      {showfilter && (
        <section
          className="flex border border-grey-200 shadow-sm bg-white place-items-center gap-1 px-4 py-2 rounded cursor-pointer"
          id="filter"
          onClick={onFilterClick}
        >
          <Icon icon="fontisto:export" color="#B0B0B0" />
          <Text variant="grey-300" size="body-base-default">
            Filter
          </Text>
        </section>
      )}
      {showButton ? (
        <section
          className={`flex border whitespace-nowrap  border-grey-200 shadow-sm bg-[#2275FC] place-items-center gap-2 px-3 py-3 rounded cursor-pointer  ${buttonName ? 'w-[12rem]' : ''}`}
          id="add-button"
          onClick={buttonAction}
        >
          <Icon icon="ic:baseline-plus" color="white" width="24" height="24" />
          <Text variant="white" size="body-base-default">
            {buttonName ?? 'Add'}
          </Text>
        </section>
      ) : null}
      {showDate && (
        <section>
          <div className=" w-fit md:h-[3rem] h-full md:gap-3 gap-2 flex justify-between items-center rounded">
            <button className="border-2 h-full px-2 rounded">
              <Icon icon="mingcute:left-line" width="20" height="20" />
            </button>
            <button className="flex justify-center items-center w-[14rem] border-2 h-full gap-2 px-3 rounded">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: '2-digit',
              })}
              <Icon icon="mingcute:down-line" width="20" height="20" />
            </button>
            <button className="border-2 h-full px-2 rounded">
              <Icon icon="mingcute:right-line" width="20" height="20" />
            </button>
          </div>
        </section>
      )}
    </form>
  );
});
