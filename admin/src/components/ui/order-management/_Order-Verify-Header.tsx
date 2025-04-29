import { Icon } from '@iconify/react/dist/iconify.js';
import { Text } from '../../shared/Text';
import { useNavigate } from 'react-router-dom';
interface _orderVerifyHeaderPropTypes {
  orderId: string;
  startedDate: string;
  completedDate: string;
  filterOptions?: string[];
  onFilterSelect?: () => void;
  onSecondButtonClick?: () => void;
}
export const _OrderVerifyHeader = ({
  completedDate,
  filterOptions,
  orderId,
  startedDate,
  onFilterSelect,
  onSecondButtonClick,
}: _orderVerifyHeaderPropTypes) => {
  const navigate = useNavigate();
  return (
    <section
      className="flex place-items-center justify-between  bg-white border border-grey-100 shadow-sm rounded-md pr-5 pl-6 pt-5 pb-6"
      id="orderid-filter-export"
    >
      <div className="flex place-items-center gap-2" id="orderid">
        <section
          className="border border-grey-100 shadow-sm rounded-sm p-2"
          onClick={() => navigate(-1)}
        >
          <Icon icon="material-symbols-light:arrow-back" />
        </section>
        <section className="flex flex-col">
          <div className="flex place-items-center gap-2">
            <Text size="body-xs-default" variant="grey">
              {startedDate || new Date().toISOString().slice(0, 10)}
            </Text>
            <Text size="body-xs-default" variant="grey">
              -
            </Text>
            <Text size="body-xs-default" variant="grey">
              {completedDate || new Date().toISOString().slice(0, 10)}
            </Text>
          </div>
          <Text size="body-md-rare" variant="grey">
            {orderId}
          </Text>
        </section>
      </div>
      <div className="flex place-items-center gap-2">
        {filterOptions && (
          <section
            className="flex place-items-center gap-2 border border-grey-200 py-3 bg-white px-2 rounded "
            id="filter"
          >
            <Text variant="lynch-400" size="body-base-default">
              Status:
            </Text>
            <select
              name=""
              id=""
              className="outline-none text-base text-grey-800"
            >
              {filterOptions?.map((filter, index) => (
                <option value={filter} key={index} onSelect={onFilterSelect}>
                  {filter}
                </option>
              ))}
            </select>
          </section>
        )}

        <div
          className="flex place-items-center gap-4 border border-primary-blue py-3 bg-white px-2 cursor-pointer rounded"
          id="export"
          onClick={onSecondButtonClick}
        >
          <Icon icon="material-symbols:download" color="#2275FC" />
          <Text variant="primary-blue" size="body-base-default">
            Download Invoice
          </Text>
        </div>
      </div>
    </section>
  );
};
