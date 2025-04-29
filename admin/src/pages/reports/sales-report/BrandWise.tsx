import { BrandWise } from '@/components';
import { useBrandWiseSalesReport } from '@/server-action/api/salesreport';

export const BrandWisePage = () => {
  const { data: brandWiseData } = useBrandWiseSalesReport();

  return <BrandWise brandWise={brandWiseData?.brandWise} />;
};
