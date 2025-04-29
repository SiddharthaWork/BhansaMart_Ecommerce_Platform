import { useParams } from 'react-router-dom';
import { AddProduct } from '../../components/';
import { useProductById } from '@/server-action/api/product';

export const AddProductPage = () => {
  const { product_id } = useParams();

  const { data } = useProductById(product_id as string);

  return <AddProduct product={data} />;
};
