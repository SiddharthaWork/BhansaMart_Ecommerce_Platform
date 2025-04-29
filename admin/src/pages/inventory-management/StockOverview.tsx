import { StockOverview } from '../../components/ui/inventory-management/(stock-overview)/StockOverview';
import { StockOverviewProvier } from '@/contexts/useStockOverView';

export const StockOverviewPage = () => {
  return (
    <StockOverviewProvier>
      <StockOverview />
    </StockOverviewProvier>
  );
};
