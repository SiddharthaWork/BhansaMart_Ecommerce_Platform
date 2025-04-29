import { useLocation, useParams } from 'react-router-dom';
import { OrderVerify } from '../../../components';
import { useGetOrderById } from '@/server-action/api/order';
import { IOrder } from '@/(___types)';
import { useEffect } from 'react';

export const OrderVerifyPage = () => {
  const { order_id } = useParams();

  const {
    data: orderData,
    isPending,
    isFetching,
  } = useGetOrderById(order_id ?? '');

  const location = useLocation();

  useEffect(() => {
    const scrollToHash = () => {
      if (location.hash) {
        const elementId = location.hash.substring(1); // Removes '#' from hash
        const element = document.getElementById(elementId);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    };

    scrollToHash();

    if (orderData) {
      setTimeout(scrollToHash, 200);
    }
  }, [location, orderData]);

  return (
    <OrderVerify
      orderDetails={orderData ?? ({} as IOrder)}
      isFetching={isFetching}
      isPending={isPending}
    />
  );
};
