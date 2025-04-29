import type React from 'react';
import { PaginationDetails } from '@/contexts/useProductList';
import { IProduct } from '@/(___types)';
import { useEffect } from 'react';
import { useStore } from '@tanstack/react-store';
import { filterStore,filterActions } from '@/store/globalFilterStore';
import { MasterFilterForm,FilterConfig } from '../MasterFilterForm';

const productFilterConfig: FilterConfig[] = [
  {
    name: 'category',
    type: 'text',
    label: 'Categories',
    placeholder: 'eg,. Grocery'
  },
  {
    name: 'subCategory',
    type: 'text',
    label: 'Sub Categories',
    placeholder: 'eg,. Pantry Essentials'
  },
  {
    name: 'priceRange',
    type: 'text',
    label: 'Price Range',
    placeholder: 'eg,. Under Rs. 100'
  },
  {
    name: 'stock',
    type: 'text',
    label: 'Stock',
    placeholder: 'eg,. In Stock'
  }
];


interface ProductFilterProps {
  originalProduct:IProduct[]
  newProductList: any[];
  setNewProductData: React.Dispatch<React.SetStateAction<IProduct[]>>;
  setPaginationDetails: React.Dispatch<React.SetStateAction<PaginationDetails>>;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ 
  setNewProductData,
  originalProduct,
  setPaginationDetails 
}) => {
  const filters = useStore(filterStore, (state) => state.filters);

  useEffect(() => {
    filterActions.registerFilter('category', (item, value) => 
      item?.category?.name.toLowerCase().includes(value.toLowerCase()));
    
    filterActions.registerFilter('subCategory', (item, value) => 
      (item?.subCategory?.name ?? '').toLowerCase().includes(value.toLowerCase()));
    
    filterActions.registerFilter('priceRange', (item, value) => 
      String(item.sellingPrice ?? '').toLowerCase().includes(value.toLowerCase()));
    
    filterActions.registerFilter('stock', (item, value) => 
      String(item.inventoryDetails?.totalStock ?? '').toLowerCase().includes(value.toLowerCase()));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    filterActions.setFilter(name, value);
    setPaginationDetails(prev => ({ ...prev, limit: 100 }));
  };

  const handleApply = () => {
    const filtered = filterActions.applyFilters(originalProduct);
    setNewProductData(filtered);
  };

  const handleClear = () => {
    filterActions.clearFilters();
    setPaginationDetails(prev => ({ ...prev, limit: 10 }));
  };

  return (
    <MasterFilterForm
    config={productFilterConfig}
    filters={filters}
    onFilterChange={(name, value) => filterActions.setFilter(name, value)}
    onApply={handleApply}
    onClear={handleClear}
    onHandleChange={handleChange}
  />
  );
};

export default ProductFilter;
