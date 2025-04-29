import { ProductWise } from '@/components';
import { useProductWiseSalesReport } from '@/server-action/api/salesreport';

export const ProductWisePage = () => {
  const { data: productWiseSalesReport } = useProductWiseSalesReport();

  return (
    <ProductWise productWiseReport={productWiseSalesReport?.productWise} />
  );
};
