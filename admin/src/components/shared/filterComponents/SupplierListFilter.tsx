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
        name: 'contactperson',
        type: 'text',
        label: 'Contact Name',
        placeholder: 'eg,. Ram'
    },
    {
        name: 'itemsupploed',
        type: 'text',
        label: 'Item Supplied',
        placeholder: 'eg,. 54'
    },
  
];


interface supplierFilterProps {
    originalSupplier: any[]
    setSupplier: React.Dispatch<React.SetStateAction<any>>;
    setPaginationDetails?: React.Dispatch<React.SetStateAction<any>>;
}

const SupplierListFilter: React.FC<supplierFilterProps> = (
    {
        originalSupplier,
        setSupplier,
        setPaginationDetails
    }
) => {
    const filters = useStore(filterStore, (state) => state.filters);
    const [data, setData] = useState(originalSupplier);

    useEffect(() => {
        filterActions.registerFilter('suppliername', (item, value) => {
            console.log("here is the item",item);
            return item?.name.toLowerCase().includes(value.toLowerCase())
        }),
        filterActions.registerFilter('contactperson', (item, value) => item?.contactPerson?.name.toLowerCase().includes(value.toLowerCase()));
        filterActions.registerFilter('itemsupploed', (item, value) =>{
            const result =  item?.products?.length;
            return result.toString().includes(value?.toString());
        });
    })


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        filterActions.setFilter(name, value);
    };

    const handleApply = () => {
        // console.log('Original transactions:', originalSupplier);
        const filtered = filterActions.applyFilters(data);
        // console.log('Filtered results:', filtered);
        setSupplier(filtered);
    };

    const handleClear = () => {
        filterActions.clearFilters();
        setSupplier([...data]);
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

export default SupplierListFilter