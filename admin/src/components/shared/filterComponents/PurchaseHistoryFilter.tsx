import { useEffect, useState } from 'react';
import { useStore } from '@tanstack/react-store';
import { filterStore, filterActions } from '@/store/globalFilterStore';
import { MasterFilterForm, FilterConfig } from '../MasterFilterForm';

const orderFilterConfig: FilterConfig[] = [
    {
        name: 'suppliername',
        type: 'text',
        label: 'Supplier Name',
        placeholder: 'eg,. Ram'
    },
    {
        name: 'price',
        type: 'text',
        label: 'Price',
        placeholder: 'eg,. Ram'
    },
    {
        name: 'expireddate',
        type: 'date',
        label: 'Expired Date',
        placeholder: 'eg,. 2020-01-01'
    },
  
];


interface supplierFilterProps {
    originalSupplier: any[] | null;
    setSupplier: React.Dispatch<React.SetStateAction<any[]>>;
    setPaginationDetails?: React.Dispatch<React.SetStateAction<any>>;
}

const PurchaseHistoryFilter: React.FC<supplierFilterProps> = (
    {
        originalSupplier,
        setSupplier,
        setPaginationDetails
    }
) => {
    const filters = useStore(filterStore, (state) => state.filters);
    

    useEffect(() => {
        filterActions.registerFilter('suppliername', (item, value) => {
            console.log("here is the item", item?.supplier?.name);
            return item?.supplier?.name.toLowerCase().includes(value.toLowerCase());
        });
        filterActions.registerFilter('price', (item, value) => item?.price.toString().includes(value?.toString()));
        filterActions.registerFilter('expireddate', (item, value) =>
        {
            const date = item?.expiryDate;
            const result = date.toString().slice(0, 10);
            return result.toString().includes(value?.toString());
    }
    );
    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        filterActions.setFilter(name, value);
    };

    const handleApply = () => {
        console.log('Original transactions:', originalSupplier);
        const filtered = filterActions.applyFilters(originalSupplier || []);
        console.log('Filtered results:', filtered);
        setSupplier(filtered);
    };

    const handleClear = () => {
        filterActions.clearFilters();
        setSupplier(originalSupplier || []);
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

export default PurchaseHistoryFilter;