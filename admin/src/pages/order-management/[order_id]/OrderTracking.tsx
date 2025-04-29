import { useLocation, useParams } from 'react-router-dom';
import { OrderTracking } from '../../../components/ui/order-management/[order_id]/Order-Tracking';
import { useGetOrderById } from '@/server-action/api/order';
import { IOrder } from '@/(___types)';
import { useEffect } from 'react';

export const OrderTrackingPage = () => {
  const { order_id } = useParams();

  const {
    data: orderData,
    isFetching,
    isPending,
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

    scrollToHash(); // Initial attempt when the page loads

    // Retry when orderData is available
    if (orderData) {
      setTimeout(scrollToHash, 200);
    }
  }, [location, orderData]);

  return (
    <OrderTracking
      orderDetails={orderData ?? ({} as IOrder)}
      isFetching={isFetching}
      isPending={isPending}
    />
  );
};
