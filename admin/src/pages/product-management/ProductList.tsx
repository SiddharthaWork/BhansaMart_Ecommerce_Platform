import { ProductList } from '../../components';
import { ProductProvider } from '@/contexts/useProductList';

export const ProductListPage = () => {
  return (
    <ProductProvider>
      <ProductList />
    </ProductProvider>
  );
};
