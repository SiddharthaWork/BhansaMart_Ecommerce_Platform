import { NewOrders } from '../../components';
import { OrderProvider } from '@/contexts/useNewOrders';

export const NewOrdersPage = () => {
  return (
    <OrderProvider>
      <NewOrders />;
    </OrderProvider>
  );
};
