import { CategoryWise } from '@/components';
import { useCategoryWiseSalesReport } from '@/server-action/api/salesreport';

export const CategoryWisePage = () => {
  const { data: categoryWiseSalesReport } = useCategoryWiseSalesReport();
  return <CategoryWise categoryWise={categoryWiseSalesReport?.categoryWise} />;
};
