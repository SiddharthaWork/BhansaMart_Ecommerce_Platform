import { useEffect, useState } from 'react';
import { useStore } from '@tanstack/react-store';
import { filterStore, filterActions } from '@/store/globalFilterStore';
import { MasterFilterForm, FilterConfig } from '../MasterFilterForm';
import { IProduct } from '@/(___types)';
import { PaginationDetails } from '@/contexts/useProductList';


const orderFilterConfig: FilterConfig[] = [
  {
    name: 'productname',
    type: 'text',
    label: 'Product Name',
    placeholder: 'eg,. Amul Chocolate'
  },
  {
    name: 'status',
    type: 'select',
    label: 'Status',
    placeholder: 'Status',
    options: [
      { value: 'instock', label: 'In Stock' },
      { value: 'onorder', label: 'On Order' },
      { value: 'outofstock', label: 'Out of Stock' }
    ]
  }
];

interface orderFilterProps {
  originalProduct: any[]
  setNewProductData: React.Dispatch<React.SetStateAction<IProduct[]>>;
  setPaginationDetails?: React.Dispatch<React.SetStateAction<PaginationDetails>>;
}

const StockOverviewFilter: React.FC<orderFilterProps> = (
  {
    originalProduct,
    setNewProductData,
    setPaginationDetails
  }
) => {

  const filters = useStore(filterStore, (state) => state.filters);

  const[data, setdata] = useState(originalProduct);

  useEffect(() => {
    filterActions.registerFilter('productname', (item, value) => item?.name.toLowerCase().includes(value.toLowerCase()));
    
    filterActions.registerFilter('status', (item, value) => {
      const reorderPoint = item.inventoryDetails?.reorderPoint || 0;
      const usedStock = item.inventoryDetails?.usedStock || 0;
      const calculatedStatus = reorderPoint - usedStock;
      
      const cleanValue = value?.toLowerCase() || '';
      return (
        (cleanValue === 'instock' && calculatedStatus > 0) ||
        (cleanValue === 'onorder' && calculatedStatus <= 0 && calculatedStatus >= -5) ||
        (cleanValue === 'outofstock' && calculatedStatus < -5)
      );
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    filterActions.setFilter(name, value);
    setPaginationDetails?.((prev: any) => ({ ...prev, limit: 100 }));
  };

  const handleApply = () => {
    console.log('Original transactions:', originalProduct);
    const filtered = filterActions.applyFilters(data);
    console.log('Filtered results:', filtered);
    setNewProductData(filtered);
  };

  const handleClear = () => {
    filterActions.clearFilters();
    setPaginationDetails?.((prev: any) => ({ ...prev, limit: 10 }));
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


export default StockOverviewFilter;