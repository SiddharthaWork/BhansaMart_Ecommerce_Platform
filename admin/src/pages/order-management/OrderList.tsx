import { OrderList } from '../../components';
import { ConfirmOrderProvider } from '@/contexts/useConfirmOrderList';

export const OrderListPage = () => {
  return (
    <ConfirmOrderProvider>
      <OrderList />
    </ConfirmOrderProvider>
  );
};
