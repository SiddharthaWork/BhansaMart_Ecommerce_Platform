import { useEffect, useState } from 'react';
import { useStore } from '@tanstack/react-store';
import { filterStore, filterActions } from '@/store/globalFilterStore';
import { MasterFilterForm, FilterConfig } from '../MasterFilterForm';

const productFilterConfig: FilterConfig[] = [
    {
        name: 'drivername',
        type: 'text',
        label: 'Driver Name',
        placeholder: 'eg,. name'
    },
    {
        name: 'orderdeliver',
        type: 'text',
        label: 'Order Delivered',
        placeholder: 'eg,. 28'
    },
    {
        name: 'phonenumber',
        type: 'text',
        label: 'Phone Number',
        placeholder: 'eg,. 9982121212'
    },
    {
        name: 'date',
        type: 'date',
        label: 'Registered On',
        placeholder: 'eg,. 2024/02/02'
    }
];


interface PaginationDetails {
    limit: number;
    page: number;
    totalPages?: number;
}

interface Props {
    originalPersonList: any[]
    setNewOrderPersonList: React.Dispatch<React.SetStateAction<any>>
    setPaginationDetails?: React.Dispatch<React.SetStateAction<any>>
}

const DeliveryPersonFilter: React.FC<Props> = (
    {
        setNewOrderPersonList,
        originalPersonList,
        setPaginationDetails
    }
) => {
    const filters = useStore(filterStore, (state) => state.filters);
    
    const [data, setdata] = useState(originalPersonList);

    useEffect(() => {
        filterActions.registerFilter('drivername', (item, value) => {
            // console.log(item);
            // console.log('[CustomerFilter] Searching:', value, 'in:', item?.driver?.name);
            return item?.name.toLowerCase().includes(value.toLowerCase())
        }
        );
        filterActions.registerFilter('orderdeliver', (item, value) => item?.orders.toString().includes(value?.toString()));
        filterActions.registerFilter('phonenumber', (item, value) => item?.phone.toString().includes(value?.toString()));
        filterActions.registerFilter('date', (item, value) => item?.joinDate.toString().includes(value?.toString()));
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        filterActions.setFilter(name, value);
        setPaginationDetails?.((prev: any) => ({ ...prev, limit: 100 }));

    };

    const handleApply = () => {
        // console.log('Original transactions:', originalTransaction);
        const filtered = filterActions.applyFilters(data);
        console.log('Filtered results:', filtered);
        setNewOrderPersonList(filtered);
    };

    const handleClear = () => {
        filterActions.clearFilters();
        setPaginationDetails?.((prev: any) => ({ ...prev, limit: 10 }));

    };

    return (
        <div>
            <MasterFilterForm
                config={productFilterConfig}
                filters={filters}
                onFilterChange={(name, value) => filterActions.setFilter(name, value)}
                onHandleChange={handleChange}
                onApply={handleApply}
                onClear={handleClear}
            />
        </div>
    )
}

export default DeliveryPersonFilter