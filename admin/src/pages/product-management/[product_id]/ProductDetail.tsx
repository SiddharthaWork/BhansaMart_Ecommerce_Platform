import { useParams } from 'react-router-dom';
import { ProductDetail } from '../../../components';
import { useProductById } from '@/server-action/api/product';

export const ProductDetailPage = () => {
  const { product_id } = useParams();

  const { data, isLoading, isFetching } = useProductById(product_id as string);

  return (
    <ProductDetail
      product={data}
      isFetching={isFetching}
      isLoading={isLoading}
    />
  );
};
