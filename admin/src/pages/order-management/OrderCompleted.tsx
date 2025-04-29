import { CompletedOrderProvider } from '@/contexts/useCompletedOrder';
import { CompletedOrders } from '../../components';

export const OrderCompletedPage = () => {
  return (
    <CompletedOrderProvider>
      <CompletedOrders />;
    </CompletedOrderProvider>
  );
};
