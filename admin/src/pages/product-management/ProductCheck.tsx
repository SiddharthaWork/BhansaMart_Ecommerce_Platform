import React from 'react'
import { ProductProvider, useProductListContext } from '@/contexts/useProductList';

const ProductCheck = () => {
    const {
        products,
        setPaginationDetails,
        setNewProductData,
        isFetching,
        isPending,
        column,
        showFilter,
        setShowFilter,
        pageDetails
      } = useProductListContext();
      console.log(products);
  return (
    <ProductProvider>
        Checking
    </ProductProvider>
  )
}

export default ProductCheck