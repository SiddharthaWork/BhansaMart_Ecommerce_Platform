import { useEffect, useState } from 'react';
import { useStore } from '@tanstack/react-store';
import { filterStore, filterActions } from '@/store/globalFilterStore';
import { MasterFilterForm, FilterConfig } from '../MasterFilterForm';

const orderFilterConfig: FilterConfig[] = [
  {
    name: 'orderid',
    type: 'text',
    label: 'Order ID',
    placeholder: 'eg,. 122392'
  },
  {
    name: 'customername',
    type: 'text',
    label: 'Customer Name',
    placeholder: 'eg,. Ram'
  },
  {
    name: 'orderdate',
    type: 'date',
    label: 'Order Date',
    placeholder: 'eg,. 54'
  },
  {
    name: 'totalamount',
    type: 'number',
    label: 'Total Amount',
    placeholder: 'eg,. 54'
  },
]

interface orderFilterProps {
  originalOrder: any[]
  setOrder: React.Dispatch<React.SetStateAction<any>>;
  setPaginationDetails?: React.Dispatch<React.SetStateAction<any>>;
}


const CompletedOrderFilter: React.FC<orderFilterProps> = (
  {
    originalOrder,
    setOrder,
    setPaginationDetails
  }
) => {

  const filters = useStore(filterStore, (state) => state.filters);
  
  useEffect(() => {
    filterActions.registerFilter('orderid', (item, value) => item._id.toLowerCase().includes(value.toLowerCase()));
    filterActions.registerFilter('customername', (item, value) => item.customer?.name.toLowerCase().includes(value.toLowerCase()));
    filterActions.registerFilter('orderdate', (item, value) => item.orderTimeline?.orderCreated.includes(value));
    filterActions.registerFilter('totalamount', (item, value) => item.totalAmount === value);
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    filterActions.setFilter(name, value);
    if (setPaginationDetails) {
      setPaginationDetails((prev: any) => ({ ...prev, limit: 100 }));
    }
  };

  
  const handleApply = () => {
    const filteredData = filterActions.applyFilters(originalOrder as any);
    setOrder(filteredData);
  };

  const handleClear = () => {
    filterActions.clearFilters();
    setOrder(originalOrder);
    if (setPaginationDetails) {
      setPaginationDetails((prev: any) => ({ ...prev, limit: 10 }));
    }
  };


  return (
    <div>
           <MasterFilterForm
                config={orderFilterConfig}
                filters={filters}
                onApply={handleApply}
                onClear={handleClear}
                onHandleChange={handleChange}
                onFilterChange={(name, value) => filterActions.setFilter(name, value)}
            />
    </div>
  )
}

export default CompletedOrderFilter