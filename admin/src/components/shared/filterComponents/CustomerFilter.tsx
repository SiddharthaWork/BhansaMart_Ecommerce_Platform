import { useEffect, useState } from 'react';
import { useStore } from '@tanstack/react-store';
import { filterStore, filterActions } from '@/store/globalFilterStore';
import { MasterFilterForm, FilterConfig } from '../MasterFilterForm';
import { PaginationDetails } from '@/contexts/useProductList';
import { _User} from '@/(___types)';

const userFilterConfig: FilterConfig[] = [
    {
        name: 'name',
        type: 'text',
        label: 'Name',
        placeholder: 'eg,. Ram'
    },
    {
        name: 'email',
        type: 'text',
        label: 'Email',
        placeholder: 'eg,. Ram'
    },
    {
        name: 'phone',
        type: 'text',
        label: 'Phone',
        placeholder: 'eg,. 9982121212'
    },
    {
        name: 'address',
        type: 'text',
        label: 'Address',
        placeholder: 'eg,. Ram Mandir'
    },
    {
        name: 'joindate',
        type: 'date',
        label: 'Join Date',
        placeholder: 'eg,. 2024/02/02'
    }
]

interface customerFilterProps {
    data: any[]
    setcustomerListData: React.Dispatch<React.SetStateAction<any>>;
  setPaginationDetails?: React.Dispatch<React.SetStateAction<any>>;
}

const CustomerFilter = ({ data, setcustomerListData, setPaginationDetails }: customerFilterProps) => {
    const[original, setOriginalProduct] = useState(data);

    const filters = useStore(filterStore, (state) => state.filters);

    useEffect(() => {
        filterActions.registerFilter('name', (item, value) => item?.name.toLowerCase().includes(value.toLowerCase()));
        filterActions.registerFilter('email', (item, value) => item?.email.toLowerCase().includes(value.toLowerCase()));
        filterActions.registerFilter('phone', (item, value) => item?.phone.toLowerCase().includes(value.toLowerCase()));
        filterActions.registerFilter('address', (item, value) => item?.address.toLowerCase().includes(value.toLowerCase()));
        filterActions.registerFilter('joindate', (item, value) => {
            const itemDate = new Date(Number(item?.joinDate));
            const filterDate = new Date(value);
            return itemDate.toDateString() === filterDate.toDateString();
        });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {    
        const { name, value } = e.target;
        filterActions.setFilter(name, value);
        setPaginationDetails?.((prev: any) => ({ ...prev, limit: 100 }));
    };

    const handleApply = () => {
        console.log('Original transactions:', data);
        const filtered = filterActions.applyFilters(original);
        console.log('Filtered results:', filtered);
        setcustomerListData(filtered);
      };
    
      const handleClear = () => {
        filterActions.clearFilters();
        setPaginationDetails?.((prev: any) => ({ ...prev, limit: 10 }));
      };
    

  return (
    <div>
        <MasterFilterForm
        config={userFilterConfig}
        filters={filters}
        onApply={handleApply}
        onClear={handleClear}
        onHandleChange={handleChange}
        onFilterChange={(name, value) => filterActions.setFilter(name, value)}
      />
    </div>
  )
}

export default CustomerFilter