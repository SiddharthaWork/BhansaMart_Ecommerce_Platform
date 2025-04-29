import { useEffect, useState } from 'react';
import { useStore } from '@tanstack/react-store';
import { filterStore, filterActions } from '@/store/globalFilterStore';
import { MasterFilterForm, FilterConfig } from '../MasterFilterForm';

const assignFilterConfig: FilterConfig[] = [
    {
        name: 'orderid',
        type: 'text',
        label: 'Order Id',
        placeholder: 'eg,. 122392'
    },
    {
        name: 'customername',
        type: 'text',
        label: 'Customer Name',
        placeholder: 'eg,. Hari'
    },
    {
        name: 'address',
        type: 'text',
        label: 'Address',
        placeholder: 'eg,. Kathmandu'
    },
    {
        name: 'totalamount',
        type: 'number',
        label: 'Total Amount',
        placeholder: 'eg,. Rs 44'
    }
]


interface Props {
    assignDeliveryList: any[]
    setNewDeliveryList: React.Dispatch<React.SetStateAction<any>>
    setPaginationDetails?: React.Dispatch<React.SetStateAction<any>>
}


const AssignDeliveryFilter: React.FC<Props> = (
    {
        setNewDeliveryList,
        assignDeliveryList,
        setPaginationDetails
    }
) => {
    const filters = useStore(filterStore, (state) => state.filters);

    useEffect(() => {
        filterActions.registerFilter('orderid', (item, value) => item._id.toLowerCase().includes(value.toLowerCase()));
        filterActions.registerFilter('customername', (item, value) => item.customer?.name.toLowerCase().includes(value.toLowerCase()));
        filterActions.registerFilter('address', (item, value) => item.shippingAddress?.address.toLowerCase().includes(value.toLowerCase()));
        filterActions.registerFilter('totalamount', (item, value) => String(item.totalAmount).toLowerCase().includes(value.toLowerCase()));
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        filterActions.setFilter(name, value);
        setPaginationDetails?.((prev: any) => ({ ...prev, limit: 100 }));

    };

    const handleApply = () => {
        // console.log('Original transactions:', originalTransaction);
        const filtered = filterActions.applyFilters(assignDeliveryList);
        console.log('Filtered results:', filtered);
        setNewDeliveryList(filtered);
    };

    const handleClear = () => {
        filterActions.clearFilters();
        setPaginationDetails?.((prev: any) => ({ ...prev, limit: 10 }));
    };

  return (
    <div>
        <MasterFilterForm
            config={assignFilterConfig}
            filters={filters}
            onApply={handleApply}
            onClear={handleClear}
            onHandleChange={handleChange}
            onFilterChange={(name, value) => filterActions.setFilter(name, value)}
        />
    </div>
  )
}

export default AssignDeliveryFilter